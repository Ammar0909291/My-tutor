# Proof by Contradiction — `math.found.proof-by-contradiction`

## Identity

- **Concept ID**: `math.found.proof-by-contradiction` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.proof`)
- **Prerequisites**: `math.found.proof` (already establishes the
  general structure and works a fully-detailed contradiction proof —
  √2 is irrational), `math.found.logical-connectives`.
- **Unlocks**: none directly in the KG (`unlocks: []`).
- **Related** (from KG): `math.found.direct-proof`,
  `math.found.proof-by-contrapositive`.
- **Difficulty**: developing · **Bloom**: create · **Mastery
  threshold**: 0.75 · **Est. hours**: 6
- **No Blueprint exists yet** for this concept — this entry is authored
  directly from the KG node, reusing `math.found.proof`'s own
  treatment by reference where content already exists there.
- **Aliases** (from KG): "reductio ad absurdum", "indirect proof".

## Learning Objective

The learner can: correctly negate the statement to be proved as the
opening assumption of a contradiction proof; derive a genuine logical
contradiction (a statement that is provably false, such as P∧¬P) from
that assumption combined with known facts; conclude the original
statement must be true because its negation led to an impossibility;
and judge when contradiction is a more natural strategy than direct
proof, particularly for claims about non-existence or irrationality.

## Core Understanding

A proof by contradiction assumes the NEGATION of the statement to be
proved and derives a contradiction — a statement that is provably
false, most often of the form "X and not X" — thereby establishing the
original statement must be true, since assuming its negation led to a
logical impossibility. `math.found.proof` already works this technique
in full detail for "√2 is irrational": assume √2=p/q in lowest terms,
derive that both p and q must be even, contradicting the "lowest terms"
assumption (gcd(p,q)=1). This entry's own contribution is contradiction
as a deliberately SELECTED strategy: it is especially natural for
claims about NON-EXISTENCE ("there is no largest prime") or
IRRATIONALITY/IMPOSSIBILITY, where the claim itself has no natural
"forward" starting point for direct proof, but its negation ("there IS
a largest prime," "√2 IS rational") hands you a concrete object to
reason about and eventually break. The contradiction must be a genuine,
checkable impossibility — not merely a surprising or unlikely-seeming
consequence — and it must be traceable to a SPECIFIC prior step, so
the argument clearly identifies which assumption (the negation) is
responsible for the impossibility.

## Mental Models

- **Beginner model — "contradiction proof means reaching something
  weird or unexpected"**: the learner accepts any surprising or
  counter-intuitive consequence as a valid "contradiction," without
  verifying it is a genuine logical impossibility. Shelf-life warning:
  this model produces invalid "proofs" the moment a merely surprising
  (but true) consequence is mistaken for an actual contradiction.
- **Intermediate model — "assume the negation, derive P∧¬P for some
  specific P"**: the learner correctly identifies and executes the
  negate-derive-contradict structure on familiar examples, but may
  reach for contradiction even when a more natural direct or
  contrapositive proof is available. Upgrade trigger: being asked
  whether a claim more naturally suited to direct proof should still be
  attempted by contradiction.
- **Advanced model — "contradiction is selected deliberately, especially
  for non-existence and irrationality claims, and the contradiction
  itself must be a genuine, traceable impossibility"**: the learner
  judges strategic fit before committing to contradiction and can
  precisely identify which specific step the impossibility depends on.
  Upgrade trigger: being asked to identify, in a completed
  contradiction proof, exactly which assumption is responsible for the
  derived impossibility.
- **Do not upgrade early**: a learner who still accepts merely
  surprising consequences as "contradictions" (beginner model) should
  not be pushed into strategic-selection judgment (advanced model)
  before the basic negate-derive-contradict execution is itself
  reliable and rigorous.

## Why Students Fail

The dominant failure accepts a merely surprising, unexpected, or
unlikely-seeming consequence as a "contradiction," without verifying it
is a genuine logical impossibility (a statement and its own negation
both being forced true) — surprise is not the criterion; provable
falsehood is. A second, independent failure negates the WRONG thing —
negating only part of a compound statement, or negating the hypothesis
instead of the conclusion, producing an assumption that doesn't
actually correspond to "the statement is false." A third failure
reaches for contradiction reflexively on every claim, including ones
that direct proof handles more cleanly, since contradiction can feel
like a more "powerful" or universally-applicable technique once
learned, when in fact the choice of strategy should be driven by the
claim's own structure.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure directly, since no
Blueprint exists yet.

**MC-1 — "A contradiction is just something surprising or unlikely"
(Type 2, perceptual intuition — "wow, that can't be right" FEELS like a
contradiction, without the formal P∧¬P structure being checked)**
- *Why*: everyday language uses "contradiction" loosely for anything
  counter-intuitive, and this loose sense is imported into the formal
  technique, which requires a specific, checkable logical impossibility.
- *Symptom*: ending a proof attempt at a merely odd-looking or
  unexpected (but not actually false) intermediate result and declaring
  victory.
- *Detection probe*: ask the learner to state, precisely, what
  statement and its negation were both derived in a completed
  contradiction proof.
- *Recovery*: "surprising is not the same as impossible. A genuine
  contradiction is a statement X and its own negation ¬X, both
  following from your assumption — point to the exact X." Revisit √2's
  proof: p even AND (from gcd(p,q)=1) NOT both p,q even — a specific,
  checkable pair of opposing facts, not a vague sense of oddness.
- *Verification*: the learner, for a fresh contradiction proof, states
  the exact statement X and its negation ¬X that together form the
  contradiction.

**MC-2 — "Negate the whole claim by negating any convenient piece of
it" (Type 4, notation-induced — negation feels interchangeable across
which part of a compound statement it's applied to)**
- *Why*: for compound or conditional statements, there are multiple
  "pieces" that COULD be negated, and without careful attention to
  logical structure, students negate whichever piece is easiest rather
  than the one that correctly represents "the whole statement is
  false."
- *Symptom*: to prove "there is no largest even integer" by
  contradiction, negating to "there is no even integer" or some other
  mismatched statement, rather than the correct negation "there IS a
  largest even integer."
- *Detection probe*: ask the learner to state the correct opening
  assumption for a contradiction proof of "there is no largest prime."
- *Recovery*: "the negation of 'there is no X' is 'there IS an X' —
  match the negation to the EXACT logical form of the claim, using
  `math.found.quantifiers`'s own negation rules (¬(∀x P(x))≡∃x¬P(x);
  ¬(∃x P(x))≡∀x¬P(x)) rather than guessing."
- *Verification*: the learner correctly negates a fresh quantified
  claim as the opening line of a contradiction proof, matching the
  formal negation rule.

**MC-3 — "Contradiction should be tried first, since it's the most
powerful technique" (Type 1, overgeneralization — contradiction feels
maximally general since it can, in principle, be attempted on any
claim)**
- *Why*: once a learner successfully executes a few contradiction
  proofs, its apparent universality (it can be attempted on nearly
  anything) makes it feel like the default, "strongest" choice, even
  when a claim's structure makes direct proof simpler.
- *Symptom*: attempting contradiction on a claim like "if n is even,
  then n² is even," where a direct proof is more natural and simpler,
  producing an unnecessarily convoluted argument.
- *Detection probe*: present "if n is even, then n² is even" and ask
  the learner which strategy they'd choose and why.
- *Recovery*: "contradiction shines for NON-EXISTENCE and irrationality
  claims, where the negation hands you a concrete object to work with.
  For a claim like this one, the hypothesis ALREADY hands you
  everything you need — direct proof is simpler. Save contradiction for
  when direct proof genuinely struggles."
- *Verification*: the learner, given a mix of claims, correctly matches
  most to direct proof and reserves contradiction for non-existence/
  irrationality-shaped claims.

## Analogies

**Primary — the detective's alibi**: To prove a suspect is guilty (the
claim), a detective might instead ASSUME the suspect is innocent (the
negation) and show this assumption forces an impossible situation (the
suspect would have had to be in two places at once) — since that's
impossible, the innocence assumption must be false, so the suspect is
guilty. The contradiction has to be a genuine impossibility (being in
two places at once), not merely an inconvenient or surprising fact
about the suspect.

**Anti-analogy to retire**: "Contradiction proof means you find
something that doesn't fit the pattern." "Doesn't fit the pattern" is
vague and invites MC-1's loose, surprise-based reading rather than the
precise P∧¬P structure.

## Demonstrations

**Reusing `math.found.proof`'s own worked example**: the full √2-is-
irrational contradiction proof is not restated here — see that entry's
Core Understanding and Demonstrations. This entry's own contribution:
explicitly label the contradiction's two halves once derived — "p is
even" (from p²=2q²) and "NOT (p and q both even)" (from gcd(p,q)=1) —
making the P∧¬P structure the explicit object of study, targeting MC-1.

**Correct negation practice**: for "there is no largest even integer,"
walk the negation explicitly: the claim is ∀ (no even integer is
largest), so its negation is ∃ (there IS a largest even integer N) —
directly applying `math.found.quantifiers`'s own negation rule, then
deriving N+2 is even and exceeds N, contradicting N's "largest" status
— targets MC-2.

**Strategy-selection contrast**: side by side, attempt "if n is even,
then n² is even" both directly (clean, short) and by contradiction
(assume n even, n² odd — awkward, requires extra unpacking of "n² is
odd" before any progress) — the comparison itself makes MC-3's lesson
concrete.

## Discovery Questions

Present "show that √2 is not a fraction" without yet naming the
technique, and ask: "if you assumed it WAS a fraction, what would that
force to be true?" — the learner is guided toward assuming the
negation and discovering the eventual impossibility (both p and q
even) themselves. Recommendation: guided discovery for the negate-then-
derive structure on a single worked case (already partially designed in
`math.found.proof`); direct instruction for the strategic-selection
judgment (MC-3) and the precise negation-matching skill (MC-2), since
both require explicit rules rather than independent rediscovery.

## Teaching Sequence

MC-1 (surprise mistaken for contradiction) is addressed first, since a
learner who cannot recognize a genuine P∧¬P impossibility cannot
reliably judge whether ANY contradiction attempt has succeeded. MC-2
(wrong-piece negation) is addressed second, since correct negation is
the necessary FIRST step of every contradiction proof, and errors there
propagate through the entire argument. MC-3 (contradiction over-applied)
is addressed last, as a strategic-judgment issue that only matters once
the technique itself is executed correctly.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the labeled √2
contradiction structure, the primary action targeting MC-1) → **Drill**
(negation practice on quantified claims, targeting MC-2, directly
reusing `math.found.quantifiers`'s own negation rules) → **Thought
Experiment** (the direct-vs-contradiction strategy contrast, targeting
MC-3). **What doesn't fit**: proof by contrapositive's own negation
patterns — related but distinct, covered in its own sibling entry, not
duplicated here.

## Voice Teaching Notes

**Register**: Deliberate about naming the exact impossibility — never
let "contradiction" pass without the learner stating precisely which
statement and its negation were both derived.

**Wait-time**: After deriving what might be a contradiction, pause and
ask "what exactly is the impossibility here?" before confirming — this
directly surfaces MC-1.

**Load-bearing sentences**:
- "A contradiction is a specific X and its own negation, both forced
  true — not just something surprising."
- "Negate the WHOLE claim precisely — match the negation to its exact
  logical form."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

No item bank exists in a Blueprint for this concept; diagnostic
interpretation only. Because MC-1's defining signature is stopping at a
merely surprising result, assessment should require the learner to
state the exact contradictory pair (X and ¬X), not just declare "I
found a contradiction." Because MC-2's defining signature is a
plausible-looking but wrong opening assumption, assessment should
include at least one quantified claim requiring precise negation before
any derivation begins.

## Tutor Recovery Strategy

Likeliest utterance: "I got a weird answer, is that the contradiction?"
— the concept-specific smaller question: "is that 'weird answer'
actually IMPOSSIBLE, or just surprising? Can you state it, and its
opposite, both as things you've derived?" reframes the confusion from
"unexpected means done" to "a contradiction is a specific, checkable
logical impossibility" — directly isolating MC-1's surprise-based
criterion.

## Memory Hooks

**Type**: procedural (negate-derive-conclude, directly extending
`math.found.proof`'s own justified-chain skill with a specific opening
move). Review form: fresh claims requiring the learner to FIRST judge
strategic fit (does this claim's negation hand you something concrete
to work with?), THEN execute, keeping MC-3's judgment active.
Interleaving partners: `math.found.direct-proof` (the strategy
contradiction is most often weighed against) and `math.found.quantifiers`
(the negation rules this technique's opening step directly reuses).

## Transfer Connections

- **Near**: `math.found.direct-proof` (the primary strategic
  alternative), `math.found.proof-by-contrapositive` (a related but
  distinct negation-based technique, covered separately).
- **Far**: computer science's proof-by-contradiction arguments for
  undecidability and impossibility results (e.g. the halting problem);
  legal reductio ad absurdum arguments, directly named in this
  concept's own KG alias.
- **Real-world**: "suppose the opposite were true — what would that
  force?" as a general reasoning pattern in debate, engineering safety
  analysis, and everyday problem diagnosis.
- **Expert transfer**: the learner, facing an unfamiliar claim about
  non-existence or impossibility, automatically reaches for
  contradiction as the natural strategy, rather than forcing a direct
  approach.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Not fabricated beyond
what the KG states.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.proof-by-contradiction.md` — stated explicitly per the
established no-Blueprint convention, not omitted. This entry reuses
`math.found.proof`'s own Blueprint-grounded √2-irrationality worked
example (TA-A03 of that Blueprint) by reference, adding this entry's
own strategy-selection framing and misconceptions not covered there.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. `unlocks: []` for this node is accurate.
Estimated hours (6) and mastery threshold (0.75) match `math.found.
proof`'s and `math.found.direct-proof`'s own values, appropriately
reflecting this concept's parallel status as a focused specialization
of the parent concept.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 9) | No Blueprint existed to ground this entry; all three misconceptions authored directly via the birth-taxonomy diagnostic procedure; core worked example reused by reference from `math.found.proof`, not restated. |

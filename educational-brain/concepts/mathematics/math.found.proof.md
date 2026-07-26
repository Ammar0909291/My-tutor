# Mathematical Proof — `math.found.proof`

## Identity

- **Concept ID**: `math.found.proof` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (children in KG:
  direct-proof, proof-by-contradiction, proof-by-contrapositive, proof-
  by-induction, proof-by-cases, existence-proof, uniqueness-proof,
  writing-mathematics — none yet authored)
- **Prerequisites**: `math.found.logic`, `math.found.rules-of-inference`
  — a proof is a chain of applications of valid inference rules built
  from propositional logic's connectives.
- **Unlocks**: `math.found.theorem`, `math.found.axiom`.
- **Related** (from KG): `math.found.axiom`, `math.found.theorem`,
  `math.found.conjecture`.
- **Difficulty**: developing · **Bloom**: create · **Mastery threshold**:
  0.75 · **Est. hours**: 20
- **Blueprint**: `docs/curriculum/blueprints/math.found.proof.md`
  (PACKAGE_READY, bloom=create).

## Learning Objective

The learner can: distinguish a valid proof from proof-by-example, appeal
to intuition, informal explanation, and circular reasoning; write a
complete direct proof with every step justified by a hypothesis,
definition, axiom, or prior result; construct a proof by contradiction
by correctly negating the conclusion and deriving a genuine
contradiction; and annotate each proof step with its logical basis.

## Core Understanding

A mathematical proof is a finite sequence of logically valid steps that
establishes the truth of a mathematical statement with certainty,
starting from axioms or previously proven results. A proof is a finite
sequence of statements s₁, s₂, …, sₙ where s₁ is an axiom, definition,
or given hypothesis, each subsequent sᵢ follows from previous statements
by a valid rule of inference, and sₙ is the desired conclusion. Proofs
are not explanations or demonstrations — checking examples, appealing to
intuition, or offering an informal explanation may all be convincing,
but none of them eliminate doubt the way a proof does: a proof
establishes certainty by proceeding step-by-step from undeniable
foundations, with no step that a rigorous challenger could dispute. Two
core proof structures recur throughout mathematics: a DIRECT proof
assumes the hypothesis P, applies definitions and prior results, and
derives the conclusion Q directly; a proof BY CONTRADICTION assumes P
and the NEGATION of Q, derives a logical contradiction (something
provably false), and concludes Q must be true after all, since assuming
its negation led to an impossibility. Every genuine proof step must be
derivable from something earlier in the chain — a hypothesis, a
definition, an axiom, or a previously proven theorem — and never from
the conclusion itself, which would make the argument circular.

## Mental Models

- **Beginner model — "a proof is a convincing explanation"**: the
  learner treats persuasiveness as the standard, accepting examples,
  diagrams, or plausible-sounding narratives as sufficient. Shelf-life
  warning: this model fails the moment a genuinely false but
  intuitively "convincing" claim is presented, or a true claim resists
  intuitive explanation but still requires rigorous proof.
- **Intermediate model — "a proof is a chain of justified algebraic/
  logical steps"**: the learner correctly produces multi-step arguments
  and can distinguish direct proof from proof-by-example, but may still
  omit explicit justification for individual steps or accidentally use
  the conclusion as a stepping stone. Upgrade trigger: being asked to
  annotate every line of an existing proof with its specific
  justification (definition, axiom, hypothesis, or prior result).
- **Advanced model — "a proof is a finite sequence where every step is
  traceable to an undeniable foundation, and contradiction is a genuine
  alternative structure"**: the learner reliably annotates every step,
  never uses the conclusion to establish itself, and can select between
  direct proof and proof by contradiction based on which structure the
  problem's own logic supports. Upgrade trigger: being asked to choose
  and justify a proof STRATEGY (direct vs. contradiction) for a novel
  claim, not just execute a specified one.
- **Do not upgrade early**: a learner who still accepts proof-by-example
  as sufficient (beginner model) should not be pushed into contradiction-
  based proofs (advanced model) before direct proof's step-by-step
  justification habit is itself fully secure — contradiction proofs add
  an extra layer of indirection (negate the conclusion first) that
  compounds any existing justification weakness.

## Why Students Fail

The dominant failure is proof-by-example: checking a universal statement
for several concrete cases and declaring it "proven," conflating
"consistent with the evidence checked so far" with "established for
every case" — a universal statement (∀n …) requires an argument that
works for ALL n, not merely the finitely many cases a learner happened
to try. A second failure is circular reasoning: using the very
conclusion the proof is meant to establish as a step within the proof
itself, typically by restating the conclusion in different words and
treating that restatement as if it were new information. A third
failure presents algebra without justification — a chain of correct
algebraic manipulations with no citation of which definition, axiom, or
theorem licenses each step, leaving the argument's logical validity
invisible even when its arithmetic is flawless.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: Proof-by-Example (Foundational)
**Surface form**: "I checked n=1,2,3,4,5 and n²+n is even each time, so
it's always even."
**Mechanism**: Conflates "consistent with" and "proven"; has not
internalised that a universal statement (∀n …) requires an argument
that works for ALL n, not merely many. (Type 1 — overgeneralization from
insufficient sample.)
**Trigger condition**: Any problem asking for a proof of a statement
involving "for all" or "always."
**Repair**: Present a proof-by-example that fails spectacularly: "I
claim n²−n+41 is prime for all positive integers n." Check: n=1: 41
(prime). n=2: 43 (prime). n=3: 47 (prime). … n=40: 1601 (prime). But
n=41: 41²−41+41=41²=1681=41×41 — NOT prime. Forty consecutive
confirmations, then a counterexample. "To prove something for ALL
integers, your argument must work for an arbitrary integer n — one that
could be any integer, not one you choose. Introduce n as 'let n be any
[odd/even/integer]', apply the definition to get a general algebraic
form (like 2k or 2k+1), and derive the conclusion from that general
form."

### MC-2: Circular Reasoning (Type 6 — the conclusion is mistaken for a definition already available for use)
**Surface form**: To prove n²+n is even, writes "n²+n is divisible by
2, so n²+n is even" — uses the conclusion to establish itself.
**Mechanism**: Does not distinguish between what is GIVEN and what is TO
BE SHOWN; may confuse "restating" with "proving."
**Trigger condition**: Any proof where the desired conclusion appears in
the proof body before being established.
**Repair**: Detect circularity directly: "Prove m+n is even. Since m+n
is divisible by 2, m+n is even." The conclusion "is even" appears in
the proof without being established — it just uses different words for
the same thing. "Every proof step must be derivable from something
EARLIER in the chain — either a hypothesis, a definition, an axiom, or
a previously proven theorem. NEVER use the conclusion as support for
itself."

### MC-3: Algebra-Without-Justification (Type 5 — instruction-induced)
**Surface form**: Writes a chain of equalities with no explanations, no
definitions invoked, no logical connectives.
**Mechanism**: Has seen algebra used to "show" things but has not
learned to annotate: which step invokes which definition/axiom/theorem.
**Trigger condition**: Any proof requiring algebraic manipulation
combined with a definition or theorem.
**Repair**: Detect missing justification: "(2j+1)(2k+1) = 4jk+2j+2k+1."
Why is this algebra valid? What axioms of arithmetic are used? At
minimum, cite "expansion of product (distributive law)" and "algebra."
"For algebra steps, cite at minimum 'algebra' or 'by definition of
[term]'. Build the habit: after every line, ask 'what authorises me to
write this?'"

## Analogies

**Primary — the courtroom**: Imagine a courtroom. The prosecution
presents 10 witnesses who each say "I think the defendant was at the
scene." That's convincing, but it's not proof — a skilled defence
lawyer can challenge each witness. A mathematical proof is like an
unbreakable chain of testimony from an infallible source: every step is
airtight and cites a known fact (axiom, definition, or previously
proven theorem). No step can be challenged, because each step follows
necessarily from what came before. Once the chain is complete, the
conclusion is certain — not likely, not plausible, certain.

**Anti-analogy to retire**: "A proof is just a really thorough
explanation." Thoroughness is not the criterion — a maximally thorough
but logically ungrounded explanation is still not a proof, while a
short, tightly justified chain of steps is.

## Demonstrations

**What proof is NOT**: four things that look like proofs but are not —
(1) proof by example: checking n=1,2,3,...,100 and finding no
counterexample doesn't cover n=101,102,...; (2) appeal to intuition:
"it's obvious that..." — diagrams can mislead; (3) informal explanation:
"this makes sense because..." — mathematical sense doesn't establish
mathematical truth; (4) circular reasoning: "it's true because it's
true" — conclusion appears in the argument.

**Direct proof, fully annotated**: Claim: if n is even, then n² is
even. Step 1: Assume n is even. [Hypothesis] Step 2: By definition of
even, n = 2k for some integer k. [Definition] Step 3: n² =
(2k)²=4k²=2(2k²). [Algebra] Step 4: Since k is an integer, 2k² is an
integer. [Closure of ℤ] Step 5: n² = 2·(2k²) has the form 2·(integer).
[From Steps 3–4] Step 6: By definition of even, n² is even. [Definition,
applied to Step 5] ∴ If n is even, then n² is even. □

**Proof by contradiction — √2 is irrational**: Assume for contradiction
that √2 = p/q in lowest terms (gcd(p,q)=1). Then 2=p²/q², so p²=2q².
Thus p² is even → p is even → p=2m. Then (2m)²=2q² → 4m²=2q² → q²=2m² →
q is even. But p and q are both even, contradicting gcd(p,q)=1.
Contradiction. Therefore √2 is irrational. □

## Discovery Questions

Direct instruction throughout, with guided practice at each step — proof
is a genuinely novel skill (bloom=create) requiring learners to see
expert modeling before generating their own arguments. Entry diagnostic:
"Why is checking n=1,2,3 for a statement about 'all integers n' not a
proof?" If the learner correctly identifies that it doesn't cover all
cases, proceed to direct-proof structure; if the learner says it is
enough, this is MC-1 surfacing immediately and should be repaired before
continuing. Scaffolding ladder: identify valid vs. invalid proof steps
(spot-the-error) → annotate a given proof with justifications → complete
a partially-written direct proof → write a complete direct proof from
scratch → construct a proof by contradiction for a simple claim.

## Teaching Sequence

MC-1 (proof-by-example) is addressed first and given the most weight,
since it is nearly universal at this stage and corrupts every subsequent
proof attempt if left unresolved — a learner who accepts examples as
proof cannot meaningfully engage with the justification habit the rest
of the concept depends on. MC-2 (circular reasoning) and MC-3 (algebra
without justification) are addressed together next, once proof-by-
example is resolved, since both concern the INTERNAL structure of an
otherwise correctly-attempted proof and are naturally caught by the same
annotation habit (requiring a justification at every line).

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (proof-by-example) | ERROR ANALYSIS: n²−n+41 "prime for all n" collapses at n=41 | Teaching Actions: TEST-THINKING §5 |
| MC-2/MC-3 active (circularity / no justification) | ERROR ANALYSIS: spot the missing justification or circular step | Teaching Actions: TEST-THINKING §5 |
| Correct structure, needs modeling | WORKED EXAMPLE: annotated direct proof, step by step | Teaching Actions: SHOW §1 |
| Ready for contradiction structure | WORKED EXAMPLE: √2 irrationality, contrasted against direct-proof structure | Teaching Actions: SHOW §1 |
| Ready for transfer | WORKED EXAMPLE (bloom=create): construct an original direct proof for a fresh claim | Teaching Actions: SHOW §1 |

## Voice Teaching Notes

**Register**: Deliberate and exacting. Proof-writing is this program's
first `bloom: create` concept in math.found — resist rushing to the
answer; narrate the justification-seeking habit aloud ("what authorises
this step?") so the learner internalizes the question, not just the
answer.

**Wait-time**: After presenting a claim to prove, wait for the learner
to attempt a strategy choice (direct vs. contradiction) before
supplying one. Premature strategy-naming removes the learner's own
judgment-building opportunity.

**Load-bearing sentences**:
- "A proof eliminates ALL doubt by proceeding step-by-step from
  undeniable foundations — not most doubt, all of it."
- "Every line needs an answer to: what authorises me to write this?"
- "In proof by contradiction, you assume the NEGATION of what you want
  to prove — not the conclusion itself."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

**Gate 1 (RECOGNITION)**: "Which is a valid proof that 'the sum of two
even integers is even'? (A) tested three numeric examples. (B) let
m=2j, n=2k, derived m+n=2(j+k)." Pass: identifies (B) as valid and (A)
as proof-by-example, explaining that checking finitely many cases
doesn't establish the claim for all even integers.

**Gate 2 (DIRECT PROOF)**: Prove directly: the product of two odd
integers is odd. Pass: uses general form (2j+1)(2k+1), derives
2(2jk+j+k)+1, cites the definition of odd, no numeric substitution used.

**Gate 3 (CONTRADICTION STRUCTURE)**: In a proof by contradiction that
"there is no largest even integer," what would you assume at the start?
Pass: "Assume there IS a largest even integer, call it N" (the negation
of the conclusion, not the conclusion itself).

**Gate 4 (JUSTIFICATION)**: Given an unannotated algebraic proof
fragment, identify which line lacks a justification and supply one.
Pass: correctly names the missing definition/axiom/prior-result
citation.

**Mastery criterion**: score ≥4/5 (P77 items + P76 transfer probe),
consistent with KG mastery_threshold 0.75.

## Tutor Recovery Strategy

**If Gate 1 fails**: MC-1 is active. Deploy the n²−n+41 counterexample
immediately — a single dramatic failure after 40 confirmations is more
persuasive than any explanation of why proof-by-example is invalid in
general.

**If Gate 2 fails with numeric substitution**: Redirect: "using specific
numbers proves one case. Let the variables stand for ARBITRARY integers
— use 2j+1 and 2k+1, not 3 and 5 — so the argument covers every odd
integer at once."

**If Gate 4 fails**: MC-2 or MC-3 is active. Require the learner to ask,
line by line, "what earlier statement licenses this one?" — do not
supply the missing justification directly; let the learner locate the
specific gap.

**Stuck-learner script**: "Let's slow down to one step. What are we
GIVEN, and what are we trying to SHOW? Write both down before writing
anything else." If the learner cannot separate given from to-be-shown,
the prerequisite gap is in `math.found.rules-of-inference`'s own
premise/conclusion structure.

## Memory Hooks

**Memory type**: Procedural + generative (bloom=create — the skill is
producing novel valid arguments, not recalling a fixed template).

**Forgetting profile**: The proof-by-example rejection is durable once
internalized. The specific structural habits (explicit justification per
line, correctly negating the conclusion for contradiction proofs) are
fragile and decay toward "convincing but unjustified" writing without
regular annotated practice.

**Spaced retrieval targets**:
- Session +1: Write a direct proof that if n is odd, then n² is odd.
- Session +3: Spot the flaw in "√2≈1.414, which cannot be expressed as
  p/q — therefore √2 is irrational" (this is numeric approximation, not
  proof).
- Session +7: Prove by contradiction that there is no largest prime.
- Session +30: Articulate, unprompted, the difference between a proof
  and a convincing informal argument.

## Transfer Connections

**Near transfer**:
- `math.found.theorem` (a theorem is precisely a statement established
  by proof)
- `math.found.axiom` (the starting points every proof's chain ultimately
  rests on)
- Direct-proof, contradiction, contrapositive, induction, and cases as
  named specializations of the same underlying justified-chain structure
  (KG children, not yet individually authored)

**Far transfer**:
- Computer science: formal verification and program correctness proofs
  use the identical justified-step-chain structure
- Legal reasoning: the courtroom analogy's own domain — building an
  airtight chain of evidence
- Scientific argument: distinguishing "consistent with the data" from
  "proven," directly generalizing MC-1's lesson beyond mathematics

## Cross-Subject Connections

None via KG `cross_links` (empty for this node), matching the
Blueprint's own explicit P76-independence declaration. Not fabricated
beyond what the KG states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.proof.md`.

Key teaching objectives and misconception registry reused by reference
above; the full P77 problem set and the P76 transfer probe (proving the
sum of two odd numbers is even, with a marking rubric) not restated in
full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The
annotated direct-proof and contradiction-proof demonstrations are
suitable future Explanation Memory seeds; the n²−n+41 counterexample is
a suitable future Probe asset seed.

## Curriculum Feedback

No structural KG issues found. This is this program's first `bloom:
create` concept authored in math.found — the Blueprint's own Teaching
Notes explicitly justify this choice (proof-writing requires generating
a novel valid argument, not merely applying a template), and this
entry's Teaching Sequence and Tutor Actions were written to respect that
distinction (worked-example modeling before independent construction,
rather than jumping straight to unscaffolded practice). Estimated hours
(20) and mastery threshold (0.75) are appropriate for a concept whose
eight KG children (direct-proof, proof-by-contradiction, etc.) all
depend on this node's foundational justification habit.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 8) | Initial entry, grounded in the existing Blueprint. |

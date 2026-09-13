# math.seq.recursive-sequences

## Identity
- **KG id**: `math.seq.recursive-sequences`
- **Domain**: math.seq
- **Requires**: `math.seq.sequence`, `math.found.proof-by-induction`
- **Unlocks**: `math.disc.recurrence-relation` (per the live KG — see Curriculum Feedback: the
  Blueprint states "none listed")
- **Cross-links**: `math.disc.recurrence-relation` (unauthored — see Curriculum Feedback: handled
  in INDEPENDENCE MODE, not the Blueprint's declared cross-link-probe mode)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 8 (per the live KG — see Curriculum Feedback: the Blueprint states 5)

## Learning Objective
Recognize a recursive definition as a different, equally valid way to SPECIFY a sequence (the
object `math.seq.sequence` already studies), understand that computing a recursive term requires
passing through every earlier term in order, and use `math.found.proof-by-induction` to prove
properties of a recursively-defined sequence — while distinguishing that task from the separate
task of finding a closed-form formula for it.

## Core Understanding
`math.seq.sequence` established that a sequence is an ordered list of numbers, and that it can be
specified in more than one way. An EXPLICIT (closed-form) definition gives a formula for the
$n$-th term directly in terms of $n$ — plug in $n$, get the term, with no reference to any other
term. A RECURSIVE definition instead gives each term in terms of one or more PREVIOUS terms, plus
enough starting values (base cases) to get the process going. Both are legitimate specifications of
the SAME kind of object — a sequence — not two different kinds of mathematical entity.

The defining feature of a recursive definition, and the source of its computational cost, is that
finding a specific term requires passing through every earlier term the recursion depends on, in
order. To find the 6th term of a sequence defined by $a_n = a_{n-1} + a_{n-2}$, one cannot "jump
ahead" — the value of $a_6$ genuinely depends on $a_5$, which depends on $a_4$, and so on back to
the base cases. This is qualitatively different from an explicit formula, where $a_{100}$ can be
computed with no reference to $a_{99}$ at all.

Because a recursive definition's structure — each case building directly on the case(s) before it
— exactly mirrors the structure of an inductive proof (a base case, plus a step that builds each
case from the previous one), induction is the natural and standard tool for PROVING properties
about a recursively-defined sequence: a growth bound, a parity pattern, a divisibility property, or
any claim of the form "for all $n$, [property] holds." But proving a property BY induction is a
different task from FINDING a closed-form (explicit) formula for the sequence — induction can
verify that a proposed closed form is correct once one is already suspected, but the systematic
technique for actually DERIVING a closed form from a recurrence (characteristic equations, and
related methods) is a separate, more advanced tool, taken up in `math.disc.recurrence-relation`.

## Mental Models
- **"A recursive definition and an explicit formula are two languages describing the same object."**
- **"To compute term $n$, you must walk through every term before it — there is no shortcut without
  more machinery."**
- **"Induction proves a claim about the sequence; it does not, by itself, hand you a formula."**

## Why Students Fail
All three misconceptions below independently classify as Type 1 (overgeneralization): a habit
correctly trained on explicit sequences or on ordinary proof language is carried over, unmodified,
into the recursive-sequence context where it no longer applies cleanly. The Blueprint carries no
birth-type column, so each classification below is this entry's own independent analysis.

## Misconceptions

### MC-1: RECURSIVE-SEQUENCE-ASSUMED-DIFFERENT-KIND-OF-OBJECT
- **Surface form**: treating a recursively-defined sequence as fundamentally different from — not
  reducible to comparison with — an explicitly-defined one, as if "recursive sequence" named a
  separate category of mathematical object rather than a different specification method for the
  same kind of object already studied in `math.seq.sequence`.
- **Frequency band**: Foundational.
- **Birth type (independently classified — the Blueprint carries no birth-type column)**:
  Type 1, overgeneralization. The unfamiliar self-referential NOTATION ($a_n$ defined in terms of
  $a_{n-1}$) reads as conceptually novel, and that novelty is overgeneralized into "this is a
  different kind of thing," when in fact only the specification METHOD has changed.
- **Repair**: place a recursive definition and its equivalent explicit definition (where one is
  known, e.g. an arithmetic or geometric sequence expressed both ways) side by side, and compute
  the same terms from both — demonstrating they describe the identical sequence.

### MC-2: RECURSIVE-TERMS-ASSUMED-DIRECTLY-COMPUTABLE
- **Surface form**: attempting to compute, say, the 6th Fibonacci term directly from the recurrence
  without first computing terms 1 through 5, or assuming a "shortcut" formula exists without
  deriving one.
- **Frequency band**: High.
- **Birth type (independently classified)**: Type 1, overgeneralization. The habit of "plug the
  index into a formula and get the answer," trained thoroughly by explicit sequences, is
  overgeneralized onto recursive sequences, where that shortcut genuinely does not exist without
  additional machinery.
- **Repair**: have the learner physically attempt to compute $a_6$ for a recursively-defined
  sequence without computing $a_1$ through $a_5$ first, and observe the attempt fail for lack of
  the needed prior values — making the sequential dependency an experienced fact, not an asserted
  rule.

### MC-3: INDUCTION-PROOF-ASSUMED-TO-GIVE-CLOSED-FORM
- **Surface form**: believing that proving a property of a recursive sequence by induction (e.g.
  $F_n \geq n$ for $n \geq 5$) is the same activity as, or automatically produces, a closed-form
  formula for the sequence.
- **Frequency band**: Moderate.
- **Birth type (independently classified)**: Type 1, overgeneralization. Both activities involve
  "prove something is true for a sequence" language, and the surface similarity is overgeneralized
  into treating them as the same task, obscuring that induction VERIFIES a stated claim (which may
  or may not be a closed form) rather than DISCOVERING one.
- **Repair**: contrast proving $F_n \geq n$ by induction (a bound, not a formula) against the
  separate, harder task of finding Binet's exact closed-form formula for $F_n$ — naming the second
  task explicitly as outside this concept's scope, belonging instead to the more advanced technique
  of `math.disc.recurrence-relation`.

## Analogies
- **"Two recipes, same dish"**: an explicit formula and a recursive definition are two different
  sets of instructions that, followed correctly, produce the identical sequence of numbers.
- **Anti-analogy**: a recursive definition is NOT an approximation or a simplification of "the
  real" explicit formula — many sequences (including the Fibonacci sequence itself, without
  further machinery) have no simpler explicit description available at this stage, and the
  recursive definition is a complete and legitimate specification in its own right.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: compute an arithmetic sequence's terms both from its explicit
  formula $a_n = a_1 + (n-1)d$ and from its recursive definition $a_n = a_{n-1} + d$, $a_1$ given —
  same numbers, two specifications.
- **Demonstration 2 (targets MC-2)**: attempt to compute $F_6$ for the Fibonacci sequence
  ($F_1 = F_2 = 1$, $F_n = F_{n-1} + F_{n-2}$) with the intermediate terms hidden, then reveal that
  $F_3, F_4, F_5$ must be computed first — $F_6 = 8$.
- **Demonstration 3 (targets MC-3)**: prove $F_n \geq n$ for $n \geq 5$ by induction, then pose
  "does this proof tell you the exact value of $F_{100}$?" — answer no, naming the closed-form
  derivation as a separate, later task.

## Discovery Questions
1. "If a recursive definition and an explicit formula can produce the exact same list of numbers,
   are they describing two different objects, or one object in two different ways?"
2. "Can you find the 6th term of a sequence defined only by $a_n = a_{n-1} + a_{n-2}$ without first
   finding the 5th and 4th terms? Why or why not?"
3. "Does proving that $a_n$ grows at least as fast as $n$ tell you the exact FORMULA for $a_n$?"

## Teaching Sequence
1. **Anchor**: connect to `math.seq.sequence`'s "a sequence can be specified more than one way,"
   introducing recursive definition as the second specification method alongside explicit formula.
2. **Representation shift**: side-by-side computation of the same sequence both ways
   (Demonstration 1).
3. **Conflict evidence**: the sequential-dependency demonstration (Demonstration 2), making the
   "no shortcut" property an experienced fact.
4. **Contrast pair**: proving a bound by induction versus deriving a closed form
   (Demonstration 3), establishing the two tasks as genuinely distinct.
5. **Mastery gate**: require the learner to compute a specific term of a new recursively-defined
   sequence (correctly passing through all prior terms) and to state, without executing it, what
   an induction proof about that sequence would and would not establish.

## Tutor Actions
- When a learner proposes to compute a distant term of a recursive sequence directly, ask them to
  state which earlier terms they need first, before allowing the computation to proceed.
- After any induction proof involving a recursively-defined sequence, explicitly ask whether the
  proof produced a formula or verified a stated property — do not let the two be conflated silently.

## Voice Teaching Notes
- Introduce the recursive definition immediately as "another way to describe the sequence you
  already know how to think about," never as "a new topic," to preempt MC-1 from the first
  sentence.
- When a learner reaches for a term far down the sequence, verbally walk the chain of dependency
  aloud ("to get term 6, I need term 5; to get term 5, I need term 4...") rather than silently
  supplying the intermediate values.

## Assessment Signals
- **Rung 1 (recognition)**: learner identifies that a recursive definition and an explicit formula
  can specify the same sequence.
- **Rung 2 (application)**: learner correctly computes a specific term of a recursively-defined
  sequence by working through all required prior terms.
- **Rung 3 (transfer)**: learner correctly uses induction to prove a stated property of a
  recursively-defined sequence, and correctly states that doing so does not by itself yield a
  closed-form formula.

## Tutor Recovery Strategy
- If MC-1 recurs, return to the side-by-side explicit/recursive computation of a familiar
  (arithmetic or geometric) sequence.
- If MC-2 recurs, require the learner to write out every intermediate term explicitly before
  reaching the target term, with no term skipped.
- If MC-3 recurs, re-pose the contrast question directly: "did this proof give you a formula, or
  did it verify a claim?"

## Memory Hooks
- "Recursive and explicit: two recipes, one dish."
- "No shortcut — walk the chain."
- "Induction proves a claim; it doesn't hand you a formula."

## Transfer Connections
- `math.seq.sequence` (already authored): supplies the object-level understanding this concept
  extends — a recursive definition is a second specification method for the same kind of object.
- `math.found.proof-by-induction` (already authored): supplies the proof technique whose structure
  mirrors a recursion's own structure, making it the natural tool for proving properties here.
- `math.disc.recurrence-relation`: the systematic technique for DERIVING a closed-form formula from
  a recurrence (e.g. via characteristic equations). This concept has no Educational Brain entry yet
  — see Curriculum Feedback for how this affects the transfer probe below.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.recursive-sequences.md`, reused by
  reference for its Fibonacci-based worked examples (recursive-vs-explicit comparison; the $F_6=8$
  computation walkthrough; the induction proof of $F_n \geq n$ for $n \geq 5$ contrasted against
  finding Binet's closed-form formula) and its three-misconception registry (independently
  birth-type-classified above, since the Blueprint carries no birth-type column).
- Transfer probe, adapted to INDEPENDENCE MODE (see Curriculum Feedback): a population model
  $P_1 = 100$, $P_n = P_{n-1} + 50$, asking the learner to (a) compute $P_5$ by working through the
  recursion, (b) prove the closed form $P_n = 50n + 50$ by induction, and (c) explain, in their own
  words and without relying on any specific technique from `math.disc.recurrence-relation`, why
  proving that closed form correct by induction is a different activity from having DERIVED it in
  the first place — preserving the Blueprint's pedagogical point (verification vs. derivation)
  without assuming the cross-linked concept's characteristic-equation method is available for
  citation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Two genuine Blueprint/KG metadata discrepancies found, both resolved toward the live KG**:
  (1) the Blueprint states `estimated_hours: 5`; the live KG states `estimated_hours: 8`. This
  entry's Identity section uses 8. (2) the Blueprint states "Unlocks: none listed"; the live KG
  states `unlocks: ['math.disc.recurrence-relation']`. This entry's Identity section uses the KG's
  value. Neither the Blueprint nor the KG file was modified — both discrepancies are recorded here
  only.
- **Genuine Blueprint-staleness finding on P76 cross-link mode**: the Blueprint declares its
  transfer probe should run in "cross-link probe" mode against `math.disc.recurrence-relation`,
  describing that concept as "authored earlier." Direct filesystem verification
  (`ls educational-brain/concepts/mathematics/math.disc.recurrence-relation.md`) confirmed this
  file does NOT exist — `math.disc` has no Educational Brain entries at all as of this batch. Per
  this program's established precedent (Batch 48's `math.opt.*` findings, Batch 53's
  `math.seq.convergent`, Batch 58's `math.fnal.hilbert-space`), Blueprint-file-existence is not a
  sufficient condition for cross-link-probe mode — an actual Educational Brain entry must exist.
  This entry therefore uses INDEPENDENCE MODE for its transfer probe instead, adapting part (c) of
  the Blueprint's own probe to remove its assumption that the characteristic-equation method is
  available for direct citation, while preserving the Blueprint's underlying pedagogical intent
  (distinguishing verification-by-induction from derivation-of-a-closed-form).

## Version History
- 2026-09-13 (Batch 62): authored. Unblocked by `math.seq.sequence` (Batch 19) and
  `math.found.proof-by-induction` (Batch 12/13-era `math.found` certification). Companion batch
  concepts: `math.calc.partial-fractions`, `math.trig.trig-equations`,
  `math.seq.infinite-geometric-series`. `math.seq` moves from 10/21 toward 12/21 this batch (two
  math.seq concepts authored). Records two genuine Blueprint/KG metadata discrepancies and one
  P76_mode staleness correction, all resolved toward the KG/filesystem-verified reality per
  standing rule.

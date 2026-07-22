# Predicate — `math.found.predicate`

## Identity

- **Concept ID**: `math.found.predicate` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.proposition`, `math.found.variable` — a
  predicate is precisely a statement containing a free variable (per
  `math.found.variable`'s ranging-symbol concept) that becomes a
  proposition (per `math.found.proposition`'s bivalence test) only once
  that variable is instantiated.
- **Unlocks** (from KG): `math.found.quantifiers` — universal (∀) and
  existential (∃) quantification are the two operations that bind a
  predicate's free variable, producing a proposition without requiring a
  specific instantiation.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.80 · **Est. hours**: 3

## Learning Objective

The learner can: define a predicate as a statement with one or more free
variables that becomes a proposition (has a definite truth value) only
once every free variable is instantiated or bound; compute the truth
set of a predicate over a given domain; correctly handle multi-variable
predicates, recognizing that ALL free variables must be instantiated
before a truth value exists; and distinguish a predicate (which returns
a truth value) from an ordinary function or formula (which returns a
number or other object).

## Core Understanding

A predicate is not a proposition — it is a FUNCTION from a domain to
truth values, `P : D → {T, F}`, that only produces an actual proposition
once every free variable it depends on has been assigned a specific
value (or bound by a quantifier). This is the direct extension of
`math.found.proposition`'s bivalence requirement: "n is even" has no
fixed truth value as written (it depends on n), so it fails
proposition-hood exactly as `math.found.proposition` describes — but
unlike a random non-proposition, a predicate is a WELL-DEFINED function
whose truth-set, `{x ∈ D : P(x) is TRUE}`, is a genuine mathematical
object even before any instantiation happens. This truth-set concept
is the direct bridge to set theory (a predicate literally carves out a
subset of its domain) and to quantifiers (∀ asks whether the truth set
equals the whole domain; ∃ asks whether it is nonempty).

## Mental Models

- **Beginner model — "a predicate like 'n is even' is basically already
  true or false — it's obviously about even numbers"**: the learner
  treats a predicate's grammatical, declarative-sentence form as
  sufficient for proposition-hood, missing that the unassigned free
  variable makes its truth value genuinely undefined until instantiated.
  Shelf-life warning: "this feels like it should have an answer because
  it reads like a normal true/false sentence — but until n is a specific
  number, there's nothing to check."
- **Intermediate model — "a predicate becomes a proposition only after
  substituting a value for every free variable"**: the learner
  correctly withholds a truth-value judgment on `P(n)` itself, and
  correctly evaluates `P(a)` for any specific `a`. Upgrade trigger: a
  multi-variable predicate where only some variables are instantiated
  (e.g. `P(x, 7)` still has `x` free).
  Upgrade trigger: presented with `P(x, 7)` and asked whether it's now a
  proposition — recognizing "no, x is still free."
- **Advanced model — "a predicate defines a truth set over its domain,
  and quantifiers ask questions about that set"**: the learner computes
  `T(P) = {x ∈ D : P(x)}` directly and recognizes `∀x ∈ D, P(x)` as
  asking "does T(P) = D?" and `∃x ∈ D, P(x)` as asking "is T(P) ≠ ∅?" —
  reframing quantification as a set-membership question rather than an
  unrelated new symbol to memorize. Upgrade trigger: computing a truth
  set explicitly and then evaluating both quantified forms from it
  directly.
- **Expert model — "predicates are the building blocks of formal
  specification, arity-general, and structurally distinct from
  value-returning functions"**: the learner fluently handles predicates
  of any arity (number of free variables), never confuses a
  truth-value-returning predicate with a number-returning formula
  sharing similar notation, and recognizes predicates as the natural
  language of formal specification (database queries, program
  invariants, mathematical definitions).
- **Do not upgrade early**: a learner who has not yet stabilized "a
  predicate needs full instantiation to become a proposition"
  (beginner→intermediate) should not be pushed into quantifier-based
  truth-set reasoning (advanced) before that foundational distinction is
  solid — per the Blueprint's own MAMR, MC-1 (PREDICATE-AS-PROPOSITION)
  is cleared before MC-2 and MC-3, which are then addressed FIFO.

## Why Students Fail

The dominant failure, per the Blueprint's own MAMR-foundational
misconception, is the same surface-pattern-matching failure
`math.found.proposition` already names for open sentences generally: "n
is even" is grammatically indistinguishable from a genuine proposition
like "6 is even," and the free variable's absence of any special visual
marking makes it easy to overlook. Because most early exposure treats
predicates informally ("is n prime?") without ever contrasting them
directly against genuine propositions, learners rarely notice the
distinction is even being drawn until asked to state a definite truth
value for an uninstantiated predicate and discover they cannot.

## Misconceptions

Reused from the Blueprint's Component 2 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "PREDICATE-AS-PROPOSITION" (Foundational; Type 4,
  notation-induced — a predicate's grammatical form is visually
  identical to a genuine proposition's, with no marking distinguishing
  a free variable from an instantiated one)**: believing "n is even" is
  itself a proposition with a definite truth value, without substituting
  a value for n. Full trigger/root-cause/error-pattern: Blueprint
  Component 2, MC-1.
- **MC-2 — "PREDICATE-ONE-VARIABLE" (Type 1, overgeneralization — most
  introductory examples use a single free variable, and the learner
  extends this incidental pattern into a rule)**: believing a predicate
  can only have one free variable, rejecting or misunderstanding
  multi-variable predicates. Full content: Blueprint Component 2, MC-2.
- **MC-3 — "PREDICATE-AS-FORMULA" (Type 4, notation-induced — the
  notation `P(x)` is visually identical whether `P` denotes a
  truth-value-returning predicate or a number-returning function)**:
  believing a number-returning formula like `P(x) = x² + 1` is itself a
  predicate, conflating "returns a number" with "returns a truth value."
  Full content: Blueprint Component 2, MC-3.

## Analogies

- **Best analogy — a quiz question with a blank**: "___ is even" is a
  question with no answer until the blank is filled; filling it with 6
  gives a definite TRUE, filling it with 7 gives a definite FALSE — the
  blank is the free variable, filling it in is instantiation. Breaking
  point: a quiz question has exactly one blank in the simplest case;
  predicates generalize naturally to many simultaneous blanks
  (multi-variable predicates), which the quiz-blank picture doesn't
  automatically suggest.
- **Alternative — a vending machine that reports true/false, not a
  snack**: insert a specific value, and the machine outputs TRUE or
  FALSE (never a snack, never a number) — this is what distinguishes a
  predicate from an ordinary function/formula machine, which would
  output a number instead. Breaking point: a real vending machine has a
  fixed, small set of inputs; a predicate's domain can be infinite (all
  real numbers, all natural numbers), which the machine picture doesn't
  emphasize.
- **ANTI-ANALOGY — do NOT say "a predicate is basically just a
  function, only about numbers instead of truth values"**: this
  directly installs MC-3 — the entire point of a predicate is that its
  OUTPUT TYPE is a truth value, categorically different from a
  number-returning function's output, not merely "a function about a
  different kind of number."

## Demonstrations

- **Predicate-vs-proposition instantiation demonstration**: `P(n) : "n
  is prime"` shown alongside `P(7)` (a proposition, TRUE) and `P(4)` (a
  proposition, FALSE), directly confronting whether `P(n)` itself is a
  proposition — targets MC-1.
- **Truth-set computation demonstration**: computing `T(P)` for several
  predicates over finite and infinite domains (including `T(P) = ∅` and
  `T(P) = D` edge cases), then reframing `∀`/`∃` as questions about that
  truth set — extends the advanced mental model concretely.
- **Multi-variable partial-instantiation demonstration**: `P(x, 7)`
  shown still containing a free variable (x) despite one of two
  variables being filled in — directly targets MC-2.

## Discovery Questions

**Need** — asked for the truth value of `P(n) : "n is prime"` with no n
specified, the learner attempts an answer and discovers there isn't one
without picking a value. **Playground** — the learner substitutes
several different values of n and observes the truth value changing
each time. **Invention** — the learner proposes that `P(n)` itself isn't
really a proposition — it's more like a question waiting for an answer.
**Collision** — presented with `P(x, 7) : "x < 7"` and asked whether
this is now a proposition since one variable is filled in — discovering
that x is still free, directly targeting MC-2. **Formalization** —
naming the definition explicitly: a predicate is a function from its
domain to {TRUE, FALSE}, becoming a proposition only when every free
variable is instantiated or bound. **Compression** — given a fresh
multi-variable predicate, computing its truth set and correctly
evaluating both `∀` and `∃` statements built from it.

## Teaching Sequence

MC-1 (predicate-as-proposition) is repaired first, per the Blueprint's
own MAMR ordering, since a learner who assigns a definite truth value
to an uninstantiated predicate has no coherent basis for reasoning about
truth sets, multi-variable arity, or the predicate/formula distinction —
all of which depend on first accepting that a predicate's truth value
is undefined until instantiation. MC-2 and MC-3 are then addressed in
FIFO order once MC-1 is cleared.

## Tutor Actions

From `../../teaching-actions/`: **Analogy Bridge** (the quiz-question-
with-a-blank analogy, the primary action for MC-1) → **Pattern
Induction / Representation Shift** (truth-set computation, bridging
predicates to quantifiers) → **Contrast Pair** (the multi-variable
partial-instantiation table, targeting MC-2, and the formula-vs-
predicate output-type table, targeting MC-3). **What doesn't fit**: a
full formal treatment of quantifier truth-table semantics — this
concept previews quantifiers only at the "binding machine" level per
the Blueprint's own teaching notes; full quantifier semantics belongs to
`math.found.quantifiers`.

## Voice Teaching Notes

Listen for "well it's true when n is even, so it's true" applied to an
uninstantiated predicate — this is MC-1's clearest verbal signature,
smuggling in an implicit instantiation without noticing it. A learner
who says "wait, can a predicate really have TWO blanks?" with genuine
surprise is showing MC-2 directly. The load-bearing sentence: "a
predicate is a function that returns a truth value — not a proposition
by itself, and not a formula that returns a number."

## Assessment Signals

The Blueprint's own 6-item mastery gate (P77 problem set + P76 library-
database transfer probe, pass criterion 5/6) is the concrete item bank —
not re-authored here. Diagnostic interpretation this entry adds: a
learner who correctly refuses to assign `P(n)` a truth value (MC-1
cleared) but still treats `P(x, 7)` as a fully-instantiated proposition
because "a number was substituted somewhere" (MC-2 still latent) shows
that "recognizing the general predicate/proposition boundary" and
"correctly counting how many free variables remain in a multi-variable
case" are separable skills requiring independent verification.

## Tutor Recovery Strategy

Likeliest utterance: "but 'n is prime' clearly means something — how
can it not have a truth value?" — the concept-specific smaller question:
"if I asked you right now, true or false, WITHOUT picking a number for
n — could you actually answer?" reframes the confusion from "this
statement seems meaningful" (which is true — it's a well-formed
predicate) to "does it currently have ONE fixed truth value" (it does
not) — directly isolating MC-1's conflation of meaningfulness with
truth-definiteness.

## Memory Hooks

**Type**: concept (a structural-recognition skill: distinguishing
predicates from propositions and from value-returning formulas,
independent of the specific predicate's content). Review form: fresh
predicates across varying arity and domain, sorted by
predicate/proposition/formula status, never rote recall of a fixed
example set. Interleaving partners: `math.found.proposition` (the
target object a predicate becomes once fully instantiated) and
`math.found.variable` (the free/bound distinction this concept depends
on directly) — mixed practice across all three sharpens the shared
"is this symbol currently bound or free" skill.

## Transfer Connections

- **Near**: computing the truth set of a fresh predicate over a stated
  domain, and correctly evaluating both a universal and an existential
  statement built from it.
- **Far**: recognizing predicate-like structures in database query
  languages (a WHERE clause is a predicate over table rows) and in
  programming (a boolean-valued function or a type's invariant
  condition).
- **Real-world**: recognizing when an everyday claim ("students who
  pass") is actually a predicate over an implicit domain (all students)
  rather than a single fixed fact.
- **Expert transfer**: the learner, meeting an unfamiliar formal
  specification or database query, automatically identifies its free
  variables and asks what domain and instantiation would be needed to
  turn it into a definite true/false claim.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node, confirmed against the
Blueprint's own Component 7 check — P76 uses an independent, self-
contained library-database context rather than a genuine cross-link).
Not fabricated beyond what the KG states.

## Blueprint References

`docs/curriculum/blueprints/math.found.predicate.md` — Status
PACKAGE_READY (345 lines; V-1 through V-20 all PASS). This entry reuses
by reference: the full Misconception Registry (Component 2, MC-1–MC-3)
and the P76 library-database transfer probe (Component 4, TA-A05). Not
restated beyond what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's two prerequisites, one-item unlocks list, and
empty cross-links all match the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 4). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.

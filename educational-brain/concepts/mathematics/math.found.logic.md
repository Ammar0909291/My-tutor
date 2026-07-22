# Mathematical Logic — `math.found.logic`

## Identity

- **Concept ID**: `math.found.logic` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.mathematical-language` — the
  load-bearing part is accepting that mathematical statements must be
  precise and unambiguous; logic is the formal system that makes
  precise reasoning ABOUT such statements possible (how to combine them,
  when a combination is true, and what follows validly from what).
- **Unlocks** (from KG): `math.found.proof`, `math.found.set-theory`,
  `math.disc.boolean-circuits` — proof requires valid inference rules;
  set theory's operations (union, intersection, complement) are
  literally logical connectives applied to membership; Boolean circuits
  are logic's physical realization.
- **Difficulty**: foundational · **Bloom**: analyze · **Mastery
  threshold**: 0.80 · **Est. hours**: 12 (the longest estimated-hours
  figure of the Wave 1/2 concepts so far, reflecting genuine breadth —
  this node has 7 KG child concepts: proposition, logical connectives,
  truth tables, predicate logic, quantifiers, logical equivalence, and
  rules of inference)

## Learning Objective

The learner can: analyze a compound mathematical statement to identify
its connective type; evaluate its truth value given the truth values of
its components; determine whether a two-step argument is valid using
modus ponens or modus tollens; and distinguish a tautology from a
contradiction. A learner who labels "IF P THEN Q" correctly but then
asserts its converse "IF Q THEN P" is equivalent has NOT achieved
mastery — per the Blueprint's own explicit NOT-clause, this is the
single most diagnostic failure mode for this concept.

## Core Understanding

Mathematical logic studies the formal structure of valid reasoning
independent of any particular subject matter: given the truth values of
component propositions, what is the truth value of a compound statement
built from them, and given some statements accepted as true, what
FOLLOWS with certainty? The material conditional "IF P THEN Q" is the
single most misunderstood piece of this structure — it is false in
exactly one case (P true, Q false; a promise made and broken) and true
in all three other cases, including when P is simply false (an untested
promise cannot be broken). This one fact — the material conditional's
truth table — is the load-bearing core the rest of propositional logic
builds on, and getting it wrong propagates errors through every
downstream argument-validity judgment.

## Mental Models

- **Beginner model — "IF-THEN means a causal, real-world connection"**:
  the learner reads "IF P THEN Q" the way everyday speech uses "if,"
  expecting some causal or relevant connection between P and Q, and
  treats a false P as somehow invalidating or making the whole statement
  meaningless rather than automatically true. This is the arriving,
  largely incorrect default. Shelf-life warning: "everyday 'if' often
  implies a real connection — mathematical IF-THEN doesn't require
  one, and we're about to see exactly why that's not a flaw."
- **Intermediate model — "IF-THEN is a promise, broken only one way"**:
  the learner can correctly evaluate all four rows of the IF-THEN truth
  table using the promise framing (broken only when P is true and Q is
  false). Upgrade trigger: asked to evaluate the CONVERSE of a
  statement, which the promise framing alone doesn't obviously protect
  against confusing with the original.
- **Advanced model — "P→Q and Q→P are different statements, argument
  forms have names"**: the learner correctly distinguishes a
  conditional from its converse, inverse, and contrapositive, and
  identifies valid argument forms (modus ponens, modus tollens) versus
  invalid ones (affirming the consequent, denying the antecedent) by
  name.
- **Expert model — "logic as a portable formal system"**: the learner
  applies truth-functional analysis to genuinely novel compound
  statements and multi-step arguments fluently, and recognizes valid vs.
  invalid argument PATTERNS independent of subject matter (the same
  invalid pattern — affirming the consequent — is recognizable whether
  the content is numbers, geometry, or an everyday argument).
- **Do not upgrade early**: a learner still evaluating the basic IF-THEN
  truth table unreliably (intermediate model not secure) should not be
  pushed into converse/contrapositive distinctions (advanced model) —
  the Blueprint's own Student State Matrix separates S1 (procedural but
  IF-THEN-misapplying) from S2 (actively holds the converse-confusion
  misconception) as distinct states requiring different protocols.

## Why Students Fail

The dominant, best-documented failure (the Blueprint's own MC-1 and
MC-2) is that everyday "if-then" language carries connotations formal
logic deliberately strips away: causal connection, relevance, and — most
consequentially — the assumption that "if P then Q" and "if Q then P"
say roughly the same thing (in ordinary conversation, this conflation
rarely causes practical trouble, since most everyday conditionals ARE
biconditional in intent, or the distinction doesn't matter for the
purpose at hand). Mathematical logic is the first context where this
conflation produces systematically wrong answers, because mathematical
conditionals are frequently genuinely one-directional (divisible-by-4
implies divisible-by-2, but not conversely) and the truth values can
diverge sharply.

## Misconceptions

Reused from the Blueprint's Component 6 Misconception Engine (MC-1
through MC-4) by reference, with birth-type classification added:

- **MC-1 — "IF P THEN Q is false when P is false" (Type 3, language
  contamination — everyday conditional statements are rarely evaluated
  when their antecedent is false, so the learner has no strong intuition
  for that case and defaults to treating it as undefined or false)**:
  full conflict evidence / bridge / replacement: Blueprint Component 6,
  MC-1 (the umbrella-promise example).
- **MC-2 — "IF P THEN Q means IF Q THEN P" (Type 1, overgeneralization —
  many everyday conditionals ARE effectively biconditional, and this
  correct-in-context pattern is overextended to genuinely one-directional
  mathematical conditionals)**: full content: Blueprint Component 6,
  MC-2 (divisible-by-4/divisible-by-2, refuted by $x=6$). MAMR note
  (Blueprint's own): repair MC-1 before MC-2, since correctly
  understanding when IF-THEN is false is prerequisite to reasoning about
  the converse's direction at all.
- **MC-3 — "A single example proves a mathematical statement true" (Type
  1, overgeneralization from the same everyday confirmation-bias pattern
  `math.found.generalization`'s MC-1 addresses at the claim level — this
  is its logic-level counterpart, framed specifically around universal
  statements)**: full content: Blueprint Component 6, MC-3 (Goldbach's
  conjecture, checked to $4\times10^{18}$ and still unproven — the
  asymmetry: examples support, one counterexample defeats).
- **MC-4 — "Inclusive OR is exclusive OR" (Type 3, language
  contamination — everyday "or" is frequently exclusive, e.g. "tea or
  coffee?")**: full content: Blueprint Component 6, MC-4 (the
  dessert-if-you-finish-dinner-or-clean-your-room example).

## Analogies

- **Best analogy — a promise, broken only one specific way** (Blueprint
  MC-1's own framing): "if it rains, I'll carry an umbrella" is broken
  only if it rains AND no umbrella appears; on a dry day, no promise was
  ever tested, so it stands true by default. Breaking point: real
  promises carry social/causal expectations mathematical conditionals
  explicitly lack — useful for the truth-table mechanics, not for
  conveying that mathematical IF-THEN requires no real connection
  between P and Q at all.
- **Alternative — "all squares are rectangles" vs. "all rectangles are
  squares"** (for the converse, MC-2): a directly checkable, visual
  everyday-geometry pair where the original is true and the converse is
  false — grounds converse confusion in something the learner can verify
  by drawing, before any symbolic notation appears.
- **ANTI-ANALOGY — do NOT use "if-then is basically 'whenever...
  usually'"**: this reintroduces exactly the fuzzy, causal-flavored
  everyday reading MC-1 and MC-2 both stem from, undermining the
  precision the whole concept is trying to install.

## Demonstrations

- **The umbrella-promise truth-table walkthrough** (Blueprint MC-1):
  all four P/Q combinations evaluated via the promise framing,
  predict-first on each row.
- **The divisible-by-4/divisible-by-2 converse demonstration**
  (Blueprint MC-2): the learner predicts whether the converse holds,
  then tests $x=6$.
- **The Goldbach-conjecture demonstration** (Blueprint MC-3): the
  striking $4\times10^{18}$-confirmations-still-unproven fact, paired
  with the asymmetric "one counterexample would settle it instantly"
  contrast.
- **The dessert-OR demonstration** (Blueprint MC-4): a concrete
  both-conditions-satisfied scenario tested against the learner's
  either/or intuition.

## Discovery Questions

**Need** — given the umbrella-promise statement and asked "did I lie?"
across four dry/rainy, umbrella/no-umbrella scenarios, the learner's
everyday intuition initially struggles with the "P false, statement
still true" case specifically. **Playground** — the learner reasons
through what "breaking a promise" would require in each scenario.
**Invention** — the learner proposes that the promise is only broken in
the rain-without-umbrella case. **Collision** — pushed to state the
truth value for "no rain, no umbrella," many learners hesitate or guess
false; the promise framing resolves it to true. **Formalization** —
the full IF-THEN truth table stated explicitly, matching the learner's
own reasoning. **Compression** — immediate reapplication to a fresh
conditional statement with no promise framing needed.

## Teaching Sequence

Per the Blueprint's own diagnostic-first rule ("do not introduce truth
tables or formal notation until after routing"), proposition recognition
(DQ-1: can the learner tell a statement with a definite truth value from
an opinion or vague claim?) must be confirmed before any connective is
taught. Within the connectives, MC-1 (the basic IF-THEN truth table,
especially the false-antecedent case) must be repaired before MC-2
(converse confusion) is addressed — understanding when a conditional is
false is prerequisite to reasoning correctly about its converse's
direction, per the Blueprint's own MAMR ordering.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the umbrella-promise
walkthrough) → **Prediction** (attached to every truth-table row and
every converse question) → **Worked Example** (the Goldbach-conjecture
asymmetry) → **Error Analysis** (a stated invalid argument form —
affirming the consequent — examined for its specific flaw). **What
doesn't fit**: introducing formal symbolic notation (→, ∧, ∨, ¬) before
the everyday-language promise framing is secure — the Blueprint's own
S9 (second-language learner) protocol explicitly needs visual truth
tables before verbal definitions, and even S0's Protocol A leads with
concrete, notation-free propositions (DQ-1's five example statements).

## Voice Teaching Notes

Listen for "that's not fair, it didn't even rain" style objections to
the false-antecedent-is-true case — this is MC-1's clearest verbal
signature, distinguishable from a learner who accepts it readily. A
learner who, given "all squares are rectangles," spontaneously asserts
"so all rectangles are squares" without being asked is showing MC-2
unprompted, a stronger signal than a correct answer only under direct
questioning. The load-bearing sentence: "an untested promise cannot be
broken" — the Blueprint's own phrasing, effective because it reframes
the confusing case (P false) as simply inapplicable rather than
requiring evaluation.

## Assessment Signals

The Blueprint's own Diagnostic Battery (DQ-1 through DQ-3) and per-
misconception detection probes are the concrete item bank — not
re-authored here. Diagnostic interpretation this entry adds: a learner
who correctly evaluates the IF-THEN truth table in the ABSTRACT (P, Q as
symbols) but reverts to MC-1 reasoning on a concrete real-world
conditional (or vice versa) has a representation-specific gap, not a
fully resolved or fully unresolved misconception — both symbolic and
concrete forms should be checked before certifying MC-1 as repaired,
per the D1 grid's own emphasis on testing under varied surface
conditions.

## Tutor Recovery Strategy

Likeliest utterance: "but that doesn't make sense" when told a
false-antecedent conditional is true — the concept-specific smaller
question: "did I ever actually make the promise apply — did it rain?"
(no) → "then can the promise have been broken?" (no) — walks the learner
through the promise logic one step at a time rather than re-asserting
the truth-table rule directly.

## Memory Hooks

**Type**: concept with an embedded procedural skill (fluent truth-table
evaluation, which benefits from repeated practice to become automatic).
Review form: fresh compound statements and arguments across representation
(symbolic and everyday-language), never rote memorization of the truth
table's four rows as an isolated fact. Interleaving partners: the KG's
own 7 child concepts (`proposition`, `logical-connectives`,
`truth-table`, `predicate-logic`, `quantifiers`, `logical-equivalence`,
`rules-of-inference`) — once those are authored, mixed practice across
connective types is the natural extension of this root concept's own
scope.

## Transfer Connections

- **Near**: a fresh compound statement or two-step argument evaluated
  for truth value or validity.
- **Far**: recognizing invalid argument forms (affirming the consequent,
  denying the antecedent) in non-mathematical arguments.
- **Real-world**: legal and everyday conditional statements ("if you're
  late, you'll miss the bus") examined for whether the converse or
  contrapositive is being silently (and validly, or invalidly) assumed.
- **Expert transfer**: the learner spontaneously identifies a converse-
  confusion fallacy in an everyday argument outside any mathematics
  context — the strongest evidence the advanced model has become a
  general reasoning habit.

## Cross-Subject Connections

Via KG `cross_links`: `math.disc.boolean-circuits` — logic gates in
digital circuits directly implement the connectives taught here (AND,
OR, NOT gates correspond exactly to ∧, ∨, ¬), matching this cross-link
precisely; this connection is also computer-science-adjacent (Boolean
algebra underlies both digital logic and much of programming's
conditional structure), though the KG's own cross_links field for this
node lists only the mathematics-internal target.

## Blueprint References

`docs/curriculum/blueprints/math.found.logic.md` — read in full
(Components 0-10, status READY, all 20 V-checks PASS). This entry
reuses by reference: the full Student State Matrix and Protocol library
(Components 2, 5), the Misconception Engine (Component 6, MC-1–MC-4),
and the Assessment Battery/Mastery Gate (Components 7-8). Not restated
beyond what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's single prerequisite, three-item unlocks list, and
single cross-link all match the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 2). Anchored to the live KG node and the
  existing READY-status Blueprint; all 4 misconceptions reused by
  reference.

# Proposition — `math.found.proposition`

## Identity

- **Concept ID**: `math.found.proposition` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.logic` — the load-bearing part is the
  notion of a truth value; a proposition is specifically a declarative
  sentence that HAS exactly one truth value (true or false), never both,
  never neither.
- **Unlocks** (from KG): `math.found.logical-connectives`,
  `math.found.truth-table` — connectives (AND/OR/NOT/IF-THEN) combine
  propositions into compound propositions; truth tables enumerate every
  truth-value combination of the propositions feeding into a connective.
  Both require a learner who can reliably recognize what does and does
  not qualify as a proposition in the first place.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery
  threshold**: 0.85 · **Est. hours**: 2

## Learning Objective

The learner can: define a proposition as a declarative sentence that has
exactly one truth value (true or false), never both and never neither;
correctly sort a mixed list of sentences into propositions and
non-propositions; and explain why an open sentence with a free variable
(like "x > 3") and a subjective opinion (like "mathematics is beautiful")
both fail to qualify, for different reasons.

## Core Understanding

A proposition is not just "a mathematical-looking sentence" — it is any
declarative sentence with a definite, single truth value, decidable in
principle even if not yet known in practice. Bivalence (exactly one of
TRUE or FALSE, never both, never neither) is the entire test. This is
why "7 is prime" is a proposition (definitely true), "there are
infinitely many twin primes" is a proposition (definite truth value,
even though — as of ordinary instructional context — it is not yet
known which), but "x > 3" is NOT a proposition (its truth value depends
on an unassigned variable) and "mathematics is the most beautiful
subject" is NOT a proposition (no objective fact-of-the-matter fixes its
truth value at all).

## Mental Models

- **Beginner model — "a proposition is any mathematical-sounding
  sentence"**: the learner treats surface form (contains numbers,
  symbols, or mathematical vocabulary) as sufficient, missing that an
  open sentence with a free variable looks identical in form to a true
  proposition. Shelf-life warning: this model works for hand-picked
  textbook examples but fails immediately on any sentence containing an
  unbound variable.
- **Intermediate model — "a proposition must have a definite,
  checkable truth value"**: the learner tests candidate sentences
  against bivalence directly, correctly rejecting open sentences (no
  fixed truth value until the variable is assigned) and opinions (no
  truth value at all). Upgrade trigger: presented with an open sentence
  next to a structurally similar true proposition (e.g. "x > 3" next to
  "5 > 3").
- **Advanced model — "propositions can have unknown-to-us but still
  definite truth values"**: the learner distinguishes "we don't know
  which truth value" (an epistemic gap — still a genuine proposition)
  from "there is no fixed truth value" (a structural disqualification —
  not a proposition at all). Upgrade trigger: an unsolved-but-well-posed
  mathematical claim (e.g. Goldbach's conjecture) presented as a
  legitimate proposition despite being currently unproven.
- **Expert model — "the bivalence test is what matters, not subject
  matter or difficulty"**: the learner applies the same single test
  (exactly one truth value, in principle) uniformly across trivial and
  profound, mathematical and non-mathematical sentences alike, and can
  articulate why classical logic's bivalence itself is a deliberate
  choice (some non-classical logics relax it) rather than treating it as
  an unexamined given — the same "systems make deliberate foundational
  choices" understanding this domain's `math.found.axiom` concept
  establishes, now applied to logic's own bivalence assumption.
- **Do not upgrade early**: a learner still testing by surface form
  (beginner model) should not be pushed toward the expert model's
  meta-level discussion of non-classical logics — the Blueprint's own
  Protocol A addresses the OPEN-SENTENCE-AS-PROPOSITION misconception
  (MC-1) as the first, foundational repair before anything else.

## Why Students Fail

The dominant failure, per the Blueprint's own MAMR-foundational
misconception, comes from surface-pattern matching: an open sentence
like "x > 3" is grammatically and visually indistinguishable from a true
proposition like "5 > 3" until the learner specifically checks whether
every symbol is bound to a value. Since most early exposure to
mathematical sentences comes bundled with an implicit or explicit "solve
for x" framing, learners default to treating the presence of a variable
as normal rather than as the exact feature that disqualifies a sentence
from being a proposition.

## Misconceptions

Reused from the Blueprint's Component 2 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "OPEN-SENTENCE-AS-PROPOSITION" (Type 4, notation-induced —
  the free variable's surface resemblance to a bound one drives the
  error)**: MAMR-foundational. Trigger: "'x > 3' is a proposition."
  Full trigger/root-cause/error-pattern: Blueprint Component 2, MC-1.
- **MC-2 — "OPINION-AS-PROPOSITION" (Type 3, language contamination —
  ordinary declarative-sentence grammar is shared between factual claims
  and opinions, and the learner imports natural-language sentence-hood
  as sufficient for proposition-hood)**: Trigger: "'Mathematics is the
  most beautiful subject' is a proposition." Full content: Blueprint
  Component 2, MC-2.
- **MC-3 — "PARADOX-BIVALENCE" (Type 6, analogy/prior-experience
  overextension — the learner has seen that some statements are hard to
  classify, and stretches this into accepting genuinely self-referential
  paradoxes as ordinary propositions with an "unusual" truth value)**:
  Trigger: "'This statement is false' is a proposition — it just has an
  unusual truth value" (the Liar paradox). Full content: Blueprint
  Component 2, MC-3.

## Analogies

- **Best analogy — a yes/no question with a definite (even if
  currently unknown) answer**: "is the number of primes infinite?" has
  exactly one correct yes/no answer waiting to be found — unlike "what's
  your favorite number?", which has no single correct answer at all.
  Breaking point: not every yes/no-shaped question is a proposition in
  the formal sense (a question isn't even declarative), so this analogy
  supports the "definite truth value" intuition without being a literal
  equivalence.
- **Alternative — a locked box with a single true label already
  inside**: the label (true or false) is already fixed and sealed inside
  the box even if nobody has opened it yet — matching "unknown to us but
  still definite." Breaking point: an open sentence is not a box with an
  unread label; it is a box with NO label at all until a variable is
  assigned, a structurally different situation from just not having
  looked yet.
- **ANTI-ANALOGY — do NOT say "a proposition is just any sentence that
  could be true or false"**: "could be" dangerously reintroduces MC-1 —
  "x > 3" also "could be true or false" depending on x, which is
  precisely why it fails to be a proposition; the correct test is
  whether the sentence, as stated, HAS a single fixed truth value, not
  whether one is merely conceivable under some assignment.

## Demonstrations

- **Mixed-sentence sorting demonstration**: a list mixing true
  propositions ("7 is prime"), false propositions ("2 + 2 = 5"), open
  sentences ("x + 1 = 5"), opinions ("calculus is harder than algebra"),
  and one self-referential paradox sentence — sorted live, each
  rejection tied to a specific reason (unbound variable / no
  fact-of-the-matter / structural paradox).
- **Unknown-but-definite demonstration**: contrasting "there are
  infinitely many twin primes" (unsolved, but a genuine proposition)
  against "x > 3" (not unsolved — structurally incomplete) to separate
  "don't know yet" from "not a proposition."

## Discovery Questions

**Need** — given "x > 3," the learner is asked whether it's true or
false, and naturally answers "it depends on x." **Playground** — the
learner is given several values to substitute for x and observes the
truth value changing each time. **Invention** — the learner proposes
that "x > 3" itself isn't really true or false until x is fixed, so
maybe it isn't the same kind of sentence as "5 > 3." **Collision** —
shown a genuinely unsolved but well-posed mathematical claim (e.g.
Goldbach's conjecture) and asked whether it's "the same kind of
sentence" as "x > 3" — surfacing that "currently unknown" and
"structurally incomplete" are different situations (directly targets
MC-1 and previews MC-3's bivalence boundary). **Formalization** —
naming the bivalence test explicitly: exactly one truth value, in
principle, never both, never neither. **Compression** — sorting a fresh
mixed list (propositions, open sentences, opinions) using only the
named test.

## Teaching Sequence

MC-1 (open-sentence-as-proposition) is repaired first, per the
Blueprint's own MAMR ordering, since it is the most common and most
consequential — logical connectives and truth tables (both direct
unlocks of this concept) are meaningless if the learner cannot reliably
tell which sentences are eligible inputs. MC-2 (opinion-as-proposition)
and MC-3 (paradox-bivalence) are addressed afterward; MC-3 in particular
depends on a learner who already firmly holds the bivalence test from
the MC-1 repair, since the paradox is specifically a challenge TO
bivalence.

## Tutor Actions

From `../../teaching-actions/`: **Classification/Sorting** (the
mixed-sentence sorting task, the primary action for this concept) →
**Discovery Question sequence** (the unknown-but-definite contrast,
targeting MC-1 and previewing MC-3) → **Worked Example** (walking
through why the Liar paradox fails bivalence, targeting MC-3 last).
**What doesn't fit**: a full formal treatment of non-classical
(paraconsistent/many-valued) logics — this concept only needs the
learner to recognize that classical bivalence is what's being taught and
that the Liar paradox is a genuine edge case, not a worked example of an
"unusual truth value."

## Voice Teaching Notes

Listen for "well it's true FOR some x" applied to an open sentence —
this is MC-1's clearest verbal signature, treating conditional truth as
equivalent to a fixed truth value. A learner who says "I guess it's just
sort of true and false at the same time" about the Liar sentence is
showing MC-3 directly. The load-bearing sentence: "a proposition has to
already have one truth value, not a truth value that depends on
something."

## Assessment Signals

The Blueprint's own detection probes and mastery gate are the concrete
item bank — not re-authored here. Diagnostic interpretation this entry
adds: a learner who correctly rejects open sentences (MC-1 cleared) but
still accepts subjective opinions as "propositions with a truth value
we just don't agree on" (MC-2 still latent) is conflating "disputed" (an
epistemic/social fact) with "no fact-of-the-matter" (a structural fact)
— these must be checked as separate items, since clearing one does not
imply the other.

## Tutor Recovery Strategy

Likeliest utterance: "but isn't 'x > 3' TRUE sometimes?" — the
concept-specific smaller question: "true FOR WHICH x — and does the
sentence, as written with no x chosen, already have one fixed answer?"
reframes the confusion from "can this be true" (yes, conditionally) to
"does this sentence alone already have a single truth value" (no) —
directly isolating the bound/unbound distinction MC-1 misses.

## Memory Hooks

**Type**: concept (a recognition skill: proposition vs. non-proposition,
independent of specific content). Review form: sorting fresh mixed
sentence lists, never rote recall of a fixed example set. Interleaving
partners: `math.found.axiom` and `math.found.definition` — all three are
"kinds of mathematical statement" with different structural roles
(stipulated starting point / stipulated meaning / bivalent claim), and
mixed classification practice across all three sharpens each category's
boundary.

## Transfer Connections

- **Near**: sorting a fresh set of sentences into propositions and
  non-propositions.
- **Far**: recognizing, in formal logic or computer science (e.g.
  boolean expressions), which expressions are well-formed and evaluable
  versus which contain unbound free variables.
- **Real-world**: distinguishing a factual claim that could in principle
  be checked (even if currently unresolved) from an opinion presented in
  factual-sounding language.
- **Expert transfer**: the learner, meeting an unfamiliar formal claim,
  spontaneously checks for free variables and fact-of-the-matter status
  before attempting to evaluate its truth.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). Boolean logic in
`computer_science` (`cs.*`) has an informal conceptual kinship (boolean
expressions vs. propositions), but this is not KG-encoded as a
cross-subject link here; not fabricated.

## Blueprint References

`docs/curriculum/blueprints/math.found.proposition.md` — Status
PACKAGE_READY (371 lines). This entry reuses by reference: the full
Misconception Registry (Component 2, MC-1–MC-3). Not restated beyond
what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's single prerequisite and two-item unlocks list match
the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 3). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.

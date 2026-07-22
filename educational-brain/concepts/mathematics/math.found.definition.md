# Mathematical Definition — `math.found.definition`

## Identity

- **Concept ID**: `math.found.definition` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.mathematical-language` — the load-bearing
  part is accepting that mathematical statements must be unambiguous;
  a definition is the specific tool that introduces new vocabulary while
  preserving that unambiguity, by relating the new term entirely to
  already-defined ones.
- **Unlocks**: none directly in the KG (`unlocks: []`), but `related:
  math.found.axiom`, `math.found.theorem` — definitions, axioms, and
  theorems together form the three kinds of statement a formal
  mathematical system is built from, and a learner cannot productively
  engage with axioms or theorems without first understanding what a
  definition does and does not claim.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery
  threshold**: 0.90 (notably the highest threshold seen in this domain
  so far — see Assessment Signals) · **Est. hours**: 2
- **No Blueprint exists yet** for this concept (verified: no file at
  `docs/curriculum/blueprints/math.found.definition.md`) — this entry is
  authored directly from the KG node and general mathematical-practice
  knowledge, not reused from an existing Blueprint.

## Learning Objective

The learner can: state that a mathematical definition is a precise,
unambiguous specification of a term's meaning built entirely from
previously defined concepts; distinguish a definition (which cannot be
"true" or "false," only well-formed or ill-formed) from a theorem (which
makes a claim that must be proven); and recognize when an informal
description ("a square is a really symmetric shape") fails to function
as a mathematical definition. A learner who can recite a specific
definition from memory without being able to explain what makes ANY
statement qualify as a definition has not achieved mastery.

## Core Understanding

A mathematical definition does not describe a pre-existing thing more
precisely — it CREATES the term's meaning by stipulation, entirely in
terms of concepts already established. "A prime number is a natural
number greater than 1 with exactly two positive divisors" is not a
discovery about primes; it is the very thing that makes the word "prime"
mean something in mathematics at all. This is why a definition is never
true or false the way a theorem is — it can only be well-formed
(built entirely from prior concepts, precise, and non-circular) or
ill-formed. Two mathematicians can legitimately choose different
definitions for the same word (some texts exclude 1 from "natural
numbers," others include it) — what makes a definition acceptable is
internal precision, not correspondence to an external fact.

## Mental Models

- **Beginner model — "a definition is a description"**: a definition
  tells you what a word means, the way a dictionary entry does. Runnable
  and largely harmless as a starting point, but it does not yet
  distinguish a definition from an ordinary explanation. Shelf-life
  warning: "dictionary definitions can be loose or context-dependent —
  mathematical definitions can't be; we're about to see why."
- **Intermediate model — "a definition builds strictly on prior terms"**:
  the learner recognizes that every word inside a definition must itself
  already be defined (or be a primitive/undefined term the whole system
  starts from), and that a definition using an undefined or vague term
  fails. Upgrade trigger: shown a definition that secretly uses an
  undefined term and asked to spot the gap.
- **Advanced model — "definitions are stipulative, not discovered"**: the
  learner understands that a definition doesn't describe a fact about
  the world that could be wrong — it stipulates what a word will mean
  going forward, and different, equally valid stipulations are possible
  (e.g. whether 0 is a natural number).
- **Expert model — "definitions are chosen for productive consequences"**:
  the learner understands that mathematicians often choose one candidate
  definition over another not because it's more "correct" but because it
  makes the resulting theory cleaner (e.g. why 1 is excluded from the
  primes: including it would break the Fundamental Theorem of
  Arithmetic's uniqueness clause).
- **Do not upgrade early**: a learner who cannot yet check whether a
  given definition uses only prior terms (intermediate model) should not
  be pushed into debating WHY a particular definition was chosen
  (expert model) — the "definitions are choices" idea is confusing
  without a secure floor of "definitions must be precise and
  non-circular" first.

## Why Students Fail

Learners arrive having used the word "define" loosely their whole lives
(dictionaries paraphrase, teachers give illustrative examples instead of
precise definitions, "define" often just means "describe"), so the
specific, load-bearing job a mathematical definition does — creating
exact meaning from prior terms, with zero tolerance for ambiguity or
circularity — is invisible to them. This produces two distinct failures:
accepting circular or example-based "definitions" as if they were
genuine ones, and treating an actual definition as a claim that could be
argued with or found "wrong," rather than recognizing it as a
stipulation whose only failure mode is being ill-formed.

## Misconceptions

Applying the birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`) directly, since no
Blueprint exists yet to reuse:

**MC-1 — "A definition is just a helpful description or example" (Type
1, overgeneralization from everyday "define" usage)**
- *Why*: everyday explanations ("a square is like a really even
  rectangle") work fine for communication and are the learner's entire
  prior experience of "defining" something.
- *Symptom / phrase*: a learner offers an example or a vague
  characterization when asked to define a term ("a function is like a
  machine that does something to a number").
- *Detection probe*: "Is 'a function is like a machine' a definition, or
  a helpful description? What would make it a real definition?"
- *Recovery*: contrast the loose description directly against a precise
  one built from prior terms ("a function from A to B is a rule
  assigning each element of A exactly one element of B") and ask what's
  different — the precise version has zero wiggle room; the loose one
  requires guessing what "like a machine" cashes out to.
- *Verification*: the learner correctly identifies an example-based or
  metaphor-based "definition" as insufficient on a fresh case.

**MC-2 — "A definition can be circular as long as it 'sounds right'"
(Type 4, notation/structure-induced — many everyday definitions ARE
mildly circular and go unnoticed, e.g. dictionary definitions that
reference each other)**
- *Why*: natural-language dictionaries frequently define words partly in
  terms of each other without this being noticed as a flaw, because
  human readers already know both words.
- *Symptom*: a learner accepts "a set is a collection, and a collection
  is a set of objects" without noticing the circularity.
- *Detection probe*: "Does this definition of X use the word X, or any
  term that itself depends on knowing what X means?"
- *Recovery*: trace the definition's dependency chain explicitly back to
  already-established terms; a genuinely circular definition has no such
  chain.
- *Verification*: the learner spots circularity in a fresh, deliberately
  circular definition.

**MC-3 — "A definition can be judged true or false" (Type 1,
overgeneralization from theorems, which genuinely can be judged true or
false)**
- *Why*: definitions and theorems both look like formal mathematical
  statements on the page, and the learner has not yet been told they
  play categorically different roles.
- *Symptom / phrase*: a learner says a definition is "wrong" because it
  doesn't match their prior informal understanding (e.g. objecting that
  "1 isn't included in the primes? That's wrong, it should be").
- *Detection probe*: "Can this definition be proven false, the way a
  theorem can? Or can it only be judged well-formed or not?"
- *Recovery*: contrast a definition (stipulative, chosen) against a
  theorem (a claim requiring proof) side by side, using the same term —
  "primes exclude 1" is a definitional choice; "there are infinitely
  many primes" is a theorem requiring proof.
- *Verification*: given a mixed set of definitions and theorems, the
  learner correctly sorts them by which kind of justification (proof vs.
  well-formedness check) each would need.

## Analogies

- **Best analogy — the rules of a new game vs. a claim about how the
  game plays out**: defining a term is like stating the RULES of a game
  (stipulated, not provable — you don't "prove" that chess bishops move
  diagonally, that's simply the rule); a theorem is like a claim about
  what happens WHEN you play by those rules (provable — "a bishop can
  never reach a square of the opposite color," which follows from the
  rules and can be proven). Breaking point: game rules can be changed
  arbitrarily for fun; mathematical definitions are chosen deliberately
  for their downstream consequences, not arbitrarily.
- **Alternative — a dictionary entry vs. a scientific law**: a dictionary
  entry stipulates usage; a scientific law describes the world and could
  be empirically wrong. A mathematical definition is much closer to the
  dictionary entry than the scientific law. Breaking point: dictionaries
  tolerate ambiguity and multiple senses; mathematical definitions never
  do.
- **ANTI-ANALOGY — do NOT say "a definition is like discovering what
  something really is"**: this directly installs MC-3 by framing
  definitions as claims about pre-existing facts (discoverable, hence
  provable/disprovable) rather than stipulations. If a learner uses
  "discover" language about a definition, redirect explicitly: "we're
  not discovering what a prime IS out in the world — we're agreeing on
  what the word will mean."

## Demonstrations

- **Circularity-spotting demonstration**: present 2-3 short candidate
  "definitions," at least one genuinely circular, and have the learner
  trace each term back to see whether the chain terminates in
  already-known concepts.
- **Definition-vs-theorem sorting**: present a mixed list of true
  mathematical statements ("a triangle has three sides" [definitional]
  vs. "the angles of a triangle sum to 180°" [a theorem, provable, and
  false in non-Euclidean geometry]) and have the learner sort by which
  kind of justification each needs.
- **Choice demonstration**: present the "is 0 a natural number?"
  question as a genuine example of two different, both legitimate,
  definitional choices made by different textbooks — grounds the
  "definitions are stipulated, not discovered" advanced model concretely.

## Discovery Questions

**Need** — given a loose, example-based "definition" of a familiar term
(e.g. "a function is like a machine"), the learner is asked to use it to
decide a borderline case (is a rule that sometimes gives two outputs for
one input a function?) and cannot, because the loose version doesn't
settle it. **Playground** — the learner tries tightening the description
themselves. **Invention** — the learner proposes something closer to
"each input has exactly one output." **Collision** — a genuinely
circular or vague attempt is tested against a deliberately tricky
borderline case and fails to settle it. **Formalization** — naming what
makes a definition well-formed (precise, non-circular, built from prior
terms). **Compression** — applying the same well-formedness check to a
fresh candidate definition.

## Teaching Sequence

The definition-vs-description distinction (MC-1) must be secure before
the definition-vs-theorem distinction (MC-3) is introduced — a learner
who still accepts loose descriptions as definitions has no stable
category of "definition" to contrast against "theorem" in the first
place. Circularity detection (MC-2) is best introduced once the learner
already expects definitions to trace back to prior terms, since
circularity is precisely the failure of that expectation.

## Tutor Actions

From `../../teaching-actions/`: **Classification/Sorting** (definition
vs. theorem sorting task; well-formed vs. circular/vague sorting task) →
**Error Analysis** (a deliberately circular or example-based "definition"
examined for its specific flaw) → **Worked Example** (tracing a real
definition's dependency chain back to primitive terms). **What doesn't
fit**: pure recitation/memorization drilling of specific definitions as
the primary activity — this concept's mastery target is recognizing WHAT
MAKES something a definition, not recalling any particular one.

## Voice Teaching Notes

Listen for "wrong" or "should be" applied to a definitional choice (e.g.
"1 SHOULD be prime") — this is MC-3's clearest verbal signature,
distinguishable from a legitimate theorem-level objection ("that proof
has a gap"). A learner who, when asked to define a term, immediately
reaches for an example rather than a general precise statement is
showing MC-1 behaviorally. The load-bearing sentence: "a definition
can't be wrong — only unclear, circular, or unhelpful."

## Assessment Signals

No item bank exists in a Blueprint for this concept (none exists yet) —
concrete items should be authored at Blueprint-production time; this
entry provides diagnostic interpretation only. A learner who correctly
identifies a definition as circular (recognition) but cannot themselves
propose a non-circular replacement (production) has a real but partial
gap, distinct from MC-2 fully active (which would fail even the
recognition step). The unusually high 0.90 mastery threshold reflects
that this concept gates correct use of EVERY subsequent formal
definition in the curriculum — a shaky floor here would let genuinely
circular or ill-formed "definitions" pass unchallenged throughout the
rest of mathematics.

## Tutor Recovery Strategy

Likeliest utterance: "isn't that just what the word means though?" when
resisting the idea that a definition is a choice — the concept-specific
smaller question: "could a different textbook define this word
differently and still be doing correct mathematics?" (yes, per the
0-as-natural-number example) — this single question tests the
stipulative-not-discovered idea concretely without requiring abstract
argument.

## Memory Hooks

**Type**: concept (a category-recognition skill: does this statement
function as a definition?), not a procedure or a set of facts to recall
— review form is sorting fresh statements into definition/theorem/
neither, never rote recall of specific definitions. Interleaving
partners: `math.found.axiom` and `math.found.theorem` (once available)
— all three are "kinds of mathematical statement," and mixed sorting
practice across all three is the strongest test that the categories
haven't blurred together.

## Transfer Connections

- **Near**: sorting a fresh set of statements by whether each is a
  definition or a theorem.
- **Far**: recognizing stipulative vs. empirical claims outside
  mathematics (e.g. a legal statute's definitions section vs. a factual
  claim in the same document).
- **Real-world**: noticing when an everyday argument turns out to be
  "arguing about definitions" (two people disagreeing about whether
  something "really" counts as X) rather than a substantive
  disagreement.
- **Expert transfer**: the learner, on meeting an unfamiliar term
  anywhere in mathematics, spontaneously checks whether it has been
  given a precise definition before using it, rather than assuming its
  everyday meaning transfers.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). The general skill of
distinguishing stipulative from empirical claims has an informal
counterpart in legal and scientific reasoning, but this is not
KG-encoded for this node; not fabricated here.

## Blueprint References

No Blueprint exists yet at `docs/curriculum/blueprints/
math.found.definition.md` — stated explicitly per
`EDUCATIONAL_BRAIN_STANDARD.md`'s Gate 2 requirement, not omitted. This
entry's misconceptions and demonstrations were authored directly, not
reused from a Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's single prerequisite is correct; the empty
`unlocks` combined with a populated `related` list (`math.found.axiom`,
`math.found.theorem`) is a legitimate KG pattern (this concept is not a
strict prerequisite gate for those nodes, but is thematically linked) —
not a defect.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 2). No Blueprint existed to ground this entry;
  misconceptions authored directly via the birth-taxonomy diagnostic
  procedure.

# Deductive Reasoning — `math.found.deductive-reasoning`

## Identity

- **Concept ID**: `math.found.deductive-reasoning` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.logic` — the load-bearing part is valid
  reasoning principles and deductive rules; this concept builds directly
  on that foundation by naming and formalizing the validity/soundness
  distinction and connecting it explicitly to mathematical proof.
- **Unlocks** (from KG): `math.found.proof` — proof IS deductive
  reasoning applied to mathematics; this concept is the direct
  conceptual precursor.
- **Difficulty**: foundational · **Bloom**: analyze · **Mastery
  threshold**: 0.80 · **Est. hours**: 3
- **Relationship to `math.found.inductive-reasoning`**: the KG's own
  `related` field pairs these two as the two named modes of reasoning;
  this entry treats them as a direct contrast pair, consistent with how
  `inductive-reasoning`'s own entry already frames the relationship.

## Learning Objective

The learner can: define deductive reasoning as reasoning from general
premises to a specific conclusion via logically valid steps, recognizing
validity as a property of the argument's FORM, not of whether its
premises or conclusion happen to be actually true; distinguish validity
from soundness (a sound argument is valid AND has actually true
premises); and recognize deductive reasoning as the mode of mathematical
proof.

## Core Understanding

A deductive argument's VALIDITY is a purely structural property: an
argument is valid if its conclusion follows necessarily from its
premises — meaning IF the premises were true, the conclusion would have
to be true too — regardless of whether the premises are actually true
in reality. "All cats can fly; Fluffy is a cat; therefore Fluffy can
fly" is perfectly VALID (the conclusion follows necessarily from the
premises) despite being based on a false premise and reaching a false
conclusion. SOUNDNESS adds the further requirement that the premises
are actually true — a sound argument is valid AND has true premises,
and soundness is what actually guarantees a true conclusion. This
validity/soundness distinction is the single most important idea this
concept teaches, because mathematical proof is fundamentally a chain of
deductive steps, and confusing validity with soundness (or with truth)
produces systematic errors in evaluating arguments.

## Mental Models

- **Beginner model — "a good argument has true premises and a true
  conclusion"**: the learner evaluates arguments by checking whether
  premises and conclusion are actually true, without separately
  checking whether the LOGICAL CONNECTION between them is valid. This is
  the arriving, incomplete default. Shelf-life warning: "checking
  whether things are true is important — but there's a separate
  question, about whether the argument's STRUCTURE actually works, that
  we're about to isolate."
- **Intermediate model — "validity is about form, independent of actual
  truth"**: the learner can evaluate an argument's validity using
  premises they know to be false (the flying-cats example) and
  correctly separate that judgment from a truth judgment. Upgrade
  trigger: presented with a valid-but-unsound argument and asked whether
  it's "good."
- **Advanced model — "validity plus true premises equals soundness,
  which guarantees truth"**: the learner correctly classifies arguments
  into all four combinations (valid+sound, valid+unsound, invalid with
  true premises/conclusion by coincidence, invalid+false) and states
  which combination actually guarantees a true conclusion (only
  valid+sound).
- **Expert model — "proof is deductive reasoning applied to
  mathematics"**: the learner recognizes every mathematical proof as a
  chain of deductive steps from established facts (axioms, definitions,
  previously proven theorems — functioning as the "true premises") to a
  specific conclusion, connecting this concept directly to
  `math.found.proof`.
- **Do not upgrade early**: a learner who still conflates validity with
  truth (beginner model) should not be pushed into the full four-way
  classification (advanced model) — the Blueprint's own MAMR ordering
  addresses MC-1 (validity/truth conflation) before MC-2
  (validity/soundness conflation), since the second distinction
  presupposes the first is already secure.

## Why Students Fail

The dominant failure mechanism is that "good argument" in everyday
usage conflates several things formal logic deliberately separates:
whether the premises are true, whether the conclusion is true, and
whether the LOGICAL CONNECTION between them is valid. Because most
everyday arguments a learner evaluates have true (or plausible)
premises, the validity question rarely needs to be isolated in daily
life — a learner can go through ordinary reasoning largely without ever
needing to evaluate an argument's form independent of its content. This
concept is often the first place a learner is asked to judge an
argument's STRUCTURE while deliberately setting aside whether its
content happens to be true, and that separation is genuinely
unfamiliar.

## Misconceptions

Reused from the Blueprint's Component 6 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "VALIDITY-CONFLATED-WITH-TRUTH" (Type 1, overgeneralization —
  in most everyday arguments, evaluating premises/conclusion truth and
  evaluating logical form happen to align, and the learner hasn't yet
  needed to separate them)**: Foundational. Full content: Blueprint
  Component 6, MC-1 (the flying-cats-vs-mammals contrast).
- **MC-2 — "VALIDITY-AND-SOUNDNESS-CONFLATED" (Type 1, overgeneralization
  — once "valid" is understood as a positive-sounding evaluation, it
  gets used interchangeably with "sound" or "good argument" generally)**:
  Foundational. Full content: Blueprint Component 6, MC-2 (the
  valid-but-unsound vs. valid-and-sound contrast).
- **MC-3 — "DEDUCTIVE-REASONING-TREATED-AS-SEPARATE-FROM-PROOF" (Type 1,
  overgeneralization — deductive reasoning is initially taught with
  everyday-content examples, and the learner doesn't yet connect it to
  the more formal, symbol-heavy mathematical proofs seen elsewhere)**:
  Moderate. Full content: Blueprint Component 6, MC-3 (the even-plus-
  even proof mapped onto the general deductive pattern).

## Analogies

- **Best analogy — a perfectly built machine using broken parts**: a
  machine can be perfectly ENGINEERED (the design/structure is flawless)
  while still failing to work because a specific part is defective —
  paralleling a valid argument (perfect logical engineering) with false
  premises (defective parts): the machine's design isn't what's at
  fault. Breaking point: a broken machine simply fails to run; a
  valid-but-unsound argument still "runs" all the way to a
  conclusion — it just doesn't guarantee that conclusion is true.
- **Alternative — a recipe followed exactly with a spoiled ingredient**:
  following a recipe's steps exactly (valid procedure) with a spoiled
  ingredient (false premise) still produces a bad dish (potentially
  false conclusion) — the recipe's steps weren't wrong, the ingredient
  was. Breaking point: recipes don't have a direct "soundness" analogue
  in the same technical sense.
- **ANTI-ANALOGY — do NOT say "a valid argument is basically a good
  argument"**: "good" smuggles in truth/soundness connotations that
  directly install MC-2 — validity alone says nothing about whether an
  argument is actually trustworthy or its conclusion actually true.

## Demonstrations

- **The flying-cats-vs-mammals contrast** (Blueprint Component 3/MC-1):
  a valid argument with a false premise ("all cats can fly") reaching a
  false conclusion, contrasted with an invalid argument that happens to
  have a true conclusion anyway — makes validity's independence from
  truth vivid.
- **The valid-but-unsound vs. valid-and-sound contrast** (MC-2): two
  arguments with identical logical FORM, one with true premises (sound)
  and one with a false premise (unsound), both equally valid.
- **The even-plus-even proof mapped to general deductive form** (MC-3):
  a concrete mathematical proof (the sum of two even numbers is even)
  laid directly alongside the abstract deductive-argument template
  (general premise, specific premise, necessary conclusion), showing the
  proof IS an instance of the pattern.

## Discovery Questions

**Need** — given the "all cats can fly; Fluffy is a cat; therefore
Fluffy can fly" argument, the learner is asked whether this is a "good"
argument, and typically says no because the premise and conclusion are
false. **Playground** — the learner is asked instead whether the
CONCLUSION FOLLOWS from the premises, IF they were true (setting aside
whether they actually are). **Invention** — the learner recognizes the
logical connection is airtight regardless of the premises' actual truth.
**Collision** — contrasted against an argument with a broken logical
connection but true premises and a true conclusion (invalid but
accidentally correct), which the learner may have initially judged
"good" — revealing that truth-checking alone missed the real structural
flaw. **Formalization** — naming validity (structure) and soundness
(structure + true premises) as two separate, both-necessary properties.
**Compression** — classifying a fresh argument along both dimensions
independently.

## Teaching Sequence

MC-1 (validity independent of truth) must be repaired before MC-2
(validity vs. soundness) is introduced, per the Blueprint's own MAMR
ordering — a learner who still evaluates arguments purely on truth
content has no stable concept of "validity" to distinguish from
"soundness" in the first place. MC-3 (connecting deductive reasoning to
proof) is addressed last, once both structural distinctions are secure,
since it asks the learner to recognize the SAME structure in a more
formal, symbol-heavy context.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the flying-cats
contrast, think-aloud) → **Classification/Sorting** (arguments sorted
by valid/invalid AND sound/unsound, independently) → **Error Analysis**
(an argument judged "good" purely on truth grounds despite an invalid
structure, examined for the flaw). **What doesn't fit**: introducing
formal proof-writing mechanics at this node — that belongs entirely to
`math.found.proof`; this concept's job regarding that future topic is
establishing the conceptual bridge (MC-3), not proof technique itself.

## Voice Teaching Notes

Listen for "that's not a good argument" applied ONLY on truth grounds
(false premise or conclusion), without any comment on the logical
connection — this is MC-1's clearest verbal signature. A learner who
uses "valid" and "sound"/"correct" interchangeably in casual speech
about an argument is showing MC-2. The load-bearing sentence: "does the
conclusion follow necessarily from the premises — IF they were true?"

## Assessment Signals

No item bank exists in a Blueprint-cited form beyond the three worked
examples already reused above — the Blueprint's own repair actions
(B01-B03) supply the concrete detection probes; not re-authored here.
Diagnostic interpretation this entry adds: a learner who correctly
classifies the flying-cats argument as valid (MC-1 cleared) but still
calls it "sound" or "a strong argument" (MC-2 still active) shows the
two misconceptions require independent verification — clearing one does
not automatically clear the other.

## Tutor Recovery Strategy

Likeliest utterance: "but that's not even true" as an objection to
calling the flying-cats argument valid — the concept-specific smaller
question: "if cats really COULD fly, would Fluffy flying follow for
sure?" (yes) — isolates the validity judgment from the truth judgment
using a hypothetical framing rather than abstract terminology.

## Memory Hooks

**Type**: concept (an argument-evaluation skill along two independent
dimensions). Review form: fresh arguments classified for validity and
soundness independently, never rote recall of the definitions alone.
Interleaving partners: `math.found.inductive-reasoning` (the direct
contrast pair, per the KG's own `related` field) — mixed practice
requiring the learner to first classify an argument as inductive or
deductive, THEN (if deductive) as valid/invalid and sound/unsound,
exercises both concepts' distinctions together.

## Transfer Connections

- **Near**: a fresh argument classified for validity and soundness.
- **Far**: recognizing valid-but-unsound reasoning in non-mathematical
  arguments (political rhetoric, advertising) where a logically
  airtight structure is built on a false premise.
- **Real-world**: evaluating everyday persuasive arguments by explicitly
  separating "does this make logical sense IF the premises are true"
  from "are the premises actually true."
- **Expert transfer**: the learner spontaneously identifies which of the
  two dimensions (validity or premise-truth) is actually being disputed
  in an argument, rather than treating "I disagree" as a single
  undifferentiated objection.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node). The validity/soundness
distinction is a core topic in philosophy (formal logic, epistemology)
and has informal application in legal argumentation, but this is not
KG-encoded as a cross-subject link here; not fabricated.

## Blueprint References

`docs/curriculum/blueprints/math.found.deductive-reasoning.md` — read in
full. This entry reuses by reference: the three worked examples
(Component 4, referenced by the misconception repair actions) and the
Misconception Registry (Component 6, MC-1–MC-3). Not restated beyond
what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's single prerequisite and single unlock
(`math.found.proof`) match the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 3). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.

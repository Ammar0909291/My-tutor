# Rules of Inference — `math.found.rules-of-inference`

## Identity

- **Concept ID**: `math.found.rules-of-inference` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.logic`)
- **Prerequisites**: `math.found.logical-equivalence` (supplies the
  truth-table-as-tautology validity criterion used throughout to verify
  or refute every argument form), `math.found.logical-connectives`
  (supplies the → connective these inference rules are built around).
- **Unlocks**: `math.found.proof` (formal mathematical proofs are built
  by chaining valid inference rules).
- **Related** (from KG): `math.found.proof`, `math.found.logical-equivalence`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.8 · **Est. hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.found.rules-of-inference.md`
  (PACKAGE_READY, cross_links=[], P76 independence).
- **Aliases** (from KG): "inference rules", "modus ponens", "modus
  tollens".

## Learning Objective

The learner can: correctly apply modus ponens (P, P→Q ⊢ Q) and modus
tollens (¬Q, P→Q ⊢ ¬P) to draw valid conclusions; correctly identify
and REJECT the two classic invalid look-alike argument forms —
affirming the consequent (Q, P→Q ⊢ P) and denying the antecedent (¬P,
P→Q ⊢ ¬Q) — verifying invalidity via truth table rather than intuition
alone; and correctly recognize that a valid inference rule's direction
cannot be reversed, i.e. that P and Q both being independently true
does not license concluding P→Q as a general rule.

## Core Understanding

An inference rule is VALID exactly when the conditional [(all premises)
→ (conclusion)] is a tautology — true on every row of its truth table,
directly reusing the truth-table technique from `math.found.logical-equivalence`.
Modus ponens (P, P→Q ⊢ Q) and modus tollens (¬Q, P→Q ⊢ ¬P) both pass
this test and are genuinely valid. Their two look-alikes — affirming the
consequent (Q, P→Q ⊢ P) and denying the antecedent (¬P, P→Q ⊢ ¬Q) — both
FAIL the tautology test at exactly the row where the premises hold but
the "conclusion" doesn't, and are genuinely invalid, despite superficial
resemblance to the two valid rules (both pairs involve P→Q and one of
P, Q as a premise, with the conclusion being the OTHER one). The reason
these fallacies fail is substantive, not merely formal: Q being true
doesn't rule out OTHER causes of Q besides P, so asserting Q can never
license concluding P specifically. A third, deeper error concerns
DIRECTION: even correctly observing that P and Q are BOTH true in a
specific instance does not establish P→Q as a general rule — that
would require broader evidence (checking many cases, or understanding
an underlying mechanism), not a single coincidental co-occurrence.

## Mental Models

- **Beginner model — "if the rule and one of the two statements are
  true, I can conclude the other one"**: the learner cannot yet
  distinguish which combinations are valid, applying rules by surface
  pattern-matching (seeing P→Q and one of P/Q) rather than by direction.
  Shelf-life warning: this model succeeds by luck on modus ponens
  examples (where the "obvious" direction happens to be valid) and fails
  systematically the moment an affirming-the-consequent-shaped problem
  appears.
- **Intermediate model — "modus ponens (assert P, get Q) and modus
  tollens (deny Q, get ¬P) are valid; the reverse pattern is invalid, but
  I check by truth table when unsure"**: the learner correctly applies
  both valid rules and can construct a truth table to verify or refute
  an unfamiliar argument form, but may still accept the direction-
  reversal fallacy (concluding P→Q from P and Q both holding) as
  plausible. Upgrade trigger: being asked whether observing P and Q both
  true in one instance proves the general rule P→Q.
- **Advanced model — "validity is decided by the tautology test, and a
  single confirming instance never establishes a general implication"**:
  the learner reaches for the truth-table test as the default validity
  check for ANY proposed argument form, not just the four canonical
  ones, and explicitly distinguishes "consistent with the rule" from
  "establishes the rule." Upgrade trigger: being asked to evaluate an
  unfamiliar, novel argument form's validity from scratch via truth
  table, with no rule name to pattern-match against.
- **Do not upgrade early**: a learner still pattern-matching by surface
  shape (beginner model) should not be pushed into the direction-
  reversal fallacy (MC-3, the conceptually deepest error) before both
  canonical valid rules and both canonical fallacies are independently
  secure via truth-table verification — MC-3 is a different, subtler
  error about EVIDENCE for a rule, not about applying an already-
  established rule.

## Why Students Fail

The dominant failure is affirming the consequent: treating "P→Q is
true, and Q is true, therefore P is true" as valid, since it superficially
mirrors modus ponens's own structure (both involve P→Q and one of P,
Q), when in fact Q being true says nothing about P specifically — many
other things besides P could have caused Q. A closely related failure
is denying the antecedent: treating "P→Q is true, and P is false,
therefore Q is false" as valid, missing that P being false says
nothing about Q's truth value through any OTHER cause. A third,
conceptually deeper failure assumes a valid rule's direction can be
reversed — believing that because {P, P→Q} validly yields Q, the
reverse process (starting from P and Q both true, concluding P→Q) is
equally valid, when a conditional cannot in general be inferred merely
from its antecedent and consequent happening to both hold.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Component 2), birth-type
classification added per this program's diagnostic procedure — not
re-derived:

**MC-1 — AFFIRMING-THE-CONSEQUENT (Foundational; Type 1,
overgeneralization — a superficial mirror image of the genuinely valid
modus ponens, since both involve P→Q and one of P,Q as premises, making
it the single most common invalid-argument error in introductory logic)**
- *Trigger*: "If it's raining, the ground is wet. The ground is wet. Is
  it raining?" — the learner answers "yes, it must be raining."
- *Repair*: check other causes of a wet ground (sprinkler, spilled
  bucket, melted snow) — wet ground is CONSISTENT with rain but doesn't
  RULE OUT these alternatives. Verify via truth table:
  [(P→Q)∧Q]→P fails at row (P=F,Q=T) — NOT a tautology, confirming this
  pattern is invalid in general.

**MC-2 — DENYING-THE-ANTECEDENT (Type 1, overgeneralization — the
negated mirror image of the genuinely valid modus tollens)**
- *Trigger*: "If it's raining, the ground is wet. It's not raining. Is
  the ground dry?" — the learner answers "yes, the ground must be dry."
- *Repair*: the ground could still be wet from a sprinkler even without
  rain — "not raining" rules out rain as the CAUSE but says nothing
  about other causes. Verify via truth table: [(P→Q)∧¬P]→¬Q fails at row
  (P=F,Q=T) — NOT a tautology.

**MC-3 — INFERENCE-DIRECTION-REVERSIBLE (the conceptually deepest error;
Type 1, overgeneralization — mistaking evidence CONSISTENT with a rule
for evidence that ESTABLISHES the rule, a pattern that connects directly
to scientific reasoning generally, e.g. confirmation bias)**
- *Trigger*: "Today is Tuesday, and the store is open. Does this prove
  'if it's Tuesday, the store is open'?" — the learner answers "yes,
  since both are true today."
- *Repair*: the store might simply be open every day, with Tuesday being
  completely irrelevant to its hours — one day's coincidence proves
  nothing about a GENERAL implication. Establishing P→Q as a genuine
  rule requires checking many cases (or understanding an underlying
  mechanism), not observing one instance where both happen to hold.

## Analogies

- **Best analogy — medical testing (also this concept's own transfer
  probe context)**: "if a patient has disease D, the test result is
  positive" (P→Q). A patient testing positive does NOT validly establish
  they have D (affirming the consequent — false positives from other
  causes are common); a patient testing negative DOES validly establish
  they don't have D via modus tollens (assuming no false negatives).
  Observing one patient where both "has D" and "tests positive" happen
  to be true confirms the rule is CONSISTENT with that instance but
  never ESTABLISHES the rule as reliable — that requires broader
  evidence across many patients. Breaking point: real diagnostic tests
  have genuinely uncertain false-positive/false-negative rates that this
  idealized P→Q framing simplifies away — useful for isolating the
  logical structure, not for actual clinical reasoning.
- **ANTI-ANALOGY — do NOT say "modus ponens and affirming the consequent
  are basically the same idea, just used differently"**: describing them
  as "basically the same" directly invites MC-1 by suggesting the
  superficial resemblance reflects a real underlying equivalence rather
  than a genuine, truth-table-confirmed difference in validity.

## Demonstrations

- **Two-valid-rules-verified demonstration**: work modus ponens and
  modus tollens on the rain/wet-ground example, verifying both via
  truth table ([(P→Q)∧P]→Q is a tautology across all four rows) —
  establishes the baseline validity criterion.
- **Two-fallacies-truth-table demonstration**: test affirming the
  consequent and denying the antecedent against the SAME rain/wet-
  ground scenario (deliberately reusing it, changing only which premise
  is asserted), each failing at exactly one row — directly targets MC-1
  and MC-2 as a matched pair, making the parallel structure between
  valid and invalid forms maximally visible.
- **Direction-counterexample demonstration**: the Tuesday/store-open
  scenario, showing that P and Q both being true today says nothing
  about whether P→Q holds as a general rule — directly targets MC-3.

## Discovery Questions

**Need** — given "if x=3, then x²=9" and told x²=9, the learner is
asked whether x=3 necessarily follows, naturally probing for
counterexamples (x=-3). **Playground** — the learner tests several
P→Q scenarios under all four premise combinations (asserting P, denying
Q, asserting Q, denying P), discovering only two of the four combinations
yield valid conclusions. **Invention** — the learner proposes the
truth-table tautology test as the general-purpose validity check,
rather than relying on which pattern "feels" right. **Collision** —
asked whether observing P and Q both true in one case proves P→Q
generally, the learner's intuitive "well, it happened, so..." collides
with the direction-reversal counterexample — targeting MC-3.
**Formalization** — naming modus ponens, modus tollens, and both
fallacies explicitly, with the tautology criterion as the arbiter.
**Compression** — given a fresh, unfamiliar argument form, correctly
determining validity via truth table without prompting, rather than
relying on memorized rule names.

## Teaching Sequence

The two valid rules (modus ponens, modus tollens) are established first,
verified by truth table, since both fallacies are defined specifically
as look-alikes of these two rules and cannot be taught in contrast
without the genuine rules first secure. MC-1 and MC-2 (the two
fallacies) are addressed together as a matched pair — deliberately
reusing the identical rain/wet-ground scenario, changing only which
premise is asserted — since they share the identical underlying error
(mistaking "consistent with the rule" for "the only way the rule could
be satisfied") applied to each valid rule's mirror image. MC-3
(direction-reversal) is addressed last and treated as the conceptually
deepest error, extended into an explicitly scientific-reasoning framing
via the transfer probe, since it concerns evidence FOR a rule rather
than correct application of an already-established one.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the two-valid-rules
truth-table verification, the primary action opening the concept) →
**Error Analysis** (the two-fallacies contrast, targeting MC-1 and
MC-2 as a matched pair) → **Thought Experiment** (the direction-
reversal counterexample, targeting MC-3, extended via the medical-
testing transfer probe into a scientific-reasoning framing). **What
doesn't fit**: the broader catalog of classical inference rules
(hypothetical syllogism, disjunctive syllogism, resolution, etc.) named
in this concept's KG aliases but not elaborated in the Blueprint's own
scope — this entry, matching the Blueprint, focuses on modus ponens/
modus tollens and their two fallacies as the foundational core; the
wider rule catalog is left to `math.found.proof`'s own scope as those
rules are actually deployed in proof construction.

## Voice Teaching Notes

Listen for "the ground is wet, so it must have rained" — this is MC-1's
clearest verbal signature, and should be met with "what ELSE could make
the ground wet, besides rain?" A learner who says "it's not raining, so
the ground must be dry" is showing MC-2 — prompt directly: "could the
ground be wet for some OTHER reason, even without rain?" A learner who
treats one confirming instance as proof of a general rule is showing
MC-3 — prompt directly: "does this happening ONCE tell you it happens
EVERY time?" The load-bearing sentence: "being consistent with a rule
is not the same as proving the rule."

## Assessment Signals

Blueprint's P77/P76 items are suitable seeds for gate-style checks:
applying modus ponens and modus tollens to a fresh premise pair;
identifying and naming the fallacy (with a specific counterexample) in
an affirming-the-consequent or denying-the-antecedent scenario; the
medical-testing transfer probe's three-part structure (evaluate an
affirming-the-consequent diagnosis, apply modus tollens correctly to a
negative test, and evaluate a direction-reversal claim about
establishing a "reliable causal rule" from one instance). Because MC-1
and MC-2's defining signature is producing a WRONG but confident
conclusion rather than hesitation, assessment should specifically
require a NAMED fallacy plus a concrete counterexample number or object,
not just a "valid/invalid" verdict, since a learner can sometimes guess
the verdict correctly without understanding why.

## Tutor Recovery Strategy

Likeliest utterance: "but if the ground's wet, doesn't that mean it
rained?" — the concept-specific smaller question: "can you think of ANY
other way the ground could get wet, besides rain?" reframes the
confusion from "the effect proves its usual cause" to "the effect is
merely consistent with, not proof of, that specific cause" — directly
isolating MC-1's missing alternative-cause consideration.

## Memory Hooks

**Type**: procedural (a truth-table-verification habit for validating
or refuting argument forms, plus two specific named fallacy patterns to
recognize and reject on sight). Review form: fresh premise pairs
requiring the learner to reconstruct modus ponens/modus tollens from
memory and apply each to a new scenario, periodically paired with a
disguised affirming-the-consequent or denying-the-antecedent trap to
keep both fallacy-detection skills active. Interleaving partners:
`math.found.logical-equivalence` (the tautology-testing technique this
concept's entire validity criterion depends on) and
`math.found.logical-connectives` (the → connective these rules are
built from).

## Transfer Connections

- **Near**: `math.found.proof`, where modus ponens, modus tollens, and
  the broader catalog of inference rules named in this concept's KG
  aliases become the actual building blocks of formal proof
  construction.
- **Far**: legal and scientific reasoning generally — the affirming-
  the-consequent structure underlies common reasoning errors like
  "the suspect matches the description, so they must be guilty" (many
  people could match a description) and the direction-reversal error
  underlies overgeneralizing from a single confirming observation to a
  general scientific law.
- **Real-world**: diagnostic reasoning of all kinds (medical, technical
  troubleshooting) where "symptom present ⟹ specific cause" is a
  frequent, tempting, but invalid affirming-the-consequent leap.
- **Expert transfer**: the learner, meeting an unfamiliar argument form
  in any domain, automatically reaches for the truth-table tautology
  test rather than relying on surface resemblance to a known-valid
  pattern, and automatically distinguishes "consistent with" from
  "established by" when evaluating evidence for a general claim.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node), matching the
Blueprint's own explicit P76-independence declaration (the transfer
probe uses a self-contained medical-testing scenario rather than a
named cross-linked KG concept). Not fabricated beyond what the KG
states.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.rules-of-inference.md`.
Key objectives, misconception registry, and the full truth-table
verifications reused by reference above; the complete P77 problem set
and the three-part medical-testing P76 transfer probe not restated in
full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any. The two-
valid-rules and two-fallacies-truth-table demonstrations are suitable
future Explanation Memory seeds; the medical-testing transfer probe is
a suitable future Probe asset seed.

## Curriculum Feedback

No structural KG issues found. This concept's KG aliases ("modus
ponens", "modus tollens") accurately reflect the Blueprint's actual
scope; the broader "inference rules" alias is honored more by this
concept's role as the FOUNDATIONAL pair (with fallacy contrast) than by
exhaustive coverage of every named classical rule (hypothetical
syllogism, resolution, etc.), which is appropriately deferred to
`math.found.proof`'s own scope, matching the Blueprint's own Component 8
Teaching Notes. Estimated hours (5) and mastery threshold (0.8)
appropriately reflect this concept's broader scope (two valid rules,
two paired fallacies, one direction-reversal caution) relative to the
single-property relation concepts authored earlier in this Wave.

## Version History

- 2026-07-26 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 7). Grounded in the existing Blueprint;
  misconception registry cited by ID with birth-type classification
  added, not restated in full.

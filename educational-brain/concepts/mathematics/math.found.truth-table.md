# Truth Table — `math.found.truth-table`

## Identity

- **Concept ID**: `math.found.truth-table` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.logic`)
- **Prerequisites**: `math.found.logical-connectives` — a truth table is
  the systematic, row-by-row formalization of the mini truth-tables
  already introduced per connective; the learner needs each
  connective's own truth-functional definition secure before enumerating
  every combination.
- **Unlocks** (from KG): `math.found.logical-equivalence`,
  `math.disc.boolean-circuits` — two propositions are logically
  equivalent exactly when their truth tables match on every row; boolean
  circuits implement each connective as a physical gate, verified by the
  identical truth table.
- **Related** (from KG, not a `requires`/`unlocks` edge): `math.found.
  logical-equivalence`.
- **Cross-links** (from KG): `math.disc.boolean-circuits` — truth tables
  are the direct verification tool for circuit-level logic gate
  behavior.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 3

## Learning Objective

The learner can: construct a complete truth table for a compound
proposition built from any combination of the five connectives (¬, ∧,
∨, →, ↔), correctly enumerating every combination of input truth
values; correctly apply the inclusive-∨ and vacuous-truth-→ rules row
by row, without defaulting to exclusive-or or causal readings; and
correctly apply De Morgan's laws when negating a conjunction or
disjunction, FLIPPING the connective (¬(P∧Q) ≡ ¬P∨¬Q), never merely
negating each part while leaving the connective unchanged.

## Core Understanding

A truth table is not a memorized lookup chart for each connective in
isolation — it is a MECHANICAL, EXHAUSTIVE procedure: list every
possible combination of truth values for the component propositions
(2ⁿ rows for n components), then apply each connective's truth-
functional definition row by row to build up the compound proposition's
value. Because this procedure is purely mechanical, the same three
sources of error that make individual connective evaluation hard
(`math.found.logical-connectives`'s own OR-exclusive and vacuous-truth
misconceptions) resurface here at scale, ROW BY ROW, and a fourth,
genuinely new failure mode appears specifically at the table-
construction stage: negating a conjunction or disjunction requires not
just negating each component but FLIPPING the connective itself
(De Morgan's laws), and skipping the flip produces a table that looks
plausible but is systematically wrong on exactly the rows where the
flip mattered.

## Mental Models

- **Beginner model — "build the table by filling in whichever rows feel
  obviously true or false, then guess the rest"**: the learner
  constructs tables impressionistically rather than mechanically,
  missing that the entire point of a truth table is to remove guesswork
  by enumerating every case systematically. Shelf-life warning: "this
  works by luck on simple two-row cases, but falls apart the moment a
  compound expression has enough components that intuition alone can't
  track every combination."
- **Intermediate model — "enumerate every input combination first, then
  apply each connective's definition mechanically, row by row"**: the
  learner constructs the full 2ⁿ-row grid before filling in any values,
  and applies each connective's truth-functional rule consistently
  rather than by impression. Upgrade trigger: a table with 3+ components
  (2³ = 8 rows), testing whether the systematic procedure holds up at
  scale.
- **Advanced model — "negating a compound expression requires
  correctly flipping connectives via De Morgan's laws, not just negating
  the parts"**: the learner correctly computes ¬(P∧Q) as ¬P∨¬Q (flipped
  connective), verifying the equivalence by comparing full truth tables
  rather than assuming the naive non-flipped guess. Upgrade trigger: a
  negated compound proposition requiring De Morgan's law, contrasted
  against the naive non-flipped error.
- **Expert model — "truth tables are the operational definition of
  logical equivalence, and ultimately of every logic gate's physical
  behavior"**: the learner recognizes that two propositions are
  logically equivalent exactly when their truth tables match row for
  row (this concept's own KG unlock), and that a truth table is
  simultaneously an abstract logical tool and the literal specification
  a physical AND/OR/NOT gate is built to satisfy (this concept's own KG
  cross-link).
- **Do not upgrade early**: a learner who still fills tables
  impressionistically (beginner model) should not be pushed into
  De Morgan's-law negation (advanced model) before the systematic,
  row-by-row construction procedure (intermediate model) is automatic —
  the Blueprint's own MC-2 (vacuous truth) is named as the single most
  counter-intuitive fact in elementary logic and often needs 3+
  exposures, so basic construction fluency must precede layering
  De Morgan's flip on top.

## Why Students Fail

The dominant failures are inherited directly from `math.found.logical-
connectives`'s own two hardest misconceptions (inclusive-or read as
exclusive; vacuous truth resisted as "meaningless"), now compounded
across every row of a full table rather than a single isolated
evaluation — a learner who gets one connective wrong in isolation will
get it wrong systematically across an entire column once table
construction is mechanical. A third, genuinely new failure at this
concept's own level comes from De Morgan's-law negation: negating each
individual component (¬P, ¬Q) is a habit that generalizes correctly
from simple negation, but negating the CONNECTIVE joining them does
not follow the same pattern, and without explicit instruction the
connective is left unflipped by default.

## Misconceptions

Reused from the Blueprint's Component 2 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added. Note:
MC-1 and MC-2 are the SAME underlying confusions already registered as
`math.found.logical-connectives`'s own MC-1 (OR-EXCLUSIVE) and MC-2
(IMPLIES-CAUSAL), now resurfacing at the mechanical table-construction
level rather than at single-evaluation level; MC-3 is genuinely new to
this concept:

- **MC-1 — "OR-IS-EXCLUSIVE" (Type 3, language contamination — shared
  root cause with `math.found.logical-connectives`'s own MC-1, now
  manifesting as a systematically wrong column rather than a single
  wrong evaluation)**: student marks P∨Q as false when both P and Q are
  true, reading ∨ as "one or the other, not both." Full trigger/
  root-cause/error-pattern: Blueprint Component 2, MC-1.
- **MC-2 — "FALSE-ANTECEDENT-MEANS-FALSE-IMPLICATION" (Foundational;
  Type 3, language contamination — shared root cause with `math.found.
  logical-connectives`'s own MC-2, the Blueprint's own stated single
  most counter-intuitive fact in elementary logic)**: student marks
  P→Q as false whenever P is false, regardless of Q, rather than
  recognizing P→Q is vacuously TRUE in that case. Full content:
  Blueprint Component 2, MC-2. Per the Blueprint: "a student who cannot
  accept this convention will construct every conditional truth table
  incorrectly and will misread every subsequent proof technique (e.g.
  vacuous proofs, contrapositive reasoning) that relies on it."
- **MC-3 — "NEGATION-DISTRIBUTES-WITHOUT-FLIPPING" (Type 1,
  overgeneralization — negating each component correctly generalizes
  from simple negation, but the connective-flip requirement does not
  follow the same pattern, and is silently omitted by default)**:
  student computes ¬(P∧Q) as ¬P∧¬Q (or ¬(P∨Q) as ¬P∨¬Q), failing to
  flip the connective as De Morgan's laws require. Full content:
  Blueprint Component 2, MC-3.

## Analogies

- **Best analogy — a complete inventory checklist, not a spot-check**:
  a truth table is like checking every single combination of switch
  positions on a control panel with n switches (2ⁿ combinations), rather
  than testing a few positions and guessing the rest — missing even one
  combination could hide a case where the outcome is different.
  Breaking point: a real control panel with many switches quickly
  becomes impractical to check exhaustively by hand; truth tables share
  this same 2ⁿ scaling limitation, which is worth naming explicitly
  rather than treating the analogy as a completely free lunch.
- **Alternative — De Morgan's flip as "distributing NOT changes the
  family," reusing the promise-breaking framing**: negating "P and Q"
  becomes "not-P or not-Q" — reusing `math.found.logical-connectives`'s
  own promise analogy: "It is NOT the case that (I studied AND I got an
  A)" means "either I didn't study, OR I didn't get an A (or both)" —
  the connective genuinely changes family, not just the individual
  terms. Breaking point: the promise analogy works well for a single
  conjunction; deeply nested De Morgan applications (negating a
  compound expression with several connectives) require repeated
  application, which the single-promise framing doesn't scale to
  directly.
- **ANTI-ANALOGY — do NOT say "just put a NOT in front of each piece
  and you're done"**: this directly installs MC-3 — De Morgan's law
  requires BOTH negating each component AND flipping the connective;
  stating only "negate each piece" omits the connective-flip entirely.

## Demonstrations

- **Inclusive-OR-vs-exclusive-OR row-by-row demonstration**: a full
  truth table for P∨Q built alongside a P-XOR-Q table, differing only on
  the (T,T) row — directly targets MC-1 with the Blueprint's own
  Contrast 1.
- **Vacuous-truth-justified-via-promise demonstration**: every row of a
  P→Q table constructed explicitly, with the false-antecedent rows
  justified concretely (e.g. "if 2+2=5, then the moon is cheese" —
  vacuously true) rather than merely stated as a rule — directly targets
  MC-2 with the Blueprint's own Contrast 2.
- **De Morgan's-flip-vs-naive-non-flip demonstration**: ¬(P∧Q) computed
  correctly as ¬P∨¬Q via a full row-by-row verification, directly
  contrasted against the naive, incorrect ¬P∧¬Q guess — directly targets
  MC-3 with the Blueprint's own Contrast 3.

## Discovery Questions

**Need** — asked to build a truth table for P∨Q from scratch, the
learner initially marks the (T,T) row uncertainly, unsure whether "both
true" should count. **Playground** — the learner tests the definition
against several concrete propositions where both components are true.
**Invention** — the learner proposes that math's "or" might specifically
include the both-true case, unlike some everyday uses of "or."
**Collision** — asked to negate P∧Q and initially producing ¬P∧¬Q, the
learner is shown a row where this naive guess and the correct ¬P∨¬Q
disagree — directly targeting MC-3. **Formalization** — naming the
full construction procedure explicitly: enumerate every row, then apply
each connective's definition mechanically. **Compression** — given a
fresh compound proposition (including at least one negated conjunction
or disjunction), constructing its complete, correct truth table.

## Teaching Sequence

MC-2 (vacuous truth) is treated as the Blueprint's own explicitly
named Foundational Misconception — the single most counter-intuitive
fact in elementary logic — and is addressed with particular care,
since a student who cannot accept it will construct every conditional
truth table incorrectly and will misread later proof techniques (vacuous
proofs, contrapositive reasoning) that depend on it. MC-1 is addressed
alongside it in the Blueprint's own combined Teaching Action A02. MC-3
(De Morgan's flip) is addressed last, since it builds directly on
having already-correct individual-connective rows to compare against.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (row-by-row table
construction, the primary action for basic fluency) → **Contrast Pair**
(inclusive-vs-exclusive OR and the vacuous-truth promise justification,
targeting MC-1 and MC-2 together, per the Blueprint's own combined
Teaching Action) → **Error Analysis** (the De Morgan's-flip-vs-naive-
non-flip comparison, targeting MC-3). **What doesn't fit**: introducing
Karnaugh maps or circuit-minimization techniques — this foundational,
`bloom: apply`-level concept only needs correct exhaustive table
construction; minimization belongs to `math.disc.boolean-circuits`'s
own territory.

## Voice Teaching Notes

Listen for "so this row should be false since they're both true" applied
to a P∨Q row — this is MC-1's clearest verbal signature, resurfacing
row-by-row rather than as a single evaluation. A learner who says "this
whole row doesn't even make sense, since 2+2 isn't really 5" facing a
false-antecedent conditional row is showing MC-2 directly — the
Blueprint's own single most counter-intuitive fact. A learner who writes
¬P∧¬Q when asked to negate P∧Q, without checking against a full table,
is showing MC-3. The load-bearing sentence: "build every row first, then
fill in each value mechanically — and when you negate a conjunction or
disjunction, the CONNECTIVE flips too, not just the pieces inside it."

## Assessment Signals

The Blueprint's own P91 mastery gate (MAMR 5/5) is the concrete item
bank — not re-authored here. Diagnostic interpretation this entry adds:
a learner who correctly constructs a full table for a SINGLE connective
(MC-1/MC-2 apparently cleared) but reverts to the naive non-flipped
guess the first time a NEGATED compound expression appears (MC-3 still
latent) shows that "correct row-by-row mechanical evaluation" and
"correctly applying De Morgan's law under negation" are separable
skills requiring independent verification — consistent with MC-3 being
introduced only after individual-connective fluency is established.

## Tutor Recovery Strategy

Likeliest utterance: "if I negate 'P and Q,' shouldn't I just negate P
and negate Q?" facing a De Morgan's-law task — the concept-specific
smaller question: "let's check row by row — does 'not-P and not-Q' give
the same table as 'not (P and Q)'? Where, specifically, do they
disagree?" reframes the confusion from an assumed pattern (negate each
piece) to a directly checkable mismatch (the two tables disagree on a
specific row), directly isolating MC-3's missing connective-flip using
the mechanical procedure this concept already establishes.

## Memory Hooks

**Type**: TOOL skill (fluent, automatic mechanical table construction)
— per `../../foundations/04-universal-teaching-principles.md`'s
fluency-not-correctness standard, since `math.found.logical-equivalence`
(this concept's own direct KG unlock) depends on comparing two tables
quickly and reliably, not on re-deriving each row slowly under
pressure. Review form: short, mixed bursts of compound-proposition
table constructions — including at least one negated conjunction or
disjunction each cycle — never a single, over-practiced fixed example.
Interleaving partners: `math.found.logical-connectives` (the individual
connective definitions this concept mechanizes) and, once available,
`math.found.logical-equivalence` (the row-by-row comparison this
concept's output feeds directly into).

## Transfer Connections

- **Near**: constructing a fresh compound proposition's complete truth
  table, including at least one De Morgan's-law negation.
- **Far**: verifying boolean circuit behavior (AND/OR/NOT/NAND/NOR
  gates) by comparing a circuit's observed outputs against its
  specified truth table — this concept's own KG cross-link.
- **Real-world**: applying exhaustive, systematic case-checking (rather
  than spot-checking a few "obvious" cases) to any decision with
  several independent binary factors (e.g. eligibility rules with
  multiple yes/no conditions).
- **Expert transfer**: the learner, meeting an unfamiliar compound
  logical expression — especially a negated one — automatically builds
  or mentally simulates its full truth table rather than guessing from
  intuition.

## Cross-Subject Connections

Via KG `cross_links`: `math.disc.boolean-circuits` — truth tables are
the direct specification and verification tool for AND/OR/NOT logic
gate behavior; a circuit's observed input-output behavior is checked
directly against its truth table. This is a same-subject (mathematics,
discrete mathematics) cross-link per the KG, not a cross-subject one;
not fabricated beyond what the KG states. Note per the Blueprint's own
Component 7: `math.disc.boolean-circuits` is "not yet authored" as of
this Blueprint's own writing — recorded here for completeness, not
independently re-verified by this Educational Brain entry.

## Blueprint References

`docs/curriculum/blueprints/math.found.truth-table.md` — Status
PACKAGE_READY (402 lines). This entry reuses by reference: the full
Misconception Registry (Component 2, MC-1–MC-3) and the P89 spaced
repetition schedule (Component 6). Not restated beyond what's needed to
cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found regarding this concept's own KG fields — the single
prerequisite, two-item unlocks list, and single cross-link all match the
Blueprint's Component 0 exactly. Informational note, not a defect (see
also this Wave's `math.found.predicate-logic` entry, which raises the
same observation from its own side): this concept's MC-3 (De Morgan's
law for propositional connectives, ¬(P∧Q) ≡ ¬P∨¬Q) is a structurally
related but genuinely distinct skill from `math.found.predicate-logic`'s
own MC-2 (De Morgan's law for quantifiers, ¬(∀x P(x)) ≡ ∃x ¬P(x)) — both
authored this same Wave. Worth a future cross-reference between the two
entries' Transfer Connections sections; not a duplication requiring
resolution, since the underlying objects (connectives vs. quantifiers)
are genuinely different.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 5). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference, with
  MC-1/MC-2 noted as resurfacing forms of `math.found.logical-
  connectives`'s own MC-1/MC-2 rather than independently new content.

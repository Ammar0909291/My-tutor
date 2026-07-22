# Set-Builder Notation — `math.found.set-builder-notation`

## Identity

- **Concept ID**: `math.found.set-builder-notation` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.set-theory`)
- **Prerequisites**: `math.found.set`, `math.found.predicate` — set-
  builder notation combines an already-mastered set concept with an
  already-mastered predicate (a statement with a free variable) into one
  notation, {x ∈ A : P(x)}, so both must be secure before combining
  them.
- **Unlocks** (from KG): `math.found.subset` — set-builder notation is
  the standard tool for specifying a subset of a given set via a
  defining condition.
- **Related** (from KG, not a `requires`/`unlocks` edge): `math.found.
  set`, `math.found.predicate`.
- **Difficulty**: foundational · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 2

## Learning Objective

The learner can: read and write set-builder notation {x ∈ A : P(x)},
correctly identifying its two separate, both-necessary components — the
domain A and the predicate P(x) — recognizing that omitting either
leaves the set ambiguous or ill-defined; convert a set-builder
expression into explicit roster notation for a finite set by checking
each candidate against the predicate directly, correctly recognizing
that a predicate satisfied by no element yields ∅ as a valid outcome,
not an error; and recognize that changing the domain alone, or the
predicate alone, generally changes the resulting set.

## Core Understanding

Set-builder notation is not a single unit to be read holistically — it
names a set via TWO independently necessary components working
together: the domain A (where x is allowed to range) and the predicate
P(x) (which of those candidates qualify). This directly reuses
`math.found.predicate`'s own truth-set idea, T(P) = {x ∈ D : P(x) is
TRUE}, now formalized as the standard notation for specifying a set.
Because the result depends on BOTH components jointly, holding one
fixed while changing the other generally changes the resulting set —
the identical predicate x² = 4 gives {-2, 2} over the integers but only
{2} over the natural numbers, purely because -2 is excluded from the
narrower domain. And when checking every candidate against the
predicate yields no matches at all, the result is not an error or an
undefined outcome — it is ∅, exactly as valid an answer as any non-empty
set, directly consistent with `math.found.set-builder-notation`'s own
prerequisite concepts already establishing ∅ as a legitimate,
well-defined set.

## Mental Models

- **Beginner model — "set-builder notation is basically just the
  predicate part — the domain is implied or doesn't matter much"**: the
  learner focuses on the condition P(x) as the "real content" and treats
  the domain A as decorative or default, missing that it independently
  determines which candidates are even eligible. Shelf-life warning:
  "the domain isn't a footnote — change it, keep the identical
  predicate, and you can get a completely different set."
- **Intermediate model — "both the domain and the predicate must be
  checked, and a fresh empty result is a legitimate, correct answer,
  not a sign of error"**: the learner correctly identifies both
  components when reading notation, correctly converts to roster form by
  checking each candidate, and accepts ∅ as a valid conversion result.
  Upgrade trigger: a predicate that happens to be satisfied by no
  element of its domain, testing whether the learner treats the empty
  result as legitimate.
- **Advanced model — "domain and predicate are independently
  meaningful — changing either one alone generally changes the
  set"**: the learner correctly predicts how a set changes under a
  domain-only change (same predicate, different eligible candidates) or
  a predicate-only change (same domain, different filtering condition),
  treating neither as a fixed backdrop safely ignorable once the "main"
  component is understood. Upgrade trigger: two side-by-side variations,
  one changing only the domain, one changing only the predicate.
- **Expert model — "set-builder notation is the general specification
  tool subset relations, database queries, and formal definitions all
  build on"**: the learner recognizes {x ∈ A : P(x)} as the same
  underlying pattern behind a database WHERE clause, a formally stated
  subset condition, or a mathematical definition restricting a broader
  class of objects — and fluently reads unfamiliar set-builder
  expressions in any of these guises.
- **Do not upgrade early**: a learner who still treats the domain as
  optional (beginner model) should not be pushed into the domain/
  predicate independence analysis (advanced model) before both
  components are reliably identified together (intermediate model) — per
  the Blueprint's own teaching sequence, MC-1 (domain-treated-as-
  optional) and MC-2 (empty-result-treated-as-error) are addressed before
  MC-3 (substitutable-background).

## Why Students Fail

The dominant failure comes from the predicate P(x) typically carrying
the more "interesting," content-rich part of the notation (the actual
condition being tested), while the domain A often appears as a
familiar, quickly-skimmed symbol (ℤ, ℝ, ℕ) — learners naturally focus
attention on the predicate and under-attend to the domain, exactly the
inverse of the notation's actual two-component structure. A second
failure comes from ordinary problem-solving culture treating "no
answer found" as a sign of a mistake rather than a legitimate outcome
— set-builder notation's empty-result case runs directly against this
instinct, exactly as `math.found.set-builder-notation`'s own MC-2 names.

## Misconceptions

Reused from the Blueprint's Component 6 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "DOMAIN-TREATED-AS-OPTIONAL" (Foundational; Type 1,
  overgeneralization — attention naturally gravitates to the predicate
  as the "real content," leaving the domain under-attended as if it were
  optional or implicit)**: believing set-builder notation is fully
  determined by the predicate alone, missing that the domain
  independently determines the resulting set. Full trigger/root-cause/
  error-pattern: Blueprint Component 6, MC-1.
- **MC-2 — "EMPTY-RESULT-TREATED-AS-ERROR" (Foundational; Type 1,
  overgeneralization — ordinary problem-solving culture treats "no
  answer found" as a mistake to be corrected, extended incorrectly to a
  legitimate mathematical outcome)**: believing a set-builder expression
  with no satisfying elements is invalid or undefined, missing that it
  correctly produces the valid empty set. Full content: Blueprint
  Component 6, MC-2.
- **MC-3 — "DOMAIN-OR-PREDICATE-TREATED-AS-SUBSTITUTABLE-BACKGROUND"
  (Type 1, overgeneralization — once one component is understood, the
  other is assumed to be fixed background detail safely ignorable)**:
  believing changing the domain (or predicate) alone, while holding the
  other fixed, leaves the resulting set essentially unchanged. Full
  content: Blueprint Component 6, MC-3.

## Analogies

- **Best analogy — a store's filtered search: category first, then a
  condition**: searching "shoes, under $50" requires BOTH specifying the
  category (shoes — the domain) and the condition (under $50 — the
  predicate); searching only "under $50" across the entire store returns
  a completely different result set. Breaking point: real store searches
  sometimes allow an implicit "everything" category by default; set-
  builder notation's domain is never implicit in this way — it must
  always be stated.
- **Alternative — a school roster filtered by grade, then by a
  condition**: "students in Grade 9, who play a sport" needs both the
  grade (domain) and the sport-playing condition (predicate) specified;
  changing only the grade, or only the condition, generally changes who
  qualifies. Breaking point: school rosters are inherently finite and
  small; set-builder notation generalizes to infinite domains (ℝ, ℤ),
  which this analogy doesn't naturally suggest.
- **ANTI-ANALOGY — do NOT say "the domain is just there to say what
  KIND of numbers we're using — the predicate is the actual math"**:
  this directly installs MC-1 by framing the domain as decorative
  context rather than a co-equal, independently determining component of
  the set.

## Demonstrations

- **Domain-change-only demonstration**: {x ∈ ℤ : x² = 4} = {-2, 2} shown
  directly against {x ∈ ℕ : x² = 4} = {2}, identical predicate, only the
  domain changed — directly targets MC-1 with the Blueprint's own
  Example 1.
- **Empty-result demonstration**: {x ∈ ℤ : x² = -1} checked candidate by
  candidate and found to be ∅, shown as equally legitimate to a
  non-empty conversion like {x ∈ ℤ : 1≤x≤5 and x even} = {2,4} — directly
  targets MC-2 with the Blueprint's own Example 2.
- **Independent-changes demonstration**: the domain changed alone
  (ℤ→ℝ, turning a 9-element set into an infinite interval) contrasted
  with the predicate's boundary changed alone (< to ≤, adding exactly
  one element) — directly targets MC-3 with the Blueprint's own
  Example 3.

## Discovery Questions

**Need** — given {x ∈ ℤ : x² = 4} = {-2, 2} and asked to evaluate the
same predicate over ℕ, the learner initially expects the identical
answer. **Playground** — the learner checks each natural number
candidate against x² = 4 directly. **Invention** — the learner proposes
that the domain must be doing real work, not just naming a "type" of
number. **Collision** — presented with {x ∈ ℤ : x² = -1} and asked
whether this is a mistake or a valid answer — directly targeting MC-2.
**Formalization** — naming the two-component structure explicitly:
domain (where x ranges) and predicate (which candidates qualify), both
required. **Compression** — given a fresh set-builder expression,
converting to roster form by checking each candidate, including
correctly reporting ∅ when appropriate.

## Teaching Sequence

MC-1 (domain-treated-as-optional) and MC-2 (empty-result-treated-as-
error) are addressed early and together in the Blueprint's own sequence
(Teaching Actions A01 and A02), since both concern correctly executing
the basic read-and-convert procedure before the independence property
(MC-3) — which requires comparing two separately-varied versions of the
same expression — can be meaningfully taught.

## Tutor Actions

From `../../teaching-actions/`: **Conflict Evidence / Worked Example**
(the domain-change-only demonstration, the primary action for MC-1) →
**Representation Shift** (the empty-result-is-valid demonstration,
targeting MC-2) → **Contrast Pair** (the independent-changes
demonstration, targeting MC-3). **What doesn't fit**: introducing
axiomatic restrictions on which predicates may legitimately define a
set (Russell's Paradox, the Axiom of Separation) — this foundational,
`bloom: apply`-level concept only needs the informal domain-plus-
predicate reading; the deeper restriction-motivated territory belongs to
`math.found.set-theory-axiomatic`.

## Voice Teaching Notes

Listen for "well it's basically just asking whether x² = 4" with no
mention of which domain x ranges over — this is MC-1's clearest verbal
signature. A learner who says "that can't be right, there must be
something wrong with the predicate" facing a correctly-derived ∅ is
showing MC-2 directly. The load-bearing sentence: "the domain decides
who's even allowed to be checked — the predicate decides who passes."

## Assessment Signals

The Blueprint's own 4-item P77 problem set and P76 database-query
transfer probe (pass criterion MAMR 5/5) are the concrete item bank —
not re-authored here. Diagnostic interpretation this entry adds: a
learner who correctly identifies both components when READING notation
(MC-1 apparently cleared) but still treats an empty conversion result as
a mistake when WRITING/converting (MC-2 still latent) shows that
"recognizing the two-component structure" and "accepting an empty
outcome as legitimate" are separable skills requiring independent
verification.

## Tutor Recovery Strategy

Likeliest utterance: "I checked every number and none of them work —
did I do something wrong?" facing a genuinely empty result — the
concept-specific smaller question: "did you check EVERY candidate in
the domain correctly? If none of them satisfy the predicate, what does
that tell you about the set — not about your work?" reframes the
confusion from "I must have made an error" to "the empty set is simply
the correct, valid answer here" — directly isolating MC-2's error-
assumption.

## Memory Hooks

**Type**: TOOL skill (fluent two-component parsing and conversion) —
per `../../foundations/04-universal-teaching-principles.md`'s fluency-
not-correctness standard, a learner who can eventually work out a
roster conversion slowly is not yet done; instant recognition of both
domain and predicate, and comfort with empty results, is the target,
since `math.found.subset`'s own use of this notation depends on it
being automatic. Review form: short, mixed bursts of set-builder
expressions (some yielding non-empty sets, some yielding ∅, some
varying only the domain or only the predicate), never rote recall of a
fixed example. Interleaving partners: `math.found.set` (the empty-set
legitimacy this concept's MC-2 depends on) and `math.found.predicate`
(the truth-set concept this notation formalizes).

## Transfer Connections

- **Near**: converting a fresh set-builder expression to roster form,
  correctly handling both non-empty and empty outcomes.
- **Far**: reading database query filters (a WHERE clause specifying a
  table — the domain — and a condition — the predicate) as the identical
  underlying pattern.
- **Real-world**: recognizing when a real-world specification ("all
  employees, hired after 2020") is genuinely under-specified without
  both a scope (which employees — which department, which company) and
  a condition.
- **Expert transfer**: the learner, meeting an unfamiliar formal
  definition restricting a broader class of objects, automatically
  identifies the domain being restricted and the defining condition
  separately before interpreting the definition.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node, confirmed against the
Blueprint's own Component 7 check). Not fabricated beyond what the KG
states.

## Blueprint References

`docs/curriculum/blueprints/math.found.set-builder-notation.md` —
Status verified present (132 lines; V-1 through V-20 all PASS). This
entry reuses by reference: the full Misconception Registry (Component
6, MC-1–MC-3) and the P76 database-query transfer probe (Component 5,
Teaching Action A04). Not restated beyond what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's two prerequisites, one-item unlocks list, and
empty cross-links all match the Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 5). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.

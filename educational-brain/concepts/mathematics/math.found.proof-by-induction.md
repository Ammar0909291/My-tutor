# Mathematical Induction — `math.found.proof-by-induction`

## Identity

- **Concept ID**: `math.found.proof-by-induction` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.proof`; children in KG: `math.found.strong-induction`,
  `math.found.well-ordering-principle`, both authored this same wave or
  a prior wave — `well-ordering-principle` in this wave,
  `strong-induction` still unauthored)
- **Prerequisites**: `math.found.proof` (the general standard of a
  valid, finite logical proof, which induction is one specific
  technique for), `math.found.natural-numbers` (the index set ℕ
  induction operates over, and the Peano axioms — specifically P5 —
  that formally license it).
- **Unlocks**: `math.seq.recursive-sequences`, `math.nt.
  induction-applications`.
- **Related** (from KG): `math.found.strong-induction`, `math.found.
  well-ordering-principle`.
- **Difficulty**: developing · **Bloom**: create · **Mastery
  threshold**: 0.8 · **Est. hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.found.
  proof-by-induction.md` (V-1 through V-20 PASS; MAMR=⌈0.8×5⌉=4/5;
  cross_links=[`math.disc.recurrence-relation`], P76_mode=independence
  since that concept is unauthored).
- **Aliases** (from KG): "proof by induction", "weak induction", "PMI".

## Learning Objective

The learner can: state the two-part structure of a proof by
mathematical induction (base case + inductive step); construct a
complete induction proof for a statement about natural numbers,
correctly identifying that the inductive hypothesis assumes ONLY the
single arbitrary instance P(k), never the full "for all n" statement;
and explain precisely why this two-part structure is not circular
reasoning, using the domino-chain argument.

## Core Understanding

`math.found.natural-numbers` already establishes Peano axiom P5
(induction): if P(0) holds and P(n)⟹P(S(n)) for all n, then P(n) holds
for all n∈ℕ. Mathematical induction is the PROOF TECHNIQUE that applies
P5 directly: to prove a statement P(n) for all natural numbers n
(starting from some base value n₀, usually 0 or 1), (1) prove the
**base case** P(n₀) directly, and (2) prove the **inductive step**: the
implication P(k)⟹P(k+1) for an ARBITRARY k≥n₀ — assuming P(k) is true
(the **inductive hypothesis**), derive that P(k+1) must also be true.
Why this validly proves P(n) for every n: the base case gives P(n₀);
the inductive step, applied with k=n₀, gives P(n₀)⟹P(n₀+1), which
combined with the base case yields P(n₀+1); applying the inductive
step again with k=n₀+1 yields P(n₀+2); this chain continues
indefinitely — exactly like a row of falling dominoes, where the base
case knocks over the first domino and the inductive step guarantees
each domino knocks over the next, so every domino (every natural number
≥n₀) eventually falls. This is NOT circular reasoning: the inductive
step does not assume "P(n) holds for all n" (which WOULD be circular,
assuming the very thing being proven) — it assumes only P(k) for one
arbitrary, fixed, specific value k, and derives P(k+1) from that single
assumption. Since k was arbitrary, the implication holds for every k,
and combined with the base case, the domino-chain argument (formally,
the Principle of Mathematical Induction — precisely Peano's P5)
legitimately concludes P(n) for all n≥n₀.

## Mental Models

- **Beginner model — "induction means checking a pattern holds for
  several small cases and then assuming it continues"**: the learner
  treats induction as an extension of pattern-spotting rather than a
  formal two-part logical structure. Shelf-life warning: this model
  cannot distinguish a genuine inductive proof from an unjustified
  extrapolation, and gives no way to verify a proof is actually valid.
- **Intermediate model — "induction requires a base case AND an
  inductive step that assumes P(k) for one arbitrary k and derives
  P(k+1)"**: the learner correctly states the two-part structure and
  can execute both steps for straightforward statements, but may still
  be uncertain about exactly what the inductive hypothesis licenses use
  of, or may omit the base case believing the inductive step alone
  suffices. Upgrade trigger: being shown a "proof" with only the
  inductive step, no base case, and asked whether it is complete.
- **Advanced model — "induction is the direct application of Peano's
  P5, the base case and inductive step together form a domino-chain
  argument that is provably NOT circular, and the inductive hypothesis
  is used as exactly one substitution, never assumed globally"**: the
  learner fluently constructs induction proofs across sum formulas,
  inequalities, and divisibility statements, correctly locating the
  exact line where the hypothesis is invoked. Upgrade trigger: being
  asked to identify, in a submitted proof, the precise line where the
  inductive hypothesis is substituted in.
- **Do not upgrade early**: a learner still treating the inductive step
  as assuming the full "for all n" statement (beginner/intermediate
  boundary, directly triggering MC-1) should not be pushed toward
  constructing full multi-step induction proofs (advanced model) before
  the arbitrary-single-instance nature of the hypothesis is secure.

## Why Students Fail

The dominant, foundational failure believes the inductive step assumes
the FULL general statement "P(n) for all n" is already true, treating
the technique as circular reasoning — missing that the hypothesis is
only ONE arbitrary, fixed instance P(k), used to derive the single next
instance P(k+1). A second failure believes a valid inductive step alone
(without ever proving a base case) constitutes a complete proof, not
recognizing the base case as the essential "first domino" that starts
the chain — the implication P(k)⟹P(k+1) being true for every k says
nothing whatsoever about whether P(n₀) itself is ever true. A third,
narrower failure writes an inductive step that derives P(k+1) without
actually USING the inductive hypothesis P(k) anywhere in the
derivation, effectively proving P(k+1) directly and failing to
constitute a valid inductive argument wherever the hypothesis
substitution is genuinely needed.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: INDUCTIVE-HYPOTHESIS-TREATED-AS-CIRCULAR (Foundational; Type 1 — overgeneralization)
**Trigger**: believing the inductive step assumes the full "for all n"
statement is already true, rather than assuming only a single arbitrary
instance P(k).
**Diagnostic note**: classified Type 1 — the learner overgeneralizes
"assume P(k) as the inductive hypothesis" into "assume the entire
general claim," collapsing the arbitrary-instance/universal-claim
distinction that is this concept's central structural move.
**Repair**: re-examine Example 2's inductive step (proving n²≥n) line
by line — the hypothesis k²≥k is invoked as EXACTLY ONE substitution
step; everything else is ordinary algebra already known. "The
hypothesis is used exactly once, as a single substitution — if your
proof seems to already assume the conclusion somewhere, that's a
circular-reasoning error, not a valid inductive step."

### MC-2: BASE-CASE-OMITTED-AS-UNNECESSARY (Foundational; Type 1 — overgeneralization)
**Trigger**: believing a valid inductive step alone, without a base
case, constitutes a complete proof.
**Repair**: present a "proof" with only the inductive step and ask
whether it is complete — no, because without a base case there is no
"domino #1" to start the chain: the implication P(k)⟹P(k+1) being true
for every k says nothing about whether P(n₀) itself is ever true.

### MC-3: HYPOTHESIS-NOT-EXPLICITLY-INVOKED (Moderate; Type 1 — overgeneralization)
**Trigger**: deriving P(k+1) without actually using the inductive
hypothesis P(k) anywhere in the derivation.
**Repair**: re-derive Example 2's proof, pointing to the exact line
where k²≥k is substituted in, as the template every inductive step
should follow — if that substitution line is missing where genuinely
needed, the derivation is not a valid inductive argument, even if the
final line happens to be true.

## Analogies

**Primary — a row of falling dominoes**: if domino #1 falls (base
case), and every domino, IF it falls, knocks down the next one
(inductive step), then every domino in the row eventually falls, no
matter how long the row is. Neither piece alone suffices: domino #1
falling tells you nothing about #2 without the "each knocks down the
next" rule; the "each domino would knock down the next IF it fell" rule
tells you nothing without an actual first domino falling to start the
chain.

**Anti-analogy to retire**: "Induction is like noticing a pattern holds
for the first few cases and trusting it continues." This directly
invites the beginner mental model and MC-1 by suggesting induction is
extrapolation from examples rather than a formal two-part logical
argument — checking a pattern for the first five cases proves nothing
about the sixth without an actual inductive step.

## Demonstrations

**Sum formula (Blueprint Example 1)**: prove 1+2+⋯+n=n(n+1)/2 for all
n≥1. Base case (n=1): both sides equal 1. Inductive step: assuming
1+2+⋯+k=k(k+1)/2 for arbitrary k, show 1+2+⋯+k+(k+1)=(k+1)(k+2)/2 by
substituting the hypothesis and simplifying algebraically.

**Precise hypothesis use (Blueprint Example 2, breaks MC-1/MC-3)**:
prove n²≥n for all n≥1, explicitly annotating exactly where k²≥k (the
hypothesis) is substituted — one specific line — versus where ordinary
algebra (expanding (k+1)²) is used.

**Divisibility (Blueprint Example 3)**: prove 3∣(4ⁿ−1) for all n≥1.
Base case (n=1): 4¹−1=3, divisible. Inductive step: assuming
4ᵏ−1=3m, show 4^(k+1)−1=4(4ᵏ−1)+3=4(3m)+3=3(4m+1), divisible by 3.

## Discovery Questions

Present the domino row physically or as an image and ask the learner
what two facts, together, guarantee EVERY domino falls — the learner
discovers "the first one falls" and "each one knocks down the next"
are jointly necessary and sufficient, directly experiencing the
two-part structure before it's named formally. Recommendation: guided
discovery for the domino-chain necessity insight (directly
experiential); direct instruction for the precise algebraic mechanics
of hypothesis substitution (MC-1/MC-3's repair), since correctly
locating a hypothesis-substitution line in an unfamiliar proof is not
independently rediscoverable without worked-example scaffolding.

## Teaching Sequence

MC-1 (hypothesis treated as circular) is addressed first via the
Blueprint's A01 hook, since it undermines the validity of the entire
technique at the deepest level — a learner unconvinced induction is
non-circular will distrust every subsequent proof regardless of
correctness. MC-2 (base case omitted) is addressed alongside MC-1 in
A02's second contrast, as the complementary "missing half" of the same
two-part-structure understanding. MC-3 (hypothesis not invoked) is
addressed last, as a narrower, execution-level error that surfaces only
once a learner is already attempting to construct full proofs.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (hypothesis treated as circular) | WORKED EXAMPLE: domino-chain structure + Example 2's single-substitution annotation | Teaching Actions: SHOW §1 |
| MC-2 active (base case omitted) | CONTRAST PAIR: inductive-step-only "proof" vs. complete two-part proof | Teaching Actions: SHOW §2 |
| MC-3 active (hypothesis not invoked) | WORKED EXAMPLE: Example 2 re-derivation with explicit substitution-line pointer | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: recursive-function correctness proof via base case + inductive step (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Name the inductive hypothesis explicitly as "one
arbitrary, fixed k" every time it's introduced — never let "assume the
statement holds" go unqualified, since that phrasing alone is enough to
trigger MC-1.

**Wait-time**: After presenting the inductive-step-only "proof" (no
base case), give extended wait-time before revealing it's incomplete —
let the learner locate the missing piece themselves.

**Load-bearing sentences**:
- "The inductive hypothesis assumes exactly one arbitrary case, k —
  never the full 'for all n' statement — or the argument would be
  circular."
- "The inductive step alone, without a base case, is a conditional
  that's never triggered — like dominoes that would knock each other
  down but are never actually pushed."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint P77 Q1): prove 1+3+5+⋯+(2n−1)=n² for all n≥1.
Pass: correct base case + inductive step with explicit hypothesis
substitution.

**Gate 2** (Blueprint P77 Q2): prove 2ⁿ>n for all n≥1. Pass: correct
two-part proof.

**Gate 3** (Blueprint P77 Q3): explain what is wrong with stating the
inductive hypothesis as "assume the formula holds for all n up to k."
Pass: correctly identifies this as MC-1's circular-reasoning error,
contrasted with the valid single-instance hypothesis P(k).

**Gate 4** (Blueprint P77 Q4): prove 5∣(6ⁿ−1) for all n≥1. Pass:
correct two-part proof.

**Gate 5** (Blueprint P76 transfer probe): explain via base
case/inductive step why a recursive factorial function is correct for
every non-negative integer input, and what could go wrong with skipping
the base case. Pass: correct mapping to the domino-chain structure;
correctly identifies the base-case-omission risk.

**Mastery criterion**: MAMR 4/5, consistent with KG mastery_threshold
0.8 (⌈0.8×5⌉=4).

## Tutor Recovery Strategy

Likeliest utterance: "isn't this cheating — you're assuming what you're
trying to prove?" — the concept-specific smaller question: "are we
assuming the statement is true for ALL n, or just for one specific,
arbitrary k?" reframes the confusion from "the whole argument assumes
its own conclusion" (MC-1's circular-reasoning read) to "the argument
assumes exactly one instance and derives the next," directly isolating
MC-1 without dismissing the learner's genuine logical instinct that
circular reasoning would indeed be invalid.

## Memory Hooks

**Type**: procedural (constructing base case + inductive step pairs
across sum-formula, inequality, and divisibility statement types) +
declarative (the domino-chain justification for non-circularity).
Review form: fresh statements of each of the three worked-example
types, periodically paired with a "spot the missing base case" or "spot
the unused hypothesis" diagnostic item to keep MC-2/MC-3's guard-rails
active. Interleaving partner: `math.found.natural-numbers` (Peano's P5,
the exact axiom this technique directly applies).

## Transfer Connections

**Near transfer**:
- `math.found.strong-induction` (a direct variant, currently
  unauthored, assuming P(0),…,P(k) rather than only P(k))
- `math.found.well-ordering-principle` (authored this same wave;
  logically equivalent to induction, provides an alternative
  minimal-counterexample proof style)

**Far transfer**:
- `math.seq.recursive-sequences` (recursively defined sequences are
  naturally proven-about via induction, matching the recursive
  structure directly, per KG `unlocks`)
- `math.nt.induction-applications` (a dedicated survey of induction's
  use across number theory, per KG `unlocks`)
- Computer science: recursive algorithm correctness proofs and loop
  invariant arguments, both directly structured as base case +
  inductive step

## Cross-Subject Connections

Per KG `cross_links` [`math.disc.recurrence-relation`]: not yet
authored (verified via `ls docs/curriculum/blueprints/`), so this
concept's Blueprint uses independence mode for its transfer probe
rather than a genuine cross-link probe, per the Blueprint's own
Component 7 note. Not fabricated beyond what the KG and Blueprint
state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.
proof-by-induction.md` (V-1 through V-20 PASS, AIR PASS).

Full Teaching Actions (A01-A03), the complete P77 4-problem set, and
the P76 transfer probe reused by reference above and not restated in
full; the Misconception Registry (MC-1 through MC-3) cited directly by
ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's two prerequisites
(`math.found.proof`, `math.found.natural-numbers`) are exactly
sufficient — the second specifically supplies Peano's P5, the axiom
this technique directly applies. Both KG children
(`math.found.strong-induction`, `math.found.well-ordering-principle`)
correctly build further on this concept. Estimated hours (10) and the
"create" Bloom level are appropriate for a concept whose mastery
requires genuine proof construction, not mere recognition.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 12, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |

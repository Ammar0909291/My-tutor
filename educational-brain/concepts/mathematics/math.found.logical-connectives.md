# Logical Connectives — `math.found.logical-connectives`

## Identity

- **Concept ID**: `math.found.logical-connectives` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.logic`)
- **Prerequisites**: `math.found.proposition` — connectives operate on
  propositions (statements with a definite truth value) to form
  compound propositions; a learner must already recognize what does and
  does not qualify as a proposition before combining them.
- **Unlocks** (from KG): `math.found.truth-table`,
  `math.found.logical-equivalence`, `math.disc.boolean-circuits` — truth
  tables formalize the mini truth-tables this concept introduces per
  connective; logical equivalence is defined as two propositions sharing
  the same truth table; boolean circuits implement these same
  connectives as physical AND/OR/NOT gates.
- **Cross-links** (from KG): `math.disc.boolean-circuits` — the ∧/∨/¬
  connectives map directly onto AND/OR/NOT logic gates, and De Morgan's
  laws apply identically to both domains.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 4

## Learning Objective

The learner can: correctly evaluate compound propositions built from the
five standard connectives (¬, ∧, ∨, →, ↔) given the truth values of their
components; explain why mathematical ∨ (disjunction) is inclusive
(true when both components are true) unlike much everyday "or"; explain
vacuous truth (a false antecedent makes any conditional true); and
correctly distinguish biconditional (same truth value) from conditional
(one-directional implication).

## Core Understanding

Each of the five standard connectives (¬, ∧, ∨, →, ↔) is
TRUTH-FUNCTIONAL: the truth value of the compound statement depends only
on the truth values of its component propositions, never on their
content, plausibility, or any causal relationship between them. This is
the single fact from which every one of this concept's counterintuitive
results follows: disjunction is inclusive because the DEFINITION says
"true when P is true, Q is true, or both" — not because everyday
intuition agrees; the conditional P→Q is TRUE whenever P is false
(vacuous truth) because the definition only marks it false in the one
case where a true antecedent accompanies a false consequent — it says
nothing about causation, plausibility, or "meaningfulness." Once the
five connectives' truth-functional definitions are held firmly, results
that feel strange in isolation (inclusive or, vacuous truth) become
mechanical applications of a fixed rule.

## Mental Models

- **Beginner model — "connectives work the way 'and'/'or'/'if...then'
  work in everyday English"**: the learner imports ordinary-language
  intuitions (exclusive "or," causal "if...then") wholesale, which
  matches ∧ closely but diverges sharply from ∨ and →. Shelf-life
  warning: "conjunction (∧) behaves almost exactly like everyday 'and' —
  but disjunction and the conditional will each surprise you at least
  once."
- **Intermediate model — "each connective has its own fixed
  truth-functional definition, checked mechanically from a truth table,
  independent of everyday usage"**: the learner evaluates compound
  propositions by consulting the defined truth table for each
  connective rather than by intuition, correctly handling inclusive or
  and vacuous truth once they're explicitly named. Upgrade trigger: a
  side-by-side contrast of mathematical ∨ against everyday exclusive
  "or," and of a vacuously-true conditional against a causally
  "meaningless" one.
- **Advanced model — "connectives relate to each other via identities
  (De Morgan's laws, → in terms of ¬ and ∨) rather than being five
  unrelated rules"**: the learner recognizes P→Q ≡ ¬P∨Q and
  ¬(P∧Q) ≡ ¬P∨¬Q as genuine equivalences usable to rewrite and simplify
  compound statements, not just five separately-memorized truth tables.
  Upgrade trigger: needing to simplify or rewrite a compound proposition
  using an unfamiliar connective combination.
- **Expert model — "the five connectives are chosen for expressive
  completeness, and even they are redundant (NAND alone suffices)"**:
  the learner understands that ¬, ∧, ∨, →, ↔ are a conventional,
  sufficient-but-not-minimal basis, and that a single connective (NAND)
  can express all of classical propositional logic — directly connecting
  to this concept's own KG cross-link into boolean circuit design.
- **Do not upgrade early**: a learner still applying everyday-language
  intuitions (beginner model) should not be pushed toward De Morgan's
  law manipulation (advanced model) before the individual truth-table
  definitions are mechanical — per the Blueprint's own MAMR, MC-1
  (OR-EXCLUSIVE) is cleared before MC-2 and MC-3 are addressed.

## Why Students Fail

The dominant failure, per the Blueprint's own MAMR-foundational
misconception, is direct linguistic interference: everyday English "or"
is frequently exclusive ("soup or salad?" means pick one), while
mathematical ∨ is defined as inclusive — and because both are written
with the same word, learners default to the far more common
everyday-language reading until explicitly shown the mathematical
definition disagrees. A second, harder-to-dislodge failure (per the
Blueprint's own teaching notes, often needing 3+ exposures) comes from
the conditional's vacuous-truth case, which conflicts with the
causal/relevance expectations ordinary "if...then" carries — learners
resist marking a conditional true when its antecedent and consequent
seem entirely unrelated.

## Misconceptions

Reused from the Blueprint's Component 2 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "OR-EXCLUSIVE" (Foundational; Type 3, language
  contamination — everyday English "or" is frequently exclusive, and
  this usage is imported directly into mathematical ∨)**: believing
  P∨Q means P or Q but NOT both. Full trigger/root-cause/error-pattern:
  Blueprint Component 2, MC-1.
- **MC-2 — "IMPLIES-CAUSAL" (Type 3, language contamination —
  everyday "if...then" carries causal or relevance meaning that
  classical → deliberately lacks)**: believing P→Q means P causes Q, or
  that a false antecedent makes the conditional meaningless rather than
  vacuously true. Full content: Blueprint Component 2, MC-2.
- **MC-3 — "BICONDITIONAL-SYMMETRY-CONFUSION" (Type 6, analogy/prior-
  experience overextension — the learner extends the conditional's or
  the conjunction's more familiar behavior onto the less familiar
  biconditional)**: believing P↔Q is the same as P→Q, or that P↔Q
  requires both to be true rather than merely sharing the same truth
  value. Full content: Blueprint Component 2, MC-3.

## Analogies

- **Best analogy — negation as a light switch, conjunction as a
  two-key safe**: flipping a switch reverses a state exactly as ¬
  reverses a truth value; a two-key safe opens only when BOTH keys turn
  simultaneously, exactly as ∧ requires both components true. Breaking
  point: this analogy pair covers ¬ and ∧ cleanly but does not extend to
  ∨, →, or ↔ without separate analogies of their own (below).
- **Alternative — the conditional as a promise**: "if you study (P),
  I'll give you an A (Q)" is broken ONLY if you studied and didn't get
  an A; if you didn't study, the promise is vacuously kept regardless of
  your grade. Breaking point: real promises can be judged "irrelevant"
  or "vacuous" in a dismissive social sense; classical logic's vacuous
  truth is not dismissive — it is a definite, load-bearing TRUE that
  participates fully in further reasoning (e.g. it can serve as a
  premise in a valid proof).
- **ANTI-ANALOGY — do NOT say "→ basically means 'or' would too, so
  just think of P→Q as another kind of or/and combo you can eyeball"**:
  this invites guessing the truth table from vague resemblance rather
  than applying the DEFINED truth-functional rule — precisely the habit
  MC-1 and MC-2 both exploit.

## Demonstrations

- **Inclusive-vs-exclusive contrast pair**: the Blueprint's own P∨Q
  truth table set directly against a P-XOR-Q table, both evaluated at
  (T,T) — ∨ gives TRUE, XOR gives FALSE — making the everyday/
  mathematical divergence concrete. Directly targets MC-1.
- **Vacuous-truth promise demonstration**: "if 2+2=5, then the moon is
  cheese" evaluated as TRUE because the antecedent is false — paired
  with the promise analogy's "not broken if you didn't study" case.
  Directly targets MC-2.
- **Conditional-vs-biconditional row-by-row contrast**: the Blueprint's
  own four-row table showing → and ↔ agreeing on rows 1-2 but
  disagreeing on rows 3-4 (F,T and F,F) — directly targets MC-3.

## Discovery Questions

**Need** — given "P: it is Saturday (T), Q: it is a holiday (T)," and
asked to evaluate P∨Q using everyday intuition, the learner may hesitate
over whether "both true" counts. **Playground** — the learner tests
several concrete (P,Q) combinations against both an inclusive and
exclusive reading. **Invention** — the learner proposes that
mathematics might simply define "or" differently than everyday speech
does. **Collision** — presented with "if 2+2=5, then pigs can fly" and
asked directly whether this is true — confronting the vacuous-truth
result against ordinary intuition about "meaningless" conditionals.
**Formalization** — naming all five truth-functional definitions
explicitly, with their exact truth-table rows. **Compression** —
evaluating a fresh compound proposition combining several connectives,
using the stated operator precedence (¬ > ∧ > ∨ > → > ↔).

## Teaching Sequence

MC-1 (OR-exclusive) is repaired first, per the Blueprint's own MAMR
ordering, addressed directly in the main teaching sequence before MC-2
and MC-3 are introduced — a learner still reading ∨ as exclusive cannot
reliably evaluate any compound proposition involving disjunction, which
blocks correct evaluation of ↔ (itself defined via → in both
directions) and De Morgan's laws (which rewrite ∧ in terms of ∨). MC-2
and MC-3 are then addressed in FIFO order once MC-1 is cleared.

## Tutor Actions

From `../../teaching-actions/`: **Analogy Bridge** (light-switch/
two-key-safe for ¬/∧, the promise analogy for →, the primary actions
across the sequence) → **Contrast Pair** (inclusive-∨-vs-XOR, and
conditional-vs-biconditional row comparisons, targeting MC-1 and MC-3) →
**Pattern Induction** (De Morgan's laws verified row-by-row on a full
truth table). **What doesn't fit**: teaching predicate logic's
quantifiers (∀/∃) alongside these five propositional connectives — that
extension belongs to `math.found.predicate` and beyond, not this
concept's scope.

## Voice Teaching Notes

Listen for "well, you wouldn't say both, right?" applied to a disjunction
where both components are true — this is MC-1's clearest verbal
signature. A learner who says "but that doesn't make any sense, they're
totally unrelated" about a vacuously-true conditional is showing MC-2
directly. The load-bearing sentence: "→ and ↔ only care about truth
values matching a fixed rule — never about whether the two statements
seem related to each other."

## Assessment Signals

The Blueprint's own 7-item mastery gate (P77 problem set + P76 boolean-
circuits transfer probe, pass criterion 6/7) is the concrete item bank —
not re-authored here. Diagnostic interpretation this entry adds: a
learner who correctly evaluates ∨ as inclusive (MC-1 cleared) but still
resists vacuous truth on a conditional with an obviously false antecedent
(MC-2 still latent) shows that "applying the ∨ truth table mechanically"
and "applying the → truth table mechanically, especially its vacuous
case" are separable skills, consistent with the Blueprint's own
observation that MC-2 typically needs 3+ separate exposures.

## Tutor Recovery Strategy

Likeliest utterance: "but if 2+2 isn't 5, why does it even matter what
that would imply?" facing a vacuously-true conditional — the
concept-specific smaller question: "was the PROMISE ever broken — did
the antecedent actually happen while the consequent failed?" reframes
the confusion from "is this claim meaningful" (which correctly feels
strange) to "was the ONE specific failure condition (true antecedent,
false consequent) ever met" (which was not) — directly isolating MC-2's
vacuous-truth confusion using the Blueprint's own promise framing.

## Memory Hooks

**Type**: TOOL skill (fluent, automatic truth-table application) — per
`../../foundations/04-universal-teaching-principles.md`'s fluency-not-
correctness standard, a learner who can eventually work out a truth
value slowly is not yet done; instant, correct evaluation of all five
connectives (including the two counterintuitive cases) is the target,
since later concepts (truth tables, logical equivalence, proofs) depend
on this being automatic. Review form: short, mixed compound-proposition
evaluation bursts covering all five connectives together, never
connective-by-connective blocked practice once initial acquisition is
done. Interleaving partners: `math.found.proposition` (the atomic units
these connectives combine) and, once available, `math.found.truth-table`
and `math.found.logical-equivalence` — this concept's own direct KG
unlocks.

## Transfer Connections

- **Near**: evaluating a fresh compound proposition combining several
  connectives, correctly applying operator precedence.
- **Far**: reading and simplifying boolean expressions in programming
  and digital logic design, where the same five connectives (as
  operators or gates) obey identical truth-functional rules.
- **Real-world**: recognizing when an everyday "if...then" statement is
  being read causally when the speaker actually intends (or a formal
  system requires) a purely truth-functional reading, or vice versa.
- **Expert transfer**: the learner, meeting an unfamiliar compound
  logical expression in any formal system, automatically defaults to
  the truth-functional definition rather than an intuitive causal or
  exclusivity-based guess.

## Cross-Subject Connections

Via KG `cross_links`: `math.disc.boolean-circuits` — the AND/OR/NOT
logic gates implement ∧/∨/¬ directly, NAND and NOR gates are derived
from these, and De Morgan's laws apply identically to both propositional
logic and digital circuit simplification. This is a same-subject
(discrete mathematics) cross-link per the KG, not a cross-subject one;
not fabricated beyond what the KG states.

## Blueprint References

`docs/curriculum/blueprints/math.found.logical-connectives.md` — Status
PACKAGE_READY (401 lines; V-1 through V-20 all PASS). This entry reuses
by reference: the full Misconception Registry (Component 2, MC-1–MC-3),
the five connective truth tables (Component 1), and the P76 boolean-
circuits transfer probe (Component 4, TA-A06). Not restated beyond
what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's single prerequisite, three-item unlocks list, and
single cross-link to `math.disc.boolean-circuits` all match the
Blueprint's Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 4). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.

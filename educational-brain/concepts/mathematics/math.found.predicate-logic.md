# Predicate Logic — `math.found.predicate-logic`

## Identity

- **Concept ID**: `math.found.predicate-logic` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / foundations (parent:
  `math.found.logic`; children per KG: `math.found.quantifiers`,
  `math.found.predicate`)
- **Prerequisites**: `math.found.logical-connectives`,
  `math.found.proposition` — predicate logic extends propositional
  logic (connectives combining propositions) by quantifying predicates
  over a domain, so both the connectives and the notion of a definite
  truth value must already be secure.
- **Unlocks** (from KG): `math.found.proof`, `math.found.set-theory` —
  formal proof techniques (direct proof, contrapositive, contradiction)
  are stated and manipulated in the language of quantified predicates;
  set theory's own membership rules are themselves predicates over a
  domain.
- **Related** (from KG, not a `requires`/`unlocks` edge):
  `math.found.quantifiers`.
- **Difficulty**: developing · **Bloom**: analyze · **Mastery
  threshold**: 0.80 · **Est. hours**: 8

## Learning Objective

The learner can: correctly evaluate ∀x P(x) and ∃x P(x) over a stated
finite or infinite domain; correctly apply the negation laws
¬(∀x P(x)) ≡ ∃x ¬P(x) and ¬(∃x P(x)) ≡ ∀x ¬P(x), flipping the
quantifier as required; correctly distinguish ∀x ∃y P(x,y) from
∃y ∀x P(x,y) as generally non-equivalent claims with potentially
different truth values; and never evaluate a quantified statement
without first fixing an explicit domain of discourse.

## Core Understanding

Predicate logic is not propositional logic with a decorative new
symbol added — it is the extension needed to make claims about an
entire domain of objects at once, and its single most consequential
fact is that QUANTIFIER ORDER IS NOT COMMUTATIVE: ∀x ∃y P(x,y) says "for
each x, SOME y (possibly different each time) works," while
∃y ∀x P(x,y) says "ONE SINGLE y works for every x simultaneously" — these
are structurally different claims, and swapping the order can flip a
true statement into a false one (the canonical case: over ℤ, "for every
m there exists n with m < n" is true, but "there exists one n greater
than every m" is false). Negation interacts with quantifiers the same
way De Morgan's laws interact with ∧/∨ in `math.found.logical-
connectives`: negating a "for all" claim doesn't merely negate the
predicate — it flips the quantifier to "there exists," and vice versa,
because disproving "P holds everywhere" only requires ONE counter-
example, not a universal failure.

## Mental Models

- **Beginner model — "∀ and ∃ are just two ways of saying 'and' and
  'or' over a list, and reading order doesn't matter much"**: the
  learner treats quantifier order as roughly interchangeable, the same
  informal way "for all x and some y" might be read casually in ordinary
  speech. Shelf-life warning: "this survives simple, single-quantifier
  statements, but the moment two quantifiers interact, order becomes the
  single most important fact about the claim."
- **Intermediate model — "quantifier order determines a genuine
  dependency: which variable is chosen first, and whether the second
  can depend on the first"**: the learner correctly reads ∀x ∃y P(x,y)
  as "y may depend on x" and ∃y ∀x P(x,y) as "y is fixed once, before x
  varies," and evaluates both correctly for a concrete domain. Upgrade
  trigger: a canonical example (like the ℤ ordering case) where the two
  orderings genuinely diverge in truth value.
- **Advanced model — "negation flips the quantifier because disproving
  a universal claim only needs one counter-example"**: the learner
  derives ¬(∀x P(x)) ≡ ∃x ¬P(x) from first principles (to show "not
  every x satisfies P" is true, you need exactly one x that fails —
  which IS an existential claim) rather than memorizing the flip as an
  arbitrary rule. Upgrade trigger: being asked to justify the negation
  law from the meaning of ∀ and ∃, not merely recite it.
- **Expert model — "domain, quantifier order, and negation together
  fully specify a claim's meaning, and all three must be stated
  explicitly, never assumed"**: the learner treats an unstated domain as
  an incomplete claim (not a default to ℝ or "everything"), fluently
  negates nested quantifier statements, and recognizes predicate logic
  as the language proofs (this concept's own KG unlock) are actually
  written in.
- **Do not upgrade early**: a learner who still treats quantifier order
  as roughly interchangeable (beginner model) should not be pushed into
  nested-quantifier negation (advanced model) before the basic
  dependency reading (intermediate model) is secure — per the
  Blueprint's own MAMR, MC-1 (quantifier-scope-collapse) is cleared
  before MC-2 and MC-3, addressed FIFO after.

## Why Students Fail

The dominant failure, per the Blueprint's own MAMR-foundational
misconception, comes from over-applying multiplication's genuine
commutativity (a × b = b × a, deeply familiar) onto quantifier order,
which has no such symmetry — "for all x, there exists y" and "there
exists y, for all x" sound like a reordering of the same two phrases in
casual reading, exactly the way "3 times 4" and "4 times 3" are freely
interchangeable. A second, closely related failure comes from
`math.disc`-style De Morgan practice on ∧/∨ (negate the parts, keep the
connective) being incompletely transferred to quantifiers, where the
QUANTIFIER ITSELF must also flip, not merely the predicate inside it. A
third failure comes from most early examples using ℝ or ℤ so
consistently that learners stop registering the domain as a stated,
checkable part of the claim at all.

## Misconceptions

Reused from the Blueprint's Component 2 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "QUANTIFIER-SCOPE-COLLAPSE" (Foundational; Type 1,
  overgeneralization from multiplication's genuine commutativity,
  extended incorrectly to quantifier order)**: believing ∀x ∃y P(x,y)
  and ∃y ∀x P(x,y) mean the same thing. Full trigger/root-cause/error-
  pattern: Blueprint Component 2, MC-1.
- **MC-2 — "NEGATION-FLIP-FAILURE" (Type 1, overgeneralization — an
  incomplete transfer of De Morgan's-law practice on ∧/∨, where only
  the inner terms are negated, mistakenly applied to quantifiers without
  also flipping the quantifier itself)**: believing ¬(∀x P(x)) ≡
  ∀x ¬P(x), passing negation through without flipping ∀↔∃. Full content:
  Blueprint Component 2, MC-2.
- **MC-3 — "DOMAIN-UNIVERSAL" (Type 1, overgeneralization — most school
  examples use ℝ or ℤ so consistently that an unstated domain is
  habitually assumed to default to one of them)**: believing the domain
  is always ℝ (or "all numbers") unless explicitly restricted. Full
  content: Blueprint Component 2, MC-3.

## Analogies

- **Best analogy — "everyone has a mother" vs. "one person is everyone's
  mother"**: ∀x ∃y (y is x's mother) is true — every person has SOME
  mother, possibly different for each person; ∃y ∀x (y is x's mother) is
  false — no single person is the mother of every person. Breaking
  point: this analogy's asymmetry is intuitively obvious once stated,
  which risks the learner treating quantifier-order confusion as
  something they'd "obviously never do" — the mathematical cases (like
  the ℤ ordering example) are chosen precisely because they are less
  intuitively obvious and require the same reasoning applied carefully.
- **Alternative — a prosecutor vs. defense framing for negation**: to
  disprove "every witness is telling the truth" (∀), a prosecutor needs
  only ONE lying witness (∃) — not proof that every witness is lying.
  Breaking point: courtroom "disproving" is evidentiary and probabilistic;
  the mathematical negation law is a strict logical equivalence, not a
  burden-of-proof analogy — useful for intuition, not for formal rigor.
- **ANTI-ANALOGY — do NOT say "swapping ∀ and ∃ is like swapping the
  order you multiply two numbers — it doesn't change the answer"**:
  this directly installs MC-1 — quantifier order is precisely the one
  place this multiplication intuition fails, and stating it as a
  positive analogy actively teaches the misconception.

## Demonstrations

- **ℤ-ordering scope-collapse demonstration**: ∀m ∃n (m < n) over ℤ
  shown TRUE (take n = m+1) directly against ∃n ∀m (m < n) shown FALSE
  (no single integer exceeds every integer) — directly targets MC-1
  with the Blueprint's own canonical example.
- **Scope-dependency diagram** (Protocol A03, Primitive P11): a visual
  diagram showing "y is chosen AFTER x, and may depend on x" (∀x∃y)
  versus "y is fixed BEFORE x varies" (∃y∀x) — the Blueprint's own most
  effective repair tool for MC-1.
- **Negation-flip worked example**: "∀x (x > 0)" negated correctly to
  "∃x (x ≤ 0)," contrasted against the incorrect non-flipped
  "∀x (x ≤ 0)" — directly targets MC-2.

## Discovery Questions

**Need** — given "∀m ∃n (m < n)" and "∃n ∀m (m < n)" over ℤ, both read
initially as "roughly the same claim," the learner is asked to evaluate
each separately. **Playground** — the learner tests specific values of
m and n against both statements. **Invention** — the learner proposes
that maybe WHICH quantifier comes first changes what's actually being
claimed — a fixed y versus a y allowed to change with x. **Collision**
— confronted directly with one statement true and the other false for
the identical predicate, forcing the scope-collapse assumption to
break. **Formalization** — naming the dependency explicitly: ∀x∃y means
y may depend on x; ∃y∀x means one y must work for all x. **Compression**
— given a fresh nested-quantifier statement, correctly evaluating it
and correctly negating it (flipping quantifiers as required) over an
explicitly stated domain.

## Teaching Sequence

MC-1 (quantifier-scope-collapse) is repaired first, per the Blueprint's
own MAMR ordering and its own explicit teaching note that this is "the
critical gate" — students who conflate ∀x∃y and ∃y∀x will construct
flawed proofs indefinitely, since nearly every "for all x there exists
y" proof pattern depends on getting the dependency direction right. MC-2
(negation-flip-failure) and MC-3 (domain-universal) are then addressed
FIFO once MC-1 is cleared — the Blueprint's own teaching notes flag MC-2
as especially likely to resurface under time pressure even after
correction, needing the prosecutor/defense mnemonic as a durable repair.

## Tutor Actions

From `../../teaching-actions/`: **Worked Example** (the ℤ-ordering
scope-collapse demonstration, the primary action for MC-1) →
**Representation Shift / Diagram** (the scope-dependency diagram,
the Blueprint's own most effective MC-1 repair tool) → **Contrast Pair**
(the negation-flip worked example, targeting MC-2). **What doesn't
fit**: a full formal treatment of quantifier elimination or model
theory — this developing-level concept only needs correct evaluation,
negation, and scope-dependency reading; deeper metalogical machinery
belongs to more advanced logic concepts.

## Voice Teaching Notes

Listen for "well it's just for all x and some y either way" applied to
two differently-ordered quantifier statements — this is MC-1's clearest
verbal signature. A learner who writes "∀x ¬P(x)" when asked to negate
"∀x P(x)" without flipping to ∃ is showing MC-2 directly. The
load-bearing sentence: "which quantifier comes FIRST determines whether
the second variable is allowed to change with the first, or has to stay
fixed for everyone."

## Assessment Signals

The Blueprint's own P41 entry diagnostic gate and P91 mastery gate
(pass criterion ⌈0.80×5⌉ = 4 of 5 items) are the concrete item bank —
not re-authored here. Diagnostic interpretation this entry adds: a
learner who correctly evaluates ∀x∃y vs. ∃y∀x on a familiar worked
example (MC-1 apparently cleared) but reverts to scope-collapse
reasoning on a fresh, unfamiliar predicate shows the repair has not yet
generalized — per the Blueprint's own teaching notes, MC-1 mastery must
be checked on NEW predicates, not just the practiced example, before
certifying.

## Tutor Recovery Strategy

Likeliest utterance: "isn't 'for all x there's a y' basically the same
as 'there's a y for all x'?" — the concept-specific smaller question:
"in the first version, can y change every time x changes? In the
second version, does ONE y have to work for every x at once?" reframes
the confusion from "these sound like the same two phrases reordered" to
"these describe two different dependency structures" — directly
isolating MC-1's scope-collapse using the Blueprint's own
prosecutor-style concrete framing.

## Memory Hooks

**Type**: concept (a scope- and dependency-reading skill: correctly
parsing which variable depends on which, independent of the specific
predicate). Review form: fresh nested-quantifier statements over varied
domains, evaluated and negated from scratch, never rote recall of the
ℤ-ordering example alone — per the Blueprint's own warning that MC-1
resurfaces under time pressure even after apparent correction.
Interleaving partners: `math.found.logical-connectives` (the De Morgan
pattern this concept's negation law directly extends) and, once
available, `math.found.quantifiers` and `math.found.proof` — this
concept's own direct KG unlocks.

## Transfer Connections

- **Near**: correctly evaluating and negating a fresh nested-quantifier
  statement over an explicitly stated domain.
- **Far**: recognizing the ∀/∃ dependency pattern in formal
  specification and program verification (e.g. "for every input there
  exists a valid output" vs. "there exists one output valid for every
  input").
- **Real-world**: recognizing when an everyday claim's meaning depends
  on quantifier order ("every team has a player who scored" vs. "one
  player scored for every team") and checking which is actually meant.
- **Expert transfer**: the learner, meeting an unfamiliar formal claim
  in any subject, automatically checks quantifier order, states the
  domain explicitly, and correctly negates nested quantifiers when
  asked to disprove or contrapose the claim.

## Cross-Subject Connections

None via KG `cross_links` (empty for this node, confirmed against the
Blueprint's own Component 7 GR-8 check). Not fabricated beyond what the
KG states.

## Blueprint References

`docs/curriculum/blueprints/math.found.predicate-logic.md` — Status
PACKAGE_READY (687 lines; validated 2026-07-12). This entry reuses by
reference: the full Misconception Registry (Component 2, MC-1–MC-3),
the scope-dependency diagram (Component 4, TA-A03), and the
prosecutor/defense negation mnemonic (Component 5, Repair Chain B-2).
Not restated beyond what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's two prerequisites, two-item unlocks list, and
empty cross-links all match the Blueprint's Component 0 exactly. Note
(not a defect, informational only): this concept's own MC-2 (negation-
flip-failure for quantifiers) is a structurally related but genuinely
distinct skill from `math.found.truth-table`'s De Morgan negation
misconception (Wave 5, same batch) — one concerns quantifier-negation
laws, the other propositional-connective negation — worth a future
cross-reference between the two entries' Transfer Connections sections,
not a duplication requiring resolution.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 5). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.

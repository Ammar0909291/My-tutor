# Variable — `math.found.variable`

## Identity

- **Concept ID**: `math.found.variable` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.abstraction`, `math.found.mathematical-
  notation` — a variable is an abstraction (a symbol standing in for a
  whole class of values, not one specific value) expressed through
  mathematical notation's conventions (letters as placeholders).
- **Unlocks** (from KG): `math.alg.expression`, `math.alg.equation`,
  `math.func.function-concept` — expressions and equations are built
  FROM variables; the function concept depends on variables that range
  over an input set and a dependent variable that ranges over an output
  set.
- **Cross-links** (from KG): `math.func.function-concept` — also listed
  as a direct unlock; the KG marks this as a genuine conceptual
  cross-reference, not merely a prerequisite edge (see Blueprint's
  P76_mode: Cross-link).
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 3

## Learning Objective

The learner can: explain that a variable is a symbol standing for a
value (or values) that can vary or is currently unknown, rather than a
fixed label for one particular number; recognize variables appearing
outside equations (in expressions, identities, and formulas); and
explain why the same variable can take on different values across
different contexts (a general formula) while still meaning one
specific, if temporarily unknown, value within a single equation being
solved.

## Core Understanding

A variable is not a name for "the unknown number we're trying to find"
in every context — it is a symbol that stands in for a value FROM A SET,
whose role (fixed unknown to solve for, freely ranging quantity, or
parameter) depends entirely on the surrounding mathematical context, not
on the symbol itself. The same letter `x` means "the one specific number
that makes this equation true" in `2x + 3 = 7`, but means "any number
you substitute" in the identity `(x + 1)^2 = x^2 + 2x + 1` (true for
every real x, not solved for a specific one) and means "a freely
ranging input" in the function `f(x) = x^2`. This is why "solve for x"
framing, useful as it is for equations, actively misleads learners the
moment they meet a variable in a formula, identity, or function.

## Mental Models

- **Beginner model — "a variable is just the name for the unknown
  number we're solving for"**: the learner treats every variable as a
  single hidden value waiting to be uncovered by solving an equation,
  which works for early equation-solving but breaks the moment a
  variable appears in an identity or formula with no "solving" involved.
  Shelf-life warning: this model is an intentional simplification that
  will need active revision, not a wrong start to be embarrassed about.
- **Intermediate model — "a variable's role depends on where it
  appears"**: the learner distinguishes an equation's unknown (one fixed
  value to find) from a formula's or identity's variable (any value from
  a set, ranging freely) based on context rather than assuming one
  universal role. Upgrade trigger: presented with the same letter used
  in an equation and then in an identity side by side.
- **Advanced model — "variables are placeholders for elements of a
  specified set, and different variables in the same expression can play
  structurally different roles"**: the learner recognizes, for instance,
  that in `f(x) = mx + b`, `x` is the free input, while `m` and `b` are
  parameters (fixed for a given function but variable across a family of
  functions) — a genuinely different role from `x`'s, despite all three
  being "variables." Upgrade trigger: comparing a single equation's
  unknown against a function family's parameters.
- **Expert model — "a variable is fully specified only by naming its
  domain (the set it ranges over) alongside the symbol"**: the learner
  understands that `x` alone is an incomplete specification — `x ∈ ℝ`,
  `x ∈ ℕ`, or `x ∈ {red, green, blue}` are different variables in
  substance despite sharing a symbol, directly connecting to
  `math.found.set-theory`'s notion of set membership as the rigorous
  backing for "what a variable can be."
- **Do not upgrade early**: a learner who has just stabilized the
  intermediate model (context determines role) should not be pushed
  into the expert model's domain-specification rigor before they can
  reliably distinguish equation-unknowns from formula-variables in
  ordinary contexts — the Blueprint's own sequence addresses
  VARIABLE-AS-LABEL (MC-1) before EQUATION-ONLY (MC-2) before
  SINGLE-VALUE (MC-3).

## Why Students Fail

The dominant failure, per the Blueprint's own MAMR-foundational
misconception, is a direct consequence of how variables are first
introduced: nearly all early exposure to variables happens through
"solve for x" equation-style tasks, where treating `x` as a fixed
label for one specific hidden number is not just harmless but
functionally correct. The failure surfaces only later, when the learner
meets a variable that is NOT playing that role (an identity, a formula,
a function's input) and continues applying the "find the one hidden
number" framing where it no longer fits.

## Misconceptions

Reused from the Blueprint's Component 2 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "VARIABLE-AS-LABEL" (Type 1, overgeneralization from
  equation-solving's genuinely correct "fixed unknown" framing, extended
  to every context a variable appears in)**: MAMR-foundational. Trigger:
  "x is just a name for the unknown... it doesn't matter what set x
  comes from." Full trigger/root-cause/error-pattern: Blueprint
  Component 2, MC-1.
- **MC-2 — "EQUATION-ONLY" (Type 1, overgeneralization — the learner's
  entire exposure to variables has been equation-shaped, so "variables
  only appear in equations" seems like an exhaustive rule rather than
  one common context among several)**: Trigger: "Variables only appear
  in equations... they don't appear in identities or formulas." Full
  content: Blueprint Component 2, MC-2.
- **MC-3 — "SINGLE-VALUE" (Type 1, overgeneralization — carrying the
  fixed-unknown role of an equation's variable into contexts, like a
  formula applied across multiple problems, where the same symbol takes
  different values each time)**: Trigger: "x = 5 means x always refers
  to 5 in this problem." Full content: Blueprint Component 2, MC-3.

## Analogies

- **Best analogy — a labeled parking space, not a specific car**: a
  parking space marked "Reserved" holds whichever car is assigned to it
  today — the label names a ROLE, not one permanent occupant. A variable
  names a role a value can occupy, not one permanent value. Breaking
  point: a parking space's occupant changes over TIME; a variable's
  value is fixed by the mathematical context (which equation, which
  substitution) rather than by any real-world clock.
- **Alternative — a pronoun in a sentence**: "she" can refer to
  different people depending on context, without "she" itself having one
  fixed referent — much like `x` can refer to different values depending
  on which equation or formula it appears in. Breaking point: pronouns
  are resolved by conversational context (who was just mentioned);
  variables are resolved by mathematical structure (what set they range
  over, what role they play in the surrounding expression).
- **ANTI-ANALOGY — do NOT say "a variable is just a box waiting to be
  filled with one number"**: "one number" reintroduces exactly the
  SINGLE-VALUE framing (MC-3) — a variable in a formula or function is a
  box that gets refilled with a DIFFERENT number every time it's used,
  not a box filled once and sealed.

## Demonstrations

- **Same-letter, different-role demonstration**: showing `x` used in an
  equation (`2x + 3 = 7`, one fixed solution), an identity (`(x+1)^2 =
  x^2 + 2x + 1`, true for every real x), and a function (`f(x) = x^2`,
  x ranges freely over the domain) side by side — directly surfacing
  MC-1 and MC-2.
- **Repeated-substitution demonstration**: applying the same formula
  (e.g. area `A = πr²`) to several different radius values in sequence,
  showing `r` taking on a new value each time — directly targets MC-3.
- **Parameter-vs-variable sorting**: in `f(x) = mx + b`, identifying
  which symbol is the free input and which are fixed-per-function
  parameters — extends the advanced mental model concretely.

## Discovery Questions

**Need** — given the identity `(x+1)^2 = x^2 + 2x + 1` and asked "solve
for x," the learner discovers there is nothing to solve — it's true for
every value tried. **Playground** — the learner substitutes several
different values of x into both sides and observes the identity holding
every time. **Invention** — the learner proposes that this `x` might be
playing a different role than the `x` in an equation they solved
earlier. **Collision** — shown the same formula (e.g. area of a circle)
applied to three different radius values, directly confronting the
SINGLE-VALUE assumption that x = 5 fixes x permanently. **Formalization**
— naming the distinction explicitly: an equation's variable is a fixed
unknown to solve for; a formula's or identity's variable ranges freely
over its domain. **Compression** — sorting a fresh mixed set of
equations, identities, and formulas by what role their variables play.

## Teaching Sequence

MC-1 (variable-as-label) is repaired first, per the Blueprint's own
MAMR ordering, since a learner who thinks the SYMBOL itself carries a
single fixed meaning has no framework for recognizing that role depends
on context — the repair for MC-1 (recognizing role-dependence) is a
direct prerequisite for correctly diagnosing MC-2 (equation-only) and
MC-3 (single-value), both of which are context-role errors.

## Tutor Actions

From `../../teaching-actions/`: **Demonstration** (the same-letter,
different-role comparison, the primary action for this concept) →
**Worked Example** (the repeated-substitution formula task, targeting
MC-3) → **Classification/Sorting** (parameter-vs-variable sorting,
extending toward the advanced model). **What doesn't fit**: introducing
formal domain notation (`x ∈ ℝ`) as a required part of this concept's
mastery — that rigor belongs to the expert model and to
`math.found.set-theory`, not to this foundational entry point.

## Voice Teaching Notes

Listen for "but what IS x" demanding a single numeric answer when shown
an identity or formula — this is MC-1/MC-2's clearest verbal signature.
A learner who says "so does x change back to 5 next time?" after using
a formula with a new substitution is showing MC-3 directly. The
load-bearing sentence: "what x means depends on where it's standing, not
on the letter itself."

## Assessment Signals

The Blueprint's own detection probes and mastery gate are the concrete
item bank — not re-authored here. Diagnostic interpretation this entry
adds: a learner who correctly identifies an identity's variable as
"ranging freely" (MC-1/MC-2 cleared) but still expects a formula's
variable to "lock in" after one substitution (MC-3 still latent) shows
that recognizing multiple contexts for variables and recognizing
REPEATED use of the same variable across separate applications are
separable skills — both must be checked independently.

## Tutor Recovery Strategy

Likeliest utterance: "wait, I thought x was 5 — why is it something else
now?" — the concept-specific smaller question: "was that x part of the
SAME equation, or are we using the SAME LETTER in a new problem?"
reframes the confusion from "x changed its value" (which sounds
inconsistent) to "this is a fresh use of a reusable symbol" (which
resolves the apparent contradiction) — directly isolating the
SINGLE-VALUE error MC-3 names.

## Memory Hooks

**Type**: concept (a role-recognition skill: what a variable is doing in
a given context, independent of the specific letter used). Review form:
sorting fresh mixed equations/identities/formulas by variable role,
never rote recall of "x means the unknown." Interleaving partners:
`math.found.proposition` (both concepts require checking WHETHER a
symbol is bound/fixed vs. free/ranging) and, once available,
`math.alg.expression`/`math.alg.equation` — practicing variable-role
recognition across all of these strengthens the same underlying skill.

## Transfer Connections

- **Near**: identifying whether a given variable, in a new expression,
  is a fixed unknown, a freely ranging quantity, or a parameter.
- **Far**: recognizing placeholder/role-based symbols in other formal
  systems (a spreadsheet cell reference reused across different rows, a
  function parameter in programming that takes a new value on each
  call).
- **Real-world**: recognizing when a word or symbol (like a job title,
  "the president") names a ROLE that different people occupy over time,
  rather than one fixed individual.
- **Expert transfer**: the learner, meeting an unfamiliar formula or
  function, spontaneously asks "what set does this variable range over,
  and is it fixed or free here?" before attempting to use it.

## Cross-Subject Connections

None via KG `cross_links` beyond the in-subject `math.func.function-
concept` link already noted in Identity above (which the KG encodes as
a same-subject cross-link, not a cross-subject one). Not fabricated
beyond what the KG states.

## Blueprint References

`docs/curriculum/blueprints/math.found.variable.md` — Status verified
present (380 lines; P76_mode: Cross-link noted for the
`math.func.function-concept` edge). This entry reuses by reference: the
full Misconception Registry (Component 2, MC-1–MC-3). Not restated
beyond what's needed to cite it.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

None found. The KG's two prerequisites, three-item unlocks list, and the
`math.func.function-concept` cross-link all match the Blueprint's
Component 0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program,
  math.found domain, Wave 3). Anchored to the live KG node and the
  existing Blueprint; all 3 misconceptions reused by reference.

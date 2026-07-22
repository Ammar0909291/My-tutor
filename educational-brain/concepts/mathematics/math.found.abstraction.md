# Abstraction — `math.found.abstraction`

## Identity

- **Concept ID**: `math.found.abstraction` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations
- **Prerequisites**: `math.found.mathematical-thinking` — the load-bearing
  part is the general disposition to look for structure rather than just
  compute an answer; a learner needs to already accept that mathematics
  is a process of noticing, not just recall, before "ignore the surface,
  keep the structure" will make sense as a specific instance of that
  process.
- **Unlocks** (from KG/Blueprint): `math.found.variable`,
  `math.found.set-theory` — variables are literally abstraction's
  notation (a symbol standing for "any instance"), and set theory is
  abstraction applied to the very idea of a collection.
- **Difficulty**: foundational · **Bloom**: analyze · **Mastery
  threshold**: 0.75 · **Est. hours**: 4

## Learning Objective

The learner can: identify what has been abstracted away (the irrelevant
surface detail) versus kept (the essential structure) in a given
example; apply the same abstract rule to a new, structurally identical
but surface-different situation; and explain WHY abstraction is useful
(one proof covers infinitely many cases). A learner who can recite
"abstraction means ignoring details" without being able to say WHICH
details, on a concrete example, has not achieved mastery.

## Core Understanding

Abstraction is the deliberate act of identifying which properties of a
situation are essential to a mathematical structure and which are
incidental surface detail, then discarding the surface detail to state a
rule that holds for every instance sharing the essential properties.
"3 apples + 5 apples," "3 km + 5 km," and "3 hours + 5 hours" all reduce
to the same abstract fact, 3 + 5 = 8, because what is being counted
(apples, kilometers, hours) is irrelevant to the arithmetic; what matters
is only that two quantities of the same kind are being combined.
Abstraction is not vagueness — a correctly abstracted rule (a + b = b + a
for all real a, b) is exactly as precise as any single numeric instance
of it; it is simply true of more cases at once.

## Mental Models

- **Beginner model — "the same thing, different clothes"**: many
  different-looking situations turn out to be the same underlying
  structure wearing different surface details. Runnable via the
  Blueprint's own apples/km/hours example. Shelf-life warning: "this
  works for arithmetic now — soon you'll see the SAME structure hiding
  in shapes, and later in sets, and later still in rules that have
  nothing to do with numbers at all."
- **Intermediate model — "structure shared across domains"**: the
  learner can recognize the same abstract structure (e.g. "3 objects,
  every pair connected") appearing in geometry, social networks, and
  computing simultaneously (Blueprint TA-A02). Upgrade trigger: the
  first cross-domain pairing task.
- **Advanced model — "a deliberate 4-step process"**: observe multiple
  instances → identify what's essential → identify what varies →
  state the general rule using only essential properties. The learner
  can run this process ON DEMAND on unfamiliar instance sets, not just
  recognize it after the fact.
- **Expert model — "abstraction is what makes mathematics economical and
  transferable"**: the learner understands abstraction as mathematics'
  central labor-saving device — one abstract proof replaces infinitely
  many case-by-case verifications — and actively seeks the most general
  correct statement of any new pattern encountered.
- **Do not upgrade early**: a learner who cannot yet separate essential
  from irrelevant detail in a single concrete case (the beginner model)
  should not be pushed into the formal 4-step process — the Blueprint's
  Protocol A moves concrete → pictorial → abstract → analysis in that
  strict order for exactly this reason.

## Why Students Fail

Abstraction asks a learner to actively DISCARD information that feels
relevant (what the numbers count, what shape the objects are) — this
runs against an intuition that more detail is always more correct or
more rigorous. Without an explicit reason to discard detail, the learner
either clings to the surface (treating superficially different problems
as unrelated) or, having heard the word "abstract" used to mean "vague"
in ordinary English, concludes that mathematical abstraction is a
deliberate loss of precision — precisely backwards from the truth.

## Misconceptions

Reused from the Blueprint's Component 3 Misconception Registry (MC-1
through MC-3) by reference, with birth-type classification added:

- **MC-1 — "Abstraction = vagueness" (Type 3, language contamination)**:
  the everyday sense of "abstract" (vague, impractical, hard to pin
  down) collides directly with the mathematical sense (general and
  precise). MAMR-foundational — must be repaired before MC-2/MC-3 land,
  since a learner who believes abstraction sacrifices rigor will not
  value it enough to engage with the other repairs. Full conflict
  evidence / bridge / discrimination pairs: Blueprint Component 3/TA-C02,
  MC-1.
- **MC-2 — "Abstraction is only for advanced math" (Type 1,
  overgeneralization from the word's association with university-level
  courses named "Abstract Algebra")**: full content in Blueprint TA-C03.
- **MC-3 — "An abstract rule doesn't transfer to a new surface context"
  (Type 6, analogy/prior-experience overextension — the learner has
  correctly learned that SOME rules are context-bound and
  overextends that caution to rules that are genuinely universal)**:
  full content in Blueprint TA-C04.

## Analogies

- **Best analogy — three different-looking situations, one arithmetic
  fact** (apples/km/hours, Blueprint TA-A01): the objects vary, the
  structure (3+5=8) doesn't. Breaking point: at the operator level,
  addition isn't always defined the same way across contexts (e.g. you
  can't literally add "3 apples + 5 oranges" as one quantity without a
  common unit) — useful for introducing abstraction, not for teaching
  when it fails.
- **Alternative — K₃ across geometry, social networks, and computing**
  (Blueprint TA-A02: a triangle, a 3-person committee, a 3-bit
  comparison — all "3 nodes, every pair connected"): stronger for
  showing abstraction crossing DOMAINS, not just contexts within
  arithmetic. Breaking point: requires the learner to already accept
  that a diagram can represent non-geometric things, which is itself a
  small abstraction leap.
- **ANTI-ANALOGY — do NOT say "abstraction is like zooming out" without
  qualification**: "zooming out" implies losing resolution/detail
  uniformly, which reinforces MC-1 (abstraction = vagueness/loss of
  precision) rather than the correct picture (KEEPING essential detail
  with full precision while discarding only the irrelevant kind). If
  used at all, must be immediately qualified: "zooming out on WHICH
  details are essential, not blurring everything."

## Demonstrations

- **Physical/concrete**: the Blueprint's dot-shape-triangle rows (4
  circles + 2 circles vs. 4 squares + 2 squares vs. 4 triangles + 2
  triangles) — same count structure, different shape, predict-first.
- **Pictorial cross-domain**: the K₃ triangle/committee/network diagram
  set (Blueprint TA-A02).
- **Discrimination demonstration**: the Blueprint's TA-A04 "what would
  math look like without abstraction" contrast (memorizing every
  polygon's side count individually vs. one diagonal-count formula for
  all polygons) — makes the economy argument concrete.

## Discovery Questions

The Blueprint's TA-A01→TA-A03 sequence is a genuine discovery design:
**Need** — "what do 3 apples+5 apples, 3 km+5 km, and 3 hours+5 hours all
have in common?" **Playground** — the learner examines the three
situations side by side. **Invention** — the learner proposes "you add"
as the shared operation. **Collision** — pushed further with the K₃
cross-domain set, where the shared structure is far less obvious than
shared arithmetic, forcing a more general notion of "essential vs.
irrelevant" than arithmetic alone would produce. **Formalization** — the
explicit 4-step abstraction process (Blueprint TA-A03). **Compression** —
immediate reapplication to associativity, (a+b)+c=a+(b+c).

## Teaching Sequence

Concrete-before-abstract is the governing logic, and within that, the
Blueprint enforces WITHIN-domain concreteness before CROSS-domain
transfer: the apples/km/hours arithmetic case (TA-A01) must land before
the K₃ cross-domain diagram set (TA-A02), because a learner who cannot
yet separate essential from irrelevant detail within one familiar domain
(arithmetic) has no chance of doing so across unfamiliar domains
(geometry/social networks/computing) simultaneously. Only once both
concrete stages are secure does the Blueprint state the formal 4-step
process (TA-A03) — naming the process before either concrete experience
would let a learner recite the steps without being able to execute them.

## Tutor Actions

From `../../teaching-actions/`, in the Blueprint's own Protocol A order:
**Demonstration** (apples/km/hours, then the dot-shape rows) →
**Classification/Sorting** (essential vs. irrelevant property
identification) → **Worked Example** (the 4-step process applied to
2×3=6, 3×2=6, etc.) → **Prediction** (attached throughout, per every
P49 checkpoint). **What doesn't fit**: pure verbal/TELL-family definition
of abstraction before any concrete instance — the Blueprint never states
the 4-step process before at least two worked concrete cases have been
seen (Component 4 TA-A01/A02 precede TA-A03's formalization).

## Voice Teaching Notes

Listen for the word "vague" or "fuzzy" applied to any abstract statement
— this is MC-1's verbal signature and a stronger signal than any formal
probe. A learner who, unprompted, says an abstract rule is "less
accurate" than a specific example is showing MC-1 even before the
formal P75 probe runs. The load-bearing sentence: "abstract rules are
EQUALLY precise — just true for more cases at once" — slow, and returned
to whenever MC-1 resurfaces mid-repair of MC-2 or MC-3.

## Assessment Signals

The Blueprint's Component 3/6 checkpoints (P49 throughout) and the
5-probe mastery gate (P77→P76→P75→P74→P78, Component 4/TA-A05) are the
concrete item bank — not re-authored here. Diagnostic interpretation
this entry adds: on the P74 application probe (perform 4-step
abstraction on a new instance set), an answer that identifies the
correct pattern but stops at step 3 (fails to STATE the general rule in
step 4) signals a learner who can perform steps 1-3 of the process but
has not yet internalized that abstraction's whole point is producing a
reusable statement — route back to TA-A03's step-4 emphasis, not to a
misconception repair (no MC signal fired).

## Tutor Recovery Strategy

Likeliest utterance for a learner stuck on "what's essential here": the
Blueprint's own scaffold — "does it matter whether a=3,b=5 or
a=100,b=7? what changes?" — shrinks the question to a single concrete
comparison rather than asking for the abstract property directly. For a
learner who has cleared MC-1 but still resists calling something
"precise" — return to the n²≥0 example (Blueprint TA-C02's P49
checkpoint): "is there any real number for which n²<0?" — a concrete,
checkable question that cannot be answered with vague hedging.

## Memory Hooks

**Type**: concept, with an embedded procedural micro-skill (running the
4-step process on demand). Review form: fresh instance sets at
increasing surface-dissimilarity (arithmetic → geometric → cross-domain
→ real-world), matching the Blueprint's own P76 transfer probes across
sessions (spreadsheets, music chords, floor plans). Interleaving
partners: `math.found.pattern-recognition` (pattern recognition finds
the regularity; abstraction states what's essential about it — teaching
them close together risks the learner conflating "I noticed a pattern"
with "I abstracted a rule," so mixed practice items that require naming
which of the two just happened are valuable).

## Transfer Connections

- **Near**: a fresh set of instances requiring the same 4-step process
  within arithmetic or a closely related domain.
- **Far**: cross-domain structural matches (K₃ across geometry, social
  networks, computing) and the Blueprint's own real-world transfer set —
  spreadsheet SUM formulas, floor plans as abstracted buildings, contract
  clauses applying to "any party."
- **Real-world**: any general rule or formula the learner already uses
  (a recipe scaled to any serving size, a unit-price comparison) examined
  for what it abstracts away.
- **Expert transfer**: the learner, on meeting a new formula or rule
  anywhere, spontaneously asks "what's essential here, and what would
  change without affecting the result?" — evidence the 4-step process has
  become a standing habit rather than a classroom exercise.

## Cross-Subject Connections

Weak-but-real within mathematics via KG `cross_links`:
`math.abst.algebraic-structure` — the Blueprint's own Component 6 names
this explicitly: algebraic structures (groups, rings, fields) are the
formal study of abstraction, where the process taught here becomes an
axiom system. Outside mathematics, the Blueprint's P76 probes reach into
programming (functions as abstraction), architecture (floor plans as
2D-abstracted-3D), and law (contract clauses applying to "any party") —
none of these are KG-encoded cross-subject links; recorded as
Blueprint-authored transfer content, not fabricated new connections.

## Blueprint References

`docs/curriculum/blueprints/math.found.abstraction.md` — Status
PACKAGE_READY, all 20 V-checks PASS. This entry reuses by reference: the
full Student State Protocol library (Component 4, Protocols A-D), the
Misconception Registry (Component 3, MC-1–MC-3), the mastery gates in
each Protocol's final TA, and the Cross-Link Bridge (Component 6).

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept as of this entry's authoring — this entry does
not create any.

## Curriculum Feedback

None found. The KG's single prerequisite (`math.found.mathematical-
thinking`) and its two-item unlocks list match the Blueprint's Component
0 exactly.

## Version History

- 2026-07-22 — initial authoring (Curriculum Completion Program, math.found
  domain batch 1). Anchored to the live KG node and the existing
  PACKAGE_READY Blueprint; all 3 misconceptions reused by reference from
  the Blueprint's Misconception Registry.

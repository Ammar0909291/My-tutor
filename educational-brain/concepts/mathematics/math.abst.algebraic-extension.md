# math.abst.algebraic-extension

## Identity
- **KG id**: `math.abst.algebraic-extension`
- **Domain**: math.abst
- **Requires**: `math.abst.field-extension`
- **Unlocks**: `math.abst.galois-theory`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Define the MINIMAL POLYNOMIAL $m_\alpha(x)$ of an algebraic element $\alpha$ over $F$ — the
MONIC, IRREDUCIBLE polynomial of LEAST DEGREE satisfied by $\alpha$ — verifying all three
conditions rather than accepting any polynomial merely having $\alpha$ as a root; explain WHY
$[F(\alpha):F]=\deg(m_\alpha)$ via the isomorphism $F(\alpha)\cong F[x]/(m_\alpha(x))$; and
compute $[F(\alpha):F]$ by finding $\alpha$'s TRUE minimal polynomial, never assuming the degree
of whichever equation first introduced $\alpha$ is automatically minimal.

## Core Understanding
THE MINIMAL POLYNOMIAL REQUIRES THREE CONDITIONS AT ONCE: `math.abst.field-extension` already
established that $\alpha$ is algebraic over $F$ if it satisfies SOME nonzero polynomial with
$F$-coefficients — but MANY different polynomials can have $\alpha$ as a root. THE minimal
polynomial $m_\alpha(x)$ is the ONE specific polynomial satisfying ALL THREE conditions
simultaneously: MONIC (leading coefficient 1), IRREDUCIBLE over $F$ (cannot be factored into
lower-degree polynomials over $F$), and of LEAST DEGREE among all polynomials $\alpha$ satisfies.

THE ISOMORPHISM $F(\alpha)\cong F[x]/(m_\alpha(x))$ EXPLAINS THE DEGREE FORMULA DIRECTLY: every
polynomial in $x$ can be divided by $m_\alpha(x)$, leaving a remainder of degree strictly less
than $\deg(m_\alpha)$; substituting $\alpha$ for $x$, this means every element of $F(\alpha)$ is
UNIQUELY $c_0+c_1\alpha+\cdots+c_{d-1}\alpha^{d-1}$ where $d=\deg(m_\alpha)$ — a basis of size
$d$ falls out DIRECTLY, without needing to separately hand-verify linear independence the way
`math.abst.field-extension`'s own examples did.

FINDING THE TRUE MINIMAL POLYNOMIAL SOMETIMES REQUIRES LOOKING PAST THE "OBVIOUS" DEFINING
EQUATION: an element $\alpha$ may first be introduced via some polynomial equation it satisfies,
but that equation need NOT itself be irreducible — a lower-degree irreducible FACTOR may be the
genuine minimal polynomial. Always fully factor (or otherwise verify irreducibility of) the
defining equation before declaring its degree to be $[F(\alpha):F]$.

## Mental Models
- **"The minimal polynomial is the UNIQUE candidate surviving three simultaneous filters —
  monic, irreducible, least degree — not just any polynomial $\alpha$ happens to satisfy."**
- **"The degree $[F(\alpha):F]$ is READ OFF $\deg(m_\alpha)$ directly, via the isomorphism — no
  separate basis-verification required once $m_\alpha$ is genuinely found."**

## Why Students Fail

### MC-1: MINIMAL-POLYNOMIAL-ANY-SATISFYING-POLYNOMIAL
- **Surface form**: believes ANY polynomial with $\alpha$ as a root qualifies as "the" minimal
  polynomial, missing the required monic, irreducible, and least-degree conditions.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  `math.abst.field-extension`'s own "algebraic means SOME polynomial has $\alpha$ as a root"
  definition is over-applied directly onto the minimal polynomial, skipping its additional three
  simultaneous requirements).
- **Repair**: re-walk a multi-candidate elimination directly, re-anchoring on "monic AND
  irreducible AND least degree, all three, simultaneously."

### MC-2: DEGREE-REQUIRES-EXPLICIT-BASIS-VERIFICATION
- **Surface form**: believes $[F(\alpha):F]$ must ALWAYS be computed by separately constructing
  and hand-verifying a basis from scratch, missing that it can be read directly off
  $\deg(m_\alpha)$ once the minimal polynomial is known.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Moderate severity —
  `math.abst.field-extension`'s own worked examples performed hand-verification directly, so the
  isomorphism-based shortcut this concept introduces is not yet the learner's default reflex).
- **Repair**: re-walk the isomorphism-based reduction argument directly, re-anchoring on "the
  degree IS $\deg(m_\alpha)$, directly, once the minimal polynomial is found."

### MC-3: MINIMAL-POLYNOMIAL-DEGREE-ASSUMED-FROM-DEFINING-EQUATION
- **Surface form**: believes the degree of WHICHEVER equation first introduced $\alpha$ is
  automatically the minimal polynomial's degree, without checking irreducibility.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  the FIRST equation encountered for $\alpha$ is often, by convenient coincidence, already
  irreducible in introductory examples, so the irreducibility-checking STEP itself goes
  unpracticed until a genuinely reducible defining equation is encountered).
- **Repair**: re-factor the specific defining equation directly, re-anchoring on "always verify
  irreducibility before trusting a defining equation's degree."

## Misconceptions

### MC-1: MINIMAL-POLYNOMIAL-ANY-SATISFYING-POLYNOMIAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: DEGREE-REQUIRES-EXPLICIT-BASIS-VERIFICATION
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: MINIMAL-POLYNOMIAL-DEGREE-ASSUMED-FROM-DEFINING-EQUATION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Finding $m_\alpha$ is like finding the SIMPLEST correct description of a shape — not just
  any description that happens to fit, but the one with no extra factors and no unnecessary
  complexity."**
- **Anti-analogy**: a HIGHER-degree equation $\alpha$ satisfies does NOT automatically mean
  $[F(\alpha):F]$ is that higher degree — the equation may factor, revealing a genuinely smaller
  minimal polynomial.

## Demonstrations
- **Demonstration 1 (targets LO1/MC-1)**: for $\alpha=\sqrt2$ over $\mathbb Q$, three candidates:
  $3x^2-6$ (has $\sqrt2$ as a root, but NOT monic — reject); $(x^2-2)(x-1)$ (monic, has $\sqrt2$
  as a root, but REDUCIBLE and not least degree — reject); $x^2-2$ (monic, irreducible over
  $\mathbb Q$, least degree) — the unique survivor: $m_{\sqrt2}(x)=x^2-2$.
- **Demonstration 2 (targets LO2/MC-2)**: for $m_{\sqrt2}(x)=x^2-2$, the isomorphism
  $\mathbb Q(\sqrt2)\cong\mathbb Q[x]/(x^2-2)$ means every coset reduces to degree $<2$ (since
  $x^2\equiv2$), i.e. every element of $\mathbb Q(\sqrt2)$ is $a+b\sqrt2$ — giving
  $[\mathbb Q(\sqrt2):\mathbb Q]=\deg(x^2-2)=2$ directly, with no separate basis check.
- **Demonstration 3 (targets LO3/MC-3)**: $\alpha=i$ satisfies the "obvious" $x^4-1=0$ (degree 4)
  — but $x^4-1=(x-1)(x+1)(x^2+1)$ is REDUCIBLE, so NOT minimal. The genuine irreducible factor
  $x^2+1$ (monic, $i^2+1=0$, no rational root) IS $m_i(x)$, giving $[\mathbb Q(i):\mathbb Q]=2$,
  not 4 — confirming (and, unlike `math.abst.field-extension`'s own assertion, now actually
  DERIVING) that $\sqrt[3]2$ satisfying the irreducible $x^3-2$ (Eisenstein at $p=2$) gives
  $[\mathbb Q(\sqrt[3]2):\mathbb Q]=3$ exactly.

## Discovery Questions
1. "Does ANY polynomial with $\alpha$ as a root qualify as $\alpha$'s minimal polynomial, or must
   it satisfy additional conditions?"
2. "Once $m_\alpha$'s degree is known, must you still separately verify a basis, or does the
   degree follow directly?"
3. "If $\alpha$ is first introduced via a degree-4 equation, is $[F(\alpha):F]$ automatically 4?"

## Teaching Sequence
1. **Anchor**: connect to `math.abst.field-extension`'s own degree and algebraic-vs-
   transcendental machinery, framing the minimal polynomial as the concrete object that PRODUCES
   the degree.
2. **Contrast pair**: Demonstration 1's three-candidate elimination, isolating MC-1 by requiring
   all three conditions simultaneously.
3. **Representation shift**: Demonstration 2's isomorphism-based reduction, isolating MC-2 by
   deriving the basis directly from $\deg(m_\alpha)$.
4. **Conflict evidence**: Demonstration 3's $i$/$x^4-1$ factorization, isolating MC-3 by
   revealing a lower true degree than the "obvious" equation suggested.
5. **Mastery gate**: require a correct three-condition verification for a new minimal
   polynomial, a correct degree derivation via the isomorphism, and a correct factorization
   revealing a true minimal polynomial from a reducible defining equation, at the Blueprint's own
   stated MAMR of 4/5 (⌈0.75×5⌉).

## Tutor Actions
- Never accept a non-monic or reducible polynomial as "the" minimal polynomial — require all
  three conditions verified explicitly.
- Never accept a defining equation's raw degree as $[F(\alpha):F]$ without an irreducibility
  check.

## Voice Teaching Notes
- Say "monic, irreducible, AND least degree — does this candidate pass all three?" whenever a
  minimal polynomial is proposed.
- When a degree is claimed from a defining equation, ask "have you confirmed that equation is
  actually irreducible?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the minimal polynomial among several
  candidates, checking all three conditions.
- **Rung 2 (application)**: learner correctly derives $[F(\alpha):F]$ directly from
  $\deg(m_\alpha)$ via the isomorphism, without separate basis verification.
- **Rung 3 (transfer)**: learner correctly determines the TRUE minimal polynomial and resulting
  degree for a NEW element, verifying irreducibility rather than assuming a defining equation's
  surface degree.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the multi-candidate elimination directly for a fresh element.
- If MC-2 recurs, re-walk the isomorphism-based reduction argument directly.
- If MC-3 recurs, re-factor the specific defining equation directly, revealing the true minimal
  polynomial.

## Memory Hooks
- "Monic, irreducible, least degree — all three, every time."
- "The degree IS $\deg(m_\alpha)$ — no separate basis hunt needed."
- "Check irreducibility before trusting any defining equation's degree."

## Transfer Connections
- `math.abst.field-extension` (already authored, this campaign, Batch 91): supplies the degree
  $[K:F]$ definition and algebraic-vs-transcendental distinction this concept's own minimal
  polynomial machinery builds directly on top of, and whose own transfer probe's $\sqrt[3]2$
  cube-doubling claim this concept's Demonstration 3 now actually derives.
- `math.abst.galois-theory` (not yet authored): the next concept in the chain, using minimal
  polynomials and algebraic extensions as its foundational building blocks.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.abst.algebraic-extension.md`, reused by
  reference for its $\sqrt2$/$x^2-2$ three-candidate elimination, its isomorphism-based degree
  derivation, its $i$/$x^4-1$ factorization example, and its three-misconception registry
  (severity levels adopted directly as declared; birth types independently classified since this
  Blueprint states Description but not a formal Type label).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, applying the
  minimal-polynomial framework to $\alpha=\sqrt2+\sqrt3$ (satisfying the given irreducible
  quartic $x^4-10x^2+1$), and diagnosing a colleague's flawed additive-degree reasoning.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.abst.field-extension`, unlocks `math.abst.galois-theory`, cross_links none,
  expert/apply, mastery_threshold 0.75, estimated_hours 5) was directly verified against the live
  KG and matches exactly. The Blueprint's own correctly-declared independence P76 mode
  (cross_links empty in KG) required no correction.

## Version History
- 2026-09-14 (Batch 92): authored. Fourth entry this batch. Companion batch concepts:
  `math.abst.burnside-lemma`, `math.abst.sylow-theorems`, `math.abst.pid`. All 4 concepts this
  batch are math.abst, closing the domain's entire post-Batch-91 ready frontier — `math.abst`
  moves 29/37 → **33/37** this batch.

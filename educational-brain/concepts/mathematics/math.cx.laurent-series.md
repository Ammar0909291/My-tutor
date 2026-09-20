# math.cx.laurent-series

## Identity
- **KG id**: `math.cx.laurent-series`
- **Domain**: math.cx
- **Requires**: `math.cx.singularities`, `math.cx.power-series-cx`
- **Unlocks**: `math.cx.residue-theorem`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Recognize the PRINCIPAL PART (negative powers) as the ONLY genuinely new ingredient beyond an
ordinary power series — NEVER an unrelated new object; compute Laurent coefficients by ALGEBRAIC
SUBSTITUTION of known series — NEVER always the contour-integral formula directly; and classify
singularities by the principal part's TERM COUNT (zero/finite/infinite) — NEVER confusing a
finite-but-multi-term principal part with an essential singularity.

## Core Understanding
THE PRINCIPAL PART IS THE ONLY GENUINELY NEW INGREDIENT — NEVER AN UNRELATED NEW OBJECT: for
$f(z)=\sin z/z$ at $z_0=0$: substituting $\sin z=z-z^3/3!+z^5/5!-\cdots$ and dividing by $z$ gives
$1-z^2/3!+z^4/5!-\cdots$ — a series with NO negative-power terms at all. This IS literally an
ordinary power series; the analytic part ($n\ge0$) behaves EXACTLY like one, radius-of-convergence
machinery included. Believing a Laurent series requires entirely new manipulation techniques
unrelated to ordinary power series is WRONG — only allowing negative powers (the principal part)
is new; everything else carries over unchanged.

LAURENT COEFFICIENTS COME FROM ALGEBRAIC SUBSTITUTION — NEVER ALWAYS THE CONTOUR INTEGRAL: for
$f(z)=e^{1/z}$ at $z_0=0$: substituting $w=1/z$ into the KNOWN series $e^w=\sum_{n=0}^\infty
w^n/n!$ gives $e^{1/z}=1+1/z+1/(2z^2)+1/(6z^3)+\cdots$ DIRECTLY — no contour integral
$a_n=\frac1{2\pi i}\oint_Cf(z)/(z-z_0)^{n+1}dz$ was ever evaluated. Believing every Laurent
coefficient must be computed by directly evaluating the contour-integral formula is WRONG — that
formula is the DEFINITION guaranteeing uniqueness, but algebraic substitution of familiar series
(geometric, Taylor) is the standard, far faster practical technique.

A FINITE PRINCIPAL PART OF ANY LENGTH MEANS A POLE — NEVER ESSENTIAL: for $f(z)=1/z^2$: the
Laurent series is the single term $z^{-2}$ — principal part $\{z^{-2}\}$, FINITELY many terms
(just one), most negative exponent $-2$, classified as a POLE of order 2. Contrast $e^{1/z}$'s
principal part $\{z^{-1},z^{-2},z^{-3},\ldots\}$ — INFINITELY many nonzero terms, classified
essential. Believing a principal part with several nonzero terms (but still finitely many) could
indicate an essential singularity is WRONG — ANY finite principal part, regardless of how many
terms it has, ALWAYS means a pole; only a genuinely INFINITE principal part means essential.

## Mental Models
- **"Everything about an ordinary power series carries over unchanged — the only new idea is
  allowing negative powers, needed to describe behavior right at the singularity itself."**
- **"Algebra first, contour integral only when forced — known-series substitution is the standard
  computational tool; the integral formula is the underlying definition, rarely used directly."**
- **"Count the negative-power terms: zero means removable, finitely many (any count) means pole,
  infinitely many means essential — never confuse 'several terms' with 'essential'."**

## Why Students Fail

### MC-1: LAURENT-SERIES-AS-UNRELATED-NEW-OBJECT
- **Surface form**: believes a Laurent series requires entirely new manipulation techniques
  unrelated to ordinary power series, missing that the analytic part behaves identically and only
  negative powers are new.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  unfamiliar $\sum_{n=-\infty}^\infty$ notation looks like a wholly different mathematical object).
- **Repair**: re-walk the $\sin z/z$ derivation showing its principal part is empty.

### MC-2: FINITE-PRINCIPAL-PART-MISCLASSIFIED-AS-ESSENTIAL
- **Surface form**: believes a principal part with several nonzero terms (but finitely many) could
  indicate an essential singularity, missing that ANY finite principal part always means a pole.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — "several terms"
  intuitively feels closer to "infinitely many" than to a single-term pole).
- **Repair**: re-walk the finite-$1/z^2$-versus-infinite-$e^{1/z}$ contrast explicitly.

### MC-3: LAURENT-COEFFICIENTS-REQUIRE-CONTOUR-INTEGRATION
- **Surface form**: believes every Laurent coefficient must be computed by directly evaluating the
  contour integral formula, missing that algebraic substitution of known series is standard.
- **Birth type**: instruction-induced (Blueprint's own declared moderate severity — the coefficient
  formula is introduced as THE definition, obscuring that it's rarely the computational tool).
- **Repair**: re-walk all three worked examples, none of which used the contour integral.

## Misconceptions

### MC-1: LAURENT-SERIES-AS-UNRELATED-NEW-OBJECT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: FINITE-PRINCIPAL-PART-MISCLASSIFIED-AS-ESSENTIAL
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: LAURENT-COEFFICIENTS-REQUIRE-CONTOUR-INTEGRATION
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A Laurent series is an ordinary power series that's allowed to also describe the singularity
  itself — the principal part is the extra vocabulary needed for that one extra job."**
- **Anti-analogy**: counting principal-part terms isn't a fuzzy "how bad does it look" judgment —
  it's a strict finite-versus-infinite binary, with the finite side collapsing to "pole" no matter
  how many terms it has.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\sin z/z$ zero-principal-part derivation.
- **Demonstration 2 (targets MC-3)**: the $e^{1/z}$ algebraic-substitution coefficient computation.
- **Demonstration 3 (targets MC-2)**: the $1/z^2$-versus-$e^{1/z}$ finite-versus-infinite contrast.

## Discovery Questions
1. "Is a Laurent series a fundamentally different kind of object from an ordinary power series, or
   does most of its machinery carry over unchanged?"
2. "Must every Laurent series coefficient be found by directly evaluating the contour integral
   formula?"
3. "If a function's Laurent series has nonzero coefficients at z⁻¹ and z⁻³ but nothing more
   negative, could it still be an essential singularity?"

## Teaching Sequence
1. **Representation shift**: work the $\sin z/z$ derivation, isolating MC-1.
2. **Conflict evidence**: work the $e^{1/z}$ algebraic-substitution computation, isolating MC-3.
3. **Contrast pair**: work the $1/z^2$-versus-$e^{1/z}$ finite-versus-infinite contrast, isolating
   MC-2.
4. **Mastery gate**: require a correct Laurent series derivation via known-series substitution, a
   correct classification of a singularity from a described principal part, a correct Laurent
   series computation in a specified annulus via geometric-series expansion, and a correct
   explanation of why the algebraic and limiting-behavior classifications must always agree, at
   the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a Laurent series treated as requiring entirely new techniques unrelated to power
  series.
- Never accept a Laurent coefficient computation that reaches immediately for the contour integral
  before trying known-series substitution.
- Never accept a finite, multi-term principal part classified as essential.

## Voice Teaching Notes
- Say "which part of that series is genuinely new — is it really all of it?" whenever a Laurent
  series is introduced.
- Ask "is that principal part finite or truly infinite?" whenever a singularity classification
  from a Laurent series is claimed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the principal part of a given Laurent
  series and states whether it's zero, finite, or infinite.
- **Rung 2 (application)**: learner correctly computes a Laurent series via algebraic substitution
  of a known series, without reaching for the contour integral.
- **Rung 3 (transfer)**: learner correctly finds the Laurent series of a combined pole-and-
  essential-singularity function and refutes an incorrect "averaging" intuition about the result.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\sin z/z$ derivation.
- If MC-2 recurs, re-contrast the finite-$1/z^2$ and infinite-$e^{1/z}$ principal parts.
- If MC-3 recurs, re-walk the algebraic-substitution technique across all three examples.

## Memory Hooks
- "Only the principal part is new — the rest is ordinary power-series machinery."
- "Algebra first, contour integral only when forced."
- "Finite principal part, any length, means pole — only infinite means essential."

## Transfer Connections
- `math.cx.singularities` (prerequisite, already authored, this campaign): supplies the limiting-
  behavior classification this concept's algebraic principal-part test is shown to always agree
  with, on the exact same three reused functions.
- `math.cx.power-series-cx` (prerequisite, already authored, this campaign): supplies the ordinary
  power-series machinery (radius of convergence, term-by-term manipulation) the Laurent series'
  analytic part directly reuses unchanged.

## Cross-Subject Connections
- Electrical engineering: a filter's transfer function's Laurent series about a singularity,
  combining pole-like and essential-singularity-like factors, is classified via exactly this
  concept's principal-part-counting technique rather than an incorrect "averaging" intuition.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.laurent-series.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on an electrical engineer's
  $H(s)=(1/s^2)e^{1/s}$ transfer function, refuting the "averaging" misconception via the actual
  computed Laurent series.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.singularities`, `math.cx.power-series-cx`, unlocks `math.cx.residue-theorem`,
  cross_links none, expert/apply, mastery_threshold 0.85, estimated_hours 6) was directly verified
  against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 244): authored. Second entry this batch. Companion batch concept:
  `math.cx.fundamental-theorem-algebra`.

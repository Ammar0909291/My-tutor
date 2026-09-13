# math.calc.taylor-remainder

## Identity
- **KG id**: `math.calc.taylor-remainder`
- **Domain**: math.calc
- **Requires**: `math.calc.taylor-series`
- **Unlocks**: none
- **Cross-links**: `math.num.error-analysis` (handled in independence mode — see Curriculum
  Feedback)
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 5

## Learning Objective
State the Lagrange error bound $|R_n(x)|\le\frac{M|x-a|^{n+1}}{(n+1)!}$ and recognize $R_n(x)$ as
the TRUE ERROR between $f(x)$ and its $n$th Taylor polynomial — not the next series term itself;
find a valid bound $M$ by determining the genuine MAXIMUM of $|f^{(n+1)}|$ over the relevant
interval, never an arbitrary or convenient underestimate; and use the error bound to determine how
many terms are needed to guarantee a target precision, before doing any actual computation.

## Core Understanding
`math.calc.taylor-series` builds the infinite series $f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}
{n!}(x-a)^n$, but any REAL computation truncates this after finitely many terms, using the $n$th
Taylor polynomial $T_n(x)$ as a practical approximation to $f(x)$. The Taylor remainder
$R_n(x)=f(x)-T_n(x)$ measures exactly how far off this truncated approximation is — it is the
TRUE ERROR, not some additional term still waiting to be added in the usual sense of extending the
series further.

The Lagrange error bound gives a way to CONTROL this error without knowing $f(x)$'s exact value:
$|R_n(x)|\le\frac{M|x-a|^{n+1}}{(n+1)!}$, where $M$ is any number that upper-bounds
$|f^{(n+1)}(t)|$ for every $t$ between $a$ and $x$. Finding a VALID $M$ requires genuinely
determining the worst-case (maximum) size of the $(n+1)$th derivative over that entire interval —
using anything smaller than the true maximum would UNDERSTATE the bound, since the actual error
could then exceed a bound built on too small an $M$, making the guarantee invalid. A rigorously
safe but slightly loose $M$ (e.g. using $|\sin t|\le1$ for all $t$, rather than computing
$\sin(0.5)$'s exact value) is preferable to a tighter but unverified one.

This machinery is genuinely useful for PRECISION CONTROL: given a target accuracy (e.g. "error
under $10^{-6}$"), the inequality $\frac{M|x-a|^{n+1}}{(n+1)!}<\text{(target error)}$ can be
solved directly for the smallest sufficient $n$ — telling you in advance exactly how many terms a
computation needs, without first computing any terms and checking afterward.

## Mental Models
- **"The remainder is the true error — the Lagrange formula only BOUNDS it, never computes it
  exactly."**
- **"A valid bound $M$ must be the genuine worst case over the WHOLE interval — an unverified
  guess is not a bound at all."**
- **"Solve the error inequality for $n$ BEFORE computing anything — that's the whole point of
  having a bound."**

## Why Students Fail

### MC-1: REMAINDER-CONFUSED-WITH-THE-NEXT-SERIES-TERM-RATHER-THAN-THE-TRUE-BOUNDED-ERROR
- **Surface form**: treating $R_n(x)$ as though it were exactly equal to the next series term
  (e.g. assuming $R_2(x)=\frac{x^3}{3!}$ exactly for a specific function), rather than as the true
  error, which the Lagrange formula only bounds using an unknown point's derivative value.
- **Frequency band**: Foundational.
- **Root cause (Type 1, overgeneralization)**: the next series term LOOKS like a natural candidate
  for "what's missing," since it is the next term the infinite series would add, but the Lagrange
  bound's $M$ represents the derivative's value at some UNKNOWN point in the interval, not
  necessarily the fixed coefficient the next series term would use.
- **Repair**: contrast the Lagrange bound's structure (an unknown-point derivative value) against
  the next series term's structure (a fixed coefficient), showing they are not the same
  quantity even though both involve the $(n+1)$th derivative.

### MC-2: BOUND-M-CHOSEN-WITHOUT-RIGOROUSLY-VERIFYING-IT-IS-A-TRUE-UPPER-BOUND
- **Surface form**: selecting a value for $M$ based on a casual estimate rather than rigorously
  confirming it upper-bounds $|f^{(n+1)}|$ over the ENTIRE relevant interval, producing an
  error guarantee that is not actually valid.
- **Frequency band**: Foundational.
- **Root cause (Type 5, instruction-induced)**: worked examples often present the correct $M$
  directly without demonstrating the verification step, so the rigor requirement itself is
  under-taught relative to the formula's mechanical application.
- **Repair**: deliberately propose an under-estimated $M$ and show its resulting "bound" is
  violated by the true error, then re-derive a genuinely safe $M$ by examining the derivative's
  behavior across the full interval.

## Misconceptions

### MC-1: REMAINDER-CONFUSED-WITH-THE-NEXT-SERIES-TERM-RATHER-THAN-THE-TRUE-BOUNDED-ERROR
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: BOUND-M-CHOSEN-WITHOUT-RIGOROUSLY-VERIFYING-IT-IS-A-TRUE-UPPER-BOUND
- **Surface form**: as described above.
- **Frequency band**: Foundational.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A rigorous bound $M$ is like a safety margin an engineer must PROVE, not merely assume."**
- **Anti-analogy**: the Taylor remainder is NOT simply "the next term you haven't added yet" — it
  is the true gap between the approximation and the function, whose SIZE the Lagrange formula
  bounds using the worst case of a derivative over an interval, not a fixed series coefficient.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $f(x)=e^x$ approximated by $T_2(x)=1+x+\frac{x^2}{2}$
  at $a=0$, show $R_2(x)=e^x-T_2(x)$ is the true error at a given $x$, contrasted against the
  incorrect assumption $R_2(x)=\frac{x^3}{3!}$ exactly.
- **Demonstration 2 (targets MC-2)**: bound the error approximating $\sin(0.5)$ by its
  degree-3 Taylor polynomial, using the safe, rigorously-justified $M=1$ (since $|\sin t|\le1$
  for all $t$) rather than an unverified smaller estimate.
- **Demonstration 3**: determine how many terms of $e^x$'s Taylor series (at $a=0$) are needed to
  approximate $e^{0.1}$ with error under $10^{-6}$, solving the error inequality directly for the
  smallest sufficient $n$ (n=4).

## Discovery Questions
1. "If the remainder $R_n(x)$ were exactly the next series term, would the Lagrange formula need
   to mention an unknown point $t$ between $a$ and $x$ at all?"
2. "If you pick an $M$ that's smaller than the derivative's TRUE maximum somewhere on the
   interval, does your error bound still guarantee anything?"
3. "Could you figure out how many terms you need BEFORE computing a single one, just from the
   error bound formula?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.taylor-series`'s infinite series, framing the remainder as
   the gap left by truncating it to finitely many terms.
2. **Conflict evidence**: contrast the Lagrange bound's unknown-point structure against the
   next-series-term structure, for the identical function.
3. **Contrast pair**: a rigorously-verified safe bound $M$ versus an unverified, under-estimated
   one, for the same approximation.
4. **Mastery gate**: require distinguishing the remainder from the next series term, finding a
   rigorously valid $M$, and solving for the minimum $n$ guaranteeing a target precision.

## Tutor Actions
- Never accept a claimed value for $R_n(x)$ that equals a specific series-term coefficient without
  checking whether it is actually being treated as an unknown-point bound.
- When a learner proposes a value for $M$, ask how they verified it is the genuine maximum over
  the whole relevant interval, not merely a plausible-looking number.

## Voice Teaching Notes
- Say "the true error, bounded, not computed exactly" whenever introducing $R_n(x)$, to keep the
  distinction audible.
- When a learner proposes an unverified $M$, ask "have you checked the WORST point in the whole
  interval, or just a convenient one?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes the remainder from the next series
  term.
- **Rung 2 (application)**: learner correctly finds a rigorously valid bound $M$ for a given
  approximation.
- **Rung 3 (transfer)**: learner correctly solves the error inequality for the minimum $n$
  guaranteeing a target precision.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the unknown-point-versus-next-term contrast.
- If MC-2 recurs, re-run the under-estimated-versus-rigorously-safe bound contrast.

## Memory Hooks
- "The remainder is the true error, only BOUNDED by the formula — never given exactly by it."
- "A bound must be the genuine worst case over the WHOLE interval, or it isn't a bound."
- "Solve for $n$ before computing — that's the whole point of the bound."

## Transfer Connections
- `math.calc.taylor-series` (already authored): supplies the infinite series and its finite
  truncation this concept's remainder measures the gap against.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.taylor-remainder.md`, reused by
  reference for its $e^x$/$T_2(x)$ remainder example, its $\sin(0.5)$ rigorous-bound derivation,
  its $e^{0.1}$ minimum-$n$ example, and its two-misconception registry (independently
  birth-type-classified above, since the Blueprint carries severity labels but no birth-type
  column).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a navigation
  system requiring a guaranteed positioning-error bound via rigorously-justified $M$).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint-staleness finding on P76 cross-link mode, corrected via independence mode**:
  the Blueprint's own Component 7 names `math.num.error-analysis` as a cross-link but does not
  declare an explicit P76_mode; verified via `ls educational-brain/concepts/mathematics/` that no
  `math.num.error-analysis` entry exists (`math.num` is entirely unstarted, 0/16) — this entry's
  transfer probe is therefore reused in independence mode, adapting the Blueprint's own
  navigation-system probe without assuming any specific content from that unauthored concept.
- No other genuine Blueprint/KG metadata discrepancy found: requires, unlocks, difficulty, bloom,
  mastery_threshold, and estimated_hours all match the live KG exactly.

## Version History
- 2026-09-13 (Batch 66): authored. Unblocked by `math.calc.taylor-series` (Batch 65). Companion
  batch concepts: `math.calc.maclaurin-series`, `math.seq.alternating-series`,
  `math.seq.comparison-test`. `math.calc` moves toward **74/76** this batch (both math.calc
  concepts authored).

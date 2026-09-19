# math.num.floating-point

## Identity
- **KG id**: `math.num.floating-point`
- **Domain**: math.num
- **Requires**: `math.arith.scientific-notation`, `math.arith.significant-figures`
- **Unlocks**: `math.num.error-analysis`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Explain IEEE 754's bit-level structure (sign, exponent, mantissa) and quantify representation
error via $\mathrm{fl}(x)=x(1+\varepsilon)$ with $|\varepsilon|\le u$ (machine epsilon
$u\approx2.2\times10^{-16}$ for doubles — floating-point is NEVER exact rational arithmetic);
identify catastrophic cancellation when subtracting nearly equal numbers (NEVER assumed accurate
just because each operand is accurate); and rewrite unstable expressions algebraically to avoid
cancellation.

## Core Understanding
FLOATING-POINT IS NEVER EXACT — EVERY OPERATION INTRODUCES ROUNDING: `0.1 + 0.2` in Python
returns `0.30000000000000004`, NEVER exactly `0.3` — because 0.1 in binary is
$0.000110011001100\ldots$ (repeating, NEVER terminating), so the STORED value is only the NEAREST
representable double, not the exact decimal. Every floating-point operation introduces a relative
error $\le u\approx2.22\times10^{-16}$ — usually tiny, but accumulating: $10^6$ additions can
accumulate roughly $10^6u\approx2.22\times10^{-10}$ of relative error. Integer arithmetic being
exact (within range) NEVER extends to floating-point — the representation itself changes.

A SMALL NUMBER ADDED TO A LARGE ONE CAN BE COMPLETELY ABSORBED — NEVER SAFE BY DEFAULT: for
$x=10^{16}$: `x + 1.0 == x` returns `True` in double precision, because $1.0<u\cdot x\approx2.22$
— the number 1.0 is BELOW the precision threshold and is COMPLETELY absorbed, contributing NOTHING
to the stored result. Trusting that adding a small number to a large one always registers is never
safe — when summing many small values into a large accumulator, compensated summation (Kahan's
algorithm) is needed specifically to counter this absorption.

CATASTROPHIC CANCELLATION MEANS SUBTRACTING NEARLY EQUAL VALUES DESTROYS RELATIVE ACCURACY — NEVER
"BOTH OPERANDS WERE ACCURATE SO THE RESULT IS TOO": for $f(x)=\sqrt{x+1}-\sqrt x$ at $x=10^{12}$:
$\sqrt{x+1}\approx10^6$ and $\sqrt x=10^6$ are both computed to ~16 significant digits, but their
DIFFERENCE ($\approx5\times10^{-7}$) has only ~4 correct digits — 12 digits of relative accuracy
are LOST, even though each operand was individually accurate. The STABLE rewrite
$1/(\sqrt{x+1}+\sqrt x)$ (via rationalizing the numerator, since
$(\sqrt{x+1}-\sqrt x)(\sqrt{x+1}+\sqrt x)=1$) adds two large positives — NO cancellation — giving
15+ correct digits instead.

## Mental Models
- **"Every float is the NEAREST representable value, not the exact one — treat every result as
  rounded, never as exact, no matter how clean the input looked."**
- **"A tiny number added to a huge one can vanish entirely below the precision floor — never
  assume it registered just because you wrote the addition."**
- **"Subtracting two nearly-equal accurate numbers can leave almost no accurate digits behind —
  accuracy in the inputs doesn't transfer automatically to the difference."**

## Why Students Fail

### MC-1: FLOATING-POINT-IS-EXACT
- **Surface form**: treats floating-point as exact rational arithmetic, not accounting for
  rounding at every operation.
- **Birth type**: Type 1 overgeneralization (Blueprint's own declared birth type — exact integer
  arithmetic in computers is extended, incorrectly, to floating-point without recognizing the
  representation change).
- **Repair**: run `0.1 + 0.2` in Python directly, observing `0.30000000000000004`.

### MC-2: ADDING-SMALL-TO-LARGE-IS-SAFE
- **Surface form**: adds a very small number to a very large number and trusts the result,
  missing that the small number can be absorbed below the precision threshold.
- **Birth type**: Type 5 instruction-induced (Blueprint's own declared birth type — the error
  bound $|\varepsilon|\le u$ being taught as "small" suggests individual errors are always
  negligible, without emphasizing cumulative absorption effects).
- **Repair**: verify `10**16 + 1.0 == 10**16` returns `True`.

### MC-3: CANCELLATION-IS-ACCURATE
- **Surface form**: believes $f(x)=\sqrt{x+1}-\sqrt x$ is accurate because both square roots are
  computed accurately, missing that subtraction of nearly equal quantities destroys relative
  accuracy.
- **Birth type**: Type 1 overgeneralization (Blueprint's own declared birth type — "each operand
  is accurate" doesn't track that relative error on the difference equals absolute error divided
  by a tiny difference).
- **Repair**: re-derive the stable rewrite $1/(\sqrt{x+1}+\sqrt x)$ and compare digit counts.

## Misconceptions

### MC-1: FLOATING-POINT-IS-EXACT
- **Surface form**: as described above.
- **Root cause (Type 1 overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: ADDING-SMALL-TO-LARGE-IS-SAFE
- **Surface form**: as described above.
- **Root cause (Type 5 instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: CANCELLATION-IS-ACCURATE
- **Surface form**: as described above.
- **Root cause (Type 1 overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Every floating-point number is a snapshot rounded to the nearest available grid point — the
  real number you typed and the stored value are almost never identical."**
- **Anti-analogy**: two individually accurate measurements don't guarantee an accurate
  difference — subtracting two nearly equal precise numbers can leave you with almost no
  significant digits at all.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the `0.1 + 0.2` binary-representation trace.
- **Demonstration 2 (targets MC-2)**: the $10^{16}+1.0=10^{16}$ absorption example.
- **Demonstration 3 (targets MC-3)**: the $\sqrt{x+1}-\sqrt x$ cancellation contrasted with its
  stable rewrite $1/(\sqrt{x+1}+\sqrt x)$.

## Discovery Questions
1. "Is a floating-point computation ever exact, the way integer arithmetic is?"
2. "Is it always safe to add a very small number to a very large one?"
3. "If both operands of a subtraction are individually accurate, is the difference automatically
   accurate too?"

## Teaching Sequence
1. **Representation shift**: the four representations of a floating-point number (decimal,
   binary, IEEE 754 bits, relative error), working Demonstration 1, isolating MC-1.
2. **Pattern induction**: the absorption and cancellation gallery, working Demonstration 2.
3. **Misconception detector**: the $1-\cos(x)$ cancellation gate, working Demonstration 3,
   isolating MC-3.
4. **Mastery gate**: require a correct machine-epsilon statement, a correct stable rewrite of a
   cancellation-prone expression, and a correct accumulated-error estimate for a summation loop,
   at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a floating-point result treated as exact.
- Never accept a small-number-to-large-number addition assumed to register without checking the
  precision threshold.
- Never accept a subtraction of nearly equal quantities assumed accurate just because each
  operand is accurate.

## Voice Teaching Notes
- Say "is this the exact value, or the nearest representable one?" whenever a floating-point
  result is discussed.
- Ask "are these two quantities nearly equal — could subtracting them destroy accuracy?" whenever
  a subtraction is evaluated for stability.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states machine epsilon and the relative-error
  model.
- **Rung 2 (application)**: learner correctly identifies catastrophic cancellation in a given
  expression and rewrites it stably.
- **Rung 3 (transfer)**: learner correctly estimates accumulated rounding error in a summation
  loop and explains how Kahan summation helps.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run `0.1 + 0.2` and trace the binary representation.
- If MC-2 recurs, re-verify the $10^{16}+1.0$ absorption example.
- If MC-3 recurs, re-derive the stable rewrite and compare accurate digit counts.

## Memory Hooks
- "Every float is rounded to the nearest representable value — never exact."
- "A tiny addend can vanish entirely below a large accumulator's precision floor."
- "Subtracting nearly equal accurate numbers can destroy almost all their accuracy."

## Transfer Connections
- `math.arith.scientific-notation` (already authored, certified domain): supplies the
  exponent/mantissa structure this concept's IEEE 754 bit layout directly builds on.
- `math.arith.significant-figures` (already authored, certified domain): supplies the
  accurate-digit-counting framework this concept's cancellation analysis directly applies.
- `math.num.error-analysis` (not yet authored, KG's declared unlock): builds directly on this
  concept's relative-error model and cancellation analysis.

## Cross-Subject Connections
- Computer science: numerical stability in scientific computing libraries, where compensated
  summation and stable algebraic reformulations are standard engineering practice.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.floating-point.md`, reused by reference
  for its IEEE 754 bit-layout table, its absorption and cancellation examples, its stable-rewrite
  derivations, and its three-misconception registry (severity/birth types adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe on $\ln(x+1)-\ln(x)$ for large $x$,
  requiring a stable single-logarithm rewrite and numerical verification at $x=10^{10}$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.arith.scientific-notation`/`math.arith.significant-figures`, unlocks
  `math.num.error-analysis`, cross_links none, proficient/understand, mastery_threshold 0.85,
  estimated_hours 4) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 194): authored. First entry this batch. Companion batch concept:
  `math.num.root-finding`.

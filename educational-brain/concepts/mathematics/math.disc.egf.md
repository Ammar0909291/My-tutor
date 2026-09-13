# math.disc.egf

## Identity
- **KG id**: `math.disc.egf`
- **Domain**: math.disc
- **Requires**: `math.disc.generating-functions`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.7
- **Estimated hours**: 5

## Learning Objective
Write the exponential generating function (EGF) $B(x)=\sum_{n\ge0}b_n\frac{x^n}{n!}$ for a given
sequence and recover sequence terms $b_n$ from a given EGF by multiplying its $x^n$ coefficient by
$n!$; explain WHY EGFs are the natural choice for LABELED structures, in contrast to
`math.disc.ogf`'s unlabeled case, distinguishing when each type applies; and recognize $e^x$ as
the EGF for "one way to form a labeled block," previewing (without fully deriving) how it
composes into $e^{e^x-1}$, the Bell-number EGF for set partitions.

## Core Understanding
An exponential generating function encodes a sequence $b_0,b_1,b_2,\ldots$ as
$B(x)=\sum_{n\ge0}b_n\frac{x^n}{n!}$ — reusing `math.disc.generating-functions`'s own coefficient-
carries-the-meaning framing, but dividing by $n!$. That division is not cosmetic: it makes EGFs
the natural tool for counting LABELED structures (where the $n$ individual elements or positions
are distinguishable, e.g. labeled with distinct names $1,\ldots,n$), since the $\frac1{n!}$ factor
correctly accounts for the $n!$ ways to assign labels when COMBINING labeled structures.

The sequence $b_n=1$ for every $n$ (counting exactly ONE way to arrange $n$ labeled items into a
single unstructured "block") has EGF $B(x)=\sum_{n\ge0}\frac{x^n}{n!}=e^x$. This makes $e^x$ a
fundamental building block throughout labeled combinatorics: the related structure
$e^{e^x-1}$ is the EGF for the Bell numbers (set partitions) — "a SET of such labeled blocks,"
composing $e^x$'s "one labeled block" structure with itself via the exponential formula.

If $B_1(x)=\sum b_k^{(1)}\frac{x^k}{k!}$ and $B_2(x)=\sum b_k^{(2)}\frac{x^k}{k!}$, their product's
coefficient is $b_n=\sum_{k=0}^n\binom nk b_k^{(1)}b_{n-k}^{(2)}$ — an EGF-CONVOLUTION with
BINOMIAL WEIGHTS, distinct from an OGF's plain convolution. Combining a labeled structure on a
size-$k$ subset with an independent labeled structure on the remaining $n-k$ labels requires
choosing WHICH labels go where: there are $\binom nk$ ways to do that, and this weighting is
exactly what makes EGF products correct for labeled structures — a plain, unweighted convolution
would UNDERCOUNT by failing to account for the label-distribution choices.

## Mental Models
- **"Dividing by $n!$ is what makes an EGF the right tool the moment the $n$ objects are
  individually distinguishable — labels, not just quantities."**
- **"$e^x$ is 'one way to form a labeled block out of $n$ points' — the building block every
  labeled-structure EGF composes from."**
- **"EGF products carry an automatic $\binom nk$ weight for how the labels split between the two
  pieces — an OGF-style plain convolution silently drops that weight and undercounts."**

## Why Students Fail

### MC-1: EGF-PRODUCT-COMPUTED-AS-PLAIN-CONVOLUTION
- **Surface form**: computing the product of two EGFs using an OGF-style plain convolution,
  missing the automatic binomial-coefficient weighting that makes EGF products correct for
  labeled structures.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: `math.disc.ogf`'s own product-as-convolution rule
  is correctly generalized as "multiplying generating functions convolves the sequences," but that
  generalization stops one step short — it does not carry forward the ADDITIONAL binomial weight
  that EGF products specifically require, since the plain-convolution formula happens to look
  structurally identical at first glance.
- **Repair**: re-derive the label-distribution count explicitly — $\binom nk$ ways to split $n$
  distinguishable labels between the two substructures — showing why this weight, absent from an
  OGF's plain convolution, is required here.

### MC-2: EGF-COEFFICIENT-EXTRACTION-CONFUSED-WITH-OGF
- **Surface form**: reading off the coefficient of $x^n$ directly as $b_n$ (as one would for an
  OGF), forgetting the required multiplication by $n!$.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: `math.disc.ogf`'s own coefficient-extraction rule
  ("the coefficient of $x^n$ IS $a_n$") is directly, but incorrectly, transferred to the EGF case,
  where the defining formula divides by $n!$, so the coefficient of $x^n$ alone is $\frac{b_n}{n!}$,
  not $b_n$.
- **Repair**: re-derive by explicitly multiplying the $x^n$ coefficient by $n!$ to recover $b_n$,
  per the EGF's defining formula, using a concrete case like $e^{2x}$.

### MC-3: LABELED-VS-UNLABELED-STRUCTURE-TYPE-MISJUDGED
- **Surface form**: choosing an EGF for a fundamentally unlabeled counting problem, or an OGF for
  a fundamentally labeled one, misjudging which encoding the problem's structure actually calls
  for.
- **Frequency band**: Moderate (Blueprint's own declared severity).
- **Root cause (Type 5, instruction-induced)**: OGFs and EGFs are typically introduced as two
  parallel techniques without a repeatedly-drilled decision rule for which applies when, so the
  choice defaults to whichever was most recently practiced rather than a genuine diagnosis of the
  problem's structure.
- **Repair**: re-walk the labeled/unlabeled contrast explicitly, asking "are the individual $n$
  elements distinguishable from each other?" as the deciding question for every new scenario.

## Misconceptions

### MC-1: EGF-PRODUCT-COMPUTED-AS-PLAIN-CONVOLUTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: EGF-COEFFICIENT-EXTRACTION-CONFUSED-WITH-OGF
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: LABELED-VS-UNLABELED-STRUCTURE-TYPE-MISJUDGED
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"$e^x$ is the EGF equivalent of a single Lego brick labeled with a serial number — 'one way to
  form a block' out of however many labeled points you hand it, and bigger structures are built by
  composing this brick with itself."**
- **Anti-analogy**: an EGF's product is NOT the same "slide and sum" convolution as an OGF's — the
  extra $\binom nk$ weight is a genuinely new ingredient, not a relabeling of the same operation.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: combine a labeled structure on $k$ of $n$ labels with an
  independent one on the remaining $n-k$, showing the EGF product's binomial-weighted sum
  $b_n=\sum_{k=0}^n\binom nk b_k^{(1)}b_{n-k}^{(2)}$ correctly counts every label-distribution
  choice, while a plain unweighted convolution would undercount.
- **Demonstration 2 (targets MC-2)**: for $B(x)=e^{2x}=\sum2^n\frac{x^n}{n!}$, extract $b_n=2^n$ by
  multiplying the $x^n$ coefficient ($\frac{2^n}{n!}$) by $n!$, contrasting with the incorrect
  direct read of $\frac{2^n}{n!}$ as $b_n$.
- **Demonstration 3 (targets MC-3)**: contrast the Bell-number problem (partitioning $n$ labeled
  students into unordered study groups, naturally an EGF via $e^{e^x-1}$) against partitioning $n$
  identical tokens into groups (naturally an OGF, per `math.disc.ogf`), asking "are the $n$
  elements distinguishable?" as the deciding test.

## Discovery Questions
1. "If combining two labeled structures on a total of $n$ labels, does it matter WHICH specific
   labels end up in each piece, or only how many go to each?"
2. "In an EGF $B(x)=\sum b_n\frac{x^n}{n!}$, is the coefficient of $x^n$ itself equal to $b_n$, or
   does something need to be undone first to recover $b_n$?"
3. "Between partitioning $n$ NAMED students into groups and partitioning $n$ IDENTICAL tokens into
   groups, which one has individually distinguishable elements?"

## Teaching Sequence
1. **Anchor**: connect to `math.disc.generating-functions`'s coefficient-carries-the-meaning idea
   and to `math.disc.ogf`'s own product-as-convolution rule, framing the EGF as the labeled
   counterpart that needs one additional ingredient.
2. **Conflict evidence**: the plain-convolution guess for an EGF product versus the correct
   binomial-weighted sum.
3. **Contrast pair**: the labeled Bell-number problem versus the unlabeled token-partition
   problem, testing the OGF-vs-EGF decision rule directly.
4. **Mastery gate**: require writing/reading an EGF, explaining the $\frac{x^n}{n!}$ extraction
   rule, and identifying $e^x$'s combinatorial meaning, at MAMR 4/5.

## Tutor Actions
- Never accept an EGF product computed as a plain convolution without requiring the learner to
  state the binomial weight and why it is needed.
- When a learner reads a sequence term off an EGF, require them to state explicitly whether they
  are reading the coefficient of $x^n$ or of $\frac{x^n}{n!}$, and to convert between the two if
  needed.

## Voice Teaching Notes
- Say "labeled needs a binomial weight" whenever a learner computes an EGF product without it.
- When a learner misreads an EGF coefficient, ask "is that the coefficient of $x^n$, or have you
  already multiplied by $n!$ to get $b_n$?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly writes the EGF for a given sequence and reads a
  sequence term off a given EGF by correctly applying the $n!$ multiplication.
- **Rung 2 (application)**: learner correctly explains why EGFs, not OGFs, apply to a given
  labeled counting problem.
- **Rung 3 (transfer)**: learner correctly identifies $e^x$'s combinatorial meaning and reasons
  about how it composes into more complex labeled-structure EGFs.

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the explicit label-distribution/binomial-weight derivation.
- If MC-2 recurs, re-run the $x^n$-coefficient-to-$b_n$ conversion on a concrete case.
- If MC-3 recurs, re-run the labeled-vs-unlabeled contrast on the specific scenario in question.

## Memory Hooks
- "Divide by $n!$: that's what makes it an EGF, and that's what labeled structures need."
- "EGF product = binomial-weighted convolution — the labels have to be distributed, not just
  counted."
- "$e^x$ is one labeled block — everything bigger composes from it."

## Transfer Connections
- `math.disc.generating-functions` (already authored): supplies the general encoding-as-a-formal-
  power-series idea this concept specializes for labeled structures.
- `math.disc.ogf` (already authored): the unlabeled-structure counterpart, directly contrasted
  throughout this entry — the same product-as-convolution idea, one binomial weight deeper.
- `math.disc.stirling-numbers` (already authored): the second-kind Stirling numbers this concept's
  Bell-number preview ($e^{e^x-1}$) connects to via the set-partition structure both concepts
  describe from different angles.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.disc.egf.md`, reused by reference for its
  three worked examples (writing/reading an EGF, binomial-weighted product, $e^x$ as "one labeled
  block") and its three-misconception registry (birth types independently classified, since this
  Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (the Bell-number
  labeled-student-partition problem contrasted against an unlabeled-token-partition problem, using
  the labeled/unlabeled decision rule from this entry).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires, unlocks none,
  cross_links none, expert/apply, mastery_threshold 0.7, estimated_hours 5) was directly verified
  against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 70): authored. Unblocked by `math.disc.generating-functions` (Batch 69).
  Companion batch concepts: `math.disc.ogf`, `math.disc.complexity-classes`. `math.disc` moves
  toward **31/32** this batch — only `graph-representation` remains, blocked on unauthored
  `math.linalg.matrix`.

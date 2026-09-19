# math.prob.pmf

## Identity
- **KG id**: `math.prob.pmf`
- **Domain**: math.prob
- **Requires**: `math.prob.discrete-rv`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
Verify the PMF's two mandatory axioms — NON-NEGATIVITY ($p(x)\ge0$ for all $x$) and
NORMALIZATION ($\sum_xp(x)=1$) — simultaneously, never independently; find UNKNOWN PMF entries by
solving the normalization equation for the residual; and compute EVENT probabilities as
$P(X\in A)=\sum_{x\in A}p(x)$, summing only the values in the event.

## Core Understanding
BOTH AXIOMS MUST HOLD SIMULTANEOUSLY — VIOLATING NON-NEGATIVITY TO FIX NORMALIZATION IS NEVER
VALID: for $p(1)=0.6,p(2)=0.7$ (summing to 1.3), NO value of $p(3)$ can fix this — $p(3)=-0.3$
would satisfy normalization but violate non-negativity; $p(3)=0$ satisfies non-negativity but
leaves the sum at 1.3. The table is internally INCONSISTENT — no extension makes it valid. Both
axioms are hard requirements, never independently negotiable.

UNKNOWN PMF ENTRIES ARE FOUND BY SOLVING THE NORMALIZATION EQUATION FOR THE RESIDUAL, NEVER BY
DEFAULT ASSUMPTIONS LIKE UNIFORMITY: for $p(1)=0.2,p(2)=0.5,p(3)=k$: from $\sum p(x)=1$,
$k=1-0.2-0.5=0.3$ — a DIRECT algebraic consequence, never guessed or assumed equal to the other
entries. For a loaded die with $p(x)=cx$ for $x=1,\ldots,6$: normalization gives
$c(1+2+\cdots+6)=21c=1\Rightarrow c=1/21$, then $P(X\ge5)=p(5)+p(6)=5/21+6/21=11/21$ — the
constant is SOLVED FOR, never assumed to make the distribution uniform.

EVENT PROBABILITY SUMS ONLY THE PMF VALUES ACTUALLY IN THE EVENT, NEVER A RUNNING CUMULATIVE
TOTAL BY DEFAULT: for $p(1)=0.1,p(2)=0.2,p(3)=0.3,p(4)=0.4$: $P(X=3)=p(3)=0.3$ directly (a single
lookup), while $P(X\le3)=p(1)+p(2)+p(3)=0.6$ (a genuinely different, cumulative sum) — reading
"$P(X=x)$" as requiring summation up to $x$ conflates the point probability with the cumulative
one; $P(X\in\{2,4\})=p(2)+p(4)=0.2+0.4=0.6$ sums ONLY the listed values, never adjacent or
intermediate ones.

## Mental Models
- **"Both PMF axioms are load-bearing walls — remove either one (letting a value go negative, or
  letting the sum drift from 1) and the whole structure collapses, regardless of what seems
  convenient."**
- **"An unknown PMF entry is always found the same way — subtract the sum of everything else from
  1 — never guessed by symmetry or 'looks about right.'"**

## Why Students Fail

### MC-1: PMF-SUM-NOT-ONE
- **Surface form**: assigns the remaining probability so that $\sum p(x)\ne1$ — either miscomputes
  the residual, or assigns equal probabilities to all values without checking the sum.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  constructing a PMF table entry-by-entry invites treating each assignment as independent rather
  than globally constrained).
- **Repair**: re-derive the unknown entry directly as $1$ minus the sum of all known
  probabilities.

### MC-2: PMF-IS-CDF
- **Surface form**: reads $P(X=3)$ as a running total up to 3 (CDF), or conversely computes
  $\sum_{x\le3}p(x)$ when asked only for $p(3)$.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared severity implied
  significant — "$P(X=x)$" and "$P(X\le x)$" differ by a single symbol, inviting confusion under
  time pressure).
- **Repair**: re-anchor on the point-value-versus-cumulative-sum contrast directly from the same
  table.

### MC-3: PMF-NEGATIVE-ALLOWED
- **Surface form**: assigns $p(x)<0$ for some $x$ to force the total to sum to 1 when the known
  values already exceed 1.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity implied
  significant — normalization is treated as the ONLY constraint, forgetting non-negativity must
  hold simultaneously).
- **Repair**: re-derive that a table already summing beyond 1 is internally inconsistent — no
  entry, negative or otherwise, can repair it.

## Misconceptions

### MC-1: PMF-SUM-NOT-ONE
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: PMF-IS-CDF
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: PMF-NEGATIVE-ALLOWED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A PMF is a fixed budget of exactly 1 unit of probability — every allocation must be
  non-negative, and the allocations must exhaust the whole budget with nothing left over and
  nothing overspent."**
- **Anti-analogy**: a partially-specified PMF summing to more than 1 is NOT fixable by any choice
  of remaining entry — it is already internally inconsistent, negative entries included.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: $p(1)=0.6,p(2)=0.7$ (sum 1.3) — no value of $p(3)$, negative
  or otherwise, repairs this.
- **Demonstration 2 (targets MC-1)**: $p(1)=0.2,p(2)=0.5,p(3)=k\Rightarrow k=0.3$, solved directly
  from normalization, never assumed.
- **Demonstration 3 (targets MC-2)**: $P(X=3)=p(3)=0.3$ versus $P(X\le3)=p(1)+p(2)+p(3)=0.6$ —
  different questions, different sums, from the identical table.

## Discovery Questions
1. "If two given PMF values already sum to more than 1, can any choice of a third value
   (including a negative one) make the table valid?"
2. "How do you find an unknown PMF entry — by assumption, or by solving an equation?"
3. "Does $P(X=3)$ mean the same thing as $P(X\le3)$?"

## Teaching Sequence
1. **Pattern induction**: extract the two axioms from three valid PMF examples, working
   Demonstration 2's residual computation, isolating MC-1.
2. **Worked example pair**: verify a PMF's validity and construct a new one (two coin tosses),
   reinforcing both axioms checked simultaneously.
3. **Conflict evidence / detector**: Demonstration 1's already-inconsistent table, isolating MC-3
   by requiring the internal inconsistency recognized rather than patched with a negative value;
   Demonstration 3's point-versus-cumulative contrast, isolating MC-2.
4. **Mastery gate**: require a correct residual computation for an unknown PMF entry, a correct
   event-probability computation via summation over the event only, and a correct validity
   judgment for an internally-inconsistent table, at the Blueprint's own stated MAMR of 5/5
   (⌈0.9×5⌉).

## Tutor Actions
- Never accept a negative PMF value proposed to fix a normalization shortfall or overflow.
- Never accept $P(X=x)$ computed as a cumulative sum, or $P(X\le x)$ computed as a single lookup.

## Voice Teaching Notes
- Say "does that table already violate one axiom before you even solve for the unknown entry?"
  whenever a partial PMF is presented.
- When an event probability is requested, ask "are you summing only the values in the event, or
  did that turn into a running total?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly solves for an unknown PMF entry via the
  normalization equation.
- **Rung 2 (application)**: learner correctly computes an event probability by summing only the
  relevant PMF values.
- **Rung 3 (transfer)**: learner correctly applies the complement rule to a new multi-value PMF
  scenario (e.g. a two-dice sum) and explains, from first principles, why the probabilities must
  sum to 1 (exhaustive, mutually exclusive partition).

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the unknown entry as 1 minus the sum of known probabilities.
- If MC-2 recurs, re-anchor on the point-value-versus-cumulative-sum contrast.
- If MC-3 recurs, re-derive that an already-overflowing table is unfixable by any entry.

## Memory Hooks
- "Both axioms are load-bearing — never sacrifice one to satisfy the other."
- "An unknown entry is always 1 minus everything else — solved, never guessed."
- "P(X=x) is a single lookup; P(X≤x) is a running total — don't blur them."

## Transfer Connections
- `math.prob.discrete-rv` (already authored, this campaign, Batch 115): supplies the PMF's
  validity conditions and support/domain distinction this concept extends with the residual-
  solving procedure and event-probability summation.
- `math.prob.cdf` (already authored, this campaign, Batch 116): supplies the cumulative
  distribution function this concept's PMF is explicitly distinguished from.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.pmf.md`, reused by reference for its
  pattern-induction PMF-axiom extraction, its residual-solving procedure, its point-versus-
  cumulative contrast, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe, examining the two-dice sum
  distribution's symmetric PMF, applying the complement rule, and explaining normalization from
  the exhaustive-partition principle.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.discrete-
  rv`, unlocks none, cross_links none, proficient/apply, mastery_threshold 0.9, estimated_hours 2)
  was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 117): authored. Second entry this batch. Companion batch concept:
  `math.meas.lp-space`.

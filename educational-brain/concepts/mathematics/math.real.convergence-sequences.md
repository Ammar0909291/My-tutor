# math.real.convergence-sequences

## Identity
- **KG id**: `math.real.convergence-sequences`
- **Domain**: math.real
- **Requires**: `math.real.completeness`, `math.seq.sequence`
- **Unlocks**: `math.real.cauchy-sequence`, `math.real.series-rigorous`
- **Cross-links**: `math.seq.series-convergence` (KG-declared and Blueprint-claimed as "not yet
  authored," but NOW actually authored — verified via `ls`; genuine cross-link probe used
  instead, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 6

## Learning Objective
State and apply the formal $\varepsilon$-$N$ definition of convergence ($a_n\to L$ iff
$\forall\varepsilon>0\,\exists N:n>N\Rightarrow|a_n-L|<\varepsilon$), constructing a genuine
proof for an ARBITRARY $\varepsilon$, never a single numerical spot-check; prove CONVERGENT
$\Rightarrow$ BOUNDED directly from the definition, while recognizing the converse is FALSE; and
state BOLZANO-WEIERSTRASS (every bounded sequence has a convergent SUBSEQUENCE) without misreading
it as "every bounded sequence converges."

## Core Understanding
$\varepsilon$ MUST BE TREATED AS ARBITRARY, NEVER AS A SINGLE CONVENIENT NUMBER: proving
$1/n\to0$ requires, for an ARBITRARY $\varepsilon>0$ (given, not chosen), producing SOME $N$
(depending on $\varepsilon$) with $n>N\Rightarrow1/n<\varepsilon$. By the Archimedean property,
some $N>1/\varepsilon$ exists, so $n>N\Rightarrow n>1/\varepsilon\Rightarrow1/n<\varepsilon$. A
"proof" that only checks $\varepsilon=0.01$ against some found $N$ has NOT engaged the
definition — it must work no matter how small $\varepsilon$ is handed over, which is why a
FORMULA for $N$ in terms of $\varepsilon$ (here $N=1/\varepsilon$), not a numerical check, is what
a genuine proof supplies.

CONVERGENT $\Rightarrow$ BOUNDED IS A TRUE, ONE-DIRECTIONAL THEOREM; ITS CONVERSE IS FALSE: if
$a_n\to L$, applying the definition with the specific choice $\varepsilon=1$ traps all terms past
some $N$ within $(L-1,L+1)$; the finitely many remaining terms are individually bounded, so
$M=\max(|a_1|,\ldots,|a_N|,|L|+1)$ bounds the entire sequence. But $b_n=(-1)^n$ is BOUNDED (all
terms in $\{-1,1\}$) yet NOT convergent: using $\varepsilon=1$, no single $L$ can trap both
recurring values $-1$ and $1$ (distance 2 apart) past any $N$ — a direct contradiction proof.
"Bounded implies convergent" is simply false; $(-1)^n$ is the standard counterexample.

BOLZANO-WEIERSTRASS GUARANTEES A CONVERGENT SUBSEQUENCE, NEVER CONVERGENCE OF THE WHOLE SEQUENCE:
applying the theorem to $(-1)^n$ (bounded, but divergent, per above) does NOT claim $(-1)^n$
itself converges — it claims SOME subsequence does. The even-indexed subsequence $1,1,1,\ldots$
converges to 1; the odd-indexed subsequence $-1,-1,-1,\ldots$ converges to $-1$ — both converge (to
DIFFERENT limits), while the original sequence converges to neither, because it doesn't converge
at all. The theorem's power is extracting SOME convergent thread from any bounded sequence, a
strictly weaker claim than the whole sequence converging.

## Mental Models
- **"Convergence proofs need a FORMULA for N in terms of ε, not a numerical spot-check for one
  convenient ε — the formula covers every case at once."**
- **"Convergent implies bounded is a one-way street — bounded sequences can still refuse to settle
  down, as (−1)ⁿ shows forever."**

## Why Students Fail

### MC-1: EPSILON-IS-A-SPECIFIC-NUMBER
- **Surface form**: "proves" convergence by checking $|a_n-L|<\varepsilon$ for one particular
  small $\varepsilon$ (e.g. 0.01) and a correspondingly found $N$, treating this single check as a
  complete proof.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared Foundational severity —
  this is the FIRST definition many students encounter requiring a universally-quantified
  variable handled symbolically rather than numerically).
- **Repair**: redo the argument symbolically, producing a FORMULA for $N$ in terms of
  $\varepsilon$ that instantly supplies a valid $N$ for any $\varepsilon$ handed over.

### MC-2: BOUNDED-IMPLIES-CONVERGENT
- **Surface form**: believes every bounded sequence converges, confusing the true theorem
  (convergent $\Rightarrow$ bounded) with its false converse.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity implied
  significant — the true one-directional theorem is easy to over-read as biconditional).
- **Repair**: re-walk the $(-1)^n$ contradiction argument directly, showing no single limit traps
  both recurring values.

### MC-3: BOLZANO-WEIERSTRASS-MEANS-SEQUENCE-CONVERGES
- **Surface form**: states Bolzano-Weierstrass as "every bounded sequence converges," missing that
  it guarantees only a convergent SUBSEQUENCE.
- **Birth type**: Type 3, language contamination (Blueprint's own declared severity implied
  significant — "has a convergent subsequence" is easy to compress in memory to "converges").
- **Repair**: re-read the theorem's exact conclusion, extracting the actual convergent
  subsequences from $(-1)^n$ explicitly.

## Misconceptions

### MC-1: EPSILON-IS-A-SPECIFIC-NUMBER
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: BOUNDED-IMPLIES-CONVERGENT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: BOLZANO-WEIERSTRASS-MEANS-SEQUENCE-CONVERGES
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

## Analogies
- **"An ε-N proof is a vending machine: hand it any ε (however small), and it must dispense a
  valid N — testing it once with a quarter doesn't prove it works for every coin."**
- **Anti-analogy**: bounded does NOT mean well-behaved enough to converge — $(-1)^n$ stays
  perfectly bounded forever while never settling anywhere.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: proving $1/n^2\to0$ requires solving $1/n^2<\varepsilon$
  for $n$ symbolically ($N=1/\sqrt\varepsilon$), not checking one $\varepsilon$ numerically.
- **Demonstration 2 (targets MC-2)**: $(-1)^n$ is bounded but not convergent — using
  $\varepsilon=1$, no single $L$ traps both $-1$ and $1$ past any $N$.
- **Demonstration 3 (targets MC-3)**: $(-1)^n$'s even-indexed subsequence converges to 1;
  odd-indexed converges to $-1$ — Bolzano-Weierstrass's actual guarantee, not whole-sequence
  convergence.

## Discovery Questions
1. "Does checking one specific $\varepsilon$ (like 0.01) with a valid $N$ constitute a complete
   convergence proof?"
2. "Does every bounded sequence converge?"
3. "Does Bolzano-Weierstrass mean every bounded sequence converges, or something more specific?"

## Teaching Sequence
1. **Representation shift**: a complete $\varepsilon$-$N$ proof that $1/n\to0$ worked for
   arbitrary $\varepsilon$, then Demonstration 1's $1/n^2$ checkpoint, isolating MC-1 by requiring
   a formula for $N$, not a spot-check.
2. **Contrast pair**: Demonstration 2's $(-1)^n$ contradiction argument, isolating MC-2 by
   requiring the converse's failure demonstrated directly.
3. **Contrast pair**: Demonstration 3's subsequence extraction, isolating MC-3 by requiring the
   theorem's exact conclusion (subsequence, not whole sequence) stated precisely.
4. **Mastery gate**: require a correct arbitrary-$\varepsilon$ proof for a new sequence, a correct
   bounded-but-divergent identification with justification, and a correct Bolzano-Weierstrass
   application naming an explicit convergent subsequence, at the Blueprint's own stated MAMR of
   5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a convergence "proof" that checks only one numerical $\varepsilon$.
- Never accept "bounded implies convergent" or "Bolzano-Weierstrass means the sequence converges"
  stated without correction.

## Voice Teaching Notes
- Say "does that argument work for EVERY $\varepsilon$, or just the one you picked?" whenever a
  convergence proof is presented.
- When boundedness and convergence are conflated, ask "is $(-1)^n$ bounded? Does it converge?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs a formula for $N$ in terms of
  $\varepsilon$ for a new sequence.
- **Rung 2 (application)**: learner correctly identifies a bounded, divergent sequence and proves
  divergence via contradiction.
- **Rung 3 (transfer)**: learner correctly evaluates whether a NEW sequence involving $(-1)^n$
  converges by checking the actual $\varepsilon$-$N$ definition, rather than assuming divergence
  from superficial resemblance to the classic counterexample.

## Tutor Recovery Strategy
- If MC-1 recurs, redo the argument symbolically, producing a formula for $N$.
- If MC-2 recurs, re-walk the $(-1)^n$ contradiction argument.
- If MC-3 recurs, re-read the theorem's exact conclusion and extract the actual subsequences.

## Memory Hooks
- "A formula for N covers every ε at once — a number only covers one."
- "Convergent implies bounded, never the reverse — (−1)ⁿ stays bounded and never settles."
- "Bolzano-Weierstrass promises a convergent slice, never convergence of the whole."

## Transfer Connections
- `math.real.completeness` (already authored, this campaign, Batch 109): supplies the Archimedean
  property (via completeness) used directly in the $1/n\to0$ proof.
- `math.seq.sequence` (already authored, certified domain): supplies the ordered-list vocabulary
  this concept makes rigorous via $\varepsilon$-$N$.
- `math.seq.series-convergence` (already authored, certified domain): the GENUINE cross-link
  target — defines series convergence as convergence of the partial-sum SEQUENCE, directly reusing
  this concept's own $\varepsilon$-$N$ definition unchanged, just applied to a different sequence.
- `math.real.cauchy-sequence` (not yet authored): the KG's declared unlock, building directly on
  this concept's $\varepsilon$-$N$ fluency for a closely related terms-close-to-EACH-OTHER
  condition.
- `math.real.series-rigorous` (not yet authored): the KG's declared unlock, applying this
  concept's convergence definition to sequences of partial sums.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.convergence-sequences.md`, reused by
  reference for its full $\varepsilon$-$N$ proof of $1/n\to0$, its convergent-implies-bounded
  theorem, its $(-1)^n$ bounded-but-divergent contradiction, its Bolzano-Weierstrass subsequence
  extraction, and its three-misconception registry (severity levels adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own probe, examining
  $e_n=1+(-1)^n/n$ (bounded, and — despite superficially resembling the classic divergent
  $(-1)^n$ example — genuinely CONVERGENT to 1, since the oscillating term shrinks to 0), used
  here as a GENUINE cross-link probe connecting directly to `math.seq.series-convergence`'s own
  partial-sum-sequence definition (see Curriculum Feedback).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (SIXTH occurrence this campaign, first in
  the OPPOSITE direction)**: the Blueprint's own Component 7 states `math.seq.series-convergence`
  "is listed in the KG but has no authored blueprint yet," setting P76_mode to independence.
  Verified via `ls educational-brain/concepts/mathematics/` that `math.seq.series-convergence`
  actually IS authored (part of the `math.seq` domain, certified since before this campaign's
  measure-theory/real-analysis work began) — the Blueprint was written before that domain reached
  completion, so its independence-mode claim, though correct AT THE TIME the Blueprint was
  authored, is now stale. This entry uses a GENUINE CROSS-LINK PROBE instead, directly connecting
  this concept's own $\varepsilon$-$N$ machinery to `series-convergence`'s partial-sum-sequence
  definition (which applies this concept's convergence definition unchanged, exactly as Component
  7 of this Blueprint itself anticipated a "future revision" might do). All other fields (requires
  `math.real.completeness`/`math.seq.sequence`, unlocks `math.real.cauchy-sequence`/`math.real.
  series-rigorous`, cross_links `math.seq.series-convergence`, expert/apply, mastery_threshold
  0.9, estimated_hours 6) matched exactly.

## Version History
- 2026-09-18 (Batch 112): authored. Second entry this batch. Companion batch concept:
  `math.meas.abstract-measure-spaces`.

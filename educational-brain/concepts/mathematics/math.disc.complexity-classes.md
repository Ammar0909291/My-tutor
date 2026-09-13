# math.disc.complexity-classes

## Identity
- **KG id**: `math.disc.complexity-classes`
- **Domain**: math.disc
- **Requires**: `math.disc.algorithm-complexity`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 7

## Learning Objective
Define the class $P$ (problems SOLVABLE in polynomial time) and the class $NP$ (problems
VERIFIABLE in polynomial time given a proposed solution/certificate), correctly distinguishing
"solving" from "verifying"; explain what it means for a problem to be NP-COMPLETE (in $NP$, and
every problem in $NP$ reduces to it) and state why NP-complete problems are considered the
"hardest" problems in $NP$; and state the $P$ vs. $NP$ open problem precisely, explaining why it
remains unresolved.

## Core Understanding
$P$ is the class of decision problems solvable by SOME algorithm running in polynomial time (i.e.
$O(n^k)$ for some constant $k$, as a function of input size $n$, reusing `math.disc.algorithm-
complexity`'s own Big-O framework) — this concept classifies PROBLEMS by the complexity of their
best possible solving algorithm, not individual algorithms themselves. $NP$ is the class of
decision problems for which a proposed YES-answer's CERTIFICATE (a candidate solution) can be
VERIFIED in polynomial time. Critically, $NP$'s definition is about the EASE of CHECKING a given
answer, not the ease of FINDING one from scratch — a problem can be in $NP$ and still be believed
extremely hard to solve.

Every problem in $P$ is also in $NP$: if you can solve a problem quickly, you can certainly verify
a proposed solution quickly too, simply by re-solving it. Whether the reverse holds — whether
$P=NP$, i.e. every efficiently-verifiable problem is also efficiently SOLVABLE — is the single
most famous open problem in computer science.

A problem is NP-COMPLETE if it is in $NP$ AND every other problem in $NP$ can be REDUCED to it in
polynomial time. That second condition is what makes NP-complete problems universal: an efficient
algorithm for ANY ONE NP-complete problem would immediately give an efficient algorithm for EVERY
problem in $NP$, proving $P=NP$. Classic NP-complete examples include Boolean satisfiability
(SAT), graph 3-coloring, and the traveling salesman decision problem (TSP). Despite decades of
research, no polynomial-time algorithm for any NP-complete problem has ever been found — strongly
suggesting $P\ne NP$ — but this widespread BELIEF is not the same as a PROOF; the correct, precise
statement is that $P$ vs. $NP$ remains a genuinely OPEN mathematical question.

## Mental Models
- **"$NP$ is about how hard it is to CHECK an answer, not how hard it is to FIND one — those are
  two different questions entirely."**
- **"NP-complete means 'in $NP$, and a universal hub that every other NP problem can be
  transformed into' — solve the hub efficiently and you solve everything in $NP$."**
- **"Widely believed is not the same as proven — $P\ne NP$ is the field's strongest hunch, not an
  established theorem, exactly the theorem-vs-conjecture distinction from `math.found.conjecture`."**

## Why Students Fail

### MC-1: NP-MEMBERSHIP-CONFLATED-WITH-INHERENT-DIFFICULTY
- **Surface form**: believing "a problem is in $NP$" means the problem is necessarily hard to
  solve, rather than recognizing $NP$ is defined by verification ease.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 3, language contamination)**: "NP" is colloquially used, incorrectly, as a
  casual synonym for "very hard" or "computationally intractable" in everyday discourse, and that
  informal usage contaminates the technical term's actual, narrower, verification-based
  definition.
- **Repair**: re-walk the solving-vs-verifying contrast for SAT explicitly, emphasizing that
  $NP$'s entire definition rests on the ease of CHECKING a proposed answer, regardless of how hard
  finding one might be.

### MC-2: P-NOT-EQUAL-NP-TREATED-AS-PROVEN-FACT
- **Surface form**: treating the widely-believed but formally unproven statement "$P\ne NP$" as an
  established mathematical fact.
- **Frequency band**: Foundational (Blueprint's own declared severity).
- **Root cause (Type 1, overgeneralization)**: overwhelming expert consensus and decades of failed
  search for a counterexample are overgeneralized into "settled," collapsing the genuine
  distinction between strong evidence/belief and formal proof — exactly the pattern
  `math.found.conjecture`'s theorem-vs-conjecture distinction warns against.
- **Repair**: re-state the precise current status — "believed but unproven" — connecting
  explicitly to `math.found.conjecture`'s own theorem-vs-conjecture distinction, already mastered
  in the Foundations domain.

### MC-3: NP-COMPLETE-CONFUSED-WITH-NP-HARD-OR-WITH-ALL-OF-NP
- **Surface form**: using "NP-complete" loosely to mean any hard problem in $NP$, rather than the
  precise definition requiring universal polynomial-time reducibility from every NP problem.
- **Frequency band**: Moderate (Blueprint's own declared severity).
- **Root cause (Type 5, instruction-induced)**: informal classroom shorthand often uses
  "NP-complete" as a loose synonym for "hard problem," without repeatedly drilling the
  two-part formal definition (in $NP$, AND universally reducible from), so the precise
  reduction requirement never gets anchored.
- **Repair**: re-walk the reduction-hub explanation, re-stating the precise two-part definition —
  in $NP$, AND every NP problem reduces to it — and checking the learner can state both parts
  separately.

## Misconceptions

### MC-1: NP-MEMBERSHIP-CONFLATED-WITH-INHERENT-DIFFICULTY
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: P-NOT-EQUAL-NP-TREATED-AS-PROVEN-FACT
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: NP-COMPLETE-CONFUSED-WITH-NP-HARD-OR-WITH-ALL-OF-NP
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A locked box with a combination is like an NP problem: finding the combination might take
  forever, but if someone hands you a candidate combination, checking whether it opens the box is
  instant."**
- **Anti-analogy**: NP-complete does NOT mean "impossible" or "unsolvable" — every NP-complete
  problem IS solvable, just (believed to be) not solvable in polynomial time; and a problem being
  "in $NP$" says nothing by itself about how hard it is to solve from scratch.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for SAT, contrast finding a satisfying assignment from
  scratch (believed exponential) against checking a GIVEN proposed assignment (fast, just
  substitute and evaluate), showing $NP$-membership rests entirely on the checking side.
- **Demonstration 2 (targets MC-2)**: state precisely "most researchers believe $P\ne NP$, but
  this has neither been proven nor disproven" and contrast it with the false claim "$P\ne NP$ has
  been proven."
- **Demonstration 3 (targets MC-3)**: walk the reduction-hub diagram — if SAT had a polynomial
  algorithm, every NP problem (3-coloring, TSP, everything else in $NP$) would too, because each
  reduces to SAT in polynomial time — and ask the learner to state both halves of the NP-complete
  definition separately.

## Discovery Questions
1. "If checking whether a proposed answer to a problem is correct is fast, does that automatically
   tell you anything about how hard it was to FIND that answer in the first place?"
2. "If an efficient algorithm were found for just ONE NP-complete problem, what would that mean for
   every OTHER problem in $NP$?"
3. "Is 'nearly every expert believes $X$' the same statement as 'X has been proven'?"

## Teaching Sequence
1. **Anchor**: connect to `math.disc.algorithm-complexity`'s Big-O framework, framing $P$/$NP$ as
   classifying PROBLEMS by their best-possible algorithms rather than analyzing one given
   algorithm.
2. **Conflict evidence**: the solving-vs-verifying contrast for SAT, breaking the "NP means hard"
   conflation directly.
3. **Contrast pair**: the widely-believed-but-unproven status of $P\ne NP$ versus a false claim
   that it has been proven, echoing `math.found.conjecture`'s own theorem-vs-conjecture
   distinction.
4. **Mastery gate**: require distinguishing solving from verifying, explaining NP-completeness's
   universal-reduction property, and stating the precise open status of $P$ vs. $NP$, at MAMR 4/5.

## Tutor Actions
- Never accept "NP means hard" as a correct definition — always require the learner to state the
  verification-based definition explicitly.
- When a learner states $P\ne NP$ as settled, require them to explicitly distinguish "widely
  believed" from "proven" before accepting the answer.

## Voice Teaching Notes
- Say "hard to find, or hard to check?" whenever a learner conflates solving difficulty with
  $NP$-membership.
- When a learner treats $P\ne NP$ as proven, ask "has anyone actually PROVEN that, or is it just
  very strongly believed?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes "solving" from "verifying" for a given
  problem and correctly states which classes ($P$, $NP$) it belongs to.
- **Rung 2 (application)**: learner correctly explains why an efficient algorithm for one
  NP-complete problem would solve every problem in $NP$.
- **Rung 3 (transfer)**: learner correctly states the precise open status of $P$ vs. $NP$ and
  applies the belief-vs-proof distinction to a new scenario (e.g. cryptographic security
  assumptions).

## Tutor Recovery Strategy
- If MC-1 recurs, re-run the solving-vs-verifying contrast for SAT.
- If MC-2 recurs, re-state the precise "believed but unproven" status, re-connecting to
  `math.found.conjecture`.
- If MC-3 recurs, re-walk the reduction-hub explanation, checking both halves of the definition
  separately.

## Memory Hooks
- "NP is about checking, not finding."
- "NP-complete: in NP, AND everything else in NP reduces to it — both halves, not just one."
- "Believed is not proven — $P\ne NP$ is still open."

## Transfer Connections
- `math.disc.algorithm-complexity` (already authored): supplies the Big-O/worst-case complexity
  framework this concept applies to classify problems rather than individual algorithms.
- `math.found.conjecture` (already authored, CERTIFIED domain): supplies the theorem-vs-conjecture,
  belief-vs-proof distinction this concept's Teaching Action directly reuses and applies to the
  $P$ vs. $NP$ question — a genuine cross-domain closing of the loop back to Foundations.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.disc.complexity-classes.md`, reused by
  reference for its three worked examples (solving vs. verifying for SAT, the reduction-hub
  argument, the open status of $P$ vs. $NP$) and its three-misconception registry (birth types
  independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (cryptographic
  security resting on hard-to-solve-but-easy-to-verify problems, and a junior engineer's overclaim
  that belief in $P\ne NP$ mathematically guarantees security forever).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires, unlocks none,
  cross_links none, expert/analyze, mastery_threshold 0.7, estimated_hours 7) was directly
  verified against the live KG and matches exactly.
- **Genuine cross-domain cross-link substantively incorporated**: `math.found.conjecture`,
  certified in the math.found domain, is confirmed authored (`ls` check) and its theorem-vs-
  conjecture distinction is directly reused as this concept's own Teaching Action A03/MC-2 repair,
  not merely flagged as a forward reference.

## Version History
- 2026-09-13 (Batch 70): authored. Unblocked by `math.disc.algorithm-complexity` (Batch 69).
  Companion batch concepts: `math.disc.ogf`, `math.disc.egf`. `math.disc` moves toward **31/32**
  this batch — only `graph-representation` remains, blocked on unauthored `math.linalg.matrix`.

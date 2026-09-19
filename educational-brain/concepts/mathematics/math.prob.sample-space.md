# math.prob.sample-space

## Identity
- **KG id**: `math.prob.sample-space`
- **Domain**: math.prob
- **Requires**: `math.found.set-theory`
- **Unlocks**: `math.prob.probability-axioms`
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
Define the SAMPLE SPACE $\Omega$ as the SET of all possible outcomes of a random experiment
(finite, countably infinite, or uncountable), reusing `math.found.set-theory`'s own set language
directly; recognize an EVENT as any subset $A\subseteq\Omega$, with set operations (union,
intersection, complement) applying directly to events; and recognize that $\Omega$ is chosen
based on the QUESTION being asked, not fixed uniquely by the physical experiment alone.

## Core Understanding
$\Omega$ IS A GENUINE SET, NOT MERELY AN INFORMAL LIST: the sample space $\Omega$ collects every
possible outcome of a random experiment, with each element $\omega\in\Omega$ an elementary
outcome. Because $\Omega$ is a set (`math.found.set-theory`'s own object, never just a
list), every set-theoretic tool applies directly: an event is a subset $A\subseteq\Omega$, its
complement $A^c=\Omega\setminus A$ is always well-defined, and $P(A^c)=1-P(A)$ works ONLY because
this complement is genuinely well-defined via set subtraction — a mere "list" of outcomes has no
such guaranteed complement.

$\Omega$ CAN BE FINITE, COUNTABLY INFINITE, OR UNCOUNTABLE — PROBABILITY WORKS FOR ALL THREE: a
coin flip gives finite $\Omega=\{H,T\}$; rolling a die until the first 6 gives countably infinite
$\Omega=\{1,2,3,\dots\}=\mathbb N$; picking a uniform random real in $[0,1]$ gives uncountable
$\Omega=[0,1]$. For uncountable $\Omega$, $P(\{\omega\})=0$ for any single outcome $\omega$ — NOT
a contradiction, since probabilities are assigned to EVENTS (measurable subsets), not individual
points: $P([0,0.5])=0.5$ even though every single point has probability exactly 0.

THE SAME EXPERIMENT CAN HAVE DIFFERENT VALID SAMPLE SPACES, DEPENDING ON THE QUESTION: rolling one
die can have $\Omega=\{1,2,3,4,5,6\}$ (if the exact number matters) or $\Omega=\{\text{even},
\text{odd}\}$ (if only parity matters) — both are genuinely valid, chosen to match the level of
detail the question requires, never fixed uniquely by the physical action alone.

## Mental Models
- **"$\Omega$ is the library's complete catalogue before any question about a specific book can
  be answered — nothing missing, nothing duplicated."**
- **"The sample space is chosen to answer a QUESTION, not dictated by the experiment alone — the
  same die roll can have several equally valid $\Omega$'s."**

## Why Students Fail

### MC-1: SAMPLE-SPACE-OUTCOMES-LABELED
- **Surface form**: treats the sample space as merely an informal list of outcomes, missing that
  $\Omega$ is a genuine SET with set operations (union, intersection, complement) applying
  directly.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity —
  elementary probability writes down outcomes informally, "heads, tails," without the formal
  set-theoretic frame ever being made explicit).
- **Repair**: re-anchor on $\Omega$ as a set directly, showing $P(A^c)=1-P(A)$ only works because
  $A^c=\Omega\setminus A$ is well-defined.

### MC-2: SAMPLE-SPACE-MUST-BE-FINITE
- **Surface form**: believes probability only works for finite $\Omega$, rejecting Ω = ℕ or
  Ω = [0,1] as invalid.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — elementary
  probability exercises use only finite sample spaces like dice and coins).
- **Repair**: re-walk the countably-infinite and uncountable examples directly, confirming
  probability is fully defined for both.

### MC-3: SAMPLE-SPACE-UNIQUE
- **Surface form**: believes there is only one correct sample space for a given experiment.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — school problems
  typically present a single "the" sample space, obscuring that $\Omega$ depends on the question
  asked).
- **Repair**: re-walk two different valid $\Omega$'s for the same physical experiment, chosen for
  different questions.

## Misconceptions

### MC-1: SAMPLE-SPACE-OUTCOMES-LABELED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: SAMPLE-SPACE-MUST-BE-FINITE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: SAMPLE-SPACE-UNIQUE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Ω is the library's full catalogue — searching for a specific book (probability of an event)
  without it first being defined is searching a collection you haven't specified."**
- **Anti-analogy**: an uncountable Ω does NOT break probability — individual points having
  probability 0 is expected, not a paradox, once probability is assigned to measurable sets
  rather than to points.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: for $\Omega=\{H,T\}$ (coin flip), the event "Heads occurs"
  is $A=\{H\}\subseteq\Omega$, and $A^c=\Omega\setminus\{H\}=\{T\}$ — set subtraction gives the
  complement directly, machinery a mere "list" would lack.
- **Demonstration 2 (targets MC-2)**: rolling a die repeatedly until the first 6 gives
  $\Omega=\{1,2,3,\dots\}$ (countably infinite: $\omega=k$ means the first 6 appears on the
  $k$-th roll) — probability (a geometric distribution) is fully defined here, no finiteness
  required.
- **Demonstration 3 (targets MC-3)**: rolling one die can validly use $\Omega=\{1,\dots,6\}$ (if
  the exact number matters) or $\Omega=\{\text{even},\text{odd}\}$ (if only parity matters) — both
  describe the same physical roll, chosen to match different questions.

## Discovery Questions
1. "Is the sample space just an informal list of outcomes, or does it have additional
   mathematical structure?"
2. "Can a random experiment have infinitely many possible outcomes, or must $\Omega$ always be
   finite?"
3. "Is there only one correct sample space for rolling a single die?"

## Teaching Sequence
1. **Anchor**: connect to `math.found.set-theory`'s own set language ($\in,\subseteq,\cup,\cap,
   \setminus$), framing $\Omega$ as a genuine set from the start.
2. **Conceptual shift**: Demonstration 1's complement computation, isolating MC-1 by requiring
   $\Omega$ be treated as a set with well-defined operations.
3. **Contrast pair**: Demonstration 2's countably-infinite case, isolating MC-2 by confirming
   probability works beyond finite $\Omega$.
4. **Contrast pair**: Demonstration 3's two valid $\Omega$'s for one die roll, isolating MC-3 by
   showing the question — not the experiment alone — determines $\Omega$.
5. **Mastery gate**: require a correctly written $\Omega$ for a new experiment, a correct
   event/complement/union computation, and a correct recognition that multiple valid $\Omega$'s
   can exist for one experiment, at the Blueprint's own stated pass criterion of 6/6 (⌈0.9×6⌉).

## Tutor Actions
- Never accept $\Omega$ described as merely "a list" — require it stated and used as a genuine
  set.
- Never accept "probability only works for finite Ω" without a countably-infinite or uncountable
  counterexample.

## Voice Teaching Notes
- Say "is that a list or a set — does it support union, intersection, and complement directly?"
  whenever $\Omega$ is introduced informally.
- When a sample space is proposed, ask "what question is this Ω meant to answer — could a
  different question need a different Ω for the same experiment?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly writes $\Omega$ for a new experiment as a genuine
  set.
- **Rung 2 (application)**: learner correctly computes an event's complement, union, or
  intersection using set operations on $\Omega$.
- **Rung 3 (transfer)**: learner correctly distinguishes an elementary outcome from an event for a
  NEW experiment, and correctly proposes two different valid $\Omega$'s for the same physical
  setup.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on $\Omega$ as a set directly, showing the complement computation.
- If MC-2 recurs, re-walk the countably-infinite or uncountable example directly.
- If MC-3 recurs, re-walk two valid $\Omega$'s for the same experiment, chosen for different
  questions.

## Memory Hooks
- "Ω is a set, not a list — that's what makes complement, union, and intersection well-defined."
- "Infinite and uncountable sample spaces are normal, not exceptions."
- "The question decides Ω — the same experiment can have more than one valid sample space."

## Transfer Connections
- `math.found.set-theory` (already authored): supplies the set language ($\in,\subseteq,\cup,
  \cap,\setminus$) this concept directly applies to outcomes and events.
- `math.prob.probability-axioms` (not yet authored): the KG's declared unlock, assigning
  probabilities to the events (subsets of $\Omega$) this concept defines.
- `math.prob.event`, `math.prob.probability-measure` (not yet authored): the KG's declared child
  concepts, both requiring $\Omega$ to be defined first.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.sample-space.md`, reused by reference
  for its library-catalogue analogy, its three-type (finite/countably-infinite/uncountable)
  sample-space pattern, its Ω-vs-event contrast table, and its three-misconception registry
  (severity levels and trigger conditions adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining the
  3-coin-flip sample space, the "exactly 2 heads" event as a subset, the elementary-outcome-versus
  -event distinction, and the event's complement.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.found.set-theory`, unlocks `math.prob.probability-axioms`, cross_links none,
  developing/understand, mastery_threshold 0.9, estimated_hours 2) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 97): authored. Second entry this batch, opening the `math.prob` domain (0/49
  → 1/49). Companion batch concept: `math.linalg.linear-independence`.

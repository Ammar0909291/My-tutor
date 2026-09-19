# math.prob.probability-measure

## Identity
- **KG id**: `math.prob.probability-measure`
- **Domain**: math.prob
- **Requires**: `math.prob.event`
- **Unlocks**: `math.prob.probability-axioms`
- **Cross-links**: `math.meas.measure` (not yet authored — verified via `ls`; independence mode
  used, see Blueprint References)
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 2

## Learning Objective
State that a probability measure assigns every event $A$ a number $P(A)\in[0,1]$ — a decimal or
fraction, NEVER a percentage-scale number like 60 or 75; apply the complement rule $P(A^c)=1-P(A)$
(derived from $P(\Omega)=1$ and $A\cup A^c=\Omega$); and apply the GENERAL addition rule
$P(A\cup B)=P(A)+P(B)-P(A\cap B)$, recognizing the mutually-exclusive-only sum rule as a special
case, never the general one.

## Core Understanding
PROBABILITY LIVES IN $[0,1]$, NEVER ON A PERCENTAGE SCALE: reusing `math.prob.event`'s own event
notation directly, a probability measure $P$ assigns each event $A\subseteq\Omega$ a number
$P(A)\in[0,1]$. For a jar of 3 red and 7 blue marbles, $P(\text{red})=3/10=0.3$ — NOT 3, not 30,
not "30%". Everyday language ("70% chance") must be CONVERTED (divide by 100: $70\%\to0.70$)
before it functions as a probability; a value outside $[0,1]$ (like 70, 1.3, or $-0.2$) is never
valid.

THE COMPLEMENT RULE FOLLOWS DIRECTLY FROM $P(\Omega)=1$: since $A$ and $A^c$ are mutually
exclusive (`math.prob.event`'s own complement notion) and $A\cup A^c=\Omega$, the mutually-
exclusive addition axiom gives $P(A)+P(A^c)=P(\Omega)=1$, so $P(A^c)=1-P(A)$ — never $1+P(A)$ or
$P(A)$ itself. Applying $P(\emptyset)=0$ follows the same way: $\Omega$ and $\emptyset$ are
mutually exclusive with $\Omega\cup\emptyset=\Omega$, giving $P(\Omega)+P(\emptyset)=P(\Omega)=1
\Rightarrow P(\emptyset)=0$.

THE GENERAL ADDITION RULE SUBTRACTS THE OVERLAP; THE PLAIN SUM IS ONLY A SPECIAL CASE: for events
$A,B$, $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ — the overlap $A\cap B$ is counted once in $P(A)$ and
again in $P(B)$, so subtracting it once corrects the double-count. Only when $A,B$ are mutually
exclusive ($A\cap B=\emptyset$, so $P(A\cap B)=0$) does this reduce to the familiar $P(A\cup B)=
P(A)+P(B)$ — that simpler rule is a SPECIAL CASE learned first, never the general one.

## Mental Models
- **"Probability is always a point on the [0,1] number line — a percentage must be divided by 100
  before it can even be plotted there."**
- **"Adding P(A) and P(B) double-counts whatever they share — subtracting the overlap once is
  what makes the total correct, not optional."**

## Why Students Fail

### MC-1: PROBABILITY-AS-PERCENTAGE
- **Surface form**: writes $P(A)=60$ or $P(A)=75\%$ instead of $0.60$.
- **Birth type**: Type 3, language contamination (Blueprint's own declared FOUNDATIONAL severity
  — everyday "chance" and "percentage" language is used interchangeably with "probability",
  obscuring the mathematical $[0,1]$ scale).
- **Repair**: re-anchor on a $[0,1]$ number line, converting any percentage by dividing by 100.

### MC-2: COMPLEMENT-ERROR
- **Surface form**: writes $P(A^c)=1+P(A)$, or $P(A^c)=P(A)$, or omits the complement rule
  entirely.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — "complement"
  read as "the opposite" without connecting it to the specific derivation from $P(\Omega)=1$).
- **Repair**: re-derive $P(A^c)=1-P(A)$ directly from $P(A)+P(A^c)=P(\Omega)=1$.

### MC-3: ADDITION-FORMULA-ALWAYS-SUM
- **Surface form**: always writes $P(A\cup B)=P(A)+P(B)$, even when $A\cap B\ne\emptyset$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — the
  mutually-exclusive rule is often the first version learned and locked in as the general rule).
- **Repair**: re-derive the general formula, showing the overlap is double-counted without the
  subtraction.

## Misconceptions

### MC-1: PROBABILITY-AS-PERCENTAGE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: COMPLEMENT-ERROR
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: ADDITION-FORMULA-ALWAYS-SUM
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A probability is a mark on a ruler that only goes from 0 to 1 — a percentage is a mark on a
  different ruler entirely, and must be rescaled before it fits."**
- **Anti-analogy**: $P(A\cup B)=P(A)+P(B)$ is NOT always correct — it only holds in the special
  case where $A$ and $B$ share nothing.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: a 70% chance of rain converts to $P(\text{rain})=70\div100=
  0.70$ — not 70; only $0.85$ (not 85, not 1.05, not $-0.2$) is a valid probability among a set of
  candidates.
- **Demonstration 2 (targets MC-2)**: for $P(A)=0.7$, $P(A^c)=1-0.7=0.3$, checked directly:
  $0.7+0.3=1$ ✓ — never $1+0.7=1.7$ or $P(A^c)=0.7$ itself.
- **Demonstration 3 (targets MC-3)**: for $P(A)=0.5,P(B)=0.4,P(A\cap B)=0.2$: the WRONG sum
  $0.5+0.4=0.9$ double-counts the overlap; the CORRECT $P(A\cup B)=0.5+0.4-0.2=0.7$ subtracts it
  once.

## Discovery Questions
1. "A forecast says '70% chance of rain.' Is $P(\text{rain})=70$ correct?"
2. "If $P(A)=0.7$, is $P(A^c)=1.7$, or $0.7$, or something else?"
3. "Is $P(A\cup B)=P(A)+P(B)$ always correct, even when $A$ and $B$ share outcomes?"

## Teaching Sequence
1. **Anchor**: connect to `math.prob.event`'s own event/complement/union/intersection notation,
   framing probability as a number assigned to each event.
2. **Conceptual shift**: Demonstration 1's percentage-to-decimal conversion, isolating MC-1 by
   requiring the $[0,1]$ scale explicitly.
3. **Contrast pair**: Demonstration 2's complement derivation, isolating MC-2 by requiring the
   $P(\Omega)=1$-based derivation, not a guessed rule.
4. **Contrast pair**: Demonstration 3's overlap-correction, isolating MC-3 by requiring the
   general formula, with the plain sum reserved for the mutually-exclusive special case.
5. **Mastery gate**: require a correctly scaled probability assignment, a correctly derived
   complement, and a correctly applied general addition rule, at the Blueprint's own stated pass
   criterion of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept a probability value outside $[0,1]$, or expressed as a raw percentage number.
- Never accept $P(A\cup B)=P(A)+P(B)$ without first confirming $A\cap B=\emptyset$.

## Voice Teaching Notes
- Say "is that a percentage or a probability — has it been converted to the [0,1] scale?"
  whenever a probability value is stated.
- When a union probability is computed, ask "did you check whether the events overlap before
  adding?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly converts a percentage or everyday-language chance
  into a valid $[0,1]$ probability.
- **Rung 2 (application)**: learner correctly computes a complement or a union probability for a
  new pair of events, applying the general formula rather than the special-case sum by default.
- **Rung 3 (transfer)**: learner correctly diagnoses an error in a claimed probability assignment
  for a NEW scenario, citing the specific violated rule.

## Tutor Recovery Strategy
- If MC-1 recurs, re-anchor on the $[0,1]$ number line, converting any percentage directly.
- If MC-2 recurs, re-derive the complement rule from $P(\Omega)=1$ directly.
- If MC-3 recurs, re-derive the general addition rule, showing the double-count directly.

## Memory Hooks
- "Probability is always between 0 and 1 — percentages must be divided by 100 first."
- "Complement subtracts from 1, never adds to it."
- "Union subtracts the overlap — the plain sum only works when there's nothing to subtract."

## Transfer Connections
- `math.prob.event` (already authored, this campaign): supplies the event, complement, union, and
  intersection notation this concept assigns probability values to directly.
- `math.prob.probability-axioms` (not yet authored): the KG's declared unlock, formalizing the
  three Kolmogorov axioms this concept's rules are built from.

## Cross-Subject Connections
- None formal — `math.meas.measure` is declared as a cross-link in the KG but is not yet authored
  (confirmed via `ls`), so this entry uses independence mode per the established convention.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.probability-measure.md`, reused by
  reference for its marble-jar percentage-to-decimal conversion, its complement derivation from
  $P(\Omega)=1$, its overlap-correction contrast table, and its three-misconception registry
  (severity levels and root causes both adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  fair die's even-number and prime-number events, their probabilities, intersection, general
  union, and complement.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.prob.event`,
  unlocks `math.prob.probability-axioms`, cross_links `math.meas.measure`, developing/understand,
  mastery_threshold 0.9, estimated_hours 2) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-18 (Batch 98): authored. Second entry this batch (chained after `math.prob.event` in
  the same batch, since it requires `event` directly). `math.prob` moves 1/49 → **3/49** this
  batch (both `event` and `probability-measure` authored).

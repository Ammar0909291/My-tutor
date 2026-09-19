# math.de.convolution-theorem

## Identity
- **KG id**: `math.de.convolution-theorem`
- **Domain**: math.de
- **Requires**: `math.de.laplace-transform`
- **Unlocks**: none
- **Cross-links**: `math.fnal.convolution` (Blueprint's own Component 7 declared this concept
  authored, checked via `ls docs/curriculum/blueprints/` — this checked the wrong corpus; the
  EDUCATIONAL-BRAIN corpus (`educational-brain/concepts/mathematics/`) does NOT yet have this
  concept authored — corrected to independence mode, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 4

## Learning Objective
Recognize the Laplace convolution $(f*g)(t)=\int_0^tf(\tau)g(t-\tau)\,d\tau$ as the general
convolution operation SPECIALIZED to causal functions (zero for negative arguments — why the
general integral collapses to $[0,t]$); state and VERIFY (never merely cite) the Convolution
Theorem $\mathcal{L}\{f*g\}(s)=F(s)G(s)$; and apply the theorem in its practically MOST USEFUL
direction — recovering an inverse Laplace transform of a product WITHOUT partial-fraction
decomposition.

## Core Understanding
LAPLACE CONVOLUTION'S $[0,t]$ LIMITS FOLLOW DIRECTLY FROM CAUSALITY — NEVER A SEPARATELY-INVENTED
CONVENTION: for causal $f(t)=e^t\cdot\mathbb{1}_{t\ge0}$ and $g(t)=e^{2t}\cdot\mathbb{1}_{t\ge0}$:
the general convolution integral over ALL real $y$ has integrand zero whenever $y<0$ (since
$g(y)=0$) OR $y>t$ (since then $f(t-y)=0$) — collapsing the integration range to EXACTLY $[0,t]$.
This is the SAME general operation restricted by causality, never a new, unrelated formula.

THE CONVOLUTION THEOREM IS A VERIFIABLE EQUALITY — NEVER AN UNCONFIRMED ASSUMPTION TO CITE
WITHOUT CHECKING: for $f(t)=e^t,g(t)=e^{2t}$: computing $(f*g)(t)=e^{2t}\int_0^te^{-\tau}d\tau=
e^{2t}-e^t$ directly, then $\mathcal{L}\{e^{2t}-e^t\}(s)=1/(s-2)-1/(s-1)=1/[(s-1)(s-2)]$.
Separately: $F(s)G(s)=\frac1{s-1}\cdot\frac1{s-2}=\frac1{(s-1)(s-2)}$ — MATCHING exactly, verifying
the theorem concretely rather than taking it on faith.

THE THEOREM'S PRIMARY PRACTICAL USE IS INVERSE — NEVER JUST THE FORWARD DIRECTION: to find
$\mathcal{L}^{-1}\{1/[(s-1)(s-2)]\}$: rather than partial fractions, RECOGNIZE
$F(s)=1/(s-1)=\mathcal{L}\{e^t\}$ and $G(s)=1/(s-2)=\mathcal{L}\{e^{2t}\}$ directly, so
$\mathcal{L}^{-1}\{F(s)G(s)\}=(f*g)(t)=e^{2t}-e^t$ — matching the partial-fraction answer exactly
but obtained by RECOGNIZING known transforms and convolving, sidestepping the coefficient-solving
algebra entirely.

## Mental Models
- **"Laplace convolution's [0,t] limits aren't a special rule — they're what causality (zero
  before t=0) forces the general convolution integral to become."**
- **"The Convolution Theorem's biggest payoff runs backward — spot a product of two RECOGNIZABLE
  transforms and convolve, skipping partial fractions."**

## Why Students Fail

### MC-1: LAPLACE-CONVOLUTION-ASSUMED-SEPARATELY-DEFINED
- **Surface form**: believes the Laplace convolution's $[0,t]$ integration limits are a
  separately-invented convention.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the specific $[0,t]$
  limits look like a new formula rather than a specialization of a general one).
- **Repair**: re-walk the direct causal-collapse derivation from the general convolution integral.

### MC-2: CONVOLUTION-THEOREM-UNVERIFIED
- **Surface form**: hasn't genuinely verified the Convolution Theorem's claim on a concrete case,
  treating it as an unconfirmed assumption.
- **Birth type**: High severity (Blueprint's own declared severity — a clean theorem statement
  invites citation without independent verification).
- **Repair**: re-walk the independent computation of both $\mathcal{L}\{f*g\}$ and $F(s)G(s)$,
  confirming they match.

### MC-3: CONVOLUTION-THEOREM-USE-DIRECTION-REVERSED
- **Surface form**: believes the theorem's main practical use is computing the forward transform
  of a known convolution, missing its more common inverse-direction application.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the theorem is stated in
  the forward direction, and its inverse-direction utility requires an extra recognition step).
- **Repair**: re-walk the inverse-transform application bypassing partial fractions.

## Misconceptions

### MC-1: LAPLACE-CONVOLUTION-ASSUMED-SEPARATELY-DEFINED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CONVOLUTION-THEOREM-UNVERIFIED
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: CONVOLUTION-THEOREM-USE-DIRECTION-REVERSED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Convolving two transformed signals is like multiplying two recipes' ingredient lists instead
  of physically combining every ingredient step by step — the product IS the combined result,
  already."**
- **Anti-analogy**: the Convolution Theorem is not merely a forward-computation shortcut — its
  biggest practical value is running backward, turning a product into an inverse transform without
  partial fractions.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the causal-collapse derivation for
  $f(t)=e^t,g(t)=e^{2t}$.
- **Demonstration 2 (targets MC-2)**: the independent verification of
  $\mathcal{L}\{f*g\}(s)=F(s)G(s)=1/[(s-1)(s-2)]$.
- **Demonstration 3 (targets MC-3)**: the inverse-transform recovery via recognized standard
  transforms, bypassing partial fractions.

## Discovery Questions
1. "Is the Laplace convolution's [0,t] integration range a special, separately-defined convention,
   or does it follow from causality?"
2. "Does computing a convolution's Laplace transform directly actually give the same answer as
   multiplying the two individual transforms?"
3. "Is the Convolution Theorem's main practical use computing the forward transform of a
   convolution, or recovering an inverse transform of a product?"

## Teaching Sequence
1. **Representation shift**: the causal-collapse derivation, working Demonstration 1, isolating
   MC-1.
2. **Conflict evidence**: the independent verification of both sides of the theorem, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: the inverse-direction application versus partial fractions, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct causality-based derivation of the convolution limits, a
   correct independent verification of the theorem, and a correct inverse-transform recovery via
   convolution, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the Laplace convolution's $[0,t]$ limits described as a separately-invented
  convention.
- Never accept the Convolution Theorem cited without independent verification on a concrete case.
- Never accept the theorem's main practical use described as only the forward direction.

## Voice Teaching Notes
- Say "why exactly [0,t]?" whenever the Laplace convolution's limits are introduced.
- When a product of transforms needs inverting, ask "can you recognize both pieces as known
  transforms and convolve, instead of doing partial fractions?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly derives the causal collapse from the general
  convolution definition.
- **Rung 2 (application)**: learner correctly verifies the Convolution Theorem on a concrete pair
  of functions.
- **Rung 3 (transfer)**: learner correctly applies the theorem's inverse direction to a
  signal-processing scenario, explaining why causality is essential to the simple multiplication
  trick.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the causal-collapse derivation.
- If MC-2 recurs, re-walk the independent both-sides verification.
- If MC-3 recurs, re-walk the inverse-transform application.

## Memory Hooks
- "The [0,t] limits come from causality — not a separate invention."
- "Verify the theorem, don't just cite it — both sides genuinely match."
- "The theorem's best trick runs backward: recognize, then convolve, skip partial fractions."

## Transfer Connections
- `math.de.laplace-transform` (already authored, this campaign, Batch 156): supplies the
  transform this concept's convolution theorem directly connects to, and its own already-computed
  standard transforms reused in worked examples.
- `math.de.laplace-properties` (companion batch concept): the KG's declared related concept, the
  linearity/shifting property toolkit built alongside this concept.
- `math.fnal.convolution` (not yet authored in this campaign): the KG's declared cross-link,
  supplying the general convolution definition this concept's causal specialization builds on.

## Cross-Subject Connections
- Signal processing: system output as the convolution of input and impulse response.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.convolution-theorem.md`, reused by
  reference for its causal-collapse derivation, its independent both-sides verification, its
  inverse-transform application, and its three-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own probe (independence mode here pending
  `math.fnal.convolution`'s authoring), applying the Convolution Theorem to a signal-processing
  system's input/impulse-response relationship.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Wrong-corpus cross-link discrepancy found and corrected**: the Blueprint's own Component 7
  claims `math.fnal.convolution` is "confirmed ALREADY authored," checked via
  `ls docs/curriculum/blueprints/` — but that command checks the BLUEPRINTS directory, where the
  concept's Blueprint does exist, not the EDUCATIONAL-BRAIN corpus
  (`educational-brain/concepts/mathematics/`), where it does NOT yet exist. This is the established
  "wrong-corpus" discrepancy category from this campaign's discipline — corrected to independence
  mode here; the P76 transfer probe stays independence until `math.fnal.convolution` is genuinely
  authored in this EB corpus. All other fields (requires `math.de.laplace-transform`, unlocks
  none, expert/apply, mastery_threshold 0.8, estimated_hours 4) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 157): authored. Second entry this batch. Companion batch concept:
  `math.de.laplace-properties`.

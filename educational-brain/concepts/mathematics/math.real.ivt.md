# math.real.ivt

## Identity
- **KG id**: `math.real.ivt`
- **Domain**: math.real
- **Requires**: `math.real.connectedness`, `math.real.continuity-rigorous`
- **Unlocks**: none
- **Cross-links**: `math.calc.ivt` (Blueprint-claimed as "not yet authored," correct when the
  Blueprint was written — but NOW authored, verified via `ls`; upgraded to a GENUINE cross-link
  probe, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
State the Intermediate Value Theorem formally (if $f:[a,b]\to\mathbb R$ is continuous and
$f(a)<c<f(b)$, then $\exists x\in(a,b)$ with $f(x)=c$), recognizing its PROOF as `math.real.
connectedness`'s own corollary, not new work; APPLY IVT to prove a root exists purely via a sign
change, WITHOUT solving for or approximating the root; and recognize the informal "a continuous
curve can't jump over a value" picture as a correct intuition, but NOT itself a proof.

## Core Understanding
IVT'S PROOF IS NOT NEW WORK — IT IS CONNECTEDNESS'S OWN COROLLARY, CITED RATHER THAN RE-DERIVED:
`math.real.connectedness` already established (1) continuous images of connected sets are
connected, and (2) connected subsets of $\mathbb R$ are exactly the intervals. Applying these to
$S=[a,b]$ (connected, being an interval): $f([a,b])$ is connected, hence an interval. Since
$f(a),f(b)\in f([a,b])$, EVERY value $c$ strictly between them is also in $f([a,b])$ — some
$x\in(a,b)$ satisfies $f(x)=c$. This IS the proof; this concept's job is naming the theorem and
using it, not re-deriving what connectedness already proved.

EXISTENCE IS NOT THE SAME TASK AS COMPUTATION: for $f(x)=x^3-x-1$: $f(1)=-1<0$, $f(2)=5>0$. Since
$f$ is continuous on $[1,2]$ and $f(1)<0<f(2)$, IVT guarantees some $x\in(1,2)$ with $f(x)=0$ — a
COMPLETE rigorous existence proof, with NO algebraic solving or approximation. IVT guarantees a
root exists but says nothing about WHERE beyond $(1,2)$, nor how to find it — those are separate
tasks.

THE INFORMAL "CAN'T JUMP" PICTURE IS A CORRECT INTUITION, NEVER ITSELF A PROOF: "a continuous
curve from $(1,-1)$ to $(2,5)$ can't jump over 0 without crossing it" feels obviously true, but
stating it that way is CIRCULAR — it restates IVT's conclusion as a picture without justifying WHY
continuity forbids the jump. The connectedness-based argument supplies the actual justification:
$f([1,2])$ must be an interval (a connected subset of $\mathbb R$), and an interval containing
$-1$ and $5$ cannot skip $0$ by definition of "interval" — the picture is a correct intuition
pump, but the interval-structure argument is what makes it a proof.

## Mental Models
- **"IVT isn't a new theorem to prove from scratch — it's what connectedness looks like when
  applied specifically to [a,b]."**
- **"Proving something exists and finding where it is are two completely separate jobs — IVT only
  ever does the first."**

## Why Students Fail

### MC-1: IVT-ASSUMED-TO-NEED-SEPARATE-PROOF
- **Surface form**: believes IVT requires new argument beyond `math.real.connectedness`'s own
  connectedness-preservation theorem.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a named, famous
  theorem naturally feels like it should have its own dedicated proof, obscuring that it's a
  direct corollary of already-established machinery).
- **Repair**: re-walk the direct citation of connectedness's two facts applied to $[a,b]$.

### MC-2: IVT-ASSUMED-TO-REQUIRE-COMPUTATION
- **Surface form**: believes an IVT-based existence proof also requires finding or approximating
  the value it guarantees exists.
- **Birth type**: High severity (Blueprint's own declared severity — "proving something exists"
  and "finding it" feel like naturally coupled tasks in most everyday reasoning).
- **Repair**: re-walk the zero-computation cubic root-existence proof.

### MC-3: INFORMAL-PICTURE-ASSUMED-TO-BE-A-PROOF
- **Surface form**: believes the "continuous curve can't jump over a value" picture is itself a
  valid proof.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the picture feels
  self-evidently true, obscuring that it restates the conclusion rather than justifying it).
- **Repair**: re-walk the circularity diagnosis and the interval-structure argument that actually
  closes the gap.

## Misconceptions

### MC-1: IVT-ASSUMED-TO-NEED-SEPARATE-PROOF
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: IVT-ASSUMED-TO-REQUIRE-COMPUTATION
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: INFORMAL-PICTURE-ASSUMED-TO-BE-A-PROOF
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"IVT is like discovering that a general rule you already proved (connectedness) happens to
  answer a famous specific question — not a brand-new investigation."**
- **Anti-analogy**: "the curve can't jump" is NOT a justification — it's a restatement of the
  conclusion dressed up as an explanation, unless backed by the actual interval-structure
  argument.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: IVT for $\cos x$ on $[0,\pi]$, cited directly from
  connectedness's two facts with zero new proof work.
- **Demonstration 2 (targets MC-2)**: the cubic $x^3-x-1$'s root-existence proof in $(1,2)$, with
  no algebraic solving.
- **Demonstration 3 (targets MC-3)**: the circularity of the informal picture, resolved by the
  interval-containing-$-1$-and-$5$-cannot-skip-$0$ argument.

## Discovery Questions
1. "Does proving IVT require new argument beyond what connectedness already established?"
2. "Does applying IVT to prove a root exists also require finding or approximating that root's
   value?"
3. "Is the informal 'continuous curves can't skip values' picture, by itself, a valid proof of
   IVT?"

## Teaching Sequence
1. **Representation shift**: the direct citation of connectedness's two facts applied to $[a,b]$,
   isolating MC-1.
2. **Conflict evidence**: the zero-computation cubic existence proof, isolating MC-2.
3. **Contrast pair**: the informal picture versus the interval-structure justification, isolating
   MC-3.
4. **Mastery gate**: require a correct formal statement of IVT, a correct citation-based
   explanation of its proof, a correct sign-change-only existence argument for a new function, and
   a correct diagnosis of what the informal picture is missing, at the Blueprint's own stated MAMR
   of 5/5 (⌈0.9×5⌉).

## Tutor Actions
- Never accept IVT's proof re-derived from scratch rather than cited from connectedness.
- Never accept an IVT existence proof padded with unnecessary root computation or approximation.
- Never accept the informal "can't jump" picture presented as a complete proof.

## Voice Teaching Notes
- Say "is that a new proof, or is it exactly what connectedness already gives you?" whenever
  IVT's justification is discussed.
- When a root's existence is proven via IVT, ask "did you solve for it, or did you only need the
  sign change?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states IVT formally and cites its connectedness-
  based proof without re-deriving it.
- **Rung 2 (application)**: learner correctly proves a new function's root exists via a
  sign-change argument alone.
- **Rung 3 (transfer)**: learner correctly proves a physical intermediate-value claim (e.g. a
  temperature along a rod) via the connectedness-based justification, and explains precisely what
  rigorous fact an informal "can't skip values" claim is silently relying on.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct citation from connectedness's two facts.
- If MC-2 recurs, re-walk the zero-computation cubic existence proof.
- If MC-3 recurs, re-walk the circularity diagnosis and interval-structure justification.

## Memory Hooks
- "IVT isn't proven from scratch — it's connectedness applied to [a,b]."
- "Existence and computation are separate jobs — IVT only ever proves existence."
- "'Can't jump' is a picture, not a proof — the interval-structure argument is what actually
  justifies it."

## Transfer Connections
- `math.real.connectedness` (already authored, this campaign, Batch 127): supplies the complete
  proof machinery (connectedness-preservation; connected subsets of $\mathbb R$ are intervals)
  this concept cites directly.
- `math.real.continuity-rigorous` (already authored, this campaign, Batch 130): supplies the
  $\varepsilon$-$\delta$ continuity definition underlying connectedness's proof premises.
- `math.calc.ivt` (already authored, verified via `ls` — corrected from the Blueprint's stale
  "not yet authored" claim): the KG's declared cross-link, whose own sign-change-based existence
  argument and deferral to `math.num.root-finding` for computation directly parallels this
  concept's rigor-versus-computation framing.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.ivt.md`, reused by reference for its
  connectedness-citation framing, its cubic root-existence example, its informal-picture
  circularity diagnosis, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own content (originally independence-mode, upgraded here to a
  genuine cross-link probe against `math.calc.ivt`), reasoning about a metal rod's intermediate
  temperature via the rigorous connectedness-based justification rather than the informal picture,
  and connecting directly to `math.calc.ivt`'s own sign-change-based existence technique and its
  own explicit existence-versus-computation framing (that concept's own deferral to
  `math.num.root-finding` for actually locating a root).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Blueprint/P76-mode discrepancy found and corrected (reverse direction — the Blueprint's own
  "not yet authored" claim for `math.calc.ivt` was correct when written, but is now stale)**:
  verified via `ls educational-brain/concepts/mathematics/` that `math.calc.ivt` IS now authored.
  Upgraded from independence mode to a GENUINE CROSS-LINK PROBE, directly connecting this
  concept's existence-versus-computation framing to `math.calc.ivt`'s own parallel treatment (its
  sign-change-only root-existence method and its own deferral to `math.num.root-finding` for
  computation) rather than treating the transfer probe as self-contained. All other fields
  (requires `math.real.connectedness`/`math.real.continuity-rigorous`, unlocks none, cross_links
  `math.calc.ivt`, expert/understand, mastery_threshold 0.9, estimated_hours 3) matched exactly.

## Version History
- 2026-09-19 (Batch 131): authored. Second entry this batch, closing out the connectedness
  chain's declared unlock. Companion batch concept: `math.real.extreme-value-theorem`.

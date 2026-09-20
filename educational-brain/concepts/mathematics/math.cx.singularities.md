# math.cx.singularities

## Identity
- **KG id**: `math.cx.singularities`
- **Domain**: math.cx
- **Requires**: `math.cx.analytic-functions`
- **Unlocks**: `math.cx.laurent-series`, `math.cx.residue-theorem`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Classify singularities by ACTUAL LIMITING BEHAVIOR — NEVER assume similarly-looking algebraic
forms (division by zero) share the same singularity type; distinguish poles ($|f|\to\infty$
UNIFORMLY) from essential singularities (wildly path-dependent behavior) — NEVER conflate any
"blows up" behavior with a pole; and apply Riemann's theorem to certify removability via
BOUNDEDNESS ALONE — NEVER require the explicit patch value to be computed first.

## Core Understanding
SINGULARITY TYPE IS DETERMINED BY ACTUAL LIMITING BEHAVIOR — NEVER BY SUPERFICIAL ALGEBRAIC FORM:
$f(z)=\sin z/z$ and $g(z)=1/z^2$ are BOTH "undefined at $z=0$" in the same superficial way
(division by zero). But $\sin z/z\to1$ as $z\to0$ — BOUNDED, a REMOVABLE singularity; while
$|1/z^2|\to\infty$ as $z\to0$ — genuinely unbounded, a POLE. Believing functions with a
similarly-looking "undefined at a point" algebraic form must share the same singularity type,
without checking actual limiting behavior, is WRONG — the SAME superficial situation can hide two
completely different singularity types, distinguishable only by actually tracing the limit.

A POLE REQUIRES $|f|\to\infty$ UNIFORMLY — NEVER CONFLATE ANY "BLOWS UP" BEHAVIOR WITH A POLE: for
$f(z)=e^{1/z}$ at $z_0=0$: along the positive real axis, $e^{1/z}\to\infty$ (blows up); along the
negative real axis, $e^{1/z}\to0$ (vanishes); along the imaginary axis, $e^{1/z}$ OSCILLATES on
the unit circle, never settling. Since $f$ is NEITHER bounded NOR uniformly tending to $\infty$,
this is an ESSENTIAL singularity — NOT a pole. Believing any singularity where $f$ "blows up" or
behaves badly must be a pole is WRONG — a genuine pole requires $|f|\to\infty$ ALONG EVERY
approach path, never just some; wildly path-dependent behavior (different limits, or no limit at
all, along different paths) signals an ESSENTIAL singularity instead.

RIEMANN'S THEOREM CERTIFIES REMOVABILITY VIA BOUNDEDNESS ALONE — NEVER REQUIRING THE EXPLICIT
PATCH VALUE FIRST: Riemann's Removable Singularity Theorem states an isolated singularity is
removable IF AND ONLY IF $f$ is bounded near $z_0$ — this is a COMPLETE test requiring no
construction of the actual patch. Believing a singularity cannot be certified as removable until
the specific patching value is explicitly computed is WRONG — Riemann's theorem's own content IS
that boundedness ALONE suffices; the theorem certifies removability without needing to construct
or even know the patch value in advance.

## Mental Models
- **"Near an isolated singularity, a function can only behave in one of three fundamentally
  different ways — the algebraic form tells you almost nothing; you must trace the actual limit."**
- **"A genuine pole needs |f|→∞ along EVERY path — if even one path disagrees (bounded, zero, or
  oscillating), it's essential, not a pole."**
- **"Riemann's theorem is a complete test: bounded near z₀ means removable, full stop — no need to
  find the patch value first."**

## Why Students Fail

### MC-1: SINGULARITY-TYPE-ASSUMED-FROM-SUPERFICIAL-FORM
- **Surface form**: believes functions with a similarly-looking "undefined at a point" algebraic
  form (e.g. division by zero) must share the same singularity type, without checking actual
  limiting behavior.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — surface-
  level algebraic similarity is a natural but misleading heuristic).
- **Repair**: work through both limiting-behavior computations explicitly, showing genuinely
  different outcomes despite similar algebraic appearance.

### MC-2: POLE-AND-ESSENTIAL-SINGULARITY-CONFLATED
- **Surface form**: believes any singularity where $f$ "blows up" or behaves badly must be a pole,
  not distinguishing a genuine pole from an essential singularity.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — "badly behaved"
  is a coarse category that obscures the pole-versus-essential distinction).
- **Repair**: re-derive by checking multiple approach paths, showing the behavior is not uniformly
  $\to\infty$.

### MC-3: REMOVABLE-SINGULARITY-REQUIRES-EXPLICIT-PATCH-VALUE
- **Surface form**: believes a singularity cannot be certified as removable until the specific
  patching value is explicitly computed, not recognizing Riemann's theorem allows certification
  via boundedness alone.
- **Birth type**: instruction-induced (Blueprint's own declared moderate severity — "removable"
  sounds like it requires actually performing the removal).
- **Repair**: re-anchor on Riemann's theorem's precise statement — boundedness ALONE is the
  complete iff condition.

## Misconceptions

### MC-1: SINGULARITY-TYPE-ASSUMED-FROM-SUPERFICIAL-FORM
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: POLE-AND-ESSENTIAL-SINGULARITY-CONFLATED
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: REMOVABLE-SINGULARITY-REQUIRES-EXPLICIT-PATCH-VALUE
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A removable singularity is like a pothole you can pave over smoothly — the road (function)
  was always meant to be flat there, you just need to fill in the one missing spot."**
- **Anti-analogy**: an essential singularity isn't just "an extreme pole" — a pole blows up the
  same way from every direction, while an essential singularity refuses to settle on any single
  behavior at all, no matter how you approach it.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\sin z/z$-versus-$1/z^2$ same-form-different-type
  contrast.
- **Demonstration 2 (targets MC-2)**: the $e^{1/z}$ three-path (positive real, negative real,
  imaginary) essential-singularity diagnosis.
- **Demonstration 3 (targets MC-3)**: Riemann's theorem stated as a boundedness-only test.

## Discovery Questions
1. "Since both sin(z)/z and 1/z² are undefined at z=0 in the same superficial way, must they have
   the same type of singularity?"
2. "Does any singularity where f 'blows up' have to be a pole?"
3. "Can you certify a singularity as removable without computing the specific patching value?"

## Teaching Sequence
1. **Representation shift**: work $\sin z/z$ (removable) and $1/z^2$ (pole) side by side, isolating
   MC-1.
2. **Contrast pair**: work $e^{1/z}$'s three-path essential-singularity diagnosis, isolating MC-2;
   state Riemann's theorem as a formal boundedness test, isolating MC-3.
3. **Mastery gate**: require a correct classification for a removable case, a correct
   classification for a pole, a correct path-based classification for an essential singularity,
   and a correct explanation of why Riemann's theorem needs no explicit patch value, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a singularity type inferred from algebraic form alone without a limiting-behavior
  check.
- Never accept "blows up" used interchangeably with "pole" without checking uniformity across
  approach paths.
- Never accept removability withheld pending an explicit patch-value computation.

## Voice Teaching Notes
- Say "what does the function actually DO as z approaches that point — not what the formula looks
  like?" whenever a singularity type is claimed.
- Ask "does it blow up along every path, or just some?" whenever a pole is claimed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a removable singularity using the
  boundedness test.
- **Rung 2 (application)**: learner correctly classifies a pole and computes its order.
- **Rung 3 (transfer)**: learner correctly diagnoses an essential singularity via multiple
  approach-path limits and rebuts a claim that superficially similar functions share a singularity
  type.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\sin z/z$-versus-$1/z^2$ contrast.
- If MC-2 recurs, re-derive via multiple approach paths for $e^{1/z}$.
- If MC-3 recurs, re-anchor on Riemann's theorem's boundedness-only test.

## Memory Hooks
- "Algebraic form tells you almost nothing — trace the actual limit."
- "A pole needs |f|→∞ along EVERY path — essential singularities disagree by direction."
- "Riemann's theorem: bounded near z₀ means removable, full stop — no patch value needed."

## Transfer Connections
- `math.cx.analytic-functions` (prerequisite, already authored, this campaign): supplies the
  holomorphic/analytic baseline behavior a singularity is a departure from.

## Cross-Subject Connections
- Electrical engineering: transfer function poles directly determine a circuit's resonant
  frequencies and stability, with removable singularities corresponding to apparent (but not
  physically real) problem frequencies.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.singularities.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a circuit transfer function
  $T(s)=(s^2-4)/(s-2)$, determining removability via algebraic simplification and boundedness, and
  rebutting a claim that superficially similar denominators imply the same singularity type.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.analytic-functions`, unlocks `math.cx.laurent-series`/`math.cx.residue-theorem`,
  cross_links none, expert/analyze, mastery_threshold 0.85, estimated_hours 5) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 241): authored. Second entry this batch. Companion batch concept:
  `math.cx.cauchy-integral-formula`.

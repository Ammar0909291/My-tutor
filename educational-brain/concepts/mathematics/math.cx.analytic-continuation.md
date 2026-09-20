# math.cx.analytic-continuation

## Identity
- **KG id**: `math.cx.analytic-continuation`
- **Domain**: math.cx
- **Requires**: `math.cx.identity-theorem`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.7
- **Estimated hours**: 7

## Learning Objective
Recognize continuation is achieved by RE-CENTERING the Taylor series — NEVER assuming a
holomorphic function can always be continued to cover all of $\mathbb{C}$; recognize uniqueness
guarantees the RESULT, never the CONSTRUCTION — the re-centering work is genuine computation; and
recognize MONODROMY as a genuine subtlety — NEVER assuming a closed loop back to the starting
point must return the original value.

## Core Understanding
CONTINUATION IS RE-CENTERING, NEVER GUARANTEED TO REACH ALL OF $\mathbb{C}$: for $f(z)=\sum
z^n=1/(1-z)$ (originally $|z|<1$), re-expanding around $z_0=-1/2$: $1/(1-z)=\sum(z-z_0)^n/
(1-z_0)^{n+1}$, valid for $|z-z_0|<3/2$ — reaching $z=-1.9$, OUTSIDE the original disk. The new
disk's radius is still FINITE, determined by distance to the nearest singularity ($z=1$).
Believing a holomorphic function can always be continued to cover all of $\mathbb{C}$, no matter
what, is WRONG — genuine obstructions (singularities, natural boundaries) can block continuation
entirely in certain directions.

UNIQUENESS GUARANTEES THE RESULT — NEVER THE CONSTRUCTION: for two independently-claimed
continuations of $f(z)=1/(1-z)$ to $\mathbb{C}\setminus\{1\}$, both agreeing with $f$ on the
original disk: by the identity theorem, they MUST be identical everywhere on
$\mathbb{C}\setminus\{1\}$ — there is no room for two genuinely different valid answers. But this
guarantee does NOT do the re-centering arithmetic; Example 1's computation (finding the new
Taylor coefficients) is still genuine, required work. Believing that since the identity theorem
guarantees the continuation is unique, finding it requires no real computation is WRONG —
uniqueness certifies the answer once found; it does not compute it for you.

MONODROMY IS A GENUINE SUBTLETY — NEVER "SAME POINT MEANS SAME VALUE": continuing $\log z$
starting at $z=1$ ($\log1=0$) counterclockwise around the unit circle back to $z=1$: tracking
$\log z=\ln|z|+i\arg z$ with $\arg z$ increasing continuously from $0$ to $2\pi$, the continued
value at the end is $2\pi i$ — NOT the starting value $0$, even though the path returned to the
SAME point. Believing continuation along a closed loop back to a starting point must return the
original value is WRONG — encircling a singularity (like $\log z$'s branch point at $0$) genuinely
changes the continued value; this is monodromy, distinct from (and not a violation of) the
identity theorem's uniqueness guarantee, which applies only within a domain not requiring
encirclement.

## Mental Models
- **"The function never changes — only the center of the Taylor series describing it does, and a
  new center can reach points the original series never covered."**
- **"Uniqueness certifies the destination, not the journey — re-centering the series is still
  real arithmetic you have to do."**
- **"Encircling a singularity breaks the 'same point, same value' intuition — the path matters,
  not just the endpoint, whenever an obstruction sits inside the loop."**

## Why Students Fail

### MC-1: CONTINUATION-ALWAYS-POSSIBLE-EVERYWHERE
- **Surface form**: believes a holomorphic function can always be continued to cover all of
  $\mathbb{C}$, missing that genuine obstructions can block continuation entirely.
- **Birth type**: foundational (Blueprint's own declared severity — "extending the domain"
  sounds unbounded, obscuring that each individual re-centering step still has a finite radius).
- **Repair**: re-walk Example 1, noting the new disk's radius remains finite, set by the nearest
  singularity.

### MC-2: UNIQUENESS-IMPLIES-AUTOMATIC-CONSTRUCTION
- **Surface form**: conflates the identity theorem's guarantee that the continuation's result is
  unique with the belief that finding it requires no real computation.
- **Birth type**: high severity (Blueprint's own declared severity — "unique" and "automatic" are
  easy to blur together without a concrete computation to anchor the distinction).
- **Repair**: re-walk the $z_0=-1/2$ re-centering arithmetic explicitly.

### MC-3: RETURN-TO-SAME-POINT-IMPLIES-SAME-VALUE
- **Surface form**: believes continuation along a closed loop back to a starting point must
  return the original value, missing monodromy.
- **Birth type**: moderate severity (Blueprint's own declared severity — the identity theorem's
  own uniqueness guarantee, just learned, is easy to over-extend to loop-based continuation).
- **Repair**: re-walk the $\log z$ loop-around-the-origin computation giving $2\pi i$, not $0$.

## Misconceptions

### MC-1: CONTINUATION-ALWAYS-POSSIBLE-EVERYWHERE
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: UNIQUENESS-IMPLIES-AUTOMATIC-CONSTRUCTION
- **Surface form**: as described above.
- **Root cause (high severity)**: as described above.
- **Repair**: as described above.

### MC-3: RETURN-TO-SAME-POINT-IMPLIES-SAME-VALUE
- **Surface form**: as described above.
- **Root cause (moderate severity)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Analytic continuation is like relaying a message by re-writing it in your own words at each
  new listener — the message (function) is the same, but each retelling (re-centering) reaches a
  new audience (domain) determined by how far that listener's own knowledge (radius of
  convergence) extends."**
- **Anti-analogy**: uniqueness of the continuation isn't a shortcut past the arithmetic — it's a
  guarantee ABOUT the arithmetic's outcome, not a replacement for doing it.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $1/(1-z)$ re-centering-around-$z_0=-1/2$ computation
  reaching outside the original disk.
- **Demonstration 2 (targets MC-2)**: the two-independently-claimed-continuations
  identity-theorem-forced-agreement scenario.
- **Demonstration 3 (targets MC-3)**: the $\log z$ loop-around-the-origin monodromy computation.

## Discovery Questions
1. "Can a holomorphic function always be continued to cover all of ℂ, no matter what?"
2. "Since the identity theorem guarantees the continuation is unique, does that mean finding it
   requires no real computation?"
3. "If you continue a function along a closed loop back to its starting point, must you get back
   the original value?"

## Teaching Sequence
1. **Representation shift**: work the $1/(1-z)$ re-centering computation, isolating MC-1.
2. **Conflict evidence**: work the two-continuations-forced-identical scenario, isolating MC-2.
3. **Contrast pair**: work the $\log z$ monodromy loop computation, isolating MC-3.
4. **Mastery gate**: require a correct explanation of overlapping-disk continuation and the
   identity theorem's role, a correct explanation of why an entire function has no continuation
   left to perform, a correct general description of re-centering at a new point, and a correct
   explanation of why a loop around the origin breaks "same point, same value" for $\log z$, at
   the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a claim that continuation can always reach all of $\mathbb{C}$ regardless of
  singularities.
- Never accept uniqueness treated as eliminating the need for actual re-centering computation.
- Never accept a claim that a closed-loop continuation must return the original value regardless
  of encircled singularities.

## Voice Teaching Notes
- Say "what's blocking the radius of convergence from reaching further?" whenever a continuation's
  extent is discussed.
- Ask "does uniqueness mean you don't have to compute anything?" whenever the identity theorem is
  invoked for continuation.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly re-centers a Taylor series and identifies the new
  radius of convergence's limiting obstruction.
- **Rung 2 (application)**: learner correctly explains why two independently-found continuations
  agreeing on the original domain must coincide, citing the identity theorem.
- **Rung 3 (transfer)**: learner correctly explains why the Riemann zeta function's continuation
  is possible and unique, and refutes the naive claim that $\zeta(-1)$ comes from plugging $s=-1$
  into the original divergent series.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the finite-radius-determined-by-nearest-singularity argument.
- If MC-2 recurs, re-walk the re-centering arithmetic.
- If MC-3 recurs, re-walk the $\log z$ monodromy loop.

## Memory Hooks
- "Re-centering the series is the mechanism — never a guarantee of reaching all of ℂ."
- "Uniqueness certifies the result — never replaces the arithmetic."
- "Encircling a singularity breaks same-point-same-value — that's monodromy."

## Transfer Connections
- `math.cx.identity-theorem` (prerequisite, already authored, this campaign): supplies the
  uniqueness argument this concept's entire construction-versus-guarantee distinction relies on,
  directly extending that concept's own $1/(1-z)$ discussion.

## Cross-Subject Connections
- Analytic number theory: the Riemann zeta function's continuation to nearly all of $\mathbb{C}$
  (except a pole at $s=1$) via exactly this concept's overlapping-disk mechanism underlies the
  entire study of $\zeta(s)$'s behavior outside its original convergence region.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.analytic-continuation.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on the Riemann zeta function's
  continuation and refuting the naive $\zeta(-1)=1+2+3+\cdots$ claim.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.identity-theorem`, unlocks none, cross_links none, research/analyze, mastery_threshold
  0.7, estimated_hours 7) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 249): authored. Second entry this batch. Companion batch concept:
  `math.cx.conformal-mapping`.

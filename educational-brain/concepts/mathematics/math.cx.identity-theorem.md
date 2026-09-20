# math.cx.identity-theorem

## Identity
- **KG id**: `math.cx.identity-theorem`
- **Domain**: math.cx
- **Requires**: `math.cx.power-series-cx`
- **Unlocks**: `math.cx.analytic-continuation`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Recognize the theorem requires agreement on a set with a LIMIT POINT — NEVER merely infinitely
many agreement points; recognize CONNECTEDNESS of the domain as essential — NEVER assume the
conclusion holds on a disconnected domain; and recognize any two valid analytic continuations to
a connected domain must COINCIDE — NEVER assume continuations could genuinely differ.

## Core Understanding
THE THEOREM REQUIRES A LIMIT POINT — NEVER MERELY INFINITELY MANY AGREEMENT POINTS: $\sin(\pi z)$
vanishes at every integer — INFINITELY many zeros — yet the integers have NO limit point in
$\mathbb{C}$ (they escape to infinity; every finite disk contains only finitely many). The
identity theorem does NOT force $\sin(\pi z)\equiv0$, and indeed it isn't
($\sin(\pi/2)=1\neq0$). Contrast: $f(z)=\sin(2z)$ and $g(z)=2\sin z\cos z$ agree at EVERY real
$z$ — and EVERY real number IS a limit point of $\mathbb{R}$ within $\mathbb{C}$ — so the theorem
DOES force $f\equiv g$ on all of $\mathbb{C}$. Believing infinitely many agreement points is
AUTOMATICALLY sufficient is WRONG — the points must have a LIMIT POINT INSIDE the domain, not
merely be infinite in count.

CONNECTEDNESS OF THE DOMAIN IS ESSENTIAL — NEVER ASSUME THE CONCLUSION HOLDS ON A DISCONNECTED
DOMAIN: let $D$ be two disjoint disks, one at $0$ and one at $10$. Define $f\equiv0$ on the first
disk, $f\equiv1$ on the second (holomorphic on each component separately); let $g\equiv0$
throughout $D$. Then $f=g$ on the ENTIRE first disk (abundant limit points) yet $f\neq g$ on the
second disk. This does NOT violate the theorem — $D$ is NOT connected, so there is no unbroken
path of overlapping disks for the agreement to "spread" along. Believing the identity theorem's
conclusion holds even when $D$ is disconnected is WRONG — agreement on one connected component has
no path to reach a different component.

TWO VALID ANALYTIC CONTINUATIONS TO A CONNECTED DOMAIN MUST COINCIDE — NEVER ASSUME THEY COULD
GENUINELY DIFFER: if two mathematicians each extend $f(z)=1/(1-z)$ (from the unit disk) to the
larger CONNECTED domain $\mathbb{C}\setminus\{1\}$, both extensions AGREE with $f$ on the unit
disk — a set with abundant limit points, sitting inside the larger connected domain. The identity
theorem FORCES the two extensions to be IDENTICAL everywhere on $\mathbb{C}\setminus\{1\}$.
Believing a holomorphic function might have multiple genuinely different valid analytic
continuations to a larger connected domain is WRONG — any two such continuations agreeing on the
original limit-point-rich domain are forced by the identity theorem to coincide everywhere.

## Mental Models
- **"Checking equality at every point isn't necessary — a much smaller set, as long as it has a
  limit point inside the domain, forces equality everywhere the domain is connected."**
- **"Agreement spreads through an unbroken path of overlapping disks — a disconnected domain has
  no path from one piece to another."**
- **"Without a connected domain, agreement has nowhere to spread — and that's exactly why a valid
  continuation to a connected domain is forced to be unique."**

## Why Students Fail

### MC-1: INFINITE-AGREEMENT-SUFFICIENT
- **Surface form**: believes that infinitely many agreement points between $f$ and $g$ is
  automatically sufficient for the identity theorem, missing that the points must have a LIMIT
  POINT inside the domain.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — "infinite"
  sounds like it should be a strong enough condition on its own).
- **Repair**: re-walk the $\sin(\pi z)$-integer-zeros counterexample against the real-axis success
  case.

### MC-2: CONNECTEDNESS-NOT-REQUIRED
- **Surface form**: believes the identity theorem's conclusion holds even when the domain $D$ is
  disconnected, missing that agreement on one connected component has no path to "spread" to
  another.
- **Birth type**: instruction-induced (Blueprint's own declared high severity — connectedness is
  easy to treat as a background technicality rather than a load-bearing hypothesis).
- **Repair**: re-walk the disconnected two-disk counterexample.

### MC-3: CONTINUATION-NOT-UNIQUE
- **Surface form**: believes a holomorphic function might have multiple genuinely different valid
  analytic continuations to a larger connected domain, missing that the identity theorem forces
  any two such continuations to coincide.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — "continuation"
  sounds like a creative extension process that could plausibly branch).
- **Repair**: re-walk the continuation-uniqueness argument from the two-disk construction's
  absence of a "second piece" in a connected domain.

## Misconceptions

### MC-1: INFINITE-AGREEMENT-SUFFICIENT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: CONNECTEDNESS-NOT-REQUIRED
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: CONTINUATION-NOT-UNIQUE
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A limit point is like a crowd genuinely converging on one spot — infinitely many people
  scattered to the horizon (like the integers) never converge on any single meeting place."**
- **Anti-analogy**: agreement on a disconnected domain isn't a weaker version of global
  agreement — it's simply silent about the other piece entirely, with nothing forcing the two
  pieces to match.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $\sin(2z)=2\sin z\cos z$ real-axis limit-point success.
- **Demonstration 2 (targets MC-1)**: the $\sin(\pi z)$-integer-zeros no-limit-point failure.
- **Demonstration 3 (targets MC-2, MC-3)**: the disconnected two-disk domain and its continuation-
  uniqueness consequence.

## Discovery Questions
1. "If two entire functions agree at infinitely many points, must they be identical everywhere?"
2. "Does the identity theorem's conclusion still hold if the domain D is a union of two separate,
   disjoint disks?"
3. "Could two mathematicians validly find two different correct analytic continuations of the
   same function to the same larger connected domain?"

## Teaching Sequence
1. **Representation shift**: work the real-axis limit-point success example.
2. **Conflict evidence**: work the $\sin(\pi z)$-integer no-limit-point counterexample, isolating
   MC-1.
3. **Contrast pair**: work the disconnected two-disk construction, isolating MC-2 and MC-3.
4. **Mastery gate**: require a correct statement of all three hypotheses, a correct
   limit-point-identification exercise, a correct explanation of why connectedness is required,
   and a correct continuation-uniqueness argument, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept an infinite agreement set treated as automatically sufficient without checking for
  a limit point.
- Never accept the identity theorem's conclusion applied to a disconnected domain.
- Never accept a claim that two valid analytic continuations to the same connected domain could
  genuinely differ.

## Voice Teaching Notes
- Say "does that agreement set actually have a limit point inside the domain?" whenever the
  identity theorem is invoked.
- Ask "is the domain actually connected?" whenever agreement is claimed to spread across it.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies whether a given agreement set has a limit
  point in the domain.
- **Rung 2 (application)**: learner correctly explains why connectedness is required using the
  two-disk counterexample.
- **Rung 3 (transfer)**: learner correctly distinguishes a limit-point-rich sequence from an
  escaping sequence and explains why two candidate continuations must coincide.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $\sin(\pi z)$-integer-zeros counterexample.
- If MC-2 recurs, re-walk the disconnected two-disk construction.
- If MC-3 recurs, re-derive the continuation-uniqueness argument.

## Memory Hooks
- "A limit point inside the domain is required — infinitely many points alone is never enough."
- "Agreement spreads only through a connected domain — a disconnected piece is untouched."
- "Two valid continuations to a connected domain are forced to be the same function."

## Transfer Connections
- `math.cx.power-series-cx` (prerequisite, already authored, this campaign): supplies the
  holomorphic⟺locally-equal-to-Taylor-series fact this concept's local-to-global propagation
  argument directly builds on.

## Cross-Subject Connections
- Number theory: the Riemann zeta function's analytic continuation relies directly on this
  concept's uniqueness guarantee — there is only one way to extend it beyond its original domain
  of convergence.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.identity-theorem.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own independence-mode probe distinguishing a limit-point-rich
  sequence ($1/n$) from an escaping sequence (integers), and extending the analysis to a
  non-entire holomorphic function on a disk.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.power-series-cx`, unlocks `math.cx.analytic-continuation`, cross_links none,
  expert/understand, mastery_threshold 0.85, estimated_hours 4) was directly verified against the
  live KG and matches exactly.

## Version History
- 2026-09-20 (Batch 240): authored. Second entry this batch. Companion batch concept:
  `math.cx.cauchy-theorem`.

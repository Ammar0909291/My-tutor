# Teaching Blueprint: Fundamental Group (`math.top.fundamental-group`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.fundamental-group` |
| name | Fundamental Group |
| domain | Topology |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.top.homotopy`, `math.abst.group-theory` |
| unlocks | `math.top.covering-space`, `math.top.van-kampen` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert-tier learner already fluent in homotopy and group axioms; $\pi_1$ is introduced directly as their fusion (homotopy classes of loops, made into a group via concatenation) |
| description (KG) | π₁(X,x₀) = homotopy classes of loops based at x₀, with concatenation. π₁(S¹)=ℤ; π₁(Sⁿ)=0 for n≥2; π₁(torus)=ℤ². The fundamental group classifies the 'holes' in 1D that loops can detect. Simply connected: π₁={e}. |

## Component 1 — Learning Objectives

- LO1: Define a **loop based at $x_0$** as a continuous map $\gamma:[0,1]\to X$ with $\gamma(0)=\gamma(1)=x_0$, and define $\pi_1(X,x_0)$ as the set of **based homotopy classes** of such loops — refining `math.top.homotopy`'s general homotopy $H(x,t)$ with $H(x,0)=f(x)$, $H(x,1)=g(x)$ into the STRICTER requirement that, for loop homotopies, $H(0,t)=H(1,t)=x_0$ for **every** $t\in[0,1]$ (every intermediate stage must ALSO be a loop based at $x_0$, not merely a map matching the right endpoints at $t=0,1$).
- LO2: Define the **group operation** on $\pi_1(X,x_0)$ as concatenation of loops, $(\gamma_1\ast\gamma_2)(s) = \gamma_1(2s)$ for $s\le1/2$, $\gamma_2(2s-1)$ for $s\ge1/2$, with identity the constant loop $e(s)=x_0$ and inverse $\gamma^{-1}(s)=\gamma(1-s)$ (traversed backward) — and recognize that concatenation is associative only **up to based homotopy**, not as literal function equality, which is exactly why `math.abst.group-theory`'s axioms are stated for **homotopy classes** $[\gamma]$, not for individual loops themselves.
- LO3 (orientation level — full derivations deferred to `math.top.covering-space`, which this concept unlocks): state and apply the classical computed values $\pi_1(S^1)\cong\mathbb{Z}$ (loops classified by winding number), $\pi_1(S^n)=0$ for $n\ge2$, and $\pi_1(\text{torus})\cong\mathbb{Z}^2$, and correctly interpret **simply connected** ($\pi_1(X,x_0)=\{e\}$, the trivial group) as meaning specifically that every loop-detectable, 1-dimensional "hole" is absent — not that the space has no interesting topology of any kind at all.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.homotopy` (two continuous maps $f,g:X\to Y$ are homotopic via a continuous $H:X\times[0,1]\to Y$ with $H(x,0)=f(x)$, $H(x,1)=g(x)$; homotopy is an equivalence relation; checking continuity of the WHOLE map $H$, not just pointwise interpolation) and `math.abst.group-theory` (a group is a set with a binary operation satisfying closure, associativity, identity, and inverse axioms G1-G4).

## Component 3 — Core Explanation

**Loops and based homotopy — a stricter refinement of `math.top.homotopy`**: a loop based at $x_0$ is a continuous map $\gamma:[0,1]\to X$ with $\gamma(0)=\gamma(1)=x_0$ — both "endpoints" of the parameter interval land at the SAME point $x_0$. Two loops $\gamma_1,\gamma_2$ based at $x_0$ are considered the SAME element of $\pi_1(X,x_0)$ exactly when they are related by a **based homotopy**: a continuous $H:[0,1]\times[0,1]\to X$ with $H(s,0)=\gamma_1(s)$, $H(s,1)=\gamma_2(s)$ (matching `math.top.homotopy`'s ordinary endpoint conditions) **AND**, crucially, $H(0,t)=H(1,t)=x_0$ for **every** $t\in[0,1]$ — every intermediate stage of the deformation must ITSELF be a loop based at $x_0$, not merely a map that happens to agree with $\gamma_1$ and $\gamma_2$ at the two extreme values $t=0,1$. This is a genuinely stronger condition than `math.top.homotopy`'s plain notion, exactly parallel to how that concept itself insisted on JOINT continuity of $H$ rather than merely checking the two endpoint conditions.

**The group structure: concatenation, up to homotopy**: $\pi_1(X,x_0)$ becomes a group (in `math.abst.group-theory`'s sense) using **concatenation** as its operation: $(\gamma_1\ast\gamma_2)(s)$ traverses $\gamma_1$ during $s\in[0,1/2]$ (at double speed) then $\gamma_2$ during $s\in[1/2,1]$ (also at double speed) — a new loop based at $x_0$, since both pieces start and end there. The identity element is the class of the **constant loop** $e(s)=x_0$ for all $s$ (concatenating with it just adds a "pause," homotopic to not pausing at all); the inverse of $[\gamma]$ is $[\gamma^{-1}]$, the SAME path traversed backward ($\gamma^{-1}(s)=\gamma(1-s)$), since traversing a loop and then immediately undoing it is based-homotopic to the constant loop (continuously shrink the "there-and-back" motion toward $x_0$). **Associativity holds only up to based homotopy, never as literal function equality**: $(\gamma_1\ast\gamma_2)\ast\gamma_3$ and $\gamma_1\ast(\gamma_2\ast\gamma_3)$ traverse the SAME three loops in the SAME order, but at genuinely DIFFERENT speed schedules (different breakpoints in $[0,1]$) — as literal functions of $s$, they are NOT equal. They ARE, however, based-homotopic (a reparametrization homotopy continuously slides the breakpoints from one schedule to the other, and every intermediate stage is still a valid loop based at $x_0$) — which is exactly WHY $\pi_1(X,x_0)$ must be defined using homotopy CLASSES $[\gamma]$ as its elements, rather than individual loops: the group axioms (in particular associativity) only hold once loops that differ merely by reparametrization are identified together.

**$\pi_1$ detects specifically 1-dimensional, loop-shaped obstructions**: computed values include $\pi_1(S^1)\cong\mathbb{Z}$ (a loop's winding number around the circle — going around $n$ times, in either direction, gives a genuinely distinct, non-based-homotopic element for each integer $n$, directly extending `math.top.homotopy`'s own finding that the circle's identity map is not homotopic to a constant map), $\pi_1(S^n)=0$ for $n\ge2$ (every loop on a higher sphere CAN be based-homotoped to the constant loop — there's enough "room" to slide any loop off to one side and shrink it, unlike the circle), and $\pi_1(\text{torus})\cong\mathbb{Z}^2$ (two independent, non-based-homotopic "directions" of looping, one around each of the torus's two hole-directions). A space with $\pi_1(X,x_0)=\{e\}$ (the trivial group, just the identity) is called **simply connected** — meaning specifically that every loop CAN be based-homotoped down to a point, i.e. there is no loop-detectable 1-dimensional obstruction. This is a narrower claim than "the space has no interesting topology at all": $\pi_1$ detects only the "holes" that a 1-dimensional loop can wrap around and get stuck on; a space can be simply connected yet still carry other, higher-dimensional topological features entirely invisible to $\pi_1$ alone.

## Component 4 — Worked Examples

**Example 1 (LO1 — a valid based homotopy, straight-line shrink)**: In $X=\mathbb{R}^2$ with $x_0=(0,0)$, let $\gamma(s)=(4s(1-s),0)$ — check $\gamma(0)=(0,0)=x_0$, $\gamma(1)=(0,0)=x_0$ ✓, a genuine loop based at the origin (it travels out to $(1,0)$ at $s=1/2$ and back). Define $H(s,t)=(1-t)\gamma(s)$. Endpoints: $H(s,0)=\gamma(s)$ ✓, $H(s,1)=(0,0)$ (the constant loop) ✓. Check the STRICTER condition: $H(0,t)=(1-t)\gamma(0)=(1-t)(0,0)=(0,0)$ for **every** $t$ ✓, and likewise $H(1,t)=(0,0)$ for every $t$ ✓ — every intermediate stage genuinely IS a loop based at the origin, confirming this is a valid based homotopy from $\gamma$ to the constant loop.

**Example 2 (LO1 — a candidate that satisfies plain endpoints but fails the based condition, breaking MC-1)**: In $X=S^1$ with $x_0=(1,0)$, let $\gamma(s)=(\cos2\pi s,\sin2\pi s)$ (the once-around loop, based at $x_0$ since $\gamma(0)=\gamma(1)=(1,0)$). Consider the candidate $H(s,t)=(\cos2\pi(s+t),\sin2\pi(s+t))$ — a "rotate the whole loop" family. Check the PLAIN endpoint conditions from `math.top.homotopy`: $H(s,0)=\gamma(s)$ ✓, and $H(s,1)=(\cos2\pi(s+1),\sin2\pi(s+1))=(\cos2\pi s,\sin2\pi s)=\gamma(s)$ ✓ (a full rotation returns to the same loop) — so far this looks like a valid homotopy from $\gamma$ to itself. But checking the STRICTER based condition: $H(0,t)=(\cos2\pi t,\sin2\pi t)$ — this is **NOT** constantly $(1,0)$; at $t=1/2$, for instance, $H(0,1/2)=(\cos\pi,\sin\pi)=(-1,0)\neq x_0$. The basepoint drifts all the way around the circle during the deformation. Despite satisfying `math.top.homotopy`'s plain endpoint conditions perfectly, $H$ is **NOT** a valid based homotopy for $\pi_1$ purposes — the loop's basepoint must stay fixed at $x_0$ throughout, and here it doesn't.

**Example 3 (LO2 — associativity up to homotopy, not literal equality, breaking MC-2)**: For any three loops $\gamma_1,\gamma_2,\gamma_3$ based at $x_0$: $(\gamma_1\ast\gamma_2)\ast\gamma_3$ traverses $\gamma_1$ on $[0,\frac14]$, $\gamma_2$ on $[\frac14,\frac12]$, $\gamma_3$ on $[\frac12,1]$, while $\gamma_1\ast(\gamma_2\ast\gamma_3)$ traverses $\gamma_1$ on $[0,\frac12]$, $\gamma_2$ on $[\frac12,\frac34]$, $\gamma_3$ on $[\frac34,1]$ — as literal functions of $s$, these disagree almost everywhere (e.g. at $s=0.3$, the first traverses $\gamma_2$ while the second is still traversing $\gamma_1$). They ARE based-homotopic, however: a reparametrization homotopy $H(s,t)$ continuously slides the two breakpoints from $(\frac14,\frac12)$ to $(\frac12,\frac34)$ as $t$ runs $0\to1$, and since every intermediate breakpoint schedule still produces a map starting and ending at $x_0$ (all three loops individually do), $H(0,t)=H(1,t)=x_0$ holds throughout. So $[(\gamma_1\ast\gamma_2)\ast\gamma_3]=[\gamma_1\ast(\gamma_2\ast\gamma_3)]$ as elements of $\pi_1(X,x_0)$ (homotopy CLASSES), even though the underlying loops are literally different functions — exactly why `math.abst.group-theory`'s associativity axiom (G2) is verified for classes $[\gamma]$, never for individual loops directly.

## Component 5 — Teaching Actions

### Teaching Action A01 — Loops, and the Stricter "Stays-at-Basepoint" Homotopy Condition (Primitive P11: Representation Shift)

State: "`math.top.homotopy` only pinned down $H$ at $t=0$ and $t=1$; for loops based at $x_0$, we ALSO require every intermediate stage $H(\cdot,t)$ to itself be a loop based at $x_0$ — a genuinely stronger condition." Work Example 1's full verification, checking the stricter condition explicitly at every step.

### Teaching Action A02 — A Homotopy That Drifts the Basepoint Is Not a Loop-Homotopy (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the "rotate the whole loop" candidate $H$ satisfies `math.top.homotopy`'s plain endpoint conditions perfectly, yet $H(0,t)$ sweeps all the way around the circle rather than staying fixed at $x_0$. State: "matching the two loops at $t=0$ and $t=1$ is necessary but not sufficient for a LOOP homotopy — you must also check that the basepoint itself never moves, at any intermediate $t$."

- **MC-1 hook**: ask "if $H(s,0)=\gamma_1(s)$ and $H(s,1)=\gamma_2(s)$ both check out, is $H$ automatically a valid based homotopy for computing $\pi_1$?" — a "yes" answer reveals MC-1 (applying `math.top.homotopy`'s plain endpoint check without also verifying $H(0,t)=H(1,t)=x_0$ for every $t$).

### Teaching Action A03 — Associativity Up to Homotopy (Not Literal Equality), and What Simply Connected Really Means (Primitive P06: Contrast Pair)

Contrast Example 3's two differently-scheduled concatenations — literally different functions, yet based-homotopic — directly against a literal-equality expectation. State: "$(\gamma_1\ast\gamma_2)\ast\gamma_3$ and $\gamma_1\ast(\gamma_2\ast\gamma_3)$ are different loops as functions, but the SAME element of $\pi_1$ — that's exactly why $\pi_1$'s elements are homotopy classes $[\gamma]$, not individual loops; the group axioms only hold at the level of classes."

- **MC-2 hook**: ask "are $(\gamma_1\ast\gamma_2)\ast\gamma_3$ and $\gamma_1\ast(\gamma_2\ast\gamma_3)$ the exact same function of $s$?" — a "yes" answer reveals MC-2 (missing that associativity is a based-homotopy fact, not a literal function-equality fact).

Then contrast $\pi_1(S^1)\cong\mathbb{Z}$ (nontrivial — genuine loop-detectable holes) against $\pi_1(S^2)=0$ (simply connected). State: "a sphere $S^2$ is simply connected — every loop on it can be shrunk to a point — but that doesn't mean $S^2$ has no interesting topology at all; $\pi_1$ only detects the specific kind of 'hole' a 1-dimensional loop can get stuck on, and a sphere genuinely has none of those, while still having other topological features $\pi_1$ simply can't see."

- **MC-3 hook**: ask "if a space is simply connected, does that mean it has no interesting topological features of any kind?" — a "yes" answer reveals MC-3 (over-generalizing "no loop-detectable 1D holes" to "no topology at all").

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify that $\gamma(s) = (4\sin(2\pi s), 4\sin^2(\pi s))$ (or any loop of your own construction satisfying $\gamma(0)=\gamma(1)=(0,0)$) is a genuine loop based at the origin, and construct a based homotopy from it to the constant loop, checking the stricter condition explicitly.
  2. Explain why $(\gamma_1\ast\gamma_2)\ast\gamma_3$ and $\gamma_1\ast(\gamma_2\ast\gamma_3)$ can be based-homotopic even though they are different functions of $s$ — what does this justify about defining $\pi_1$'s elements as homotopy classes rather than individual loops?
  3. State the value of $\pi_1(S^1,x_0)$ and explain, informally, what the integer associated to a loop represents.
  4. A space $Y$ is known to be simply connected. Explain why this does NOT, by itself, prove that $Y$ has no interesting topological structure whatsoever.
- **P76 (Transfer Probe, mode = independence)**: "A robot navigates a factory floor with several immovable support pillars (obstacles) it must go around. Model the floor as the plane with disks removed (one per pillar), and let $x_0$ be the robot's charging station. (a) Explain, in terms of loops based at $x_0$ and based homotopy, what it would mean for two different patrol routes (each a loop starting and ending at the charging station) to be considered 'the same' route from a topological point of view. (b) If the floor has exactly ONE pillar, explain informally why $\pi_1$ of this floor is analogous to $\pi_1(S^1)\cong\mathbb{Z}$, referencing the winding-number idea. (c) If the floor instead has TWO separate pillars, explain qualitatively (without deriving the full group) why you would expect MORE distinct loop classes than the one-pillar case, connecting this to the torus's $\pi_1\cong\mathbb{Z}^2$ having two independent generators."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BASEPOINT-DRIFT-IN-LOOP-HOMOTOPY-OVERLOOKED | Believing any homotopy H satisfying the plain endpoint conditions H(s,0)=γ1(s), H(s,1)=γ2(s) is automatically a valid loop homotopy, without checking that H(0,t)=H(1,t)=x0 for every t | Foundational |
| MC-2 | CONCATENATION-ASSOCIATIVITY-TREATED-AS-LITERAL-EQUALITY | Believing (γ1∗γ2)∗γ3 and γ1∗(γ2∗γ3) must be the exact same function of s, missing that associativity in π1 holds only up to based homotopy, which is exactly why π1's elements are homotopy classes | Foundational |
| MC-3 | SIMPLY-CONNECTED-OVERGENERALIZED-TO-NO-TOPOLOGY-AT-ALL | Believing a trivial π1 (simply connected) means a space has no interesting topological structure at all, rather than specifically no loop-detectable 1-dimensional holes | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Basepoint Drift in Loop Homotopy Overlooked") → P41 (detect: ask a student to verify a proposed loop homotopy and check whether they stop after confirming only the plain endpoint conditions) → P64 (conceptual shift: re-walk Example 2's rotating-loop candidate, showing $H(0,t)$ sweeping around the whole circle despite valid endpoints, re-anchoring on "always check $H(0,t)=H(1,t)=x_0$ for EVERY $t$, not just $t=0,1$").
- **B02 (targets MC-2)**: P27 (name it: "Concatenation Associativity Treated as Literal Equality") → P41 (detect: ask a student whether $(\gamma_1\ast\gamma_2)\ast\gamma_3$ and $\gamma_1\ast(\gamma_2\ast\gamma_3)$ are literally the same function, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's differing breakpoint schedules and the reparametrization homotopy connecting them, re-anchoring on "the group axioms hold for homotopy CLASSES $[\gamma]$ — different loops that are based-homotopic count as the same group element").
- **B03 (targets MC-3)**: P27 (name it: "Simply Connected Overgeneralized to No Topology at All") → P41 (detect: ask a student whether a simply connected space is guaranteed to have no interesting topology whatsoever, and check for a "yes") → P64 (conceptual shift: re-state the $S^2$ contrast — simply connected (every loop shrinks), yet not devoid of all topological structure — re-anchoring on "$\pi_1$ specifically detects loop-shaped, 1-dimensional obstructions; a trivial $\pi_1$ rules out only THAT kind of hole").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.homotopy` (the plain homotopy $H(x,t)$ and endpoint conditions this concept strengthens into the based/loop-homotopy condition), `math.abst.group-theory` (the four group axioms G1-G4 this concept verifies hold for $\pi_1(X,x_0)$ under concatenation, specifically at the level of homotopy classes).
- **Unlocks**: `math.top.covering-space` (the machinery that actually PROVES the stated computed values like $\pi_1(S^1)\cong\mathbb{Z}$, deferred here per the orientation-level treatment of LO3), `math.top.van-kampen` (a theorem for computing $\pi_1$ of spaces built by gluing simpler pieces together).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (the based-homotopy refinement), A02 (the basepoint-drift counterexample), and A03 (associativity up to homotopy, plus the simply-connected scope caution) each target distinct LOs, appropriate for a concept that fuses two already-mastered prerequisites (homotopy, group axioms) into one new structure rather than introducing entirely new machinery from scratch.
- LO3 (computed values of $\pi_1$ for $S^1$, $S^n$, and the torus, plus "simply connected") is deliberately treated at ORIENTATION level — stated and used, not derived — since actually proving $\pi_1(S^1)\cong\mathbb{Z}$ rigorously requires covering-space theory, which is `math.top.covering-space`, a concept this one UNLOCKS and which is not yet authored; this follows the corpus's established large-scope precedent (`math.cat.limits`, `math.fnal.banach-space`, `math.geom.differential-geometry-curves`) of deferring full derivation to a not-yet-authored downstream concept rather than duplicating that depth prematurely here.
- Example 2's "rotate the whole loop" counterexample was chosen deliberately over a more abstract argument because it is fully explicit and directly checkable by hand (the reader can literally evaluate $H(0,t)$ and see it sweep around the circle), giving MC-1 a concrete, verifiable failure rather than an appeal to intuition alone.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert-tier learner, direct fusion of two mastered prerequisites) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO1, Ex3→LO2; LO3 covered in Core Explanation + A03 + gate) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Analytic Continuation (`math.cx.analytic-continuation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.analytic-continuation` |
| name | Analytic Continuation |
| domain | Complex Analysis |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.cx.identity-theorem` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — research-tier learner already has the identity theorem's uniqueness guarantee from the prerequisite; this concept goes directly to the construction mechanism and its named applications |
| description (KG) | Extending a holomorphic function beyond its original domain of definition by matching power series on overlapping regions. The continuation is unique (identity theorem). Used to define log z, z^α, and the Riemann zeta function on all of ℂ. |

## Component 1 — Learning Objectives

- LO1: Construct an analytic continuation of a holomorphic function $f$ beyond its original domain by **re-expanding its Taylor series around a new center** $z_0$ within the original domain, and recognizing that the new series's own radius of convergence can reach POINTS outside the original domain — with the two series agreeing on their overlapping region (a limit-point-rich set), which is what licenses calling the result a genuine extension.
- LO2: State and apply the **uniqueness of analytic continuation** directly from `math.cx.identity-theorem` — recognizing that finding the continuation (LO1's construction) is genuine work, while the identity theorem guarantees only that the RESULT, once found via a legitimate connected path, cannot come out two different ways.
- LO3 (orientation level — the named applications of the technique): recognize $\log z$, $z^\alpha$, and the Riemann zeta function $\zeta(s)$ as the KG's own named instances of analytic continuation, and recognize **monodromy** — that continuing $\log z$ around a closed loop enclosing the origin does NOT return the original value (it changes by $2\pi i$) — as a genuine subtlety distinct from LO2's uniqueness guarantee, since it arises specifically when a path encircles a singularity.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.identity-theorem` (if $f,g$ holomorphic on a connected domain agree on a set with a limit point in the domain, then $f\equiv g$ throughout; direct consequence: any two valid continuations of a function to the same larger connected domain must coincide).

## Component 3 — Core Explanation

**Continuation by re-expanding around a new center**: given $f$ holomorphic on a disk $D_1$, pick a point $z_0\in D_1$ and expand $f$'s OWN Taylor series around $z_0$ instead of the original center. This new series has its own radius of convergence $R'$ (determined by the distance from $z_0$ to $f$'s nearest singularity) — and $R'$ can be large enough that the new disk $D_2$ (centered at $z_0$, radius $R'$) extends beyond $D_1$'s original boundary in some directions. On the overlapping lens-shaped region $D_1\cap D_2$, both series represent the SAME function $f$ (since both are honest Taylor expansions of $f$ around points inside $D_1$, where $f$ was already defined) — a set with abundant limit points, exactly the hypothesis `math.cx.identity-theorem` needs. Defining $f$ on all of $D_2$ via the new series is therefore a genuine, licensed EXTENSION of $f$'s domain, not merely a re-notation of the same disk.

**Uniqueness is guaranteed, but construction is not automatic**: `math.cx.identity-theorem` guarantees that if two different continuations of $f$ to some larger connected domain both agree with $f$ on the original domain, they must be IDENTICAL throughout — there is only ever one valid continuation to a given connected domain. This is a guarantee about the RESULT, not a shortcut for finding it: actually computing the new center's Taylor coefficients (LO1's re-expansion) is genuine work, and the uniqueness guarantee only certifies that however you legitimately reach a given point (via any valid chain of overlapping disks), you get the same value there.

**Named applications, and monodromy as a genuine subtlety (orientation level)**: $\log z$ (as the inverse of $e^z$) can be continued locally away from $z=0$, and $z^\alpha=e^{\alpha\log z}$ inherits the same subtlety; the Riemann zeta function $\zeta(s)=\sum 1/n^s$, defined originally only for $\mathrm{Re}(s)>1$, is continued to nearly all of $\mathbb{C}$ (except a pole at $s=1$) via this same mechanism — the single most famous instance of the technique. However, continuing $\log z$ along a closed loop that ENCIRCLES the origin (a singularity/branch point) does not return the original value — after one full counterclockwise loop, the continued value has increased by $2\pi i$. This is not a violation of LO2's uniqueness guarantee: uniqueness applies to continuation within one connected domain that does not require encircling the singularity; a loop around $z=0$ forces the "domain" under consideration to no longer be simply connected, and different paths around the obstruction can genuinely reach different values.

## Component 4 — Worked Examples

**Example 1 (LO1 — concrete re-centering, extending beyond the original disk)**: $f(z)=\sum_{n=0}^\infty z^n=\dfrac1{1-z}$, originally defined by this series only for $|z|<1$. Re-expand around $z_0=-\tfrac12$ (inside the original disk): $\dfrac1{1-z}=\dfrac1{(1-z_0)-(z-z_0)}=\dfrac1{1-z_0}\cdot\dfrac1{1-\frac{z-z_0}{1-z_0}}=\sum_{n=0}^\infty\dfrac{(z-z_0)^n}{(1-z_0)^{n+1}}$, valid for $|z-z_0|<|1-z_0|$. Here $1-z_0=\tfrac32$, so the new disk $D_2$ is $|z+\tfrac12|<\tfrac32$ — reaching from $z=-2$ to $z=1$. The point $z=-2$ lies in $D_2$ (since $|-2+\tfrac12|=\tfrac32$ is the boundary, so points just inside, e.g. $z=-1.9$, are covered) but NOT in the original disk $|z|<1$ (since $|-1.9|=1.9>1$) — a genuine extension of $f$'s domain, obtained purely by re-centering the same function's series.

**Example 2 (LO2 — uniqueness, directly citing the identity theorem)**: Two mathematicians each claim to have found a holomorphic continuation of $f(z)=1/(1-z)$ (from Example 1) to the domain $\mathbb{C}\setminus\{1\}$. Both continuations agree with $f$ on the original unit disk $|z|<1$ — a set with abundant limit points, sitting inside the connected domain $\mathbb{C}\setminus\{1\}$. By `math.cx.identity-theorem`, the two continuations MUST be identical everywhere on $\mathbb{C}\setminus\{1\}$ — there is no room for two genuinely different valid answers, exactly as that concept's own final problem previewed.

**Example 3 (LO3, orientation level — monodromy, breaking MC-3)**: Continue $\log z$ starting at $z=1$ (where $\log 1=0$) counterclockwise around the unit circle back to $z=1$. Tracking the continuation along the path, $\log z=\ln|z|+i\arg z$ where $\arg z$ increases continuously from $0$ to $2\pi$ as the loop completes — so the continued value at the end is $\ln 1+i(2\pi)=2\pi i$, NOT the starting value $0$. The loop encircled $z=0$, a singularity of $\log z$; this is why the naive expectation "returning to the same point must give the same value" fails here, in genuine contrast to LO2's uniqueness guarantee, which concerns continuation to one connected domain without encircling an obstruction.

## Component 5 — Teaching Actions

### Teaching Action A01 — Continuation by Re-Centering the Same Series (Primitive P11: Representation Shift)

State: "the function doesn't change — only the CENTER of the Taylor series you use to describe it does, and a new center can have its own radius of convergence reaching points the original series never covered." Work Example 1's full re-centering computation, confirming $z=-2$ is reached by the new series but was outside the original disk.

- **MC-1 hook**: ask "can a holomorphic function always be continued to cover all of $\mathbb C$, no matter what?" — a "yes" answer reveals MC-1 (missing that genuine obstructions — singularities, natural boundaries — can block continuation entirely in certain directions).

### Teaching Action A02 — Uniqueness Guarantees the Result, Not the Construction (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: two independently-claimed continuations, both merely required to agree with $f$ on the original disk, are FORCED by the identity theorem to be the same function everywhere on the larger domain. State: "the identity theorem doesn't do the re-centering work for you — Example 1's computation is still required — but it does guarantee that however you legitimately reach a point, you'll get the same answer."

- **MC-2 hook**: ask "since the identity theorem guarantees the continuation is unique, does that mean finding it requires no real computation?" — a "yes" answer reveals MC-2 (conflating the uniqueness of the RESULT with automatic or effortless construction).

### Teaching Action A03 — Monodromy: Encircling a Singularity Breaks "Same Point, Same Value" (Primitive P06: Contrast Pair)

Contrast Example 2's connected-domain continuation (unique, no ambiguity) against Example 3's loop around $\log z$'s singularity at $0$ (returns to the SAME point $z=1$ with a DIFFERENT value, $2\pi i$ instead of $0$). State: "uniqueness holds for continuation within a domain that doesn't require going around an obstruction — once a path encircles a singularity like $\log z$'s branch point at $0$, the destination point can genuinely be reached with different accumulated values, depending on the path."

- **MC-3 hook**: ask "if you continue a function along a closed loop back to its starting point, must you get back the original value?" — a "yes" answer reveals MC-3 (missing monodromy — that encircling a singularity can change the continued value even though the argument returns to its starting point).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the process of analytic continuation via overlapping disks, and explain what role the identity theorem plays in guaranteeing it produces one well-defined answer when no singularity is encircled.
  2. The entire function $g(z)=\sum z^n/n!$ already converges for every $z\in\mathbb C$ — does "continuing" it to a larger domain make sense? Explain why entire functions have no continuation left to perform.
  3. Given $f(z)=1/(1-z)$ known on $|z|<1$, explain (in general terms, without full computation) how you would find its Taylor series centered at $z_0=\tfrac12+\tfrac{i}4$ instead, and state what determines that new series's radius of convergence.
  4. Explain why continuing $\log z$ around a closed loop enclosing the origin does not return the original value, and what property of the origin (as a point relevant to $\log z$) causes this.
- **P76 (Transfer Probe, mode = independence)**: "The Riemann zeta function $\zeta(s)=\sum_{n=1}^\infty 1/n^s$ converges only for $\mathrm{Re}(s)>1$. Mathematicians have analytically continued it to nearly all of $\mathbb C$ (except a pole at $s=1$). (a) Explain, using this lesson's overlapping-disk mechanism in general terms, why such a continuation is possible in principle. (b) The identity theorem guarantees this continuation, once found, is unique — explain why, in your own words. (c) A student claims $\zeta(-1)$ can simply be computed by plugging $s=-1$ into the original series, giving $1+2+3+\cdots$. Explain what is wrong with this reasoning, given that $\zeta(-1)$ is actually defined via the continuation, not the original series (which diverges at $s=-1$)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONTINUATION-ALWAYS-POSSIBLE-EVERYWHERE | Believing a holomorphic function can always be continued to cover all of $\mathbb C$, missing that genuine obstructions (singularities, natural boundaries) can block continuation entirely in some directions | Foundational |
| MC-2 | UNIQUENESS-IMPLIES-AUTOMATIC-CONSTRUCTION | Conflating the identity theorem's guarantee that the continuation's RESULT is unique with the belief that finding it requires no real computation — the re-centering work is genuine | High |
| MC-3 | RETURN-TO-SAME-POINT-IMPLIES-SAME-VALUE | Believing continuation along a closed loop back to a starting point must return the original value, missing monodromy — encircling a singularity (e.g. $\log z$'s branch point at $0$) can change the continued value | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Continuation Assumed Unlimited") → P41 (detect: ask whether every holomorphic function can be continued to all of $\mathbb C$) → P64 (conceptual shift: re-walk Example 1, noting the new disk still has a FINITE radius determined by distance to the nearest singularity, and re-anchor on "obstructions genuinely block continuation in some directions").
- **B02 (targets MC-2)**: P27 (name it: "Uniqueness Assumed to Mean Automatic") → P41 (detect: ask whether finding a continuation requires real computation, given that it's unique) → P64 (conceptual shift: re-walk Example 1's re-centering arithmetic, re-anchoring on "uniqueness certifies the answer, it doesn't compute it for you").
- **B03 (targets MC-3)**: P27 (name it: "Monodromy Missed") → P41 (detect: ask whether continuing a function around a closed loop must return the original value) → P64 (conceptual shift: re-walk Example 3's $\log z$ loop, re-anchoring on "encircling a singularity is exactly the case where 'same point' does not guarantee 'same value'").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.identity-theorem` (this concept's entire uniqueness argument, Example 2's continuation-uniqueness scenario, and Example 1's re-centering construction directly extend that concept's own $1/(1-z)$ discussion and final problem-set item).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 7 with a research/analyze tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full depth (a concrete re-centering computation and a direct application of the prerequisite's uniqueness theorem) and LO3 kept orientation-level, appropriately surveying the three KG-named applications ($\log z$, $z^\alpha$, $\zeta(s)$) without deriving the Riemann zeta continuation's own machinery.
- **Division of labor**: `math.cx.identity-theorem` owns the uniqueness ARGUMENT (why two continuations agreeing on a limit-point-rich set must coincide) and already previewed this concept's own $1/(1-z)$ example; this concept owns the CONSTRUCTION mechanism (re-centering Taylor series) and the named applications, deliberately continuing the same $1/(1-z)$ example directly rather than introducing an unrelated function, so the entire two-concept arc reads as one continuous argument.
- Example 3's monodromy discussion was deliberately included (rather than treating uniqueness as unconditional) because it is the single most common point of confusion once a learner has just absorbed LO2's uniqueness guarantee — without it, a learner would over-extend uniqueness to loop-based continuation, exactly the gap MC-3 targets.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-tier learner already has uniqueness from identity-theorem; construction mechanism introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

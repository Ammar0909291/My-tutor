# Teaching Blueprint: Identity Theorem (`math.cx.identity-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.identity-theorem` |
| name | Identity Theorem |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.cx.power-series-cx` |
| unlocks | `math.cx.analytic-continuation` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already knows holomorphic ⇔ locally-equal-to-Taylor-series from `math.cx.power-series-cx`; the identity theorem is introduced directly as the global consequence of that local fact |
| description (KG) | If f,g are holomorphic on a connected domain D and f=g on a set with a limit point in D, then f≡g on D. Consequence: a holomorphic function is completely determined by its values on any set with a limit point. |

## Component 1 — Learning Objectives

- LO1: State the identity theorem precisely, including all three hypotheses ($f,g$ holomorphic on a CONNECTED domain $D$; agreement on a set with a LIMIT POINT in $D$), and correctly distinguish "infinitely many agreement points" from "agreement points with a limit point in the domain" — the latter, not the former, is what the theorem actually requires.
- LO2: Explain why the CONNECTEDNESS of $D$ is essential to the theorem, by constructing (or interpreting) a disconnected counterexample where agreement on one component does not force agreement on another.
- LO3 (orientation level — full treatment deferred to `math.cx.analytic-continuation`): recognize that the identity theorem's direct consequence is UNIQUENESS of analytic continuation — if two holomorphic functions both extend a given function to a larger connected domain, they must be the SAME function, since they agree on the original domain (which has limit points).

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.power-series-cx` (a holomorphic function is LOCALLY equal to its own Taylor series on a disk around every point of its domain — the holomorphic ⇔ analytic equivalence that underlies why local agreement can propagate globally).

## Component 3 — Core Explanation

**Local-to-global propagation via power series**: `math.cx.power-series-cx` established that a holomorphic function equals its Taylor series on a disk around every point of its domain. If two holomorphic functions $f,g$ agree at a point $z_0$ AND at infinitely many points accumulating at $z_0$ (i.e. $z_0$ is a limit point of the agreement set), then every derivative of $f-g$ at $z_0$ must vanish — forcing the Taylor series of $f-g$ at $z_0$ to be identically zero, which by the local power-series equality means $f\equiv g$ on an entire disk around $z_0$, not just at the accumulating points themselves. This local disk of agreement can then be extended, disk by overlapping disk, across the whole CONNECTED domain $D$ — which is precisely why connectedness is required: the "spreading" argument needs an unbroken path of overlapping disks to travel along.

**Why infinitely many points is not enough — the limit point requirement is doing the real work**: an agreement set can be infinite without having a limit point IN the domain (e.g. a sequence escaping to the domain's boundary or to infinity). Without a limit point inside $D$, there is no point at which all derivatives of $f-g$ are forced to vanish, so the local power-series argument never gets started, and $f$ and $g$ are free to differ everywhere else despite agreeing at infinitely many points.

**Connectedness is essential, not a technicality**: if $D$ is disconnected, the disk-spreading argument can propagate agreement across one connected component but has no path to reach a different component — so two functions can agree (with plenty of limit points) on one piece of a disconnected domain while disagreeing entirely on another piece, without contradicting the theorem at all.

**Consequence: uniqueness of analytic continuation (orientation level)**: if a function defined on a small domain is extended holomorphically to a larger CONNECTED domain in two different ways, both extensions agree with the original function on the small domain — a set with limit points, sitting inside the larger connected domain. The identity theorem then forces the two extensions to be IDENTICAL everywhere on the larger domain: there is no room for two genuinely different valid continuations. Full treatment of analytic continuation itself is deferred to `math.cx.analytic-continuation`.

## Component 4 — Worked Examples

**Example 1 (LO1 — positive application, the real axis as a limit-point-rich agreement set)**: Let $f(z)=\sin(2z)$ and $g(z)=2\sin z\cos z$, both entire (holomorphic on all of $\mathbb C$). They agree at every REAL $z$, by the ordinary real trigonometric double-angle identity. Any real number, say $z_0=0$, is a limit point of $\mathbb R$ within $\mathbb C$ (every neighborhood of $0$ contains other real numbers where $f=g$). Since $\mathbb C$ is connected and $f,g$ are entire, the identity theorem forces $f\equiv g$ on ALL of $\mathbb C$ — a genuinely stronger conclusion than the real-analysis fact alone, since it now certifies the two functions coincide even off the real axis, everywhere in the complex plane.

**Example 2 (LO1 — breaking MC-1, infinitely many points without a limit point)**: $\sin(\pi z)$ vanishes at every integer $z=0,\pm1,\pm2,\dots$ — infinitely many zeros. Does the identity theorem force $\sin(\pi z)\equiv0$? NO: the integers have NO limit point in $\mathbb C$ — they escape to infinity, and every disk of finite radius contains only finitely many of them. The theorem's hypothesis fails, and indeed $\sin(\pi z)\not\equiv0$ (e.g. $\sin(\pi z)|_{z=1/2}=\sin(\pi/2)=1\ne0$). Contrast directly with Example 1: every point of $\mathbb R$ genuinely IS a limit point of $\mathbb R$ (real numbers accumulate at every real number), unlike the integers, which accumulate nowhere finite.

**Example 3 (LO2 and LO3 — connectedness required, and continuation uniqueness as its consequence)**: Let $D$ be two disjoint open disks, one centered at $0$ and one at $10$, each of radius $1$ (a disconnected domain). Define $f\equiv0$ on the first disk and $f\equiv1$ on the second — holomorphic on $D$ since it is holomorphic (trivially constant) on each connected component separately. Let $g\equiv0$ on all of $D$. Then $f=g$ on the ENTIRE first disk — a set with abundant limit points inside $D$ — yet $f\ne g$ on the second disk. This does NOT violate the identity theorem, because $D$ is not connected; the connectedness hypothesis is doing essential work. This is exactly why analytic continuation to a larger CONNECTED domain is unique: if two candidate continuations of some function agreed on a small original domain (a set with limit points) sitting inside a larger connected domain, the identity theorem would force them to be identical throughout that larger connected domain — there is no analogous "second disconnected piece" for them to disagree on.

## Component 5 — Teaching Actions

### Teaching Action A01 — Local Agreement With a Limit Point Forces Global Identity (Primitive P11: Representation Shift)

State: "checking equality at every single point of a domain is not necessary — checking it on a much SMALLER set, as long as that set has a limit point inside the domain, is enough to force equality everywhere the domain is connected." Work Example 1's real-axis argument, emphasizing that agreement was only checked on $\mathbb R$, yet the conclusion covers all of $\mathbb C$.

### Teaching Action A02 — Infinitely Many Is Not the Same as Having a Limit Point (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\sin(\pi z)$ has infinitely many zeros (the integers), yet is manifestly not identically zero, because the integers have no limit point in $\mathbb C$. Contrast explicitly with Example 1's real axis, where every point IS a limit point. State: "the theorem's real requirement is a limit point INSIDE the domain — not merely an infinite count of agreement points."

- **MC-1 hook**: ask "if two entire functions agree at infinitely many points, must they be identical everywhere?" — a "yes" answer reveals MC-1 (believing an infinite agreement set is automatically sufficient, missing the limit-point requirement).

### Teaching Action A03 — Connectedness Is Essential; Continuation Is Therefore Unique (Primitive P06: Contrast Pair)

Contrast Example 1's connected $\mathbb C$ (agreement on a limit-point-rich subset forces global identity) against Example 3's disconnected two-disk domain (agreement with abundant limit points on ONE component does not force agreement on the other). State: "without a connected domain, agreement has nowhere to 'spread' to — and this is exactly why, when a function IS extended to a larger connected domain, that extension is forced to be unique: two candidate extensions agreeing on the original domain, inside one connected larger domain, must be the same function everywhere."

- **MC-2 hook**: ask "does the identity theorem's conclusion still hold if the domain $D$ is a union of two separate, disjoint disks?" — a "yes" answer reveals MC-2 (missing that connectedness is a required hypothesis, not a technicality).
- **MC-3 hook**: ask "if a function is extended holomorphically beyond its original domain, could two different mathematicians validly find two DIFFERENT correct extensions?" — a "yes" answer reveals MC-3 (believing analytic continuations might not be unique, missing that the identity theorem forces any two valid continuations to a connected domain to coincide).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the identity theorem precisely, naming all three hypotheses.
  2. Two entire functions $f,g$ are known to agree at every point of the sequence $i/n$ for $n=1,2,3,\dots$ (points on the imaginary axis approaching $0$). Does $f\equiv g$ on all of $\mathbb C$? Justify by identifying the limit point of this sequence and confirming it lies in the domain.
  3. Explain why the identity theorem requires the domain $D$ to be connected, referencing the two-disk construction from this lesson (or a construction of your own).
  4. Two mathematicians each claim to have found a holomorphic continuation of $f(z)=1/(1-z)$ (originally defined on the unit disk via its geometric power series) to the larger connected domain $\mathbb C\setminus\{1\}$. Using the identity theorem, explain why their two continuations MUST be the same function, given that both genuinely agree with $f$ on the original unit disk.
- **P76 (Transfer Probe, mode = independence)**: "A researcher claims two entire functions $f(z)$ and $g(z)$ agree at every point $z=1/n$ for $n=1,2,3,\dots$. (a) Does the identity theorem guarantee $f\equiv g$ on all of $\mathbb C$? Identify the limit point of this sequence and confirm it lies in the domain. (b) A second researcher instead claims two entire functions agree at every INTEGER $z=1,2,3,\dots$. Does the identity theorem guarantee $f\equiv g$ on $\mathbb C$ in this case? Explain the key difference between the two scenarios. (c) Suppose the researcher's functions are only known to be holomorphic on the disk $|z|<1$ (not entire), and agreement was shown at $z=1/n$ for all $n$. Does the identity theorem still apply, and if so, where exactly does it guarantee equality?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INFINITE-AGREEMENT-SUFFICIENT | Believing that infinitely many agreement points between $f$ and $g$ is automatically sufficient for the identity theorem, missing that the points must have a LIMIT POINT inside the domain (not merely be infinite in count) | Foundational |
| MC-2 | CONNECTEDNESS-NOT-REQUIRED | Believing the identity theorem's conclusion holds even when the domain $D$ is disconnected, missing that agreement on one connected component has no path to "spread" to another | High |
| MC-3 | CONTINUATION-NOT-UNIQUE | Believing a holomorphic function might have multiple genuinely different valid analytic continuations to a larger connected domain, missing that the identity theorem forces any two such continuations to coincide | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Infinite Agreement Assumption") → P41 (detect: present the $\sin(\pi z)$ integer-zero scenario and ask whether it must be identically zero) → P64 (conceptual shift: re-walk Example 2's evidence, re-anchoring on "the requirement is a limit point INSIDE the domain, not merely an infinite count of points").
- **B02 (targets MC-2)**: P27 (name it: "Connectedness Assumed Unnecessary") → P41 (detect: ask whether the theorem's conclusion holds on a domain made of two disjoint disks) → P64 (conceptual shift: re-walk Example 3's disconnected counterexample, re-anchoring on "agreement can only spread through an unbroken, connected path of overlapping disks").
- **B03 (targets MC-3)**: P27 (name it: "Continuation Assumed Non-Unique") → P41 (detect: ask whether two mathematicians could validly produce two different holomorphic continuations of the same function to the same larger connected domain) → P64 (conceptual shift: re-walk Example 3's continuation-uniqueness argument, re-anchoring on "two continuations agreeing on a limit-point-rich original domain, inside one connected larger domain, are forced to be identical everywhere").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.power-series-cx` (the holomorphic ⇔ locally-equal-to-Taylor-series fact this concept's local-to-global propagation argument directly builds on; this blueprint's Example 3 also directly extends that concept's own geometric-series continuation observation into the P77 problem set).
- **Unlocks**: `math.cx.analytic-continuation` (will give full treatment to the uniqueness consequence this concept introduces at orientation level in LO3/Teaching Action A03).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag places this at a compact "3 TAs + gate" tier, appropriately so given the concept is a single theorem with three hypotheses rather than a family of computational techniques; LO1 and LO2 receive full worked-example depth (the limit-point requirement and the connectedness requirement, each with a genuine contrast pair), while LO3's uniqueness-of-continuation consequence is deliberately kept orientation-level, since its full development is the dedicated scope of the unlocked child concept.
- **Division of labor**: `math.cx.power-series-cx` owns the LOCAL fact (holomorphic $\Rightarrow$ equal to Taylor series on a disk) and already previewed the geometric-series continuation example; this concept owns the GLOBAL propagation argument (why local agreement with a limit point forces global identity across a connected domain) and the uniqueness-of-continuation consequence, deliberately not re-deriving the local power-series machinery from scratch.
- Example 3 was deliberately built to carry BOTH LO2 (connectedness) and LO3 (continuation uniqueness) in one construction, given the compact 4-hour budget — the disconnected two-disk domain makes the connectedness requirement concrete, and the same construction's absence of a "second disconnected piece" in a connected domain is exactly why continuation to a connected domain is forced to be unique.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has holomorphic⇔analytic equivalence; global consequence introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1/Ex2→LO1, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

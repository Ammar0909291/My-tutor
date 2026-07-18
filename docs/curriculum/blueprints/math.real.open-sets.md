# Teaching Blueprint: Open and Closed Sets (`math.real.open-sets`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.open-sets` |
| name | Open and Closed Sets |
| domain | Real Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.real.metric-space` |
| unlocks | `math.real.compactness`, `math.real.connectedness` |
| cross_links | `math.top.open-sets` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) — a disk/interval picture before the ε-ball formal definition |
| description (KG) | Open ball: B(x,r)={y:d(x,y)<r}. Open set: every point is interior (surrounded by an open ball inside the set). Closed set: complement is open, equivalently contains all its limit points. Closure: smallest closed set containing S. |

## Component 1 — Learning Objectives

- LO1: Define the **open ball** $B(x,r)=\{y\in X: d(x,y)<r\}$ in a metric space $(X,d)$, and define a set $U$ as **open** if every point of $U$ is an **interior point** — i.e., for every $x\in U$, some open ball $B(x,r)\subseteq U$ (possibly with a different $r$ for each $x$).
- LO2: Define a set $C$ as **closed** if its complement $X\setminus C$ is open, and prove the equivalent characterization — $C$ is closed iff $C$ contains all its **limit points** (points arbitrarily close to $C$, in the sense that every open ball around them intersects $C$).
- LO3: Recognize that open and closed are **not opposites** in the naive sense — a set can be neither open nor closed, or (in special cases) both — and define the **closure** of a set $S$ as the smallest closed set containing $S$, correctly computing it for simple examples.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.metric-space` (the metric $d(x,y)$, its three axioms, and standard examples like $\mathbb{R}^n$ with the Euclidean metric).

## Component 3 — Core Explanation

In a metric space $(X,d)$, the **open ball** centered at $x$ with radius $r$ is $B(x,r)=\{y\in X: d(x,y)<r\}$ — all points strictly within distance $r$ of $x$.

A set $U\subseteq X$ is **open** if every point $x\in U$ is an **interior point** of $U$: there exists some radius $r>0$ (which can depend on $x$) with $B(x,r)\subseteq U$ — a small enough ball around $x$ stays entirely inside $U$, with no part poking outside.

A set $C\subseteq X$ is **closed** if its complement $X\setminus C$ is open. **Equivalent characterization**: $C$ is closed iff $C$ contains all its **limit points** — a point $p$ (whether or not $p\in C$) is a limit point of $C$ if every open ball around $p$, no matter how small, contains at least one point of $C$ (other than possibly $p$ itself). $C$ closed means no limit point is "missing" from $C$.

**Open and closed are not opposites**: many sets are **neither** open nor closed (e.g. the half-open interval $[0,1)$ in $\mathbb{R}$: it's not open since 0 has no ball around it staying inside $[0,1)$ — every ball around 0 pokes into negative numbers; it's not closed since 1 is a limit point not contained in the set). And some special sets are **both** open and closed simultaneously (e.g. $\emptyset$ and the whole space $X$ itself, in any metric space — vacuously/trivially satisfying both definitions).

**Closure**: the closure $\bar S$ of a set $S$ is the **smallest closed set containing $S$** — equivalently, $S$ together with all its limit points. E.g., the closure of the open interval $(0,1)$ in $\mathbb{R}$ is the closed interval $[0,1]$ — adding the two "missing" limit points (0 and 1) is exactly what's needed to make it closed, and nothing smaller than $[0,1]$ that still contains $(0,1)$ is closed.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying openness via the interior-point definition)**: Let $X=\mathbb{R}$ (standard metric $d(x,y)=|x-y|$), and $U=(2,5)$ (an open interval). Take any $x\in U$, e.g. $x=4.9$. Is there a ball $B(4.9,r)\subseteq U$? Choose $r=0.05$: $B(4.9,0.05)=(4.85,4.95)\subseteq(2,5)$. ✓ In general, for any $x\in(2,5)$, choosing $r=\min(x-2,5-x)$ (the distance to the nearer endpoint) always gives $B(x,r)\subseteq(2,5)$ — confirming every point of $U$ is interior, so $U$ is open.

**Example 2 (LO2 — closed via limit points, and the equivalent complement check)**: Let $C=[0,1]$ in $\mathbb{R}$. Its complement is $(-\infty,0)\cup(1,\infty)$ — is this open? Both pieces are open intervals (verifiable the same way as Example 1), and a union of open sets is open, so the complement is open, confirming $C=[0,1]$ is closed. Equivalently via limit points: every limit point of $[0,1]$ (points arbitrarily close to the interval) is already in $[0,1]$ — e.g. 0 and 1 themselves are limit points and are included; no point outside $[0,1]$ (like 1.5) has every ball around it intersecting $[0,1]$ once the ball is small enough.

**Example 3 (LO3 — neither open nor closed, breaking MC-1)**: $S=[0,1)$ in $\mathbb{R}$. Not open: take $x=0\in S$ — every ball $B(0,r)=(-r,r)$ contains negative numbers not in $S$, so no ball around 0 fits inside $S$; 0 is not an interior point. Not closed: $1$ is a limit point of $S$ (every ball around 1 contains points of $S$ just below 1) but $1\notin S$ — so $S$ is missing one of its limit points. $S$ is genuinely **neither** open nor closed — confirming these are not complementary categories that exhaust every possible set.

## Component 5 — Teaching Actions

### Teaching Action A01 — Open Sets via the Interior-Point/Ball Definition (Primitive P11: Representation Shift)

Start pictorial: draw an open disk (no boundary circle drawn, or drawn dashed) in the plane. Pick a point near the edge and draw a small solid ball around it, showing it fits entirely inside. State: "no matter how close to the edge you pick a point, you can always draw SOME small enough ball around it that stays inside — that's exactly what 'open' means." Shift to the formal definition and work Example 1's explicit $r=\min(x-2,5-x)$ construction, emphasizing that the radius is allowed to shrink as $x$ approaches an endpoint — that's fine, the definition only requires *some* radius to exist for *each* point, not one uniform radius for the whole set.

- **MC-1 hook**: ask "is $[0,1)$ open, closed, both, or neither?" before revealing the answer — an answer of "open" or "closed" (assuming it must be one or the other) reveals MC-1 (believing every set must be classifiable as exactly one of open/closed, when in fact "neither" and "both" are both genuinely possible categories).

### Teaching Action A02 — Closed Sets, Limit Points, and the Closure (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 3's $[0,1)$ directly — showing the failure of BOTH the open-set test (at $x=0$) and the closed-set test (missing limit point $1$) in the same set. State the resolution explicitly: "open and closed are two independent yes/no questions about a set, not a single either/or classification — check each definition separately."

**Contrast 2 (targets MC-2, closure as smallest, not just any, closed superset)**: Present $(0,1)$ and ask "is $[0,2]$ a closed set containing $(0,1)$?" (Yes, trivially — $[0,2]\supseteq(0,1)$ and $[0,2]$ is closed.) "So is $[0,2]$ the closure of $(0,1)$?" — an incorrect "yes" reveals MC-2 (believing any closed superset qualifies as "the closure," rather than specifically the *smallest* one). State the correct answer: "the closure of $(0,1)$ is $[0,1]$ — adding exactly the two limit points that were missing, nothing more. $[0,2]$ is A closed superset, but not THE closure, since $[0,1]$ is a strictly smaller closed set that still contains $(0,1)$."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify directly, using the interior-point definition, that $(1,4)$ is open in $\mathbb{R}$.
  2. Verify, either via the complement-is-open check or via limit points, that $\{2\}$ (a single point) is closed in $\mathbb{R}$.
  3. Is $[3,5)$ open, closed, both, or neither? Justify by checking both definitions explicitly.
  4. Find the closure of $S=\{1/n : n=1,2,3,\ldots\}$ in $\mathbb{R}$ (hint: identify the limit point(s) this set approaches but never reaches).
- **P76 (Transfer Probe, mode = independence)**: "In a metric space modeling a city's delivery zone, distance $d(x,y)$ is measured in kilometers. A company defines its 'guaranteed same-day zone' as $Z=\{y : d(\text{warehouse}, y) < 10\}$ km (strictly less than 10km). (a) Using this lesson's definitions, argue that $Z$ is an open set. (b) A rival company instead defines its zone as $Z'=\{y : d(\text{warehouse}, y) \leq 10\}$ km (10km or less) — is $Z'$ open, closed, or neither, and how does the boundary distance of exactly 10km determine this? (c) Explain, using the concept of closure, why $Z'$ is exactly the closure of $Z$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | OPEN-CLOSED-ASSUMED-EXHAUSTIVE-DICHOTOMY | Believing every set must be classifiable as exactly one of open or closed, not recognizing "neither" (and, separately, "both") as genuinely possible | Foundational |
| MC-2 | CLOSURE-CONFUSED-WITH-ANY-CLOSED-SUPERSET | Believing any closed set containing $S$ qualifies as "the closure" of $S$, rather than specifically the smallest such closed set | Foundational |
| MC-3 | LIMIT-POINT-REQUIRES-SET-MEMBERSHIP | Believing a point must already belong to $C$ to be considered a "limit point" of $C$, rather than recognizing limit points can be points outside $C$ that $C$ approaches arbitrarily closely | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Exhaustive Dichotomy Assumption") → P41 (detect: ask directly whether $[0,1)$ is open or closed, expecting a forced single-category answer) → P64 (conceptual shift: re-anchor on "open" and "closed" as two SEPARATE yes/no tests — apply each independently and accept whatever combination of answers results, including "neither").
- **B02 (targets MC-2)**: P27 (name it: "Any-Closed-Superset Confusion") → P41 (detect: present a strictly larger closed superset of a given set and ask if it's "the closure") → P64 (conceptual shift: re-derive by checking whether a strictly smaller closed set containing the same original set exists — if so, the larger one wasn't the closure).
- **B03 (targets MC-3)**: P27 (name it: "Limit-Point Membership Requirement") → P41 (detect: ask whether 1 can be a "limit point" of $[0,1)$ even though $1\notin[0,1)$) → P64 (conceptual shift: re-anchor on the definition — a limit point is about every ball around it intersecting the set, which has nothing to do with whether the point itself is already a member).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.metric-space` (the metric $d$ and the space $(X,d)$ this entire concept's balls, interior points, and limit points are defined relative to).
- **Unlocks**: `math.real.compactness` (compactness is defined in terms of open covers, building directly on this concept's open-set definition), `math.real.connectedness` (connectedness is defined via the impossibility of splitting a space into two disjoint nonempty open sets).
- **Cross-link**: KG lists `math.top.open-sets` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.top.open-sets.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's metric-ball-based open-set definition directly to the more general topological-space axiomatic definition of open sets (where "open" is taken as a primitive notion satisfying axioms, rather than derived from a metric) — this metric-space treatment is exactly the motivating special case for that later abstraction.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/understand tag places this at the "2 main TAs + gate" tier, consistent with this domain's established sizing — A01 (open sets via interior points) and A02 (closed sets, limit points, and closure, deliberately paired since closed-via-complement and closed-via-limit-points are two views of one concept, and closure is the natural next construction once "missing limit points" is understood) jointly cover all three LOs.
- MC-1 (open/closed assumed exhaustive dichotomy) was placed first and given its own dedicated worked example (Example 3) and hook, because in ordinary language "open" and "closed" sound like natural opposites (an open door vs. a closed door) — this everyday-language intuition is precisely the source of the misconception, and needed to be broken before the more technical closure/limit-point content could be introduced without reinforcing it.
- The delivery-zone transfer probe was chosen specifically because the strict-inequality-vs-non-strict-inequality boundary condition ($<10$ vs. $\leq10$) is exactly the mathematical mechanism distinguishing open from closed sets in this concept, giving the abstract distinction genuine real-world stakes (a customer exactly 10km away is included in one zone definition but not the other).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.real.metric-space`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.top.open-sets` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: disk/interval picture before formal definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

# Teaching Blueprint: Covering Space (`math.top.covering-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.covering-space` |
| name | Covering Space |
| domain | Topology |
| difficulty | research |
| bloom | apply |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.top.fundamental-group` |
| unlocks | none |
| cross_links | `math.cx.riemann-surface` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | A (Abstract) — research-tier learner already has π₁ and, via the cross-link, the concrete log z/√z surfaces; the general covering-map framework is introduced directly |
| description (KG) | p:X̃→X is a covering map if every x∈X has an open neighborhood U such that p⁻¹(U) is a disjoint union of homeomorphic copies. Universal cover: simply connected covering space. Galois correspondence: subgroups of π₁(X) ↔ covering spaces. |

## Component 1 — Learning Objectives

- LO1: Define a **covering map** $p:\tilde X\to X$: every point $x\in X$ has an open neighborhood $U$ such that $p^{-1}(U)$ is a DISJOINT UNION of open sets, each mapped HOMEOMORPHICALLY onto $U$ by $p$ ("evenly covered") — and recognize `math.cx.riemann-surface`'s own helical $\log z$ construction as a concrete instance (the surface evenly covers $\mathbb C\setminus\{0\}$, with each small disk covered by infinitely many disjoint disk-copies, one per sheet).
- LO2: Define the **universal cover** as the simply-connected covering space (trivial $\pi_1$) — and recognize `math.cx.riemann-surface`'s own $\log z$ helical surface as literally the universal cover of $\mathbb C\setminus\{0\}$, correctly distinguishing this SPECIAL, distinguished covering space from covering spaces in general (which need NOT be simply connected).
- LO3 (orientation level — named further theory): recognize the **Galois correspondence** — subgroups of $\pi_1(X)$ correspond bijectively to covering spaces of $X$ — as a precise, rigorous bijection (not a loose analogy), concretely illustrated by `math.cx.riemann-surface`'s own $\log z$ (trivial subgroup) and $\sqrt z$ (index-$2$ subgroup) examples.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.fundamental-group` ($\pi_1(X,x_0)$, loops up to based homotopy, and the group structure under concatenation).

## Component 3 — Core Explanation

**Evenly covered neighborhoods, illustrated concretely**: a covering map $p:\tilde X\to X$ requires every point of the base $X$ to have a neighborhood $U$ whose preimage $p^{-1}(U)$ splits into DISJOINT copies, each homeomorphic to $U$ via $p$. `math.cx.riemann-surface`'s helical $\log z$ surface is exactly this over the base $\mathbb C\setminus\{0\}$: any small disk not containing the origin is covered by infinitely many disjoint disk-copies, one per sheet — while the origin ITSELF has no evenly-covered neighborhood at all (every disk around $0$ tangles all the sheets together), which is exactly why the origin must be excluded from the base.

**The universal cover is a special, distinguished covering space**: the **universal cover** is the covering space with TRIVIAL $\pi_1$ — no nontrivial loops survive at all. `math.cx.riemann-surface`'s $\log z$ helical surface has this property: any loop on the surface that returns to its exact starting point never crosses between sheets (crossing the cut always moves you to a different point), so the whole surface is simply connected — literally the universal cover of $\mathbb C\setminus\{0\}$. This is a SPECIAL property, not automatic for every covering space: `math.cx.riemann-surface`'s OWN $\sqrt z$ surface (only $2$ sheets) is a covering space too, but is NOT simply connected — a loop winding around the origin exactly twice in the base lifts to a genuine CLOSED loop on that $2$-sheeted surface (since two full turns returns to the starting sheet), a nontrivial element of that surface's own $\pi_1$.

**The Galois correspondence (orientation level)**: $\pi_1(\mathbb C\setminus\{0\})\cong\mathbb Z$ (loops classified by winding number). The precise, rigorous correspondence pairs the TRIVIAL subgroup $\{0\}\subset\mathbb Z$ with the universal cover ($\log z$'s infinite helical surface — no loops survive), and the subgroup $2\mathbb Z\subset\mathbb Z$ with the $2$-sheeted $\sqrt z$ cover (loops winding an EVEN number of times close up; odd-winding loops don't) — a concrete, checkable instance of the general theorem that subgroups of $\pi_1(X)$ correspond bijectively to covering spaces of $X$.

## Component 4 — Worked Examples

**Example 1 (LO1 — evenly covered neighborhoods, concretely via log z, breaking MC-1)**: for $X=\mathbb C\setminus\{0\}$ and $\tilde X=$ the helical Riemann surface for $\log z$ (`math.cx.riemann-surface`): for any small disk $U$ around a point $x\ne0$, $p^{-1}(U)$ consists of infinitely many disjoint small disks, ONE on each sheet, each mapped homeomorphically onto $U$ by the projection $p$ — exactly the "evenly covered" condition. The origin itself must be EXCLUDED from the base ($X=\mathbb C\setminus\{0\}$, not all of $\mathbb C$) precisely because no neighborhood of the origin is evenly covered: every disk around $0$ contains points on every sheet simultaneously, tangled together, not disjoint copies.

**Example 2 (LO2 — the helical surface IS simply connected, hence the universal cover, breaking MC-2)**: a loop on the helical $\log z$ surface that starts and ends at the SAME point never crosses to another sheet (crossing the cut always lands on a genuinely different point unless you've returned to your exact starting sheet), so any such loop is contractible within the surface — the whole helical surface is SIMPLY CONNECTED, literally the universal cover of $\mathbb C\setminus\{0\}$. This directly explains why a nontrivial loop in the BASE (winding once around the origin, a nontrivial element of $\pi_1(\mathbb C\setminus\{0\})\cong\mathbb Z$) lifts to a genuine PATH (not a loop) on the covering surface, landing on a different sheet — the covering "unwinds" every base loop into an honest path.

**Example 3 (LO3, orientation level — Galois correspondence, contrasting log z and √z, breaking MC-3)**: `math.cx.riemann-surface`'s $\sqrt z$ surface (only $2$ sheets, from that concept's own analysis) is ALSO a covering space of $\mathbb C\setminus\{0\}$, but is NOT simply connected: a loop in the base winding around the origin exactly TWICE lifts to a genuine CLOSED loop on the $2$-sheeted surface (since two full turns return to the starting sheet) — a nontrivial element of $\pi_1$(that surface). This corresponds precisely to the subgroup $2\mathbb Z\subset\mathbb Z=\pi_1(\mathbb C\setminus\{0\})$ (even winding numbers), in sharp contrast to $\log z$'s trivial subgroup $\{0\}$ (no winding at all survives). This is not a loose analogy — the specific subgroup ($\{0\}$ vs. $2\mathbb Z$) determines the specific covering space (infinite helical vs. $2$-sheeted) in a completely precise, bijective way.

## Component 5 — Teaching Actions

### Teaching Action A01 — Evenly Covered Means Disjoint Homeomorphic Copies, Nothing Less (Primitive P11: Representation Shift)

State: "evenly covered isn't just 'the preimage is connected' or 'the map is surjective' — it specifically means disjoint copies, each homeomorphic to the neighborhood, and that's exactly why the origin has to be excluded from log z's base." Work Example 1's precise unpacking of the covering condition.

- **MC-1 hook**: ask "does 'evenly covered' just mean the preimage $p^{-1}(U)$ is connected, or that $p$ is surjective onto $U$?" — a "yes" answer reveals MC-1 (missing the specific disjoint-union-of-homeomorphic-copies structure "evenly covered" requires).

### Teaching Action A02 — Not Every Covering Space Is Simply Connected (Primitive P28: Conflict Evidence)

Present Example 2's evidence (the log z surface IS simply connected) directly against Example 3's evidence ($\sqrt z$'s surface has a genuine nontrivial loop — winding twice around the origin in the base lifts to a closed loop there). State: "the universal cover is a SPECIAL covering space — the one with trivial $\pi_1$. Other covering spaces, like $\sqrt z$'s, are perfectly valid covering spaces without being simply connected themselves."

- **MC-2 hook**: ask "is every covering space automatically simply connected, the way the universal cover is?" — a "yes" answer reveals MC-2 (conflating covering spaces in general with the universal cover specifically).

### Teaching Action A03 — The Galois Correspondence Is a Precise Bijection, Not a Loose Analogy (Primitive P06: Contrast Pair)

Contrast the TRIVIAL subgroup $\{0\}$ (paired with $\log z$'s infinite universal cover) against the subgroup $2\mathbb Z$ (paired with $\sqrt z$'s $2$-sheeted cover) — two SPECIFIC subgroups, two SPECIFIC, verifiably different covering spaces. State: "this isn't wordplay borrowed from field-theory Galois correspondence — the specific subgroup determines the specific covering space, completely rigorously, as these two concrete examples show."

- **MC-3 hook**: ask "is the 'Galois correspondence' between subgroups of $\pi_1(X)$ and covering spaces just a loose naming analogy, or a precise mathematical bijection?" — a "loose analogy" answer reveals MC-3 (missing that the correspondence is a genuine, checkable bijection, as demonstrated by the log z/√z pairing).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the precise definition of "evenly covered" and explain why the point $z=0$ must be excluded from the base space $\mathbb C\setminus\{0\}$ for $\log z$'s helical covering to make sense.
  2. Explain why the helical Riemann surface for $\log z$ is simply connected, referencing what happens to a loop that starts and ends at the same point on that surface.
  3. Determine whether $\sqrt z$'s $2$-sheeted Riemann surface is simply connected, by considering what happens when a loop in the base $\mathbb C\setminus\{0\}$ winds around the origin exactly twice.
  4. State which subgroup of $\pi_1(\mathbb C\setminus\{0\})\cong\mathbb Z$ corresponds to $\log z$'s covering, and which corresponds to $\sqrt z$'s covering, according to the Galois correspondence.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.cx.riemann-surface`)**: "Recall from `math.cx.riemann-surface` that the cube root function $z^{1/3}$ has a $3$-sheeted Riemann surface (loops must wind around the origin exactly $3$ times to return to the starting value). (a) Using this lesson's covering-space framework, explain precisely what 'evenly covered' means for this $3$-sheeted surface over the base $\mathbb C\setminus\{0\}$. (b) Determine whether this $3$-sheeted surface is simply connected, by considering what happens to a loop winding around the origin exactly $3$ times. (c) State which specific subgroup of $\pi_1(\mathbb C\setminus\{0\})\cong\mathbb Z$ corresponds to this $3$-sheeted covering, according to the Galois correspondence, and explain your reasoning by analogy with this lesson's $\log z$ (trivial subgroup) and $\sqrt z$ (subgroup $2\mathbb Z$) examples."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EVENLY-COVERED-UNDERSPECIFIED | Believing "evenly covered" merely requires a connected preimage or surjectivity, missing the specific disjoint-union-of-homeomorphic-copies structure it requires, and why the origin must be excluded from log z's base | Foundational |
| MC-2 | ALL-COVERING-SPACES-ASSUMED-SIMPLY-CONNECTED | Believing every covering space is automatically simply connected, conflating covering spaces in general with the specific, distinguished universal cover | High |
| MC-3 | GALOIS-CORRESPONDENCE-ASSUMED-LOOSE-ANALOGY | Believing the Galois correspondence between subgroups of $\pi_1(X)$ and covering spaces is a loose naming analogy, missing that it is a precise, checkable bijection | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Evenly Covered Underspecified") → P41 (detect: ask whether "evenly covered" just means a connected or surjective preimage) → P64 (conceptual shift: re-walk Example 1's precise unpacking, re-anchoring on "disjoint homeomorphic copies, and that's why the origin is excluded").
- **B02 (targets MC-2)**: P27 (name it: "All Covering Spaces Assumed Simply Connected") → P41 (detect: ask whether every covering space is automatically simply connected) → P64 (conceptual shift: re-walk Example 3's √z nontrivial-loop evidence against Example 2's log z case, re-anchoring on "the universal cover is a special, distinguished covering space, not the general rule").
- **B03 (targets MC-3)**: P27 (name it: "Galois Correspondence Assumed Loose Analogy") → P41 (detect: ask whether the Galois correspondence is just a naming analogy) → P64 (conceptual shift: re-walk Example 3's specific subgroup-to-surface pairing, re-anchoring on "the correspondence is precise and checkable, not decorative wordplay").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.fundamental-group` ($\pi_1(X,x_0)$ and the group structure of loops under based homotopy, the algebraic object this concept's correspondence connects covering spaces to).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.cx.riemann-surface`, verified authored via `ls docs/curriculum/blueprints/` (authored earlier in this same batch). $P76_{mode}=$ **cross-link probe**, directly formalizing that concept's own log z/√z constructions within the rigorous evenly-covered/universal-cover/Galois-correspondence framework this concept develops.

## Component 8 — Teaching Notes

- estimated_hours = 7 with a research/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full conceptual depth (the precise evenly-covered definition and the universal-cover distinction, both grounded in the concrete log z/√z examples) and LO3 kept orientation-level, appropriately naming the Galois correspondence as a precise theorem without proving the full bijection.
- **Division of labor**: `math.top.fundamental-group` owns $\pi_1$ itself and the based-loop machinery; this concept owns the covering-space FRAMEWORK that formalizes what `math.cx.riemann-surface` built concretely — deliberately reusing that concept's own log z and √z surfaces throughout rather than introducing new abstract examples, so the general theory reads as a direct formalization of already-understood concrete objects.
- This blueprint was deliberately authored immediately after `math.cx.riemann-surface` within the same batch specifically so a genuine, substantive cross-link probe could be built — every worked example and the transfer probe itself directly formalize and extend that concept's own constructions (log z, √z, and now $z^{1/3}$) within the rigorous covering-space vocabulary.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.cx.riemann-surface` found authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-tier learner already has π₁ and, via the cross-link, concrete surfaces; framework introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

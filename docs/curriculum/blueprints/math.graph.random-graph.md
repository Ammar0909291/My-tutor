# Teaching Blueprint: Random Graphs (`math.graph.random-graph`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.graph.random-graph` |
| name | Random Graphs |
| domain | Graph Theory |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.graph.graph`, `math.prob.probability-axioms` |
| unlocks | none |
| cross_links | `math.prob.random-variable` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | C (Concrete) — flipping a biased coin for each possible edge of a small graph, before the general G(n,p) model |
| description (KG) | G(n,p): each edge included independently with probability p. Threshold for property P: sharp threshold p* such that G(n,p) has P a.a.s. for p>>p* and lacks P a.a.s. for p<<p*. Connectivity threshold: p=log(n)/n. |

## Component 1 — Learning Objectives

- LO1: Define the **Erdős–Rényi model** $G(n,p)$: $n$ vertices, with EACH possible edge included INDEPENDENTLY with probability $p$ (reusing `math.prob.probability-axioms`'s own independence concept directly), and compute the **expected number of edges**, $E[\#\text{edges}]=\binom n2p$, directly via linearity of expectation over all $\binom n2$ possible edges.
- LO2: Recognize a graph property (like "having at least one edge," or "being connected") as itself governed by a **random variable** (reusing `math.prob.random-variable`'s own framework — whether the graph HAS the property is a $0/1$-valued outcome varying from one random draw to another), and correctly interpret "asymptotically almost surely" (a.a.s.) as the property's probability tending to $1$ as $n\to\infty$ — NOT that literally every single graph has it.
- LO3 (orientation level — full derivation deferred, given research-tier scope): recognize the **threshold phenomenon** — many graph properties have a SHARP threshold $p^*(n)$ where the property suddenly flips from "almost never" to "almost always" as $p$ crosses $p^*$ — with the connectivity threshold $p^*=\log(n)/n$ stated as the KG's own named example, without deriving it.

## Component 2 — Prerequisite Check

Assumes mastery of `math.graph.graph` ($G=(V,E)$, vertices and edges, connectivity) and `math.prob.probability-axioms` (independence of events, and computing probabilities of independent combined events).

## Component 3 — Core Explanation

**The Erdős–Rényi model and expected edge count**: $G(n,p)$ has $n$ fixed vertices; each of the $\binom n2$ POSSIBLE edges is included independently, with probability $p$ each — directly reusing `math.prob.probability-axioms`'s notion of independent events, now applied edge-by-edge. The expected number of edges follows immediately from linearity of expectation: each of the $\binom n2$ possible edges contributes an expected value of $p$ (present with probability $p$, absent with probability $1-p$, contributing $0$), so $E[\#\text{edges}]=\binom n2\cdot p$ — an AVERAGE over many random draws, not a guarantee about any single realized graph.

**Graph properties as random variables, and the precise meaning of a.a.s.**: whether a specific random draw of $G(n,p)$ HAS a given property (like "is connected") is itself a genuine random variable (`math.prob.random-variable`'s framework) — a $0/1$-valued outcome varying draw to draw. Saying the property holds "asymptotically almost surely" (a.a.s.) means $P(\text{property holds})\to1$ as $n\to\infty$ — a statement about a LIMITING probability, not a claim that every single finite-$n$ graph has the property; exceptions can and do occur for any finite $n$, just with vanishing probability as $n$ grows.

**The sharp threshold phenomenon (orientation level)**: for many properties, the probability of holding does not increase smoothly as $p$ increases — instead, there is a SHARP threshold $p^*(n)$: for $p$ significantly larger than $p^*$, the property holds a.a.s. (probability $\to1$); for $p$ significantly smaller, it fails a.a.s. (probability $\to0$) — a genuine, sudden "phase transition" rather than a gradual increase. The connectivity threshold, $p^*=\log(n)/n$, is the KG's own named instance of this phenomenon, stated here without derivation.

## Component 4 — Worked Examples

**Example 1 (LO1 — expected edge count, an average not a guarantee, breaking MC-1)**: for $G(5,0.3)$ ($n=5$ vertices, $p=0.3$): the total possible edges is $\binom52=10$. Since each edge is independently present with probability $0.3$, the expected number of edges is $E[\#\text{edges}]=10\times0.3=3$ — a direct application of linearity of expectation, summing the expected contribution ($0.3$) from each of the $10$ possible edges. The ACTUAL realized graph on any single random draw could have anywhere from $0$ to $10$ edges; $3$ is only the average over many such draws, not a promise about any one graph.

**Example 2 (LO2 — properties as random variables, a.a.s. interpreted precisely, breaking MC-2)**: let $X=$ "number of edges in a random draw of $G(n,p)$" — a genuine random variable (`math.prob.random-variable`'s framework), taking different values on different draws (per Example 1, its expected value is $\binom n2p$, but the actual realized value varies). Similarly, "$G(n,p)$ is connected" is a $0/1$-valued random variable — $1$ if that specific draw happens to be connected, $0$ otherwise. Saying connectivity holds a.a.s. means $P(\text{connected})\to1$ as $n\to\infty$ — NOT that literally every single realization, for every $n$, is connected; for finite $n$, some random draws can still fail to be connected, just with probability shrinking toward $0$ as $n$ grows.

**Example 3 (LO3, orientation level — the sharp threshold, breaking MC-3)**: the connectivity threshold $p^*=\log(n)/n$ is a SHARP boundary: for $p$ significantly LARGER than $\log(n)/n$, $G(n,p)$ is connected a.a.s. (probability $\to1$); for $p$ significantly SMALLER, it is disconnected a.a.s. (probability $\to0$) — a genuinely sudden phase-transition behavior in a narrow window around $p^*$, not a smooth, gradual increase in connectivity probability as $p$ rises from $0$ to $1$. This sharp-threshold phenomenon is one of the most striking discoveries in random graph theory.

## Component 5 — Teaching Actions

### Teaching Action A01 — Expected Edge Count Is an Average, Not a Per-Graph Guarantee (Primitive P11: Representation Shift)

State: "$E[\#\text{edges}]=\binom n2p$ tells you what happens on AVERAGE across many random draws — any single realized graph can have a genuinely different edge count." Work Example 1's direct computation, emphasizing the average-vs-single-realization distinction.

- **MC-1 hook**: ask "does $E[\#\text{edges}]=\binom n2p$ mean every single random draw of $G(n,p)$ will have exactly that many edges?" — a "yes" answer reveals MC-1 (mistaking an expected value for a per-realization guarantee).

### Teaching Action A02 — A.a.s. Is a Limiting Probability, Not a Universal Guarantee (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: "asymptotically almost surely" is precisely defined as a LIMITING probability tending to $1$ as $n\to\infty$, with finite-$n$ exceptions genuinely possible. State: "a.a.s. describes what happens in the limit of large $n$ — it doesn't rule out exceptions at any particular finite $n$, it just says they become vanishingly rare."

- **MC-2 hook**: ask "does 'G(n,p) is connected asymptotically almost surely' mean literally every graph, for every $n$, is connected?" — a "yes" answer reveals MC-2 (missing that a.a.s. is a statement about a limiting probability, not a universal fact about every finite $n$).

### Teaching Action A03 — The Threshold Is Sharp, Not a Gradual Ramp (Primitive P06: Contrast Pair)

Contrast a hypothetical smooth, gradual increase in connectivity probability as $p$ rises against the ACTUAL sharp threshold behavior — a sudden phase transition concentrated in a narrow window around $p^*=\log(n)/n$. State: "this isn't a gentle slope from unlikely to likely — it's a genuine phase transition, flipping rapidly from almost-never to almost-always."

- **MC-3 hook**: ask "does the probability of a threshold property (like connectivity) increase smoothly and gradually as $p$ increases, the way you might naively expect?" — a "yes" answer reveals MC-3 (missing the sharp, sudden nature of the threshold phenomenon).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $G(6,0.4)$, compute the expected number of edges directly (using $\binom62$ and linearity of expectation).
  2. Explain why a SPECIFIC random draw of $G(10,0.5)$ might have more or fewer edges than the expected value you would compute for it, referencing the difference between an average and a guarantee.
  3. Explain what "$G(n,p)$ is connected asymptotically almost surely" means precisely, in terms of a limiting probability as $n\to\infty$ — and explain why this statement does NOT mean every single graph for every $n$ is connected.
  4. Explain, in your own words, what makes the connectivity threshold $p=\log(n)/n$ a "sharp" threshold rather than a gradual one.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.prob.random-variable`)**: "A network engineer models a communication network with $n=100$ nodes as $G(100,p)$ for various values of $p$. (a) Using `math.prob.random-variable`'s framework, explain precisely what kind of random variable 'the number of edges in this network' is, and compute its expected value for $p=0.05$. (b) Explain why 'the network is connected' is ALSO a random variable (specifically, a $0/1$-valued one) under this model, even though for any SPECIFIC drawn network, connectivity is just a fixed yes/no fact about that one graph. (c) The connectivity threshold for $n=100$ is around $p^*=\log(100)/100\approx0.046$. Explain what this lesson's threshold-phenomenon discussion predicts about the network's connectivity probability if the engineer used $p=0.2$ (well above threshold) versus $p=0.01$ (well below threshold), without computing exact probabilities."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EXPECTED-EDGE-COUNT-MISTAKEN-FOR-GUARANTEE | Believing $E[\#\text{edges}]$ means every random draw of $G(n,p)$ has exactly that many edges, missing that it is only an average over many draws | Foundational |
| MC-2 | AAS-MISTAKEN-FOR-UNIVERSAL-GUARANTEE | Believing "asymptotically almost surely" means literally every graph for every $n$ has the property, missing that it describes a limiting probability as $n\to\infty$, with finite-$n$ exceptions genuinely possible | High |
| MC-3 | THRESHOLD-ASSUMED-GRADUAL | Believing the probability of a threshold property increases smoothly and gradually as $p$ increases, missing the sharp, sudden phase-transition nature of the threshold phenomenon | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Expected Edge Count Mistaken for Guarantee") → P41 (detect: ask whether $E[\#\text{edges}]$ means every draw has exactly that many edges) → P64 (conceptual shift: re-walk Example 1's average-vs-realization distinction, re-anchoring on "expected value is an average, not a per-graph promise").
- **B02 (targets MC-2)**: P27 (name it: "A.a.s. Mistaken for Universal Guarantee") → P41 (detect: ask whether a.a.s. means literally every graph for every $n$ has the property) → P64 (conceptual shift: re-walk Example 2's precise limiting-probability definition, re-anchoring on "a.a.s. describes the limit as $n\to\infty$, not a universal fact at every finite $n$").
- **B03 (targets MC-3)**: P27 (name it: "Threshold Assumed Gradual") → P41 (detect: ask whether the connectivity probability increases smoothly as $p$ rises) → P64 (conceptual shift: re-walk Example 3's phase-transition framing, re-anchoring on "this is a sharp, sudden transition, not a gentle ramp").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.graph.graph` (vertices, edges, and connectivity, the structural vocabulary this concept randomizes) and `math.prob.probability-axioms` (independence of events, the mechanism by which each edge is included).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.prob.random-variable`, verified authored via `ls docs/curriculum/blueprints/`. $P76_{mode}=$ **cross-link probe**, directly framing both the edge count and graph properties like connectivity as instances of that concept's own random-variable framework.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a research/analyze tag and a low mastery_threshold (0.6, MAMR = 3/5) supports the full "3 TAs + gate" tier at a survey-appropriate depth, with LO1 and LO2 at full conceptual/computational depth (a genuine expected-value computation and a precise a.a.s. definition) and LO3 kept orientation-level, appropriately naming the threshold phenomenon without deriving the $\log(n)/n$ formula.
- **Division of labor**: `math.graph.graph` owns the structural graph vocabulary; `math.prob.probability-axioms` owns independence and basic probability computation. This concept owns the SPECIFIC randomization model $G(n,p)$ and its emergent large-$n$ behavior, deliberately framing graph properties through `math.prob.random-variable`'s own vocabulary rather than treating "a.a.s." as an unexplained piece of jargon.
- Example 1 and Example 2's shared theme (expected values and a.a.s. are both statements about AVERAGES/LIMITS, not per-realization guarantees) was deliberately unified across two examples, since both misconceptions (MC-1, MC-2) share the identical underlying confusion — a statistical/limiting statement mistaken for a universal per-case fact.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.prob.random-variable` found authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: flipping a biased coin for each possible edge of a small graph, before the general model) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

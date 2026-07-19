# Teaching Blueprint: Continuity (Topology) (`math.top.continuity-top`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.continuity-top` |
| name | Continuity (Topology) |
| domain | Topology |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.top.topological-space` |
| unlocks | `math.top.homeomorphism` |
| cross_links | `math.real.continuity-rigorous` (**authored**) — verified via `ls`; P76_mode = cross-link probe, see Component 7 |
| CPA_entry_stage | A (Abstract) — a direct re-expression of the already-known ε-δ definition using pure open-set language, per this concept's own established "right level of abstraction" framing from `math.top.topological-space` |
| description (KG) | f:X→Y is continuous iff f⁻¹(V) is open in X for every open V in Y. Equivalent (for metric spaces) to the ε-δ definition. Composition of continuous maps is continuous. Continuity is a topological property. |

## Component 1 — Learning Objectives

- LO1: Define $f:X\to Y$ (between topological spaces) as **continuous** iff $f^{-1}(V)$ is open in $X$ for **every** open $V$ in $Y$ — carefully identifying that the condition is stated on the **preimage** of open sets, not the forward image, directly refuting the misconception that continuity means open sets map forward to open sets.
- LO2: Verify that, for metric spaces specifically, this open-set definition is **equivalent** to the already-known ε-δ definition (`math.real.continuity-rigorous`) — recognizing the open-set definition as the more general formulation, valid even when no metric (hence no ε or δ) is available at all.
- LO3: State and apply two structural consequences: **composition of continuous maps is continuous**, and **continuity is a topological property** (preserved under relabeling via a homeomorphism, and expressible without reference to any particular metric) — previewing `math.top.homeomorphism`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.topological-space` (a topology $\tau$ on $X$ is a declared collection of "open" subsets satisfying the three closure axioms, and openness is relative to the chosen topology, never absolute) — this concept's continuity definition quantifies directly over $\tau$'s declared open sets.

## Component 3 — Core Explanation

**The open-set definition, stated on preimages**: for topological spaces $X,Y$, a function $f:X\to Y$ is **continuous** if, for **every** open set $V\subseteq Y$, the preimage $f^{-1}(V) = \{x\in X: f(x)\in V\}$ is open in $X$. The condition runs **backward**: it says something about which sets in the DOMAIN are open, as a consequence of which sets in the CODOMAIN are open — not the other way around. (Forward images of open sets are **not** required to be open under this definition at all; a continuous function can perfectly well send an open set to a non-open one, e.g. a constant function sends every open set to a single point, which is generally not open.)

**Equivalence with the ε-δ definition, for metric spaces**: when $X,Y$ are metric spaces (equipped with the metric topology, whose open sets are unions of open balls, per `math.top.topological-space`'s own motivating example), the open-set definition and `math.real.continuity-rigorous`'s ε-δ definition describe **exactly the same class of functions**. Unpacking the open-set condition at a point $a$: "$f^{-1}(V)$ open" for the open ball $V=B(f(a),\varepsilon)$ means there's an open ball $B(a,\delta)\subseteq f^{-1}(V)$ — which translates directly to "$|x-a|<\delta \Rightarrow |f(x)-f(a)|<\varepsilon$," the ε-δ condition exactly. The open-set definition is thus a **generalization**, not a replacement: it agrees with ε-δ wherever a metric exists, and remains meaningful even where one does not.

**Composition and continuity as a topological property**: if $f:X\to Y$ and $g:Y\to Z$ are both continuous, then $g\circ f:X\to Z$ is continuous — this follows directly from the open-set definition: for open $W\subseteq Z$, $(g\circ f)^{-1}(W) = f^{-1}(g^{-1}(W))$, and since $g$ continuous makes $g^{-1}(W)$ open in $Y$, and $f$ continuous then makes $f^{-1}(g^{-1}(W))$ open in $X$ — the definition composes cleanly with no extra work. Because the entire definition is phrased using only open sets (never distances), continuity is called a **topological property**: it is preserved under any relabeling of points that preserves which sets are open (a homeomorphism), and it can be studied and verified without ever invoking a metric, even in spaces where no natural metric exists.

## Component 4 — Worked Examples

**Example 1 (LO1 — preimage, not forward image, breaking MC-1)**: Let $f:\mathbb{R}\to\mathbb{R}$ be the constant function $f(x)=5$ for all $x$. Take the open set $V=(4,6)\subseteq\mathbb{R}$ (containing $5$): $f^{-1}(V) = \{x: f(x)\in(4,6)\} = \{x: 5\in(4,6)\} = \mathbb{R}$ (every $x$ satisfies this, since $f(x)=5$ always lies in $(4,6)$) — and $\mathbb{R}$ is open. Checking a DIFFERENT open $V'=(0,1)$ (not containing $5$): $f^{-1}(V') = \emptyset$ (no $x$ has $f(x)\in(0,1)$, since $f(x)=5$ always) — and $\emptyset$ is open too. So $f$ is continuous by the preimage test. But the FORWARD image of the open set $(0,1)\subseteq X$ under $f$ is $f((0,1)) = \{5\}$ — a single point, **not open** in $\mathbb{R}$. This proves continuity is a statement about preimages, not forward images: $f$ is continuous despite sending an open set forward to a non-open one.

**Example 2 (LO2 — the open-set and ε-δ definitions agree on metric spaces)**: Return to `math.real.continuity-rigorous`'s own example, $f(x)=2x+1$, continuous at $a=3$ via $\delta=\varepsilon/2$. Reframe using open sets: for the open interval $V=(f(3)-\varepsilon,f(3)+\varepsilon)=(7-\varepsilon,7+\varepsilon)$, the preimage $f^{-1}(V) = \{x: 7-\varepsilon<2x+1<7+\varepsilon\} = \{x: 3-\varepsilon/2<x<3+\varepsilon/2\} = (3-\varepsilon/2,3+\varepsilon/2)$ — precisely the open interval $(a-\delta,a+\delta)$ with $\delta=\varepsilon/2$, exactly matching that concept's own derived formula. The open-set definition and the ε-δ definition are computing the identical content, just phrased in different vocabulary (sets vs. explicit bounds).

**Example 3 (LO3 — composition and topological invariance)**: Let $f(x)=x^2$ and $g(x)=x+1$, both continuous on $\mathbb{R}$ (verifiable by either definition). Then $(g\circ f)(x) = x^2+1$ is continuous, confirmed directly by the composition rule without needing to re-verify continuity from scratch: for any open $W$, $(g\circ f)^{-1}(W)=f^{-1}(g^{-1}(W))$ is open because $g^{-1}(W)$ is open (by $g$'s continuity) and then $f^{-1}$ of that is open (by $f$'s continuity). Since this composition argument uses ONLY the open-set definition (no distances anywhere), the same argument, and the same conclusion, would hold identically even if $X,Y,Z$ were general topological spaces with no metric structure at all — proving continuity's genuinely topological (metric-free) character.

## Component 5 — Teaching Actions

### Teaching Action A01 — Continuity Runs on Preimages, Not Forward Images (Primitive P28: Conflict Evidence)

Present Example 1's direct conflict: the constant function is continuous (preimage test passes for every open $V$), yet sends the open interval $(0,1)$ forward to the single point $\{5\}$, which is not open. State clearly: "the definition of continuity ONLY constrains preimages. It says nothing at all about what happens to open sets going forward — and this example proves a continuous function can send an open set forward to something not open."

- **MC-1 hook**: ask "does continuity mean that f sends open sets to open sets?" — a "yes" answer reveals MC-1 (reversing the direction of the definition, applying the open-set condition to forward images instead of preimages).

### Teaching Action A02 — The Open-Set Definition Generalizes ε-δ, Doesn't Replace It (Primitive P03: Analogy Bridge)

Work Example 2's direct side-by-side translation, showing the open-set preimage $f^{-1}((7-\varepsilon,7+\varepsilon))$ unpacks to exactly the same interval $(3-\delta,3+\delta)$ the ε-δ proof derived. State: "this isn't a different fact — it's the SAME fact, in more general vocabulary. The advantage: this open-set version still makes sense even in spaces with no notion of distance at all, where 'ε' and 'δ' wouldn't even be defined."

- **MC-2 hook**: ask "is the open-set definition just a rephrasing of ε-δ with no independent use, since ε-δ already works fine for metric spaces?" — a "yes" answer reveals MC-2 (missing that the open-set definition is the ONLY available definition once a space lacks a metric, making it strictly more broadly applicable, not merely a stylistic alternative).

### Teaching Action A03 — Composition and Topological Invariance (Primitive P11: Representation Shift)

Work Example 3's composition argument symbolically, emphasizing that $(g\circ f)^{-1}(W)=f^{-1}(g^{-1}(W))$ is a set-theoretic identity requiring no metric anywhere. State: "because the whole argument only ever mentions open sets — never distances — it works identically in ANY topological space. That's exactly why continuity is called a 'topological property': verifying it, and its consequences like composition, never actually needs a metric."

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Using the preimage definition, verify that $f(x)=3x$ is continuous by checking $f^{-1}((a,b))$ is open for a generic open interval $(a,b)$.
  2. Give an example (it may reuse Example 1's constant function or invent a new one) of a continuous function that sends some open set forward to a non-open set, and explain why this does NOT contradict the definition of continuity.
  3. Using `math.real.continuity-rigorous`'s ε-δ definition and this concept's open-set definition side by side, explain in your own words why they agree for metric spaces, referencing the open-ball-to-preimage translation from Example 2.
  4. If $f$ and $g$ are both continuous, explain why you do not need to re-derive continuity of $g\circ f$ from scratch, citing the composition rule directly.
- **P76 (Transfer Probe, mode = cross-link probe against `math.real.continuity-rigorous`)**: "Recall from your `math.real.continuity-rigorous` lesson the ε-δ proof that $f(x)=3x-2$ is continuous at $a=5$, using $\delta=\varepsilon/3$. (a) Translate this into the open-set language of THIS lesson: for the open interval $V=(f(5)-\varepsilon,f(5)+\varepsilon)$, compute $f^{-1}(V)$ explicitly and confirm it matches the interval $(5-\delta,5+\delta)$ with $\delta=\varepsilon/3$ from that lesson. (b) That lesson emphasized that δ must be PRODUCED IN RESPONSE TO an arbitrary given ε, never chosen first — explain how this same logical order (arbitrary $V$ first, then find the matching open preimage) is built directly into THIS lesson's 'for every open $V$' phrasing. (c) Explain why, unlike that lesson's ε-δ definition, THIS lesson's open-set definition could in principle be applied to a space where 'distance' isn't even defined — using the topological-property idea from Component 3."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONTINUITY-DEFINITION-DIRECTION-REVERSED | Believing continuity requires open sets to map FORWARD to open sets, rather than correctly requiring preimages of open sets to be open | Foundational |
| MC-2 | OPEN-SET-DEFINITION-TREATED-AS-MERE-REPHRASING | Treating the open-set definition as just a stylistic alternative to ε-δ with no independent value, missing that it is the only available definition in spaces lacking a metric | Foundational |
| MC-3 | COMPOSITION-CONTINUITY-RE-DERIVED-FROM-SCRATCH | Failing to invoke the composition rule directly, instead attempting to re-verify continuity of a composite function via ε-δ or preimages from first principles every time | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Continuity-Direction-Reversed Assumption") → P41 (detect: ask whether $f$ sending the open interval $(0,1)$ forward to a single point $\{5\}$ means $f$ is NOT continuous) → P64 (conceptual shift: re-walk Example 1's explicit preimage computation, re-anchoring on "the definition only constrains what happens BACKWARD from open sets in $Y$ to sets in $X$ — forward images are simply not part of the definition").
- **B02 (targets MC-2)**: P27 (name it: "Open-Set-Definition-as-Rephrasing Assumption") → P41 (detect: ask why anyone would bother with the open-set definition if ε-δ already works for the spaces being studied) → P64 (conceptual shift: re-anchor on `math.top.topological-space`'s own point that not every topology comes from a metric — so in a space with no metric at all, ε-δ literally cannot be written down, while the open-set definition still applies unchanged).
- **B03 (targets MC-3)**: P27 (name it: "Composition Re-Derivation From Scratch") → P41 (detect: ask a student to prove $g\circ f$ is continuous for two already-known-continuous functions, and observe whether they attempt a fresh ε-δ or preimage argument rather than citing the composition rule) → P64 (conceptual shift: re-walk Example 3's set-identity argument, $(g\circ f)^{-1}(W)=f^{-1}(g^{-1}(W))$, showing the composition rule is itself a short, general, one-time proof that applies to ANY pair of continuous functions, making case-by-case re-derivation unnecessary).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.topological-space` (the declared-open-sets framework, and the "openness is relative, never absolute" principle this concept's definition directly quantifies over).
- **Unlocks**: `math.top.homeomorphism` (a homeomorphism is a continuous bijection with continuous inverse — directly building on, and named as, "continuity is a topological property" here).
- **Cross-link**: KG lists `math.real.continuity-rigorous` as a cross-link — **verified authored** via `ls docs/curriculum/blueprints/math.real.continuity-rigorous.md` — so P76_mode = **cross-link probe**, directly reusing that blueprint's own $f(x)=3x-2$ at $a=5$ worked example as the transfer probe's anchor, per this corpus's established cross-link-probe convention.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag places this at a "3 TAs + cross-link-probe gate" tier — A01 (preimage direction), A02 (equivalence with ε-δ, generalization), and A03 (composition and topological invariance) each target a distinct LO, appropriate for a compact but conceptually dense re-expression of an already-known idea in more general language.
- The constant-function example (Example 1) was deliberately chosen to make the preimage-vs-forward-image distinction as stark as possible: it is continuous by every reasonable standard, yet trivially demonstrates a forward image collapsing an open set to a single point — the strongest, simplest possible counterexample to the forward-image misreading.
- The cross-link probe deliberately reuses `math.real.continuity-rigorous`'s own worked example verbatim (rather than a fresh function), maximizing the transfer signal: the student must translate already-familiar ε-δ content into the new open-set vocabulary, confirming genuine understanding of the equivalence rather than treating the two definitions as unrelated facts to memorize separately.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.real.continuity-rigorous authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.real.continuity-rigorous) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct re-expression of an already-known definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

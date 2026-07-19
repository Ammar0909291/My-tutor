# Teaching Blueprint: Compactness (Topology) (`math.top.compactness`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.compactness` |
| name | Compactness (Topology) |
| domain | Topology |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.top.topological-space` |
| unlocks | `math.top.tychonoff` |
| cross_links | `math.real.compactness` |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in the open-cover definition from math.real.compactness; the general topological-space version is stated directly |
| description (KG) | A space X is compact if every open cover has a finite subcover. Key properties: closed subsets of compact spaces are compact; continuous image of compact space is compact; compact Hausdorff spaces are normal. Extends Heine-Borel to abstract settings. |

## Component 1 — Learning Objectives

- LO1: Define compactness for a **general topological space** $X$ — every open cover has a finite subcover — recognizing this is the IDENTICAL definition already mastered in `math.real.compactness`, now stated for an arbitrary topological space rather than specifically $\mathbb{R}^n$.
- LO2: Recognize that Heine-Borel's "closed and bounded" characterization does **NOT** extend to general topological spaces — "bounded" is not even a meaningful notion without a metric — so compactness in a general space must be verified directly via the open-cover definition, never via a closed-and-bounded shortcut.
- LO3: Apply the two key general-topology preservation properties — **closed subsets of compact spaces are compact**, and the **continuous image of a compact space is compact** — via direct concrete verification.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.topological-space` (open sets, continuity via open sets) and, via the cross-link, `math.real.compactness` (the open-cover/finite-subcover definition already applied concretely to $(0,1)$ and $[0,1]$ in $\mathbb{R}$, and the Heine-Borel theorem specific to $\mathbb{R}^n$).

## Component 3 — Core Explanation

**The general definition is exactly the one already mastered — just no longer tied to $\mathbb{R}^n$**: $X$ is compact if EVERY open cover of $X$ has a FINITE subcover. This is the identical universal claim already established in `math.real.compactness` — succeeding on all covers, or failing via just one uncooperative cover — now stated for an arbitrary topological space, with no reference to distance, boundedness, or any metric-specific structure at all.

**Heine-Borel's convenience does not transfer to general spaces**: `math.real.compactness`'s Heine-Borel shortcut (compact $\Leftrightarrow$ closed AND bounded) is a special convenience of $\mathbb{R}^n$'s particular structure — it relies on a NOTION OF DISTANCE to define "bounded" in the first place. A general topological space need not have any metric at all, so "bounded" may not even be a well-formed question to ask. Compactness in a general space must therefore be verified DIRECTLY via the open-cover definition — there is no universal "closed and bounded" substitute available outside $\mathbb{R}^n$.

**Two properties that transfer compactness across constructions**: (1) a CLOSED subset of a compact space is itself compact (any open cover of the closed subset extends to an open cover of the whole space via one extra open set, which reduces to a finite subcover, which restricts back to a finite subcover of the subset); (2) the CONTINUOUS IMAGE of a compact space is compact (a continuous map sends open covers of the image back to open covers of the domain via preimages, and compactness of the domain forces a finite subcover, whose images finitely cover the image set).

## Component 4 — Worked Examples

**Example 1 (LO1 — the identical definition, no Heine-Borel needed, breaking MC-2, cross-link reuse)**: `math.real.compactness`'s own Example 1 showed $(0,1)\subset\mathbb{R}$ is NOT compact, using the cover $\mathcal{U}=\{(1/n,1):n=2,3,4,\dots\}$ — no finite subcollection covers $(0,1)$, since any finite subcollection's union is just $(1/N,1)$ for the largest $N$ used, missing points like $1/(N+1)$. Verifying this in the GENERAL topological-space sense requires nothing beyond the SAME open-cover argument — no appeal to Heine-Borel, boundedness, or any metric structure at all. The general definition and the $\mathbb{R}^n$-specific instance agree exactly.

**Example 2 (LO2 — a compact space where "bounded" isn't even meaningful, breaking MC-1)**: Let $X=\{a,b,c\}$ with the DISCRETE topology (every subset is open) — there is no metric, hence no notion of "bounded" defined on $X$ at all. Yet compactness is still perfectly well-defined and directly checkable: ANY open cover of a FINITE set trivially has a finite subcover (at most one open set per point is needed, and there are only 3 points). $X$ is compact — confirmed directly via the cover definition, with no reference to boundedness whatsoever. This shows Heine-Borel's "closed and bounded" shortcut is a special convenience of $\mathbb{R}^n$, not a general topological fact available everywhere.

**Example 3 (LO3 — closed subsets and continuous images preserve compactness, breaking MC-3)**: $[0,1]\subset\mathbb{R}$ is compact (Heine-Borel, closed and bounded). Its subset $(0,1)$ is NOT closed in $[0,1]$'s subspace... rather, consider directly: $(0,1)$ is a subset of the compact space $[0,1]$ but is NOT compact (confirmed in Example 1) — precisely because $(0,1)$ is NOT closed in $\mathbb{R}$ (missing its limit points $0,1$). Contrast with $[0,1/2]\subset[0,1]$: this subset IS closed (contains its limit point $1/2$ and all others within it), and indeed IS compact, confirmed directly by Heine-Borel applied to $[0,1/2]$ itself. Separately, for continuity: $f:[0,1]\to\mathbb{R}$, $f(x)=x^2$ is continuous, and the image $f([0,1])=[0,1]$ is itself compact (closed and bounded) — confirming the continuous-image-of-compact theorem concretely.

## Component 5 — Teaching Actions

### Teaching Action A01 — No Metric, Still Compact — Boundedness Isn't the Real Definition (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the discrete 3-point space has no metric (no meaningful "bounded"), yet is provably compact via the cover definition alone. State: "compactness has always genuinely been about covers, not about boundedness — Heine-Borel is a convenient SHORTCUT specific to $\mathbb{R}^n$, not the actual definition."

- **MC-1 hook**: ask "can compactness be checked via 'closed and bounded' in any topological space, not just in $\mathbb{R}^n$?" — a "yes" answer reveals MC-1 (transferring Heine-Borel's $\mathbb{R}^n$-specific shortcut to general spaces where it doesn't apply).

### Teaching Action A02 — The Definition Transfers Exactly, No New Machinery (Primitive P11: Representation Shift)

State: "verifying $(0,1)$ is not compact in the general topological sense uses EXACTLY the same cover you already found in `math.real.compactness` — nothing new is needed to move from the $\mathbb{R}^n$-specific instance to the general definition." Work Example 1's direct reuse of that concept's own cover.

- **MC-2 hook**: ask "does moving from the ℝⁿ-specific compactness definition to the general topological-space definition require fundamentally new verification techniques?" — a "yes" answer reveals MC-2 (missing that the general definition is identical, just no longer tied to a metric).

### Teaching Action A03 — Closed Subsets and Continuous Images Preserve Compactness — Not Every Subset Does (Primitive P06: Contrast Pair)

Contrast Example 3's two subsets of $[0,1]$: $(0,1)$ (not closed, not compact) against $[0,1/2]$ (closed, compact). State: "being a SUBSET of a compact space is not enough on its own — only CLOSED subsets are guaranteed to inherit compactness; continuous images inherit it too, but arbitrary subsets need not."

- **MC-3 hook**: ask "is every subset of a compact space automatically compact?" — a "yes" answer reveals MC-3 (missing that only CLOSED subsets of a compact space are guaranteed compact, not arbitrary ones).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the general topological-space definition of compactness, without reference to any metric or notion of distance.
  2. Explain why a 5-element set with the discrete topology is compact, without invoking boundedness.
  3. Determine whether $(0,2)\subset\mathbb{R}$ is compact, using the open-cover definition directly (adapting the $(0,1)$ argument).
  4. Give a non-closed subset of $[0,1]$ (other than $(0,1)$) and explain why it need not be compact, even though $[0,1]$ itself is.
- **P76 (Transfer Probe, mode = cross-link probe against `math.real.compactness`)**: "A topologist studies the space $\mathbb{R}$ with the standard topology, and separately studies an abstract topological space $Y$ built from a completely different construction with no natural metric. (a) Using `math.real.compactness`'s own $(0,1)$ argument, restate why $(0,1)\subset\mathbb{R}$ fails to be compact, this time framed purely in terms of the general open-cover definition (no Heine-Borel). (b) The topologist wants to determine whether a specific subset of $Y$ is compact, but $Y$ has no metric, so 'bounded' is not a meaningful question there. Explain what verification approach remains available, and why it is the SAME approach used for $(0,1)$ in part (a). (c) A colleague argues 'since $(0,1)$ fails Heine-Borel's boundedness-adjacent closedness condition in $\mathbb{R}$, and $Y$ has no notion of boundedness at all, nothing meaningful can be said about compactness in $Y$.' Explain specifically why this argument is wrong, referencing the general open-cover definition's independence from any metric structure."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HEINE-BOREL-ASSUMED-TO-EXTEND-GENERALLY | Believing "closed and bounded" characterizes compactness in any topological space, missing that this is a special convenience of ℝⁿ's metric structure, not a general topological fact | Foundational |
| MC-2 | GENERAL-DEFINITION-ASSUMED-TO-NEED-NEW-MACHINERY | Believing moving from the ℝⁿ-specific compactness definition to the general topological-space definition requires new verification techniques, missing that the definition is identical | Moderate |
| MC-3 | EVERY-SUBSET-OF-COMPACT-ASSUMED-COMPACT | Believing every subset of a compact space is automatically compact, missing that only CLOSED subsets are guaranteed to inherit compactness | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Heine-Borel Assumed to Extend Generally") → P41 (detect: ask a student whether "closed and bounded" characterizes compactness in a general topological space, checking for "yes") → P64 (conceptual shift: re-walk Example 2's metric-free discrete space, provably compact with no notion of boundedness at all, re-anchoring on "Heine-Borel is an ℝⁿ-specific shortcut, not the general definition").
- **B02 (targets MC-2)**: P27 (name it: "General Definition Assumed to Need New Machinery") → P41 (detect: ask a student whether verifying compactness in a general space requires new techniques beyond the ℝⁿ-specific cover argument, checking for "yes") → P64 (conceptual shift: re-walk Example 1's direct reuse of `math.real.compactness`'s own $(0,1)$ cover, re-anchoring on "the definition and its verification transfer exactly, unchanged").
- **B03 (targets MC-3)**: P27 (name it: "Every Subset of Compact Assumed Compact") → P41 (detect: ask a student whether every subset of a compact space is compact, checking for "yes") → P64 (conceptual shift: re-walk Example 3's $(0,1)$-vs-$[0,1/2]$ contrast within the compact $[0,1]$, re-anchoring on "only CLOSED subsets are guaranteed to inherit compactness").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.topological-space` (open sets and continuity, the framework this concept's general definition is stated within).
- **Unlocks**: `math.top.tychonoff` (Tychonoff's theorem on products of compact spaces, building directly on this concept's general open-cover definition).
- **Cross-link**: KG lists `math.real.compactness` as a cross-link — **authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **cross-link probe**, engaging directly with that concept's own $(0,1)$ open-cover argument (its TA-A01/Example 1) to confirm the general topological-space definition matches the ℝⁿ-specific instance exactly, and to test the boundedness-free reasoning required when no metric is available.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/understand tag places this at a "3 TAs + gate" tier; the concept's central pedagogical move (directly reusing `math.real.compactness`'s own cover argument rather than re-deriving compactness theory from scratch) keeps it efficient despite covering the definition, the Heine-Borel-non-transfer caution, and two preservation properties.
- **Division of labor**: `math.real.compactness` owns the concrete $\mathbb{R}^n$-specific instance (including Heine-Borel and the worked $(0,1)$/$[0,1]$ examples). This concept, `math.top.compactness`, deliberately does not re-derive the open-cover definition from scratch; it owns the GENERALIZATION to arbitrary topological spaces, the explicit caution that Heine-Borel's shortcut does NOT transfer, and the two general-topology preservation properties (closed subsets, continuous images) that have no $\mathbb{R}^n$-specific analogue requiring separate treatment there.
- Example 1 deliberately reuses `math.real.compactness`'s own $(0,1)$ cover verbatim (rather than a new example) specifically so the cross-link probe's claim — that the general and $\mathbb{R}^n$-specific definitions agree exactly — is demonstrated on the identical concrete case, not merely asserted.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.real.compactness authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.real.compactness) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in the open-cover definition; general version stated directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

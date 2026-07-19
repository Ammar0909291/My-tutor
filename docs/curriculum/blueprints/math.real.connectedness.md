# Teaching Blueprint: Connectedness (`math.real.connectedness`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.connectedness` |
| name | Connectedness |
| domain | Real Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.real.open-sets` |
| unlocks | `math.real.ivt` |
| cross_links | `math.top.connectedness` |
| CPA_entry_stage | C (Concrete) — begins with a direct separation check on a specific disconnected set before the general definition |
| description (KG) | A set E is connected if it cannot be written as the union of two non-empty separated sets. Intervals in ℝ are the only connected subsets. Preserved under continuous maps. Intermediate Value Theorem: consequence of connectedness. |

## Component 1 — Learning Objectives

- LO1: Define **connectedness** — $E$ is connected if it CANNOT be written as a union of two nonempty **separated** sets $A,B$ (meaning $A\cap\bar B=\varnothing$ AND $\bar A\cap B=\varnothing$ — neither set touches the other's closure) — distinguishing this precise, closure-based definition from an informal "no visible gap" intuition.
- LO2: Apply the theorem that **intervals in $\mathbb{R}$ are the only connected subsets**, by explicitly exhibiting a separation for a specific non-interval set, and recognizing a set can fail to be an interval (hence fail to be connected) even without an obviously "missing" point.
- LO3: Apply the theorem that **connectedness is preserved under continuous maps** to derive the **Intermediate Value Theorem** as a direct consequence, rather than as an independently-proven fact requiring its own separate technique.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.open-sets` (open balls, open sets, closed sets, closure — the smallest closed set containing a given set).

## Component 3 — Core Explanation

**Connectedness is defined via separation, a precise condition stronger than "having a visible gap"**: $E$ is connected if it cannot be split into two nonempty SEPARATED sets $A,B$ with $E=A\cup B$ — where separated means $A\cap\bar B=\varnothing$ and $\bar A\cap B=\varnothing$ (neither set's closure touches the other set at all). This is a precise, checkable condition involving CLOSURES specifically — not merely an informal sense that the set "looks split" or "has a gap you could point to."

**Only intervals are connected in $\mathbb{R}$**: any subset of $\mathbb{R}$ that is NOT an interval (i.e., contains two points $a<b$ but omits some point strictly between them) can be split into two separated sets using that omitted point as a dividing line — proving it is NOT connected. Conversely, genuine intervals resist every such splitting attempt. This theorem is often surprising precisely because a set can fail to be an interval — and hence fail to be connected — even when the "missing" point is not itself an element of the ambient set being tested (as with $\mathbb{Q}$, which is missing every irrational, including ones that split it cleanly).

**The Intermediate Value Theorem is a direct consequence of connectedness-preservation, not an independent fact**: continuous maps preserve connectedness — the continuous image of a connected set is connected. Combined with "intervals are the only connected subsets of $\mathbb{R}$," a continuous $f:[a,b]\to\mathbb{R}$ has $f([a,b])$ both connected (since $[a,b]$ is connected and continuity preserves this) AND therefore an interval — meaning it contains every value between $f(a)$ and $f(b)$. The Intermediate Value Theorem's conclusion falls out entirely from these two already-established facts, with no separate IVT-specific proof technique required.

## Component 4 — Worked Examples

**Example 1 (LO1 — a direct separation check, breaking MC-1)**: Let $E=[0,1]\cup[2,3]$. Set $A=[0,1]$, $B=[2,3]$. Check separation: $\bar A=[0,1]$ (already closed), $\bar B=[2,3]$. $A\cap\bar B=[0,1]\cap[2,3]=\varnothing$. $\bar A\cap B=[0,1]\cap[2,3]=\varnothing$. Both intersections are empty — $A,B$ are genuinely SEPARATED, and $E=A\cup B$ — so $E$ is NOT connected, confirmed via the formal closure-based check (not merely the visual observation that there's a gap between $1$ and $2$, though that intuition happens to align here).

**Example 2 (LO2 — a set failing to be an interval without an "obviously missing" point, breaking MC-2)**: Consider $\mathbb{Q}\subset\mathbb{R}$ (the rationals). Let $A=\mathbb{Q}\cap(-\infty,\sqrt2)$, $B=\mathbb{Q}\cap(\sqrt2,\infty)$ — since $\sqrt2$ is irrational, every rational number lies in exactly one of these two sets, so $A\cup B=\mathbb{Q}$. Check separation: $\bar B=[\sqrt2,\infty)$, and $A\cap\bar B=\varnothing$ (since $A$'s elements are all strictly less than $\sqrt2$); $\bar A=(-\infty,\sqrt2]$, and $\bar A\cap B=\varnothing$ (since $B$'s elements are all strictly greater than $\sqrt2$). $A,B$ are separated — $\mathbb{Q}$ is NOT connected, split at the irrational point $\sqrt2$, even though $\sqrt2\notin\mathbb{Q}$ itself and so is not a "missing point" one would immediately notice by inspecting $\mathbb{Q}$ alone. Contrast with a genuine interval like $[0,1]$, for which NO such separation exists at any point.

**Example 3 (LO3 — the Intermediate Value Theorem falls out directly, breaking MC-3)**: Let $f:[a,b]\to\mathbb{R}$ be continuous, with $f(a)<0<f(b)$ (or any target value strictly between $f(a)$ and $f(b)$). $[a,b]$ is connected (a genuine interval). Since continuous maps preserve connectedness, $f([a,b])$ is connected — and since intervals are the ONLY connected subsets of $\mathbb{R}$, $f([a,b])$ must ITSELF be an interval (or a single point). An interval containing both $f(a)$ and $f(b)$ contains EVERY value between them, including $0$ — so some $c\in[a,b]$ has $f(c)=0$. This is the full Intermediate Value Theorem conclusion, derived entirely from connectedness-preservation plus the intervals-are-the-only-connected-sets theorem, with no separate, IVT-specific argument required.

## Component 5 — Teaching Actions

### Teaching Action A01 — Separation Is a Precise Closure-Based Condition, Not "Looks Split" (Primitive P11: Representation Shift)

State: "connectedness isn't decided by whether a set 'looks' split apart — it's decided by whether it can genuinely be written as two sets whose CLOSURES don't touch each other at all." Work Example 1's explicit closure computation confirming separation.

- **MC-1 hook**: ask "is a set disconnected simply whenever you can visually identify a 'gap' in it?" — a "yes" answer reveals MC-1 (using an informal visual notion rather than the precise closure-based separation definition).

### Teaching Action A02 — Non-Interval Sets Can Split at a Point Not Even in the Set (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\mathbb{Q}$ splits cleanly at the irrational $\sqrt2$, a point not even a member of $\mathbb{Q}$. State: "a set can fail to be connected by splitting at a point it doesn't even contain — the theorem 'only intervals are connected' catches this precisely."

- **MC-2 hook**: ask "must a subset of ℝ that fails to be connected always have an obviously 'missing' point that is itself a member of the ambient space being considered?" — a "yes" answer reveals MC-2 (missing that a splitting point, like an irrational for ℚ, need not be a member of the set under consideration).

### Teaching Action A03 — IVT Is Connectedness in Disguise, Not a Separate Fact (Primitive P06: Contrast Pair)

Contrast treating IVT as requiring its own dedicated proof technique against Example 3's derivation, which uses only two already-established facts (connectedness-preservation; intervals are the only connected sets). State: "the Intermediate Value Theorem isn't proven by some special IVT-specific argument — it falls directly out of connectedness, once you already have these two theorems."

- **MC-3 hook**: ask "does the Intermediate Value Theorem require its own independent proof technique, separate from the theory of connectedness?" — a "yes" answer reveals MC-3 (missing that IVT is a direct consequence of connectedness-preservation).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Determine whether $E=(0,1)\cup(1,2)$ is connected, by attempting to exhibit a separation explicitly.
  2. Explain why $[0,1]$ (a genuine interval) resists every attempted separation, in contrast to Example 1's $[0,1]\cup[2,3]$.
  3. Using the irrational $\sqrt3$ (instead of $\sqrt2$), show that $\mathbb{Q}$ can also be separated at this different irrational point.
  4. Using connectedness-preservation and the intervals-are-the-only-connected-sets theorem, explain (without invoking IVT by name) why a continuous function on $[0,1]$ taking the value $-2$ at $0$ and $5$ at $1$ must take every value between $-2$ and $5$ somewhere on $[0,1]$.
- **P76 (Transfer Probe, mode = independence)**: "A physicist models a continuous temperature function $T(x)$ along a connected metal rod $[0,L]$, and observes $T(0)=10°C$ and $T(L)=30°C$. (a) Using this lesson's connectedness-preservation and intervals-only theorems (not simply citing IVT by name), explain why the rod must have a point where the temperature is exactly $20°C$. (b) The physicist then examines a DIFFERENT rod made of two physically separate pieces (with a gap between them, no material connecting them), and wonders whether the same guarantee applies to a continuous temperature function defined separately on each piece. Using this lesson's separation-based reasoning, explain why the guarantee does NOT automatically transfer to this disconnected domain. (c) A colleague argues 'since both pieces of the second rod are each individually intervals, and hence each individually connected, the theorem should still apply to their union as a whole.' Explain specifically why this argument is incorrect, referencing this lesson's Example 1 reasoning."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONNECTEDNESS-AS-INFORMAL-VISUAL-NOTION | Believing a set's connectedness is decided by visually identifying a "gap," missing the precise closure-based separation definition | Foundational |
| MC-2 | DISCONNECTION-ASSUMED-TO-REQUIRE-A-MEMBER-GAP | Believing a disconnected set must have an obviously "missing" point that is itself a member of the ambient space, missing that a splitting point (like an irrational for ℚ) need not belong to the set at all | Foundational |
| MC-3 | IVT-ASSUMED-TO-NEED-INDEPENDENT-PROOF | Believing the Intermediate Value Theorem requires its own independent proof technique, missing that it is a direct consequence of connectedness-preservation and the intervals-only theorem | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Connectedness as Informal Visual Notion") → P41 (detect: ask a student whether a set is disconnected exactly when a visible gap can be pointed to, checking for "yes, that's sufficient") → P64 (conceptual shift: re-walk Example 1's explicit closure computation, re-anchoring on "separation is decided by closures not touching, not visual inspection").
- **B02 (targets MC-2)**: P27 (name it: "Disconnection Assumed to Require a Member Gap") → P41 (detect: ask a student whether ℚ, having no visibly "missing" rational number, must therefore be connected, checking for "yes") → P64 (conceptual shift: re-walk Example 2's split of ℚ at the irrational √2, re-anchoring on "a splitting point need not be a member of the set itself").
- **B03 (targets MC-3)**: P27 (name it: "IVT Assumed to Need Independent Proof") → P41 (detect: ask a student whether IVT requires a separate, dedicated proof technique, checking for "yes") → P64 (conceptual shift: re-walk Example 3's direct derivation from connectedness-preservation plus the intervals-only theorem, re-anchoring on "IVT is connectedness applied, not an independent fact").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.open-sets` (open sets, closed sets, and closure — the machinery this concept's separation definition directly uses).
- **Unlocks**: `math.real.ivt` (the Intermediate Value Theorem, derived here as a direct consequence and deepened in its own dedicated concept).
- **Cross-link**: KG lists `math.top.connectedness` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe once that entry exists, connecting this concept's $\mathbb{R}$-specific separation definition to the general topological-space definition of connectedness (paralleling the `math.real.compactness`/`math.top.compactness` relationship already established in this corpus).

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag places this at a "3 TAs + gate" tier, appropriately compact given the concept builds directly on `math.real.open-sets`'s already-mastered closure machinery, focusing the budget on the separation definition, the intervals-only theorem, and IVT's direct derivation.
- **Division of labor**: `math.real.open-sets` owns open/closed sets and closure. This concept, `math.real.connectedness`, deliberately does not re-teach that machinery; it owns the SEPARATION-based connectedness definition built on top of closure, the intervals-are-the-only-connected-subsets theorem, and the direct derivation of IVT as connectedness's consequence — rather than treating IVT as an independently-proven fact.
- Example 2's use of $\mathbb{Q}$ (rather than a more obviously "gapped" set) was deliberately chosen as the most conceptually surprising instance of non-connectedness — a set with no missing member of its own, split cleanly by an irrational number entirely outside it — precisely to break MC-2's assumption that disconnection always requires an obviously-missing member point.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.top.connectedness unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: direct separation check on a specific disconnected set before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

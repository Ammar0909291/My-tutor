# Teaching Blueprint: Power Set (`math.found.power-set`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.power-set` |
| name | Power Set |
| domain | Foundations |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.found.subset` |
| unlocks | `math.found.cardinality` |
| cross_links | `math.top.topological-space` (authored earlier — see Component 7) |
| CPA_entry_stage | P (Pictorial) — developing learner builds the power set of a small, concrete set by systematically listing subsets before generalizing to the $2^n$ formula |
| description (KG) | The power set $\mathcal{P}(A)$ is the set of all subsets of $A$; if $A$ has $n$ elements, then $\mathcal{P}(A)$ has $2^n$ elements. |

## Component 1 — Learning Objectives

- LO1: Define $\mathcal{P}(A)$ as the set whose ELEMENTS are exactly the subsets of $A$ (as `math.found.subset` already defines "subset") — recognizing this as a set of SETS, one level of abstraction higher than $A$ itself — and correctly list $\mathcal{P}(A)$ completely for a small concrete set $A$, including both $\varnothing$ and $A$ itself as members.
- LO2: State and justify the counting formula $|\mathcal{P}(A)|=2^{|A|}$ for finite $A$, using the "each element is either IN or OUT" binary-choice argument (one independent yes/no choice per element), and correctly compute $|\mathcal{P}(A)|$ for sets of specified sizes, including recognizing $|\mathcal{P}(\varnothing)|=1$ (not 0) as the boundary case.
- LO3 (cross-link objective): Recognize `math.top.topological-space`'s own DISCRETE topology — "the whole power set" — as a genuine, concrete INSTANCE of $\mathcal{P}(A)$ used as a topology $\tau$ on $A$ itself (i.e., $\tau=\mathcal{P}(A)$), verifying directly that this choice of $\tau$ satisfies the three topology axioms specifically BECAUSE $\mathcal{P}(A)$ already contains every possible subset, including $\varnothing$ and $A$, and is automatically closed under unions and intersections.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.subset` (the subset relation $A\subseteq B$: every element of $A$ is also an element of $B$).

## Component 3 — Core Explanation

**The power set collects ALL subsets of $A$ into a single new set**: `math.found.subset` already defines what it means for $S$ to be a subset of $A$ ($S\subseteq A$). $\mathcal{P}(A)$ is simply the set whose ELEMENTS are exactly these subsets — every possible $S$ with $S\subseteq A$ becomes a single element of $\mathcal{P}(A)$. This includes the EMPTY set $\varnothing$ (vacuously a subset of every set, by `math.found.subset`'s own definition — every element of $\varnothing$, of which there are none, is trivially also in $A$) and $A$ ITSELF (trivially a subset of itself). Both must always be listed as members of $\mathcal{P}(A)$, even though it can feel tempting to omit them as "trivial" cases.

**The $2^n$ formula comes from one independent binary choice per element**: to build any particular subset $S\subseteq A$ (where $A$ has $n$ elements), go through $A$'s elements one at a time and decide, independently for EACH element, whether it is IN $S$ or OUT of $S$ — 2 choices per element, $n$ elements, giving $2\times2\times\cdots\times2=2^n$ total distinct subsets by the multiplication principle. This directly explains why $|\mathcal{P}(A)|=2^{|A|}$: it isn't an arbitrary formula to memorize, but a direct count of all possible IN/OUT choice-sequences. The boundary case $A=\varnothing$ (so $n=0$) gives $2^0=1$ — correct, since $\mathcal{P}(\varnothing)=\{\varnothing\}$ has exactly ONE element (the empty set itself), not zero elements, since $\varnothing$ genuinely IS a subset of $\varnothing$.

**The discrete topology IS the power set, used as a concrete topology**: `math.top.topological-space` names the discrete topology as "the whole power set" — this is not merely an analogy or a coincidental naming choice. Taking $\tau=\mathcal{P}(A)$ (the entire power set) as the collection of "open sets" on $A$ automatically satisfies all three topology axioms: $\varnothing,A\in\tau$ (both are always members of $\mathcal{P}(A)$, as established above); arbitrary unions of members of $\tau$ stay in $\tau$ (any union of subsets of $A$ is itself a subset of $A$, hence automatically a member of $\mathcal{P}(A)$); finite intersections likewise stay in $\tau$ for the same reason. Choosing the LARGEST possible $\tau$ (all of $\mathcal{P}(A)$) trivially satisfies the axioms because there is nothing left OUT of $\tau$ that a union or intersection could ever produce.

## Component 4 — Worked Examples

**Example 1 (LO1 — listing a complete power set for a small set, breaking MC-1)**: for $A=\{x,y\}$, systematically listing every subset: $\varnothing$ (no elements), $\{x\}$, $\{y\}$ (single elements), $\{x,y\}$ (both elements, i.e. $A$ itself) — so $\mathcal{P}(A)=\{\varnothing,\{x\},\{y\},\{x,y\}\}$, a set with 4 elements (each of which is itself a SET). Deliberately including $\varnothing$ and $\{x,y\}$ (rather than omitting them as "trivial") gives the COMPLETE, correct power set.

**Example 2 (LO2 — the $2^n$ counting argument and the $A=\varnothing$ boundary case, breaking MC-2)**: for $A=\{p,q,r\}$ ($n=3$ elements), the binary-choice argument gives $2^3=8$ subsets — confirmed by direct listing: $\varnothing,\{p\},\{q\},\{r\},\{p,q\},\{p,r\},\{q,r\},\{p,q,r\}$, exactly 8. For the boundary case $A=\varnothing$ ($n=0$): the formula gives $2^0=1$, and direct listing confirms $\mathcal{P}(\varnothing)=\{\varnothing\}$ — exactly ONE element (the empty set itself is a member of this power set), NOT zero elements as one might naively guess from "there's nothing in $A$ to make subsets from."

**Example 3 (LO3 — verifying the discrete topology's axioms hold because $\tau=\mathcal{P}(A)$, breaking MC-3)**: for $A=\{x,y\}$ (Example 1's set), taking $\tau=\mathcal{P}(A)=\{\varnothing,\{x\},\{y\},\{x,y\}\}$ as a candidate topology: checking axiom 1, $\varnothing\in\tau$ ✓ and $A=\{x,y\}\in\tau$ ✓ (both automatically present, since $\mathcal{P}(A)$ always contains them, per Component 3). Checking axiom 2 (unions stay in $\tau$): $\{x\}\cup\{y\}=\{x,y\}\in\tau$ ✓ — and in general, ANY union of subsets of $A$ is itself a subset of $A$, hence automatically in $\mathcal{P}(A)=\tau$. Checking axiom 3 (finite intersections stay in $\tau$): $\{x\}\cap\{y\}=\varnothing\in\tau$ ✓ — again automatic, since any intersection of subsets of $A$ is still a subset of $A$. All three axioms hold PRECISELY because $\tau$ was chosen to be the ENTIRE power set, leaving no subset of $A$ that a union or intersection could ever produce outside of $\tau$.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Power Set Is a Set of Sets — Include $\varnothing$ and $A$ Itself (Primitive P11: Representation Shift)

State: "$\mathcal{P}(A)$'s elements aren't the elements of $A$ — they're the SUBSETS of $A$, each one packaged as a single element of this new set; and both $\varnothing$ and $A$ itself always belong, even though it's tempting to skip them as trivial." Walk Example 1's complete listing.

- **MC-1 hook**: ask "should $\varnothing$ and $A$ itself be included as elements of $\mathcal{P}(A)$, or are they trivial exceptions to skip?" — a "skip them" answer reveals MC-1 (omitting the empty set and/or the full set from the power set listing).

### Teaching Action A02 — $2^n$ Comes From Independent Binary Choices, Not a Memorized Formula (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the full 8-subset listing for $|A|=3$ matches $2^3=8$ exactly, and the boundary case $\mathcal{P}(\varnothing)=\{\varnothing\}$ (1 element, not 0) is verified directly by listing. State: "$2^{|A|}$ isn't a formula to memorize in isolation — it's counting the number of independent IN/OUT decisions, one per element; and even with ZERO elements to decide about, there's still exactly ONE way to make zero decisions (do nothing), giving $2^0=1$, not 0."

- **MC-2 hook**: ask "how many elements does $\mathcal{P}(\varnothing)$ have — zero, since $\varnothing$ itself has nothing in it, or some other number?" — a "zero" answer reveals MC-2 (missing that $\varnothing$ is itself a subset of $\varnothing$, and hence a genuine element of $\mathcal{P}(\varnothing)$).

### Teaching Action A03 — The Discrete Topology Literally IS a Power Set Used as $\tau$ (Primitive P06: Contrast Pair)

Contrast treating "discrete topology" and "power set" as two separate, unrelated concepts against Example 3's direct verification that $\tau=\mathcal{P}(A)$ automatically satisfies all three of `math.top.topological-space`'s axioms — precisely BECAUSE it already contains every possible subset. State: "the discrete topology isn't just SIMILAR to the power set — it IS the power set, taken directly as the collection of open sets; the axioms hold automatically because there's nothing left outside $\mathcal{P}(A)$ for a union or intersection to accidentally produce."

- **MC-3 hook**: ask "are 'the power set of $A$' and 'the discrete topology on $A$' two different mathematical objects that happen to have the same size, or literally the same set used two different ways?" — a "different objects" answer reveals MC-3 (missing that $\tau=\mathcal{P}(A)$ literally, not just numerically, coincide).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. List $\mathcal{P}(A)$ completely for $A=\{1,2,3\}$, making sure to include $\varnothing$ and $A$ itself.
  2. Compute $|\mathcal{P}(A)|$ for a set $A$ with 5 elements, explaining your answer using the binary-choice argument (not just citing the formula).
  3. State $|\mathcal{P}(\varnothing)|$ and explain, using `math.found.subset`'s own definition, why this value is correct.
  4. For $A=\{a,b,c\}$, verify explicitly that $\tau=\mathcal{P}(A)$ satisfies the union-closure axiom for at least one specific pair of subsets.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.top.topological-space`)**: "A computer scientist is designing a small finite topological space on a set $A=\{$server-A, server-B, server-C$\}$ representing three servers, and wants the SIMPLEST possible topology to work with — one where every conceivable subset of servers counts as an 'open' (accessible) configuration. (a) Using this lesson's power set definition, explicitly list all the subsets that would need to belong to $\tau$ for this to be the discrete topology on $A$. (b) Using `math.top.topological-space`'s own three axioms, explain WHY choosing $\tau=\mathcal{P}(A)$ guarantees all three axioms are automatically satisfied, without needing to check each union/intersection combination individually. (c) If the computer scientist instead wanted a SMALLER topology (not every subset counts as open), explain what would need to be verified that is automatically guaranteed when using the full power set."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EMPTY-AND-FULL-SET-OMITTED-FROM-POWER-SET | Believing $\varnothing$ and/or $A$ itself should be omitted from $\mathcal{P}(A)$ as "trivial" exceptions, rather than genuine required members | Foundational |
| MC-2 | POWER-SET-OF-EMPTY-SET-ASSUMED-EMPTY | Believing $\mathcal{P}(\varnothing)$ has zero elements, missing that $\varnothing$ is itself a subset of $\varnothing$ and hence a genuine element of $\mathcal{P}(\varnothing)$, making $|\mathcal{P}(\varnothing)|=1$ | High |
| MC-3 | DISCRETE-TOPOLOGY-ASSUMED-DIFFERENT-FROM-POWER-SET | Believing the discrete topology and the power set are merely similar or numerically coincidental, rather than literally the same set used directly as $\tau$ | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Empty and Full Set Omitted from Power Set") → P41 (detect: ask whether $\varnothing$ and $A$ should be included in $\mathcal{P}(A)$) → P64 (conceptual shift: re-walk Example 1's complete listing, re-anchoring on `math.found.subset`'s own inclusive definition).
- **B02 (targets MC-2)**: P27 (name it: "Power Set of Empty Set Assumed Empty") → P41 (detect: ask how many elements $\mathcal{P}(\varnothing)$ has) → P64 (conceptual shift: re-walk Example 2's boundary-case verification, $\mathcal{P}(\varnothing)=\{\varnothing\}$).
- **B03 (targets MC-3)**: P27 (name it: "Discrete Topology Assumed Different from Power Set") → P41 (detect: ask whether the discrete topology and the power set are the same object) → P64 (conceptual shift: re-walk Example 3's direct axiom verification using $\tau=\mathcal{P}(A)$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.subset` (the subset relation this concept's elements are built from directly).
- **Unlocks**: `math.found.cardinality` (the power set's own size, $2^{|A|}$, is a foundational example in developing general cardinality reasoning, including for infinite sets).
- **Cross-link**: KG lists `math.top.topological-space`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.top.topological-space`'s own three topology axioms directly in Component 3's discrete-topology verification and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a developing/understand tag supports the "3 TAs + gate" tier, with LO1 establishing the inclusive definition, LO2 grounding the $2^n$ formula in a genuine counting argument rather than rote memorization, and LO3 connecting concretely to `math.top.topological-space`'s discrete topology.
- **Division of labor**: `math.found.subset` already owns the subset relation itself and explicitly names the power set as "this concept's definition is the power set's entire content" in its own Unlocks section (verified by grep) — that is, `math.found.subset` correctly defers ALL power-set-specific content to this concept rather than pre-empting it; this concept owns the actual power-set construction, the $2^n$ counting argument, and the boundary case. `math.top.topological-space` already names the discrete topology as "the whole power set" (verified by grep) but does not itself derive or verify why this satisfies the topology axioms in power-set terms — this concept supplies that missing derivation as the genuine cross-link content.
- Example 3's deliberate reuse of Example 1's exact set ($A=\{x,y\}$) for the discrete-topology verification (rather than a fresh example) was chosen so the SAME already-listed power set from Example 1 is directly recognizable as the topology $\tau$ in Example 3, making LO3's "literally the same object" claim visually immediate rather than requiring a separate re-derivation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.found.cardinality`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.top.topological-space` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: developing learner builds the power set concretely before generalizing to $2^n$) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

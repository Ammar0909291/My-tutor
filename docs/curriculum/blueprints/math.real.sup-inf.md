# Teaching Blueprint: Supremum and Infimum (`math.real.sup-inf`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.sup-inf` |
| name | Supremum and Infimum |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.real.completeness` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in the already-established completeness axiom |
| description (KG) | sup(S) = least upper bound of S; inf(S) = greatest lower bound. For bounded sets: sup/inf always exist in ℝ (completeness). sup is attained iff it is a maximum; similarly for inf. |

## Component 1 — Learning Objectives

- LO1: Define the **supremum** $\sup(S)$ of a set $S\subseteq\mathbb{R}$ as its **least upper bound** — an upper bound $u$ such that no smaller number is also an upper bound — and the **infimum** $\inf(S)$ as its **greatest lower bound**, and correctly verify a proposed value is the supremum using the two-part test: (i) it is an upper bound, and (ii) no smaller number is.
- LO2: State that the **completeness** of $\mathbb{R}$ (already established) guarantees every non-empty, bounded-above subset of $\mathbb{R}$ has a supremum IN $\mathbb{R}$ (and dually for infimum/bounded-below), and correctly identify this as the reason $\sup/\inf$ are guaranteed to exist for such sets, in contrast to $\mathbb{Q}$ where they can fail to exist.
- LO3: Correctly distinguish **attained** suprema (where $\sup(S)\in S$, making it also the **maximum**) from **unattained** ones (where $\sup(S)\notin S$, so $S$ has no maximum at all), and classify given sets accordingly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.completeness` (the completeness axiom of $\mathbb{R}$: every non-empty subset bounded above has a least upper bound).

## Component 3 — Core Explanation

The **supremum** of $S\subseteq\mathbb{R}$, written $\sup(S)$, is the **least upper bound**: a number $u$ such that (i) $s\le u$ for all $s\in S$ (an upper bound), and (ii) for any $\varepsilon>0$, there exists $s\in S$ with $s>u-\varepsilon$ (no SMALLER number is also an upper bound — equivalently, any $v<u$ fails to be an upper bound). Both conditions are required: (i) alone only says $u$ is SOME upper bound; (ii) is what makes it the LEAST one.

The **infimum**, $\inf(S)$, is dually the **greatest lower bound**: a lower bound $\ell$ such that no larger number is also a lower bound.

**Completeness guarantees existence**: the completeness axiom of $\mathbb{R}$ states precisely that every non-empty $S\subseteq\mathbb{R}$ bounded above has a supremum in $\mathbb{R}$ (and by a symmetric argument, every non-empty set bounded below has an infimum in $\mathbb{R}$). This is NOT true of $\mathbb{Q}$: the set $\{q\in\mathbb{Q} : q^2<2\}$ is bounded above in $\mathbb{Q}$ (e.g. by 2) but has NO least upper bound within $\mathbb{Q}$ — its "would-be" supremum, $\sqrt2$, is irrational. Completeness is exactly the property that repairs this gap when passing from $\mathbb{Q}$ to $\mathbb{R}$.

**Attained versus unattained**: if $\sup(S)\in S$, then $\sup(S)$ is also the **maximum** of $S$ (the largest actual element). If $\sup(S)\notin S$, $S$ simply has NO maximum — the supremum still exists (by completeness) as a real number, but it is not itself a member of $S$; $S$'s elements get arbitrarily close to it without ever reaching it.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the two-part supremum test)**: Let $S=(0,3)$ (open interval). Claim $\sup(S)=3$. Verify (i): every $s\in(0,3)$ satisfies $s<3\le3$, so 3 is an upper bound. Verify (ii): for any $\varepsilon>0$, is there $s\in S$ with $s>3-\varepsilon$? Yes — e.g. $s=3-\varepsilon/2\in(0,3)$ (for small enough $\varepsilon$) satisfies $s=3-\varepsilon/2>3-\varepsilon$. Both parts hold, confirming $\sup(S)=3$ — even though $3\notin S$.

**Example 2 (LO2 — completeness failing in $\mathbb{Q}$, breaking MC-1)**: In $\mathbb{Q}$, let $S=\{q\in\mathbb{Q} : q>0, q^2<2\}$. $S$ is bounded above (by 2, say) within $\mathbb{Q}$. Does $S$ have a least upper bound IN $\mathbb{Q}$? No: for any rational upper bound $u$, one can always find a strictly smaller rational $u'$ that is still an upper bound (using the density of $\mathbb{Q}$ together with the fact that $\sqrt2$ is irrational, so no rational ever exactly equals the "gap"). In $\mathbb{R}$, by contrast, $\sup(S)=\sqrt2$ genuinely exists (a real number), demonstrating completeness's real content: it is a statement about $\mathbb{R}$ specifically that fails for $\mathbb{Q}$.

**Example 3 (LO3 — attained vs. unattained, breaking MC-2)**: Compare $S_1=[0,3]$ (closed) and $S_2=(0,3)$ (open, as in Example 1). Both have $\sup=3$. For $S_1$: $3\in S_1$, so $3$ is both the supremum AND the maximum of $S_1$. For $S_2$: $3\notin S_2$ (Example 1), so $S_2$ has NO maximum at all — the supremum still exists and equals 3, but no element of $S_2$ achieves it; elements like $2.9,2.99,2.999,\ldots$ get arbitrarily close without ever reaching 3.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Two-Part Supremum Test, via Completeness (Primitive P11: Representation Shift)

State the two-part test directly (upper bound + no smaller upper bound). Work Example 1's explicit verification of both parts for $\sup((0,3))=3$.

Shift representation to Example 2's $\mathbb{Q}$-vs-$\mathbb{R}$ contrast, connecting directly to the already-established completeness axiom: "this is EXACTLY what completeness guarantees — and exactly what fails without it."

- **MC-1 hook**: ask "does every bounded-above set of RATIONAL numbers have a supremum that is itself rational?" — an answer of "yes" reveals MC-1 (missing that completeness is a genuinely $\mathbb{R}$-specific guarantee, not automatic in $\mathbb{Q}$).

### Teaching Action A02 — Attained vs. Unattained Suprema (Primitive P06: Contrast Pair)

**Contrast (targets MC-2)**: place $S_1=[0,3]$ and $S_2=(0,3)$ directly side by side (Example 3) — same supremum (3), different membership status. State: "the supremum ALWAYS exists for a bounded-above set (by completeness) — but whether it is ACHIEVED by some element of the set is a separate question entirely, decided by whether the set happens to include its own boundary."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find $\sup(S)$ and $\inf(S)$ for $S=\{1-1/n : n\in\mathbb{N}, n\ge1\}=\{0,1/2,2/3,3/4,\ldots\}$, and determine whether each is attained.
  2. Verify, using the two-part test, that $\inf([2,5])=2$.
  3. Explain why $S=\{q\in\mathbb{Q}:q<\pi\}$ has no supremum within $\mathbb{Q}$, but does have one within $\mathbb{R}$.
  4. Give an example of a bounded set whose supremum IS attained (i.e., is also a maximum), and one whose supremum is NOT attained, justifying each.
- **P76 (Transfer Probe, mode = independence)**: "A sequence $(a_n)$ is said to be bounded above if the SET of its terms, $\{a_n : n\in\mathbb{N}\}$, is bounded above as a subset of $\mathbb{R}$. (a) Using this lesson's completeness-guarantees-existence result, explain why every bounded-above sequence of real numbers has a well-defined supremum, $\sup_n a_n$, regardless of whether the sequence converges. (b) Explain, using this lesson's attained-vs-unattained distinction, why $\sup_n a_n$ being UNattained (e.g. for $a_n=1-1/n$) does not prevent it from being a meaningful, well-defined real number — connecting to why this quantity is useful even when no single term of the sequence equals it."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SUPREMUM-EXISTENCE-ASSUMED-IN-RATIONALS | Believing every bounded-above set of rational numbers has a supremum that is itself rational, missing that completeness (and the guaranteed existence of sup/inf) is a genuinely $\mathbb{R}$-specific property | Foundational |
| MC-2 | SUPREMUM-ASSUMED-ALWAYS-ATTAINED | Believing the supremum of a set is always an element of that set (i.e., always equals the maximum), missing that many sets have an unattained supremum and no maximum at all | Foundational |
| MC-3 | UPPER-BOUND-ALONE-MISTAKEN-FOR-SUPREMUM | Believing ANY upper bound of a set qualifies as "the supremum," missing the second requirement that it be the LEAST such upper bound | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Supremum Existence Assumed in Rationals") → P41 (detect: ask whether $\{q\in\mathbb{Q}:q^2<2\}$ has a rational supremum) → P64 (conceptual shift: re-walk Example 2's density-based non-existence argument, contrasting with $\mathbb{R}$).
- **B02 (targets MC-2)**: P27 (name it: "Supremum Assumed Always Attained") → P41 (detect: ask whether $\sup((0,3))=3$ means $3\in(0,3)$) → P64 (conceptual shift: re-walk Example 3's $S_1$-vs-$S_2$ contrast).
- **B03 (targets MC-3)**: P27 (name it: "Upper Bound Alone Mistaken for Supremum") → P41 (detect: ask whether 10 qualifies as "the supremum" of $(0,3)$, since it is an upper bound) → P64 (conceptual shift: re-walk the two-part test from Component 3, emphasizing part (ii)'s "no smaller upper bound" requirement).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.completeness` (the completeness axiom — every non-empty, bounded-above subset of $\mathbb{R}$ has a least upper bound — that this concept directly names, characterizes via the two-part test, and contrasts against $\mathbb{Q}$).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/apply tag and this corpus's high mastery_threshold (0.9, MAMR 5/5) reflects that this concept, while conceptually compact, demands precise, error-free application of the two-part test — the "2 main TAs + gate" structure (A01: the two-part test grounded in completeness; A02: attained-vs-unattained) matches this corpus's lean-but-rigorous pattern for expert-tier real-analysis concepts.
- The $\{q\in\mathbb{Q}:q^2<2\}$ example was deliberately reused from `math.real.completeness`'s own established canonical illustration of completeness's real content, since this concept directly builds on and re-examines that exact example through the sup/inf lens rather than introducing an unrelated new example for the same underlying point.
- The sequence transfer probe was chosen because $\sup_n a_n$/$\inf_n a_n$ are used constantly in later real-analysis concepts (e.g. limsup/liminf, monotone convergence) without re-justification — this probe front-loads the "well-defined regardless of convergence" fact this concept alone establishes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.real.completeness`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in completeness) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

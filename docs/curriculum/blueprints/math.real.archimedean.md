# Teaching Blueprint: Archimedean Property (`math.real.archimedean`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.archimedean` |
| name | Archimedean Property |
| domain | Real Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 2 |
| requires | `math.real.completeness` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately as a derived consequence of the already-established completeness axiom |
| description (KG) | For any real x, there exists a natural number n with n>x. Equivalently: the naturals are unbounded in ℝ. Corollary: ℚ is dense in ℝ (between any two reals there is a rational). |

## Component 1 — Learning Objectives

- LO1: State the **Archimedean property**: for any real $x$, there exists a natural number $n$ with $n>x$ (equivalently, $\mathbb{N}$ is **unbounded above** in $\mathbb{R}$), and correctly derive this from the completeness axiom (by contradiction: if $\mathbb{N}$ WERE bounded above, it would have a supremum, and a short argument produces a contradiction).
- LO2: Use the Archimedean property to prove the standard consequence: for any $\varepsilon>0$, there exists $n\in\mathbb{N}$ with $1/n<\varepsilon$ — and correctly recognize this as the property that makes "for all $\varepsilon>0$, eventually..." arguments (the backbone of limit definitions) actually work.
- LO3: State and apply the corollary that $\mathbb{Q}$ is **dense** in $\mathbb{R}$ (between any two distinct reals $a<b$ there exists a rational $q$ with $a<q<b$), and correctly identify the Archimedean property as the specific fact that makes this density proof go through.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.completeness` (the completeness axiom: every non-empty subset of $\mathbb{R}$ bounded above has a least upper bound) — the Archimedean property is PROVEN from completeness, not an independent axiom.

## Component 3 — Core Explanation

The **Archimedean property**: for any real number $x$, there exists a natural number $n$ with $n>x$. Equivalently, $\mathbb{N}=\{1,2,3,\ldots\}$, viewed as a subset of $\mathbb{R}$, is **unbounded above** — no single real number is larger than every natural number.

**Proof from completeness (by contradiction)**: suppose $\mathbb{N}$ WERE bounded above in $\mathbb{R}$. Then, by completeness, $\mathbb{N}$ has a supremum $u=\sup(\mathbb{N})\in\mathbb{R}$. Since $u$ is the LEAST upper bound, $u-1$ is NOT an upper bound (it's smaller than the least one) — so there exists $n\in\mathbb{N}$ with $n>u-1$, i.e. $n+1>u$. But $n+1\in\mathbb{N}$ too, and $n+1>u=\sup(\mathbb{N})$ CONTRADICTS $u$ being an upper bound of $\mathbb{N}$ in the first place. This contradiction shows $\mathbb{N}$ cannot be bounded above — proving the Archimedean property is a genuine CONSEQUENCE of completeness, not a separate assumption.

**Standard corollary — arbitrarily small $1/n$**: given any $\varepsilon>0$, applying the Archimedean property to $x=1/\varepsilon$ gives some $n\in\mathbb{N}$ with $n>1/\varepsilon$, hence $1/n<\varepsilon$. This single fact is the machinery underlying essentially every "$\varepsilon$–$N$" argument in analysis: it guarantees that $1/n$ can be made smaller than ANY prescribed positive tolerance, however small.

**Density of $\mathbb{Q}$ in $\mathbb{R}$**: for any $a<b$ in $\mathbb{R}$, there exists a rational $q$ with $a<q<b$. Sketch: by the Archimedean property, choose $n$ with $1/n<b-a$ (possible by the corollary above); then among the multiples of $1/n$, at least one, $q=\lceil na\rceil/n$, lands strictly between $a$ and $b$ (since consecutive multiples of $1/n$ are closer together than $b-a$, one must fall in the gap). The Archimedean property is EXACTLY the ingredient that guarantees "$1/n$ can be made fine enough" — without it, this density argument has no foothold.

## Component 4 — Worked Examples

**Example 1 (LO1 — the property stated and directly checked)**: For $x=1{,}000{,}000.5$, find $n\in\mathbb{N}$ with $n>x$. Take $n=1{,}000{,}001$: indeed $1{,}000{,}001>1{,}000{,}000.5$. This is trivial to CHECK for any specific $x$ — the real content of the property is that such $n$ ALWAYS exists, for every real $x$ whatsoever, however large, which is what the completeness-based proof (Component 3) establishes in general, not merely case-by-case.

**Example 2 (LO2 — the arbitrarily-small-$1/n$ corollary, breaking MC-1)**: Let $\varepsilon=0.0001$. By the corollary, find $n$ with $1/n<0.0001$: take $n>1/0.0001=10{,}000$, so $n=10{,}001$ works: $1/10{,}001\approx0.00009999<0.0001$. This shows concretely that no matter how small a tolerance $\varepsilon$ is prescribed, a sufficiently large $n$ always brings $1/n$ below it — there is no smallest positive real number that $1/n$ "gets stuck above."

**Example 3 (LO3 — density of $\mathbb{Q}$, applied concretely)**: Find a rational number strictly between $a=\sqrt2\approx1.41421356\ldots$ and $b=\sqrt2+0.001$. Using the density argument: choose $n$ with $1/n<0.001$, e.g. $n=2000$ ($1/2000=0.0005$); then some multiple of $1/2000$ lands in $(\sqrt2,\sqrt2+0.001)$ — concretely, $q=1.4145=2829/2000$ works, since $1.41421356\ldots<1.4145<1.41521356\ldots$. This demonstrates the density claim is not merely abstract — rationals can always be explicitly located as close as desired to any real number, including irrational ones.

## Component 5 — Teaching Actions

### Teaching Action A01 — Deriving the Property from Completeness (Primitive P25: Deductive)

State the property directly, then work the full proof-by-contradiction from Component 3 step by step — this is the central content of the lesson, not a side remark: "the Archimedean property FEELS obvious, but it is not a separate axiom — it is a genuine theorem, proven using completeness, and completeness is doing real work here."

- **MC-1 hook**: ask "is the Archimedean property an independent axiom of $\mathbb{R}$, separate from completeness, or can it be derived FROM completeness?" — an answer of "independent axiom" reveals MC-1 (missing that it is a proven consequence, not an additional assumption).

### Teaching Action A02 — The Arbitrarily-Small-$1/n$ Corollary and Density (Primitive P11: Representation Shift)

Work Example 2's concrete arbitrarily-small-$1/n$ computation, then shift to Example 3's density application, connecting explicitly: "this is the SAME Archimedean fact, now used to guarantee a fine enough spacing of rational multiples to land inside any interval, however small."

- **MC-2 hook**: ask "does the density of $\mathbb{Q}$ in $\mathbb{R}$ hold for a completely unrelated reason, or does it rely specifically on the Archimedean property?" — an answer of "unrelated reason" reveals MC-2 (missing that the Archimedean property is the specific mechanism the density proof depends on).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Reproduce, in your own words, the proof-by-contradiction that $\mathbb{N}$ is unbounded above in $\mathbb{R}$, using completeness.
  2. Find $n\in\mathbb{N}$ with $1/n<0.00001$.
  3. Find a rational number strictly between $\pi$ and $\pi+0.0001$.
  4. Explain why the Archimedean property is needed for the density-of-$\mathbb{Q}$ argument, rather than density following automatically from $\mathbb{Q}$ simply "having infinitely many elements."
- **P76 (Transfer Probe, mode = independence)**: "The standard definition of a sequence $(a_n)$ converging to $L$ says: for every $\varepsilon>0$, there exists $N$ such that $|a_n-L|<\varepsilon$ for all $n>N$. (a) Using this lesson's arbitrarily-small-$1/n$ corollary, explain why the Archimedean property is what guarantees such an $N$ can always be found for sequences like $a_n=1/n$ converging to 0 (i.e., why the definition of convergence is not vacuous). (b) Explain, using this lesson's proof technique (contradiction via completeness), why a hypothetical number system WITHOUT the Archimedean property (where $\mathbb{N}$ could be bounded above) would break the standard $\varepsilon$–$N$ definition of a limit."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ARCHIMEDEAN-PROPERTY-TREATED-AS-INDEPENDENT-AXIOM | Believing the Archimedean property is a separate, independently-assumed axiom of $\mathbb{R}$, rather than a theorem proven directly from completeness | Foundational |
| MC-2 | DENSITY-OF-RATIONALS-TREATED-AS-UNRELATED-FACT | Believing $\mathbb{Q}$'s density in $\mathbb{R}$ follows from $\mathbb{Q}$ simply "having infinitely many elements," missing that the Archimedean property is the specific mechanism the proof relies on | Moderate |
| MC-3 | ARBITRARILY-SMALL-1/N-ASSUMED-OBVIOUS-WITHOUT-JUSTIFICATION | Treating "$1/n$ can be made smaller than any $\varepsilon$" as self-evidently true without recognizing it requires the Archimedean property to justify rigorously | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Archimedean Property Treated as Independent Axiom") → P41 (detect: ask whether the Archimedean property needs to be proven or is simply assumed) → P64 (conceptual shift: re-walk the full contradiction proof from Component 3, step by step).
- **B02 (targets MC-2)**: P27 (name it: "Density of Rationals Treated as Unrelated Fact") → P41 (detect: ask what specifically guarantees a rational can always be found in a tiny interval like $(\sqrt2,\sqrt2+0.001)$) → P64 (conceptual shift: re-walk Example 3's density argument, showing the Archimedean-based spacing choice is what makes it work).
- **B03 (targets MC-3)**: P27 (name it: "Arbitrarily Small 1/n Assumed Obvious") → P41 (detect: ask a student to justify, not just assert, that $1/n<\varepsilon$ for large enough $n$) → P64 (conceptual shift: re-derive the corollary directly from the Archimedean property applied to $x=1/\varepsilon$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.completeness` (the completeness axiom this concept's entire proof-by-contradiction directly depends on — the Archimedean property is derived from it, not independent of it).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 2 with an expert/understand tag and this corpus's high mastery_threshold (0.9, MAMR 5/5) reflects that this is a conceptually compact but foundational-for-later-analysis fact — the "2 main TAs + gate" structure (A01: the derivation from completeness itself; A02: the arbitrarily-small-$1/n$ corollary and its density application) matches this domain's lean, proof-focused pattern for short-estimated-hours expert-tier concepts.
- The proof-by-contradiction was given IN FULL (not summarized or deferred) because MC-1 — treating the Archimedean property as an independent axiom — is a genuinely common error at this level, and the only reliable repair is walking the actual derivation, not merely asserting "it follows from completeness."
- The convergence-definition transfer probe was deliberately chosen because it makes explicit a connection every subsequent real-analysis concept relies on silently: the entire $\varepsilon$–$N$ machinery of limits presupposes the Archimedean property without typically re-justifying it, so this concept is the correct, single place to make that dependency visible once.

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
| V-15 | CPA_entry_stage justified | PASS (Abstract, derived directly from completeness) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

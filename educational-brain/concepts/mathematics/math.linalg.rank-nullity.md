# math.linalg.rank-nullity

## Identity
- **KG id**: `math.linalg.rank-nullity`
- **Domain**: math.linalg
- **Requires**: `math.linalg.rank`, `math.linalg.null-space`, `math.linalg.column-space`,
  `math.linalg.dimension`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
State $\text{rank}(T)+\text{nullity}(T)=\dim(V)$ and apply it to find one quantity given the other
two; correctly identify $\dim(V)$ as the DOMAIN's dimension — for a matrix, the number of COLUMNS
(never rows); and use the theorem to determine injectivity WITHOUT computing the kernel directly —
requiring EXACT equality $\text{rank}(T)=\dim(V)$ (never merely "high" or "close to full" rank).

## Core Understanding
$\dim(V)$ IS THE DOMAIN'S DIMENSION — FOR A MATRIX, ALWAYS THE COLUMN COUNT, NEVER THE ROW COUNT:
for a $3\times5$ matrix $A$ (3 rows, 5 columns) with $\text{rank}(A)=2$: $\dim(V)=n=5$ (the number
of COLUMNS, since $V=\mathbb R^5$ is the domain), giving $\text{nullity}(A)=5-2=3$. Using the row
count (3) instead produces $3-2=1$ — WRONG, because $\dim(V)$ always refers to the DOMAIN's
dimension (columns for a matrix acting as $A:\mathbb R^n\to\mathbb R^m$), NEVER the codomain's row
count.

INJECTIVITY REQUIRES EXACT EQUALITY $\text{rank}(T)=\dim(V)$ — NEVER MERELY "HIGH" OR "CLOSE TO
FULL": for a $4\times4$ matrix $A$ with $\text{rank}(A)=4$ (full rank): $\dim(V)=4$, giving
$\text{nullity}(A)=4-4=0$ — so $\ker(A)=\{0\}$, and $A$ IS injective. But if $\text{rank}(A)=3$
for the SAME $4\times4$ matrix: $\text{nullity}(A)=4-3=1\ne0$ — $A$ is NOT injective, despite rank
3 being "mostly full." Checking only whether rank is "large" or "reasonably high" without the
EXACT comparison to $\dim(V)$ misses that even ONE LESS than full rank forces a nonzero nullity,
and hence a nontrivial kernel, breaking injectivity entirely.

## Mental Models
- **"dim(V) is always about the domain — for a matrix, count the columns, never the rows."**
- **"Injectivity needs EXACT equality between rank and dim(V) — one short is enough to break it,
  not just 'mostly there.'"**

## Why Students Fail

### MC-1: DIM-V-COMPUTED-FROM-ROWS-INSTEAD-OF-COLUMNS
- **Surface form**: uses a matrix's row count instead of its column count for $\dim(V)$ in the
  Rank-Nullity theorem.
- **Birth type**: Foundational severity (Blueprint's own declared severity — an easy, common
  confusion that silently produces a plausible-looking but wrong nullity value).
- **Repair**: re-state that $V$ is the DOMAIN, and for $A:\mathbb R^n\to\mathbb R^m$, $n$ (columns)
  is always the domain dimension.

### MC-2: INJECTIVITY-CHECKED-VIA-HIGH-RANK-RATHER-THAN-EXACT-EQUALITY
- **Surface form**: assumes a "high" or "mostly full" rank is sufficient for injectivity, rather
  than requiring exact equality between rank and $\dim(V)$.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "close to full rank"
  feels intuitively like it should be nearly as good as full rank for injectivity purposes).
- **Repair**: re-compute the exact nullity from the theorem for a rank-one-short case, confirming
  a nontrivial kernel exists.

## Misconceptions

### MC-1: DIM-V-COMPUTED-FROM-ROWS-INSTEAD-OF-COLUMNS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: INJECTIVITY-CHECKED-VIA-HIGH-RANK-RATHER-THAN-EXACT-EQUALITY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Rank and nullity split dim(V) into two exhaustive, non-overlapping pieces — like dividing a
  fixed budget between two categories: know one, and the other is forced."**
- **Anti-analogy**: injectivity is not a "mostly there" property — a nullity of exactly 1 (even
  from a rank just one shy of full) breaks it completely, the same as a nullity of 10.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $3\times5$ matrix's nullity computation, contrasting the
  correct column-based $\dim(V)=5$ against the incorrect row-based $3$.
- **Demonstration 2 (targets MC-2)**: the $4\times4$ matrix's rank-4-vs-rank-3 side-by-side
  comparison, showing exact equality alone yields injectivity.

## Discovery Questions
1. "For an m×n matrix, is dim(V) in the Rank-Nullity theorem the number of rows or the number of
   columns?"
2. "Does a 'high' or 'mostly full' rank guarantee injectivity, or does rank need to exactly equal
   dim(V)?"

## Teaching Sequence
1. **Conceptual shift**: the column-based $\dim(V)$ identification, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the exact-equality-versus-high-rank injectivity distinction, working
   Demonstration 2, isolating MC-2.
3. **Mastery gate**: require a correct nullity/rank computation using the correct domain dimension,
   and a correct injectivity determination requiring exact rank-to-dim(V) equality, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $\dim(V)$ computed from a matrix's row count rather than its column count.
- Never accept injectivity concluded from a "high" or "mostly full" rank without checking exact
  equality to $\dim(V)$.

## Voice Teaching Notes
- Say "is that the row count or the column count — which one is the domain's dimension?" whenever
  $\dim(V)$ is identified for a matrix.
- Ask "does that rank exactly equal dim(V), or just come close?" whenever injectivity is checked
  via rank.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies $\dim(V)$ as the domain's (column) count
  for a given matrix.
- **Rung 2 (application)**: learner correctly computes rank or nullity given the other two
  quantities in the theorem.
- **Rung 3 (transfer)**: learner correctly determines a data-encoding scheme's reversibility
  (injectivity) via the exact rank-to-dim(V) comparison, and explains the practical consequence of
  a nonzero nullity for information loss.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the domain-dimension-is-columns rule directly.
- If MC-2 recurs, re-compute the exact nullity for a rank-one-short case.

## Memory Hooks
- "dim(V) is always the domain — columns for a matrix, never rows."
- "Injectivity needs rank to EXACTLY equal dim(V) — one short still breaks it."

## Transfer Connections
- `math.linalg.rank` (already authored, certified domain): supplies the image-dimension quantity
  this theorem constrains.
- `math.linalg.null-space` (already authored, certified domain): supplies the kernel-dimension
  (nullity) quantity this theorem constrains.
- `math.linalg.column-space` (already authored, certified domain): supplies the image
  characterization for a matrix this theorem's rank term directly reflects.
- `math.linalg.dimension` (already authored, this campaign, Batch 171): supplies the basis-
  independent vector-count concept this theorem's $\dim(V)$ term directly reuses.
- `math.linalg.kernel-image` (already authored, this campaign, Batch 170, KG's declared related
  concept): supplies the general linear-map kernel/image framework this theorem's rank and
  nullity quantities are the dimensions of.

## Cross-Subject Connections
- Data compression/encoding: reversibility (injectivity) of an encoding scheme as a genuine,
  high-stakes information-preservation question, directly answered by comparing rank to dim(V).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.rank-nullity.md`, reused by reference
  for its $3\times5$-matrix and $4\times4$-matrix worked examples, and its two-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the exact rank-to-dim(V)
  comparison to a data-encoding reversibility scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.linalg.rank`/
  `math.linalg.null-space`/`math.linalg.column-space`/`math.linalg.dimension`, unlocks none,
  cross_links none, proficient/understand, mastery_threshold 0.9, estimated_hours 3) was directly
  verified against the live KG and matches exactly. All four prerequisites independently
  re-confirmed authored in the EDUCATIONAL-BRAIN corpus.

## Version History
- 2026-09-19 (Batch 172): authored. First entry this batch. Companion batch concept:
  `math.linalg.change-of-basis`.

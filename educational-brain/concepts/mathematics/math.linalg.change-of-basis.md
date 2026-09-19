# math.linalg.change-of-basis

## Identity
- **KG id**: `math.linalg.change-of-basis`
- **Domain**: math.linalg
- **Requires**: `math.linalg.coordinates`, `math.linalg.matrix-inverse`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Construct the change-of-basis matrix $P_{\beta\to\gamma}$ whose COLUMNS are $\beta$'s vectors
expressed in $\gamma$-coordinates (never the reverse), converting $[v]_\beta$ to $[v]_\gamma$ via
$[v]_\gamma=P[v]_\beta$; convert in the REVERSE direction using $P^{-1}$ (never reapplying $P$
itself); and apply the similarity relation $B=P^{-1}AP$ relating a linear map's matrix
representations across two bases.

## Core Understanding
$P$'S COLUMNS COME FROM THE SOURCE BASIS, EXPRESSED IN TARGET COORDINATES — NEVER THE REVERSE: for
$\beta=\{(1,1),(1,-1)\}$ and $\gamma$ = standard basis: $P_{\beta\to\gamma}$'s columns are
$\beta$'s vectors IN $\gamma$-coordinates — since $\gamma$ is standard, $\beta$'s vectors' standard
coordinates are just themselves: $P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$. For
$[v]_\beta=(3,2)$: $[v]_\gamma=P[v]_\beta=(5,1)$ — verified: $3(1,1)+2(1,-1)=(5,1)$ ✓. Building
$P$'s columns from $\gamma$'s vectors instead of $\beta$'s REVERSES which basis the matrix actually
converts FROM, producing a matrix that performs the wrong conversion entirely.

THE REVERSE CONVERSION REQUIRES $P^{-1}$ — NEVER REAPPLYING $P$ ITSELF: converting $v=(5,1)$
(standard/$\gamma$-coordinates) BACK to $\beta$-coordinates: compute $P^{-1}=
\begin{pmatrix}0.5&0.5\\0.5&-0.5\end{pmatrix}$ (from $\det(P)=-2$), giving
$[v]_\beta=P^{-1}[v]_\gamma=(3,2)$ — matching the ORIGINAL $\beta$-coordinates exactly. Applying
$P$ AGAIN (instead of $P^{-1}$) for the reverse direction does NOT undo the original conversion —
only $P^{-1}$ genuinely inverts $P$'s effect, confirmed directly by $P^{-1}P=I$.

SIMILARITY RELATES A LINEAR MAP'S MATRIX ACROSS DIFFERENT BASES — THE SAME UNDERLYING
TRANSFORMATION, DIFFERENT COORDINATE DESCRIPTIONS: if $A$ represents $T$ relative to $\beta$, and
$B$ represents the SAME $T$ relative to $\gamma$: $B=P^{-1}AP$ (with $P=P_{\beta\to\gamma}$ or its
appropriate inverse, depending on the specific convention used consistently) — this similarity
relation is not a new isolated formula, but a direct extension of the same coordinate-conversion
machinery already built: converting $T$'s ACTION into a different basis requires converting
coordinates IN, applying $A$ in the original basis, then converting coordinates back OUT.

## Mental Models
- **"P's columns are the source basis's vectors, written in the target basis's language — get the
  source/target roles right, or the matrix converts the wrong way."**
- **"Undoing a conversion needs the inverse matrix, never the same matrix reapplied — P then P
  again doesn't get you back where you started."**
- **"Similarity isn't a new idea — it's the same coordinate-conversion machinery, just wrapped
  around a linear map's action."**

## Why Students Fail

### MC-1: CHANGE-OF-BASIS-MATRIX-BUILT-FROM-WRONG-BASIS
- **Surface form**: constructs $P_{\beta\to\gamma}$'s columns from $\gamma$'s vectors instead of
  $\beta$'s, reversing the conversion direction the matrix actually performs.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a directional
  confusion between which basis supplies the columns and which basis they're expressed in,
  producing a plausible-looking but incorrect matrix).
- **Repair**: re-derive by explicitly stating "columns = SOURCE basis vectors, expressed in TARGET
  coordinates" and re-checking against this rule.

### MC-2: REVERSE-CONVERSION-USES-P-INSTEAD-OF-P-INVERSE
- **Surface form**: applies $P$ again (rather than $P^{-1}$) when converting coordinates in the
  reverse direction.
- **Birth type**: Foundational severity (Blueprint's own declared severity — it's easy to lose
  track of which conversion direction each matrix actually performs once both directions are in
  play).
- **Repair**: re-verify by composing $P$ and the proposed reverse matrix, confirming only
  $P^{-1}$ genuinely undoes $P$'s effect.

## Misconceptions

### MC-1: CHANGE-OF-BASIS-MATRIX-BUILT-FROM-WRONG-BASIS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: REVERSE-CONVERSION-USES-P-INSTEAD-OF-P-INVERSE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A change-of-basis matrix is a translator from one language (basis) to another — get the
  source and target languages backwards, and every translation comes out wrong."**
- **Anti-analogy**: reapplying the SAME translation is not how you undo it — you need the reverse
  translator (the inverse matrix), not a second application of the forward one.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the explicit $P_{\beta\to\gamma}$ construction for
  $\beta=\{(1,1),(1,-1)\}$, labeling which basis supplies columns and which basis they're expressed
  in.
- **Demonstration 2 (targets MC-2)**: the $P^{-1}$-based reverse conversion, verified against
  reapplying $P$ (which fails to recover the original coordinates).

## Discovery Questions
1. "Should the change-of-basis matrix's columns come from β's vectors or γ's vectors?"
2. "To convert coordinates in the reverse direction, do you apply P again, or its inverse?"
3. "Is the similarity relation B=P⁻¹AP a completely new idea, or does it reuse the same
   coordinate-conversion machinery already built?"

## Teaching Sequence
1. **Conceptual shift**: the correct source/target column construction, working Demonstration 1,
   isolating MC-1.
2. **Contrast pair**: the inverse-matrix reverse conversion, working Demonstration 2, isolating
   MC-2.
3. **Representation shift**: the similarity relation as a direct extension of the coordinate-
   conversion machinery.
4. **Mastery gate**: require a correct change-of-basis matrix construction, a correct reverse
   conversion via the inverse, and a correct verification that the round-trip conversion recovers
   the original coordinates, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a change-of-basis matrix whose columns come from the target basis instead of the
  source basis.
- Never accept the same matrix $P$ reapplied for a reverse-direction coordinate conversion.
- Never accept the similarity relation stated without connecting it to the underlying coordinate-
  conversion matrices.

## Voice Teaching Notes
- Say "whose vectors are the columns, and in which basis are they expressed?" whenever a
  change-of-basis matrix is constructed.
- Ask "is this the forward conversion or the reverse — which matrix do you need?" whenever
  coordinates are converted between bases.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs a change-of-basis matrix with columns
  from the correct source basis.
- **Rung 2 (application)**: learner correctly converts coordinates in both directions, using $P$
  and $P^{-1}$ appropriately.
- **Rung 3 (transfer)**: learner correctly applies the similarity relation to find a linear map's
  matrix representation in a new basis, and correctly identifies which matrix a bidirectional
  real-world conversion (e.g. robotics sensor-to-workspace coordinates) requires.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the columns-from-source-basis rule explicitly.
- If MC-2 recurs, re-verify $P^{-1}P=I$ directly.

## Memory Hooks
- "Columns come from the source basis, written in the target basis's coordinates."
- "Reverse conversion needs the inverse matrix — reapplying P doesn't undo anything."
- "Similarity is the same coordinate-conversion idea, wrapped around a linear map's action."

## Transfer Connections
- `math.linalg.coordinates` (already authored, this campaign, Batch 171): supplies the coordinate-
  vector framework this concept's conversion matrix directly operates on.
- `math.linalg.matrix-inverse` (already authored, certified domain): supplies the inverse-matrix
  machinery this concept's reverse-conversion and similarity relation both directly rely on.
- `math.linalg.diagonalization` (not yet authored, KG's declared related concept): a special,
  especially useful case of a basis change making a matrix representation as simple as possible.

## Cross-Subject Connections
- Robotics/engineering: bidirectional coordinate conversion between sensor-space (e.g. joint
  angles) and workspace coordinates, a genuine, common practical need for the forward/reverse
  distinction.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.change-of-basis.md`, reused by
  reference for its full $P$-construction and $P^{-1}$-based reverse-conversion worked example,
  its similarity-relation computation, and its two-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying bidirectional coordinate
  conversion to a robotics sensor-to-workspace scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.coordinates`/`math.linalg.matrix-inverse`, unlocks none, cross_links none,
  proficient/apply, mastery_threshold 0.85, estimated_hours 4) was directly verified against the
  live KG and matches exactly. `math.linalg.matrix-inverse` independently re-confirmed authored in
  the EDUCATIONAL-BRAIN corpus.

## Version History
- 2026-09-19 (Batch 172): authored. Second entry this batch. Companion batch concept:
  `math.linalg.rank-nullity`.

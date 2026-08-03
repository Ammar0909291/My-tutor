# Teaching Blueprint: Change of Basis (`math.linalg.change-of-basis`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.linalg.change-of-basis` |
| name | Change of Basis |
| domain | Linear Algebra |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.linalg.coordinates`, `math.linalg.matrix-inverse` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | If β and γ are bases, the change-of-basis matrix P_{β→γ} satisfies [v]_γ = P[v]_β. Matrix representations of a linear map in two bases are related by similarity: B = P⁻¹AP.

 |

## Component 1 — Learning Objectives

- LO1: Construct the change-of-basis matrix $P_{\beta\to\gamma}$ (whose columns are $\beta$'s basis vectors expressed in $\gamma$-coordinates), and use it to convert $[v]_\beta$ into $[v]_\gamma$ via $[v]_\gamma=P[v]_\beta$.
- LO2: Convert coordinates in the OTHER direction ($\gamma\to\beta$) using $P^{-1}$, correctly recognizing which matrix inverts which conversion.
- LO3: Apply the similarity relation $B=P^{-1}AP$ relating a linear map's matrix representations in two different bases.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.coordinates` (coordinate vectors relative to a basis) and `math.linalg.matrix-inverse` (needed for the reverse-direction conversion and the similarity relation).

## Component 3 — Core Explanation

The **change-of-basis matrix** $P_{\beta\to\gamma}$ converts a vector's $\beta$-coordinates into its $\gamma$-coordinates: $[v]_\gamma=P_{\beta\to\gamma}[v]_\beta$. Its COLUMNS are $\beta$'s basis vectors, each expressed IN $\gamma$-coordinates.

Converting in the REVERSE direction ($\beta$-coordinates FROM $\gamma$-coordinates) uses the INVERSE: $[v]_\beta=P_{\beta\to\gamma}^{-1}[v]_\gamma$ — since applying $P$ then $P^{-1}$ (or vice versa) undoes the conversion, returning to the original coordinates.

For a linear map $T$ represented by matrix $A$ relative to one basis and matrix $B$ relative to another (related basis change $P$): $B=P^{-1}AP$ — this SIMILARITY relation captures how a transformation's matrix representation changes as the coordinate system itself changes, while the underlying transformation remains the same.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing P and converting coordinates, breaking MC-1)**: Let $\beta=\{(1,1),(1,-1)\}$ and $\gamma$ = standard basis. $P_{\beta\to\gamma}$'s columns are $\beta$'s vectors IN $\gamma$(standard)-coordinates: since $\gamma$ is standard, $\beta$'s vectors' standard coordinates are just themselves: $P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$. For $[v]_\beta=(3,2)$: $[v]_\gamma=P[v]_\beta=\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}3\\2\end{pmatrix}=\begin{pmatrix}5\\1\end{pmatrix}$ — so $v=(5,1)$ in standard coordinates. Verify: $3(1,1)+2(1,-1)=(3+2,3-2)=(5,1)$ ✓. A common error builds $P$'s columns from the WRONG basis (e.g. using $\gamma$'s vectors instead of $\beta$'s), reversing which basis the matrix actually converts FROM.

**Example 2 (LO2 — reverse conversion using the inverse, breaking MC-2)**: Continuing Example 1, convert $v=(5,1)$ (standard/$\gamma$-coordinates) BACK to $\beta$-coordinates. Compute $P^{-1}$: $\det(P)=1(-1)-1(1)=-2$; $P^{-1}=\frac{1}{-2}\begin{pmatrix}-1&-1\\-1&1\end{pmatrix}=\begin{pmatrix}0.5&0.5\\0.5&-0.5\end{pmatrix}$. $[v]_\beta=P^{-1}[v]_\gamma=\begin{pmatrix}0.5&0.5\\0.5&-0.5\end{pmatrix}\begin{pmatrix}5\\1\end{pmatrix}=\begin{pmatrix}3\\2\end{pmatrix}$ — matching Example 1's original $(3,2)$ ✓. A common error applies $P$ again (instead of $P^{-1}$) for the reverse direction, since it's easy to lose track of which conversion direction each matrix performs.

**Example 3 (LO3 — similarity relation for matrix representations)**: If $A=\begin{pmatrix}2&0\\0&3\end{pmatrix}$ represents $T$ relative to $\beta=\{(1,1),(1,-1)\}$, and we want $B$, $T$'s representation relative to the standard basis $\gamma$: using $P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ (from Example 1) and its inverse (from Example 2): $B=PAP^{-1}$ (note: the exact placement of $P$ vs $P^{-1}$ depends on the conversion direction convention being used consistently) $=\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}2&0\\0&3\end{pmatrix}\begin{pmatrix}0.5&0.5\\0.5&-0.5\end{pmatrix}=\begin{pmatrix}2&3\\2&-3\end{pmatrix}\begin{pmatrix}0.5&0.5\\0.5&-0.5\end{pmatrix}=\begin{pmatrix}2.5&-0.5\\-0.5&2.5\end{pmatrix}$.

## Component 5 — Teaching Actions

### Teaching Action A01 — P's Columns Come from the SOURCE Basis, in TARGET Coordinates (Primitive P64: Conceptual Shift)

Work Example 1, explicitly labeling which basis ($\beta$) supplies the columns and which basis ($\gamma$) the columns are EXPRESSED in, reinforcing the direction encoded in the matrix's construction.

- **MC-1 hook**: check whether $P$'s columns are built from $\beta$ (correct) or $\gamma$ (incorrect).

### Teaching Action A02 — Reverse Direction Uses the Inverse Matrix (Primitive P06: Contrast Pair)

Work Example 2, explicitly computing $P^{-1}$ and verifying it correctly undoes $P$'s conversion, contrasting against the flawed reapplication of $P$ itself. State the rule: "converting FROM $\gamma$ TO $\beta$ (the reverse of what $P$ does) requires $P^{-1}$ — using $P$ again in the wrong direction does not undo the original conversion."

- **MC-2 hook**: this directly targets MC-2 (using $P$ instead of $P^{-1}$ for the reverse conversion).

### Teaching Action A03 — Similarity Relates Matrix Representations Across Bases (Primitive P11: Representation Shift)

Work Example 3, connecting the similarity transformation directly back to the coordinate-conversion matrices already constructed, showing this is a natural extension rather than a new isolated formula.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Construct $P_{\beta\to\gamma}$ for $\beta=\{(2,0),(0,3)\}$ and $\gamma$ = standard basis.
  2. Using your matrix from problem 1, convert $[v]_\beta=(4,5)$ to standard coordinates.
  3. Convert the standard-coordinate result from problem 2 back to $\beta$-coordinates using $P^{-1}$, verifying you recover $(4,5)$.
  4. Explain, in one sentence, why the reverse coordinate conversion requires the inverse matrix rather than the original.
- **P76 (Transfer Probe, mode = independence)**: "A robotics arm's joint-angle sensors report positions in a NON-STANDARD basis $\beta$ aligned with the arm's mechanical linkages, but the control software needs positions in STANDARD $(x,y)$ workspace coordinates for collision detection. (a) Given a change-of-basis matrix $P_{\beta\to\text{standard}}$, explain how to convert a sensor reading $[v]_\beta$ into workspace coordinates. (b) If the control software needs to convert a DETECTED workspace collision point back into the arm's joint-angle basis (to determine which joint to adjust), explain which matrix ($P$ or $P^{-1}$) is needed for this reverse conversion, and why using the wrong one would give a meaningless result for the robot's joint adjustments."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CHANGE-OF-BASIS-MATRIX-BUILT-FROM-WRONG-BASIS | Constructing $P_{\beta\to\gamma}$'s columns from $\gamma$'s vectors instead of $\beta$'s, reversing the conversion direction the matrix actually performs | Foundational |
| MC-2 | REVERSE-CONVERSION-USES-P-INSTEAD-OF-P-INVERSE | Applying $P$ again (rather than $P^{-1}$) when converting coordinates in the reverse direction | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Change of Basis Matrix Built from Wrong Basis") → P41 (detect: present Example 1 and check whether $P$'s columns come from $\beta$ or $\gamma$) → P64 (conceptual shift: re-derive by explicitly stating "columns = SOURCE basis vectors, expressed in TARGET coordinates" and re-checking against this rule).
- **B02 (targets MC-2)**: P27 ("Reverse Conversion Uses P Instead of P Inverse") → P41 (detect: present Example 2 and check whether $P$ or $P^{-1}$ is applied for the reverse direction) → P64 (conceptual shift: re-verify by composing $P$ and the proposed reverse matrix, confirming only $P^{-1}$ genuinely undoes $P$'s effect, i.e. $P^{-1}P=I$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.coordinates`, `math.linalg.matrix-inverse`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.linalg.diagonalization` (a special, especially useful case of a basis change making a matrix representation as simple as possible).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept synthesizes coordinates and matrix inversion into a genuinely new construction (the change-of-basis matrix) with a direction-sensitive structure prone to reversal errors.
- MC-1 and MC-2 are both ranked foundational because each represents a directional confusion — getting the SOURCE/TARGET roles backwards (MC-1) or the FORWARD/REVERSE conversion backwards (MC-2) — both producing a plausible-looking but incorrect matrix or computation.
- The robotics transfer probe was deliberately chosen because bidirectional coordinate conversion (sensor space to workspace and back) is a genuine, common robotics need, giving MC-2's forward/reverse distinction concrete engineering stakes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.linalg.coordinates`, `math.linalg.matrix-inverse`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

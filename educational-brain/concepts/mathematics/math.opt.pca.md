# math.opt.pca

## Identity
- **KG id**: `math.opt.pca`
- **Domain**: math.opt
- **Requires**: `math.linalg.svd`, `math.stats.covariance-matrix`
- **Unlocks**: none
- **Cross-links**: `math.linalg.svd`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Center the data before computing the covariance matrix — NEVER skipped as a minor detail;
recognize principal components are LINEAR COMBINATIONS of ALL features, NEVER a selected subset
of the original features; and compute the explained variance ratio as $\lambda_i/\sum_j\lambda_j$
— NEVER $\lambda_i/\lambda_{\max}$.

## Core Understanding
CENTERING IS REQUIRED — NEVER A MINOR PREPROCESSING DETAIL: for $X_{\text{raw}}=\{(2,3),(4,7),
(6,5),(8,9)\}$ with mean $\mu=(5,6)$: the CENTERED covariance $\Sigma=\frac14X_c^TX_c=[[5,3],[3,
5]]$ gives eigenvalues $\lambda_1=8,\lambda_2=2$ and PC$_1=(1/\sqrt2)[1,1]$. Using the UNCENTERED
data instead: $\Sigma_{\text{uncentered}}=\frac14X_{\text{raw}}^TX_{\text{raw}}\approx[[30,41],
[41,60]]$, giving a leading eigenvector $\approx(0.58,0.82)$ — a COMPLETELY DIFFERENT direction,
biased by the mean itself. Applying PCA to UNCENTERED data is WRONG — variance measures spread
AROUND THE MEAN, never around the origin; centering is REQUIRED, never a minor detail that can be
skipped.

PRINCIPAL COMPONENTS ARE LINEAR COMBINATIONS OF ALL FEATURES — NEVER SELECTED ORIGINAL FEATURES:
for a dataset with height, weight, and BMI: PC$_1$ is NEVER simply "the feature with highest
variance" (e.g. BMI) — BMI is itself a NONLINEAR function of height and weight, and PCA finds
LINEAR combinations; PC$_1$'s actual loadings on all three features are determined by the FULL
covariance structure, never by picking out one column. In the worked $2\times2$ example,
PC$_1=(1/\sqrt2)[1,1]$ is NOT column $x_1$ or $x_2$ — it is the direction $45°$ between them;
the projected score for sample $(-3,-3)$ is $-3\sqrt2\approx-4.24$, using BOTH features, never
equal to either raw feature value. Believing PCA "selects" the original feature(s) with highest
variance confuses PCA (creating NEW variables via linear combinations) with feature selection
(dropping columns) — genuinely different mechanisms.

EXPLAINED VARIANCE RATIO DIVIDES BY THE SUM, NEVER THE MAXIMUM EIGENVALUE: for $\lambda_1=8$,
$\lambda_2=2$: the total variance is $\text{trace}(\Sigma)=\lambda_1+\lambda_2=10$ (the trace is
preserved across eigendecomposition). The CORRECT explained variance ratio for PC$_1$ is
$8/10=80\%$. Computing $\lambda_1/\lambda_{\max}=8/8=100\%$ instead is WRONG — that formula would
absurdly claim the FIRST component ALWAYS explains 100% of variance, meaning no additional
components would ever be needed; the denominator must be the SUM of ALL eigenvalues, never just
the largest one.

## Mental Models
- **"Variance is measured around the mean — centering isn't optional cleanup, it's the
  definition PCA depends on."**
- **"A principal component is a new coordinate blending every original feature — never a
  spotlight on one existing column."**
- **"Explained variance divides by the total (the sum of all eigenvalues) — never by the single
  largest one, which would nonsensically always give 100%."**

## Why Students Fail

### MC-1: PCA-SELECTS-FEATURES
- **Surface form**: confuses PCA with feature selection; believes principal components are
  original features with highest variance, not seeing that PCs are linear combinations of all
  features.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — both PCA and feature
  selection reduce dimensionality, but by genuinely different mechanisms).
- **Repair**: re-derive the explicit projection score using both features, contrasting it with
  simply reading off one raw column.

### MC-2: FORGET-CENTRING
- **Surface form**: applies PCA to uncentered data; gets a first PC dominated by the mean
  direction rather than the variance direction.
- **Birth type**: perceptual intuition (Blueprint's own declared birth type — centering seems
  like a minor preprocessing detail).
- **Repair**: re-compute the uncentered covariance matrix, confirming the leading eigenvector
  shifts dramatically toward the mean direction.

### MC-3: EIGENVALUE-IS-VARIANCE-TOTAL
- **Surface form**: adds up all eigenvalues to get total variance but uses the wrong formula for
  the explained ratio, dividing individual eigenvalue by the largest eigenvalue instead of the
  sum.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — normalizing by the
  maximum sounds natural).
- **Repair**: re-derive the trace-preservation identity, confirming the denominator must be the
  sum of ALL eigenvalues.

## Misconceptions

### MC-1: PCA-SELECTS-FEATURES
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: FORGET-CENTRING
- **Surface form**: as described above.
- **Root cause (perceptual intuition)**: as described above.
- **Repair**: as described above.

### MC-3: EIGENVALUE-IS-VARIANCE-TOTAL
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Centering data before PCA is like zeroing a scale before weighing — skip it, and you're
  measuring against an arbitrary offset, never the actual spread."**
- **Anti-analogy**: a principal component isn't a spotlight singling out one existing feature —
  it's a new blended direction, like a recipe combining ingredients rather than picking a single
  one off the shelf.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the centered-versus-uncentered covariance matrix and
  eigenvector comparison.
- **Demonstration 2 (targets MC-1)**: the BMI-as-PC$_1$ gate question, contrasting linear
  combinations against nonlinear feature selection.
- **Demonstration 3 (targets MC-3)**: the $\lambda_1/(\lambda_1+\lambda_2)=80\%$-versus-
  $\lambda_1/\lambda_{\max}=100\%$ explained-variance contrast.

## Discovery Questions
1. "Does it matter whether you center the data before computing the covariance matrix for PCA?"
2. "Is a principal component the same as one of the original features?"
3. "Should you divide an eigenvalue by the largest eigenvalue, or by the sum of all eigenvalues,
   to get the explained variance ratio?"

## Teaching Sequence
1. **Representation shift**: the four-representation PCA derivation (geometric, algebraic, SVD,
   optimization), setting up the centering groundwork, working Demonstration 1, isolating MC-2.
2. **Misconception detector**: the PCA-vs-feature-selection gate question, working Demonstration
   2, isolating MC-1.
3. **Contrast pair**: the correct-versus-incorrect explained-variance-ratio comparison, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require correctly centered PCA computation, a correct explanation of why PCs
   are linear combinations of all features, and a correct explained-variance-ratio computation,
   at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept PCA applied without first centering the data.
- Never accept a principal component described as one of the original features.
- Never accept explained variance computed by dividing by the largest eigenvalue.

## Voice Teaching Notes
- Say "have you centered the data first?" whenever PCA is being applied.
- Ask "is that a new direction combining all the features, or just one original column?"
  whenever a principal component is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly centers data before computing the covariance
  matrix.
- **Rung 2 (application)**: learner correctly computes principal components as eigenvectors of
  the covariance matrix and explains they combine all features.
- **Rung 3 (transfer)**: learner correctly connects SVD to PCA, explaining why the SVD route
  avoids forming $X^TX$ explicitly for numerical stability with high-dimensional data.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the explicit projection score using both features.
- If MC-2 recurs, re-compute the uncentered-versus-centered covariance comparison.
- If MC-3 recurs, re-derive the trace-preservation identity.

## Memory Hooks
- "Center first — variance is measured around the mean, never the origin."
- "A principal component blends every feature — never spotlights just one."
- "Explained variance divides by the sum of all eigenvalues — never the largest alone."

## Transfer Connections
- `math.linalg.svd` (already authored, certified domain; cross-link): supplies the SVD framework
  this concept uses as the numerically stable route to computing principal components.
- `math.stats.covariance-matrix` (already authored, this campaign, Batch 210): supplies the
  covariance matrix construction (diagonal as self-covariance, symmetry, positive
  semidefiniteness) this concept's eigendecomposition directly operates on.

## Cross-Subject Connections
- Computer vision (Eigenfaces): applying PCA to a dataset of face images, using the SVD trick to
  avoid forming an enormous pixel-count-by-pixel-count covariance matrix, was a foundational
  early application of this concept.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.pca.md`, reused by reference for its
  four-representation PCA derivation, its centered-versus-uncentered comparison, its PCA-vs-
  feature-selection gate question, its explained-variance-ratio contrast, and its
  three-misconception registry (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link-mode probe (`math.linalg.svd`) deriving the
  SVD-covariance equivalence and explaining why SVD-based PCA avoids forming $X^TX$ explicitly for
  a high-dimensional face-image dataset.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.svd`/`math.stats.covariance-matrix`, unlocks none, cross_links
  `math.linalg.svd`, proficient/apply, mastery_threshold 0.8, estimated_hours 5) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 223): authored. Second entry this batch. Companion batch concept:
  `math.num.stiff-ode`.

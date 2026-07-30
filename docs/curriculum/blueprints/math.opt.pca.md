# Blueprint: math.opt.pca

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.opt.pca |
| Title | Principal Component Analysis |
| Domain | math.opt |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.linalg.svd, math.stats.covariance-matrix |
| Cross-links | math.linalg.svd |
| Unlocks | — |

## Component 1 — Learning Objective
Given a data matrix X (n×d, n samples, d features), the student centres the data, computes the empirical covariance matrix Σ=(1/n)XᵀX, applies eigendecomposition or SVD to identify the top-k principal components (eigenvectors of Σ corresponding to the largest eigenvalues), projects X onto these components, computes the explained variance ratio, and selects k using the scree plot or a variance threshold.

## Component 2 — CPA Entry Stage
**C — Concrete** (explicit data matrices; column-wise centering; step-by-step covariance computation; tabular eigenvalue ranking)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | PCA-SELECTS-FEATURES | Student confuses PCA with feature selection; believes principal components are original features with highest variance; does not see that PCs are LINEAR COMBINATIONS of all features | Type 5 — instruction-induced (both reduce dimensionality, but by different mechanisms) |
| MC-2 | FORGET-CENTRING | Student applies PCA to uncentred data; gets a first PC dominated by the mean direction rather than variance direction | Type 2 — perceptual intuition (centring seems like a minor preprocessing detail) |
| MC-3 | EIGENVALUE-IS-VARIANCE-TOTAL | Student adds up all eigenvalues to get total variance but uses the wrong formula for explained ratio; divides individual eigenvalue by the largest eigenvalue instead of the sum | Type 1 — overgeneralization (normalising by the maximum sounds natural) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of PCA:**

| Representation | Instance |
|---|---|
| Geometric | Rotate the coordinate system so the first axis points in the direction of maximum variance; project the data onto successive orthogonal maximum-variance axes |
| Algebraic | Eigendecomposition: Σ=QΛQᵀ where columns of Q are principal components; rows of XQ are the projected scores |
| SVD | X=UΣVᵀ; columns of V are principal components; XVₖ=UₖΣₖ are the k-dimensional projected scores |
| Optimisation | PC₁ = argmax_{‖w‖=1} Var(Xw) = argmax wᵀΣw; solved by the leading eigenvector of Σ |

**Worked example (2D, n=4 samples):**

Raw data X_raw:
```
x₁: [2, 3]
x₂: [4, 7]
x₃: [6, 5]
x₄: [8, 9]
```
Mean: μ=(5, 6). Centred X:
```
[-3,-3], [-1,1], [1,-1], [3,3]
```
Covariance: Σ=(1/4)XᵀX = [[5,3],[3,5]]. Eigenvalues: λ₁=8, λ₂=2. PC₁=(1/√2)[1,1], PC₂=(1/√2)[1,−1]. Explained variance: λ₁/(λ₁+λ₂)=8/10=80%.

**P49 checkpoint:**
- CORRECT → "PCs are eigenvectors of the covariance matrix; eigenvalues measure variance in each direction." → A02
- PARTIAL (computes eigenvectors but forgot centring) → "What is Σ for uncentred X_raw? Compare it to Σ for centred X." → TB-R02 → A02
- INCORRECT → TB-R02 → A02
- NO_RESPONSE → "Compute the mean of the four x₁-coordinates: (2+4+6+8)/4=?" → TB-R02 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**PCA vs. feature selection — diagnostic:**

**Claim:** "PCA selects the original features with highest variance — so for our 2D example it would select x₁ (since both features have similar variance, it might pick x₁)."

**Counter-evidence:** PC₁=(1/√2)[1,1] is not column x₁ or x₂ — it is the direction 45° between them. The projection of x₁=(−3,−1,1,3) onto PC₁ is (−3·(1/√2)+(−3)·(1/√2),…)=(−3√2,0,0,3√2). This is a new variable, not either original.

**Why it matters:** Feature selection removes columns (d→k columns). PCA creates NEW variables (d→k new coordinates as linear combinations). Feature selection is interpretable but suboptimal for variance maximisation; PCA maximises explained variance but loses feature interpretability.

**Gate question (MC-1):** "A dataset has features: height (cm), weight (kg), BMI (kg/m²). A student applies PCA and claims PC₁ must be BMI because BMI has the highest variance. Is this correct?"

No. BMI is a nonlinear function of height and weight, and PCA finds linear combinations. The covariance structure across all three features determines PC₁ — it could have large loadings on all three or none of them, depending on the correlation structure.

**P49 checkpoint:**
- CORRECT → "PCs are linear combinations of ALL features, not selected subsets. They maximise variance in new coordinate directions." → A03
- PARTIAL (agrees PCA isn't feature selection, unclear on linear combination) → "In the 2D example, write out what PC₁'s score is for the first sample: (1/√2)·(−3)+(1/√2)·(−3)=?" → TB-R01 → A03
- INCORRECT → TB-R01 → A03
- NO_RESPONSE → "Can the first principal component score be negative? What does a negative score mean geometrically?" → TB-R01 → A03

### A03 — P06 CONTRAST PAIR
**Explained variance: correct vs. incorrect ratio:**

| Quantity | Value | Correct use |
|---|---|---|
| λ₁=8 | Variance in PC₁ direction | Numerator of explained variance ratio for PC₁ |
| λ₂=2 | Variance in PC₂ direction | Numerator of ratio for PC₂ |
| λ₁+λ₂=10 | Total variance (trace of Σ) | Denominator of ALL explained variance ratios |
| λ₁/λ_max=8/8=100% | WRONG — normalises by max | Incorrect formula |
| λ₁/(λ₁+λ₂)=80% | CORRECT — explains 80% | Correct formula |

**Scree plot interpretation:** Plot eigenvalues λ₁≥λ₂≥…≥λ_d. Elbow heuristic: choose k where the decrease in eigenvalue levels off. Cumulative variance rule: choose k such that (λ₁+…+λₖ)/(λ₁+…+λ_d)≥0.90 (90% threshold is common in practice).

**SVD connection:** If X=UΣVᵀ (economy SVD, n×k, k×k, d×k), the principal components are the columns of V, and the eigenvalues of the covariance matrix are σᵢ²/n where σᵢ are the singular values. Projection: XVₖ gives the k-dimensional scores. This is numerically more stable than forming XᵀX explicitly.

**P49 checkpoint:**
- CORRECT → "Explained variance ratio = λᵢ/(Σλⱼ) — divide by SUM not maximum. SVD gives principal components as right singular vectors." → Gate (P91)
- PARTIAL (knows trace is denominator, confused about SVD) → "If singular values are σ₁=4, σ₂=2, n=4, what are the eigenvalues of the covariance matrix?" → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "In our 2D example, λ₁=8, λ₂=2. What fraction of total variance does PC₁ explain?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 PCA-SELECTS-FEATURES):**
Step 1 — "Feature selection drops columns of X. PCA creates new columns (scores) by multiplying X by the loading matrix V. The new columns are linear combinations of ALL original columns." Step 2 — Write explicitly: score₁ = X·v₁ where v₁=(1/√2,1/√2). For sample x=(−3,−3): score = (−3)·(1/√2)+(−3)·(1/√2)=−3√2≈−4.24. This uses BOTH features. Step 3 — Contrast: feature selection would simply take x₁-column=−3; PCA gives −4.24, a different value using both.

**TB-R02 (MC-2 FORGET-CENTRING):**
Step 1 — "Variance measures spread around the MEAN, not around the origin. PCA maximises variance, so we must first remove the mean." Step 2 — Compute Σ_uncentred=(1/4)X_rawᵀX_raw for X_raw above: ≈[[30,41],[41,60]]. Leading eigenvector ≈(0.58,0.82) — not the (1/√2,1/√2) direction. The mean (5,6) itself biases the result. Step 3 — Centring ensures Σ=(1/n)XcᵀXc where Xc=X_raw−μ1ᵀ; this is the definition of the sample covariance matrix.

**TB-R03 (MC-3 EIGENVALUE-IS-VARIANCE-TOTAL):**
Step 1 — "Total variance = sum of all feature variances = trace(Σ) = Σλᵢ. The trace is preserved across eigendecomposition." Step 2 — In our example: trace(Σ)=5+5=10=λ₁+λ₂=8+2 ✓. Explained ratio for PC₁: 8/10=80%. Step 3 — "Dividing by λ_max (=8) gives 8/8=100% for the first component — which would mean all variation is explained and you never need more components. That's wrong." Re-probe with λ₁/(λ₁+λ₂).

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. Data matrix (3 samples, 2 features): X_raw=[[1,1],[3,3],[5,5]]. Compute the centred data, the 2×2 covariance matrix, the eigenvalues, and interpret the result (why is one eigenvalue zero?).
2. A dataset has d=5 features with eigenvalues of the covariance matrix: λ=(10,5,2,1,0.5). Choose k using the 90% variance threshold.
3. Explain why PCA applied to standardised data (each feature divided by its std before applying PCA) gives different results than PCA on uncentred/unstandardised data, and when you would prefer one over the other.
4. The economy SVD of centred X is X=UΣVᵀ with singular values (6,3,1,0.5) and n=10 samples. Compute the explained variance ratio for the first two principal components.

**P55 — Reflect & Consolidate:** "PCA finds directions of maximum variance via the eigendecomposition of the covariance matrix. Always centre first. Explained variance ratio = λᵢ/Σλⱼ. SVD is the numerically stable route."

**P76 — Transfer Probe (Cross-link to math.linalg.svd):**
The connection between SVD and PCA: given centred X (n×d), the economy SVD is X=UΣVᵀ. Show that (a) the columns of V are the eigenvectors of (1/n)XᵀX (the covariance matrix), and (b) the eigenvalues of the covariance matrix equal σᵢ²/n where σᵢ are the singular values of X. Use this to explain why SVD-based PCA avoids forming XᵀX explicitly (numerical stability when n<d).

**P55 — Reflect & Consolidate:** "SVD directly yields PCA: right singular vectors are principal components, squared singular values divided by n are eigenvalues. No need to form XᵀX explicitly — more stable numerically."

**P75 — Mastery Assessment:**
"Dataset: 50 face images, each 64×64=4096 pixels (flattened to a vector). (a) What is the size of the data matrix X and its covariance matrix Σ? (b) Why is computing the full eigendecomposition of Σ impractical? (c) Describe how the economy SVD of X (50×4096, rank≤50) reduces the computation. (d) The top 10 singular values of X explain 85% of variance. How many additional singular values do you need to reach 95%, and how would you decide without computing all 4096?"

**P55 — Reflect & Consolidate:** "Face recognition (Eigenfaces) was the first major PCA application in computer vision. The SVD trick is essential: instead of a 4096×4096 covariance matrix, you work with a 50×50 matrix."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.opt.pca complete
- Score 3/5 → REVIEW centring and explained variance formula; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.linalg.svd or math.stats.covariance-matrix; reassign

**P78 — Completion:** PCA certified. Student can centre data, compute covariance, find principal components, and interpret explained variance ratios via eigendecomposition or SVD.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.linalg.svd])
Target: SVD ↔ PCA equivalence; economy SVD avoids forming XᵀX; columns of V are PCs; singular values → eigenvalues via λᵢ=σᵢ²/n
Skill tested: Derive the SVD–covariance connection algebraically; explain numerical advantage

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

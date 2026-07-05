# Functional Analysis (`math.fnal`)

**Domain:** math.fnal  
**Subject:** Mathematics  
**Concepts:** 18  
**Status:** draft  
**Build Date:** 2026-07-05  
**KG Version:** 1.0.1 (commit 4ae2048)

---

## Table of Contents

1. [Normed Spaces](#normed-space)
2. [Completeness and Cauchy Sequences](#completeness)
3. [Banach Spaces](#banach-space)
4. [Hilbert Spaces](#hilbert-space)
5. [Bounded Linear Operators](#bounded-operator)
6. [Dual Spaces and Linear Functionals](#dual-space-functional)
7. [Hahn-Banach Theorem](#hahn-banach)
8. [Open Mapping Theorem](#open-mapping-theorem)
9. [Closed Graph Theorem](#closed-graph-theorem)
10. [Uniform Boundedness Principle](#uniform-boundedness)
11. [Riesz Representation Theorem](#riesz-representation)
12. [Spectral Theory](#spectral-theory)
13. [Compact Operators and Their Spectra](#compact-operator-spectrum)
14. [Fourier Transform on L²](#fourier-transform)
15. [Distributions and Generalized Functions](#distributions)
16. [Special Functions and Orthogonal Systems](#special-functions)
17. [Dense Subspaces](#dense-subspace)
18. [Convolution](#convolution)

---

## 1. Normed Spaces {#normed-space}

**Concept ID:** `math.fnal.normed-space`  
**Prerequisites:** math.linalg.vector-space, math.linalg.norm  
**Difficulty:** intermediate

A **normed space** is a vector space X equipped with a norm ‖·‖: X → [0,∞) satisfying positivity (‖x‖ = 0 iff x = 0), homogeneity (‖αx‖ = |α|‖x‖), and the triangle inequality (‖x+y‖ ≤ ‖x‖+‖y‖). Norms induce a metric d(x,y) = ‖x−y‖, making X a metric space.

**Key Ideas:**
- Every norm induces a metric; not every metric comes from a norm.
- Two norms on a finite-dimensional space are always equivalent; in infinite dimensions this fails.
- The open and closed unit balls B(0,1) and B̄(0,1) are the fundamental geometric objects of a normed space.

**Common Misconceptions:**
- *"All norms on a space are equivalent"* — False in infinite dimensions; ‖·‖₁ and ‖·‖₂ on C[0,1] are inequivalent.
- *"The metric induced by a norm always satisfies the parallelogram law"* — Only norms arising from inner products satisfy the parallelogram law.

**Learning Objective:** Define normed spaces and verify the norm axioms; compute norms in standard spaces (ℓ^p, L^p, C[a,b]) and determine equivalence of norms.

---

## 2. Completeness and Cauchy Sequences {#completeness}

**Concept ID:** `math.fnal.completeness`  
**Prerequisites:** math.fnal.normed-space, math.real.cauchy-sequence  
**Difficulty:** intermediate

A normed space X is **complete** if every Cauchy sequence in X converges to a limit in X. Completeness distinguishes Banach and Hilbert spaces from merely normed spaces and is the fundamental regularity property underlying the Big Three theorems of functional analysis.

**Key Ideas:**
- Cauchy sequences in a normed space need not converge unless the space is complete; e.g., Q with |·| has Cauchy sequences converging to irrationals outside Q.
- Completion: every normed space X has a unique (up to isometric isomorphism) complete normed space X̄ containing X as a dense subspace.
- Characterization of completeness via series: X is complete iff every absolutely convergent series Σxₙ (with Σ‖xₙ‖ < ∞) converges in X.

**Common Misconceptions:**
- *"Every subspace of a complete space is complete"* — False; ℚ ⊂ ℝ is a subspace of a complete space but is not complete.
- *"Convergent sequences are always Cauchy, but the converse requires completeness"* — Partially correct; all convergent sequences are Cauchy in any metric space; the converse (Cauchy → convergent) characterizes completeness.

**Learning Objective:** Define completeness in a normed space; verify completeness using the series criterion; construct the completion of an incomplete space.

---

## 3. Banach Spaces {#banach-space}

**Concept ID:** `math.fnal.banach-space`  
**Prerequisites:** math.fnal.completeness  
**Difficulty:** intermediate

A **Banach space** is a complete normed vector space. The standard examples are ℓ^p (p ≥ 1), L^p(μ) for a measure μ, and C(K) for compact K. Banach spaces are the natural setting for the three fundamental theorems of functional analysis: the Open Mapping Theorem, the Closed Graph Theorem, and the Uniform Boundedness Principle.

**Key Ideas:**
- Canonical examples: ℓ¹, ℓ², ℓ^∞, L¹[0,1], L²[0,1], C[0,1] with sup-norm are all Banach; ℓ^p_0 (finitely supported) is not.
- Subspace criterion: a subspace M of a Banach space X is Banach iff M is closed in X.
- Quotient Banach spaces: if M is a closed subspace of a Banach space X, the quotient X/M with ‖x+M‖ = inf_{m∈M}‖x+m‖ is a Banach space.

**Common Misconceptions:**
- *"Every normed space is Banach"* — False; the space of polynomials on [0,1] with the sup-norm is a normed space that is not complete.
- *"A closed subspace of a Banach space has the same dimension as the whole space"* — False; any proper closed subspace has lower (possibly zero) dimension or codimension.

**Learning Objective:** Identify Banach spaces among normed spaces; prove completeness of ℓ^p and L^p; apply the subspace criterion.

---

## 4. Hilbert Spaces {#hilbert-space}

**Concept ID:** `math.fnal.hilbert-space`  
**Prerequisites:** math.linalg.inner-product-space, math.fnal.banach-space  
**Difficulty:** intermediate

A **Hilbert space** is a complete inner product space. The inner product ⟨·,·⟩ induces a norm ‖x‖ = √⟨x,x⟩, making a Hilbert space a Banach space. Hilbert spaces admit orthonormal bases (in the sense of Parseval's identity) and support the Riesz Representation Theorem, which identifies the dual with the space itself.

**Key Ideas:**
- Orthogonal projection theorem: for any closed subspace M of a Hilbert space H, every x ∈ H decomposes uniquely as x = Px + (x−Px) with Px ∈ M and (x−Px) ∈ M⊥.
- Parseval's identity: if {eₙ} is an ONB, then ‖x‖² = Σ|⟨x, eₙ⟩|² for all x ∈ H.
- Every separable Hilbert space is isometrically isomorphic to ℓ².

**Common Misconceptions:**
- *"Every Banach space is a Hilbert space"* — False; a Banach space is a Hilbert space iff its norm satisfies the parallelogram law ‖x+y‖² + ‖x−y‖² = 2‖x‖² + 2‖y‖².
- *"Orthogonal complement M⊥ satisfies M ∪ M⊥ = H"* — False; M ⊕ M⊥ = H (direct sum), not M ∪ M⊥.

**Learning Objective:** Define Hilbert spaces and verify the parallelogram law; apply the orthogonal projection theorem; establish and use Parseval's identity.

---

## 5. Bounded Linear Operators {#bounded-operator}

**Concept ID:** `math.fnal.bounded-operator`  
**Prerequisites:** math.fnal.banach-space, math.linalg.linear-map  
**Difficulty:** intermediate

A linear operator T: X → Y between normed spaces is **bounded** if ‖T‖ = sup{‖Tx‖/‖x‖ : x ≠ 0} < ∞. Equivalently, T is continuous at every point. The space B(X,Y) of bounded linear operators from X to Y is itself a normed space; if Y is Banach, so is B(X,Y).

**Key Ideas:**
- Continuity ≡ boundedness: a linear operator is continuous iff it is bounded; these two notions coincide for linear maps (unlike general functions).
- Operator norm: ‖T‖ = sup_{‖x‖=1} ‖Tx‖ = inf{C: ‖Tx‖ ≤ C‖x‖ for all x} satisfies all norm axioms.
- Composition: if S ∈ B(Y,Z) and T ∈ B(X,Y), then ST ∈ B(X,Z) with ‖ST‖ ≤ ‖S‖·‖T‖.

**Common Misconceptions:**
- *"All linear operators are bounded"* — False in infinite dimensions; the differentiation operator d/dx on C¹[0,1] with the sup-norm is linear but unbounded.
- *"The operator norm is the largest eigenvalue"* — True only for symmetric/Hermitian matrices in finite dimensions. For general operators, ‖T‖ = spectral radius only for normal operators.

**Learning Objective:** Define bounded linear operators and their norms; distinguish bounded from unbounded operators; compute ‖T‖ for integral and matrix operators.

---

## 6. Dual Spaces and Linear Functionals {#dual-space-functional}

**Concept ID:** `math.fnal.dual-space-functional`  
**Prerequisites:** math.fnal.bounded-operator  
**Difficulty:** intermediate

The **dual space** X* of a normed space X is the Banach space B(X, ℝ) (or B(X, ℂ)) of bounded linear functionals on X. Every normed space has a nontrivial dual (by Hahn-Banach). The dual of L^p(μ) is isometrically isomorphic to L^q(μ) where 1/p + 1/q = 1 (1 < p < ∞); the dual of ℓ¹ is ℓ^∞.

**Key Ideas:**
- Canonical duals: (ℓ^p)* ≅ ℓ^q for 1 ≤ p < ∞ (1/p + 1/q = 1); (ℓ¹)* ≅ ℓ^∞; (L^p)* ≅ L^q.
- Second dual X** and reflexivity: the canonical embedding J: X → X** (J(x)(f) = f(x)) is always isometric; X is reflexive if J is surjective (X ≅ X**).
- Weak topology: the weak topology on X is the coarsest topology making all f ∈ X* continuous; bounded sequences in reflexive spaces have weakly convergent subsequences (Alaoglu's theorem).

**Common Misconceptions:**
- *"The dual of a Hilbert space is different from the space itself"* — By the Riesz Representation Theorem, H* ≅ H isometrically; Hilbert spaces are self-dual.
- *"The dual of ℓ^∞ is ℓ¹"* — False; (ℓ^∞)* is much larger than ℓ¹ (it includes finitely-additive measures on ℕ).

**Learning Objective:** Define dual spaces and compute duals of standard spaces; state the reflexivity condition; apply the canonical embedding.

---

## 7. Hahn-Banach Theorem {#hahn-banach}

**Concept ID:** `math.fnal.hahn-banach`  
**Prerequisites:** math.fnal.dual-space-functional  
**Difficulty:** advanced

The **Hahn-Banach Theorem** guarantees that every bounded linear functional on a subspace M of a normed space X extends to a bounded linear functional on all of X without increasing its norm. It underpins the richness of dual spaces and enables geometric separation of convex sets.

**Key Ideas:**
- Norm-preserving extension: if f: M → ℝ is bounded linear, ∃ F: X → ℝ bounded linear with F|_M = f and ‖F‖ = ‖f‖.
- Separation corollary: distinct points in X can be separated by continuous linear functionals; X* separates points of X.
- Non-uniqueness: the extension F is generally not unique; uniqueness holds only under strict convexity or reflexivity.

**Common Misconceptions:**
- *"The Hahn-Banach extension is unique"* — False in general; multiple norm-preserving extensions can exist.
- *"Hahn-Banach requires completeness"* — False; the theorem holds for any normed space (complete or not).

**Learning Objective:** State and apply the Hahn-Banach theorem; use it to prove existence of separating functionals; recognize when extensions may not be unique.

---

## 8. Open Mapping Theorem {#open-mapping-theorem}

**Concept ID:** `math.fnal.open-mapping-theorem`  
**Prerequisites:** math.fnal.banach-space, math.fnal.bounded-operator  
**Difficulty:** advanced

The **Open Mapping Theorem** (Banach-Schauder theorem) states that a surjective bounded linear operator between Banach spaces is an open map — it maps open sets to open sets. The key corollary (Bounded Inverse Theorem) states that a bijective bounded linear operator between Banach spaces has a bounded inverse.

**Key Ideas:**
- Surjectivity + boundedness + Banach ⟹ open map; completeness of both spaces is essential (the proof uses Baire category).
- Bounded inverse corollary: a bijective T ∈ B(X,Y) between Banach spaces is an isomorphism (T⁻¹ ∈ B(Y,X)).
- Proof sketch: surjectivity implies T(B(0,1)) contains a ball around 0 in Y (via Baire), then by linearity T is open.

**Common Misconceptions:**
- *"Any bijective bounded operator has a bounded inverse"* — Requires both spaces Banach; fails for incomplete spaces.
- *"The open mapping theorem says T maps every set to an open set"* — T maps open sets to open sets, not all sets.

**Learning Objective:** State the Open Mapping Theorem and Bounded Inverse Theorem; apply them to operator equations and inverse analysis.

---

## 9. Closed Graph Theorem {#closed-graph-theorem}

**Concept ID:** `math.fnal.closed-graph-theorem`  
**Prerequisites:** math.fnal.open-mapping-theorem  
**Difficulty:** advanced

The **Closed Graph Theorem** states that a linear operator T: X → Y between Banach spaces is bounded if and only if its graph G(T) = {(x, Tx) : x ∈ X} is closed in X × Y. It provides a practical criterion for boundedness when direct norm estimates are difficult.

**Key Ideas:**
- Graph closedness criterion: xₙ → x in X and Txₙ → y in Y implies Tx = y — this is what "closed graph" means.
- Equivalence to Open Mapping: CGT and OMT are equivalent (each implies the other) under Banach assumptions.
- Application strategy: to prove T is bounded, verify that the graph is closed — often easier than estimating ‖Tx‖/‖x‖ directly.

**Common Misconceptions:**
- *"Closed graph implies boundedness for operators between any normed spaces"* — Requires both X and Y to be Banach.
- *"Continuity is the same as closed graph"* — Continuity implies closed graph; the converse requires the Banach assumption.

**Learning Objective:** State the Closed Graph Theorem; verify graph closedness in concrete examples; apply CGT to conclude boundedness.

---

## 10. Uniform Boundedness Principle {#uniform-boundedness}

**Concept ID:** `math.fnal.uniform-boundedness`  
**Prerequisites:** math.fnal.bounded-operator, math.real.baire-category  
**Difficulty:** advanced

The **Uniform Boundedness Principle** (Banach-Steinhaus theorem) states that a family of bounded linear operators from a Banach space X to a normed space Y that is pointwise bounded is uniformly bounded: if sup_α ‖T_α x‖ < ∞ for each x ∈ X, then sup_α ‖T_α‖ < ∞.

**Key Ideas:**
- Pointwise → uniform: individual boundedness at every point forces a global norm bound; the Baire category theorem provides the engine.
- Resonance theorem (contrapositive): if sup_α ‖T_α‖ = ∞, there exists x with sup_α ‖T_α x‖ = ∞.
- Application to convergent sequences: if T_n x → Tx for all x ∈ Banach X, then T is bounded and ‖T‖ ≤ lim inf ‖Tₙ‖.

**Common Misconceptions:**
- *"UBP holds for operators from any normed space"* — Domain X must be Banach (complete); the Baire argument breaks otherwise.
- *"Boundedness at one point implies uniform boundedness"* — The UBP requires pointwise boundedness at every point, not just one.

**Learning Objective:** State the Uniform Boundedness Principle; apply it to conclude uniform bounds from pointwise bounds; use the resonance theorem to prove divergence results.

---

## 11. Riesz Representation Theorem {#riesz-representation}

**Concept ID:** `math.fnal.riesz-representation`  
**Prerequisites:** math.fnal.hilbert-space  
**Difficulty:** advanced

The **Riesz Representation Theorem** for Hilbert spaces states that every bounded linear functional φ on a Hilbert space H is uniquely represented as φ(x) = ⟨x, y⟩ for some y ∈ H, with ‖φ‖ = ‖y‖. This identifies H* ≅ H isometrically, making Hilbert spaces self-dual.

**Key Ideas:**
- Self-duality: the map y ↦ ⟨·, y⟩ is a conjugate-linear isometric isomorphism H → H*; every functional is an inner product with a unique vector.
- Proof via orthogonal complement: ker(φ) is closed; take z ∉ ker(φ) and project to ker(φ)⊥ to find the representing vector y.
- Norm equality: ‖φ‖ = ‖y‖ confirmed by Cauchy-Schwarz (upper bound) and evaluation at y/‖y‖ (attainment).

**Common Misconceptions:**
- *"Riesz Representation holds for all Banach spaces"* — False; (L^p)* ≅ L^q, not L^p itself, for p ≠ 2.
- *"The representing vector y is the gradient of φ"* — Only when the inner product is the standard dot product in ℝⁿ.

**Learning Objective:** State and prove the Riesz Representation Theorem; compute representing vectors in L²; use the theorem to identify Hilbert space duals.

---

## 12. Spectral Theory {#spectral-theory}

**Concept ID:** `math.fnal.spectral-theory`  
**Prerequisites:** math.fnal.bounded-operator, math.fnal.hilbert-space  
**Difficulty:** advanced

The **spectrum** σ(T) of a bounded linear operator T on a Banach space is the set of λ ∈ ℂ for which T − λI is not invertible. It generalizes eigenvalues to infinite dimensions and decomposes into point spectrum σ_p(T) (eigenvalues), continuous spectrum σ_c(T), and residual spectrum σ_r(T). The spectral radius r(T) = lim_n ‖T^n‖^{1/n} = sup{|λ| : λ ∈ σ(T)}.

**Key Ideas:**
- σ(T) is always nonempty and compact (for T on a complex Banach space), contained in the disk of radius ‖T‖.
- Spectral radius formula: r(T) = lim_n ‖T^n‖^{1/n}; for normal operators on Hilbert spaces, r(T) = ‖T‖.
- Self-adjoint operators: if T = T* on a Hilbert space, then σ(T) ⊂ ℝ and is contained in [m, M] where m = inf_{‖x‖=1}⟨Tx,x⟩.

**Common Misconceptions:**
- *"The spectrum is always the set of eigenvalues"* — In infinite dimensions, σ(T) strictly contains σ_p(T) in general.
- *"The spectrum can be empty"* — For bounded operators on complex Banach spaces, σ(T) ≠ ∅ (Liouville's theorem applied to the resolvent).

**Learning Objective:** Define the spectrum and its three parts; compute spectra of shift and diagonal operators; state and apply the spectral radius formula.

---

## 13. Compact Operators and Their Spectra {#compact-operator-spectrum}

**Concept ID:** `math.fnal.compact-operator-spectrum`  
**Prerequisites:** math.fnal.spectral-theory  
**Difficulty:** advanced

A bounded linear operator T is **compact** if it maps bounded sets to precompact sets. The spectrum of a compact operator on an infinite-dimensional Banach space has 0 as its only possible accumulation point; all nonzero spectral values are eigenvalues of finite multiplicity. The Fredholm alternative holds for compact operators.

**Key Ideas:**
- Compactness criterion: T is compact iff every bounded sequence has a subsequence whose image converges; equivalently, T is the limit in operator norm of finite-rank operators.
- Fredholm alternative: for λ ≠ 0, exactly one holds: (i) T − λI invertible, or (ii) λ is an eigenvalue of finite multiplicity.
- Spectral theorem for compact self-adjoint operators: eigenvectors form a complete ONS and eigenvalues accumulate only at 0.

**Common Misconceptions:**
- *"All bounded operators are compact"* — False; the identity on any infinite-dimensional space is bounded but not compact.
- *"Compact operators always have eigenvalues"* — False; the Volterra operator has no eigenvalues (σ(T) = {0}).

**Learning Objective:** Define compact operators and verify compactness for Hilbert-Schmidt operators; state the Fredholm alternative; apply the spectral theorem for compact self-adjoint operators.

---

## 14. Fourier Transform on L² {#fourier-transform}

**Concept ID:** `math.fnal.fourier-transform`  
**Prerequisites:** math.fnal.hilbert-space, math.meas.l2-space  
**Difficulty:** advanced

The **Fourier transform** F(f)(ξ) = ∫ f(x)e^{−2πixξ} dx, defined initially on L¹ ∩ L², extends to a unitary operator on L²(ℝ) by the **Plancherel theorem**: ‖Ff‖_{L²} = ‖f‖_{L²} for all f ∈ L²(ℝ). Parseval's identity ⟨Ff, Fg⟩ = ⟨f, g⟩ holds, confirming that F is an isometry.

**Key Ideas:**
- Extension by density: the Fourier transform is defined on the dense subset L¹ ∩ L² of L², then extended by continuity (isometric extension principle).
- Plancherel theorem (unitarity): ‖Ff‖₂ = ‖f‖₂; F is a unitary operator on L²(ℝ) with F⁻¹f(x) = ∫ f̂(ξ)e^{2πixξ} dξ.
- Eigenfunction of F: the Gaussian e^{−πx²} is its own Fourier transform — F(e^{−πx²}) = e^{−πξ²}.

**Common Misconceptions:**
- *"The Fourier transform of every L² function is given by the integral formula directly"* — For f ∉ L¹, the integral may not converge; the L² transform is defined as an L² limit.
- *"The Fourier transform maps L²(ℝ) to L¹(ℝ)"* — F maps L²(ℝ) to L²(ℝ); the image need not be in L¹.

**Learning Objective:** State the Plancherel theorem; compute Fourier transforms of Gaussians and indicator functions; apply Parseval's identity to compute L² norms.

---

## 15. Distributions and Generalized Functions {#distributions}

**Concept ID:** `math.fnal.distributions`  
**Prerequisites:** math.fnal.dual-space-functional, math.calc.derivative-definition  
**Difficulty:** advanced

**Distributions** (generalized functions) are continuous linear functionals on the space D = C_c^∞(ℝ) of smooth, compactly-supported test functions. Every locally integrable function defines a distribution; the distributional derivative T'(φ) = −T(φ') makes every distribution infinitely differentiable and extends classical differentiation to discontinuous functions.

**Key Ideas:**
- Test function space: D carries a topology where φₙ → φ means all φₙ are supported in a fixed compact set and all derivatives converge uniformly.
- Distributional derivative: defined by (T')(φ) = −T(φ'); extends differentiation to all distributions, including the Heaviside function (H' = δ) and the delta distribution (δ' = evaluation of −φ'(0)).
- Delta distribution: δ(φ) = φ(0) is not a function but is the distributional limit of bump functions; its Fourier transform is 1.

**Common Misconceptions:**
- *"The Dirac delta is a function equal to ∞ at 0 and 0 elsewhere"* — δ is not a function; it is a distribution (a functional on D).
- *"The distributional derivative always equals the classical derivative"* — They agree when the classical derivative exists; distributional differentiation extends to non-differentiable functions.

**Learning Objective:** Define distributions and the distributional derivative; compute distributional derivatives of |x|, H(x), and δ; identify the delta distribution and its properties.

---

## 16. Special Functions and Orthogonal Systems {#special-functions}

**Concept ID:** `math.fnal.special-functions`  
**Prerequisites:** math.fnal.hilbert-space, math.de.bessel-equation  
**Difficulty:** advanced

**Special functions** (Legendre polynomials, Bessel functions, Hermite polynomials, Laguerre polynomials) arise as eigenfunctions of self-adjoint Sturm-Liouville operators. By the spectral theorem for compact self-adjoint operators, they form complete orthogonal systems in the corresponding L² space with weight, providing Hilbert-space bases for physics and engineering.

**Key Ideas:**
- Sturm-Liouville framework: (pu')' + qu = λwu defines a self-adjoint operator; eigenfunctions with distinct eigenvalues are w-orthogonal and form a complete system in L²([a,b], w dx).
- Legendre polynomials Pₙ: orthogonal basis of L²[−1,1] with ∫_{-1}^1 PₙPₘ dx = 2/(2n+1)δₙₘ.
- Hermite polynomials Hₙ: eigenfunctions of the quantum harmonic oscillator −d²/dx² + x²; orthogonal basis of L²(ℝ, e^{−x²} dx).

**Common Misconceptions:**
- *"Bessel functions are periodic"* — Bessel functions oscillate with decaying amplitude; they are not periodic and their zeros are not equally spaced.
- *"Special functions are orthonormal"* — They are orthogonal but not orthonormal; normalization requires dividing by ‖Pₙ‖ which varies with n.

**Learning Objective:** Identify Legendre, Bessel, and Hermite functions as eigenfunctions of Sturm-Liouville operators; compute Legendre series expansions; state the completeness of orthogonal systems.

---

## 17. Dense Subspaces {#dense-subspace}

**Concept ID:** `math.fnal.dense-subspace`  
**Prerequisites:** math.fnal.banach-space  
**Difficulty:** intermediate

A subspace M of a normed space X is **dense** if M̄ = X — every element of X can be approximated arbitrarily closely by elements of M. Dense subspaces are used to extend bounded operators from manageable domains to the whole space; they underlie the Fourier transform on L² and the construction of Sobolev spaces.

**Key Ideas:**
- Extension by density: if T: M → Y is bounded and M is dense in X with Y Banach, then T extends uniquely to T̄: X → Y with ‖T̄‖ = ‖T‖.
- Key dense pairs: polynomials dense in C[a,b] (Weierstrass); C_c^∞ dense in L^p(ℝ) (1 ≤ p < ∞); finitely-supported sequences dense in ℓ^p (p < ∞).
- Separability: X is separable iff it has a countable dense subset; L^p[a,b] (p < ∞) is separable, L^∞ is not.

**Common Misconceptions:**
- *"A dense subspace of a Banach space is itself Banach"* — A dense proper subspace is never complete (it is not closed).
- *"Dense in X means M = X"* — Dense means M̄ = X, not M = X; M can be a proper subset.

**Learning Objective:** Define dense subspaces and verify density using standard dense pairs; apply the extension-by-density principle; relate density to separability.

---

## 18. Convolution {#convolution}

**Concept ID:** `math.fnal.convolution`  
**Prerequisites:** math.meas.lebesgue-integral  
**Difficulty:** intermediate

The **convolution** (f ∗ g)(x) = ∫ f(x−t)g(t) dt defines a commutative, associative product on L¹(ℝ), making it a commutative Banach algebra. Young's inequality bounds ‖f∗g‖_r ≤ ‖f‖_p ‖g‖_q for 1/r = 1/p + 1/q − 1. The Fourier transform converts convolution to pointwise multiplication: F(f∗g) = F(f)·F(g).

**Key Ideas:**
- Young's convolution inequality: if 1/p + 1/q = 1 + 1/r, then ‖f∗g‖_r ≤ ‖f‖_p‖g‖_q — establishes L^p stability of convolution.
- Convolution theorem: F(f∗g) = F(f)·F(g); convolution in the time domain corresponds to multiplication in the frequency domain.
- L¹(ℝ) as Banach algebra: with convolution as multiplication, (L¹, +, ∗, ‖·‖₁) is a commutative Banach algebra without unit (δ ∉ L¹).

**Common Misconceptions:**
- *"Convolution is pointwise multiplication"* — (f∗g)(x) = ∫f(x−t)g(t)dt is a "flip and slide" integral, not (fg)(x) = f(x)g(x).
- *"Convolution of two L² functions is in L²"* — By Young's inequality (p=q=2, r=∞), f∗g ∈ L^∞, not necessarily L².

**Learning Objective:** Define convolution and prove Young's inequality for the case p=q=r=1; apply the convolution theorem; identify L¹(ℝ) as a Banach algebra.

---

*End of chapter — math.fnal (Functional Analysis), 18 concepts.*

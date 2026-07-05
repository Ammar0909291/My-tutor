# Linear Algebra

*My Tutor — Mathematics Knowledge Graph domain `math.linalg`*

Level range: 3–7 · Concepts in this chapter: 61

This chapter is generated from the canonical Knowledge Graph (`graph.json`, frozen, read-only) plus authored teaching content validated against the existing `TeachingAssetSchema`. It is intended for students, teachers, and as a canonical AI teaching source.

## Concepts in this chapter

- [Vector](#vector)
- [Vector Addition](#vector-addition)
- [Scalar Multiplication](#scalar-multiplication)
- [Dot Product](#dot-product)
- [Vector Norm](#vector-norm)
- [Unit Vector](#unit-vector)
- [Orthogonality](#orthogonality)
- [Cross Product](#cross-product)
- [Matrix](#matrix)
- [Matrix Addition](#matrix-addition)
- [Matrix Multiplication](#matrix-multiplication)
- [Matrix Transpose](#matrix-transpose)
- [Symmetric Matrix](#symmetric-matrix)
- [System of Linear Equations](#system-of-linear-equations)
- [Augmented Matrix](#augmented-matrix)
- [Row Reduction](#row-reduction)
- [Row Echelon Form](#row-echelon-form)
- [Rank](#rank)
- [Matrix Inverse](#matrix-inverse)
- [Determinant](#determinant)
- [Cofactor Expansion](#cofactor-expansion)
- [Properties of Determinants](#properties-of-determinants)
- [Cramer's Rule](#cramer-s-rule)
- [LU Factorization](#lu-factorization)
- [Vector Space](#vector-space)
- [Subspace](#subspace)
- [Span](#span)
- [Linear Independence](#linear-independence)
- [Basis](#basis)
- [Dimension](#dimension)
- [Coordinates](#coordinates)
- [Change of Basis](#change-of-basis)
- [Null Space](#null-space)
- [Column Space](#column-space)
- [Rank-Nullity Theorem](#rank-nullity-theorem)
- [Linear Map](#linear-map)
- [Kernel and Image of Linear Map](#kernel-and-image-of-linear-map)
- [Matrix Representation of Linear Map](#matrix-representation-of-linear-map)
- [Eigenvalues and Eigenvectors](#eigenvalues-and-eigenvectors)
- [Characteristic Polynomial](#characteristic-polynomial)
- [Eigenspace](#eigenspace)
- [Diagonalization](#diagonalization)
- [Matrix Exponential](#matrix-exponential)
- [Jordan Normal Form](#jordan-normal-form)
- [Spectral Theorem](#spectral-theorem)
- [Positive Definite Matrix](#positive-definite-matrix)
- [Cholesky Decomposition](#cholesky-decomposition)
- [Inner Product](#inner-product)
- [Inner Product Space](#inner-product-space)
- [Orthogonal and Orthonormal Basis](#orthogonal-and-orthonormal-basis)
- [Gram-Schmidt Process](#gram-schmidt-process)
- [Orthogonal Projection](#orthogonal-projection)
- [Least Squares](#least-squares)
- [QR Factorization](#qr-factorization)
- [Singular Value Decomposition](#singular-value-decomposition)
- [Singular Values](#singular-values)
- [Moore-Penrose Pseudoinverse](#moore-penrose-pseudoinverse)
- [Tensor](#tensor)
- [Dual Space](#dual-space)
- [Distance in Vector Spaces](#distance-in-vector-spaces)
- [Angle Between Vectors](#angle-between-vectors)

---

### Vector

*Concept ID: `math.linalg.vector` · Difficulty: developing · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Define a vector in ℝⁿ as an ordered n-tuple, represent vectors geometrically as arrows and algebraically as column matrices, and perform basic identification of vector components in 2D and 3D.

An ordered tuple of numbers (a vector in ℝⁿ) or an abstract element of a vector space. In ℝⁿ, vectors represent magnitudes with direction; algebraically they are the fundamental objects of linear algebra.

A vector in ℝⁿ is an ordered tuple (x₁, x₂, …, xₙ) of real numbers. Geometrically, it represents a quantity with both magnitude and direction — an arrow from the origin to the point (x₁,…,xₙ). Algebraically, vectors are the fundamental objects of linear algebra: they can be added component-wise and scaled by real numbers. Column-vector notation is standard in linear algebra; row-vector notation transposes the column.

**Key ideas**

- Two representations: geometric (arrow with magnitude and direction, invariant under translation) and algebraic (column matrix of components). Both represent the same object — the geometric view aids intuition, the algebraic view enables computation.
- Components and notation: v = (v₁, v₂, …, vₙ) ∈ ℝⁿ; in column form v = [v₁; v₂; …; vₙ]. The n-tuple records displacement along each coordinate axis. In ℝ² and ℝ³ these match the x, y, z coordinates.
- Standard basis: the unit vectors e₁=(1,0,…,0), e₂=(0,1,0,…,0), …, eₙ=(0,…,0,1) are the canonical building blocks; every vector v = v₁e₁+v₂e₂+…+vₙeₙ is a unique linear combination.
- Equality: two vectors are equal iff every corresponding component is equal — the dimensions must match and vᵢ=wᵢ for all i. Two arrows represent the same vector iff they have the same length and direction regardless of tail placement (free vectors).
- Zero vector: 0 = (0,0,…,0) is the unique additive identity; it has no direction (or every direction) and zero magnitude.

**Vocabulary**

- **Vector** — An ordered n-tuple of real numbers (x₁,…,xₙ)∈ℝⁿ; geometrically, an arrow with magnitude and direction.
- **Component** — Each scalar entry vᵢ of a vector v=(v₁,…,vₙ); describes displacement along the i-th coordinate axis.
- **Standard basis vector eᵢ** — The vector with 1 in position i and 0 elsewhere; the i-th canonical basis vector of ℝⁿ.
- **Zero vector 0** — The vector (0,0,…,0); the additive identity in ℝⁿ.

**Common misconceptions**

- *Misconception:* A point and a vector in ℝⁿ are the same object.
  *Correction:* A point specifies a location; a vector specifies a displacement. The point P=(3,4) is fixed in the plane; the vector v=(3,4) can be placed anywhere (its tail is movable). In practice both are n-tuples, but the conceptual distinction matters for transformations: points transform via affine maps, vectors via linear maps.
- *Misconception:* A vector in ℝ³ must have three nonzero components.
  *Correction:* Vectors may have zero components — e.g. (0,0,5) is a perfectly valid vector pointing purely in the z-direction. The zero vector (0,0,0) is also a vector (the additive identity).
- *Misconception:* Row vectors and column vectors are the same.
  *Correction:* Algebraically they carry the same information but behave differently in matrix multiplication. A column vector v is an n×1 matrix; a row vector vᵀ is 1×n. Multiplying a matrix A (m×n) on the right requires a column vector (n×1): Av; multiplying on the left requires a row vector (1×m): vᵀA.

**Common mistakes in practice**

- Writing (2,3) and (3,2) as the same vector — components are ordered; order matters.
- Forgetting that ℝ² and ℝ³ vectors live in different spaces — (1,2) ≠ (1,2,0) formally, though the third component is often implied to be zero in context.
- Treating the zero vector as 'nothing' — it is a genuine vector with well-defined algebraic properties.

**Visual teaching opportunities**

- Draw arrows in ℝ² from different tails to the same displacement (e.g., (2,1) from origin and from (1,3)) to show that free vectors are equal regardless of starting point.
- Decomposition diagram: show v=(3,4) in ℝ² as 3e₁+4e₂ with horizontal and vertical component arrows labeled.
- 3D coordinate frame: draw ℝ³ axes and plot v=(2,−1,3) by stacking displacements along x, y, z.

**Worked example**

*Setup:* Given v=(2,−3,1) and w=(0,4,−2) in ℝ³, (a) write v as a linear combination of standard basis vectors, (b) identify w₂, (c) determine whether v=w.

1. Step 1: Linear combination. v=2e₁+(−3)e₂+1·e₃=2(1,0,0)−3(0,1,0)+(0,0,1)=(2,0,0)+(0,−3,0)+(0,0,1)=(2,−3,1) ✓. Why: every ℝ³ vector is uniquely expressible in the standard basis by reading off its components.
2. Step 2: Identify w₂. The second component of w=(0,4,−2) is w₂=4. Why: the subscript index selects the component matching that coordinate position.
3. Step 3: Compare v and w. v=(2,−3,1), w=(0,4,−2). First components: 2≠0. Conclusion: v≠w. Why: vector equality requires every component to match; the very first one fails, so the vectors are different regardless of the other components.

*Outcome:* v=2e₁−3e₂+e₃; w₂=4; v≠w since 2≠0 in the first component.

**Real-world intuition**

- Physics: force, velocity, and acceleration are vectors — wind velocity (15 km/h northeast) is the 2D vector (15cos45°, 15sin45°) ≈ (10.6, 10.6) km/h.
- Computer graphics: a pixel's colour in RGB is a vector (r,g,b)∈[0,1]³; a 3D point cloud is a collection of ℝ³ vectors representing geometry.
- Machine learning: a data record with n numerical features is a vector in ℝⁿ; the entire dataset is a collection of vectors in a high-dimensional space.

**Practice progression**

Item types: Write a given 2D/3D vector as a linear combination of standard basis vectors, Identify specific components from index notation, Determine whether two vectors are equal, Draw a given 2D vector as an arrow from the origin, Express the zero vector in ℝⁿ for various n. Suggested item count: 6.

Start with identifying components; progress to linear combination writing; culminate in comparing abstract ℝ⁴ vectors with symbolic entries.

**Assessment objectives**

Formats: Multiple-choice: which vectors are equal to (1,−2,0)?, Short answer: write e₂ as a column vector in ℝ⁴, True/false with justification: (2,3) in ℝ² and (2,3,0) in ℝ³ are the same vector. Bloom alignment: understand.

Mastery signal: Student correctly identifies components, writes a vector as a basis linear combination, and distinguishes equal from unequal vectors.

**Teacher notes**

Spend time on the conceptual split between points (location) and vectors (displacement) — students frequently confuse them when vectors are introduced via coordinates. The standard basis decomposition v=Σvᵢeᵢ is worth proving explicitly: it shows that components are the unique coefficients in a basis expansion, foreshadowing the entire theory of coordinates and change-of-basis.

**Student notes**

A vector is not a point — it's a direction and a size. Two arrows that point the same way and have the same length represent the same vector, even if they start at different places. To check if two vectors are equal, compare every component one by one.

**Prerequisite graph**

- Requires: math.found.real-numbers, math.geom.x-y-coordinates
- Unlocks (future prerequisite links): math.linalg.vector-space, math.linalg.dot-product
- Cross-topic connections (graph cross-links): math.geom.vectors-2d, math.geom.vectors-3d
- Narrative: Vectors are the atoms of linear algebra; every subsequent concept (vector spaces, matrices, linear maps, eigenvalues) is built on them. The dot product measures the relationship between two vectors. In geometry (math.geom.vectors-2d), vectors encode displacement; in physics, they encode forces and velocities. Abstract vector spaces (math.linalg.vector-space) generalise ℝⁿ vectors to functions and polynomials.

**Teaching hints — review triggers**

- Confusion between components and coordinates → review math.geom.x-y-coordinates for 2D coordinate geometry.
- Trouble interpreting subscript notation vᵢ → review math.found.mathematical-notation.
- Unfamiliar with real numbers as entries → review math.found.real-numbers.

**Spaced repetition / revision guidance**

Given v=(−1,2,5), write it as a combination of e₁,e₂,e₃. Then give one example of a vector in ℝ⁴. Finally state in one sentence why (1,2) and (2,1) are different. This rehearses all three core ideas.

---

### Vector Addition

*Concept ID: `math.linalg.vector-addition` · Difficulty: developing · Bloom level: apply · Mastery threshold: 0.95 · Estimated study time: 2h*

**Learning objective.** Compute vector addition in ℝⁿ component-wise, represent it geometrically using the parallelogram law or tip-to-tail rule, and verify the four axioms that make it a group operation.

Component-wise addition: (a₁,…,aₙ)+(b₁,…,bₙ)=(a₁+b₁,…,aₙ+bₙ). Geometrically, the parallelogram law. Satisfies commutativity, associativity, identity (zero vector), and inverse (negation).

Vector addition is defined component-wise: (a₁,…,aₙ)+(b₁,…,bₙ)=(a₁+b₁,…,aₙ+bₙ). Geometrically, placing the tail of b at the tip of a (tip-to-tail) gives a+b; equivalently, a+b is the diagonal of the parallelogram spanned by a and b. Addition is commutative (a+b=b+a), associative, has the zero vector as identity, and every vector has an additive inverse (−v).

**Key ideas**

- Component-wise rule: add corresponding components; dimensions must match. (a₁,a₂,a₃)+(b₁,b₂,b₃)=(a₁+b₁, a₂+b₂, a₃+b₃). Never mix components from different positions.
- Parallelogram law (geometry): place a and b at the same tail; the sum a+b is the diagonal of the parallelogram. Alternatively, tip-to-tail: place the tail of b at the tip of a; the resultant goes from the original tail to the new tip.
- Commutativity: a+b=b+a (both diagonals are the same vector). This corresponds to the fact that real-number addition aᵢ+bᵢ=bᵢ+aᵢ is commutative component-wise.
- Subtraction as additive inverse: a−b = a+(−b) where −b=(−b₁,…,−bₙ) reverses the direction of b. Geometrically, −b is the arrow of same length pointing opposite to b.
- Group structure: (ℝⁿ,+) is an abelian group — closure, associativity, identity (0), inverses (−v), and commutativity all hold — making it the simplest vector space over ℝ.

**Vocabulary**

- **Component-wise addition** — Adding corresponding entries: (a₁,…,aₙ)+(b₁,…,bₙ)=(a₁+b₁,…,aₙ+bₙ).
- **Parallelogram law** — The geometric rule that a+b is the diagonal of the parallelogram with sides a and b from a common tail.
- **Additive inverse −v** — The vector (−v₁,…,−vₙ) satisfying v+(−v)=0; geometrically, v reversed in direction.
- **Triangle inequality** — |a+b|≤|a|+|b|; equality holds iff a and b point in the same direction.

**Common misconceptions**

- *Misconception:* The magnitude of a+b equals |a|+|b| (magnitudes add like lengths).
  *Correction:* Only if a and b point in exactly the same direction does |a+b|=|a|+|b|. In general, |a+b|≤|a|+|b| (triangle inequality); if a and b are perpendicular, |a+b|=√(|a|²+|b|²) by the Pythagorean theorem. Magnitudes do not add; components add.
- *Misconception:* You can add vectors of different dimensions, e.g. (1,2)+(1,2,3).
  *Correction:* Addition is only defined between vectors in the same space ℝⁿ. (1,2)∈ℝ² and (1,2,3)∈ℝ³ cannot be added; the operation is undefined because the component positions do not match.
- *Misconception:* The parallelogram diagonal always bisects the angle between the two vectors.
  *Correction:* The diagonal bisects the angle only when |a|=|b|. In general, the diagonal a+b is closer to the longer of the two vectors.

**Common mistakes in practice**

- Adding magnitudes instead of components: |u+v|≠|u|+|v| in general.
- Adding vectors of different dimensions without checking they're in the same ℝⁿ.
- Confusing the tip-to-tail rule (sequential) with placing both vectors at the origin (parallelogram) — both give the same result, but mix-up causes sign errors.

**Visual teaching opportunities**

- Animate tip-to-tail in ℝ²: show a=(3,1), b=(1,2); place tail of b at tip of a; draw resultant (4,3). Then show parallelogram method — identical result.
- Subtraction diagram: draw a−b as a+(−b) where −b is the reverse arrow; show a−b as the vector from the tip of b to the tip of a.
- Triangle inequality illustration: draw three cases — a,b parallel (equality), a,b perpendicular (Pythagorean), a,b opposite (cancellation) — to show the range of |a+b|.

**Worked example**

*Setup:* Let u=(2,−1,3) and v=(−1,4,2). Compute (a) u+v, (b) u−v, (c) 2u+3v, (d) verify |u+v|² using components.

1. Step 1: u+v=(2+(−1), −1+4, 3+2)=(1,3,5). Why: component-wise addition, each pair independently.
2. Step 2: u−v=(2−(−1), −1−4, 3−2)=(3,−5,1). Why: subtraction is adding the negative: u+(−v)=(2,−1,3)+(1,−4,−2)=(3,−5,1).
3. Step 3: 2u+3v=2(2,−1,3)+3(−1,4,2)=(4,−2,6)+(−3,12,6)=(1,10,12). Why: scalar multiplication first (distributivity), then add component-wise.
4. Step 4: |u+v|²=1²+3²+5²=1+9+25=35. Also |u|²=4+1+9=14, |v|²=1+16+4=21, 2u·v=2(2(−1)+(−1)(4)+3·2)=2(−2−4+6)=2·0=0. So |u+v|²=|u|²+2u·v+|v|²=14+0+21=35 ✓. Why: the identity |a+b|²=|a|²+2a·b+|b|² holds from expanding (a+b)·(a+b).

*Outcome:* u+v=(1,3,5); u−v=(3,−5,1); 2u+3v=(1,10,12); |u+v|²=35 verified from both component calculation and the identity |a+b|²=|a|²+2a·b+|b|² (with u⊥v here).

**Real-world intuition**

- Navigation: total displacement after two consecutive moves (3 km east then 4 km north) is the vector sum (3,0)+(0,4)=(3,4); total distance from start is 5 km.
- Force equilibrium: net force on an object is the vector sum of all applied forces; equilibrium means the sum equals the zero vector.
- Signal processing: superposition of two audio signals (waveforms represented as vectors) is their component-wise sum.

**Practice progression**

Item types: Compute sums and differences of given 3D vectors, Given a+b and a, find b, Draw tip-to-tail diagram for 2D vectors, Verify the parallelogram law: |a+b|²+|a−b|²=2|a|²+2|b|², Simplify linear combinations of vectors. Suggested item count: 6.

Start with direct sum computation; progress to finding unknown vectors from equations; culminate in the polarisation identity proof.

**Assessment objectives**

Formats: Compute a+b, a−b, and 3a−2b for given vectors, State the parallelogram law with a sketch, True/false: |a+b|=|a|+|b| always — justify with an example. Bloom alignment: apply.

Mastery signal: Student adds and subtracts correctly, handles linear combinations, and can state the triangle inequality.

**Teacher notes**

The parallelogram law is worth deriving algebraically: |a+b|²=Σ(aᵢ+bᵢ)²=|a|²+2a·b+|b|², and |a−b|²=|a|²−2a·b+|b|². Adding gives the parallelogram identity |a+b|²+|a−b|²=2|a|²+2|b|² — a beautiful result that will recur in inner-product spaces. Emphasise that commutativity of addition is trivial from real-number commutativity, not a separate axiom to memorise.

**Student notes**

Add vectors by lining up corresponding components and adding each pair. Never add a first component to a second component. Subtraction: flip the signs of the second vector, then add. The result is always a vector of the same dimension.

**Prerequisite graph**

- Requires: math.linalg.vector
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.abst.group-operation
- Narrative: Vector addition is the first of the two vector space axiom groups (the other is scalar multiplication). Together they define a vector space (math.linalg.vector-space). The parallelogram identity connects to the inner product (math.linalg.inner-product) via the polarisation identity. In group theory (math.abst.group-operation), (ℝⁿ,+) is the archetypal abelian group.

**Teaching hints — review triggers**

- Trouble with component-wise addition → review math.linalg.vector (component identification).
- Confusion about dimension mismatch → revisit that vectors must share the same space ℝⁿ.
- Cannot visualise parallelogram law → review math.geom.vectors-2d.

**Spaced repetition / revision guidance**

Compute (1,−2,3)+(−1,5,−3) in your head (answer: (0,3,0)). Then compute |(1,−2,3)+(−1,5,−3)|=|(0,3,0)|=3. Finally state the triangle inequality and give one example where strict inequality holds.

---

### Scalar Multiplication

*Concept ID: `math.linalg.scalar-multiplication` · Difficulty: developing · Bloom level: apply · Mastery threshold: 0.95 · Estimated study time: 1h*

**Learning objective.** Multiply a vector by a scalar to stretch, compress, or reverse it; compute scalar multiples component-wise; and apply the eight distributive and associative axioms connecting scalar multiplication to vector addition.

Multiplying a vector by a scalar c: c(a₁,…,aₙ)=(ca₁,…,caₙ). Stretches or compresses the vector; negation reverses direction. Together with addition gives the vector space structure.

Scalar multiplication c·v=(cv₁,cv₂,…,cvₙ) scales each component of v by the real number c. Geometrically: |c|>1 stretches v, 0<|c|<1 compresses it, c<0 reverses its direction. Together with vector addition, scalar multiplication gives ℝⁿ its vector space structure, satisfying eight axioms including distributivity over both vector and scalar addition.

**Key ideas**

- Component-wise scaling: c·(v₁,…,vₙ)=(cv₁,…,cvₙ). The direction stays the same for c>0 and reverses for c<0; the magnitude becomes |c|·|v|.
- Special cases: 0·v=0 (zero scalar gives the zero vector), 1·v=v (identity), (−1)·v=−v (additive inverse), c·0=0 (any scalar times the zero vector is zero).
- Distributivity over vector addition: c(u+v)=cu+cv — scaling a sum equals the sum of the scaled vectors. Distributivity over scalar addition: (c+d)v=cv+dv — summing scalars before or after scaling gives the same result.
- Associativity of scalar multiplication: (cd)v=c(dv) — scaling by c then d is the same as scaling by cd. This is not associativity with vector addition (which doesn't apply here).
- Span via scalar multiples: all scalar multiples of a nonzero vector v form the line through the origin in the direction of v, called span{v}. This is the simplest possible subspace (dimension 1).

**Vocabulary**

- **Scalar** — A real number c∈ℝ used to scale a vector; contrasted with a vector by having no direction.
- **Scalar multiple** — The vector c·v=(cv₁,…,cvₙ); the result of scaling v by c.
- **Span of v** — The set {cv : c∈ℝ} of all scalar multiples of a nonzero v; geometrically the line through the origin in the direction of v.
- **Homogeneity** — |cv|=|c|·|v|; the norm satisfies this identity (uses absolute value of scalar).

**Common misconceptions**

- *Misconception:* Scalar multiplication changes the direction of a vector only if c=0.
  *Correction:* Any negative scalar c<0 reverses the direction. Only c>0 preserves direction; c=0 annihilates the vector entirely. c<0 produces a vector anti-parallel to the original.
- *Misconception:* c(u+v)=cu+v (scalar distributes only to the first addend).
  *Correction:* Scalar multiplication distributes fully: c(u+v)=cu+cv. This is one of the eight vector space axioms and must hold for all c,u,v.
- *Misconception:* |c·v|=c·|v| (the magnitude of a scaled vector is the scalar times the magnitude).
  *Correction:* |c·v|=|c|·|v|, using the absolute value of c. If c=−3, then |−3·v|=3·|v|, not −3·|v| (magnitudes are non-negative).

**Common mistakes in practice**

- Writing c·v = (cv₁, v₂, …, vₙ) — forgetting to multiply all components.
- Using |−3·v|=−3·|v| — magnitude cannot be negative; absolute value of the scalar is required.
- Confusing scalar multiplication with the dot product — scalar multiplication produces a vector; the dot product produces a scalar.

**Visual teaching opportunities**

- Arrow diagram: draw v=(1,2) in ℝ², then 2v=(2,4) (double length, same direction), −v=(−1,−2) (reversed), (1/2)v=(0.5,1) (halved) — four arrows from the origin.
- Number line of scalars: mark c=2 (stretch), c=1 (identity), c=1/2 (compress), c=0 (zero), c=−1 (reverse), c=−2 (reverse+stretch) as intuition for the full real line of scalar multiples.
- Span visualisation: all scalar multiples of (1,2) trace the line y=2x through the origin.

**Worked example**

*Setup:* Let v=(−2, 3, 1). Compute (a) 3v, (b) −(1/2)v, (c) verify (2+3)v=2v+3v.

1. Step 1: 3v=3(−2,3,1)=(−6,9,3). Why: multiply every component by 3; magnitude triples.
2. Step 2: −(1/2)v=−(1/2)(−2,3,1)=(1,−3/2,−1/2). Why: c=−1/2 < 0 reverses direction and halves magnitude; each component is multiplied by −1/2.
3. Step 3: LHS: (2+3)v=5v=5(−2,3,1)=(−10,15,5). RHS: 2v+3v=(−4,6,2)+(−6,9,3)=(−10,15,5). LHS=RHS ✓. Why: distributivity (c+d)v=cv+dv is one of the eight vector space axioms; both sides give (−10,15,5).

*Outcome:* 3v=(−6,9,3); −(1/2)v=(1,−3/2,−1/2); distributivity verified: 5v=(−10,15,5)=2v+3v.

**Real-world intuition**

- Physics: if a force vector F=(3,4) N is doubled (scalar c=2), the resulting force is 2F=(6,8) N — same direction, twice the magnitude.
- Computer graphics: scaling a 3D model by factor 0.5 applies scalar multiplication to every vertex vector, halving all distances while preserving shape.
- Economics: if a production vector v=(cars, phones)=(100,200) units is scaled by 3 for a peak season, output becomes (300,600) — proportional expansion.

**Practice progression**

Item types: Compute scalar multiples for given c and v, Verify (cd)v=c(dv) for specific numbers, Find c such that |c·v|=10 for a given v, Determine whether a given vector is a scalar multiple of another, Sketch all scalar multiples of a 2D vector (the span). Suggested item count: 6.

Start with direct computation; advance to finding unknown scalars; culminate in span identification.

**Assessment objectives**

Formats: Compute cv for several values of c, including negative and fractional, True/false with justification: 'If cv=dv for all v, then c=d', Identify which vectors are scalar multiples of u=(1,−2). Bloom alignment: apply.

Mastery signal: Student correctly computes scalar multiples, handles negative scalars, and applies all eight axioms correctly.

**Teacher notes**

The eight vector space axioms are best introduced via concrete examples with scalar multiplication and vector addition — proving each one from the definition reduces it to real-number arithmetic. The span{v} visualisation is a natural entry point to subspaces and linear independence before those concepts are formally defined.

**Student notes**

Multiply every component by the same scalar. If the scalar is negative, all signs flip — direction reverses. |c·v|=|c|·|v|, always using the absolute value of c to get a non-negative magnitude. Never add scalars and vectors directly.

**Prerequisite graph**

- Requires: math.linalg.vector
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Scalar multiplication and vector addition together define a vector space (math.linalg.vector-space). The span of a set of vectors is defined via scalar multiplication and addition combined (math.linalg.span). In abstract algebra (math.abst), a vector space is a module over a field — scalar multiplication is the field action.

**Teaching hints — review triggers**

- Confusion about sign of scalar → review negative numbers (math.arith.negative-numbers).
- Cannot apply the distributive law → review math.linalg.vector-addition and the axiom statement.
- Trouble finding |c·v| → review math.linalg.norm (depends on this concept).

**Spaced repetition / revision guidance**

Without notes: compute (−3)(2,−1,4). Then state the two distributivity axioms for scalar multiplication. Then explain in one sentence why |−3v|=3|v|, not −3|v|.

---

### Dot Product

*Concept ID: `math.linalg.dot-product` · Difficulty: developing · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Compute the dot product of two vectors using both the algebraic formula (sum of products) and the geometric formula (magnitudes × cosine of angle), determine orthogonality, and compute the angle between vectors.

a·b = ∑aᵢbᵢ = |a||b|cos θ. Algebraically: sum of products of corresponding components. Geometrically: |a||b|cos(angle). Zero iff vectors are orthogonal.

The dot product (scalar product) of a·b=a₁b₁+a₂b₂+…+aₙbₙ=|a||b|cosθ takes two vectors and returns a scalar. Algebraically, it is the sum of component-wise products. Geometrically, it equals the product of the magnitudes times the cosine of the angle between them. The dot product is zero iff the vectors are orthogonal (perpendicular). It is bilinear, symmetric, and positive-definite: a·a=|a|²≥0 with equality iff a=0.

**Key ideas**

- Algebraic formula: a·b=Σᵢaᵢbᵢ. Easy to compute from components; works in any dimension. Result is a scalar (real number), not a vector.
- Geometric formula: a·b=|a||b|cosθ where θ∈[0,π] is the angle between a and b. This connects algebra to geometry: positive dot product means θ<90° (acute), zero means θ=90° (orthogonal), negative means θ>90° (obtuse).
- Orthogonality test: a⊥b ⟺ a·b=0. This is the most efficient way to check perpendicularity in any dimension, bypassing angle computation entirely.
- Self-dot-product gives norm squared: a·a=|a|². Therefore |a|=√(a·a). This links the dot product to the Euclidean norm.
- Properties — linearity in each argument: (ca+b)·d=c(a·d)+(b·d); symmetry: a·b=b·a; non-negativity: a·a≥0 with equality iff a=0. These three properties define a general inner product.

**Vocabulary**

- **Dot product a·b** — The scalar Σaᵢbᵢ = |a||b|cosθ; measures the 'overlap' between two vectors.
- **Orthogonal vectors** — Two vectors with a·b=0; they meet at a right angle (90°).
- **Bilinearity** — Linearity in each argument: (ca+b)·d=c(a·d)+b·d and a·(cb+d)=c(a·b)+a·d.
- **Cauchy–Schwarz inequality** — |a·b|≤|a||b|; ensures |cosθ|≤1 so the angle formula is consistent.

**Common misconceptions**

- *Misconception:* The dot product a·b is a vector in the direction of a or b.
  *Correction:* The dot product is a scalar — a single real number. It has no direction. If you need a vector result from two vectors, that is the cross product (only in ℝ³) or a projection.
- *Misconception:* If a·b=0, then either a=0 or b=0.
  *Correction:* Zero dot product means orthogonality (a⊥b), not that either vector is zero. For example, a=(1,0) and b=(0,1) satisfy a·b=0 but neither is the zero vector.
- *Misconception:* The angle formula a·b=|a||b|cosθ always gives θ∈[0°,360°].
  *Correction:* The dot product formula gives the angle θ∈[0°,180°] (the non-reflex angle between the two vectors, since cosθ uniquely determines θ in this range). For signed or directed angles, additional information about orientation is needed.

**Common mistakes in practice**

- Forgetting to sum all products: writing a₁b₁ only instead of a₁b₁+a₂b₂+a₃b₃.
- Forgetting to take the norm in the denominator of the angle formula — computing arccos(a·b) instead of arccos(a·b/(|a||b|)).
- Expecting a·b to produce a vector — it always produces a scalar.

**Visual teaching opportunities**

- Plot a=(3,0) and b=(2,2) in ℝ²; compute dot product 6+0=6; compute |a||b|cosθ=3·2√2·cos(45°)=3·2√2·(1/√2)=6 ✓ — bridging the two formulas.
- Orthogonality diagram: draw several pairs of perpendicular vectors and verify a·b=0 for each.
- Sign interpretation: three arrows from origin — acute pair (positive dot product), right-angle pair (zero), obtuse pair (negative) — with the dot product value labeled.

**Worked example**

*Setup:* Let a=(1,2,−2) and b=(2,1,2). Compute (a) a·b, (b) |a| and |b|, (c) the angle θ between a and b.

1. Step 1: a·b=1·2+2·1+(−2)·2=2+2−4=0. Why: dot product is Σaᵢbᵢ; work component by component.
2. Step 2: |a|=√(1²+2²+(−2)²)=√(1+4+4)=√9=3. |b|=√(2²+1²+2²)=√(4+1+4)=√9=3. Why: norm is √(self-dot-product).
3. Step 3: cosθ=a·b/(|a||b|)=0/(3·3)=0 → θ=arccos(0)=90°. Why: zero dot product means the vectors are perpendicular. This confirms a⊥b.
4. Step 4: Verification of orthogonality: a·b=0 ✓, so a and b are orthogonal. Both have norm 3 — they are on a sphere of radius 3 and perpendicular to each other, a clean geometric picture.

*Outcome:* a·b=0; |a|=|b|=3; θ=90° — the two vectors are orthogonal, confirmed by both the algebraic dot product and the geometric formula.

**Real-world intuition**

- Work in physics: W=F·d=|F||d|cosθ — work done is the dot product of force and displacement vectors; only the component of force along the direction of motion does work.
- Machine learning: cosine similarity sim(a,b)=a·b/(|a||b|) measures the angular closeness of two document-embedding vectors — widely used in information retrieval.
- Computer graphics: N·L (normal · light-direction) gives the intensity of diffuse lighting on a surface — the Lambert shading model.

**Practice progression**

Item types: Compute dot product of given vectors in ℝ², ℝ³, ℝ⁴, Determine orthogonality for given pairs, Find angle between two vectors using arccos, Find a vector orthogonal to a given vector (construct one), Verify bilinearity: compute (2a+b)·c two ways, Use dot product to find a projection scalar a·b̂. Suggested item count: 6.

Start with direct computation; advance to angle calculation and orthogonality testing; culminate in constructing orthogonal vectors.

**Assessment objectives**

Formats: Compute a·b and interpret the sign, Find the angle between (1,1,0) and (0,1,1), True/false: if a·b>0 and b·c>0, then a·c>0 — give a counterexample if false. Bloom alignment: apply.

Mastery signal: Student correctly computes a·b from components, finds the angle via arccos(a·b/|a||b|), and uses a·b=0 as an orthogonality test.

**Teacher notes**

The two formulas (algebraic and geometric) for the dot product are equally important: the algebraic formula computes it; the geometric formula interprets it. The Cauchy–Schwarz inequality |a·b|≤|a||b| is worth stating as the reason cosθ = a·b/(|a||b|) is always in [−1,1]. The dot product is the Euclidean inner product — the concrete preview of the abstract inner product space (math.linalg.inner-product).

**Student notes**

Two steps: (1) multiply corresponding components and sum → get a number. (2) If the number is zero, the vectors are perpendicular. If you need the angle: θ=arccos(a·b/(|a||b|)) — always divide by both norms.

**Prerequisite graph**

- Requires: math.linalg.vector, math.arith.multiplication
- Unlocks (future prerequisite links): math.linalg.norm, math.linalg.angle-vectors, math.linalg.orthogonality
- Cross-topic connections (graph cross-links): math.geom.dot-product
- Narrative: The dot product defines the Euclidean norm (math.linalg.norm) via |v|=√(v·v). It tests orthogonality (math.linalg.orthogonality). It measures angles between vectors (math.linalg.angle-vectors). Abstracted, it becomes an inner product (math.linalg.inner-product) on any vector space. In matrix form: a·b=aᵀb (row times column product).

**Teaching hints — review triggers**

- Cannot compute the sum Σaᵢbᵢ → review component identification (math.linalg.vector).
- Trouble finding arccos → review inverse trigonometric functions (math.trig.inverse-trig).
- Confused about what a scalar is → review math.linalg.scalar-multiplication.

**Spaced repetition / revision guidance**

Compute (1,−1,2)·(2,3,0) step by step. Then state the angle interpretation (positive/negative/zero). Then write the Cauchy–Schwarz inequality.

---

### Vector Norm

*Concept ID: `math.linalg.norm` · Difficulty: developing · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 2h*

**Learning objective.** Compute the Euclidean norm |v|=√(Σvᵢ²) of a vector, interpret it as the length of the vector, verify the three norm axioms (positivity, homogeneity, triangle inequality), and distinguish the Euclidean norm from p-norms.

|v| = √(v·v) = √(∑vᵢ²). More generally, the p-norm: |v|_p = (∑|vᵢ|^p)^{1/p}. Satisfies positivity, homogeneity, and triangle inequality (defines a metric).

The Euclidean norm of v∈ℝⁿ is |v|=√(v·v)=√(v₁²+v₂²+…+vₙ²). It measures the length of the vector as a straight-line distance from the origin. More generally, a norm is any function satisfying positivity (|v|≥0, =0 iff v=0), homogeneity (|cv|=|c|·|v|), and the triangle inequality (|u+v|≤|u|+|v|). The p-norms |v|_p=(Σ|vᵢ|^p)^{1/p} give different notions of length; p=2 is the Euclidean norm, p=1 the taxicab norm, p=∞ the max norm.

**Key ideas**

- Euclidean norm formula: |v|=√(v₁²+…+vₙ²). In ℝ² this is the Pythagorean theorem; in ℝⁿ it extends the same formula to n dimensions.
- Three norm axioms: (1) |v|≥0 and |v|=0 iff v=0; (2) |cv|=|c|·|v| (homogeneity, using |c| absolute value); (3) |u+v|≤|u|+|v| (triangle inequality). These three axioms define any valid notion of vector length.
- Link to dot product: |v|²=v·v=Σvᵢ². The Euclidean norm is induced by the standard inner product; this connection makes it the most natural norm in ℝⁿ.
- p-norms: |v|₁=Σ|vᵢ| (ℓ¹/taxicab), |v|₂=√Σvᵢ² (Euclidean/ℓ²), |v|∞=max|vᵢ| (ℓ∞/max norm). All are valid norms. |v|∞≤|v|₂≤|v|₁≤√n·|v|₂ relate them.
- Normalisation: dividing by |v| gives the unit vector v̂=v/|v| of norm 1. This is the direction of v without its magnitude.

**Vocabulary**

- **Norm ‖v‖ (or |v|)** — A function on a vector space satisfying positivity, homogeneity, and triangle inequality; measures 'length.'
- **Euclidean norm ‖v‖₂** — √(Σvᵢ²); the standard length in ℝⁿ induced by the dot product.
- **ℓ¹ norm ‖v‖₁** — Σ|vᵢ|; the taxicab/Manhattan distance; the sum of absolute values of components.
- **ℓ∞ norm ‖v‖∞** — max|vᵢ|; the maximum absolute component; the 'Chebyshev' norm.
- **Triangle inequality** — ‖u+v‖≤‖u‖+‖v‖; fundamental property of any norm; equality iff vectors are non-negative multiples of each other.

**Common misconceptions**

- *Misconception:* |u+v|=|u|+|v| for all vectors u,v.
  *Correction:* This equality holds only when u and v point in the same direction (u=cv for some c>0). In general, |u+v|≤|u|+|v| (triangle inequality), with equality iff the vectors are non-negative multiples of each other.
- *Misconception:* The p-norm with p=3 is not a valid norm because it is unusual.
  *Correction:* Any p≥1 defines a valid norm on ℝⁿ satisfying all three axioms. p=1,2,∞ are most commonly used in applications, but p=3 or any p≥1 is perfectly valid mathematically.
- *Misconception:* |cv|=c·|v| (scalar factor c without absolute value).
  *Correction:* |cv|=|c|·|v|, where |c| is the absolute value of c. If c=−3, then |−3v|=3|v|, not −3|v|, because norm is always non-negative.

**Common mistakes in practice**

- Summing components before squaring: (v₁+v₂+v₃)² ≠ v₁²+v₂²+v₃².
- Forgetting |c| in |cv|=|c|·|v| when c is negative.
- Confusing the norm |v| (a positive number) with a vector.

**Visual teaching opportunities**

- Unit circles for different norms: draw |v|₁=1 (diamond), |v|₂=1 (circle), |v|∞=1 (square) in ℝ² — the three familiar unit balls.
- Pythagorean extension: in ℝ³, show |v|=√(x²+y²+z²) by applying Pythagoras twice: first in the xy-plane (√(x²+y²)), then along z.
- Triangle inequality picture: draw u, v, u+v as a triangle; the straight side (|u+v|) is shorter than or equal to the sum of the other two (|u|+|v|).

**Worked example**

*Setup:* Let v=(3,−4,0) and w=(1,1,1). Compute (a) |v|, (b) |w|, (c) |v|₁ and |v|∞, (d) verify the triangle inequality for u=(1,0,0) and v.

1. Step 1: |v|=√(3²+(−4)²+0²)=√(9+16+0)=√25=5. Why: Pythagorean formula in ℝ³.
2. Step 2: |w|=√(1+1+1)=√3≈1.732. Why: all components equal 1.
3. Step 3: |v|₁=|3|+|−4|+|0|=3+4+0=7. |v|∞=max(|3|,|4|,|0|)=4. Why: ℓ¹ sums absolute values; ℓ∞ takes the maximum.
4. Step 4: u+v=(4,−4,0); |u+v|=√(16+16+0)=√32=4√2≈5.657. |u|=1, |v|=5; |u|+|v|=6. 4√2≈5.657<6 ✓ (triangle inequality holds, strict since u and v are not parallel).

*Outcome:* |v|=5; |w|=√3; |v|₁=7, |v|∞=4; triangle inequality: |u+v|=4√2<6=|u|+|v| ✓.

**Real-world intuition**

- Distance measurement: |u−v| is the Euclidean distance between points u and v; this is the straight-line distance formula from coordinate geometry.
- Machine learning regularisation: ℓ²-regularisation (ridge) adds λ|w|₂² to the loss; ℓ¹-regularisation (LASSO) adds λ|w|₁ and promotes sparsity — two norms with very different geometric effects.
- Signal processing: the ℓ² norm of an error vector is the root-mean-square error; minimising it gives least-squares solutions.

**Practice progression**

Item types: Compute Euclidean norms for vectors in ℝ², ℝ³, ℝ⁴, Compute ℓ¹ and ℓ∞ norms for the same vector and compare, Verify the triangle inequality for given u,v, Find all vectors of norm 1 in ℝ² (unit circle parameterisation), Normalise a given vector (compute v̂=v/|v|). Suggested item count: 6.

Start with direct norm computation; advance to p-norm comparison; culminate in proving the triangle inequality from the Cauchy–Schwarz inequality.

**Assessment objectives**

Formats: Compute |v|, |v|₁, |v|∞ for a given v, State the three norm axioms and verify each for the Euclidean norm, Find a vector u with |u|=5 in the direction (3,4). Bloom alignment: apply.

Mastery signal: Student computes the Euclidean norm correctly, interprets it as length, and applies all three norm axioms.

**Teacher notes**

The three norm axioms are worth memorising as a checklist: whenever a new function is proposed as a 'distance' or 'length', verify all three axioms. The ℓ¹ vs. ℓ² vs. ℓ∞ unit ball drawings in ℝ² are extremely memorable and immediately convey how different norms impose different geometries on the space.

**Student notes**

Euclidean norm: square each component, sum, take square root. Always positive (or zero for the zero vector). Absolute value of scalar goes outside: |−3v|=3|v|. The triangle inequality says the norm of a sum never exceeds the sum of norms — like a triangle where one side is never longer than the other two combined.

**Prerequisite graph**

- Requires: math.linalg.dot-product
- Unlocks (future prerequisite links): math.linalg.unit-vector, math.linalg.distance
- Cross-topic connections (graph cross-links): math.real.metric-space
- Narrative: The norm induces the distance function d(u,v)=|u−v|, making ℝⁿ a metric space (math.real.metric-space). The Cauchy–Schwarz inequality |a·b|≤|a|·|b| is the key to proving the triangle inequality for the Euclidean norm. Norms abstract to Banach spaces (math.fnal.normed-space) in functional analysis. In machine learning, regularisation uses the ℓ¹ and ℓ² norms to control model complexity.

**Teaching hints — review triggers**

- Trouble computing √(Σvᵢ²) → review square roots and the Pythagorean theorem (math.geom.pythagorean-theorem).
- Cannot verify the triangle inequality → review math.linalg.dot-product and the Cauchy–Schwarz inequality.
- Confused about p-norms → revisit after understanding the Euclidean case first.

**Spaced repetition / revision guidance**

Compute the Euclidean, ℓ¹, and ℓ∞ norms of v=(−3,4,0) from memory (answers: 5, 7, 4). Then state the triangle inequality and verify it for u=(1,0,0) and v.

---

### Unit Vector

*Concept ID: `math.linalg.unit-vector` · Difficulty: developing · Bloom level: apply · Mastery threshold: 0.95 · Estimated study time: 1h*

**Learning objective.** Normalise any nonzero vector to unit length by dividing by its Euclidean norm, verify the result has norm 1, and identify the standard basis vectors as the canonical unit vectors in ℝⁿ.

A vector of norm 1. Obtained by normalizing: v̂ = v/|v|. Standard basis vectors e₁,…,eₙ are the canonical unit vectors in ℝⁿ.

A unit vector is a vector of Euclidean norm exactly 1. Given any nonzero vector v, the unit vector in the same direction is v̂=v/|v|. This process is called normalisation. Unit vectors represent pure direction without magnitude. The standard basis vectors e₁=(1,0,…,0), e₂=(0,1,0,…,0), …, eₙ=(0,…,0,1) are the canonical unit vectors in ℝⁿ and are mutually orthogonal.

**Key ideas**

- Normalisation formula: v̂=v/|v|=(v₁/|v|, v₂/|v|, …, vₙ/|v|). Divides every component by the norm; the result is the direction of v scaled to length 1.
- Verification: |v̂|=|v/|v||=|v|/|v|=1 ✓ — the homogeneity axiom of the norm guarantees this.
- Standard basis vectors: eᵢ has 1 in position i and 0 everywhere else. |eᵢ|=1 ✓; eᵢ·eⱼ=δᵢⱼ (Kronecker delta: 1 if i=j, 0 otherwise) — they are orthonormal (orthogonal and unit length).
- Unit vectors are not unique for a given direction unless you specify 'pointing the same way as v'. For every direction there are exactly two unit vectors: v̂ and −v̂.
- Use in decomposition: any vector v=|v|·v̂ — magnitude times direction. This factorisation is the basis of many geometric arguments.

**Vocabulary**

- **Unit vector v̂** — A vector of Euclidean norm 1; computed as v̂=v/|v| for any nonzero v.
- **Normalisation** — The process of dividing a vector by its norm to obtain a unit vector in the same direction.
- **Standard basis vectors eᵢ** — The n canonical unit vectors in ℝⁿ; eᵢ has 1 in position i and 0 elsewhere.
- **Orthonormal vectors** — Vectors that are both orthogonal (dot product = 0) and normalised (norm = 1); the standard basis is orthonormal.

**Common misconceptions**

- *Misconception:* The unit vector in the direction of v is v minus something, not v divided by something.
  *Correction:* Normalisation is division: v̂=v/|v|. Subtracting anything from v changes its direction; dividing by the scalar |v| preserves direction while adjusting magnitude to 1.
- *Misconception:* Any vector with one component equal to 1 is a unit vector.
  *Correction:* A unit vector requires |v|=√(Σvᵢ²)=1, not just one component equal to 1. For example, (1,1,0) has norm √2≠1, so it is not a unit vector, despite having a component equal to 1.
- *Misconception:* The zero vector can be normalised.
  *Correction:* Normalisation v̂=v/|v| is undefined when |v|=0 (division by zero). The zero vector has no direction; it cannot be normalised.

**Common mistakes in practice**

- Dividing only some components by |v| — must divide all n components.
- Computing v̂=v/|v|² instead of v/|v| — dividing by the norm squared gives the wrong scaling.
- Claiming (1,1) is a unit vector because both components are 1 — its norm is √2≠1.

**Visual teaching opportunities**

- Unit circle in ℝ²: show that every point on the unit circle is a unit vector; normalising v=(3,4) gives (3/5,4/5) on the circle.
- Standard basis diagram: draw e₁=(1,0) and e₂=(0,1) in ℝ² as perpendicular unit arrows along the axes.
- Direction factorisation: draw v=(6,8) as a long arrow, then show v̂=(0.6,0.8) as a short unit arrow in the same direction, with the scale factor |v|=10 labeled.

**Worked example**

*Setup:* Normalise (a) v=(3,−4), (b) w=(1,1,1). Verify each result has norm 1.

1. Step 1: |v|=√(9+16)=√25=5. v̂=v/5=(3/5,−4/5)=(0.6,−0.8). Why: divide every component by the norm.
2. Step 2: Verify |v̂|=√((3/5)²+(−4/5)²)=√(9/25+16/25)=√(25/25)=√1=1 ✓.
3. Step 3: |w|=√(1+1+1)=√3. ŵ=w/√3=(1/√3, 1/√3, 1/√3)=(√3/3, √3/3, √3/3).
4. Step 4: Verify |ŵ|=√(1/3+1/3+1/3)=√(3/3)=√1=1 ✓. Why: the sum of three equal fractions 1/3 gives 1.

*Outcome:* v̂=(3/5,−4/5) with |v̂|=1 ✓; ŵ=(1/√3,1/√3,1/√3) with |ŵ|=1 ✓.

**Real-world intuition**

- Computer graphics: surface normals must be unit vectors for correct lighting calculations (Lambert shading uses the unit normal N̂); engines normalise after every geometric operation.
- Navigation: GPS computes unit direction vectors toward waypoints; distance is handled separately from direction.
- Quaternions in game engines: unit quaternions represent rotations; normalisation keeps them valid under repeated multiplication.

**Practice progression**

Item types: Normalise given vectors in ℝ², ℝ³, Verify eᵢ is a unit vector in ℝ⁴, Find all unit vectors in the direction of a given line in ℝ², Given v̂ and |v|=7, recover v, Express v as |v|·v̂ and identify the magnitude and direction parts. Suggested item count: 6.

Start with direct normalisation; advance to verifying the result; culminate in working backwards from unit vector and magnitude to the original.

**Assessment objectives**

Formats: Normalise v=(2,−1,2) and verify the result, True/false: (1/2, 1/2) is a unit vector — justify, Give three different unit vectors in ℝ³. Bloom alignment: apply.

Mastery signal: Student correctly computes v̂=v/|v|, verifies |v̂|=1, and identifies why normalisation of the zero vector is undefined.

**Teacher notes**

Emphasise that v̂ is not a new kind of object — it is still a vector in ℝⁿ, just with norm 1. The hat notation v̂ is standard in physics and engineering. The factorisation v=|v|·v̂ is powerful: it separates magnitude from direction, a conceptual split that recurs in polar/spherical coordinates, complex numbers (r·e^{iθ}=|z|·(direction)), and quaternions.

**Student notes**

Normalise by dividing by the norm. Steps: (1) compute |v|; (2) divide every component by |v|. Check: sum of squares of new components should equal 1. Never try to normalise the zero vector.

**Prerequisite graph**

- Requires: math.linalg.norm
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Unit vectors are the building blocks of orthonormal bases (math.linalg.orthogonal-basis) and the Gram–Schmidt process (math.linalg.gram-schmidt). The dot product of two unit vectors directly gives cosθ (no norm division needed). In functional analysis, unit vectors on the unit sphere of a Banach space play a central role in duality theory.

**Teaching hints — review triggers**

- Cannot compute |v| → review math.linalg.norm.
- Trouble dividing all components by |v| → review scalar multiplication (math.linalg.scalar-multiplication) with fractional scalar.
- Unsure when normalisation is impossible → revisit the zero vector definition.

**Spaced repetition / revision guidance**

Normalise (−5,12) from memory: |v|=13, v̂=(−5/13, 12/13). Verify: (25+144)/169=169/169=1 ✓. Then state in one sentence what normalisation does geometrically.

---

### Orthogonality

*Concept ID: `math.linalg.orthogonality` · Difficulty: developing · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 2h*

**Learning objective.** Test orthogonality of two vectors using the dot product criterion, construct a vector orthogonal to a given one, and state the Pythagorean theorem for orthogonal vectors in ℝⁿ.

Two vectors are orthogonal iff their dot product is zero. Orthogonality generalizes perpendicularity to arbitrary inner product spaces. Orthogonal vectors are linearly independent.

Two vectors u and v are orthogonal (u⊥v) if and only if u·v=0. This is the generalisation of geometric perpendicularity to any dimension and to abstract inner product spaces. Orthogonality is a key structural concept in linear algebra: orthogonal vectors are automatically linearly independent, orthogonal projections minimise distance, and orthonormal bases make computation simple. The Pythagorean theorem extends: if u⊥v then |u+v|²=|u|²+|v|².

**Key ideas**

- Orthogonality test: u⊥v ⟺ u·v=u₁v₁+u₂v₂+…+uₙvₙ=0. This is the most efficient test — check one number instead of computing an angle.
- Pythagorean theorem in ℝⁿ: if u⊥v then |u+v|²=|u|²+|v|²; more generally |u−v|²=|u|²+|v|² (same, since u⊥v implies u⊥(−v)). Proof: |u+v|²=(u+v)·(u+v)=u·u+2u·v+v·v=|u|²+0+|v|².
- Orthogonal implies linearly independent: if u≠0 and v≠0 with u·v=0, then u and v are linearly independent. (Proof: if αu+βv=0, dot with u: α|u|²=0 → α=0; dot with v: β|v|²=0 → β=0.)
- Constructing an orthogonal complement: given v, any w satisfying v·w=0 is orthogonal to v. In ℝ²: if v=(a,b), then any scalar multiple of (−b,a) is orthogonal to v. In ℝ³ use the cross product.
- Orthogonal set: a set {v₁,…,vₖ} where vᵢ·vⱼ=0 for all i≠j; automatically linearly independent if all vᵢ≠0.

**Vocabulary**

- **Orthogonal (u⊥v)** — u·v=0; the generalisation of perpendicularity to any dimension.
- **Orthogonal complement V⊥** — The set of all vectors orthogonal to every vector in V; a subspace.
- **Orthonormal set** — A set where vectors are mutually orthogonal AND each has norm 1; the ideal basis for computation.
- **Pythagorean theorem (vectors)** — If u⊥v then |u+v|²=|u|²+|v|²; generalises the 2D right-triangle result to ℝⁿ.

**Common misconceptions**

- *Misconception:* Orthogonal and perpendicular are different concepts at different levels.
  *Correction:* They are the same: 'perpendicular' is the geometric word for 2D/3D vectors meeting at a right angle; 'orthogonal' is the algebraic generalisation to any ℝⁿ or inner product space, defined by u·v=0. In ℝ² and ℝ³, u·v=0 ⟺ they meet at 90°.
- *Misconception:* If u·v=0, then either u or v must be the zero vector.
  *Correction:* u·v=0 means they are orthogonal, not that either is zero. (1,0)·(0,1)=0 but neither is the zero vector. The zero vector is orthogonal to every vector, and that is a special case, not the only one.
- *Misconception:* The Pythagorean theorem only holds in ℝ² or ℝ³.
  *Correction:* The identity |u+v|²=|u|²+|v|² holds in ℝⁿ for any n (and in any inner product space) whenever u·v=0. The proof only uses properties of the dot product, not any dimension restriction.

**Common mistakes in practice**

- Testing only one pair in a set and concluding the whole set is orthogonal — must test every pair.
- Claiming two vectors are orthogonal because they 'look perpendicular' in a diagram without computing the dot product.
- Forgetting that 0 is orthogonal to everything — this is a degenerate case with no direction.

**Visual teaching opportunities**

- ℝ² grid: draw u=(3,0) and v=(0,2); compute u·v=0, draw the right-angle marker between them, compute |u+v|²=9+4=13=|u|²+|v|² — Pythagorean in ℝ².
- Orthogonal complement in ℝ²: draw v=(1,2); show the full line through the origin perpendicular to v (all scalar multiples of (−2,1)); label it v⊥.
- 3D orthogonal triple: draw e₁,e₂,e₃ as mutually perpendicular unit vectors — the archetypal orthonormal set.

**Worked example**

*Setup:* Let u=(1,2,−1) and v=(2,0,2). (a) Test if u⊥v. (b) Find a vector w=(x,y,0) orthogonal to u. (c) Verify the Pythagorean theorem for u and v.

1. Step 1: u·v=1·2+2·0+(−1)·2=2+0−2=0. So u⊥v ✓.
2. Step 2: w·u=0 with w=(x,y,0): x+2y−0=0 → x=−2y. Choose y=1: w=(−2,1,0). Verify: (−2)(1)+(1)(2)+(0)(−1)=−2+2+0=0 ✓.
3. Step 3: Pythagorean theorem: |u|²=1+4+1=6; |v|²=4+0+4=8; |u+v|²=|(3,2,1)|²=9+4+1=14=6+8 ✓. Why: u⊥v so |u+v|²=|u|²+|v|², confirmed by direct computation.

*Outcome:* u·v=0 so u⊥v; w=(−2,1,0) is orthogonal to u; Pythagorean check: |u+v|²=14=|u|²+|v|² ✓.

**Real-world intuition**

- Error decomposition in statistics: any observation vector y can be split into a component ŷ in the model space and a residual e=y−ŷ perpendicular to it; |y|²=|ŷ|²+|e|² (ANOVA decomposition of sum-of-squares).
- Signal processing: frequency components in a Fourier basis are mutually orthogonal; their energies add independently (Parseval's theorem is the Pythagorean theorem in function space).
- Structural engineering: force components parallel and perpendicular to a surface are orthogonal; they can be analysed independently.

**Practice progression**

Item types: Test orthogonality of given pairs by dot product, Find a vector orthogonal to a given v in ℝ³ (one-parameter family), Verify the Pythagorean theorem for an orthogonal pair, Determine if a set {v₁,v₂,v₃} is mutually orthogonal, Prove that orthogonal nonzero vectors are linearly independent. Suggested item count: 6.

Start with testing orthogonality; advance to constructing orthogonal vectors; culminate in proving linear independence of orthogonal sets.

**Assessment objectives**

Formats: Determine if (1,2,3) and (2,−1,0) are orthogonal, Find all w=(a,b,1) orthogonal to (2,1,−1), State and prove the Pythagorean theorem for orthogonal vectors. Bloom alignment: understand.

Mastery signal: Student correctly applies the dot-product test, constructs an orthogonal vector by solving one linear equation, and proves the Pythagorean theorem from the dot-product expansion.

**Teacher notes**

The linear independence of orthogonal sets is one of the most useful theorems to prove early — dot the linear combination with each basis vector to force all coefficients to zero. This proof strategy recurs constantly in inner-product space theory. The orthogonal complement V⊥ is worth introducing here informally, foreshadowing the fundamental theorem of linear algebra (null space and column space relationship).

**Student notes**

Orthogonality test: compute the dot product. If it's 0, the vectors are orthogonal; done. To find a vector orthogonal to u=(a,b,c): set up au₁+bu₂+cu₃=0 (one equation, two free variables in ℝ³ — infinitely many solutions). Pick the simplest non-zero solution.

**Prerequisite graph**

- Requires: math.linalg.dot-product
- Unlocks (future prerequisite links): math.linalg.orthogonal-basis, math.linalg.gram-schmidt
- Cross-topic connections (graph cross-links): none
- Narrative: Orthogonality is the cornerstone of the Gram–Schmidt process (math.linalg.gram-schmidt), QR factorisation (math.linalg.qr-factorization), and least-squares (math.linalg.least-squares). The projection formula uses orthogonality to decompose vectors. In abstract inner product spaces (math.linalg.inner-product-space), orthogonality generalises to functions.

**Teaching hints — review triggers**

- Cannot compute u·v → review math.linalg.dot-product.
- Trouble solving x+2y=0 for w → review linear equations (math.alg.linear-equation-1var).
- Unclear on the Pythagorean theorem motivation → review math.geom.pythagorean-theorem.

**Spaced repetition / revision guidance**

Without notes: test if (1,2,3) and (1,1,−1) are orthogonal (answer: dot product = 1+2−3=0, yes). Then find one vector orthogonal to (1,2,0) in ℝ³ (e.g. (−2,1,0) or (0,0,1)). State the Pythagorean identity for orthogonal vectors.

---

### Cross Product

*Concept ID: `math.linalg.cross-product` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 3h*

**Learning objective.** Compute the cross product of two vectors in ℝ³ using the determinant formula, verify perpendicularity to both factors, and interpret the magnitude as the area of the parallelogram they span.

Defined in ℝ³: a×b = (a₂b₃−a₃b₂, a₃b₁−a₁b₃, a₁b₂−a₂b₁). Result is perpendicular to both a and b; magnitude is |a||b|sin θ (area of parallelogram). Anti-commutative.

The cross product a×b is defined only in ℝ³ and produces a vector (not a scalar) perpendicular to both a and b. Its magnitude |a×b|=|a||b|sinθ equals the area of the parallelogram with sides a and b. The direction is given by the right-hand rule. The cross product is anti-commutative (b×a=−a×b), not associative, and vanishes iff a and b are parallel.

**Key ideas**

- Formula: a×b=(a₂b₃−a₃b₂, a₃b₁−a₁b₃, a₁b₂−a₂b₁). Computed via the 3×3 determinant with e₁,e₂,e₃ in the first row: a×b=det[[e₁,e₂,e₃],[a₁,a₂,a₃],[b₁,b₂,b₃]].
- Perpendicularity: a·(a×b)=0 and b·(a×b)=0 — the result is orthogonal to both input vectors. This is why a×b is often called the normal vector to the plane spanned by a and b.
- Magnitude and area: |a×b|=|a||b|sinθ. For θ=90°, sinθ=1 and |a×b|=|a||b| (maximum). For parallel vectors, sinθ=0 and a×b=0.
- Anti-commutativity: b×a=−(a×b). The right-hand rule determines the direction: curl fingers from a toward b, thumb points in the direction of a×b.
- Triple product identities: a·(b×c) is the scalar triple product (volume of parallelepiped); a×(b×c)=(a·c)b−(a·b)c (BAC−CAB rule).

**Vocabulary**

- **Cross product a×b** — A vector in ℝ³ perpendicular to both a and b; magnitude |a||b|sinθ equals parallelogram area; computed via 3×3 determinant.
- **Anti-commutativity** — b×a=−(a×b); swapping the order reverses the direction of the cross product.
- **Right-hand rule** — Point fingers in direction of a, curl toward b, thumb gives direction of a×b.
- **Scalar triple product** — a·(b×c)=det[a,b,c]; gives the signed volume of the parallelepiped with edge vectors a,b,c.

**Common misconceptions**

- *Misconception:* The cross product is defined in any dimension.
  *Correction:* The cross product (as defined here) is specific to ℝ³. In ℝ² you can define a related 2D 'pseudo-cross-product' a₁b₂−a₂b₁ (a scalar giving signed area), and there is a 7D generalisation, but the standard cross product producing a vector perpendicular to two inputs exists only in ℝ³.
- *Misconception:* The cross product is commutative: a×b=b×a.
  *Correction:* The cross product is anti-commutative: b×a=−(a×b). The direction reverses when you swap the order (reversed right-hand rule). Only the magnitude is the same.
- *Misconception:* If a×b=0 then a=0 or b=0.
  *Correction:* a×b=0 iff a and b are parallel (one is a scalar multiple of the other, including both being zero). For example, a=(1,2,0) and b=(2,4,0) give a×b=0 though neither is the zero vector.

**Common mistakes in practice**

- Sign errors in the second component: the e₂ term has a negative sign in the cofactor expansion — a×b = e₁(a₂b₃−a₃b₂) − e₂(a₁b₃−a₃b₁) + e₃(a₁b₂−a₂b₁).
- Forgetting the cross product is only defined in ℝ³.
- Assuming a×b=b×a (forgetting anti-commutativity).

**Visual teaching opportunities**

- Determinant mnemonic: write out the 3×3 determinant with symbolic e₁,e₂,e₃ row and then expand cofactors — this is the most error-resistant method.
- Right-hand rule animation: point fingers in the direction of a, curl toward b, thumb points in the direction a×b.
- Area of parallelogram: draw a=(1,0,0) and b=(0,1,0); a×b=(0,0,1)=e₃; area of the 1×1 square is 1=|a×b| ✓.

**Worked example**

*Setup:* Let a=(2,1,0) and b=(1,−1,1). Compute a×b and verify it is perpendicular to both a and b. Find the area of the parallelogram spanned by a and b.

1. Step 1: Set up the determinant: a×b = det[[e₁,e₂,e₃],[2,1,0],[1,−1,1]]. Expand: e₁(1·1−0·(−1))−e₂(2·1−0·1)+e₃(2·(−1)−1·1) = e₁(1)−e₂(2)+e₃(−3) = (1,−2,−3). Why: cofactor expansion along the first row.
2. Step 2: Verify perpendicularity to a: a·(a×b)=2(1)+1(−2)+0(−3)=2−2+0=0 ✓.
3. Step 3: Verify perpendicularity to b: b·(a×b)=1(1)+(−1)(−2)+1(−3)=1+2−3=0 ✓.
4. Step 4: Area=|a×b|=√(1²+(−2)²+(−3)²)=√(1+4+9)=√14. Why: the magnitude of the cross product equals the area of the parallelogram with sides a and b.

*Outcome:* a×b=(1,−2,−3); perpendicularity to a and b verified by zero dot products; area of parallelogram=√14.

**Real-world intuition**

- Torque: τ=r×F; torque (rotational force) is the cross product of the moment arm r and the force F; maximum when r⊥F.
- Surface normals in 3D graphics: given two edge vectors e₁,e₂ of a triangle, the normal is n=e₁×e₂ (normalised); used for lighting calculations.
- Angular momentum: L=r×p (position × linear momentum); the cross product governs orbital mechanics and gyroscope behaviour.

**Practice progression**

Item types: Compute a×b using the determinant formula, Verify anti-commutativity: compute b×a and check b×a=−(a×b), Find the area of a parallelogram with given edge vectors, Find a normal to the plane containing two given vectors, Compute the scalar triple product a·(b×c) and interpret as volume. Suggested item count: 6.

Start with direct cross product computation; advance to anti-commutativity and normal-finding; culminate in triple products and volume calculations.

**Assessment objectives**

Formats: Compute a×b for given a,b in ℝ³ and verify ⊥ to both, Find a unit normal to the plane through (1,0,0), (0,1,0), (0,0,1), State and demonstrate anti-commutativity with a specific example. Bloom alignment: apply.

Mastery signal: Student correctly applies the 3×3 determinant formula, verifies perpendicularity by dot product, and computes area as |a×b|.

**Teacher notes**

The determinant mnemonic is the most reliable method; students who try to remember the formula by components alone make sign errors. Spend time on the perpendicularity verification — it is a model proof by direct computation. Anti-commutativity deserves its own worked example: have students compute a×b and b×a and check the signs flip.

**Student notes**

Use the determinant method: write rows [e₁,e₂,e₃], [a₁,a₂,a₃], [b₁,b₂,b₃], then expand cofactors. Always verify: dot the result into a and b — both should give zero. Anti-commutative: b×a=−(a×b). Area of parallelogram = magnitude of the cross product.

**Prerequisite graph**

- Requires: math.linalg.vector, math.linalg.dot-product
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.geom.cross-product
- Narrative: The cross product is computed via the determinant (math.linalg.determinant); the scalar triple product a·(b×c)=det[a,b,c] links dot and cross products. In differential geometry (math.geom.differential-geometry-surfaces), the cross product of tangent vectors gives the surface normal. The BAC−CAB rule a×(b×c)=(a·c)b−(a·b)c is used in electromagnetic theory.

**Teaching hints — review triggers**

- Cannot compute 3×3 determinants → review math.linalg.cofactor-expansion (or preview it).
- Confusion about perpendicularity → review math.linalg.orthogonality and the dot product test.
- Trouble with the right-hand rule → review the geometric interpretation of the cross product direction.

**Spaced repetition / revision guidance**

Compute e₁×e₂, e₂×e₃, e₃×e₁ from memory (answers: e₃, e₁, e₂). Verify e₁×e₂=−(e₂×e₁)=−e₃. This rehearses the formula, the anti-commutativity, and the right-hand rule simultaneously.

---

### Matrix

*Concept ID: `math.linalg.matrix` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Define an m×n matrix as a rectangular array of numbers, identify entries by their row and column indices, recognise special matrices (identity, zero, diagonal, triangular), and interpret a matrix as encoding a linear transformation ℝⁿ→ℝᵐ.

A rectangular array of numbers with m rows and n columns. Encodes linear transformations (m×n matrix ↔ linear map ℝⁿ→ℝᵐ), system coefficients, data, and more.

A matrix is a rectangular array of real numbers arranged in m rows and n columns, written A∈ℝᵐˣⁿ. The entry in row i and column j is denoted Aᵢⱼ or [A]ᵢⱼ. Matrices encode linear transformations (an m×n matrix acts on column vectors in ℝⁿ to produce vectors in ℝᵐ), systems of linear equations (coefficient matrix), data (rows are observations, columns are features), and many other mathematical structures.

**Key ideas**

- Entry notation: Aᵢⱼ is the entry in row i, column j (1-indexed). The full matrix is A=[Aᵢⱼ]₁≤ᵢ≤ₘ,₁≤ⱼ≤ₙ. Row index comes first; column index second.
- Shape (m×n): m rows, n columns. A square matrix has m=n; a column vector is m×1; a row vector is 1×n. Matrix dimensions must be tracked carefully for operations.
- Special matrices: identity Iₙ (1s on diagonal, 0s elsewhere), zero matrix 0 (all entries 0), diagonal matrix (nonzero only on the main diagonal), upper/lower triangular (zeros below/above the diagonal).
- Matrix as linear map: multiplying an m×n matrix A by a column vector x∈ℝⁿ gives Ax∈ℝᵐ. Each entry (Ax)ᵢ=Σⱼ Aᵢⱼxⱼ — the i-th row of A dotted with x. This is the fundamental operation of linear algebra.
- Columns and rows: the j-th column of A (an m-vector) is where eⱼ∈ℝⁿ gets mapped; Aeⱼ=column j of A. The row space and column space are the two fundamental associated subspaces.

**Vocabulary**

- **Matrix A∈ℝᵐˣⁿ** — A rectangular array of real numbers with m rows and n columns; entry in row i, column j is Aᵢⱼ.
- **Square matrix** — A matrix with m=n; has a main diagonal and admits an inverse, determinant, and trace.
- **Identity matrix Iₙ** — The n×n matrix with 1s on the main diagonal (Iᵢᵢ=1) and 0s everywhere else; the multiplicative identity for matrix multiplication.
- **Matrix-vector product Ax** — The m×1 vector with i-th entry (Ax)ᵢ=Σⱼ Aᵢⱼxⱼ; each entry is the dot product of a row of A with the vector x.

**Common misconceptions**

- *Misconception:* An m×n matrix has n rows and m columns.
  *Correction:* The convention is rows first: m×n means m rows and n columns. The entry Aᵢⱼ uses row index i (1 to m) and column index j (1 to n). A 3×4 matrix has 3 rows and 4 columns — visualise it as 3 horizontal strips each with 4 entries.
- *Misconception:* Two matrices A and B are equal if they have the same entries in any order.
  *Correction:* Matrix equality requires the same dimensions AND every corresponding entry equal: Aᵢⱼ=Bᵢⱼ for all valid i,j. A 2×3 matrix cannot equal a 3×2 matrix even if they contain the same numbers — shape matters.
- *Misconception:* The identity matrix I is the same as the number 1.
  *Correction:* The identity matrix Iₙ is an n×n matrix (not a scalar) that acts as a multiplicative identity for square matrices of the same size: AIₙ=IₙA=A. It has 1s on the diagonal and 0s elsewhere; it is not the scalar 1.

**Common mistakes in practice**

- Writing the matrix entry as Aⱼᵢ (column then row) — always row first, column second.
- Trying to multiply a 3×2 matrix by a 3×1 vector — inner dimensions must match: A is m×n, x must be n×1.
- Confusing the m×n shape with 'm columns, n rows' — it's 'm rows, n columns'.

**Visual teaching opportunities**

- Grid layout: draw a 2×3 matrix with labelled rows (1,2) and columns (1,2,3); mark A₂₃ explicitly to reinforce row-column indexing.
- Multiplication as dot products: show A=[r₁; r₂] (two row vectors) times column x: Ax=(r₁·x, r₂·x) — each entry of the product is a dot product.
- Special matrices zoo: display I₃, a diagonal matrix, and upper triangular matrix side by side with the zero pattern highlighted.

**Worked example**

*Setup:* Let A=[[1,2,3],[4,5,6]] (2×3 matrix) and x=(1,0,−1)ᵀ (3×1 column vector). (a) Identify A₂₁ and A₁₃. (b) Compute Ax.

1. Step 1: A₂₁ is row 2, column 1: A₂₁=4. A₁₃ is row 1, column 3: A₁₃=3. Why: row index first, column index second.
2. Step 2: Ax: A is 2×3, x is 3×1 → Ax is 2×1. First entry: row 1 of A dotted with x: 1·1+2·0+3·(−1)=1+0−3=−2. Second entry: row 2 dotted with x: 4·1+5·0+6·(−1)=4+0−6=−2. Ax=(−2,−2)ᵀ. Why: (Ax)ᵢ=Σⱼ Aᵢⱼxⱼ — the i-th entry of Ax is the dot product of the i-th row with x.
3. Step 3: Interpretation. Ax maps x=(1,0,−1)ᵀ∈ℝ³ to (−2,−2)ᵀ∈ℝ². The matrix A represents a linear function ℝ³→ℝ². Why: the 2×3 shape tells us the input space is ℝ³ (3 columns) and the output space is ℝ² (2 rows).

*Outcome:* A₂₁=4, A₁₃=3; Ax=(−2,−2)ᵀ; A encodes a linear map ℝ³→ℝ².

**Real-world intuition**

- Spreadsheets: a data table is a matrix; rows are records (people, observations), columns are features (age, income); matrix operations process the entire table at once.
- Image processing: a grayscale image is stored as a matrix of pixel intensities; operations like blurring apply matrix multiplication.
- Google PageRank: the web is modelled as a matrix where Aᵢⱼ=1 if page j links to page i; repeated matrix-vector multiplication converges to the rank vector.

**Practice progression**

Item types: Identify entries Aᵢⱼ for various i,j from a given matrix, Compute Ax for given A and x, Write the identity matrix I₃ from memory, Determine the shape of AB given shapes of A and B (without computing), Classify a given matrix as square, rectangular, diagonal, or triangular. Suggested item count: 6.

Start with entry identification; advance to matrix-vector multiplication; culminate in shape analysis for products.

**Assessment objectives**

Formats: Fill in A₂₃, A₁₁, A₃₂ from a given 3×3 matrix, Compute Ax for a specific 3×2 matrix and 2-vector, Explain in one sentence why a 3×4 matrix times a 4×2 matrix produces a 3×2 result. Bloom alignment: understand.

Mastery signal: Student correctly reads entries using (row,column) indexing, computes Ax via dot products, and understands that a matrix shape determines the domain and codomain of the associated linear map.

**Teacher notes**

The mental model 'rows dot columns' for Ax is the single most useful matrix computation pattern in the course — establish it firmly here before matrix-matrix multiplication. Always draw the shape diagram (m×n)·(n×1)=(m×1) to make dimension compatibility concrete. The interpretation of each column of A as the image of a basis vector (Aeⱼ = column j) is a beautiful insight that foreshadows matrix representation of linear maps.

**Student notes**

Rows × columns. For Ax: result has one entry per row of A; each entry is a dot product of that row with x. Dimensions: A is m×n, x is n×1, Ax is m×1. Always check that the inner dimensions match (n must equal n).

**Prerequisite graph**

- Requires: math.linalg.vector
- Unlocks (future prerequisite links): math.linalg.determinant, math.linalg.linear-system, math.linalg.linear-map
- Cross-topic connections (graph cross-links): none
- Narrative: Matrices are containers for linear systems (math.linalg.linear-system via the augmented matrix), linear transformations (math.linalg.matrix-representation), and data operations. Matrix multiplication (math.linalg.matrix-multiplication) composes linear transformations. The determinant (math.linalg.determinant) measures the scaling factor of the transformation. Eigenvalues (math.linalg.eigenvalues) reveal the intrinsic directions preserved by the matrix.

**Teaching hints — review triggers**

- Confusion about row vs. column indexing → review the definition carefully with a specific grid example.
- Cannot compute the dot product in (Ax)ᵢ=Σⱼ Aᵢⱼxⱼ → review math.linalg.dot-product.
- Trouble identifying the shape of the output → review that 'rows of A' determines the output dimension.

**Spaced repetition / revision guidance**

Write a 2×3 matrix with entries Aᵢⱼ=i+j. Compute Ax for x=(1,0,1)ᵀ. Verify by computing each entry as a dot product. This rehearses notation and the matrix-vector product formula.

---

### Matrix Addition

*Concept ID: `math.linalg.matrix-addition` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.95 · Estimated study time: 1h*

**Learning objective.** Add and subtract matrices of the same dimensions entry-wise, verify the vector-space axioms for matrix addition, and identify the zero matrix as the additive identity.

Component-wise addition of matrices of the same dimensions. Satisfies all vector space axioms — matrices of the same size form a vector space.

Matrix addition is defined entry-wise: (A+B)ᵢⱼ=Aᵢⱼ+Bᵢⱼ, requiring A and B to have identical dimensions. Matrices of the same size form a vector space under addition and scalar multiplication: they satisfy commutativity, associativity, the zero-matrix identity, and additive inverses. This makes the set of all m×n matrices isomorphic to ℝᵐⁿ as a vector space.

**Key ideas**

- Entry-wise rule: (A+B)ᵢⱼ=Aᵢⱼ+Bᵢⱼ; add corresponding entries, same row and same column. Dimensions must match exactly — you cannot add a 2×3 matrix to a 3×2 matrix.
- Zero matrix: the m×n zero matrix 0 has all entries 0; A+0=A for any m×n matrix A. It is the additive identity.
- Additive inverse: −A has entries (−A)ᵢⱼ=−Aᵢⱼ; A+(−A)=0. Subtraction A−B=A+(−B) is defined entry-wise.
- Scalar multiplication: c·A has entries (cA)ᵢⱼ=c·Aᵢⱼ; combined with matrix addition, this gives m×n matrices the structure of a vector space (in fact isomorphic to ℝᵐⁿ).
- Commutativity and associativity: A+B=B+A and (A+B)+C=A+(B+C) — both follow immediately from real-number arithmetic on each entry.

**Vocabulary**

- **Entry-wise (element-wise) operation** — An operation applied to corresponding entries of two same-size matrices independently.
- **Zero matrix 0ₘₓₙ** — The m×n matrix with all entries 0; the additive identity for m×n matrix addition.
- **Matrix vector space ℝᵐˣⁿ** — The set of all m×n real matrices; a vector space of dimension mn under entry-wise addition and scalar multiplication.

**Common misconceptions**

- *Misconception:* You can add matrices of different sizes by treating missing entries as zero.
  *Correction:* Matrix addition is only defined when both matrices have identical m×n dimensions. There is no canonical way to add a 2×3 and a 3×2 matrix; the operation is undefined.
- *Misconception:* Matrix addition and matrix multiplication both operate entry-wise.
  *Correction:* Matrix addition is entry-wise, but matrix multiplication is NOT — the (i,j) entry of AB is the dot product of row i of A with column j of B. This is the most common confusion when students first meet both operations.
- *Misconception:* The zero matrix must be square.
  *Correction:* There is a zero matrix for every dimension m×n, not just square matrices. The additive identity for m×n matrices is the m×n zero matrix (m rows, n columns of zeros).

**Common mistakes in practice**

- Adding entries at wrong positions (e.g. row 1, col 2 of A with row 2, col 1 of B).
- Forgetting to multiply every entry when computing cA.
- Attempting to add matrices of different sizes.

**Visual teaching opportunities**

- Side-by-side grid: show two 2×3 matrices with matching positions highlighted, then the sum grid with each entry summed — a visual entry-wise pairing.
- Vector space diagram: label the set of all 2×2 matrices as a 4D vector space isomorphic to ℝ⁴; each basis element is a matrix with one 1 and three 0s.
- Comparison: place matrix addition (entry-wise) and matrix multiplication (row-dot-column) side by side to contrast the two operations immediately.

**Worked example**

*Setup:* Let A=[[1,−2],[3,0]] and B=[[−1,4],[2,−1]]. Compute (a) A+B, (b) 3A−2B.

1. Step 1: A+B: add entry-wise. (1+(−1), −2+4; 3+2, 0+(−1))=(0,2;5,−1)=[[0,2],[5,−1]]. Why: component-wise addition of corresponding entries.
2. Step 2: 3A=3[[1,−2],[3,0]]=[[3,−6],[9,0]]. 2B=2[[−1,4],[2,−1]]=[[−2,8],[4,−2]]. Why: scalar multiplication scales every entry.
3. Step 3: 3A−2B=[[3−(−2),−6−8],[9−4,0−(−2)]]=[[5,−14],[5,2]]. Why: entry-wise subtraction after scaling.

*Outcome:* A+B=[[0,2],[5,−1]]; 3A−2B=[[5,−14],[5,2]].

**Real-world intuition**

- Data aggregation: adding two sales-data matrices (rows=products, columns=months) combines the data from two regions.
- Image blending: averaging two image matrices (A+B)/2 creates a blended image.
- Quantum mechanics: density matrices for independent systems add (tensor-product then trace reduces to a sum in some cases) to give the combined state.

**Practice progression**

Item types: Compute A+B and A−B for given 2×2 and 3×3 matrices, Find B given A+B=C, Compute a linear combination αA+βB, Verify commutativity A+B=B+A for a specific example, Identify the zero matrix and additive inverse for a given A. Suggested item count: 6.

Start with direct entry-wise addition; advance to linear combinations; culminate in solving for unknown matrices.

**Assessment objectives**

Formats: Compute 2A−3B for given A,B, State why matrix addition requires equal dimensions, True/false: matrix addition is commutative — justify. Bloom alignment: apply.

Mastery signal: Student adds matrices correctly entry-wise, applies scalar multiplication, and correctly identifies why dimensions must match.

**Teacher notes**

Matrix addition is easy — use it as the 'friendly' operation before introducing the more complex matrix multiplication. Emphasise that the m×n matrix space is a vector space and point out the dimension count: 2×3 matrices form a 6D vector space. This is a concrete application of the abstract vector space concept.

**Student notes**

Add same-position entries. Always check dimensions first — must be identical. Scalar multiplication: multiply every single entry by the scalar. These two operations make matrices a vector space.

**Prerequisite graph**

- Requires: math.linalg.matrix
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Matrix addition combined with scalar multiplication gives m×n matrices the structure of a vector space (math.linalg.vector-space), of which ℝᵐˣⁿ is the simplest model. Matrix multiplication (math.linalg.matrix-multiplication) is a separate operation that does not operate entry-wise. In ring theory (math.abst.ring-theory), matrices form a ring under addition and multiplication.

**Teaching hints — review triggers**

- Cannot identify matrix dimensions → review math.linalg.matrix.
- Confusion with entry-wise vs. row-column multiplication → preview math.linalg.matrix-multiplication to contrast.
- Trouble with scalar multiplication of entries → review math.linalg.scalar-multiplication.

**Spaced repetition / revision guidance**

Compute [[2,1],[−1,3]]+[[−2,0],[1,−3]] in your head (answer: [[0,1],[0,0]]). Then state why the zero matrix is the additive identity.

---

### Matrix Multiplication

*Concept ID: `math.linalg.matrix-multiplication` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Compute the product AB of two matrices using the row-dot-column rule, verify dimension compatibility, recognise non-commutativity, and interpret matrix multiplication as composition of linear transformations.

(AB)_{ij} = ∑_k A_{ik}B_{kj}; requires inner dimensions to match. Non-commutative in general. Associative; distributes over addition. Encodes composition of linear transformations.

The product of an m×k matrix A and a k×n matrix B is the m×n matrix C=AB with entries Cᵢⱼ=Σₗ AᵢₗBₗⱼ (row i of A dotted with column j of B). The inner dimensions must match: (m×k)(k×n)=(m×n). Matrix multiplication is associative and distributes over addition but is NOT commutative in general (AB≠BA). Geometrically, AB encodes the composition of the linear transformation B followed by A.

**Key ideas**

- Row-dot-column rule: (AB)ᵢⱼ = (row i of A) · (column j of B) = Σₗ AᵢₗBₗⱼ. The result has as many rows as A and as many columns as B; the shared inner dimension k must match.
- Dimension rule: (m×k)·(k×n)→(m×n). The inner k must equal in both matrices; the outer m and n become the dimensions of the product. Check before computing.
- Non-commutativity: in general AB≠BA; even when both products are defined and have the same shape, they may differ. This is the most important distinction from scalar multiplication.
- Associativity and distributivity: (AB)C=A(BC); A(B+C)=AB+AC; (A+B)C=AC+BC. These hold without exception. The identity matrix satisfies AIₙ=A and IₘA=A.
- Composition interpretation: if A represents a linear map ℝᵏ→ℝᵐ and B represents ℝⁿ→ℝᵏ, then AB represents ℝⁿ→ℝᵐ — the composition 'first apply B, then A'.

**Vocabulary**

- **Row-dot-column rule** — (AB)ᵢⱼ = (row i of A)·(column j of B) = Σₗ AᵢₗBₗⱼ.
- **Dimension compatibility** — For AB to exist, the number of columns of A must equal the number of rows of B.
- **Zero divisors** — Non-zero matrices A,B satisfying AB=0; these exist in matrix algebra unlike scalar algebra (where ab=0 implies a=0 or b=0).
- **Hadamard product A⊙B** — The entry-wise product (A⊙B)ᵢⱼ=AᵢⱼBᵢⱼ; distinct from the standard matrix product and used in some neural network and signal processing contexts.

**Common misconceptions**

- *Misconception:* Matrix multiplication is entry-wise, like addition: (AB)ᵢⱼ=AᵢⱼBᵢⱼ.
  *Correction:* (AB)ᵢⱼ=Σₗ AᵢₗBₗⱼ is a dot product of an entire row with an entire column — not the product of just the (i,j) entries. Entry-wise multiplication is called the Hadamard product and is a separate (less common) operation.
- *Misconception:* If AB=0 (the zero matrix), then A=0 or B=0.
  *Correction:* Unlike scalars, matrices can satisfy AB=0 with neither A nor B being zero. Example: A=[[1,0],[0,0]], B=[[0,0],[1,0]]; AB=[[0,0],[0,0]] but A≠0 and B≠0. This shows matrix algebra has zero divisors.
- *Misconception:* AB=BA always holds for square matrices.
  *Correction:* For most pairs of square matrices AB≠BA. Commutativity is exceptional: it holds for A and I (trivially), for diagonal matrices with the same eigenvectors, and in some other special cases, but not in general.

**Common mistakes in practice**

- Multiplying entry-wise: (AB)ᵢⱼ=AᵢⱼBᵢⱼ — wrong; use the dot product of a row with a column.
- Reversing the dimension check: checking that rows of A match rows of B instead of columns of A matching rows of B.
- Assuming AB=BA because A and B are square.

**Visual teaching opportunities**

- Row-column grid: display A (m×k) with one row highlighted, B (k×n) with one column highlighted, and the single resulting entry (AB)ᵢⱼ labeled as their dot product.
- Composition diagram: draw two linear maps B: ℝ³→ℝ², A: ℝ²→ℝ⁴; show AB: ℝ³→ℝ⁴ as the composition arrow.
- Non-commutativity example: compute AB and BA for two specific 2×2 matrices and show they differ.

**Worked example**

*Setup:* Let A=[[1,2,0],[0,1,3]] (2×3) and B=[[1,0],[−1,2],[0,1]] (3×2). Compute AB and state its dimensions. Also verify A(B+B)=AB+AB.

1. Step 1: Dimension check. A is 2×3, B is 3×2. Inner dimensions both equal 3 ✓. Product AB is 2×2. Why: (m×k)·(k×n)=(m×n) with m=2, k=3, n=2.
2. Step 2: (AB)₁₁ = row 1 of A · col 1 of B = (1)(1)+(2)(−1)+(0)(0)=1−2+0=−1. (AB)₁₂=row 1 · col 2=(1)(0)+(2)(2)+(0)(1)=0+4+0=4. (AB)₂₁=row 2 · col 1=(0)(1)+(1)(−1)+(3)(0)=0−1+0=−1. (AB)₂₂=(0)(0)+(1)(2)+(3)(1)=0+2+3=5. AB=[[−1,4],[−1,5]]. Why: systematically apply the dot product formula for each of the 4 entries.
3. Step 3: Verify distributivity. B+B=2B=[[2,0],[−2,4],[0,2]]. A(2B)=2(AB)=2[[−1,4],[−1,5]]=[[−2,8],[−2,10]]. Also AB+AB=2AB=same result ✓. Why: A(cB)=c(AB) follows from linearity of matrix multiplication in B.

*Outcome:* AB=[[−1,4],[−1,5]] (2×2); distributivity verified: A(2B)=2AB=[[−2,8],[−2,10]] ✓.

**Real-world intuition**

- Neural networks: each layer of a neural network performs a matrix multiplication Wx+b; deep networks compose multiple matrix multiplications — precisely the composition interpretation of AB.
- Computer graphics transformations: composing rotations, scalings, and translations via matrix products; the order matters because rotations don't commute.
- Markov chains: multiplying the transition matrix by itself (Aⁿ) gives the n-step transition probabilities.

**Practice progression**

Item types: Compute AB for given matrices, checking dimensions first, Find two matrices A,B where AB≠BA, Verify (AB)C=A(BC) for specific 2×2 matrices, Show AB=0 with A≠0,B≠0 (find a zero-divisor example), Interpret matrix multiplication as composition for two linear maps. Suggested item count: 6.

Start with 2×2 products; advance to rectangular matrices; culminate in non-commutativity and zero-divisor examples.

**Assessment objectives**

Formats: Compute a 3×2 times 2×4 product (state all 12 entries), Give an explicit counterexample to AB=BA, Explain in one sentence why (AB)ᵢⱼ is a dot product. Bloom alignment: apply.

Mastery signal: Student correctly identifies dimensions, applies the row-dot-column formula to all entries, and explains non-commutativity with a specific example.

**Teacher notes**

Non-commutativity is the single most important conceptual departure from scalar arithmetic. Prove it with a vivid 2×2 example: A=[[0,1],[0,0]], B=[[0,0],[1,0]]; AB=[[1,0],[0,0]] but BA=[[0,0],[0,1]]. Then interpret: these are projections onto different coordinate directions — composing in different orders gives different projections. The composition interpretation (AB = 'first B then A') is crucial for understanding why the order reverses in the transpose formula (AB)ᵀ=BᵀAᵀ.

**Student notes**

Check dimensions first: (m×k)(k×n)=(m×n). Then fill each entry (i,j) by dotting row i of A with column j of B. Never multiply entry-wise. AB≠BA in general — always specify the order.

**Prerequisite graph**

- Requires: math.linalg.matrix, math.linalg.dot-product
- Unlocks (future prerequisite links): math.linalg.matrix-inverse, math.linalg.determinant
- Cross-topic connections (graph cross-links): math.abst.ring-theory
- Narrative: Matrix multiplication encodes composition of linear maps (math.linalg.matrix-representation, math.linalg.linear-map). The transpose reversal formula (AB)ᵀ=BᵀAᵀ is immediately motivated by the composition interpretation. The determinant of a product satisfies det(AB)=det(A)det(B) (math.linalg.det-properties). LU factorisation (math.linalg.lu-factorization) decomposes A into a product of triangular matrices.

**Teaching hints — review triggers**

- Cannot compute a dot product → review math.linalg.dot-product.
- Confused about dimension compatibility → review math.linalg.matrix entry (rows first, columns second).
- Expecting commutativity → provide an immediate counterexample before proceeding.

**Spaced repetition / revision guidance**

Compute [[1,2],[3,4]]·[[0,1],[1,0]] and [[0,1],[1,0]]·[[1,2],[3,4]] — they should differ. Then state the dimension rule for (m×k)·(k×n).

---

### Matrix Transpose

*Concept ID: `math.linalg.matrix-transpose` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 2h*

**Learning objective.** Compute the transpose of a matrix by reflecting entries across the main diagonal, apply the reversal formula (AB)ᵀ=BᵀAᵀ, and recognise symmetric and skew-symmetric matrices.

(Aᵀ)_{ij} = A_{ji}: rows become columns and vice versa. Key properties: (AB)ᵀ=BᵀAᵀ, (Aᵀ)ᵀ=A. Symmetric matrices satisfy A=Aᵀ.

The transpose Aᵀ of an m×n matrix A is the n×m matrix with entries (Aᵀ)ᵢⱼ=Aⱼᵢ — rows become columns and columns become rows. Key properties: (Aᵀ)ᵀ=A, (A+B)ᵀ=Aᵀ+Bᵀ, (cA)ᵀ=cAᵀ, and crucially (AB)ᵀ=BᵀAᵀ (order reverses). A matrix is symmetric if A=Aᵀ, skew-symmetric if A=−Aᵀ. The dot product satisfies u·v=uᵀv (row times column).

**Key ideas**

- Definition: (Aᵀ)ᵢⱼ=Aⱼᵢ. Reflect across the main diagonal. An m×n matrix transposes to an n×m matrix — dimensions swap.
- Reversal formula: (AB)ᵀ=BᵀAᵀ. The order reverses — this is consistent with the composition interpretation: reversing the order of operations reverses the composition. This is the most important property of the transpose.
- Symmetric matrices: A=Aᵀ ⟺ Aᵢⱼ=Aⱼᵢ for all i,j. Symmetric matrices must be square. They arise naturally: AᵀA and AAᵀ are always symmetric.
- Skew-symmetric: A=−Aᵀ ⟺ diagonal entries are 0 and Aᵢⱼ=−Aⱼᵢ. Every square matrix decomposes uniquely as A=S+K where S=(A+Aᵀ)/2 is symmetric and K=(A−Aᵀ)/2 is skew-symmetric.
- Dot product in matrix form: u·v=uᵀv. This connects the transpose to the inner product: the dot product of two column vectors is the 1×1 matrix product of the row u with the column v.

**Vocabulary**

- **Transpose Aᵀ** — The n×m matrix with (Aᵀ)ᵢⱼ=Aⱼᵢ; rows and columns of A are swapped.
- **Symmetric matrix** — A square matrix A with A=Aᵀ; entries are mirror-symmetric across the main diagonal.
- **Skew-symmetric matrix** — A square matrix A with A=−Aᵀ; diagonal entries are 0, off-diagonal entries satisfy Aᵢⱼ=−Aⱼᵢ.
- **Reversal formula (AB)ᵀ=BᵀAᵀ** — The transpose of a product equals the product of transposes in reversed order; generalises to (ABC)ᵀ=CᵀBᵀAᵀ.

**Common misconceptions**

- *Misconception:* (AB)ᵀ=AᵀBᵀ (transpose distributes like addition).
  *Correction:* The correct formula is (AB)ᵀ=BᵀAᵀ — the order reverses. This is analogous to (AB)⁻¹=B⁻¹A⁻¹ for inverses, and both arise from the same 'reversing-order' principle for composed operations.
- *Misconception:* Transposing a matrix doesn't change the entries, only their arrangement.
  *Correction:* Transposing reflects across the main diagonal: entry (i,j) moves to position (j,i). This changes the arrangement AND effectively swaps rows and columns. For a non-square matrix, it also changes the dimensions from m×n to n×m.
- *Misconception:* AᵀA=AAᵀ for any matrix A.
  *Correction:* AᵀA and AAᵀ are both symmetric, but they are generally different matrices. AᵀA is n×n (if A is m×n) and AAᵀ is m×m — they're not even the same size unless m=n, and even for square A they generally differ.

**Common mistakes in practice**

- Writing (AB)ᵀ=AᵀBᵀ — order must reverse.
- Forgetting to change dimensions when transposing a non-square matrix.
- Treating a matrix with 1s on the diagonal as symmetric — it is, but only if the off-diagonal entries also mirror.

**Visual teaching opportunities**

- Grid reflection: draw a 3×2 matrix, draw the reflection axis (main diagonal), and show entries migrating to their reflected positions in the 2×3 transpose.
- Symmetry check: draw a symmetric matrix with its equal off-diagonal pairs highlighted, and a skew-symmetric matrix with zero diagonal and opposite off-diagonal pairs.
- u·v=uᵀv: show a column vector u (3×1) transposed to a row (1×3), then multiplied by column v (3×1) to produce the scalar u₁v₁+u₂v₂+u₃v₃.

**Worked example**

*Setup:* Let A=[[1,2,3],[4,5,6]] (2×3) and B=[[1,0],[2,1],[0,3]] (3×2). Verify (AB)ᵀ=BᵀAᵀ.

1. Step 1: Compute AB. A(2×3)·B(3×2)=AB(2×2). (AB)₁₁=1·1+2·2+3·0=5. (AB)₁₂=1·0+2·1+3·3=11. (AB)₂₁=4·1+5·2+6·0=14. (AB)₂₂=4·0+5·1+6·3=23. AB=[[5,11],[14,23]]. Why: row-dot-column.
2. Step 2: Transpose AB: (AB)ᵀ=[[5,14],[11,23]]. Why: rows become columns.
3. Step 3: Compute Bᵀ. B is 3×2 → Bᵀ is 2×3: Bᵀ=[[1,2,0],[0,1,3]]. Compute Aᵀ. A is 2×3 → Aᵀ is 3×2: Aᵀ=[[1,4],[2,5],[3,6]]. Bᵀ·Aᵀ: (2×3)·(3×2)=(2×2). (BᵀAᵀ)₁₁=1·1+2·2+0·3=5. (BᵀAᵀ)₁₂=1·4+2·5+0·6=14. (BᵀAᵀ)₂₁=0·1+1·2+3·3=11. (BᵀAᵀ)₂₂=0·4+1·5+3·6=23. BᵀAᵀ=[[5,14],[11,23]]. Why: applying the same row-dot-column formula to Bᵀ and Aᵀ.
4. Step 4: (AB)ᵀ=[[5,14],[11,23]]=BᵀAᵀ ✓.

*Outcome:* AB=[[5,11],[14,23]]; (AB)ᵀ=BᵀAᵀ=[[5,14],[11,23]] ✓ — the reversal formula confirmed by direct computation.

**Real-world intuition**

- Dot product as matrix product: u·v=uᵀv is fundamental in machine learning — the score of a query vector against a key vector is their dot product, computed as a matrix-vector product.
- Covariance matrix: for data matrix X (rows=observations), Σ=XᵀX/n is always symmetric — a covariance matrix captures all pairwise variable relationships.
- Orthogonal matrices: a square matrix Q is orthogonal iff QᵀQ=I; the transpose acts as the inverse, making QᵀQ=I immediately from the reversal formula and definition of orthogonality.

**Practice progression**

Item types: Compute Aᵀ for given 2×3 and 3×3 matrices, Verify (AB)ᵀ=BᵀAᵀ for a specific pair, Decompose a square matrix as symmetric + skew-symmetric, Show AᵀA is always symmetric (prove), Find all 2×2 skew-symmetric matrices. Suggested item count: 6.

Start with computing Aᵀ; advance to verifying the reversal formula; culminate in proving symmetry properties of AᵀA.

**Assessment objectives**

Formats: Compute (AB)ᵀ two ways (direct and BᵀAᵀ), Determine if a given matrix is symmetric or skew-symmetric, Prove that AᵀA is always symmetric. Bloom alignment: apply.

Mastery signal: Student correctly transposes matrices, applies the reversal formula, and identifies symmetric and skew-symmetric matrices.

**Teacher notes**

The reversal formula (AB)ᵀ=BᵀAᵀ is worth proving from the definition: ((AB)ᵀ)ᵢⱼ=(AB)ⱼᵢ=Σₗ AⱼₗBₗᵢ=Σₗ (Bᵀ)ᵢₗ(Aᵀ)ₗⱼ=(BᵀAᵀ)ᵢⱼ ✓. Students who can follow this proof understand the definition deeply. Symmetric matrices deserve special treatment as they are the matrices with the most beautiful eigenstructure (Spectral Theorem).

**Student notes**

Transpose: reflect across the main diagonal. Rows become columns. Formula (AB)ᵀ=BᵀAᵀ — order reverses. Symmetric: A=Aᵀ, so Aᵢⱼ=Aⱼᵢ. Check: fold the matrix along the diagonal — entries should match.

**Prerequisite graph**

- Requires: math.linalg.matrix
- Unlocks (future prerequisite links): math.linalg.symmetric-matrix
- Cross-topic connections (graph cross-links): none
- Narrative: Symmetric matrices (A=Aᵀ) arise in the Spectral Theorem (math.linalg.spectral-theorem): they have real eigenvalues and orthogonal eigenvectors. The pseudoinverse (math.linalg.pseudoinverse) uses Aᵀ. In inner product spaces, the adjoint of a linear map generalises the transpose (math.linalg.inner-product-space). For real orthogonal matrices Q: Qᵀ=Q⁻¹ (math.linalg.qr-factorization).

**Teaching hints — review triggers**

- Cannot identify entry positions → review math.linalg.matrix notation.
- Forgetting the order reversal → revisit the composition interpretation of matrix multiplication.
- Cannot construct the symmetric/skew-symmetric decomposition → review A=(A+Aᵀ)/2 + (A−Aᵀ)/2.

**Spaced repetition / revision guidance**

Transpose [[1,2,3],[4,5,6]] (answer: [[1,4],[2,5],[3,6]]). Then verify (AB)ᵀ=BᵀAᵀ for A=[[1,0],[0,1]], B=[[2,3],[4,5]] (should give [[2,4],[3,5]]).

---

### Symmetric Matrix

*Concept ID: `math.linalg.symmetric-matrix` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 2h*

**Learning objective.** Identify symmetric matrices by the condition A=Aᵀ, state the Spectral Theorem for real symmetric matrices, and recognise symmetric matrices in applications (covariance matrices, Hessians, Gram matrices).

A = Aᵀ. Symmetric matrices have real eigenvalues and orthogonal eigenvectors (Spectral Theorem). Ubiquitous in physics, statistics (covariance matrices), and optimization (Hessians).

A real square matrix A is symmetric if A=Aᵀ, meaning Aᵢⱼ=Aⱼᵢ for all i,j. Symmetric matrices have three special properties: all eigenvalues are real, eigenvectors corresponding to distinct eigenvalues are orthogonal, and A is orthogonally diagonalisable (A=QΛQᵀ, the Spectral Theorem). They are ubiquitous in mathematics and its applications: covariance matrices in statistics, Hessian matrices in optimisation, and Gram matrices in geometry are all symmetric.

**Key ideas**

- Definition: A=Aᵀ; equivalently, Aᵢⱼ=Aⱼᵢ. The matrix is its own mirror image across the main diagonal. Only square matrices can be symmetric.
- Real eigenvalues: every eigenvalue of a real symmetric matrix is real — no complex eigenvalues, no oscillatory behavior. This is a consequence of the Spectral Theorem (proven via the inner product).
- Orthogonal eigenvectors: eigenvectors of a real symmetric A corresponding to distinct eigenvalues are automatically orthogonal. Combined with normalisation, they form an orthonormal basis.
- Spectral Theorem: A real symmetric matrix A is orthogonally diagonalisable — there exists an orthogonal matrix Q (Qᵀ=Q⁻¹) and diagonal Λ with A=QΛQᵀ. Λ contains the eigenvalues; the columns of Q are orthonormal eigenvectors.
- AᵀA is always symmetric: for any matrix A, the product AᵀA is symmetric. Proof: (AᵀA)ᵀ=Aᵀ(Aᵀ)ᵀ=AᵀA. This is why the normal equations in least-squares involve a symmetric matrix.

**Vocabulary**

- **Symmetric matrix** — A square matrix with A=Aᵀ; entries are equal across the main diagonal (Aᵢⱼ=Aⱼᵢ).
- **Spectral Theorem (real)** — Every real symmetric matrix is orthogonally diagonalisable: A=QΛQᵀ with orthogonal Q (columns are orthonormal eigenvectors) and diagonal Λ (eigenvalues).
- **Gram matrix** — AᵀA (or more generally, the matrix Gᵢⱼ=vᵢ·vⱼ of pairwise dot products); always symmetric and positive semi-definite.
- **Outer product qqᵀ** — The rank-1 matrix formed from a column vector q; symmetric; the spectral decomposition A=Σλᵢqᵢqᵢᵀ expresses A as a sum of rank-1 symmetric matrices.

**Common misconceptions**

- *Misconception:* Any matrix with real entries has real eigenvalues.
  *Correction:* Non-symmetric matrices with real entries can have complex eigenvalues. For example, A=[[0,−1],[1,0]] (a rotation matrix) has eigenvalues ±i. Only real symmetric matrices are guaranteed real eigenvalues.
- *Misconception:* If A is symmetric, all its entries are equal.
  *Correction:* Symmetry means Aᵢⱼ=Aⱼᵢ (off-diagonal mirror pairs are equal), not that all entries are equal. The diagonal entries can be anything; the constraint is only on the off-diagonal pairs.
- *Misconception:* The Spectral Theorem applies to all diagonalisable matrices.
  *Correction:* The Spectral Theorem in the strong sense (orthogonally diagonalisable: A=QΛQᵀ with orthogonal Q) applies specifically to real symmetric matrices. General diagonalisable matrices only guarantee A=PΛP⁻¹ with a potentially non-orthogonal P.

**Common mistakes in practice**

- Checking only the diagonal for symmetry — must verify every off-diagonal pair.
- Assuming all diagonalisable matrices are orthogonally diagonalisable — only symmetric ones are.
- Forgetting that Aᵢⱼ=Aⱼᵢ is the check, not that all entries are equal.

**Visual teaching opportunities**

- Matrix mirror: draw a 3×3 matrix with shaded cells showing the equal off-diagonal pairs (A₁₂=A₂₁, A₁₃=A₃₁, A₂₃=A₃₂) — the symmetry axis is the main diagonal.
- Ellipse eigenvectors: a 2×2 symmetric matrix A transforms the unit circle into an ellipse; the principal axes of the ellipse are the eigenvectors and the semi-axis lengths are the eigenvalues.
- Spectral decomposition: A=λ₁q₁q₁ᵀ+λ₂q₂q₂ᵀ for a 2×2 symmetric matrix — a sum of rank-1 outer products scaled by eigenvalues.

**Worked example**

*Setup:* A=[[2,1],[1,2]]. (a) Verify A is symmetric. (b) Find eigenvalues. (c) Verify eigenvectors are orthogonal.

1. Step 1: Aᵀ=[[2,1],[1,2]]=A ✓. Symmetric.
2. Step 2: det(A−λI)=(2−λ)²−1=λ²−4λ+3=(λ−1)(λ−3)=0. Eigenvalues λ₁=1, λ₂=3. Real ✓.
3. Step 3: λ=1: (A−I)v=0 → [[1,1],[1,1]]v=0 → v₁+v₂=0 → v₁=(1,−1)ᵀ. λ=3: (A−3I)v=0 → [[−1,1],[1,−1]]v=0 → v₂=v₁ → v₂=(1,1)ᵀ.
4. Step 4: v₁·v₂=(1)(1)+(−1)(1)=1−1=0 ✓. Eigenvectors are orthogonal. Normalised: q₁=(1/√2)(1,−1)ᵀ, q₂=(1/√2)(1,1)ᵀ. Q=[q₁|q₂]=(1/√2)[[1,1],[−1,1]]; Λ=[[1,0],[0,3]]; verify QΛQᵀ=A.

*Outcome:* A=Aᵀ ✓; eigenvalues 1 and 3 (real); eigenvectors (1,−1) and (1,1) orthogonal; Spectral decomposition A=QΛQᵀ with Q=(1/√2)[[1,1],[−1,1]], Λ=diag(1,3).

**Real-world intuition**

- Principal component analysis (PCA): the covariance matrix Σ=XᵀX/(n−1) is symmetric; its eigenvectors (principal components) give the directions of maximum variance.
- Quadratic forms: f(x)=xᵀAx with symmetric A; the sign of eigenvalues determines if f is a bowl (positive definite), saddle, or dome (negative definite).
- Finite element method: stiffness matrices in structural engineering are symmetric positive definite; this enables the efficient Cholesky factorisation.

**Practice progression**

Item types: Verify a given matrix is symmetric or not, Find eigenvalues of a 2×2 symmetric matrix, Verify eigenvectors for distinct eigenvalues are orthogonal, Write A as a sum of rank-1 projections (spectral decomposition), Show AᵀA is symmetric for a given non-square A. Suggested item count: 6.

Start with symmetry verification; advance to finding eigenvalues; culminate in the full spectral decomposition.

**Assessment objectives**

Formats: Determine if [[2,3],[3,2]] is symmetric and find its eigenvalues, State the Spectral Theorem and explain why eigenvalues are real, Prove that AᵀA is symmetric. Bloom alignment: understand.

Mastery signal: Student verifies symmetry from A=Aᵀ, finds real eigenvalues, confirms eigenvector orthogonality, and states the Spectral Theorem correctly.

**Teacher notes**

The real eigenvalue theorem is worth proving in outline: if Av=λv with v≠0, take conjugates and use A=Aᵀ (real) to show λ must equal its own conjugate, hence real. The orthogonality of eigenvectors for distinct eigenvalues: Av₁=λ₁v₁, Av₂=λ₂v₂; v₂ᵀAv₁=v₂ᵀ(λ₁v₁)=λ₁(v₂ᵀv₁); also v₂ᵀAv₁=(Av₂)ᵀv₁=(λ₂v₂)ᵀv₁=λ₂(v₂ᵀv₁); so (λ₁−λ₂)(v₂ᵀv₁)=0 → v₁⊥v₂ since λ₁≠λ₂.

**Student notes**

To check: is it square? Does Aᵢⱼ=Aⱼᵢ? If yes, symmetric. Real symmetric matrices always have real eigenvalues — remember this guarantee. AᵀA is always symmetric — often more useful than computing Aᵀ alone.

**Prerequisite graph**

- Requires: math.linalg.matrix-transpose
- Unlocks (future prerequisite links): math.linalg.spectral-theorem
- Cross-topic connections (graph cross-links): none
- Narrative: Symmetric matrices are the setting for the Spectral Theorem (math.linalg.spectral-theorem), positive definiteness (math.linalg.positive-definite), and the Cholesky factorisation (math.linalg.cholesky). The SVD (math.linalg.svd) generalises eigendecomposition to non-symmetric matrices. In statistics, all covariance matrices are symmetric positive semi-definite by construction.

**Teaching hints — review triggers**

- Cannot verify A=Aᵀ → review math.linalg.matrix-transpose.
- Trouble computing eigenvalues → preview math.linalg.eigenvalues.
- Cannot normalise eigenvectors → review math.linalg.unit-vector.

**Spaced repetition / revision guidance**

Check [[3,1],[1,3]] is symmetric. Find eigenvalues (both real: 2 and 4). Verify eigenvectors (1,−1) and (1,1) are orthogonal. State the Spectral Theorem in one sentence.

---

### System of Linear Equations

*Concept ID: `math.linalg.linear-system` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 5h*

**Learning objective.** Write a system of linear equations in matrix form Ax=b, classify it as consistent or inconsistent and as having a unique, no, or infinitely many solutions, and determine which case applies using the rank of A and the augmented matrix [A|b].

A set of m linear equations in n unknowns, written Ax=b. Three outcomes: unique solution (consistent, full column rank), no solution (inconsistent), or infinitely many solutions (dependent). Structure is determined by rank of A and [A|b].

A system of m linear equations in n unknowns can be written compactly as Ax=b where A is the m×n coefficient matrix, x∈ℝⁿ is the unknown vector, and b∈ℝᵐ is the right-hand side. The system is consistent iff b is in the column space of A. Exactly three cases arise: (1) unique solution — rank(A)=n and consistent; (2) no solution — b∉col(A) (inconsistent); (3) infinitely many solutions — consistent with rank(A)<n. The rank of A and the augmented matrix [A|b] determine which case holds.

**Key ideas**

- Matrix form Ax=b: the i-th equation is Σⱼ Aᵢⱼxⱼ=bᵢ. Each column of A is the coefficient vector of one unknown; Ax=x₁(col1)+x₂(col2)+…+xₙ(colₙ) — the solution exists iff b is a linear combination of the columns of A.
- Three solution types: unique (consistent, rank(A)=rank([A|b])=n), none (rank([A|b])>rank(A), inconsistent), infinitely many (rank(A)=rank([A|b])<n, n−rank(A) free parameters).
- Consistency criterion: Ax=b is consistent iff rank(A)=rank([A|b]), i.e., adding b does not increase the rank. If rank([A|b])>rank(A), b introduces a new pivot → inconsistent.
- Homogeneous system Ax=0: always consistent (x=0 is always a solution). Has non-trivial solutions iff rank(A)<n (more unknowns than pivot columns).
- Structure of solutions: if x_p is any particular solution to Ax=b and x_h is any solution to Ax=0, then x_p+x_h is also a solution to Ax=b. All solutions form an affine subspace: {x_p}+null(A).

**Vocabulary**

- **Consistent system** — Ax=b has at least one solution; equivalently rank(A)=rank([A|b]).
- **Inconsistent system** — Ax=b has no solution; rank([A|b])>rank(A) — b introduces a new pivot column.
- **Homogeneous system** — Ax=0; always consistent; has non-trivial solutions iff rank(A)<n.
- **General solution** — x=x_p+x_h where x_p is any particular solution and x_h ranges over all null-space solutions; captures all solutions simultaneously.

**Common misconceptions**

- *Misconception:* More equations than unknowns (m>n) guarantees a unique solution.
  *Correction:* An overdetermined system (m>n) may have no solution (inconsistent), a unique solution, or — if equations are redundant — infinitely many. The rank, not the count, determines the outcome.
- *Misconception:* More unknowns than equations (m<n) guarantees infinitely many solutions.
  *Correction:* An underdetermined system may be inconsistent (no solution). If it is consistent, it has infinitely many solutions (at least n−m free parameters). Consistency requires rank(A)=rank([A|b]).
- *Misconception:* The zero vector x=0 is always the only solution to Ax=0.
  *Correction:* x=0 is always a solution to Ax=0, but there are non-trivial solutions whenever rank(A)<n (the null space is non-trivial). The null space has dimension n−rank(A).

**Common mistakes in practice**

- Confusing 'more equations than unknowns' with 'unique solution' — count of equations doesn't determine uniqueness, rank does.
- Forgetting to include the null-space term in the general solution (writing only the particular solution).
- Concluding the system is inconsistent from a zero row in A without checking if the corresponding b entry is also zero.

**Visual teaching opportunities**

- Three cases in ℝ²: two lines (2 equations, 2 unknowns) — intersecting (unique), parallel (no solution), identical (infinitely many); the rank tells which.
- Column picture: Ax=b says 'is b in the span of the columns of A?'; draw the columns as vectors in ℝᵐ and check if b lies in their span.
- Solution set: for Ax=b with infinitely many solutions, draw x_p (one particular solution arrow) and the null space (a subspace through origin), showing x_p+null(A) as a shifted subspace.

**Worked example**

*Setup:* Solve the system: x+2y−z=4, 2x+y+z=3, x−y+2z=−1.

1. Step 1: Write in matrix form. A=[[1,2,−1],[2,1,1],[1,−1,2]], b=(4,3,−1)ᵀ. Form augmented matrix [A|b]=[[1,2,−1,4],[2,1,1,3],[1,−1,2,−1]].
2. Step 2: Row reduce. R₂←R₂−2R₁: [0,−3,3,−5]. R₃←R₃−R₁: [0,−3,3,−5]. New matrix: [[1,2,−1,4],[0,−3,3,−5],[0,−3,3,−5]]. R₃←R₃−R₂: [0,0,0,0]. Now [[1,2,−1,4],[0,−3,3,−5],[0,0,0,0]].
3. Step 3: Rank(A)=2, rank([A|b])=2 (the last row is all zeros). Since rank([A|b])=rank(A)=2<n=3: consistent with infinitely many solutions. Free variable: z=t (one free parameter).
4. Step 4: Back-substitute. From row 2: −3y+3t=−5 → y=(3t+5)/3=t+5/3. From row 1: x+2(t+5/3)−t=4 → x+t+10/3=4 → x=4−10/3−t=2/3−t. General solution: (x,y,z)=(2/3−t, 5/3+t, t)=(2/3,5/3,0)+t(−1,1,1). Why: the null space direction is (−1,1,1) and (2/3,5/3,0) is one particular solution.

*Outcome:* General solution: x=(2/3,5/3,0)ᵀ + t(−1,1,1)ᵀ for t∈ℝ. System is consistent with infinitely many solutions (one free parameter) because rank(A)=2<n=3.

**Real-world intuition**

- Electrical circuits: Kirchhoff's laws produce a linear system Ax=b; solving it gives the unknown currents and voltages.
- Traffic flow: conservation equations at each junction form a linear system; the null space represents circulation patterns.
- Computer graphics: ray-triangle intersection reduces to solving a 3×3 linear system.

**Practice progression**

Item types: Classify a 2×2 system as unique/no/infinite solutions from its geometry, Write a word-problem linear system as Ax=b, Determine the solution count from rank(A) and rank([A|b]), Find the general solution including the null-space term, Show that x_p+null(A) describes all solutions. Suggested item count: 6.

Start with 2×2 systems; advance to 3×3 with free variables; culminate in abstract rank-based classification.

**Assessment objectives**

Formats: Classify the system and find all solutions, State the three cases using rank conditions, Explain why the solution set to Ax=b is not a subspace (unless b=0). Bloom alignment: apply.

Mastery signal: Student writes the augmented matrix, row-reduces to REF, reads off rank, classifies the system, and writes the general solution with free parameters.

**Teacher notes**

The column picture (is b in the span of the columns?) is the deepest way to understand existence of solutions and should be emphasised alongside the row picture (echelon form). The three-case classification by rank is worth having students memorise as a decision tree: (1) rank([A|b])>rank(A) → inconsistent; (2) rank=n → unique; (3) rank<n and consistent → infinitely many.

**Student notes**

Three cases: (1) pivot in every column of A (rank=n) and consistent → unique solution; (2) pivot introduced in b column → no solution; (3) free variable (rank<n) and consistent → infinitely many. Always compute rank(A) and rank([A|b]).

**Prerequisite graph**

- Requires: math.linalg.matrix, math.alg.system-linear-equations
- Unlocks (future prerequisite links): math.linalg.row-echelon, math.linalg.matrix-inverse
- Cross-topic connections (graph cross-links): math.alg.system-linear-equations
- Narrative: The rank determines the solution count (math.linalg.rank). Row reduction (math.linalg.row-reduction) is the algorithm. The null space (math.linalg.null-space) and column space (math.linalg.column-space) together with the rank-nullity theorem (math.linalg.rank-nullity) give the complete picture. Least-squares (math.linalg.least-squares) handles inconsistent overdetermined systems by finding the closest solution.

**Teaching hints — review triggers**

- Cannot write the matrix form Ax=b → review math.linalg.matrix (matrix-vector product).
- Confusing the three solution cases → revisit the geometry in ℝ² (two lines: intersect / parallel / same).
- Cannot perform row reduction → study math.linalg.row-reduction next.

**Spaced repetition / revision guidance**

Write a 2×3 system with infinitely many solutions. State the rank conditions. Write the general solution as x_p+t·v. Then modify b to make the system inconsistent and verify rank([A|b])>rank(A).

---

### Augmented Matrix

*Concept ID: `math.linalg.augmented-matrix` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.95 · Estimated study time: 1h*

**Learning objective.** Form the augmented matrix [A|b] from a linear system Ax=b, explain why row operations on [A|b] preserve the solution set, and read off consistency from the final echelon form.

The matrix [A|b] formed by appending the right-hand side column b to the coefficient matrix A. Row operations on [A|b] preserve the solution set and are used to row-reduce to echelon form.

The augmented matrix [A|b] is formed by appending the right-hand side vector b as an extra column to the coefficient matrix A, separated by a vertical bar. Row operations applied to [A|b] produce equivalent systems (same solution set) because they correspond to elementary operations on equations: multiplying an equation by a nonzero scalar, swapping two equations, or adding a multiple of one equation to another. The augmented matrix is the standard tool for organising Gaussian elimination.

**Key ideas**

- Formation: if Ax=b has coefficient matrix A (m×n) and RHS b (m×1), then [A|b] is m×(n+1) — the b column appended on the right.
- Three elementary row operations (EROs): (1) swap Rᵢ↔Rⱼ (reorder equations), (2) scale cRᵢ→Rᵢ, c≠0 (multiply equation by nonzero), (3) add multiple Rᵢ+cRⱼ→Rᵢ (replace equation with linear combination). Each preserves the solution set.
- Equivalence: two augmented matrices are row-equivalent if one is obtained from the other by EROs; row-equivalent augmented matrices represent systems with identical solution sets.
- Consistency from RREF: if a row of the RREF looks like [0,0,…,0|d] with d≠0, the corresponding equation 0=d is impossible → inconsistent. If no such row exists → consistent.
- Pivot columns and free variables: pivot columns correspond to 'basic' variables (determined), non-pivot columns to 'free' variables (parameters). The last column (b) should NOT be a pivot column in a consistent system.

**Vocabulary**

- **Augmented matrix [A|b]** — The m×(n+1) matrix formed by appending the RHS vector b to the coefficient matrix A; used for organising row reduction.
- **Elementary row operation (ERO)** — One of three operations (swap, scale, add multiple) that transform a linear system into an equivalent one.
- **Row-equivalent matrices** — Two augmented matrices related by a sequence of EROs; they represent systems with identical solution sets.
- **Pivot column** — A column of the augmented matrix (among the A columns) containing a leading 1 in RREF; corresponds to a basic variable.

**Common misconceptions**

- *Misconception:* The augmented matrix [A|b] is a (m×(n+1)) matrix that can be used in matrix arithmetic like any other matrix.
  *Correction:* The augmented matrix is a notational device for organising row reduction, not a matrix intended for standard algebraic operations (products, transposes). The vertical bar marks the boundary between coefficient and RHS columns.
- *Misconception:* Multiplying a row by 0 is an allowed ERO.
  *Correction:* Multiplying a row by 0 is not an ERO — it destroys information (replaces an equation by 0=0) and the resulting system has a different solution set. Only multiplying by nonzero scalars is allowed.
- *Misconception:* Row-reducing the augmented matrix changes the solution of the system.
  *Correction:* Each ERO is reversible and transforms one system into an equivalent one with the same solution set. The RREF gives a much simpler but equivalent system — same solutions, easier to read.

**Common mistakes in practice**

- Applying an ERO to only one column instead of the entire row (including the b column).
- Multiplying a row by 0, which is not an ERO.
- Reading the pivot from the b column instead of the A columns, leading to false inconsistency conclusions.

**Visual teaching opportunities**

- Side-by-side: show a 2×2 system as equations, then as the augmented matrix, then after two EROs, then as the solution — tracing the same information through all four forms.
- Consistency flag: highlight the last column in RREF; if a leading 1 appears there, mark the system inconsistent with an ×.
- ERO bookkeeping: annotate each row operation on the right margin of the matrix — e.g. 'R₂←R₂−2R₁'.

**Worked example**

*Setup:* Write the augmented matrix for 2x−y=5, x+3y=7 and row-reduce to RREF.

1. Step 1: Augmented matrix: [[2,−1,5],[1,3,7]]. Why: first row from 2x−y=5, second from x+3y=7.
2. Step 2: R₁↔R₂ (swap to get leading 1): [[1,3,7],[2,−1,5]].
3. Step 3: R₂←R₂−2R₁: [[1,3,7],[0,−7,−9]]. Why: eliminate x from row 2.
4. Step 4: R₂←(−1/7)R₂: [[1,3,7],[0,1,9/7]]. Why: make the pivot in row 2 equal to 1.
5. Step 5: R₁←R₁−3R₂: [[1,0,7−27/7],[0,1,9/7]]=[[1,0,22/7],[0,1,9/7]]. RREF: x=22/7, y=9/7.
6. Step 6: Verify: 2(22/7)−9/7=44/7−9/7=35/7=5 ✓; (22/7)+3(9/7)=22/7+27/7=49/7=7 ✓.

*Outcome:* RREF=[[1,0,22/7],[0,1,9/7]]; unique solution x=22/7, y=9/7, verified in both original equations.

**Real-world intuition**

- Spreadsheet solvers: every linear system solver (numpy.linalg.solve, MATLAB \, Excel Solver) internally performs Gaussian elimination on the augmented matrix.
- Cryptography: solving matrix equations over finite fields (e.g. AES key schedule) uses augmented matrices and EROs modulo a prime.
- Network analysis: solving Kirchhoff's current law equations uses augmented matrix row reduction.

**Practice progression**

Item types: Form [A|b] from a given 3-equation system, Apply a given sequence of EROs and check the result, Determine consistency from the final augmented matrix row, Write the RREF and read off the solution or free-variable parameterisation, Determine which EROs transform [[1,2,3],[2,4,6]] to [[1,2,3],[0,0,0]]. Suggested item count: 6.

Start with 2×2 systems; advance to 3×3 with potential inconsistency; culminate in detecting inconsistency and free variables.

**Assessment objectives**

Formats: Form [A|b] and row-reduce to REF for a 3×3 system, Identify which RREF is inconsistent and why, Describe all three EROs and explain why each preserves the solution set. Bloom alignment: understand.

Mastery signal: Student correctly forms [A|b], applies EROs in order with clear labeling, identifies consistency from the RREF, and reads off the solution.

**Teacher notes**

Always label every ERO performed — 'R₂←R₂−3R₁' — to prevent errors and make the work checkable. The augmented matrix is fundamentally a bookkeeping device for Gaussian elimination; its purpose is to track both sides of each equation simultaneously. The inconsistency check (zero row of A, nonzero b entry) is worth drilling as a distinct skill.

**Student notes**

Form [A|b] by writing A, then appending b as the last column. Apply EROs in order, labeling each. In the final form, scan the last column: any row with all A entries zero but nonzero b entry means no solution. Otherwise, read off pivots (basic) and free columns.

**Prerequisite graph**

- Requires: math.linalg.linear-system
- Unlocks (future prerequisite links): math.linalg.row-reduction
- Cross-topic connections (graph cross-links): none
- Narrative: The augmented matrix is the standard setup for row reduction (math.linalg.row-reduction), which produces the row echelon form (math.linalg.row-echelon). The rank is determined by counting pivots in the A portion of the RREF. In the LU factorisation (math.linalg.lu-factorization), the same row operations are tracked as multipliers that form L.

**Teaching hints — review triggers**

- Cannot write the system as Ax=b → review math.linalg.linear-system.
- Unfamiliar with the three EROs → read the row-reduction concept next.
- Confused about what 'equivalent system' means → review math.alg.system-linear-equations for the two-equation case.

**Spaced repetition / revision guidance**

Write [A|b] for x+y=3, 2x−y=0. Row-reduce to RREF in two steps. Read off x and y. Check in original equations.

---

### Row Reduction

*Concept ID: `math.linalg.row-reduction` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Apply the three elementary row operations systematically to an augmented matrix to reach row echelon form (REF) or reduced row echelon form (RREF), solving the associated linear system.

Three elementary row operations (swap, scale, add multiple of one row to another) transform Ax=b without changing its solution set. Systematic application yields row echelon or reduced row echelon form.

Row reduction (Gaussian elimination) applies three elementary row operations — swap two rows, multiply a row by a nonzero scalar, add a multiple of one row to another — to the augmented matrix [A|b]. The goal is to produce zeros below each pivot (REF) and then additionally above each pivot and normalise pivots to 1 (RREF, Gauss–Jordan). The algorithm has O(n³) time complexity. Each step preserves the solution set, so the final simplified system is equivalent to the original.

**Key ideas**

- Algorithm — forward elimination: working left to right, use the pivot in each column to zero out entries below it. If no pivot exists in a column, move right (free column). Result: REF.
- Algorithm — back substitution: from REF, either back-substitute by hand (REF) or continue zeroing above pivots and normalising to 1 (RREF). RREF is the unique canonical form.
- Pivot selection: choose the entry with the largest absolute value in a column (partial pivoting) to minimise numerical instability. In exact arithmetic, any nonzero entry works.
- Multiplier storage for LU: the multipliers ℓᵢⱼ=Aᵢⱼ/Aⱼⱼ used to zero out entry (i,j) are stored in the corresponding position of a lower triangular matrix L, forming the LU factorisation.
- Connection to determinant: each row swap negates the determinant; each row scale multiplies it. Tracking these operations during row reduction gives det(A) as the product of pivots (times ±1 for swaps).

**Vocabulary**

- **Gaussian elimination** — The forward-elimination phase of row reduction that produces REF by zeroing entries below each pivot.
- **Gauss–Jordan elimination** — Extends Gaussian elimination to zero above each pivot and normalise pivots to 1, producing RREF directly.
- **Partial pivoting** — Swapping rows before each elimination step to bring the entry with the largest absolute value to the pivot position; improves numerical stability.
- **Back substitution** — Solving for variables from the bottom equation upward in REF; starts with the last pivot row (one variable), substitutes into the row above, etc.

**Common misconceptions**

- *Misconception:* RREF is the same as REF — once you have zeros below each pivot, you're done.
  *Correction:* REF has zeros below each pivot but not necessarily above, and pivots are not necessarily 1. RREF additionally zeros above each pivot and normalises pivots to 1. Both are valid end-states; RREF gives the solution directly by reading off the entries.
- *Misconception:* Row reduction works only for square matrices.
  *Correction:* Row reduction works for any m×n augmented matrix. Non-square systems are common in applications; the algorithm is identical regardless of shape.
- *Misconception:* The order of row operations doesn't matter for the final RREF.
  *Correction:* The RREF is unique regardless of the sequence of EROs used. Different sequences of valid EROs may reach RREF through different intermediate steps, but the final RREF is always the same.

**Common mistakes in practice**

- Applying the ERO to only one column — always apply to the entire row.
- Choosing a pivot in a free column — pivot must be the leftmost nonzero in the current submatrix.
- Stopping at REF and missing a free variable because a column without a pivot was overlooked.

**Visual teaching opportunities**

- Step-by-step matrix: show a 3×4 augmented matrix at each stage of elimination, highlighting the current pivot and the rows being modified.
- REF vs. RREF: display the same 3×3 system in both REF (staircase of nonzero pivots, zeros below) and RREF (identity pattern in pivot columns, zeros above and below, pivots=1).
- Free column visualisation: show a 3×4 system with a free column (no pivot); the free column produces a free variable and a family of solutions.

**Worked example**

*Setup:* Solve by row reduction: x−y+z=0, 2x+y−z=3, x+2y−2z=2.

1. Step 1: Form [A|b]=[[1,−1,1,0],[2,1,−1,3],[1,2,−2,2]]. Pivot: A₁₁=1.
2. Step 2: R₂←R₂−2R₁: [0,3,−3,3]. R₃←R₃−R₁: [0,3,−3,2]. Matrix: [[1,−1,1,0],[0,3,−3,3],[0,3,−3,2]].
3. Step 3: R₃←R₃−R₂: [0,0,0,−1]. Matrix: [[1,−1,1,0],[0,3,−3,3],[0,0,0,−1]]. Last row [0,0,0,−1] corresponds to 0=−1 — impossible!
4. Step 4: Conclusion: inconsistent — no solution. The rank of A is 2 (two pivots), rank([A|b])=3 (third row introduces a new nonzero in the b column). rank([A|b])>rank(A) → inconsistent.

*Outcome:* System is inconsistent (no solution). Detected at step 3: row [0,0,0,−1] gives 0·x+0·y+0·z=−1, impossible.

**Real-world intuition**

- Computational science: numpy.linalg.solve and LAPACK's dgesv perform Gaussian elimination with partial pivoting as the default algorithm for dense linear systems.
- Graphics pipeline: solving for barycentric coordinates in triangle rendering uses Gaussian elimination.
- Cryptanalysis: breaking linear codes over GF(2) uses row reduction over the field of two elements.

**Practice progression**

Item types: Row-reduce a 2×3 augmented matrix to RREF, Row-reduce a 3×4 augmented matrix and identify free variables, Solve a system by back-substitution from REF, Determine consistency from the final row echelon form, Apply partial pivoting: reorder rows so the largest pivot comes first. Suggested item count: 6.

Start with 2×2 system to RREF; advance to 3×3 with free variables; culminate in inconsistency detection and partial pivoting.

**Assessment objectives**

Formats: Row-reduce a given [A|b] to RREF and state the solution, Label each ERO applied in a given reduction sequence, Explain how to detect inconsistency during row reduction. Bloom alignment: apply.

Mastery signal: Student applies all three EROs correctly, reaches RREF without errors, detects free variables, and identifies inconsistency from a zero-left, nonzero-right row.

**Teacher notes**

Labelling every row operation is both pedagogically essential and a professional habit. Enforce this from the start. Partial pivoting deserves at least one example demonstrating how swapping rows prevents a near-zero pivot that would cause catastrophic cancellation. The connection to LU factorisation (the multipliers ℓᵢⱼ fill the lower triangle) should be mentioned here as a preview.

**Student notes**

Forward elimination: use the current pivot to zero everything below it in the same column. Then move to the next pivot. Continue until REF. For RREF: additionally zero above each pivot and make each pivot exactly 1. Every step: label the operation, apply to the full row including the b column.

**Prerequisite graph**

- Requires: math.linalg.augmented-matrix
- Unlocks (future prerequisite links): math.linalg.row-echelon, math.linalg.lu-factorization
- Cross-topic connections (graph cross-links): none
- Narrative: Row reduction produces the row echelon form (math.linalg.row-echelon) and allows reading off the rank (math.linalg.rank). The multipliers stored during elimination form the LU factorisation (math.linalg.lu-factorization). The RREF solution is equivalent to computing the matrix inverse (math.linalg.matrix-inverse) for square invertible systems.

**Teaching hints — review triggers**

- Cannot form the augmented matrix → review math.linalg.augmented-matrix.
- Confusion about which entries to zero out → review the algorithm step by step with a 2×2 example first.
- Arithmetic errors during elimination → slow down and verify each row operation on a small example before proceeding to larger matrices.

**Spaced repetition / revision guidance**

Row-reduce [[2,4,−2],[1,2,3]] to RREF step by step. Label every operation. Answer: RREF=[[1,2,0],[0,0,1]]. Then state: 2 pivots → rank 2; column 2 is free; solution x₁=−2x₂−2, x₂=t, x₃=1.

---

### Row Echelon Form

*Concept ID: `math.linalg.row-echelon` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Identify a matrix in row echelon form (REF) or reduced row echelon form (RREF), locate pivot positions, distinguish pivot columns from free columns, and use RREF to read off the solution of a linear system.

REF: zeros below each pivot; RREF: additionally, zeros above each pivot and each pivot equals 1. RREF is unique. Pivot columns correspond to basic variables; non-pivot columns to free variables.

A matrix is in row echelon form (REF) if: (1) all zero rows are at the bottom; (2) each leading nonzero entry (pivot) is strictly to the right of the pivot in the row above. In RREF, additionally: (3) each pivot is 1; (4) the pivot is the only nonzero in its column. The RREF of any matrix is unique. Pivot columns correspond to basic (determined) variables; non-pivot columns correspond to free variables that parameterise the solution family.

**Key ideas**

- REF conditions: staircase pattern — each new pivot sits strictly to the right of the one above; all zero rows are last. Multiple valid REFs may exist for a given matrix; pivots need not be 1.
- RREF conditions: additionally, each pivot is exactly 1 AND every other entry in the pivot column is 0. RREF is unique. It is the canonical form produced by Gauss–Jordan elimination.
- Pivot columns and basic variables: a pivot column contains a leading 1 (in RREF); the associated variable is basic — determined in terms of free variables. Non-pivot columns correspond to free variables, which are assigned as parameters.
- Reading solutions from RREF: for each pivot row i with pivot in column p, the equation reads xₚ = (RHS) − (linear combination of free variables). All free variables take arbitrary values.
- Rank from RREF: rank(A) = number of pivot columns = number of nonzero rows in REF = number of leading 1s in RREF. Null space dimension = n − rank(A).

**Vocabulary**

- **Row echelon form (REF)** — A matrix with zero rows at the bottom and each pivot strictly right of the pivot above; not unique.
- **Reduced row echelon form (RREF)** — REF with each pivot equal to 1 and all other entries in each pivot column equal to 0; unique for any given matrix.
- **Pivot** — The leading nonzero entry of a row in REF; in RREF, every pivot is 1.
- **Free variable** — A variable corresponding to a non-pivot column; it takes arbitrary values (parameters) in the general solution.
- **Basic variable** — A variable corresponding to a pivot column; it is determined by the free variables via back-substitution.

**Common misconceptions**

- *Misconception:* REF is unique for a given matrix.
  *Correction:* REF is not unique — different sequences of EROs may produce different REFs. Only RREF is unique. Two different REFs of the same matrix may look quite different but still have the same number of pivots (hence the same rank).
- *Misconception:* A free variable can be any one of the unknowns — you choose whichever is convenient.
  *Correction:* Free variables correspond specifically to non-pivot columns. The pivot columns are fixed by the matrix; they are not a choice. Only non-pivot variables are free.
- *Misconception:* If a matrix has a row of zeros, it has no solution.
  *Correction:* A zero row in A (the coefficient portion) causes no problem for consistency — it just reduces the rank. Inconsistency arises only from a row [0,0,…,0|d] with d≠0 in the augmented matrix.

**Common mistakes in practice**

- Labeling a column with a leading nonzero (but not 1) as a pivot column in RREF — in RREF, every pivot is exactly 1.
- Writing a free variable as determined by the RREF and forgetting to introduce a parameter.
- Stopping after partial elimination and claiming the matrix is in REF when lower rows still have nonzero entries in earlier columns.

**Visual teaching opportunities**

- Staircase diagram: draw the RREF pattern with leading 1s on a staircase, asterisks (*) for free entries, zeros elsewhere — the canonical visual.
- REF vs. RREF side by side: show the same 3×4 system in REF (pivots nonzero, zeros below only) and RREF (leading 1s, zeros above and below) — show that RREF gives the solution directly.
- Pivot column identification: shade pivot columns blue and free columns orange; the solution reads: blue variables determined, orange variables = parameters.

**Worked example**

*Setup:* The RREF of [A|b] is [[1,0,2,−1,3],[0,1,−1,2,1],[0,0,0,0,0]]. Identify pivots, free variables, and write the general solution.

1. Step 1: Pivot positions: columns 1 and 2 (the leading 1s). Columns 3 and 4 are non-pivot (free). The b column (column 5) is not a pivot column. Why: in RREF, pivot columns have exactly one 1 and all other entries 0.
2. Step 2: Free variables: x₃=s and x₄=t (two free parameters, one per non-pivot column). Basic variables: x₁ and x₂. Why: basic variables are expressed in terms of free ones.
3. Step 3: From row 1: x₁+0·x₂+2x₃−x₄=3 → x₁=3−2s+t. From row 2: x₂−x₃+2x₄=1 → x₂=1+s−2t. Why: read the RREF equation for each pivot row.
4. Step 4: General solution: (x₁,x₂,x₃,x₄)=(3,1,0,0)+s(−2,1,1,0)+t(1,−2,0,1). Why: one particular solution (3,1,0,0) plus the two null-space directions (s and t parameter vectors).

*Outcome:* Pivot variables x₁,x₂; free variables x₃=s,x₄=t; general solution (3,1,0,0)+s(−2,1,1,0)+t(1,−2,0,1).

**Real-world intuition**

- Computational algebra: computer algebra systems (Mathematica, MATLAB) compute RREF (rref command) as a standard tool for solving linear systems symbolically.
- Coding theory: RREF of a parity-check matrix identifies information and check bits in a linear code.
- Robotics: the RREF of the Jacobian matrix reveals degrees of freedom and kinematic singularities of a robotic arm.

**Practice progression**

Item types: Determine if a given matrix is in REF, RREF, or neither, Identify all pivot and free columns from a given RREF, Write the general solution from a given RREF augmented matrix, Convert a REF matrix to RREF, Count the rank from a given RREF. Suggested item count: 6.

Start with identifying REF/RREF from inspection; advance to reading solutions; culminate in writing general solutions with multiple free variables.

**Assessment objectives**

Formats: Given a RREF augmented matrix, write the general solution, Determine rank and nullity from the RREF, Is [[1,2,0],[0,0,1],[0,0,0]] in REF? RREF?. Bloom alignment: apply.

Mastery signal: Student correctly identifies all pivot and free columns, writes the general solution including all free-parameter terms, and counts rank as the number of pivots.

**Teacher notes**

The uniqueness of RREF is non-trivial — prove it or at least state it clearly, since students who believe REF is unique will confuse different REFs of the same matrix. The visual template (staircase for REF, staircase of 1s with column zeros for RREF) is worth spending five minutes drawing because it gives students an instant 'shape to match'.

**Student notes**

Check REF: staircase pattern (each pivot right of the one above), zero rows at bottom. Check RREF: also each pivot is 1, and zeros everywhere else in pivot columns. Pivot columns → basic variables; all others → free variables.

**Prerequisite graph**

- Requires: math.linalg.row-reduction
- Unlocks (future prerequisite links): math.linalg.rank, math.linalg.null-space
- Cross-topic connections (graph cross-links): none
- Narrative: The rank of A equals the number of pivots in the RREF (math.linalg.rank). The null space (math.linalg.null-space) is spanned by the vectors obtained by setting each free variable to 1 (others to 0) in turn. The column space (math.linalg.column-space) is spanned by the pivot columns of the original A (not the RREF). The rank-nullity theorem (math.linalg.rank-nullity) connects pivot and free column counts.

**Teaching hints — review triggers**

- Cannot perform row reduction → review math.linalg.row-reduction.
- Confused about which columns are free → look for columns WITHOUT a pivot; those are free.
- Cannot write general solution → review math.linalg.linear-system (particular + null-space structure).

**Spaced repetition / revision guidance**

Write down a 3×5 RREF with exactly 2 pivots (in columns 1 and 3). State rank=2. Identify 3 free columns. Write the general solution: particular solution plus 3 null-space vectors (one per free variable).

---

### Rank

*Concept ID: `math.linalg.rank` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Define the rank of a matrix as the number of pivots in its row echelon form, compute it by row reduction, interpret it as the dimension of the column space and row space, and apply it to classify linear systems.

The number of pivots in REF; equals the dimension of the column space (column rank) and row space (row rank). Column rank = row rank always. Rank determines existence and uniqueness of solutions to Ax=b.

The rank of a matrix A, written rank(A), is the number of pivots in any row echelon form of A. Equivalently, rank(A)=dim(col(A))=dim(row(A)): the dimension of the column space equals the dimension of the row space — a non-obvious equality known as the rank theorem. The rank determines uniquely the number of solutions to Ax=b and appears in the rank-nullity theorem: rank(A)+nullity(A)=n (the number of columns).

**Key ideas**

- Computing rank: row-reduce A to REF; count the number of pivots (nonzero rows in REF). This is the rank. Rank is invariant — it doesn't change with the sequence of EROs used.
- Rank theorem: column rank = row rank. Despite the column space and row space living in different ambient spaces (ℝᵐ and ℝⁿ), they have the same dimension. Proved by showing that row operations preserve the row space dimension.
- Full column rank: rank(A)=n (all columns are pivots; no free variable); system Ax=b has at most one solution (unique if consistent).
- Full row rank: rank(A)=m (all rows have pivots; every right-hand side b is achievable); system Ax=b is always consistent.
- Rank and invertibility: a square n×n matrix A is invertible iff rank(A)=n iff det(A)≠0 iff the columns are linearly independent iff the rows are linearly independent — all equivalent.

**Vocabulary**

- **Rank r=rank(A)** — The number of pivots in any REF of A; equals dim(col(A))=dim(row(A)).
- **Nullity** — The dimension of the null space; nullity(A)=n−rank(A) by the rank-nullity theorem.
- **Full column rank** — rank(A)=n; no free variables; at most one solution to Ax=b.
- **Full row rank** — rank(A)=m; system Ax=b is consistent for every b; at least one solution always exists.
- **Rank theorem** — Column rank = row rank for any matrix; a non-trivial theorem that has no analogue for most other matrix properties.

**Common misconceptions**

- *Misconception:* Adding more rows to A increases its rank.
  *Correction:* Adding a row can increase rank by at most 1, but only if the new row is linearly independent of the existing rows. If the new row is a linear combination of existing rows (redundant), rank does not change.
- *Misconception:* Row rank and column rank are different in general.
  *Correction:* Row rank always equals column rank — this is the rank theorem, one of the deepest results in linear algebra. The row rank (dim of row space) and column rank (dim of col space) are always equal for any matrix.
- *Misconception:* rank(AB)=rank(A)·rank(B).
  *Correction:* There is no product formula for rank. The correct inequality is rank(AB)≤min(rank(A),rank(B)). Rank can decrease under multiplication (e.g. if A or B has rank-deficiency).

**Common mistakes in practice**

- Confusing rank with the number of rows — rank ≤ min(m,n) and equals the number of PIVOTS, not rows.
- Computing rank by counting nonzero entries rather than pivots.
- Claiming rank(AB)=rank(A)·rank(B) — wrong; use rank(AB)≤min(rank(A),rank(B)).

**Visual teaching opportunities**

- Rank table: display a 3×4 matrix in REF with 2 pivots → rank=2; highlight the two nonzero rows and two pivot columns.
- Four subspace diagram (Strang): draw the four fundamental subspaces — col(A) in ℝᵐ, row(A) in ℝⁿ, null(A) in ℝⁿ, null(Aᵀ) in ℝᵐ — with dimensions r, r, n−r, m−r labeled.
- Rank vs. full rank: for a 3×3 matrix, show rank=1 (all columns multiples of one), rank=2 (one dependent column), rank=3 (invertible).

**Worked example**

*Setup:* Find rank(A) for A=[[1,2,3],[2,4,6],[1,1,1]].

1. Step 1: Row reduce. R₂←R₂−2R₁: [0,0,0]. R₃←R₃−R₁: [0,−1,−2]. Matrix: [[1,2,3],[0,0,0],[0,−1,−2]].
2. Step 2: Swap R₂↔R₃ (move nonzero row up): [[1,2,3],[0,−1,−2],[0,0,0]]. REF: two nonzero rows → rank(A)=2.
3. Step 3: Identify significance. n=3 columns; rank=2; nullity=3−2=1 (one free variable). Column space: 2D (two linearly independent columns). Row space: 2D (two linearly independent rows). Why: row rank = column rank = 2.
4. Step 4: Solution structure for Ax=b: consistent iff b∈col(A) (a 2D subspace of ℝ³); if consistent, infinitely many solutions (nullity=1).

*Outcome:* rank(A)=2; nullity=1; column space is 2D, row space is 2D (rank theorem). System Ax=b has solutions only for b in a 2D subspace of ℝ³, and any such solution is non-unique.

**Real-world intuition**

- Redundancy detection: if rank(A)<m, some equations are redundant (linear combinations of others); removing them simplifies the system without losing information.
- Dimensionality of data: rank(X) for a data matrix X tells the 'intrinsic dimension' — the number of independent directions in the data. PCA uses rank implicitly.
- Robot kinematics: the rank of the Jacobian matrix tells how many independent motions a robot can make; rank-deficiency means a singularity (loss of maneuverability).

**Practice progression**

Item types: Compute rank(A) by row reduction for various matrices, Find rank of AᵀA and compare to rank(A), Determine if a system has 0,1, or ∞ solutions from rank(A) and rank([A|b]), Verify rank=column rank=row rank for a specific 3×4 matrix, Find the maximum possible rank of a 4×3 matrix. Suggested item count: 6.

Start with rank computation by counting pivots; advance to application to solution types; culminate in the rank theorem and its consequences.

**Assessment objectives**

Formats: Compute rank(A) for a given matrix and state the number of solutions to Ax=b, State the rank theorem and give one corollary, True/false: a 4×3 matrix can have rank 4 — justify. Bloom alignment: understand.

Mastery signal: Student computes rank by counting pivots, applies the solution-type classification correctly, and states rank(A)=column rank=row rank.

**Teacher notes**

The rank theorem (row rank = column rank) deserves special attention — it is surprising and deep. A clean proof via REF: row operations preserve row space; the REF has r nonzero rows (dimension r). Column operations (on the transpose) preserve column space; REF of Aᵀ also has r nonzero rows = r pivots = same r. Alternatively, the proof via the rank-nullity theorem applied to A and Aᵀ. Strang's Four Fundamental Subspaces diagram (col, row, null, left-null) is an excellent capstone visual.

**Student notes**

Rank = number of pivots in REF. Maximum rank of m×n matrix is min(m,n). rank(A)+nullity(A)=n always. For Ax=b: consistent iff rank(A)=rank([A|b]); unique iff rank=n; infinitely many iff consistent and rank<n.

**Prerequisite graph**

- Requires: math.linalg.row-echelon
- Unlocks (future prerequisite links): math.linalg.rank-nullity
- Cross-topic connections (graph cross-links): none
- Narrative: Rank appears in: the rank-nullity theorem (math.linalg.rank-nullity), solution classification of Ax=b (math.linalg.linear-system), invertibility of square matrices (math.linalg.matrix-inverse), and the SVD (math.linalg.svd where rank = number of nonzero singular values). The four fundamental subspaces (math.linalg.null-space, math.linalg.column-space) have dimensions determined by rank.

**Teaching hints — review triggers**

- Cannot row-reduce to REF → review math.linalg.row-reduction.
- Confusion about pivot counting → review math.linalg.row-echelon (what counts as a pivot).
- Cannot apply the rank-based solution classification → review math.linalg.linear-system.

**Spaced repetition / revision guidance**

Row-reduce [[1,2],[3,6],[2,4]] and count pivots — rank=1 (all rows multiples of (1,2)). Then state: col(A) is 1D (a line), null(A) is 1D (a line in ℝ²). Verify rank+nullity=2=n.

---

### Matrix Inverse

*Concept ID: `math.linalg.matrix-inverse` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Determine whether a square matrix is invertible, compute its inverse via row reduction on the augmented matrix [A|I], and verify the result.

A square matrix A is invertible iff det(A)≠0, iff rank(A)=n, iff columns are linearly independent. The inverse A⁻¹ satisfies AA⁻¹=A⁻¹A=I. Computed via [A|I] → [I|A⁻¹] by row reduction.

A square n×n matrix A is invertible (nonsingular) if there exists A⁻¹ such that AA⁻¹=A⁻¹A=I. Equivalently: det(A)≠0, rank(A)=n, or the columns are linearly independent. The inverse is computed by row-reducing [A|I] to [I|A⁻¹]. For 2×2: [[a,b],[c,d]]⁻¹ = (1/(ad−bc))[[d,−b],[−c,a]].

**Key ideas**

- A is invertible iff det(A)≠0 iff columns are linearly independent iff rank(A)=n
- Row-reduce the augmented matrix [A|I]; when left block becomes I, the right block is A⁻¹
- For 2×2: A⁻¹ = (1/det(A))·adj(A) where adj swaps diagonal and negates off-diagonal
- (AB)⁻¹ = B⁻¹A⁻¹ — order reverses (analogous to (AB)ᵀ=BᵀAᵀ)
- A⁻¹ is unique; if B and C both satisfy AB=I and CA=I, then B=C

**Vocabulary**

- **invertible (nonsingular)** — A square matrix with det≠0; its inverse A⁻¹ satisfies AA⁻¹=A⁻¹A=I
- **singular** — A square matrix with det=0; has no inverse
- **adjugate (adj A)** — The transpose of the cofactor matrix; A⁻¹ = adj(A)/det(A)
- **left inverse / right inverse** — For square matrices, left and right inverses coincide if either exists

**Common misconceptions**

- *Misconception:* Every square matrix has an inverse.
  *Correction:* Only matrices with det(A)≠0 are invertible; for example [[1,2],[2,4]] has det=0 and no inverse.
- *Misconception:* (AB)⁻¹ = A⁻¹B⁻¹.
  *Correction:* Order reverses: (AB)⁻¹=B⁻¹A⁻¹. Verify: (AB)(B⁻¹A⁻¹)=A(BB⁻¹)A⁻¹=AIA⁻¹=I.
- *Misconception:* The inverse is computed by taking the reciprocal of each entry.
  *Correction:* A⁻¹ is found via row reduction on [A|I] or the adjugate formula — entry-wise reciprocals do not give the inverse.

**Common mistakes in practice**

- Confusing (AB)⁻¹=A⁻¹B⁻¹ (wrong) with (AB)⁻¹=B⁻¹A⁻¹ (correct)
- Applying the 2×2 shortcut to a 3×3 matrix
- Forgetting to check det≠0 before starting the inverse computation

**Visual teaching opportunities**

- Show side-by-side row reduction of [A|I] → [I|A⁻¹], tracking each elementary row operation
- Diagram: multiplication by A maps ℝⁿ → ℝⁿ; A⁻¹ reverses this arrow
- 2×2 formula with the 'switch diagonal, negate off-diagonal' mnemonic highlighted

**Worked example**

*Setup:* Find the inverse of A = [[1,2],[3,4]] using the augmented-matrix method, then verify AA⁻¹=I.

1. Step 1: Form [A|I] = [[1,2|1,0],[3,4|0,1]]. Why: row operations on this augmented matrix will convert A to I while building A⁻¹ on the right.
2. Step 2: R₂ ← R₂ − 3R₁ → [[1,2|1,0],[0,−2|−3,1]]. Why: eliminate the (2,1) entry.
3. Step 3: R₂ ← (−1/2)R₂ → [[1,2|1,0],[0,1|3/2,−1/2]]. Why: make the pivot in row 2 equal to 1.
4. Step 4: R₁ ← R₁ − 2R₂ → [[1,0|−2,1],[0,1|3/2,−1/2]]. Why: eliminate (1,2) entry to reach RREF.
5. Step 5: Read A⁻¹ = [[−2,1],[3/2,−1/2]] from the right block. Verify: det(A) = 4−6 = −2 ≠ 0, consistent with invertibility.
6. Step 6: Verify AA⁻¹: [[1,2],[3,4]]·[[−2,1],[3/2,−1/2]] = [[−2+3, 1−1],[−6+6, 3−2]] = [[1,0],[0,1]] ✓.

*Outcome:* A⁻¹ = [[−2,1],[3/2,−1/2]] with AA⁻¹=I confirmed. Observation: A⁻¹ = (1/(−2))·[[4,−2],[−3,1]], consistent with the 2×2 formula.

**Real-world intuition**

- Solving Ax=b via x=A⁻¹b in computer graphics (inverse coordinate transforms)
- Decoding encoded messages in cryptography (matrix cipher inversion)
- Econometric models: computing the Leontief inverse (I−A)⁻¹ in input-output analysis

**Practice progression**

Item types: Invertibility check via determinant, 2×2 inverse by formula, 3×3 inverse by row reduction on [A|I], Prove (AB)⁻¹=B⁻¹A⁻¹ symbolically, Solve Ax=b using x=A⁻¹b, Identify singular matrices and explain why no inverse exists. Suggested item count: 6.

2×2 direct formula → 2×2 via row reduction → 3×3 row reduction → symbolic properties → application to Ax=b

**Assessment objectives**

Formats: Compute A⁻¹ by row reduction, True/false on invertibility conditions, Short proof using AA⁻¹=I. Bloom alignment: apply.

Mastery signal: Correctly row-reduces [A|I] to obtain A⁻¹ for a 3×3 matrix and verifies AA⁻¹=I with no arithmetic errors.

**Teacher notes**

Stress the equivalence theorem: invertibility, det≠0, full rank, and column independence are all equivalent. Students often learn each in isolation — showing they form one unified condition builds deep understanding.

**Student notes**

The row-reduction method generalises to any n×n matrix; the 2×2 formula is a shortcut. Always verify by computing AA⁻¹=I to catch arithmetic errors.

**Prerequisite graph**

- Requires: math.linalg.matrix-multiplication, math.linalg.determinant
- Unlocks (future prerequisite links): math.linalg.cramer-rule
- Cross-topic connections (graph cross-links): math.abst.group-inverse
- Narrative: Matrix inverse is the linear-algebra analogue of the group inverse (abstract algebra) and connects to Cramer's Rule (uses det), LU factorisation (efficient solve), and eigenvalue theory (A−λI invertibility).

**Teaching hints — review triggers**

- Errors in computing the determinant → review determinant concept
- Incorrect row operations on [A|I] → review row reduction
- Confusion about (AB)⁻¹ order → review matrix multiplication non-commutativity

**Spaced repetition / revision guidance**

Practise 3×3 row reduction on [A|I] until fluent; then focus on symbolic manipulations of (AB)⁻¹, (Aᵀ)⁻¹, and verifying AA⁻¹=I.

---

### Determinant

*Concept ID: `math.linalg.determinant` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 6h*

**Learning objective.** Compute determinants of 2×2 and 3×3 matrices, interpret the determinant geometrically as a signed volume, and connect det(A)≠0 to invertibility.

A scalar function det: Mₙ(F) → F satisfying: multilinearity in rows, alternating (swap changes sign), det(I)=1. det(A)≠0 iff A invertible. Geometric meaning: signed volume of parallelepiped formed by rows.

The determinant det(A) is a scalar assigned to every square matrix satisfying three axioms: multilinearity in rows, alternating (row swap changes sign), and det(I)=1. For 2×2: det([[a,b],[c,d]])=ad−bc. For 3×3: cofactor expansion along any row or column. Geometrically, |det(A)| = signed volume of the parallelepiped spanned by the rows; det=0 iff the rows are linearly dependent (the shape collapses).

**Key ideas**

- 2×2 formula: det([[a,b],[c,d]]) = ad−bc (product of diagonals minus product of off-diagonals)
- det(A)≠0 iff A is invertible iff columns (rows) are linearly independent
- Geometric meaning: |det| = volume of parallelepiped; sign indicates orientation
- Cofactor expansion: det = Σⱼ aᵢⱼ Cᵢⱼ along any row i (or column)
- Row operations: swap changes sign, scale row by c multiplies det by c, adding row multiple leaves det unchanged

**Vocabulary**

- **determinant** — A scalar function det: Mₙ(F)→F characterised by multilinearity, alternating, and det(I)=1
- **cofactor Cᵢⱼ** — (−1)^(i+j) times the minor Mᵢⱼ (determinant of the submatrix with row i and column j deleted)
- **minor Mᵢⱼ** — Determinant of the (n−1)×(n−1) submatrix obtained by deleting row i and column j
- **singular** — Square matrix with det=0; not invertible

**Common misconceptions**

- *Misconception:* det(A+B) = det(A) + det(B).
  *Correction:* Determinant is multilinear in rows, not additive in matrices. Counterexample: A=B=I₂, det(A+B)=det(2I)=4≠1+1=2.
- *Misconception:* A large determinant means the matrix is well-conditioned.
  *Correction:* The determinant depends on scale (det(cA)=cⁿdet(A)); conditioning is measured by the condition number, not the determinant.
- *Misconception:* The determinant can only be expanded along row 1.
  *Correction:* Cofactor expansion works along any row or column — choosing a row/column with zeros makes computation easier.

**Common mistakes in practice**

- Wrong sign pattern for cofactors: forgetting the (−1)^(i+j) checkerboard
- Computing det(A+B) = det(A)+det(B) — determinant is NOT linear in the full matrix
- Confusing det(cA)=c·det(A) with det(cA)=cⁿ·det(A) for n×n matrices

**Visual teaching opportunities**

- Animate how det([[a,b],[c,d]]) = area of parallelogram spanned by (a,b) and (c,d) in ℝ²
- Show the 'Sarrus's rule' arrow diagram for 3×3 determinants as a mnemonic
- Demonstrate that swapping two rows reflects the parallelogram, flipping the orientation (sign changes)

**Worked example**

*Setup:* Compute det(B) for B = [[1,2,3],[0,1,4],[5,6,0]] by cofactor expansion along row 1, then verify the geometric interpretation.

1. Step 1: Expand along row 1: det(B) = 1·C₁₁ + 2·C₁₂ + 3·C₁₃. Why: row 1 has no zeros, so all three terms contribute.
2. Step 2: C₁₁ = (+1)·det([[1,4],[6,0]]) = +(1·0 − 4·6) = −24.
3. Step 3: C₁₂ = (−1)·det([[0,4],[5,0]]) = −(0·0 − 4·5) = −(−20) = 20.
4. Step 4: C₁₃ = (+1)·det([[0,1],[5,6]]) = +(0·6 − 1·5) = −5.
5. Step 5: det(B) = 1·(−24) + 2·20 + 3·(−5) = −24 + 40 − 15 = 1.
6. Step 6: Verification by column 3 expansion: 3·(−5)+4·C₂₃+0·C₃₃; C₂₃=(−1)·det([[1,2],[5,6]])=−(6−10)=4; total = −15+4·4+0 = −15+16=1 ✓.

*Outcome:* det(B) = 1 ≠ 0, so B is invertible. The signed unit volume confirms the rows form a non-degenerate parallelepiped in ℝ³.

**Real-world intuition**

- Computer graphics: det of a transformation matrix gives area/volume scaling factor
- Solving 2×2 systems in physics: Cramer's rule uses the determinant
- Stability analysis: det of Jacobian matrix determines if a critical point is a fixed point or saddle

**Practice progression**

Item types: 2×2 determinants by formula, 3×3 determinants by cofactor expansion (choose efficient row/column), Use det to classify a matrix as invertible or singular, Compute det after row operations (track sign changes), Geometric: find the area/volume given a set of vectors, Prove det(Aᵀ)=det(A) using the cofactor definition. Suggested item count: 6.

2×2 formula → 3×3 cofactor expansion → strategic row/column choice → row-operation efficiency → geometric interpretation

**Assessment objectives**

Formats: Compute 3×3 determinant showing cofactor expansion steps, True/false on determinant properties, Geometric area/volume problem using det. Bloom alignment: apply.

Mastery signal: Correctly computes a 3×3 determinant by cofactor expansion along a chosen row/column, gets the correct scalar, and interprets its sign.

**Teacher notes**

Use the geometric picture (area/volume) to motivate why det=0 corresponds to a collapsed shape — the rows are linearly dependent and the parallelepiped has zero volume. This gives students an intuition before the algebraic definition.

**Student notes**

Always choose the row or column with the most zeros for cofactor expansion — this minimises computation. For row-reduced matrices, the determinant is the product of the diagonal (pivot) entries.

**Prerequisite graph**

- Requires: math.linalg.matrix-multiplication
- Unlocks (future prerequisite links): math.linalg.matrix-inverse, math.linalg.eigenvalues, math.linalg.cramer-rule
- Cross-topic connections (graph cross-links): none
- Narrative: Determinant connects directly to invertibility (det≠0), Cramer's Rule (explicit formula for solutions), eigenvalues (det(A−λI)=0 is the characteristic equation), and the cross product (3×3 determinant form).

**Teaching hints — review triggers**

- Arithmetic errors in 2×2 sub-determinants → review 2×2 formula
- Sign errors in cofactors → review the (−1)^(i+j) checkerboard pattern
- Confusion about row vs. column expansion → review cofactor definition

**Spaced repetition / revision guidance**

Drill cofactor expansion for 3×3 matrices until the (−1)^(i+j) sign pattern is automatic; then practise choosing the row or column with the fewest nonzero entries to minimise arithmetic.

---

### Cofactor Expansion

*Concept ID: `math.linalg.cofactor-expansion` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 3h*

**Learning objective.** Apply cofactor (Laplace) expansion along any chosen row or column to compute a determinant, and express the result using the cofactor formula det(A)=Σⱼ aᵢⱼCᵢⱼ.

det(A) = ∑_j a_{ij}C_{ij} along any row or column, where C_{ij}=(−1)^{i+j}M_{ij} is the cofactor and M_{ij} is the (i,j) minor. Efficient for small matrices; O(n!) complexity — not used for large n.

Cofactor expansion expresses an n×n determinant as a weighted sum of (n−1)×(n−1) determinants. The cofactor Cᵢⱼ=(−1)^(i+j)Mᵢⱼ, where Mᵢⱼ is the minor (determinant of the submatrix with row i and column j deleted). Expanding along row i: det(A)=Σⱼ aᵢⱼCᵢⱼ. The result is independent of the chosen row or column. Complexity is O(n!) — cofactor expansion is practical only for small matrices (n≤4); Gaussian elimination is used for larger n.

**Key ideas**

- Minor Mᵢⱼ: determinant of the submatrix formed by deleting row i and column j
- Cofactor Cᵢⱼ = (−1)^(i+j)·Mᵢⱼ — the sign alternates in a checkerboard pattern
- Expansion is independent of which row or column is chosen — exploit zeros to minimise work
- For a 3×3 matrix: 3 cofactors each requiring a 2×2 determinant
- Adjugate (adj A) = matrix of cofactors transposed; A⁻¹ = adj(A)/det(A)

**Vocabulary**

- **minor Mᵢⱼ** — Determinant of the submatrix obtained by deleting row i and column j from A
- **cofactor Cᵢⱼ** — (−1)^(i+j)·Mᵢⱼ; the signed minor
- **cofactor expansion (Laplace expansion)** — det(A) = Σⱼ aᵢⱼCᵢⱼ for any chosen row i
- **adjugate (adj A)** — The transpose of the cofactor matrix; satisfies A·adj(A) = det(A)·I

**Common misconceptions**

- *Misconception:* The cofactor sign (−1)^(i+j) applies to the full term aᵢⱼCᵢⱼ, not just the minor.
  *Correction:* The cofactor Cᵢⱼ already includes (−1)^(i+j); the expansion term is aᵢⱼ times Cᵢⱼ, where Cᵢⱼ=(−1)^(i+j)·Mᵢⱼ. Do not apply the sign twice.
- *Misconception:* The result of cofactor expansion depends on which row or column you expand along.
  *Correction:* Any row or column gives the same determinant. This is a theorem — check by expanding a 3×3 along two different rows.
- *Misconception:* Cofactor expansion is practical for large matrices.
  *Correction:* Cofactor expansion has O(n!) complexity; for n=20 this is astronomically large. Row reduction (O(n³)) is used for n≥5.

**Common mistakes in practice**

- Using the wrong sign for a cofactor (off by one in the checkerboard)
- Deleting the wrong row or column when constructing the minor
- Confusing the minor (unsigned) with the cofactor (signed)

**Visual teaching opportunities**

- Draw the sign checkerboard (+ − + / − + − / + − +) for a 3×3 matrix and identify which entries get which sign
- Highlight in colour which rows/columns are deleted when computing each minor
- Show side-by-side: expand along row 1 vs. column 2 — same answer from both

**Worked example**

*Setup:* Compute det(A) for A = [[1,2,3],[4,5,6],[7,8,10]] by cofactor expansion along row 1, then verify by expanding along column 3.

1. Step 1: Expand along row 1: det = a₁₁C₁₁ + a₁₂C₁₂ + a₁₃C₁₃.
2. Step 2: C₁₁ = (+1)·det([[5,6],[8,10]]) = +(50−48) = 2.
3. Step 3: C₁₂ = (−1)·det([[4,6],[7,10]]) = −(40−42) = −(−2) = 2.
4. Step 4: C₁₃ = (+1)·det([[4,5],[7,8]]) = +(32−35) = −3.
5. Step 5: det = 1·2 + 2·2 + 3·(−3) = 2 + 4 − 9 = −3.
6. Step 6: Verify by expanding along column 3: det = 3·C₁₃ + 6·C₂₃ + 10·C₃₃. C₂₃=(−1)·det([[1,2],[7,8]])=−(8−14)=6; C₃₃=(+1)·det([[1,2],[4,5]])=(5−8)=−3. Total = 3·(−3)+6·6+10·(−3) = −9+36−30 = −3 ✓.

*Outcome:* det(A) = −3, confirmed by both row-1 and column-3 expansion. The row/column independence property is directly demonstrated.

**Real-world intuition**

- Computing the adjugate for explicit matrix inverse formulas in symbolic algebra systems
- Deriving the characteristic polynomial det(A−λI) for eigenvalue computation
- Cross product in ℝ³ is formally a cofactor expansion of a symbolic 3×3 determinant

**Practice progression**

Item types: 3×3 cofactor expansion along a specified row, 3×3 cofactor expansion — choose the easiest row/column, 4×4 cofactor expansion reducing to 3×3 sub-determinants, Construct the cofactor matrix (adj A) for a 3×3 matrix, Use adj A to find A⁻¹ = adj(A)/det(A), Explain why cofactor expansion is impractical for n=10. Suggested item count: 6.

3×3 specified row → 3×3 strategic choice → 4×4 two-level expansion → adjugate and inverse

**Assessment objectives**

Formats: 3×3 cofactor expansion with all steps shown, Fill-in: cofactor sign checkerboard, Choose optimal expansion row/column and justify. Bloom alignment: apply.

Mastery signal: Correctly identifies cofactor signs, computes all minors, and assembles the determinant; arrives at the same answer when expanding along a second row/column.

**Teacher notes**

Practise the sign checkerboard until it is automatic. Emphasise the strategic choice of expansion row/column: a row with many zeros reduces three 2×2 computations to one.

**Student notes**

If a row or column has a zero in position (i,j), the term aᵢⱼCᵢⱼ = 0 — skip it entirely. Always look for the row or column with the most zeros before expanding.

**Prerequisite graph**

- Requires: math.linalg.determinant
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Cofactor expansion is the theoretical foundation for Cramer's Rule and the adjugate inverse. The cross product in ℝ³ uses the same expansion pattern with unit vectors e₁, e₂, e₃ in the first row.

**Teaching hints — review triggers**

- Sign errors in cofactors → review the (−1)^(i+j) pattern
- Errors in 2×2 minors → review 2×2 determinant formula
- Confusion about which entries to delete → review minor definition

**Spaced repetition / revision guidance**

Compute at least three 3×3 determinants using cofactor expansion, each time verifying by expanding along a second row/column. Then do one 4×4 example to feel the O(n!) growth.

---

### Properties of Determinants

*Concept ID: `math.linalg.det-properties` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** State and apply the key properties of determinants — multiplicativity, transpose invariance, effect of row operations — and use them to evaluate determinants without full cofactor expansion.

Key properties: det(AB)=det(A)det(B), det(Aᵀ)=det(A), det(cA)=cⁿdet(A), det(A⁻¹)=1/det(A). Row operations: swap changes sign, scaling multiplies det by scalar, adding row multiples leaves det unchanged.

Key properties of det: (1) det(AB)=det(A)det(B); (2) det(Aᵀ)=det(A); (3) det(cA)=cⁿdet(A) for n×n A; (4) det(A⁻¹)=1/det(A) when A invertible. Row operations: swapping two rows changes sign; scaling a row by c multiplies det by c; adding a multiple of one row to another leaves det unchanged. These properties convert row reduction into an efficient determinant algorithm: det(A) = product of pivots × (sign corrections from swaps) × (reciprocal of any row scalings).

**Key ideas**

- det(AB) = det(A)·det(B) — the determinant is a group homomorphism on invertible matrices
- det(Aᵀ) = det(A) — rows and columns play symmetric roles
- det(cA) = cⁿ·det(A) for n×n matrices (the c comes out n times, once per row)
- Row swap ↔ sign change; row scaling by c ↔ multiply det by c; row addition ↔ no change
- For triangular matrices: det = product of diagonal entries

**Vocabulary**

- **multiplicativity** — det(AB) = det(A)·det(B) — determinant is a ring homomorphism from invertible matrices to scalars
- **alternating** — Swapping any two rows changes the sign of the determinant; det=0 if two rows are equal
- **triangular matrix determinant** — det of a triangular matrix = product of diagonal entries
- **row operations and det** — Row swap: sign change; row scale by c: multiply det by c; row addition: no change

**Common misconceptions**

- *Misconception:* det(cA) = c·det(A).
  *Correction:* For an n×n matrix, each of the n rows is scaled by c, giving det(cA) = cⁿ·det(A). For 2×2: det(2A) = 4·det(A), not 2·det(A).
- *Misconception:* det(A+B) = det(A) + det(B).
  *Correction:* Determinant is not additive. Counterexample: det(I+I) = det(2I) = 2ⁿ ≠ 1+1 = 2 for n≥2.
- *Misconception:* Row addition changes the determinant.
  *Correction:* Adding c times row i to row j leaves the determinant unchanged — this is why Gaussian elimination works without tracking det changes from these steps.

**Common mistakes in practice**

- Using det(cA)=c·det(A) instead of cⁿ·det(A)
- Forgetting to account for row swaps when computing det via row reduction
- Assuming det(A+B)=det(A)+det(B) (not true)

**Visual teaching opportunities**

- Table of the three elementary row operations and their effect on det
- Diagram: det(AB) = det(A)·det(B) as composition of volume scaling
- Worked example tracing det through row reduction: mark each swap, mark pivot values

**Worked example**

*Setup:* For A=[[1,2],[3,4]] and B=[[2,0],[1,3]], verify det(AB)=det(A)·det(B), det(Aᵀ)=det(A), and det(2A)=2²·det(A).

1. Step 1: det(A) = 1·4 − 2·3 = 4 − 6 = −2.
2. Step 2: det(B) = 2·3 − 0·1 = 6.
3. Step 3: Compute AB = [[1·2+2·1, 1·0+2·3],[3·2+4·1, 3·0+4·3]] = [[4,6],[10,12]].
4. Step 4: det(AB) = 4·12 − 6·10 = 48 − 60 = −12 = (−2)·6 = det(A)·det(B) ✓.
5. Step 5: Aᵀ = [[1,3],[2,4]]; det(Aᵀ) = 1·4 − 3·2 = 4 − 6 = −2 = det(A) ✓.
6. Step 6: 2A = [[2,4],[6,8]]; det(2A) = 2·8 − 4·6 = 16 − 24 = −8 = 2²·(−2) = −8 ✓.

*Outcome:* All three properties verified: multiplicativity, transpose invariance, and scaling by cⁿ. These properties are useful shortcuts: to find det of a product, multiply the individual determinants without computing AB.

**Real-world intuition**

- Gaussian elimination efficiency: row additions don't change det, so pivot product gives det in O(n³)
- Orientation in geometry: det(AB) = (orientation of A)×(orientation of B)
- Change-of-variables in integration: |det(Jacobian)| is the volume scaling factor

**Practice progression**

Item types: Compute det(AB) without computing AB, Find det(cA) given det(A) and n, Track det through a sequence of row operations, Prove det(A⁻¹)=1/det(A) using det(AA⁻¹)=det(I)=1, Determine det of a triangular matrix by inspection, Use row operations to simplify a 3×3 det before expanding. Suggested item count: 6.

Direct property applications → multi-step det without computing AB → symbolic proof → row-operation efficiency

**Assessment objectives**

Formats: Given det(A) and det(B), find det of combinations, Proof: det(Aᵀ)=det(A), Row operation sequence tracking det. Bloom alignment: apply.

Mastery signal: Correctly applies det(AB)=det(A)det(B), det(cA)=cⁿdet(A), and the three row-operation rules without computing entries directly.

**Teacher notes**

The row-operation rules are the key to efficient determinant computation via Gaussian elimination. Emphasise: adding a multiple of one row to another never changes the determinant — this is why pivot products give det.

**Student notes**

Use the property det(AB)=det(A)det(B) to compute complex determinants without expanding matrices. For triangular matrices, just read off the diagonal.

**Prerequisite graph**

- Requires: math.linalg.determinant
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: det properties underpin the proof that det(A−λI)=0 characterises eigenvalues, the Jacobian formula in multivariable calculus, and the change-of-variables theorem for multiple integrals.

**Teaching hints — review triggers**

- Confusion about cⁿ vs. c → review the definition of det as multilinear in rows
- Errors in det(AB) → review the determinant multiplicativity proof
- Forgetting sign changes from row swaps → review elementary row operations

**Spaced repetition / revision guidance**

Write out the three row-operation rules and their det effects from memory, then practise computing a 4×4 determinant using only row additions to create zeros, then reading off the triangular product.

---

### Cramer's Rule

*Concept ID: `math.linalg.cramer-rule` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 2h*

**Learning objective.** Apply Cramer's Rule to express each solution component of Ax=b as a ratio of determinants, and understand both its theoretical importance and computational limitations.

For Ax=b with det(A)≠0, xᵢ = det(Aᵢ)/det(A), where Aᵢ replaces column i with b. Theoretically important (explicit formula), computationally impractical for large n.

For an invertible n×n system Ax=b (det(A)≠0), Cramer's Rule gives xᵢ = det(Aᵢ)/det(A), where Aᵢ is the matrix A with column i replaced by b. This formula is an exact, closed-form solution — theoretically elegant and useful for deriving sensitivity formulas. However, it requires computing n+1 determinants of size n×n, making it O(n·n!) — impractical for n≥4 compared to Gaussian elimination O(n³).

**Key ideas**

- xᵢ = det(Aᵢ)/det(A), where Aᵢ = A with column i replaced by b
- Requires det(A)≠0 (unique solution exists) — same condition as invertibility
- Theoretically gives an explicit formula; useful for 2×2 and 3×3 systems
- Impractical for large n: n+1 determinant computations of size n — use Gaussian elimination instead
- Follows from A⁻¹ = adj(A)/det(A): Cramer's Rule is the entry form of x = A⁻¹b

**Vocabulary**

- **Cramer's Rule** — xᵢ = det(Aᵢ)/det(A) where Aᵢ replaces column i of A with b; valid when det(A)≠0
- **Aᵢ** — Matrix formed by replacing column i of A with the right-hand side vector b
- **closed-form solution** — An explicit formula expressing the answer in terms of the input data (here, determinants)

**Common misconceptions**

- *Misconception:* Cramer's Rule works for any system Ax=b.
  *Correction:* Cramer's Rule requires a square matrix with det(A)≠0. For singular or non-square systems, use Gaussian elimination.
- *Misconception:* Cramer's Rule is the most efficient way to solve linear systems.
  *Correction:* It has O(n·n!) complexity — exponential. Gaussian elimination is O(n³) and is the practical algorithm for n≥4.
- *Misconception:* Aᵢ replaces row i with b.
  *Correction:* Aᵢ replaces COLUMN i with b, not row i. The right-hand side b is a column vector.

**Common mistakes in practice**

- Replacing row i instead of column i with b when forming Aᵢ
- Forgetting to check det(A)≠0 before applying the rule
- Using Cramer's Rule on a non-square system

**Visual teaching opportunities**

- Show the column-replacement construction for a 2×2 system with explicit matrices drawn side by side
- Table comparing Cramer vs. Gaussian: operations count, when each is preferred
- Demonstrate for a 2×2 system: area interpretation of det(A₁)/det(A)

**Worked example**

*Setup:* Solve the system 2x+y=5, x+2y=4 using Cramer's Rule. Write A=[[2,1],[1,2]], b=(5,4)ᵀ.

1. Step 1: Compute det(A) = 2·2 − 1·1 = 4 − 1 = 3 ≠ 0. Why: must confirm det≠0 before applying Cramer's Rule.
2. Step 2: Form A₁ by replacing column 1 with b: A₁ = [[5,1],[4,2]]. Compute det(A₁) = 5·2 − 1·4 = 10 − 4 = 6.
3. Step 3: x₁ = det(A₁)/det(A) = 6/3 = 2.
4. Step 4: Form A₂ by replacing column 2 with b: A₂ = [[2,5],[1,4]]. Compute det(A₂) = 2·4 − 5·1 = 8 − 5 = 3.
5. Step 5: x₂ = det(A₂)/det(A) = 3/3 = 1.
6. Step 6: Verify: 2·2+1·1 = 5 ✓; 1·2+2·1 = 4 ✓.

*Outcome:* Solution x=(2,1). Cramer's Rule confirms the unique solution directly from ratios of determinants, with full verification.

**Real-world intuition**

- Symbolic computation: deriving closed-form solutions in terms of parameters (control theory)
- Sensitivity analysis: small change Δb leads to Δxᵢ = det(ΔAᵢ)/det(A)
- Teaching context: historical importance as the first explicit linear system solver

**Practice progression**

Item types: 2×2 system by Cramer's Rule, 3×3 system by Cramer's Rule (one component only), Explain why Cramer's Rule fails when det(A)=0, Compare Cramer vs. Gaussian on a 3×3 system: operation count, Derive x=A⁻¹b = adj(A)b/det(A) and relate to Cramer's Rule, Use Cramer's Rule to find a symbolic expression for x in terms of parameters. Suggested item count: 6.

2×2 numerical → 3×3 one component → symbolic → comparison and critique

**Assessment objectives**

Formats: 2×2 or 3×3 Cramer's Rule computation, Identify when Cramer's Rule cannot be applied, Explain computational disadvantage relative to Gaussian elimination. Bloom alignment: apply.

Mastery signal: Correctly applies Cramer's Rule to a 2×2 system with verification, and articulates the O(n!) limitation that makes it impractical for large n.

**Teacher notes**

Cramer's Rule is historically important and theoretically illuminating (it makes the adjugate inverse explicit), but should be taught alongside its limitations. Students must understand Gaussian elimination is the practical algorithm.

**Student notes**

For 2×2 systems, Cramer's Rule is often faster than Gaussian elimination. For 3×3 and beyond, Gaussian elimination is preferred. Always check det(A)≠0 first.

**Prerequisite graph**

- Requires: math.linalg.determinant, math.linalg.matrix-inverse
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Cramer's Rule follows directly from A⁻¹=adj(A)/det(A). It is the explicit entry-wise form of x=A⁻¹b. The adjugate formula for A⁻¹ in turn uses cofactor expansion.

**Teaching hints — review triggers**

- Confusion about column replacement → review augmented matrix construction
- Errors in 2×2 or 3×3 determinants → review cofactor expansion
- Applying Cramer's Rule to a singular system → review invertibility conditions

**Spaced repetition / revision guidance**

Practise on 2×2 and small 3×3 systems. Then write out the derivation: x=A⁻¹b=adj(A)b/det(A), and identify the ith component as det(Aᵢ)/det(A).

---

### LU Factorization

*Concept ID: `math.linalg.lu-factorization` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Factor a square matrix as A=LU (lower × upper triangular) using Gaussian elimination, and use the factorization to solve Ax=b via forward and back substitution.

Decomposes A=LU (or PA=LU with pivoting), where L is lower triangular and U is upper triangular. Enables efficient solution of multiple systems with the same A via forward/back substitution.

LU factorisation decomposes A into a lower-triangular L (with 1s on diagonal) and upper-triangular U (the row-echelon form of A). The multipliers used during Gaussian elimination become the entries of L below the diagonal. Once A=LU, Ax=b is split into two triangular systems: Ly=b (forward substitution, O(n²)) and Ux=y (back substitution, O(n²)). For multiple right-hand sides with the same A, factor once (O(n³)) and solve each b cheaply. With partial pivoting: PA=LU.

**Key ideas**

- L stores the elimination multipliers ℓᵢⱼ = aᵢⱼ/aⱼⱼ (multiplier for eliminating row i using row j)
- U is the row echelon form obtained by Gaussian elimination without pivoting
- Solve Ax=b: forward-solve Ly=b, then back-solve Ux=y
- Key advantage: factor A=LU once (O(n³)), then solve for multiple b in O(n²) each
- Partial pivoting PA=LU is needed for numerical stability when a pivot is zero or near-zero

**Vocabulary**

- **LU factorisation** — A = LU where L is unit lower triangular and U is upper triangular (row echelon form of A)
- **unit lower triangular** — Lower triangular matrix with 1s on the diagonal
- **multiplier ℓᵢⱼ** — The factor aᵢⱼ/aⱼⱼ used to eliminate entry (i,j) in Gaussian elimination; becomes the (i,j) entry of L
- **PA=LU** — LU factorisation with partial pivoting (permutation matrix P tracks row swaps)

**Common misconceptions**

- *Misconception:* L has zeroes on the diagonal.
  *Correction:* L is lower triangular with 1s on the diagonal (unit lower triangular). The diagonal entries of A appear in U, not L.
- *Misconception:* Any matrix has an LU factorisation without pivoting.
  *Correction:* If a pivot is zero during elimination, the factorisation fails without row swaps. Partial pivoting (PA=LU) handles this and is used in practice.
- *Misconception:* LU factorisation is slower than Gaussian elimination.
  *Correction:* LU IS Gaussian elimination — L records what was done and U is the result. The factorisation costs O(n³) once; solving additional systems then costs only O(n²) each.

**Common mistakes in practice**

- Forgetting the 1s on the diagonal of L
- Placing multipliers in the wrong position in L (row and column indices mixed up)
- Trying LU on a matrix that needs pivoting without checking for zero pivots

**Visual teaching opportunities**

- Side-by-side: Gaussian elimination steps on A vs. the construction of L and U simultaneously
- Show the forward/back substitution as two triangular arrow diagrams
- Motivation: solve the same 3×3 system for 3 different right-hand sides to show the cost saving

**Worked example**

*Setup:* Factor A = [[2,1,1],[4,3,3],[8,7,9]] = LU using Gaussian elimination, then solve Ax = (4,10,24)ᵀ via Ly=b and Ux=y.

1. Step 1: R₂ ← R₂ − 2R₁ (ℓ₂₁=4/2=2): A becomes [[2,1,1],[0,1,1],[8,7,9]].
2. Step 2: R₃ ← R₃ − 4R₁ (ℓ₃₁=8/2=4): A becomes [[2,1,1],[0,1,1],[0,3,5]].
3. Step 3: R₃ ← R₃ − 3R₂ (ℓ₃₂=3/1=3): A becomes [[2,1,1],[0,1,1],[0,0,2]] = U.
4. Step 4: L = [[1,0,0],[2,1,0],[4,3,1]] with multipliers placed below diagonal. Verify LU = [[2,1,1],[4,3,3],[8,7,9]] = A ✓.
5. Step 5: Forward-solve Ly = (4,10,24)ᵀ: y₁=4; 2y₁+y₂=10 → y₂=2; 4y₁+3y₂+y₃=24 → y₃=24−16−6=2. So y=(4,2,2)ᵀ.
6. Step 6: Back-solve Ux = y: 2x₃=2 → x₃=1; x₂+x₃=2 → x₂=1; 2x₁+x₂+x₃=4 → 2x₁=2 → x₁=1. So x=(1,1,1)ᵀ. Verify: A·(1,1,1)ᵀ=(4,10,24)ᵀ ✓.

*Outcome:* L=[[1,0,0],[2,1,0],[4,3,1]], U=[[2,1,1],[0,1,1],[0,0,2]], solution x=(1,1,1)ᵀ verified.

**Real-world intuition**

- Scientific computing: LAPACK's core routine; used in every large-scale linear system solver
- FEM simulations: same stiffness matrix inverted for many load vectors
- Machine learning: Gaussian processes use Cholesky (a symmetric LU variant) to solve covariance-system equations

**Practice progression**

Item types: 2×2 LU factorisation, 3×3 LU factorisation, Solve Ax=b using precomputed LU, Solve for two different right-hand sides using the same LU, Compute det(A) from U (product of U diagonal), Identify when pivoting (PA=LU) is needed. Suggested item count: 6.

2×2 factor + solve → 3×3 factor + solve → multiple RHS → det via U → pivoting case

**Assessment objectives**

Formats: Factor a 3×3 matrix as LU, verify LU=A, Use LU to solve Ax=b with full forward/back substitution, Explain computational advantage for multiple right-hand sides. Bloom alignment: apply.

Mastery signal: Correctly extracts L (with multipliers) and U (row echelon), verifies LU=A, and solves Ax=b by two triangular systems with no arithmetic errors.

**Teacher notes**

Emphasise that LU IS Gaussian elimination, just recorded differently. The multipliers that are thrown away in basic elimination are exactly the entries of L. This helps students understand why L is always unit lower triangular.

**Student notes**

Write multipliers into L as you compute them during elimination; when you finish, U is the final upper triangular form. Then solve two simple triangular systems instead of re-running elimination for each b.

**Prerequisite graph**

- Requires: math.linalg.row-reduction, math.linalg.matrix-multiplication
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.num.lu-factorization
- Narrative: LU is the efficiency form of row reduction (Gaussian elimination). It connects to Cholesky factorisation (symmetric positive-definite case), determinant computation (det(A)=det(U)=product of pivots), and PLU factorisation (with partial pivoting for numerical stability).

**Teaching hints — review triggers**

- Incorrect multiplier computation → review Gaussian elimination pivot step
- Forward/back substitution errors → review triangular system solving
- Confusion about which entries go in L vs. U → review unit lower triangular definition

**Spaced repetition / revision guidance**

Practise by doing full Gaussian elimination on a 3×3 matrix while simultaneously writing the multipliers into L. Then solve two different right-hand sides to feel the cost saving.

---

### Vector Space

*Concept ID: `math.linalg.vector-space` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** State the eight vector space axioms, verify that a given set with operations forms a vector space, and identify standard examples including ℝⁿ, polynomial spaces, and function spaces.

A set V with vector addition and scalar multiplication satisfying 8 axioms (closure, commutativity, associativity, identity, inverses, scalar distributivity, vector distributivity, unit scalar). Examples: ℝⁿ, polynomials, function spaces.

A vector space (V, +, ·) over a field F (usually ℝ) is a set V with two operations — vector addition and scalar multiplication — satisfying eight axioms: (1) commutativity of addition, (2) associativity of addition, (3) existence of zero vector, (4) existence of additive inverses, (5) closure under scalar multiplication, (6) distributivity over vector addition, (7) distributivity over scalar addition, (8) unit scalar. Key examples: ℝⁿ, Pₙ (polynomials of degree ≤n), C[a,b] (continuous functions), Mₘₓₙ (matrices). The abstract definition unifies all these cases.

**Key ideas**

- The eight axioms are necessary and sufficient: any set with + and · satisfying them is a vector space
- ℝⁿ is the canonical example; polynomials Pₙ and function spaces are equally valid
- The zero vector 0 is unique; the additive inverse −v is unique
- 0·v = 0 and (−1)·v = −v follow from the axioms, not assumed separately
- A subset W of V is a subspace iff it contains 0 and is closed under + and scalar ·

**Vocabulary**

- **vector space** — A set V with operations + and · over field F satisfying the eight axioms
- **zero vector** — The unique element 0∈V such that v+0=v for all v∈V
- **additive inverse** — For each v∈V, the unique −v∈V such that v+(−v)=0
- **field** — A set with + and · satisfying all arithmetic laws; ℝ and ℂ are the most common scalars for vector spaces

**Common misconceptions**

- *Misconception:* A vector space must consist of geometric vectors (arrows in space).
  *Correction:* Polynomials, matrices, continuous functions, and sequences all form vector spaces. 'Vector' is any element of a set satisfying the axioms.
- *Misconception:* Checking that addition and multiplication give vectors in V is sufficient to show it's a vector space.
  *Correction:* Closure alone is not sufficient; all eight axioms must hold. In particular, zero and additive inverses must exist in V.
- *Misconception:* The field of scalars must be ℝ.
  *Correction:* Scalars can be from any field (ℂ, ℚ, finite fields). The choice of field matters — ℝ² is different as a vector space over ℝ vs. over ℚ.

**Common mistakes in practice**

- Forgetting to verify that 0 is in the set (the most common failure for non-subspace candidates)
- Assuming closure under + is enough — also need closure under scalar multiplication and inverse existence
- Using 'vector' to mean only a tuple in ℝⁿ rather than any element of an abstract vector space

**Visual teaching opportunities**

- Table listing the eight axioms with an example from ℝ² for each
- Show P₂ = {a + bx + cx²} satisfying each axiom: addition gives a polynomial, scalar multiplication gives a polynomial, zero is the constant 0
- Side-by-side: ℝ², Mₘₓₙ, and C[0,1] — three very different-looking sets obeying the same axioms

**Worked example**

*Setup:* Show that the set of all 2×2 symmetric matrices S = {A∈M₂ₓ₂ : Aᵀ=A} forms a vector space over ℝ under ordinary matrix addition and scalar multiplication.

1. Step 1: Closure under addition. If Aᵀ=A and Bᵀ=B, then (A+B)ᵀ=Aᵀ+Bᵀ=A+B ✓. Why: the sum of symmetric matrices is symmetric.
2. Step 2: Closure under scalar multiplication. If Aᵀ=A, then (cA)ᵀ=cAᵀ=cA ✓. Why: scalar multiple of a symmetric matrix is symmetric.
3. Step 3: Zero vector. The 2×2 zero matrix 0 satisfies 0ᵀ=0 ✓, so 0∈S.
4. Step 4: Additive inverse. If Aᵀ=A, then (−A)ᵀ=−Aᵀ=−A ✓, so −A∈S.
5. Step 5: Commutativity, associativity, distributivity. These are inherited from M₂ₓ₂ (the parent vector space), so no separate check is needed.
6. Step 6: Conclusion. S contains 0, is closed under + and scalar ·, and inherits all remaining axioms from M₂ₓ₂. Therefore S is a vector space (in fact a subspace of M₂ₓ₂).

*Outcome:* S is a 3-dimensional vector space with basis {[[1,0],[0,0]], [[0,1],[1,0]], [[0,0],[0,1]]}. Confirming the axioms via closure + inherited properties is the standard proof method for subsets of known vector spaces.

**Real-world intuition**

- Signal processing: the space of bandlimited signals is a vector space — linear combinations of signals are signals
- Machine learning: function spaces (RKHS) underlie kernel methods; the axioms guarantee linear algebra tools apply
- Quantum mechanics: Hilbert space (infinite-dimensional vector space with inner product) is the state space of a quantum system

**Practice progression**

Item types: Verify ℝⁿ satisfies all eight axioms, Verify/refute: {(x,y): x²+y²≤1} is a vector space, Show P₂ is a vector space with specific zero and inverse, Identify which axiom fails for a non-example, Show the set of solutions to a homogeneous system is a vector space, Compare two abstract vector spaces: polynomials vs. functions. Suggested item count: 6.

ℝⁿ direct → subsets and non-examples → polynomial/matrix spaces → abstract function spaces

**Assessment objectives**

Formats: Verify all eight axioms for a given set, Identify which axiom fails for a non-example, Give three distinct examples of vector spaces not equal to ℝⁿ. Bloom alignment: understand.

Mastery signal: Correctly verifies closure, zero existence, and inverse existence for a non-obvious example (polynomials or matrices) and identifies the failing axiom in a non-example.

**Teacher notes**

Spend time on non-ℝⁿ examples — polynomials and function spaces are the most important for advanced mathematics. Students who can verify the axioms for C[a,b] truly understand the abstraction.

**Student notes**

When checking that a set is a vector space, the key tests are: (1) Is the zero vector in the set? (2) Is it closed under addition? (3) Is it closed under scalar multiplication? If the set is a subset of a known vector space, those three checks suffice.

**Prerequisite graph**

- Requires: math.linalg.vector-addition, math.linalg.scalar-multiplication, math.abst.field
- Unlocks (future prerequisite links): math.linalg.linear-map, math.linalg.inner-product-space
- Cross-topic connections (graph cross-links): math.abst.group-theory, math.fnal.normed-space
- Narrative: Vector spaces are the foundation for subspaces, span, linear independence, basis, dimension, and linear maps. The abstract definition also connects to group theory (V,+ is an abelian group) and field theory (the scalar field F).

**Teaching hints — review triggers**

- Confusion between closure and axiom-satisfaction → review all eight axioms explicitly
- Misidentifying the zero vector in a non-ℝⁿ example → review zero vector characterisation
- Confusing vector space with metric space → review that the eight axioms do not require distance

**Spaced repetition / revision guidance**

Memorise the eight axioms. Then practise verifying or falsifying them for at least three non-standard examples: a polynomial space, a matrix space, and a function space.

---

### Subspace

*Concept ID: `math.linalg.subspace` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Determine whether a subset of a vector space is a subspace using the three-part test, and identify key examples including null spaces and column spaces.

A subset W of a vector space V that is itself a vector space under the inherited operations. Equivalent condition: W is closed under addition and scalar multiplication and contains the zero vector.

A subset W of a vector space V is a subspace if it is itself a vector space under the same operations. The three-condition test (equivalent to all eight axioms): (1) 0∈W; (2) W is closed under addition (u,v∈W ⟹ u+v∈W); (3) W is closed under scalar multiplication (v∈W, c∈ℝ ⟹ cv∈W). Key examples: null space (Ax=0 solutions), column space, row space, and any span of vectors. A set failing any one condition is NOT a subspace.

**Key ideas**

- Three-condition subspace test: 0∈W, closed under +, closed under scalar ·
- If W is a subset of a known vector space V, these three conditions imply all eight axioms (inherited from V)
- The zero subspace {0} and V itself are always subspaces (trivial and improper subspaces)
- Failing to contain 0 is the quickest way to prove a subset is NOT a subspace
- Every subspace is a span: W = span{some vectors}

**Vocabulary**

- **subspace** — A subset W of a vector space V that is itself a vector space under the same operations; equivalently, contains 0 and is closed under + and ·
- **trivial subspace** — The subspace {0} containing only the zero vector
- **improper subspace** — The subspace V itself
- **affine subspace** — A translate of a subspace: {v₀ + w : w∈W}; NOT a subspace unless v₀=0

**Common misconceptions**

- *Misconception:* Any line through the origin in ℝ² is not a subspace.
  *Correction:* Any line through the origin in ℝ² IS a subspace: it contains 0, and sums and scalar multiples of vectors on the line stay on the line.
- *Misconception:* A subset that looks like a vector space (has the right 'shape') is automatically a subspace.
  *Correction:* The subset must contain the zero vector, be closed under both operations, and be a subset of V. A circle in ℝ² 'looks like' something but is not a subspace.
- *Misconception:* A subspace must contain finitely many vectors.
  *Correction:* Every subspace of ℝⁿ (except {0}) contains infinitely many vectors (all scalar multiples of any nonzero member).

**Common mistakes in practice**

- Checking closure under + but forgetting to verify 0∈W
- Confusing 'W is a vector space' with 'W is a subspace' — a subspace must be a subset of a specified parent space V
- Asserting a set is a subspace because it 'looks like' a plane or line without verifying the conditions

**Visual teaching opportunities**

- In ℝ²: draw lines through the origin (subspaces) vs. lines not through origin (not subspaces) — scalar multiple moves off the line
- Venn diagram: subspace W ⊂ vector space V, with {0} and V as the trivial bounding cases
- Check-list: three conditions with examples showing each can fail independently

**Worked example**

*Setup:* Determine whether (a) W₁ = {(x,y,z)∈ℝ³ : x+y+z=0} and (b) W₂ = {(x,y,z)∈ℝ³ : x+y+z=1} are subspaces of ℝ³.

1. Step 1 (W₁ — zero vector): (0,0,0): 0+0+0=0 ✓. So 0∈W₁.
2. Step 2 (W₁ — closed under +): If x₁+y₁+z₁=0 and x₂+y₂+z₂=0, then (x₁+x₂)+(y₁+y₂)+(z₁+z₂) = 0+0 = 0 ✓. So u+v∈W₁.
3. Step 3 (W₁ — closed under scalar ·): c(x+y+z) = c·0 = 0 ✓. So cv∈W₁.
4. Conclusion: W₁ is a subspace of ℝ³ (it is the plane through the origin with normal (1,1,1)).
5. Step 4 (W₂ — zero vector check): (0,0,0): 0+0+0=0 ≠ 1. So 0∉W₂.
6. Conclusion: W₂ is NOT a subspace — it fails condition (1). It is an affine plane (a translate of W₁) but not a vector subspace.

*Outcome:* W₁ is a subspace; W₂ is not. The zero-vector test is often the fastest way to eliminate non-subspace candidates.

**Real-world intuition**

- Solutions to homogeneous differential equations form a subspace — superposition applies
- Null space of a matrix: all solutions to Ax=0 form a subspace; this is the kernel of the linear map
- In data science: the column space of the data matrix defines the feasible prediction space in linear regression

**Practice progression**

Item types: Is a given plane or line in ℝ³ a subspace?, Verify/refute: {polynomials of degree exactly 2} is a subspace of P₃, Show the solution set of a homogeneous system is a subspace, Show the solution set of Ax=b (b≠0) is NOT a subspace, Identify all subspaces of ℝ¹ and ℝ², Prove intersection of two subspaces is a subspace. Suggested item count: 6.

ℝ² subspace check → ℝ³ planes and lines → polynomial subspaces → proof of intersection theorem

**Assessment objectives**

Formats: Subspace test on a described set, Counterexample: which condition fails?, Proof: solution set of Ax=0 is a subspace. Bloom alignment: understand.

Mastery signal: Applies all three conditions correctly, identifies which condition fails for a non-subspace, and explains the geometric meaning in ℝ³.

**Teacher notes**

The zero-vector check is the fastest elimination tool. Emphasise the contrast between W₁={x+y+z=0} (subspace) and W₂={x+y+z=1} (affine, not a subspace) — they look geometrically similar but differ algebraically.

**Student notes**

Always check 0∈W first. If the set is described by an equation, substitute (0,0,...,0) — if it doesn't satisfy the equation with zero right-hand side, it's immediately not a subspace.

**Prerequisite graph**

- Requires: math.linalg.vector-space
- Unlocks (future prerequisite links): math.linalg.null-space, math.linalg.column-space
- Cross-topic connections (graph cross-links): none
- Narrative: Subspaces are where linear algebra 'lives': null space (kernel), column space (image), row space are all subspaces. Basis and dimension are defined for subspaces. Every subspace equals the span of some set of vectors.

**Teaching hints — review triggers**

- Failure to recognise that {0} must belong to the set → review zero vector requirement
- Errors in closure check → review definition of closed under + and ·
- Confusion with affine subsets (W={v: Av=b, b≠0}) → review why b≠0 violates zero-vector condition

**Spaced repetition / revision guidance**

Practise the three-condition test on at least five different sets in ℝ³ (planes through origin, planes not through origin, lines, curves). For each, identify which conditions hold or fail.

---

### Span

*Concept ID: `math.linalg.span` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Compute the span of a set of vectors as the set of all linear combinations, determine whether a given vector lies in a span, and connect span to the smallest subspace containing the set.

span(S) = the set of all linear combinations of vectors in S. The smallest subspace containing S. A set spans V iff every vector in V can be expressed as a linear combination of vectors in S.

The span of a set S={v₁,…,vₖ} is span(S) = {c₁v₁+…+cₖvₖ : c₁,…,cₖ∈ℝ} — the set of all linear combinations of vectors in S. span(S) is always a subspace (the smallest subspace containing every vector in S). Geometrically: span of one nonzero vector is a line; span of two linearly independent vectors is a plane; span of n linearly independent vectors in ℝⁿ is all of ℝⁿ. To test whether b∈span(S), solve Ax=b where A=[v₁|…|vₖ] — consistent iff b∈span(S).

**Key ideas**

- span(S) = set of all linear combinations c₁v₁+…+cₖvₖ (c's range over all reals)
- span(S) is a subspace — the smallest subspace containing every vector in S
- b∈span(S) iff Ax=b is consistent, where A=[v₁|…|vₖ]
- Adding a dependent vector to S does not change the span; adding an independent vector enlarges it
- If S spans V, every vector in V can be written as a linear combination of vectors in S

**Vocabulary**

- **span(S)** — The set of all linear combinations of vectors in S; the smallest subspace containing S
- **linear combination** — A sum c₁v₁+…+cₖvₖ where c₁,…,cₖ are scalars
- **spanning set** — A set S such that span(S) = V; S spans V
- **membership test** — To test b∈span{v₁,…,vₖ}, row-reduce [v₁|…|vₖ|b]; consistent iff b is in the span

**Common misconceptions**

- *Misconception:* span({v}) is just the point {v}.
  *Correction:* span({v}) = {cv : c∈ℝ} — all scalar multiples, forming an entire line through the origin (or {0} if v=0).
- *Misconception:* Adding more vectors always enlarges the span.
  *Correction:* If the new vector is a linear combination of the existing ones, the span does not change. Span grows only when a linearly independent vector is added.
- *Misconception:* The span of a finite set is finite.
  *Correction:* span(S) contains infinitely many vectors (all linear combinations with real coefficients), unless S={0}.

**Common mistakes in practice**

- Thinking span of k vectors has exactly k elements (span is infinite unless it's {0})
- Not reducing the full augmented matrix when testing membership
- Confusing 'S spans V' (every element of V is a combination of S) with 'S is linearly independent'

**Visual teaching opportunities**

- ℝ³ diagrams: span of one vector = line; span of two independent vectors = plane; span of three independent vectors = ℝ³
- Show that v₂=2v₁ gives span{v₁,v₂}=span{v₁} — the redundant vector adds nothing
- Decision flowchart: to test b∈span{v₁,v₂,v₃}, set up and row-reduce [v₁|v₂|v₃|b]

**Worked example**

*Setup:* Given v₁=(1,1,0), v₂=(0,1,1), determine (a) the geometric description of span{v₁,v₂}, and (b) whether b=(1,0,0) lies in span{v₁,v₂}.

1. Step 1: Check linear independence: c₁v₁+c₂v₂=0 gives c₁=0, c₁+c₂=0, c₂=0 → only trivial solution → v₁,v₂ independent.
2. Step 2: Since v₁,v₂∈ℝ³ are independent, span{v₁,v₂} is a 2-dimensional plane through the origin in ℝ³.
3. Step 3: Test b=(1,0,0). Set up system: c₁(1,1,0)+c₂(0,1,1)=(1,0,0), i.e., c₁=1, c₁+c₂=0, c₂=0.
4. Step 4: From the third equation: c₂=0. Substituting into the second: c₁=0. But the first equation says c₁=1 — contradiction.
5. Step 5: The system is inconsistent, so b=(1,0,0) ∉ span{v₁,v₂}.
6. Step 6: Verify intuitively: the plane span{v₁,v₂} has normal n=v₁×v₂=(1,−1,1). Check n·b=1≠0, confirming b is not in the plane ✓.

*Outcome:* span{v₁,v₂} is the plane {(x,y,z): x−y+z=0} in ℝ³; (1,0,0) does not lie in it. The consistency-of-Ax=b method gives a systematic membership test.

**Real-world intuition**

- Column space of A = span of its columns; determines which b-vectors Ax=b can solve
- Signal processing: a set of basis functions (e.g., Fourier sinusoids) spans a function space — any signal in that space is their linear combination
- Machine learning: the feature space span determines which functions a linear model can represent

**Practice progression**

Item types: Describe span{v} and span{v₁,v₂} geometrically in ℝ³, Test whether a given vector belongs to a span, Show that span{v₁,v₂,v₃}=span{v₁,v₂} when v₃ is a combination of v₁,v₂, Find a spanning set for the null space of a 2×3 matrix, Prove span(S) is a subspace using the three-condition test, Does removing one vector from a spanning set still span V?. Suggested item count: 6.

Geometric description → membership test → dependence and span size → subspace proof → application to null space

**Assessment objectives**

Formats: Membership test via row reduction, Geometric description of span in ℝ² or ℝ³, Proof: span(S) is a subspace. Bloom alignment: understand.

Mastery signal: Sets up and row-reduces [v₁|…|vₖ|b] to test membership, gives the correct geometric description (line, plane, or all of ℝⁿ), and identifies when adding a vector changes the span.

**Teacher notes**

Emphasise the membership test via row reduction — it's the computational core. Then connect to column space: the column space of A is exactly span of the columns of A, and Ax=b is consistent iff b∈col(A).

**Student notes**

To check b∈span{v₁,v₂,v₃}: form the matrix [v₁|v₂|v₃|b] and row-reduce. If no row [0,0,0,*≠0] appears, b is in the span. If such a row appears, it is not.

**Prerequisite graph**

- Requires: math.linalg.subspace
- Unlocks (future prerequisite links): math.linalg.basis
- Cross-topic connections (graph cross-links): none
- Narrative: Span connects directly to linear independence (a set is independent iff no vector is in the span of the others), basis (an independent spanning set), and column space (span of matrix columns). The fundamental question 'can Ax=b be solved?' is 'is b in the column space (span of columns) of A?'

**Teaching hints — review triggers**

- Errors in solving Ax=b for membership test → review augmented matrix row reduction
- Confusing span with just the listed vectors → review linear combination definition
- Geometric description errors (plane vs. line vs. all of ℝⁿ) → review linear independence

**Spaced repetition / revision guidance**

Practise the membership test systematically. Then work through examples where adding a dependent vector does not change the span, and contrast with adding an independent vector. Connect back to the Ax=b consistency framework.

---

### Linear Independence

*Concept ID: `math.linalg.linear-independence` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Test whether a set of vectors is linearly independent using the definition and row reduction, and identify dependence relations among vectors.

Vectors v₁,…,vₖ are linearly independent iff c₁v₁+⋯+cₖvₖ=0 implies all cᵢ=0. Equivalently, no vector in the set is a linear combination of the others. Key property for basis construction.

Vectors v₁,…,vₖ are linearly independent iff c₁v₁+…+cₖvₖ=0 implies c₁=…=cₖ=0 (only the trivial combination gives zero). They are linearly dependent iff some vector is a linear combination of the others. Computational test: form A=[v₁|…|vₖ] and row-reduce; if there is a free variable (fewer pivots than vectors), the set is dependent. Any set of more than n vectors in ℝⁿ is automatically dependent.

**Key ideas**

- Independence: only the trivial linear combination gives zero (all scalars must be zero)
- Dependence: some cᵢ≠0 in c₁v₁+…+cₖvₖ=0 — at least one vector is redundant
- Row-reduce A=[v₁|…|vₖ]: independent iff each column has a pivot (no free variables)
- Any set containing the zero vector is automatically dependent
- More than n vectors in ℝⁿ are always dependent (by the rank bound)

**Vocabulary**

- **linearly independent** — c₁v₁+…+cₖvₖ=0 implies all cᵢ=0
- **linearly dependent** — Some cᵢ≠0 exists such that c₁v₁+…+cₖvₖ=0; at least one vector is a combination of the others
- **dependence relation** — A nontrivial linear combination of the vectors that equals zero
- **free variable** — A variable with no pivot in the row-reduced system; its presence signals linear dependence

**Common misconceptions**

- *Misconception:* Linear independence means the vectors are perpendicular.
  *Correction:* Independence means no vector is a linear combination of the others; orthogonality is an additional property. (1,0) and (1,1) are independent but not orthogonal.
- *Misconception:* If none of the vectors is a multiple of another, they must be independent.
  *Correction:* A set can be dependent even if no pair is proportional. Example: v₃=v₁+v₂ makes the set dependent, but v₁ and v₂ may point in very different directions.
- *Misconception:* The zero vector is linearly independent.
  *Correction:* c·0=0 holds for any c≠0, so the trivial combination is not the only one giving zero — {0} is linearly dependent.

**Common mistakes in practice**

- Testing whether any two vectors are parallel instead of testing the full set
- Forgetting that a set with the zero vector is always dependent
- Confusing the number of pivot ROWS with the number of pivot COLUMNS

**Visual teaching opportunities**

- ℝ² diagram: two independent vectors span a plane; two dependent vectors (collinear) lie on a line
- Show that v₃=2v₁−v₂ means the three vectors all lie in the same plane (dependent)
- Checkerboard of pivot/free columns after row reduction: pivots ↔ independent, free ↔ dependent

**Worked example**

*Setup:* Test whether v₁=(1,2,3), v₂=(0,1,2), v₃=(2,3,4) are linearly independent. If dependent, find an explicit dependence relation.

1. Step 1: Form A=[v₁|v₂|v₃] = [[1,0,2],[2,1,3],[3,2,4]] and row-reduce the homogeneous system Ac=0.
2. Step 2: R₂ ← R₂−2R₁: [[1,0,2],[0,1,-1],[3,2,4]].
3. Step 3: R₃ ← R₃−3R₁: [[1,0,2],[0,1,-1],[0,2,-2]].
4. Step 4: R₃ ← R₃−2R₂: [[1,0,2],[0,1,-1],[0,0,0]]. Only 2 pivots (in columns 1 and 2); column 3 is free.
5. Step 5: Set c₃=t. Back-substitute: from R₂, c₂=t; from R₁, c₁=−2t.
6. Step 6: Dependence relation: (−2t)v₁+t·v₂+t·v₃=0. Take t=1: −2v₁+v₂+v₃=0, i.e., v₃=2v₁−v₂. Verify: 2(1,2,3)−(0,1,2)=(2,4,6)−(0,1,2)=(2,3,4)=v₃ ✓.

*Outcome:* The set is linearly DEPENDENT. The explicit dependence relation v₃=2v₁−v₂ shows that v₃ lies in the span of v₁ and v₂.

**Real-world intuition**

- Signal processing: independent basis functions ensure no redundant information in a decomposition
- Data science: feature collinearity = linear dependence; independent features avoid multicollinearity in regression
- Wronskian test: linear independence of ODE solutions (cross-link to differential equations)

**Practice progression**

Item types: Test two vectors in ℝ² for independence, Test three vectors in ℝ³ (row reduction), Find the dependence relation when vectors are dependent, Prove: more than n vectors in ℝⁿ are always dependent, Show that orthogonal vectors are independent, Wronskian test for function independence (cross-link math.de). Suggested item count: 6.

Two-vector ℝ² check → three-vector row reduction → dependence relation → abstract proof

**Assessment objectives**

Formats: Row-reduce to determine independence/dependence, Find the dependence relation, True/false on independence criteria. Bloom alignment: understand.

Mastery signal: Correctly sets up Ac=0, row-reduces, identifies free variables, and writes the dependence relation explicitly for a dependent set.

**Teacher notes**

Emphasise that dependence is about the combination equalling zero with not-all-zero scalars. Use concrete examples of dependent sets where no two vectors are proportional — this breaks the common misconception.

**Student notes**

To test independence, always row-reduce A=[v₁|…|vₖ]. Count pivots: if #pivots = #vectors, independent; if #pivots < #vectors, dependent. Then use back-substitution to find the dependence relation.

**Prerequisite graph**

- Requires: math.linalg.span
- Unlocks (future prerequisite links): math.linalg.basis
- Cross-topic connections (graph cross-links): math.de.wronskian
- Narrative: Linear independence is the key condition for a basis (independent + spanning). It appears in the Wronskian test for ODEs, in statistics as the absence of multicollinearity, and in abstract algebra as the definition of a free generating set.

**Teaching hints — review triggers**

- Confusion about setting up Ac=0 → review homogeneous system
- Pivot identification errors → review row echelon form
- Confusing independence with orthogonality → review dot product and angle

**Spaced repetition / revision guidance**

Practise on sets of three or four vectors in ℝ³/ℝ⁴. After finding dependence, always verify the explicit relation c₁v₁+…+cₖvₖ=0 by direct computation.

---

### Basis

*Concept ID: `math.linalg.basis` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Verify that a set of vectors is a basis for a vector space, express any vector in terms of a given basis, and identify the standard basis of ℝⁿ.

A set of vectors that is both linearly independent and spans V. Every vector in V is uniquely expressible as a linear combination of basis vectors. The standard basis of ℝⁿ is {e₁,…,eₙ}.

A basis of a vector space V is a set of vectors that is (1) linearly independent and (2) spans V. Every vector in V has a unique representation as a linear combination of basis vectors. The standard basis of ℝⁿ is {e₁,…,eₙ} where eᵢ has 1 in position i and 0 elsewhere. All bases of a finite-dimensional V have the same number of elements (that number is the dimension). A set of n independent vectors in ℝⁿ automatically spans ℝⁿ and is a basis.

**Key ideas**

- Basis = independent + spanning; both conditions are required
- Unique representation: every v∈V equals exactly one linear combination of basis vectors
- Standard basis of ℝⁿ: e₁=(1,0,…,0), …, eₙ=(0,…,0,1)
- Shortcut: n independent vectors in ℝⁿ form a basis (no need to check spanning separately)
- Any spanning set can be reduced to a basis by removing dependent vectors

**Vocabulary**

- **basis** — A linearly independent spanning set of V; every vector in V has a unique representation
- **standard basis of ℝⁿ** — {e₁,…,eₙ} where eᵢ = (0,…,1,…,0) with 1 in position i
- **ordered basis** — A basis with a specified ordering of its vectors, needed to define unique coordinate vectors
- **coordinate vector [v]_B** — The unique tuple (c₁,…,cₙ) such that v=c₁b₁+…+cₙbₙ in basis B

**Common misconceptions**

- *Misconception:* A basis must be the standard basis.
  *Correction:* Any independent spanning set is a basis. ℝ² has infinitely many bases: {(1,1),(1,2)}, {(2,3),(1,5)}, etc.
- *Misconception:* A basis vector must be a unit vector.
  *Correction:* Basis vectors can have any nonzero magnitude. Orthonormal bases (unit orthogonal vectors) are a special, convenient choice.
- *Misconception:* Adding more vectors to a basis still gives a basis.
  *Correction:* Adding any vector makes the set linearly dependent — a basis is a MINIMAL spanning set (and a MAXIMAL independent set).

**Common mistakes in practice**

- Checking independence but forgetting to verify spanning (or vice versa)
- Confusing coordinate vectors [v]_B in different bases as if they refer to the same vector
- Assuming the basis must be orthogonal

**Visual teaching opportunities**

- ℝ² diagram showing the standard basis {e₁,e₂} and an alternative basis {(1,1),(1,2)} with the grid they generate
- Show the coordinate representation of the same vector in two different bases
- Conceptual: basis as coordinate axes for the space — different bases give different coordinate systems

**Worked example**

*Setup:* Show that B = {b₁=(1,1,0), b₂=(1,0,1), b₃=(0,1,1)} is a basis for ℝ³, then find the coordinates of v=(1,0,0) in basis B.

1. Step 1: Check independence. det([b₁|b₂|b₃]) = det([[1,1,0],[1,0,1],[0,1,1]]). Expand along row 1: 1·(0−1)−1·(1−0)+0 = −1−1 = −2 ≠ 0. So b₁,b₂,b₃ are independent.
2. Step 2: Since 3 independent vectors in ℝ³, they automatically span ℝ³. Therefore B is a basis.
3. Step 3: Find [v]_B: solve c₁b₁+c₂b₂+c₃b₃=(1,0,0), i.e., c₁+c₂=1, c₁+c₃=0, c₂+c₃=0.
4. Step 4: From last two equations: c₃=−c₁ and c₂=−c₃=c₁. Substitute into first: c₁+c₁=1 → c₁=1/2.
5. Step 5: c₂=1/2, c₃=−1/2. So [v]_B = (1/2, 1/2, −1/2).
6. Step 6: Verify: (1/2)(1,1,0)+(1/2)(1,0,1)+(−1/2)(0,1,1) = (1/2+1/2, 1/2−1/2, 1/2−1/2) = (1,0,0) ✓.

*Outcome:* [v]_B = (1/2, 1/2, −1/2). The basis B gives a different but equally valid coordinate system for ℝ³; every vector has unique coordinates in B.

**Real-world intuition**

- Fourier basis: sinusoids form a basis for periodic function spaces; every periodic signal is a unique sum of harmonics
- Principal components: PCA finds a basis aligned with data variance directions
- Computer graphics: basis vectors define coordinate frames; change of basis converts between world and camera coordinates

**Practice progression**

Item types: Verify a given set is a basis for ℝ², Find coordinates of a vector in a non-standard basis, Extend a linearly independent set to a basis, Reduce a spanning set to a basis, Show that any n+1 vectors in ℝⁿ are dependent (basis size theorem), Find a basis for a subspace described by equations. Suggested item count: 6.

ℝ² basis check → coordinate finding → extension/reduction → subspace basis → abstract proof

**Assessment objectives**

Formats: Verify basis conditions and find coordinates, True/false on basis properties, Find a basis for a described subspace. Bloom alignment: understand.

Mastery signal: Verifies independence (via det or row reduction) and spanning, then correctly solves for coordinates in the new basis with verification.

**Teacher notes**

Emphasise the uniqueness of representation — it is what makes a basis useful as a coordinate system. Without uniqueness (which comes from independence), you cannot define coordinates. Without spanning, some vectors have no coordinates at all.

**Student notes**

Shortcut for ℝⁿ: n vectors in ℝⁿ form a basis iff they are independent (row-reduce and get n pivots) OR iff they span ℝⁿ (same condition). You only need to check one of the two conditions if you know you have exactly n vectors.

**Prerequisite graph**

- Requires: math.linalg.linear-independence, math.linalg.span
- Unlocks (future prerequisite links): math.linalg.dimension, math.linalg.coordinates
- Cross-topic connections (graph cross-links): none
- Narrative: Basis is the foundation for dimension, coordinates, and change of basis. Every matrix representation of a linear map depends on the choice of basis. Orthonormal bases (Gram-Schmidt) and eigenvector bases (diagonalisation) are special cases with additional structure.

**Teaching hints — review triggers**

- Cannot verify independence → review linear independence test
- Cannot find coordinates → review solving Ax=b
- Confusing basis with spanning set → review that spanning alone is insufficient (need independence)

**Spaced repetition / revision guidance**

For each new vector space you encounter, identify: (1) what are the elements, (2) what is a natural basis, (3) what is the dimension. Then practise finding coordinates of specific vectors in that basis.

---

### Dimension

*Concept ID: `math.linalg.dimension` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** State and apply the dimension theorem (all bases of V have the same size), compute the dimension of subspaces of ℝⁿ, and use dimension to constrain solutions and subspace structure.

The number of vectors in any basis of V; all bases of V have the same cardinality. dim(ℝⁿ)=n. For subspaces: dim(U)+dim(U⊥)=dim(V).

The dimension dim(V) of a finite-dimensional vector space V is the number of vectors in any basis. This number is well-defined: every basis of V has exactly the same cardinality (proved by the Replacement Lemma). Key dimensions: dim(ℝⁿ)=n, dim(Pₙ)=n+1, dim(Mₘₓₙ)=mn. For subspaces: if dim(U)=dim(V) and U⊆V, then U=V. The dimension of a subspace equals the number of free parameters in its general element.

**Key ideas**

- dim(V) = size of any basis of V; all bases have the same number of vectors
- dim(ℝⁿ)=n; dim(Pₙ)=n+1 (constant, x, x², …, xⁿ are basis); dim(Mₘₓₙ)=mn
- If W⊆V and dim(W)=dim(V), then W=V
- A set of dim(V) independent vectors is a basis; a spanning set of size dim(V) is a basis
- dim(U)+dim(U⊥) = dim(V) for a subspace U and its orthogonal complement in an inner product space

**Vocabulary**

- **dimension dim(V)** — The number of vectors in any basis of V; well-defined by the Replacement Lemma
- **finite-dimensional** — V is finite-dimensional if it has a finite spanning set (and hence a finite basis)
- **infinite-dimensional** — V has no finite basis; example: all polynomials P = P₀∪P₁∪P₂∪… has infinite dimension
- **orthogonal complement U⊥** — The subspace of all vectors orthogonal to every vector in U; dim(U)+dim(U⊥)=dim(V)

**Common misconceptions**

- *Misconception:* Dimension is the number of vectors we listed when describing the space.
  *Correction:* Dimension is the size of a BASIS — the minimum number of independent vectors needed to span the space. A spanning set can be larger than the dimension.
- *Misconception:* A higher-dimensional space always 'looks bigger'.
  *Correction:* All n-dimensional real vector spaces are isomorphic, regardless of how their elements look. The polynomial space P₂ and ℝ³ both have dimension 3.
- *Misconception:* A subspace of ℝⁿ must have dimension n−1 at most.
  *Correction:* Subspaces can have any dimension from 0 (just {0}) to n (all of ℝⁿ).

**Common mistakes in practice**

- Counting the number of EQUATIONS (constraints) instead of free PARAMETERS
- Confusing the dimension of a spanning set (size of the set) with dim(V) (size of a minimal basis)
- Assuming subspaces defined by more equations always have lower dimension

**Visual teaching opportunities**

- Table: subspaces of ℝ³ and their dimensions — {0} (dim 0), lines through origin (dim 1), planes through origin (dim 2), ℝ³ itself (dim 3)
- Show that {1, x, x²} is a basis for P₂, so dim(P₂)=3, matching dim(ℝ³)
- Dimension as 'degrees of freedom': the number of free parameters in the general element of the space

**Worked example**

*Setup:* Find the dimension of the subspace W = {(x,y,z,w)∈ℝ⁴ : x+y+z+w=0} and exhibit a basis.

1. Step 1: Parameterise. The equation x+y+z+w=0 has one constraint on 4 variables → 3 free variables. Set y=s, z=t, w=r; then x=−s−t−r.
2. Step 2: Write the general element: (−s−t−r, s, t, r) = s(−1,1,0,0)+t(−1,0,1,0)+r(−1,0,0,1).
3. Step 3: Candidate basis: {f₁=(−1,1,0,0), f₂=(−1,0,1,0), f₃=(−1,0,0,1)}.
4. Step 4: Check independence: [f₁|f₂|f₃] has RREF with 3 pivots (one in each column) → independent.
5. Step 5: By construction, W=span{f₁,f₂,f₃}, so these vectors span W.
6. Step 6: Conclude dim(W)=3. Verify consistency: rank-nullity for the 1×4 coefficient matrix [1,1,1,1] gives rank=1, nullity=4−1=3=dim(W) ✓.

*Outcome:* dim(W)=3 with basis {(−1,1,0,0),(−1,0,1,0),(−1,0,0,1)}. The one constraint reduces dimension by 1 from dim(ℝ⁴)=4.

**Real-world intuition**

- Degrees of freedom in physics: dimension of the configuration space = number of independent coordinates
- PCA: the number of significant principal components = effective dimension of the data
- Control theory: dimension of the reachable subspace determines how many states can be independently controlled

**Practice progression**

Item types: Find dim of P₂, M₂ₓ₂, and ℝ⁴, Find dim and basis of a subspace defined by equations, Use dim to determine if a spanning set is a basis, Apply: if dim(W)=dim(V) and W⊆V, conclude W=V, Find dim of null space and column space of a given matrix, Verify dim(U)+dim(U⊥)=dim(V) for a specific U. Suggested item count: 6.

Standard spaces → constrained subspaces → dimension-equality arguments → combined rank-nullity

**Assessment objectives**

Formats: Find dim and basis of a subspace, Identify the dimension of a described function or polynomial space, Use dimension to prove two subspaces are equal. Bloom alignment: understand.

Mastery signal: Correctly computes the dimension of a constrained subspace in ℝⁿ by counting free parameters, exhibits a basis, and verifies using the rank-nullity theorem.

**Teacher notes**

The well-definedness of dimension (all bases have the same size) is a theorem, not obvious. Prove it using the Replacement Lemma or the rank theorem. The result that dim(W)=dim(V) implies W=V is a powerful tool for proving two subspaces are equal.

**Student notes**

Count the number of free parameters (non-pivot columns in RREF) to find dim of a subspace. Each free parameter corresponds to one basis vector.

**Prerequisite graph**

- Requires: math.linalg.basis
- Unlocks (future prerequisite links): math.linalg.rank-nullity
- Cross-topic connections (graph cross-links): none
- Narrative: Dimension is the central invariant of a vector space. It connects rank (dim of column space), nullity (dim of null space), and the rank-nullity theorem (rank+nullity=n). In the spectral theorem, eigenvectors span a space whose dimension equals the algebraic multiplicity.

**Teaching hints — review triggers**

- Cannot identify free parameters → review row echelon form and free variables
- Confusion about basis size → review basis definition and independence
- Errors in dim of function spaces → review polynomial or matrix basis construction

**Spaced repetition / revision guidance**

Find the dimension of at least three different types of spaces: a subspace of ℝ⁴ defined by equations, a polynomial space, and a matrix space. For each, exhibit an explicit basis.

---

### Coordinates

*Concept ID: `math.linalg.coordinates` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 3h*

**Learning objective.** Find the coordinate vector [v]_B of a vector v in an ordered basis B, and convert between standard and B-coordinates using the change-of-basis matrix.

Given an ordered basis β={b₁,…,bₙ}, the coordinate vector [v]_β = (c₁,…,cₙ) where v=∑cᵢbᵢ. Coordinates depend on the choice of basis. Change of basis converts between coordinate representations.

Given an ordered basis B={b₁,…,bₙ} of V, every vector v∈V has a unique representation v=c₁b₁+…+cₙbₙ. The coordinate vector is [v]_B=(c₁,…,cₙ)∈ℝⁿ. To find [v]_B: solve Bc=v where B=[b₁|…|bₙ]. In standard coordinates, [v]_{std}=v; the change-of-basis matrix P=[b₁|…|bₙ] satisfies [v]_{std}=P·[v]_B, so [v]_B=P⁻¹v.

**Key ideas**

- [v]_B = (c₁,…,cₙ): the unique coefficients in v=c₁b₁+…+cₙbₙ
- To find [v]_B from standard coords: solve Pc=v where P=[b₁|…|bₙ]; so [v]_B=P⁻¹v
- Different bases give different coordinate representations of the same vector
- Coordinates are basis-dependent — always specify the basis
- The standard basis coordinates of v are just v itself: [v]_{e}=v

**Vocabulary**

- **coordinate vector [v]_B** — The unique tuple (c₁,…,cₙ) satisfying v=c₁b₁+…+cₙbₙ
- **change-of-basis matrix P** — P=[b₁|…|bₙ] (basis vectors as columns); converts B-coords to standard coords: v=P·[v]_B
- **ordered basis** — A basis with a specified ordering; required to define coordinate vectors unambiguously

**Common misconceptions**

- *Misconception:* Coordinates are intrinsic properties of a vector.
  *Correction:* Coordinates depend on the chosen basis. The same geometric vector has different coordinate tuples in different bases.
- *Misconception:* [v]_B = v always.
  *Correction:* Only in the standard basis does the coordinate vector equal the vector itself. In a non-standard basis B, [v]_B = P⁻¹v ≠ v in general.
- *Misconception:* The coordinate change matrix P is the matrix whose rows are the basis vectors.
  *Correction:* P has the basis vectors as its COLUMNS: P=[b₁|b₂|…|bₙ]. Rows vs. columns is a critical distinction.

**Common mistakes in practice**

- Putting basis vectors as rows instead of columns of P
- Computing P·v instead of P⁻¹·v when finding [v]_B
- Confusing [v]_B with the vector v itself

**Visual teaching opportunities**

- ℝ² diagram: same point (3,4) has coordinates (3,4) in standard basis and different coordinates in a tilted basis
- Show the matrix equation Pc=[v]_{std} being solved by row reduction for different choices of v
- Grid illustration: the basis vectors define a new coordinate grid; coordinates measure position in that grid

**Worked example**

*Setup:* Let B={b₁=(1,2), b₂=(1,3)} be an ordered basis for ℝ². Find [v]_B for v=(5,7).

1. Step 1: We need c₁,c₂ such that c₁b₁+c₂b₂=v: c₁(1,2)+c₂(1,3)=(5,7), giving the system c₁+c₂=5, 2c₁+3c₂=7.
2. Step 2: From equation 1: c₁=5−c₂. Substitute: 2(5−c₂)+3c₂=7 → 10+c₂=7 → c₂=−3.
3. Step 3: c₁=5−(−3)=8. So [v]_B=(8,−3).
4. Step 4: Verify: 8(1,2)+(−3)(1,3)=(8,16)+(−3,−9)=(5,7) ✓.
5. Step 5: Alternative via P⁻¹: P=[[1,1],[2,3]], det(P)=3−2=1, P⁻¹=[[3,−1],[−2,1]]. Then [v]_B=P⁻¹(5,7)=(15−7,−10+7)=(8,−3) ✓.
6. Step 6: Observation: the vector v=(5,7) in standard coords becomes (8,−3) in basis B — same geometric object, different numerical representation.

*Outcome:* [v]_B=(8,−3). Two methods (direct solve and P⁻¹) give the same result. Coordinates are the 'weights' in the basis expansion.

**Real-world intuition**

- Computer graphics: object coordinates in the object's local frame vs. world frame
- Physics: choosing convenient coordinate systems (spherical vs. Cartesian) to simplify equations
- Fourier analysis: Fourier coefficients are the coordinates of a signal in the Fourier basis

**Practice progression**

Item types: Find [v]_B by solving Bc=v directly, Find [v]_B via P⁻¹v, Convert from B-coordinates back to standard coordinates, Find coordinate vectors for multiple vectors in the same basis, Polynomial space coordinates: find [p]_B for p=3x²+x−1 in basis {1,x,x²}, Identify the geometric meaning of different coordinate values. Suggested item count: 6.

Direct solution → P⁻¹ method → polynomial space → inverse direction (B → standard)

**Assessment objectives**

Formats: Find coordinate vector via row reduction, Verify coordinate vector by reconstruction, Explain why coordinates change when the basis changes. Bloom alignment: apply.

Mastery signal: Correctly finds [v]_B by either method, verifies via c₁b₁+…+cₙbₙ=v, and explains the role of the change-of-basis matrix P.

**Teacher notes**

Emphasise that P=[b₁|…|bₙ] with COLUMNS as basis vectors. Students frequently transpose this and get the wrong answer. The equation P·[v]_B=v is the key relationship.

**Student notes**

The matrix P has the basis vectors as its columns, not rows. To find B-coordinates: [v]_B=P⁻¹v. To go from B-coordinates back to standard: v=P·[v]_B.

**Prerequisite graph**

- Requires: math.linalg.basis
- Unlocks (future prerequisite links): math.linalg.change-of-basis
- Cross-topic connections (graph cross-links): none
- Narrative: Coordinates are the bridge to change-of-basis (transformation between coordinate systems) and matrix representation of linear maps (how the map looks in different coordinate systems). Fourier series uses coordinates in the orthogonal sinusoidal basis.

**Teaching hints — review triggers**

- Cannot solve Bc=v → review augmented matrix row reduction
- Confusion about columns vs. rows of P → review matrix assembly from column vectors
- Wrong P⁻¹ computation → review 2×2 or 3×3 matrix inverse

**Spaced repetition / revision guidance**

Practise finding [v]_B in at least three different 2D and 3D bases. Then work backward: given B-coordinates, recover the standard representation. Verify both directions.

---

### Change of Basis

*Concept ID: `math.linalg.change-of-basis` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 4h*

**Learning objective.** Construct the change-of-basis matrix between two ordered bases, convert coordinate vectors between bases, and use similarity B=P⁻¹AP to find matrix representations of a linear map in different bases.

If β and γ are bases, the change-of-basis matrix P_{β→γ} satisfies [v]_γ = P[v]_β. Matrix representations of a linear map in two bases are related by similarity: B = P⁻¹AP.

If B={b₁,…,bₙ} and C={c₁,…,cₙ} are ordered bases of V, the change-of-basis matrix P_{B→C} converts B-coordinates to C-coordinates: [v]_C = P_{B→C}·[v]_B. For the change from B to the standard basis: P=[b₁|…|bₙ] (basis vectors as columns), so [v]_{std}=P·[v]_B and [v]_B=P⁻¹v. If A is the matrix of a linear map T in basis B and B' is the matrix of T in basis C, then B'=P⁻¹AP (similar matrices represent the same map).

**Key ideas**

- Change from B to standard: P=[b₁|…|bₙ]; [v]_{std}=P[v]_B and [v]_B=P⁻¹[v]_{std}
- Change from B to C: P_{B→C}=P_C⁻¹·P_B where P_B=[b₁|…|bₙ] and P_C=[c₁|…|cₙ]
- Similar matrices A and B'=P⁻¹AP represent the SAME linear map in different bases
- A diagonal matrix D=P⁻¹AP says the map is especially simple in the eigenvector basis P
- Similarity preserves: eigenvalues, rank, trace, determinant — all basis-independent

**Vocabulary**

- **change-of-basis matrix P** — P=[b₁|…|bₙ]; [v]_{std}=P[v]_B and [v]_B=P⁻¹[v]_{std}
- **similar matrices** — A and B' are similar if B'=P⁻¹AP for some invertible P; they represent the same map in different bases
- **transition matrix P_{B→C}** — Matrix converting B-coordinates to C-coordinates; equals P_C⁻¹P_B

**Common misconceptions**

- *Misconception:* P_{B→C} converts from C-coordinates to B-coordinates.
  *Correction:* The subscript B→C means it converts FROM B-coordinates TO C-coordinates: [v]_C = P_{B→C}·[v]_B. Notation: the arrow shows the direction of conversion.
- *Misconception:* If A and B'=P⁻¹AP are similar, they have the same entries.
  *Correction:* Similar matrices have the same eigenvalues, trace, and determinant, but generally different entries. They represent the same map in different coordinate systems.
- *Misconception:* Change of basis changes the underlying linear map.
  *Correction:* The map T is the same; only its coordinate representation changes. Similar matrices are different descriptions of the same transformation.

**Common mistakes in practice**

- Forgetting to invert: applying P instead of P⁻¹ to convert to B-coordinates
- Wrong order in B'=P⁻¹AP (writing AP⁻¹P or other wrong orderings)
- Confusing which matrix is P_B and which is P_C in a two-basis problem

**Visual teaching opportunities**

- Commutative diagram: [v]_B → (via P_B) → [v]_{std} → (via P_C⁻¹) → [v]_C
- Show the same rotation in ℝ² represented by different matrices in different bases
- Grid: transform B-grid to standard grid to C-grid as a two-step coordinate change

**Worked example**

*Setup:* Let B={b₁=(1,1), b₂=(1,2)} be a basis for ℝ². Find the change-of-basis matrix from B to the standard basis, convert v=(3,4) from standard to B-coordinates, then find the B-representation of T(x,y)=(2x+y, x−y).

1. Step 1: Change-of-basis matrix (B to standard): P=[b₁|b₂]=[[1,1],[1,2]]. This satisfies v=P·[v]_B.
2. Step 2: Find [v]_B = P⁻¹·v. det(P)=2−1=1, so P⁻¹=[[2,−1],[−1,1]].
3. Step 3: [v]_B = [[2,−1],[−1,1]]·(3,4) = (6−4, −3+4) = (2,1). Verify: 2b₁+1·b₂=2(1,1)+(1,2)=(3,4) ✓.
4. Step 4: Standard matrix of T: A=[[2,1],[1,−1]] (columns are T(e₁) and T(e₂)).
5. Step 5: B-matrix of T: B'=P⁻¹AP = [[2,−1],[−1,1]]·[[2,1],[1,−1]]·[[1,1],[1,2]].
6. Step 6: P⁻¹A=[[2,−1],[−1,1]]·[[2,1],[1,−1]]=[[3,3],[−1,0]]; then B'=[[3,3],[−1,0]]·[[1,1],[1,2]]=[[6,9],[−1,−1]]. This is the matrix representing T in basis B.

*Outcome:* [v]_B=(2,1). The matrix of T in basis B is [[6,9],[−1,−1]] = P⁻¹AP. The map is the same; only the coordinate description changes.

**Real-world intuition**

- Diagonalisation: change to eigenvector basis simplifies matrix powers (Aⁿ = PΛⁿP⁻¹)
- Computer graphics: transforms between object, world, and camera coordinate systems
- Signal processing: DFT as a change of basis from time-domain to frequency-domain basis

**Practice progression**

Item types: Find P_{B→std} and its inverse for a 2D basis, Convert standard coordinates to B-coordinates, Convert B-coordinates to C-coordinates via P_C⁻¹P_B, Compute B'=P⁻¹AP for a given linear map and basis, Verify that similar matrices have the same determinant and trace, Find the basis in which a given matrix is diagonal (eigenvector basis). Suggested item count: 6.

2D basis change → 3D conversion → similar matrix computation → diagonalisation connection

**Assessment objectives**

Formats: Compute P and P⁻¹ for a given basis, Find B-coordinates of a vector, Compute the matrix of a linear map in a non-standard basis. Bloom alignment: apply.

Mastery signal: Correctly computes P=[b₁|…|bₙ], inverts it, finds B-coordinates by P⁻¹v, and assembles B'=P⁻¹AP for a given transformation.

**Teacher notes**

The commutative diagram (B-coords → standard → C-coords) is the cleanest way to show why P_{B→C}=P_C⁻¹P_B. Draw it on the board before any computation.

**Student notes**

Remember: P has basis vectors as COLUMNS. To convert to B-coords from standard: multiply by P⁻¹. To convert from B-coords to standard: multiply by P.

**Prerequisite graph**

- Requires: math.linalg.coordinates, math.linalg.matrix-inverse
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Change of basis is the key to diagonalisation (eigendecomposition is a basis change to eigenvectors). Similarity invariants (eigenvalues, trace, det, rank) are the basis-independent properties of a linear map. The Gram-Schmidt process finds an orthonormal basis — a particularly convenient change of basis.

**Teaching hints — review triggers**

- Errors in P⁻¹ → review matrix inverse computation
- Wrong order in P⁻¹AP → review matrix multiplication order and similarity definition
- Confusion about which P column is which basis vector → review basis ordering convention

**Spaced repetition / revision guidance**

Practise the full cycle: given a basis B and a vector v, find [v]_B; given [v]_B, recover v; compute B'=P⁻¹AP and verify that the map acts on B-coords as B' predicts.

---

### Null Space

*Concept ID: `math.linalg.null-space` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Compute the null space (kernel) of a matrix by row reduction, find a basis for it, determine its dimension (nullity), and interpret its geometric and algebraic meaning.

N(A) = {x : Ax=0}; a subspace of ℝⁿ. Dimension is the nullity of A; its vectors are the solutions to the homogeneous system. Found by row-reducing A and parameterizing free variables.

The null space of an m×n matrix A is N(A)={x∈ℝⁿ: Ax=0}, the solution set of the homogeneous system. N(A) is a subspace of ℝⁿ. Its dimension is the nullity: nullity(A)=n−rank(A) (rank-nullity theorem). To find N(A): row-reduce A to RREF, identify free variables, write the general solution as a linear combination of special solutions — these form a basis for N(A).

**Key ideas**

- N(A)={x: Ax=0} is always a subspace of ℝⁿ (domain space)
- nullity(A) = n − rank(A) (number of free variables after row reduction)
- Basis for N(A): one basis vector per free variable, found by setting that variable to 1 and all others to 0
- N(A)={0} iff A has full column rank (rank=n) iff Ax=b has at most one solution
- N(A) is perpendicular to the row space of A (left orthogonal complement)

**Vocabulary**

- **null space N(A)** — {x∈ℝⁿ: Ax=0}; also called the kernel ker(A); a subspace of ℝⁿ
- **nullity** — dim(N(A)) = n − rank(A) = number of free variables in RREF
- **pivot column** — Column containing a leading 1 in RREF; corresponds to a basic (non-free) variable
- **free variable** — Variable in RREF with no pivot in its column; each generates one null space basis vector

**Common misconceptions**

- *Misconception:* The null space is the zero vector only if det(A)=0.
  *Correction:* N(A)={0} iff rank(A)=n (full column rank). For non-square matrices, N(A)≠{0} whenever n>rank(A), regardless of any determinant.
- *Misconception:* The null space lives in ℝᵐ (the output space).
  *Correction:* N(A) ⊆ ℝⁿ (the input space), not ℝᵐ. It answers 'which inputs map to zero?', not 'which outputs are zero?'
- *Misconception:* Finding the null space requires solving many separate systems.
  *Correction:* One row reduction of A yields all free-variable parameterisations simultaneously — the null space basis vectors are then read off directly.

**Common mistakes in practice**

- Including the right-hand side column when row-reducing (should reduce A alone, not [A|b])
- Forgetting that pivot variables must be computed from the free variable assignments
- Confusing null space (in ℝⁿ) with left null space (in ℝᵐ)

**Visual teaching opportunities**

- Show: after A maps ℝⁿ → ℝᵐ, the null space is the 'shadow' that collapses to zero — everything in N(A) is invisible to A
- RREF with pivot and free columns colour-coded: free columns → null space basis vectors
- Geometric interpretation: for a 2×3 matrix of rank 2, N(A) is a line in ℝ³

**Worked example**

*Setup:* Find the null space of A = [[1,2,2,1],[2,4,3,2],[3,6,5,3]].

1. Step 1: Row-reduce A. R₂←R₂−2R₁, R₃←R₃−3R₁: [[1,2,2,1],[0,0,−1,0],[0,0,−1,0]].
2. Step 2: R₃←R₃−R₂: [[1,2,2,1],[0,0,−1,0],[0,0,0,0]]. R₂←−R₂: [[1,2,2,1],[0,0,1,0],[0,0,0,0]].
3. Step 3: R₁←R₁−2R₂: [[1,2,0,1],[0,0,1,0],[0,0,0,0]]. RREF. Pivots in columns 1 and 3; free variables: x₂=s, x₄=t.
4. Step 4: From RREF: x₁+2s+t=0 → x₁=−2s−t; x₃=0.
5. Step 5: General solution: x=s(−2,1,0,0)+t(−1,0,0,1).
6. Step 6: Basis for N(A): {n₁=(−2,1,0,0), n₂=(−1,0,0,1)}. nullity=2. Verify: A·n₁=(−2+2+0+0, −4+4+0+0, −6+6+0+0)=(0,0,0) ✓; A·n₂=(−1+0+0+1,−2+0+0+2,−3+0+0+3)=(0,0,0) ✓.

*Outcome:* N(A) = span{(−2,1,0,0),(−1,0,0,1)}, nullity=2. rank(A)=2, so rank+nullity=2+2=4=n ✓ (rank-nullity theorem satisfied).

**Real-world intuition**

- In electrical networks: N(A) gives the set of current distributions that create zero potential difference
- Compression: signals in the null space of a compression matrix are invisible (lost) during compression
- Robotics: null space of the Jacobian gives joint motions that don't move the end-effector (null space control)

**Practice progression**

Item types: Find N(A) for a 2×3 matrix, Find N(A) for a 3×4 matrix — identify all free variables, Verify each null space basis vector satisfies Ax=0, Determine nullity from rank (without computing N(A)), Find N(A) for a square invertible matrix and for a singular matrix, Describe N(A) geometrically (point, line, plane, …). Suggested item count: 6.

2×3 simple → 3×4 multiple free variables → geometric description → relationship with rank

**Assessment objectives**

Formats: Compute N(A) by row reduction with basis, Determine nullity from rank or vice versa, Geometric description of null space. Bloom alignment: apply.

Mastery signal: Row-reduces A, identifies all free variables, writes the general null space element, and verifies each basis vector satisfies Ax=0.

**Teacher notes**

Stress the domain-space interpretation: N(A) ⊆ ℝⁿ (inputs that map to 0), not ℝᵐ. Students often confuse this with something in the output space. Also emphasise that finding one null space basis vector per free variable (by setting that free variable to 1, all others to 0) is the standard recipe.

**Student notes**

Recipe for N(A): (1) row-reduce A to RREF; (2) identify free variables (non-pivot columns); (3) set each free variable to 1 and the rest to 0 in turn; (4) back-solve for pivot variables; (5) each resulting vector is a null space basis vector.

**Prerequisite graph**

- Requires: math.linalg.subspace, math.linalg.row-echelon
- Unlocks (future prerequisite links): math.linalg.rank-nullity
- Cross-topic connections (graph cross-links): none
- Narrative: Null space connects to rank (rank+nullity=n), column space (N(A)⊥row space), and the full solution of Ax=b (general solution = particular solution + null space element). In abstract algebra, the kernel of a linear map is the null space.

**Teaching hints — review triggers**

- Cannot identify free vs. pivot variables → review RREF and column types
- Errors in writing parameterised solution → review back-substitution from RREF
- Confusion about which space (domain vs. range) N(A) lives in → review domain/codomain definitions

**Spaced repetition / revision guidance**

Practise the full recipe on 3×4 and 4×5 matrices until you can identify free variables and write the null space basis automatically. Then verify each vector satisfies Ax=0 before moving on.

---

### Column Space

*Concept ID: `math.linalg.column-space` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Find the column space of a matrix, determine a basis for it from pivot columns, and connect the column space to the consistency of Ax=b.

C(A) = {Ax : x∈ℝⁿ}; the span of the columns of A; a subspace of ℝᵐ. Ax=b is consistent iff b∈C(A). dim(C(A)) = rank(A).

The column space (or range/image) of an m×n matrix A is C(A)={Ax: x∈ℝⁿ} = span of the columns of A, a subspace of ℝᵐ. The system Ax=b is consistent iff b∈C(A). The dimension of C(A) equals rank(A). To find a basis for C(A): row-reduce A, identify the pivot columns, then take those ORIGINAL (not row-reduced) columns from A as the basis.

**Key ideas**

- C(A)=span{columns of A}; a subspace of ℝᵐ (output/codomain space)
- Ax=b is consistent iff b∈C(A)
- dim(C(A)) = rank(A); basis = pivot columns of the ORIGINAL A
- Row operations change column relationships but preserve which columns are pivot columns
- C(A)=C(A·R) for invertible R (column space invariant under right multiplication)

**Vocabulary**

- **column space C(A)** — Span of the columns of A; equivalently {Ax: x∈ℝⁿ}; a subspace of ℝᵐ. Also called range or image.
- **pivot column (of original A)** — Columns corresponding to pivot positions in RREF; these form a basis for C(A)
- **rank** — dim(C(A)) = number of pivots in RREF
- **row space** — Span of the rows of A; a subspace of ℝⁿ; dim(row space)=rank(A)

**Common misconceptions**

- *Misconception:* The column space basis is the pivot columns of the RREF of A.
  *Correction:* Row operations change the columns. The basis consists of the pivot columns of the ORIGINAL matrix A, identified by their positions in the RREF.
- *Misconception:* The column space is a subspace of ℝⁿ.
  *Correction:* C(A) ⊆ ℝᵐ (output space). A is m×n, so each column lives in ℝᵐ, and Ax∈ℝᵐ.
- *Misconception:* More columns always means a larger column space.
  *Correction:* Adding dependent columns does not enlarge the column space. dim(C(A))=rank(A), not the number of columns.

**Common mistakes in practice**

- Using RREF columns as column-space basis vectors (row operations change column space)
- Confusing column space (in ℝᵐ) with row space (in ℝⁿ)
- Forgetting that dim(C(A))=rank(A), not the number of columns

**Visual teaching opportunities**

- Diagram: A maps ℝⁿ → ℝᵐ; C(A) is the image — the achievable outputs
- Show: Ax=b consistent iff b is inside the 'shadow' (column space) of A
- Mark pivot and non-pivot columns in the RREF; trace back to original columns for basis

**Worked example**

*Setup:* For A = [[1,2,2,1],[2,4,3,2],[3,6,5,3]], find the column space: a basis and its dimension. Then determine whether b₁=(1,2,3) and b₂=(1,0,−1) lie in C(A).

1. Step 1: Row-reduce A. From the null-space example above, RREF of A is [[1,2,0,1],[0,0,1,0],[0,0,0,0]]. Pivots in columns 1 and 3.
2. Step 2: Basis for C(A): take columns 1 and 3 of the ORIGINAL A: col₁=(1,2,3), col₃=(2,3,5).
3. Step 3: dim(C(A)) = rank(A) = 2. C(A) is a 2-dimensional subspace of ℝ³.
4. Step 4: Test b₁=(1,2,3): since b₁=1·col₁+0·col₃ ✓, b₁∈C(A) (it IS the first column).
5. Step 5: Test b₂=(1,0,−1): solve c₁(1,2,3)+c₃(2,3,5)=(1,0,−1). System: c₁+2c₃=1; 2c₁+3c₃=0; 3c₁+5c₃=−1. From first two: c₃=2, c₁=−3. Check third: 3(−3)+5(2)=−9+10=1≠−1 — inconsistent.
6. Step 6: b₂∉C(A). Geometrically, C(A) is the plane through origin with normal n, and b₂ lies off this plane.

*Outcome:* C(A) = span{(1,2,3),(2,3,5)}, a plane in ℝ³. b₁∈C(A); b₂∉C(A). The consistency test via the 5th step catches the inconsistency without full row reduction.

**Real-world intuition**

- Linear regression: C(X) (column space of design matrix) is the set of achievable predictions; least-squares finds the projection of y onto C(X)
- Control theory: reachable states from origin = column space of the controllability matrix
- Image recovery: the observed signal b is recoverable iff it lies in the column space of the sensing matrix A

**Practice progression**

Item types: Find a basis for C(A) from pivot columns, Determine if b∈C(A) using augmented matrix, Find dim(C(A)) from the rank, Identify the column space geometrically (line, plane, all of ℝᵐ), Compare C(A) and C(Aᵀ) (column space vs. row space), Prove C(A) is a subspace using the subspace test. Suggested item count: 6.

Find basis → consistency test → geometric description → row space comparison

**Assessment objectives**

Formats: Find column space basis via row reduction + original pivot columns, Consistency test: is b in C(A)?, Describe C(A) geometrically. Bloom alignment: apply.

Mastery signal: Correctly identifies pivot column positions from RREF, extracts original columns for the basis, and tests b-consistency using the augmented matrix.

**Teacher notes**

The most common error: using RREF columns as the column-space basis. Drill: 'row-reduce to FIND which columns are pivot columns; then return to the ORIGINAL matrix to get the basis vectors.' This distinction is fundamental.

**Student notes**

Column space lives in ℝᵐ (one entry per row of A). Null space lives in ℝⁿ (one entry per column of A). They are in different spaces! The pivot columns of the original A form the basis for C(A).

**Prerequisite graph**

- Requires: math.linalg.subspace, math.linalg.span
- Unlocks (future prerequisite links): math.linalg.rank-nullity
- Cross-topic connections (graph cross-links): none
- Narrative: Column space and null space are the two fundamental subspaces used in the rank-nullity theorem. The four fundamental subspaces of A are: C(A) ⊆ ℝᵐ, N(Aᵀ) ⊆ ℝᵐ (left null space), C(Aᵀ) ⊆ ℝⁿ (row space), N(A) ⊆ ℝⁿ — these form two orthogonal complementary pairs.

**Teaching hints — review triggers**

- Taking RREF pivot columns instead of original → review that row ops change columns
- Confusion about which space C(A) lives in → review domain vs. codomain of A
- Consistency test errors → review augmented matrix row reduction

**Spaced repetition / revision guidance**

For each matrix you encounter, find all four fundamental subspaces and verify their dimensions add up correctly: rank+nullity=n (row/null pair) and rank+left-nullity=m (column/left-null pair).

---

### Rank-Nullity Theorem

*Concept ID: `math.linalg.rank-nullity` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** State and apply the rank-nullity theorem to any m×n matrix or linear map, use it to determine solution structure, and verify dimensional constraints.

For a linear map T:V→W (or m×n matrix A): rank(T) + nullity(T) = dim(V) (= n for matrices). Constrains the sizes of image and kernel.

The rank-nullity theorem states: for any m×n matrix A (or linear map T: V→W with dim(V)=n), rank(A) + nullity(A) = n. Here rank(A)=dim(C(A)) (dimension of column space) and nullity(A)=dim(N(A)) (dimension of null space). The theorem says the domain 'splits' into the null space contribution (dimension nullity) and the column space contribution (dimension rank). A must have rank ≤ min(m,n); the theorem constrains the dimensions of the four fundamental subspaces.

**Key ideas**

- rank + nullity = n for any m×n matrix (n = number of columns = dimension of domain)
- rank(A) = dim(C(A)) = number of pivot columns; nullity(A) = n − rank(A) = number of free variables
- Full row rank (rank=m): Ax=b always consistent (column space = all of ℝᵐ)
- Full column rank (rank=n): nullity=0; Ax=b has at most one solution
- The theorem is a special case of the first isomorphism theorem (V/ker(T) ≅ im(T))

**Vocabulary**

- **rank-nullity theorem** — For A m×n: rank(A)+nullity(A)=n; a fundamental constraint on the four subspaces of a matrix
- **rank** — dim(C(A)) = dim(row space of A) = number of pivots
- **nullity** — dim(N(A)) = n − rank = number of free variables in RREF
- **injective (one-to-one)** — T is injective iff ker(T)={0} iff nullity=0
- **surjective (onto)** — T is surjective iff im(T)=W iff rank=dim(W)

**Common misconceptions**

- *Misconception:* rank + nullity = m (the number of rows).
  *Correction:* rank + nullity = n, the number of COLUMNS (dimension of the DOMAIN). The theorem counts how the domain is used, not how the codomain is filled.
- *Misconception:* If A has more rows than columns, the null space must be non-trivial.
  *Correction:* If m>n, then rank(A) ≤ n, so nullity(A)=n−rank(A)≥0. If rank(A)=n (full column rank), nullity(A)=0 regardless of m.
- *Misconception:* Rank-nullity only applies to square matrices.
  *Correction:* The theorem applies to any m×n matrix and to any linear map between finite-dimensional spaces.

**Common mistakes in practice**

- Using rank+nullity=m instead of =n
- Confusing rank of A with rank of Aᵀ (they are equal, but the subspaces are different)
- Applying the theorem to conclude n=m from rank+nullity=n when m≠n

**Visual teaching opportunities**

- Bar diagram: domain of dimension n split into rank portion (mapped injectively) and nullity portion (collapsed to zero)
- Table: for A m×n, list rank, nullity, consistency of Ax=b, and uniqueness for the four cases (full row rank, full col rank, both, neither)
- Show: for A 3×4 with rank 2, the bar splits into 2 (injective part) + 2 (null space) = 4

**Worked example**

*Setup:* For A = [[1,2,2,1],[2,4,3,2],[3,6,5,3]] (3×4, from previous examples), verify the rank-nullity theorem and describe the solution structure of Ax=b.

1. Step 1: From RREF, rank(A) = 2 (two pivots in columns 1 and 3).
2. Step 2: nullity(A) = n − rank = 4 − 2 = 2 (two free variables: x₂ and x₄).
3. Step 3: Rank-nullity check: rank + nullity = 2 + 2 = 4 = n ✓.
4. Step 4: Solution structure of Ax=b: since rank=2 < m=3, Ax=b is consistent iff b∈C(A) (not guaranteed). When consistent, the general solution is x = x_particular + N(A) — a 2-dimensional flat (affine plane).
5. Step 5: Since rank=2 < n=4, Ax=b has infinitely many solutions when consistent (nullity=2 means 2 free parameters).
6. Step 6: Since rank=2 < m=3, not all b∈ℝ³ are achievable — there are b-vectors for which Ax=b has no solution.

*Outcome:* rank=2, nullity=2, rank+nullity=4=n ✓. For any consistent b, the solution set is a 2-dimensional affine subspace (coset of N(A)).

**Real-world intuition**

- Machine learning: number of free parameters in a model layer = nullity of the weight matrix's constraint structure
- Signal processing: the rank-nullity theorem bounds how many signals can pass through a filter without distortion
- Economics: in an input-output model, nullity tells you how many price vectors yield the same output

**Practice progression**

Item types: Given rank and matrix size, find nullity, Use rank-nullity to determine solution uniqueness/existence, Verify rank+nullity=n for a computed example, For T:ℝ⁵→ℝ³ with dim(ker)=2, find rank and dim(im), Prove: injective map iff nullity=0; surjective iff rank=m, Apply theorem to determine when Ax=b always has a solution. Suggested item count: 6.

Numerical verification → solution structure consequences → abstract map application → injectivity/surjectivity

**Assessment objectives**

Formats: State and verify rank-nullity for a specific matrix, Use rank-nullity to deduce solution count, Abstract: apply to a linear map T: V→W. Bloom alignment: understand.

Mastery signal: Correctly computes rank and nullity, verifies their sum equals n, and uses the result to classify solution existence and uniqueness for Ax=b.

**Teacher notes**

Emphasise rank+nullity=n (columns, domain), not m (rows, codomain). This is where most errors occur. Use the domain-splits interpretation: the n-dimensional domain is partitioned into the part that gets compressed to 0 (nullity) and the part that maps injectively (rank).

**Student notes**

Quick reference: for an m×n matrix A with rank r: nullity=n−r; C(A) has dim r in ℝᵐ; N(A) has dim n−r in ℝⁿ. For Ax=b: consistent iff b∈C(A); unique solution iff nullity=0.

**Prerequisite graph**

- Requires: math.linalg.rank, math.linalg.null-space, math.linalg.column-space, math.linalg.dimension
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Rank-nullity is the central result connecting the four fundamental subspaces (Strang's framework). It is a special case of the first isomorphism theorem. In functional analysis it generalises (with care) to bounded operators; in coding theory, it relates the dimension of a code to its parity-check matrix.

**Teaching hints — review triggers**

- Confusing n (columns) with m (rows) → review matrix dimensions and domain/codomain
- Cannot compute rank from RREF → review pivot counting
- Errors in solution classification → review consistent/inconsistent system conditions

**Spaced repetition / revision guidance**

For every matrix you work with, habitually compute rank and nullity and verify rank+nullity=n. Then trace through the solution classification: Is b always in C(A)? Is the solution unique? How many parameters does the solution set have?

---

### Linear Map

*Concept ID: `math.linalg.linear-map` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Define and verify linear maps using the two axioms, determine a linear map from its action on a basis, and connect linear maps to matrix multiplication.

A map T:V→W satisfying T(u+v)=T(u)+T(v) and T(cv)=cT(v). Completely determined by its action on a basis. Every linear map between finite-dimensional spaces is represented by a matrix in given bases.

A linear map (linear transformation) T: V→W satisfies two axioms: (1) T(u+v)=T(u)+T(v) (additivity) and (2) T(cv)=cT(v) (homogeneity). Combined: T(c₁u+c₂v)=c₁T(u)+c₂T(v). A linear map is completely determined by its values on a basis of V. Every linear map between finite-dimensional spaces can be represented as matrix multiplication: choose ordered bases for V and W, then T↔A where T(v)=A·[v]_B in those bases. Kernel=null space, image=column space.

**Key ideas**

- Two axioms: additivity T(u+v)=T(u)+T(v) and homogeneity T(cv)=cT(v); combined: T(αu+βv)=αT(u)+βT(v)
- A linear map is determined by its action on a basis: if {b₁,…,bₙ} is a basis of V, specifying T(b₁),…,T(bₙ) determines T completely
- Matrix representation: columns of A are T(b₁),…,T(bₙ) expressed in the basis of W
- Kernel of T = null space of A; image of T = column space of A
- Composition of linear maps ↔ matrix multiplication

**Vocabulary**

- **linear map (linear transformation)** — T: V→W satisfying T(u+v)=T(u)+T(v) and T(cv)=cT(v)
- **kernel (ker T)** — {v∈V: T(v)=0}; the null space of the matrix representation
- **image (im T)** — {T(v): v∈V}; the column space of the matrix representation
- **isomorphism** — A bijective linear map; exists iff dim(V)=dim(W) and the map is invertible
- **matrix of a linear map** — The matrix A with columns T(b₁),…,T(bₙ) expressed in the basis of W; A is basis-dependent

**Common misconceptions**

- *Misconception:* Every function between vector spaces is linear.
  *Correction:* T must satisfy BOTH axioms. T(x)=x²: T(1+1)=4≠T(1)+T(1)=2. T(x)=x+1: T(0)=1≠0 — fails T(cv)=cT(v) at c=0.
- *Misconception:* A linear map must be represented by the same matrix in all bases.
  *Correction:* The matrix representation of T depends on the choice of bases for V and W. Different bases give similar matrices (related by B'=P⁻¹AP).
- *Misconception:* T(0)=0 is sufficient to show T is linear.
  *Correction:* T(0)=0 is necessary but not sufficient. Both additivity and homogeneity must be verified.

**Common mistakes in practice**

- Putting T(e₁), T(e₂), … as ROWS instead of COLUMNS of A
- Forgetting to verify both additivity AND homogeneity (checking one is not enough)
- Confusing composition order: T∘S corresponds to matrix product AS, not SA

**Visual teaching opportunities**

- Arrow diagram: T: V→W with basis vectors in V being mapped to specific vectors in W, then filled in by linearity
- Show: T(x,y)=(2x+y, x−y) passes both axioms; T(x,y)=(x²,y) fails additivity
- Commutative diagram: coordinate-change then matrix multiply = apply map then coordinate-change

**Worked example**

*Setup:* Let T: ℝ²→ℝ² be defined by T(x,y)=(2x+y, x−y). Verify T is linear, find its matrix representation in the standard basis, then compute T(3,1).

1. Step 1: Verify additivity. T((u₁,u₂)+(v₁,v₂))=T(u₁+v₁,u₂+v₂)=(2(u₁+v₁)+(u₂+v₂),(u₁+v₁)−(u₂+v₂))=(2u₁+u₂,u₁−u₂)+(2v₁+v₂,v₁−v₂)=T(u)+T(v) ✓.
2. Step 2: Verify homogeneity. T(c(x,y))=T(cx,cy)=(2cx+cy,cx−cy)=c(2x+y,x−y)=cT(x,y) ✓.
3. Step 3: Find matrix A. Column 1 = T(e₁)=T(1,0)=(2,1); Column 2 = T(e₂)=T(0,1)=(1,−1). So A=[[2,1],[1,−1]].
4. Step 4: Verify: A·(x,y)ᵀ=[[2,1],[1,−1]]·(x,y)ᵀ=(2x+y,x−y) ✓ — matches the definition.
5. Step 5: Compute T(3,1) via matrix: A·(3,1)ᵀ=((2·3+1),(3−1))=(7,2).
6. Step 6: Verify directly: T(3,1)=(2·3+1, 3−1)=(7,2) ✓.

*Outcome:* T is linear. Matrix A=[[2,1],[1,−1]]. T(3,1)=(7,2). The matrix representation packages all of T's action into a single 2×2 array.

**Real-world intuition**

- Computer graphics: all geometric transformations (rotation, scaling, shear, reflection) are linear maps, represented by matrices
- Physics: differential operators (d/dx, Laplacian) are linear maps on function spaces
- Machine learning: each layer in a linear neural network is a linear map; adding nonlinear activation makes it nonlinear

**Practice progression**

Item types: Verify/falsify linearity for a given function, Find the matrix of a linear map T: ℝ²→ℝ² from its definition, Find the matrix of T: ℝ³→ℝ² by computing T on basis vectors, Determine the kernel and image of a linear map, Composition: find the matrix of T∘S from matrices of T and S, Show a function T(x)=Ax+b is NOT linear when b≠0. Suggested item count: 6.

Verify linearity → find matrix from definition → composition → kernel/image → abstract map on polynomials

**Assessment objectives**

Formats: Verify both linearity axioms for a given function, Construct the matrix of a linear map from basis images, Find kernel and image of a linear map. Bloom alignment: understand.

Mastery signal: Correctly verifies both axioms, assembles the matrix from T(e₁),T(e₂), and uses the matrix to compute T at specific inputs.

**Teacher notes**

The key insight: a linear map is completely determined by where it sends a basis. This makes computations tractable — once you know T on n basis vectors, you know T everywhere. Use this to motivate why matrix multiplication represents composition of linear maps.

**Student notes**

To find the matrix of T in the standard basis: compute T(e₁), T(e₂), …, T(eₙ) and make them the columns of A. Then T(v)=Av for any v. This is the bridge between abstract maps and concrete matrix computations.

**Prerequisite graph**

- Requires: math.linalg.vector-space, math.linalg.matrix
- Unlocks (future prerequisite links): math.linalg.kernel-image, math.linalg.matrix-representation
- Cross-topic connections (graph cross-links): math.abst.group-homomorphism, math.fnal.bounded-operator
- Narrative: Linear maps are the morphisms of the category of vector spaces. The matrix representation (basis-dependent) connects abstract map theory to computational linear algebra. Kernel = null space, image = column space, and rank-nullity applies. Change of basis gives similar matrices — the same map in different coordinates.

**Teaching hints — review triggers**

- Cannot verify additivity correctly → review vector addition and algebraic manipulation
- Errors in assembling matrix from T(e₁),T(e₂) → review matrix column structure
- Confusion between linear and affine maps → review T(0)=0 as a necessary (not sufficient) condition

**Spaced repetition / revision guidance**

For each linear map you encounter: (1) verify both axioms; (2) find the matrix by computing T on each standard basis vector; (3) find the kernel (null space) and image (column space) of that matrix; (4) verify rank+nullity=n.

---

### Kernel and Image of Linear Map

*Concept ID: `math.linalg.kernel-image` · Difficulty: proficient · Bloom level: understand · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Compute the kernel and image of a linear map, determine their dimensions, and use them to classify the map as injective and/or surjective.

ker(T) = {v : T(v)=0} is a subspace of V; im(T) = {T(v) : v∈V} is a subspace of W. T is injective iff ker(T)={0}; T is surjective iff im(T)=W.

For a linear map T: V→W, the kernel ker(T)={v∈V: T(v)=0} is a subspace of V and the image im(T)={T(v): v∈V} is a subspace of W. T is injective iff ker(T)={0} and surjective iff im(T)=W. By the rank-nullity theorem: dim(ker(T))+dim(im(T))=dim(V). Finding ker(T) = finding the null space of the matrix of T; finding im(T) = finding the column space.

**Key ideas**

- ker(T) is a subspace of V (domain); im(T) is a subspace of W (codomain)
- T injective ⟺ ker(T)={0} ⟺ nullity=0; T surjective ⟺ im(T)=W ⟺ rank=dim(W)
- dim(ker T)+dim(im T)=dim(V) — rank-nullity in abstract form
- ker(T) = null space of A; im(T) = column space of A (via matrix representation)
- For bijective T: ker={0} AND im=W; such T is an isomorphism

**Vocabulary**

- **kernel ker(T)** — {v∈V: T(v)=0}; a subspace of the domain V
- **image im(T)** — {T(v): v∈V}; a subspace of the codomain W
- **injective (one-to-one)** — ker(T)={0}; distinct inputs give distinct outputs
- **surjective (onto)** — im(T)=W; every element of W is achieved
- **isomorphism** — Bijective linear map (injective + surjective); V and W are isomorphic iff dim(V)=dim(W)

**Common misconceptions**

- *Misconception:* ker(T) and im(T) are subsets of the same space.
  *Correction:* ker(T)⊆V (domain) and im(T)⊆W (codomain) — they live in different spaces. Only when V=W is it possible for them to be compared directly.
- *Misconception:* If T(0)=0, then ker(T)={0}.
  *Correction:* T(0)=0 holds for every linear map (it follows from homogeneity). The kernel is trivial only if no NONZERO vector maps to 0.
- *Misconception:* A linear map between spaces of the same dimension is always bijective.
  *Correction:* T: ℝ²→ℝ² with T(x,y)=(x+y,0) is neither injective (ker≠{0}) nor surjective (im is a line, not ℝ²). Bijectivity requires rank=n and nullity=0.

**Common mistakes in practice**

- Saying ker(T) is in W or im(T) is in V
- Confusing 'dim(ker)=0' (injective) with 'ker is empty' (ker always contains 0)
- For T: ℝⁿ→ℝᵐ with m<n, forgetting that T cannot be injective (by rank-nullity)

**Visual teaching opportunities**

- Arrow diagram: V → W, with ker(T) shaded in V (the 'shadow' that collapses to 0) and im(T) shaded in W (the achievable outputs)
- Show: for T: ℝ³→ℝ², the kernel must have dimension ≥1 by rank-nullity
- Table: (injective, not surjective), (surjective, not injective), (bijective), (neither) with examples

**Worked example**

*Setup:* Let T: ℝ³→ℝ² be defined by T(x,y,z)=(x+y, y+z). Find ker(T), im(T), and classify T as injective/surjective.

1. Step 1: Find ker(T). Solve T(x,y,z)=(0,0): x+y=0 and y+z=0. Set y=t; then x=−t, z=−t. ker(T)={t(−1,1,−1): t∈ℝ}=span{(−1,1,−1)}. dim(ker T)=1.
2. Step 2: T is NOT injective since ker(T)≠{0}.
3. Step 3: Find im(T). Matrix A=[[1,1,0],[0,1,1]]. Pivot columns: 1 and 2 (from RREF). im(T)=span{col₁,col₂}=span{(1,0),(1,1)}.
4. Step 4: Since (1,0) and (1,1) are linearly independent and span ℝ², im(T)=ℝ². dim(im T)=2.
5. Step 5: T is SURJECTIVE since im(T)=ℝ².
6. Step 6: Rank-nullity check: dim(ker)+dim(im)=1+2=3=dim(ℝ³)=dim(V) ✓.

*Outcome:* ker(T)=span{(−1,1,−1)} (dim 1); im(T)=ℝ² (dim 2). T is surjective but not injective. The rank-nullity theorem is satisfied.

**Real-world intuition**

- Signal processing: ker of a filter = signals that are completely blocked; im = achievable output signals
- Robotics: ker of Jacobian = joint motions with no end-effector movement; im = achievable end-effector velocities
- Cryptography: injective encoding maps ensure no information loss; surjective decoding maps cover all possible outputs

**Practice progression**

Item types: Find ker and im for a 2×3 matrix map, Classify a map as injective/surjective given its matrix, Show ker is a subspace using the three-condition test, For T: P₂→ℝ, find ker and im, Given dim(V)=5, rank=3, find dim(ker) and classify injectivity/surjectivity, Prove: T injective iff ker={0}. Suggested item count: 6.

Matrix map → abstract linear map → injectivity/surjectivity proofs → abstract vector spaces

**Assessment objectives**

Formats: Compute ker and im with bases, Classify as injective/surjective with justification, Verify rank-nullity via ker and im dimensions. Bloom alignment: understand.

Mastery signal: Correctly finds ker (null space) and im (column space), gives bases for both, classifies injectivity/surjectivity, and verifies rank-nullity.

**Teacher notes**

Emphasise the domain/codomain asymmetry: ker lives in V, im lives in W. Draw this explicitly. The rank-nullity theorem is the bridge: dim(ker)+dim(im)=dim(V).

**Student notes**

To check injectivity: solve Av=0 — if only v=0 works, ker={0}, T is injective. To check surjectivity: check if rank(A)=dim(W) (number of rows) — if yes, every b is achievable.

**Prerequisite graph**

- Requires: math.linalg.linear-map
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.abst.group-homomorphism
- Narrative: Kernel and image are the first isomorphism theorem: V/ker(T) ≅ im(T). In abstract algebra, the kernel of a group/ring homomorphism has the same role. The rank-nullity theorem is the linear-algebra version of this isomorphism theorem.

**Teaching hints — review triggers**

- Confusion about domain vs. codomain space → review linear map V→W structure
- Errors in null space computation → review row reduction for ker
- Misclassification of injectivity/surjectivity → review definitions

**Spaced repetition / revision guidance**

For any linear map T, habitually compute ker and im, give bases, verify rank-nullity, and classify injectivity/surjectivity. Do this for matrix maps, differential operators, and polynomial evaluation maps.

---

### Matrix Representation of Linear Map

*Concept ID: `math.linalg.matrix-representation` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 4h*

**Learning objective.** Construct the matrix of a linear map T: V→W in given ordered bases, use it to compute T by matrix multiplication, and connect composition of maps to matrix multiplication.

Given ordered bases β of V and γ of W, the matrix [T]_{γβ} has columns [T(bⱼ)]_γ. Matrix multiplication then corresponds to composition of linear maps: [T∘S]=[T][S].

Given ordered bases B={b₁,…,bₙ} of V and C={c₁,…,cₘ} of W, the matrix [T]_{CB} is the m×n matrix whose jth column is [T(bⱼ)]_C (the C-coordinates of the image of the jth basis vector). Then T(v)↔[T]_{CB}·[v]_B in coordinates. Composition corresponds to multiplication: [T∘S]=[T][S]. Change of basis yields similar matrices: B=[T]_{B'B'} = P⁻¹[T]_{BB}·P.

**Key ideas**

- jth column of [T]_{CB} = [T(bⱼ)]_C: express each T(bⱼ) in the basis C
- Once A=[T]_{CB} is known, T(v) is computed as A·[v]_B
- Composition: [T∘S]_{DB} = [T]_{DC}·[S]_{CB}
- Same map in two bases: [T]_{B'} = P⁻¹[T]_B P (similar matrices)
- Standard basis simplification: A has columns T(e₁),…,T(eₙ) expressed in standard basis of W

**Vocabulary**

- **[T]_{CB}** — m×n matrix representing T: V→W in bases B of V and C of W; jth column = [T(bⱼ)]_C
- **coordinate isomorphism** — The map v ↦ [v]_B that converts between abstract vectors and coordinate tuples
- **similar matrices** — A and P⁻¹AP represent the same linear map in different bases; they have the same eigenvalues, trace, and determinant

**Common misconceptions**

- *Misconception:* The matrix of T has T(b₁),…,T(bₙ) as its rows.
  *Correction:* The images T(b₁),…,T(bₙ) expressed in basis C form the COLUMNS, not rows, of [T]_{CB}.
- *Misconception:* The matrix of T is basis-independent.
  *Correction:* The matrix depends on both the basis of V and the basis of W. The same linear map has infinitely many matrix representations — one per pair of bases.
- *Misconception:* [T∘S] = [S]·[T].
  *Correction:* Composition order: [T∘S]=[T]·[S] — the rightmost matrix is applied first, matching function composition right-to-left.

**Common mistakes in practice**

- Putting T(bⱼ) as rows instead of columns
- Forgetting to express T(bⱼ) in basis C (using standard coords instead)
- Wrong composition order: [T∘S]=[T][S] not [S][T]

**Visual teaching opportunities**

- Commutative diagram: V →(T)→ W with vertical coordinate maps [·]_B and [·]_C and horizontal matrix multiplication
- Show: differentiation on P₂ has a sparse matrix — drill the column-by-column construction
- Side-by-side: same map T in two different bases gives two different (similar) matrices

**Worked example**

*Setup:* Let T: P₂→P₂ be differentiation (T(p)=p'). Using the standard basis B={1,x,x²}, find the matrix [T]_B and use it to compute T(x²+3x+1).

1. Step 1: Compute T on each basis vector. T(1)=0=0·1+0·x+0·x² → [T(1)]_B=(0,0,0). T(x)=1=1·1+0·x+0·x² → [T(x)]_B=(1,0,0). T(x²)=2x=0·1+2·x+0·x² → [T(x²)]_B=(0,2,0).
2. Step 2: Assemble [T]_B with these as columns: [T]_B = [[0,1,0],[0,0,2],[0,0,0]].
3. Step 3: Coordinate vector of p=x²+3x+1 in B: [p]_B=(1,3,1) (coefficients of 1, x, x²).
4. Step 4: Compute [T(p)]_B = [T]_B · [p]_B = [[0,1,0],[0,0,2],[0,0,0]]·(1,3,1) = (0·1+1·3+0·1, 0+0+2·1, 0+0+0) = (3,2,0).
5. Step 5: Recover T(p) from coordinates: 3·1+2·x+0·x² = 2x+3.
6. Step 6: Verify directly: T(x²+3x+1) = (x²+3x+1)' = 2x+3 ✓.

*Outcome:* [T]_B=[[0,1,0],[0,0,2],[0,0,0]], T(x²+3x+1)=2x+3 confirmed. The matrix represents differentiation abstractly; matrix multiplication replaces differentiation computation.

**Real-world intuition**

- Finite element method: differentiation and integration operators become sparse matrices in the basis of hat functions
- Quantum mechanics: observable operators (position, momentum) are represented as matrices in chosen basis states
- Image processing: convolution filters are linear maps with matrix representations in pixel bases

**Practice progression**

Item types: Find [T]_{std} for T: ℝ²→ℝ² given by formula, Find [T]_B for a non-standard basis B, Compute T(v) using matrix multiplication vs. directly, Find [T∘S] from [T] and [S], Verify similar matrices for same map in two bases, Polynomial differentiation or integration as matrix. Suggested item count: 6.

Standard basis ℝ² → non-standard basis → polynomial space → composition → change of basis

**Assessment objectives**

Formats: Construct matrix by computing images of basis vectors, Use matrix to evaluate T at a specific input, Verify composition via matrix product. Bloom alignment: apply.

Mastery signal: Correctly constructs [T]_B column by column, uses it to compute T(v) by matrix multiplication, and verifies the result matches the direct formula.

**Teacher notes**

The column-by-column construction is the core skill. Practise: 'take each basis vector bⱼ, apply T, express the result in basis C, put it as column j.' Repeat until automatic.

**Student notes**

Always process basis vectors one at a time: apply T to each, convert to C-coordinates, put in the next column. The matrix 'encodes' T — once assembled, T(v)=A·[v]_B replaces the original definition.

**Prerequisite graph**

- Requires: math.linalg.linear-map, math.linalg.basis
- Unlocks (future prerequisite links): math.linalg.change-of-basis
- Cross-topic connections (graph cross-links): none
- Narrative: Matrix representation connects linear maps to matrix algebra. It motivates similarity (change of basis), diagonalisation (the eigenvector basis makes D=[T]_eigenbasis diagonal), and the spectral theorem (orthonormal eigenvector basis gives orthogonal diagonalisation).

**Teaching hints — review triggers**

- Cannot find [T(bⱼ)]_C → review coordinate vector computation
- Wrong column/row orientation → review matrix assembly from column vectors
- Composition order errors → review matrix multiplication and function composition

**Spaced repetition / revision guidance**

Practise the construction on at least three maps: a geometric transformation in ℝ², differentiation on P₂, and a map from ℝ³ to ℝ². For each, verify that A·[v]_B matches T(v) computed directly.

---

### Eigenvalues and Eigenvectors

*Concept ID: `math.linalg.eigenvalues` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 6h*

**Learning objective.** Find eigenvalues and eigenvectors of a matrix by solving det(A−λI)=0 and the corresponding null spaces, and verify each eigenvector satisfies Av=λv.

Av=λv for a nonzero vector v; λ is an eigenvalue, v is an eigenvector. Eigenvectors are fixed directions under the transformation; eigenvalues give the scaling factors.

A scalar λ is an eigenvalue of A if Av=λv for some nonzero vector v (the eigenvector). Geometrically: an eigenvector is a fixed direction under the transformation A; the eigenvalue is the scaling factor. To find eigenvalues: solve the characteristic equation det(A−λI)=0. For each eigenvalue, find eigenvectors by solving (A−λI)v=0 (i.e., find the null space of A−λI).

**Key ideas**

- Av=λv with v≠0: eigenvectors are directions left invariant (only scaled) by A
- Eigenvalues are roots of the characteristic polynomial p(λ)=det(A−λI)
- For each λ, eigenvectors are null space of (A−λI); never unique (scalar multiples are eigenvectors)
- Eigenvalues can be complex even for real matrices; real symmetric matrices always have real eigenvalues
- trace(A)=sum of eigenvalues; det(A)=product of eigenvalues

**Vocabulary**

- **eigenvalue λ** — Scalar such that Av=λv for some nonzero v; root of det(A−λI)=0
- **eigenvector v** — Nonzero vector satisfying Av=λv; direction preserved (up to scaling) by A
- **characteristic polynomial** — p(λ)=det(A−λI); eigenvalues are its roots
- **trace** — Sum of diagonal entries = sum of eigenvalues; tr(A)=Σλᵢ
- **spectrum** — The set of all eigenvalues of A

**Common misconceptions**

- *Misconception:* The zero vector is an eigenvector.
  *Correction:* Eigenvectors must be nonzero. The zero vector satisfies A·0=λ·0 for any λ — it is excluded to make eigenvalues well-defined.
- *Misconception:* Every matrix has n distinct real eigenvalues.
  *Correction:* Eigenvalues can repeat (degenerate) and can be complex. A rotation matrix in ℝ² has no real eigenvalues.
- *Misconception:* Av=λv means v is unchanged; only the magnitude changes by λ.
  *Correction:* If λ<0, the direction of v is reversed. If λ is complex, the 'scaling' includes rotation. Only if λ>0 is the direction preserved with magnitude scaling.

**Common mistakes in practice**

- Setting up det(λI−A) instead of det(A−λI) (sign error in characteristic polynomial)
- Forgetting that eigenvectors must be NONZERO
- Taking only one eigenvector when the eigenspace has dimension > 1

**Visual teaching opportunities**

- Show a 2×2 transformation: some vectors rotate and stretch; eigenvectors only stretch (stay on same line through origin)
- Geometric: for a shear or scaling matrix, identify eigenvectors as fixed axes
- Graph: the characteristic polynomial p(λ)=det(A−λI) plotted against λ; eigenvalues are x-intercepts

**Worked example**

*Setup:* Find the eigenvalues and eigenvectors of A = [[2,1],[1,2]].

1. Step 1: Set up characteristic equation: det(A−λI) = det([[2−λ,1],[1,2−λ]]) = (2−λ)²−1 = λ²−4λ+3 = (λ−1)(λ−3) = 0.
2. Step 2: Eigenvalues: λ₁=1 and λ₂=3.
3. Step 3: Eigenvector for λ₁=1: solve (A−I)v=0. A−I=[[1,1],[1,1]]. Row reduce: [[1,1],[0,0]]. Free variable v₂=t; v₁=−t. Eigenvector: v₁=(1,−1) (take t=−1).
4. Step 4: Eigenvector for λ₂=3: solve (A−3I)v=0. A−3I=[[−1,1],[1,−1]]. Row reduce: [[1,−1],[0,0]]. Free variable v₂=t; v₁=t. Eigenvector: v₂=(1,1).
5. Step 5: Verify: A(1,−1)=(2−1,1−2)=(1,−1)=1·(1,−1) ✓; A(1,1)=(2+1,1+2)=(3,3)=3·(1,1) ✓.
6. Step 6: Trace check: trace(A)=2+2=4=1+3=λ₁+λ₂ ✓; det(A)=4−1=3=1·3=λ₁λ₂ ✓.

*Outcome:* Eigenvalues λ=1 (eigenvector (1,−1)) and λ=3 (eigenvector (1,1)). The matrix A=[[2,1],[1,2]] stretches along (1,1) by factor 3 and along (1,−1) by factor 1.

**Real-world intuition**

- Structural engineering: eigenvalues of the stiffness matrix give natural frequencies; eigenvectors give vibration mode shapes
- Google PageRank: the dominant eigenvector of the link matrix gives page importance scores
- Quantum mechanics: eigenvalues of the Hamiltonian operator are observable energy levels

**Practice progression**

Item types: 2×2 eigenvalue/eigenvector computation, 3×3 characteristic polynomial and one eigenvalue, Find eigenvectors once eigenvalues are given, Verify trace = sum of eigenvalues, det = product, Classify: does A have real eigenvalues? (rotation matrix), Symmetric matrix: verify real eigenvalues and orthogonal eigenvectors. Suggested item count: 6.

2×2 full computation → 3×3 characteristic polynomial → geometric interpretation → symmetric matrix properties

**Assessment objectives**

Formats: Full 2×2 or 3×3 eigenvalue computation, Verify Av=λv for given pairs, Trace/det check as eigenvalue verification. Bloom alignment: apply.

Mastery signal: Solves the characteristic equation, finds at least one eigenvector per eigenvalue, and verifies Av=λv with no arithmetic errors.

**Teacher notes**

The trace/det verification is an excellent self-check students can always run. Also emphasise that eigenvectors are not unique — any scalar multiple is also an eigenvector for the same λ.

**Student notes**

Steps: (1) compute det(A−λI) and factor; (2) for each λ, row-reduce A−λI and find the null space; (3) verify Av=λv. Always run the trace and det checks to catch arithmetic errors early.

**Prerequisite graph**

- Requires: math.linalg.matrix-multiplication, math.linalg.determinant
- Unlocks (future prerequisite links): math.linalg.diagonalization, math.linalg.spectral-theorem
- Cross-topic connections (graph cross-links): math.de.char-equation, math.fnal.spectral-theory
- Narrative: Eigenvalues and eigenvectors are the core of diagonalisation (eigenvector matrix P diagonalises A), the spectral theorem (symmetric matrices have orthogonal eigenvectors), and the characteristic polynomial (cross-links to ODE characteristic equations).

**Teaching hints — review triggers**

- Errors in det(A−λI) → review 2×2 or 3×3 determinant computation
- Null space errors for eigenvectors → review row reduction of homogeneous system
- Eigenvalue not satisfying trace/det check → arithmetic error in characteristic polynomial

**Spaced repetition / revision guidance**

Compute eigenvalues and eigenvectors for at least three matrices: a 2×2 with distinct eigenvalues, a 2×2 with repeated eigenvalue, and a 3×3 triangular matrix. Verify each with Av=λv and trace/det.

---

### Characteristic Polynomial

*Concept ID: `math.linalg.characteristic-polynomial` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Compute and factor the characteristic polynomial det(A−λI) to find all eigenvalues, state the Cayley-Hamilton theorem, and verify it for a specific matrix.

p(λ) = det(A−λI); eigenvalues are its roots. Degree n polynomial for n×n matrix. Cayley-Hamilton theorem states A satisfies its own characteristic polynomial: p(A)=0.

The characteristic polynomial of an n×n matrix A is p(λ)=det(A−λI), a degree-n polynomial in λ. Its roots (with multiplicity) are the eigenvalues of A. The coefficient of λⁿ is (−1)ⁿ; the constant term is det(A) (value at λ=0); the coefficient of λⁿ⁻¹ is (−1)ⁿ⁻¹·trace(A). The Cayley-Hamilton theorem: every matrix satisfies its own characteristic polynomial, p(A)=0.

**Key ideas**

- p(λ) = det(A−λI): degree n, roots are eigenvalues (counted with algebraic multiplicity)
- p(0) = det(A); coefficient of λⁿ⁻¹ is (−1)ⁿ⁻¹·trace(A)
- For 2×2: p(λ)=λ²−trace(A)·λ+det(A)
- Cayley-Hamilton: substituting A for λ in p gives p(A)=0
- Algebraic multiplicity of λᵢ = multiplicity as a root of p(λ)

**Vocabulary**

- **characteristic polynomial p(λ)** — det(A−λI); degree-n polynomial whose roots are the eigenvalues of A
- **algebraic multiplicity** — Multiplicity of λᵢ as a root of p(λ)
- **Cayley-Hamilton theorem** — Every square matrix satisfies its own characteristic polynomial: p(A)=0 (matrix zero)
- **minimal polynomial** — The monic polynomial of smallest degree that annihilates A; divides the characteristic polynomial

**Common misconceptions**

- *Misconception:* p(λ)=det(λI−A) and p(λ)=det(A−λI) are different polynomials.
  *Correction:* They differ by a factor (−1)ⁿ: det(λI−A)=(−1)ⁿdet(A−λI). They have the same roots; the convention det(A−λI) is more standard in some texts.
- *Misconception:* The Cayley-Hamilton theorem says A satisfies p(λ)=0 as a scalar equation.
  *Correction:* p(A)=0 means substituting the MATRIX A for λ gives the zero MATRIX. For A 2×2 with p(λ)=λ²−5λ+6, Cayley-Hamilton says A²−5A+6I=0 (matrix equation).
- *Misconception:* The characteristic polynomial has exactly n distinct roots.
  *Correction:* Roots can repeat (algebraic multiplicity > 1). A could have one eigenvalue with multiplicity n.

**Common mistakes in practice**

- Computing det(A)−λ·I instead of det(A−λI) (wrong operation)
- Forgetting to subtract trace in the λ coefficient for 2×2
- Confusing algebraic multiplicity (root multiplicity of p) with geometric multiplicity (eigenspace dimension)

**Visual teaching opportunities**

- For 2×2: show how p(λ)=λ²−tr(A)λ+det(A) comes from cofactor expansion of det(A−λI)
- Graph: plot p(λ) for a 2×2 matrix — roots are eigenvalues; label algebraic multiplicities
- Cayley-Hamilton verification step-by-step for a 2×2 matrix

**Worked example**

*Setup:* For A = [[3,1],[0,2]], find the characteristic polynomial, its roots, and verify the Cayley-Hamilton theorem.

1. Step 1: Compute p(λ) = det(A−λI) = det([[3−λ,1],[0,2−λ]]) = (3−λ)(2−λ) − 0 = λ²−5λ+6.
2. Step 2: Factor: p(λ) = (λ−2)(λ−3). Eigenvalues: λ₁=2, λ₂=3.
3. Step 3: Check: p(0)=6=det(A)=3·2−0·1=6 ✓; coefficient of λ is −5 = −trace(A) = −(3+2) ✓.
4. Step 4: Cayley-Hamilton: must verify p(A)=A²−5A+6I=0.
5. Step 5: Compute A²=[[3,1],[0,2]]·[[3,1],[0,2]]=[[9+0,3+2],[0+0,0+4]]=[[9,5],[0,4]].
6. Step 6: A²−5A+6I = [[9,5],[0,4]] − [[15,5],[0,10]] + [[6,0],[0,6]] = [[9−15+6, 5−5+0],[0−0+0, 4−10+6]] = [[0,0],[0,0]] = 0 ✓.

*Outcome:* p(λ)=λ²−5λ+6=(λ−2)(λ−3); eigenvalues 2 and 3. Cayley-Hamilton verified: A²−5A+6I=0.

**Real-world intuition**

- Control theory: characteristic polynomial of a system matrix determines stability (roots must be in left half-plane)
- Vibration analysis: characteristic polynomial of the stiffness matrix gives natural frequencies
- Cayley-Hamilton in engineering: reduces matrix polynomial computations (Aⁿ for large n) using the minimal polynomial

**Practice progression**

Item types: Compute the characteristic polynomial for a 2×2 matrix, Find eigenvalues from a given characteristic polynomial, Identify algebraic multiplicities from the factored polynomial, Verify Cayley-Hamilton for a 2×2 matrix, Use Cayley-Hamilton to compute A⁻¹ (if det(A)≠0, then A⁻¹=-(1/det(A))(A−trace(A)I)), For a 3×3 triangular matrix: read eigenvalues directly from diagonal; verify with p(λ). Suggested item count: 6.

2×2 computation → factoring and multiplicities → Cayley-Hamilton → applications of the theorem

**Assessment objectives**

Formats: Compute and factor p(λ) for a 2×2 matrix, Verify Cayley-Hamilton numerically, Identify eigenvalues with algebraic multiplicities. Bloom alignment: apply.

Mastery signal: Correctly computes det(A−λI), factors it, reads eigenvalues with multiplicities, and verifies p(A)=0 numerically.

**Teacher notes**

Cayley-Hamilton is counterintuitive — stress that we substitute the MATRIX into the polynomial, not a scalar. Verify numerically to make it concrete before proving it.

**Student notes**

For 2×2 matrices, memorise p(λ)=λ²−tr(A)λ+det(A). This shortcut avoids expanding the determinant explicitly. Always check: p(0)=det(A) and coefficient of λ equals −trace(A).

**Prerequisite graph**

- Requires: math.linalg.eigenvalues, math.linalg.determinant
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.de.char-equation
- Narrative: Characteristic polynomial directly cross-links to ODE characteristic equations (math.de.char-equation: the characteristic polynomial of the companion matrix of a linear ODE gives the same equation). Cayley-Hamilton is used in minimal polynomial theory and in computing matrix functions efficiently.

**Teaching hints — review triggers**

- Errors in det(A−λI) → review cofactor expansion with symbolic λ
- Cannot factor polynomial → review factoring quadratics and cubics
- Cayley-Hamilton verification errors → review matrix multiplication and arithmetic

**Spaced repetition / revision guidance**

Compute the characteristic polynomial for 2×2 and 3×3 matrices using both expansion and the shortcut. Verify Cayley-Hamilton for at least two matrices. Study the relationship between algebraic and geometric multiplicities through examples.

---

### Eigenspace

*Concept ID: `math.linalg.eigenspace` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 3h*

**Learning objective.** Compute the eigenspace Eλ=ker(A−λI) for each eigenvalue, find its basis, and distinguish between algebraic and geometric multiplicity.

E_λ = ker(A−λI) = {v : Av=λv}; a subspace of ℝⁿ. Its dimension is the geometric multiplicity of λ. Algebraic multiplicity ≥ geometric multiplicity; equality holds for diagonalizable matrices.

The eigenspace of eigenvalue λ is Eλ=ker(A−λI)={v: Av=λv}, the set of all eigenvectors plus the zero vector. Eλ is a subspace of ℝⁿ. Its dimension is the geometric multiplicity of λ, which is always ≥1 (since λ is an eigenvalue) and ≤ algebraic multiplicity. A matrix is diagonalizable iff for every eigenvalue, geometric multiplicity = algebraic multiplicity (all eigenspaces are 'full size').

**Key ideas**

- Eλ = ker(A−λI); found by row-reducing A−λI and finding the null space
- Geometric multiplicity = dim(Eλ) = nullity(A−λI)
- Algebraic multiplicity = multiplicity of λ as root of characteristic polynomial
- Always: 1 ≤ geometric multiplicity ≤ algebraic multiplicity
- Diagonalizable ⟺ geometric mult = algebraic mult for every eigenvalue

**Vocabulary**

- **eigenspace Eλ** — ker(A−λI); the subspace of all eigenvectors for λ, plus 0
- **geometric multiplicity** — dim(Eλ)=nullity(A−λI); always between 1 and algebraic multiplicity
- **algebraic multiplicity** — Multiplicity of λ as a root of det(A−λI)
- **defective eigenvalue** — An eigenvalue with geometric multiplicity < algebraic multiplicity; causes non-diagonalizability

**Common misconceptions**

- *Misconception:* The eigenspace contains all vectors scaled by λ.
  *Correction:* Eλ = {v: Av=λv}, not {λv: v∈ℝⁿ}. It is the set of vectors that A maps by factor λ, which depends on the matrix A.
- *Misconception:* If λ has algebraic multiplicity 2, the eigenspace is 2-dimensional.
  *Correction:* Algebraic multiplicity ≥ geometric multiplicity. A repeated eigenvalue can have a 1-dimensional eigenspace (defective eigenvalue) — in that case the matrix is not diagonalizable.
- *Misconception:* Eigenspaces for different eigenvalues can overlap (share nonzero vectors).
  *Correction:* Eigenvectors from DIFFERENT eigenvalues are always linearly independent. Eigenspaces for different λ intersect only in {0}.

**Common mistakes in practice**

- Computing A−λI with a sign error (adding λ instead of subtracting)
- Confusing algebraic multiplicity (from p(λ)) with geometric multiplicity (from null space)
- Assuming repeated eigenvalue always gives higher-dimensional eigenspace

**Visual teaching opportunities**

- For a 2×2 matrix with two distinct eigenvalues: draw E_{λ₁} and E_{λ₂} as two lines through the origin — they do not coincide
- Defective case: A=[[2,1],[0,2]] has only one eigenspace (a line) for repeated λ=2 — eigenspaces are 'smaller than expected'
- Table: eigenvalue, algebraic mult, eigenspace basis, geometric mult for a concrete 3×3 matrix

**Worked example**

*Setup:* For A = [[4,1],[2,3]], find the eigenvalues, eigenspaces, and determine if A is diagonalizable.

1. Step 1: Characteristic polynomial: p(λ)=det([[4−λ,1],[2,3−λ]])=(4−λ)(3−λ)−2=λ²−7λ+10=(λ−2)(λ−5).
2. Step 2: Eigenvalues λ₁=2 (alg. mult 1), λ₂=5 (alg. mult 1).
3. Step 3: E₂=ker(A−2I): A−2I=[[2,1],[2,1]]. RREF: [[1,1/2],[0,0]]. Free: v₂=t, v₁=−t/2. Eigenvector v₁=(1,−2) (take t=−2). Geo. mult=1.
4. Step 4: E₅=ker(A−5I): A−5I=[[−1,1],[2,−2]]. RREF: [[1,−1],[0,0]]. Free: v₂=t, v₁=t. Eigenvector v₂=(1,1). Geo. mult=1.
5. Step 5: Verify: A(1,−2)=(4−2,2−6)=(2,−4)=2(1,−2) ✓; A(1,1)=(5,5)=5(1,1) ✓.
6. Step 6: Diagonalizable? Both eigenvalues have geo. mult = alg. mult = 1. Two independent eigenvectors for 2×2 A → A is diagonalizable.

*Outcome:* E₂=span{(1,−2)}, E₅=span{(1,1)}. Both are 1-dimensional, matching algebraic multiplicities. A is diagonalizable.

**Real-world intuition**

- Vibration modes: each eigenspace corresponds to a mode shape; repeated frequencies with full eigenspaces are degenerate modes
- Markov chains: the steady-state distribution is the eigenspace of eigenvalue 1
- Quantum mechanics: energy level degeneracy = geometric multiplicity of the eigenvalue

**Practice progression**

Item types: Find eigenspace for a 2×2 matrix with distinct eigenvalues, Find eigenspace for a repeated eigenvalue — determine if defective, Compare algebraic and geometric multiplicities, Determine if a matrix is diagonalizable from its eigenspaces, Show eigenvectors from different eigenspaces are linearly independent, Find eigenspace of a 3×3 matrix with one repeated eigenvalue. Suggested item count: 6.

Distinct eigenvalues → repeated eigenvalue (non-defective) → defective case → 3×3

**Assessment objectives**

Formats: Compute eigenspace basis via null space of A−λI, State algebraic vs. geometric multiplicity, Determine diagonalizability. Bloom alignment: apply.

Mastery signal: Correctly computes ker(A−λI) for each eigenvalue, identifies geometric multiplicity, compares with algebraic multiplicity, and concludes on diagonalizability.

**Teacher notes**

Emphasise the inequality: 1 ≤ geo. mult ≤ alg. mult. When it is strict, the matrix is defective. The defective case is important — it leads to Jordan normal form rather than diagonalisation.

**Student notes**

To find the eigenspace for λ: form A−λI, row-reduce, find the null space. The number of free variables = geometric multiplicity. Compare this number to the algebraic multiplicity (root order of p(λ)) to determine diagonalizability.

**Prerequisite graph**

- Requires: math.linalg.eigenvalues, math.linalg.null-space
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Eigenspaces are the building blocks of diagonalisation: A is diagonalizable iff the eigenspaces span ℝⁿ (direct sum of all eigenspaces equals ℝⁿ). When they do not, Jordan normal form provides the next-best decomposition.

**Teaching hints — review triggers**

- Cannot compute null space of A−λI → review row reduction for null space
- Confusion between algebraic and geometric multiplicity → review polynomial root multiplicity vs. subspace dimension
- Errors in verification Av=λv → review matrix-vector multiplication

**Spaced repetition / revision guidance**

For each matrix you work with: find all eigenvalues with algebraic multiplicities, then find each eigenspace and its geometric multiplicity. Compare the two multiplicities for each eigenvalue to determine diagonalizability.

---

### Diagonalization

*Concept ID: `math.linalg.diagonalization` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Diagonalize a matrix A=PDP⁻¹ by constructing P from independent eigenvectors, use the decomposition to compute matrix powers efficiently, and identify when diagonalization is impossible.

A is diagonalizable iff it has n linearly independent eigenvectors. Then A=PDP⁻¹ where D=diag(λ₁,…,λₙ) and P has eigenvectors as columns. Powers: Aᵏ=PDᵏP⁻¹.

An n×n matrix A is diagonalizable iff it has n linearly independent eigenvectors. Then A=PDP⁻¹ where P=[v₁|…|vₙ] (eigenvectors as columns) and D=diag(λ₁,…,λₙ). Powers simplify: Aᵏ=PDᵏP⁻¹, and Dᵏ=diag(λ₁ᵏ,…,λₙᵏ). A matrix with n distinct eigenvalues is always diagonalizable; repeated eigenvalues may or may not be (depends on geometric multiplicities).

**Key ideas**

- A=PDP⁻¹ with P=[eigenvectors] and D=diag[eigenvalues]; columns of P match diagonal of D
- Aᵏ = PDᵏP⁻¹; fast computation of high powers via diagonal Dᵏ
- Diagonalizable iff n independent eigenvectors exist iff all eigenspaces are full-dimensional
- Matrices with n distinct eigenvalues are always diagonalizable
- Symmetric matrices are always diagonalizable (over ℝ) — Spectral Theorem

**Vocabulary**

- **diagonalizable** — A is diagonalizable iff A=PDP⁻¹ with D diagonal; equivalently, iff A has n independent eigenvectors
- **eigendecomposition** — A=PDP⁻¹; P contains eigenvectors, D contains eigenvalues on diagonal
- **defective matrix** — A square matrix that is NOT diagonalizable due to insufficient independent eigenvectors
- **similar matrices** — A∼D: same eigenvalues, trace, determinant, characteristic polynomial; represent the same map in different bases

**Common misconceptions**

- *Misconception:* A=PDP⁻¹ means A and D are the same matrix.
  *Correction:* A and D are similar — they represent the same linear map in different bases. D is diagonal; A generally is not. They have the same eigenvalues.
- *Misconception:* Any matrix can be diagonalized.
  *Correction:* Diagonalization requires n independent eigenvectors. Matrices with defective eigenvalues (geometric mult < algebraic mult) cannot be diagonalized; they require Jordan normal form.
- *Misconception:* The order of eigenvalues in D can be anything, independent of P.
  *Correction:* The jth column of P must be an eigenvector for the jth eigenvalue in D. If you swap columns of P, you must swap the corresponding entries in D.

**Common mistakes in practice**

- Column j of P not matching entry Dⱼⱼ (mismatched eigenvector-eigenvalue pairs)
- Attempting to diagonalise a defective matrix
- Forgetting to check independence of eigenvectors before assembling P

**Visual teaching opportunities**

- Commutative diagram: applying A in standard coords = P⁻¹, then scale by D, then P
- Show Aᵏ computation: standard approach requires k−1 matrix multiplications; PDP⁻¹ reduces to element-wise powers of D
- Draw P as a 'rotation' to the eigenvector basis, D as diagonal scaling in that basis

**Worked example**

*Setup:* Diagonalize A = [[4,1],[2,3]] (eigenvalues 2,5; eigenvectors (1,−2),(1,1) from previous example). Then compute A⁵.

1. Step 1: Assemble P=[v₁|v₂]=[[1,1],[−2,1]] and D=[[2,0],[0,5]].
2. Step 2: Compute P⁻¹. det(P)=1·1−1·(−2)=3. P⁻¹=(1/3)[[1,−1],[2,1]].
3. Step 3: Verify PDP⁻¹=A. PD=[[1,1],[−2,1]]·[[2,0],[0,5]]=[[2,5],[−4,5]]. (PD)P⁻¹=(1/3)[[2,5],[−4,5]]·[[1,−1],[2,1]]=(1/3)[[2+10,−2+5],[−4+10,4+5]]=(1/3)[[12,3],[6,9]]=[[4,1],[2,3]]=A ✓.
4. Step 4: Compute A⁵=PD⁵P⁻¹. D⁵=[[2⁵,0],[0,5⁵]]=[[32,0],[0,3125]].
5. Step 5: PD⁵=[[1,1],[−2,1]]·[[32,0],[0,3125]]=[[32,3125],[−64,3125]].
6. Step 6: A⁵=(PD⁵)P⁻¹=(1/3)[[32,3125],[−64,3125]]·[[1,−1],[2,1]]=(1/3)[[32+6250,−32+3125],[−64+6250,64+3125]]=[[6282/3,3093/3],[6186/3,3189/3]]=[[2094,1031],[2062,1063]]. Trace check: 2094+1063=3157=32+5⁵·5=... actually verify trace: trace(A⁵)=2⁵+5⁵=32+3125=3157 ✓.

*Outcome:* A=PDP⁻¹ verified. A⁵=PD⁵P⁻¹ with diagonal Dᵏ reducing matrix powers to scalar powers. Trace check confirms correctness.

**Real-world intuition**

- Population dynamics: Aᵏ applied to an initial state gives the population after k generations; diagonalisation gives closed form
- Discrete dynamical systems: xₙ=Aⁿx₀; diagonalisation gives explicit solution in terms of eigenvalues
- Differential equations: e^{At} = Pe^{Dt}P⁻¹ gives the solution to x'=Ax

**Practice progression**

Item types: Diagonalize a 2×2 matrix with distinct eigenvalues, Compute A³ or A⁵ using diagonalisation, Show a defective matrix cannot be diagonalised, Find A from a given diagonalisation, Diagonalise and apply to solve a recurrence relation, Symmetric matrix: verify orthogonal diagonalisation. Suggested item count: 6.

2×2 diagonalise → matrix powers → defective non-example → 3×3 → application to recurrences

**Assessment objectives**

Formats: Construct P and D and verify PDP⁻¹=A, Use diagonalisation to compute Aᵏ, Determine whether a given matrix is diagonalizable. Bloom alignment: apply.

Mastery signal: Correctly assembles P and D with matching column/diagonal order, verifies PDP⁻¹=A, and uses PD^k P⁻¹ to compute a matrix power.

**Teacher notes**

Stress the column-diagonal correspondence. A common error is mixing up which eigenvector goes in which column. Enforce: write eigenvalue in Dⱼⱼ and the corresponding eigenvector in column j of P.

**Student notes**

Checklist for diagonalisation: (1) find eigenvalues via det(A−λI)=0; (2) for each λ, find eigenvectors via null space of A−λI; (3) check you have n total independent eigenvectors; (4) assemble P and D; (5) verify PDP⁻¹=A.

**Prerequisite graph**

- Requires: math.linalg.eigenvalues, math.linalg.eigenspace, math.linalg.matrix-inverse
- Unlocks (future prerequisite links): math.linalg.matrix-exponential
- Cross-topic connections (graph cross-links): math.de.systems-matrix-method
- Narrative: Diagonalisation is the key to efficient computation of Aᵏ and e^{At} (matrix exponential for ODEs). The spectral theorem is orthogonal diagonalisation for symmetric matrices. Jordan form generalises diagonalisation to all matrices over ℂ.

**Teaching hints — review triggers**

- Cannot invert P → review matrix inverse and check det(P)≠0
- Wrong column/diagonal correspondence → review that jth column of P pairs with jth diagonal of D
- Verification PDP⁻¹=A fails → arithmetic error in matrix multiplication

**Spaced repetition / revision guidance**

Diagonalise at least three matrices: a 2×2 with distinct eigenvalues, a 2×2 with repeated non-defective eigenvalue, and a 3×3. For each, verify PDP⁻¹=A and compute A² using both PDP⁻¹ method and direct multiplication to compare.

---

### Matrix Exponential

*Concept ID: `math.linalg.matrix-exponential` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** Define the matrix exponential via the power series, compute e^{At} for diagonalizable A using e^{At}=Pe^{Dt}P⁻¹, and use it to express solutions to x'=Ax.

e^A = ∑_{k=0}^∞ Aᵏ/k!. For diagonalizable A=PDP⁻¹: e^A = Pe^DP⁻¹. Used to express solutions to x′=Ax as x(t)=e^{At}x(0). Satisfies d/dt e^{At} = Ae^{At}.

The matrix exponential is defined by the Taylor series: e^A=I+A+A²/2!+A³/3!+… (converges for all A). For diagonalizable A=PDP⁻¹, e^{At}=Pe^{Dt}P⁻¹ where e^{Dt}=diag(e^{λ₁t},…,e^{λₙt}). This solves x'=Ax with initial condition x(0)=x₀: x(t)=e^{At}x₀. Key property: d/dt e^{At}=Ae^{At}. For commuting matrices: e^{A+B}=e^A·e^B.

**Key ideas**

- e^A = Σ_{k=0}^∞ Aᵏ/k! (matrix power series; convergent for all A)
- For diagonal D=diag(λᵢ): e^D = diag(e^{λᵢ}) — apply scalar exp to each diagonal entry
- For diagonalizable A=PDP⁻¹: e^{At}=Pe^{Dt}P⁻¹=P·diag(e^{λᵢt})·P⁻¹
- x'=Ax has solution x(t)=e^{At}x₀; generalises scalar ODE x'=ax → x=e^{at}x₀
- d/dt e^{At}=Ae^{At}=e^{At}A (matrix version of scalar derivative d/dt e^{at}=a·e^{at})

**Vocabulary**

- **matrix exponential e^A** — Σ_{k=0}^∞ Aᵏ/k!; well-defined for all square A; reduces to scalar exp for 1×1 matrices
- **state transition matrix** — e^{At}; maps x₀ to x(t) for x'=Ax
- **stable system** — All eigenvalues of A have negative real part → e^{At}→0 as t→∞
- **nilpotent matrix** — Aᵏ=0 for some k; series e^A=I+A+…+Aᵏ⁻¹/(k−1)! terminates

**Common misconceptions**

- *Misconception:* e^A applies the exponential function to each entry of A.
  *Correction:* e^A is defined via the matrix power series, not entry-wise exponentiation. For diagonal D=diag(λᵢ), e^D=diag(e^{λᵢ}) coincidentally equals entry-wise exp on the diagonal — but this is a special case.
- *Misconception:* e^{A+B}=e^A·e^B always.
  *Correction:* This holds only when AB=BA (A and B commute). In general e^{A+B}≠e^A·e^B for non-commuting matrices.
- *Misconception:* The matrix exponential is only defined for symmetric or diagonal matrices.
  *Correction:* e^A is defined by the series for any square matrix A. Computing it efficiently requires diagonalisation (or Jordan form for non-diagonalizable A).

**Common mistakes in practice**

- Applying exp entry-wise to A instead of using the series or diagonalisation
- Confusing e^{AB}=e^A·e^B (only holds when AB=BA)
- Forgetting the factor t in e^{At} vs. e^A

**Visual teaching opportunities**

- Analogy: scalar ODE x'=ax → x=e^{at}x₀; show how e^{At} is the matrix generalisation
- For 2×2 diagonalizable A: show the computation of e^{Dt}=[[e^{λ₁t},0],[0,e^{λ₂t}]] and then Pe^{Dt}P⁻¹
- Plot components of e^{At}x₀ as functions of t to show growing/decaying exponential modes

**Worked example**

*Setup:* For A = [[1,2],[0,2]] with eigenvalues λ₁=1, λ₂=2, compute e^{At} and the solution to x'=Ax with x(0)=(1,0)ᵀ.

1. Step 1: Find eigenvectors. E₁: ker(A−I)=ker([[0,2],[0,1]])=span{(1,0)}. E₂: ker(A−2I)=ker([[−1,2],[0,0]])=span{(2,1)}.
2. Step 2: Assemble P=[[1,2],[0,1]], D=[[1,0],[0,2]]. det(P)=1. P⁻¹=[[1,−2],[0,1]].
3. Step 3: e^{Dt}=[[e^t,0],[0,e^{2t}]]. Compute e^{At}=Pe^{Dt}P⁻¹=[[1,2],[0,1]]·[[e^t,0],[0,e^{2t}]]·[[1,−2],[0,1]].
4. Step 4: Pe^{Dt}=[[e^t,2e^{2t}],[0,e^{2t}]]. Then Pe^{Dt}P⁻¹=[[e^t,2e^{2t}],[0,e^{2t}]]·[[1,−2],[0,1]]=[[e^t,−2e^t+2e^{2t}],[0,e^{2t}]].
5. Step 5: Solution x(t)=e^{At}x₀=[[e^t,−2e^t+2e^{2t}],[0,e^{2t}]]·(1,0)ᵀ=(e^t,0)ᵀ.
6. Step 6: Verify: x'=(e^t,0)ᵀ; Ax=[[1,2],[0,2]]·(e^t,0)=(e^t,0) ✓. And x(0)=(1,0) ✓.

*Outcome:* e^{At}=[[e^t,−2e^t+2e^{2t}],[0,e^{2t}]]; solution x(t)=(e^t,0)ᵀ verified. The matrix exponential encapsulates the full solution operator for linear ODEs.

**Real-world intuition**

- Coupled ODEs in physics: x'=Ax models coupled oscillators; e^{At}x₀ gives the time evolution
- Control systems: e^{At} is the state-transition matrix; stability requires all eigenvalues of A to have negative real parts
- Quantum mechanics: e^{−iHt/ℏ} is the unitary time evolution operator for Hamiltonian H

**Practice progression**

Item types: Compute e^{Dt} for a diagonal matrix, Compute e^{At}=Pe^{Dt}P⁻¹ for a diagonalizable 2×2 matrix, Solve x'=Ax via e^{At}x₀, Verify d/dt e^{At}=Ae^{At} for a computed example, Use series: verify e^A=I+A+A²/2 for a nilpotent matrix (Aⁿ=0 for small n), Explain why e^{A+B}≠e^A e^B for non-commuting A,B. Suggested item count: 6.

Diagonal e^D → 2×2 diagonalizable → ODE solution → series for nilpotent → commutativity

**Assessment objectives**

Formats: Compute e^{At} via diagonalisation, Solve an initial value problem x'=Ax, x(0)=x₀, Verify the derivative property d/dt e^{At}=Ae^{At}. Bloom alignment: apply.

Mastery signal: Correctly computes e^{At}=Pe^{Dt}P⁻¹, applies it to an initial condition, and verifies the ODE x'=Ax is satisfied.

**Teacher notes**

The analogy x'=ax→x=e^{at}x₀ (scalar) to x'=Ax→x=e^{At}x₀ (matrix) is the most effective pedagogical bridge. Emphasise that e^{At} IS the solution operator — it maps any initial condition to the solution at time t.

**Student notes**

For diagonalizable A: never expand the series directly. Use e^{At}=Pe^{Dt}P⁻¹ where e^{Dt}=diag(e^{λ₁t},…). This reduces to scalar exponentials, which are easy.

**Prerequisite graph**

- Requires: math.linalg.diagonalization, math.seq.series
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.de.systems-matrix-method
- Narrative: Matrix exponential is the bridge between linear ODEs and linear algebra (cross-link math.de.systems-matrix-method). For symmetric A, e^{iAt} is unitary (quantum mechanics). For the Lie group/algebra connection: e^{tX} for a Lie algebra element X gives the one-parameter Lie group.

**Teaching hints — review triggers**

- Cannot diagonalise A → review eigenvalues/eigenvectors and P assembly
- Errors in Pe^{Dt}P⁻¹ multiplication → review matrix multiplication
- ODE verification fails → review x'=Ax setup and derivative computation

**Spaced repetition / revision guidance**

Compute e^{At} for at least two 2×2 diagonalizable matrices. Solve one initial value problem x'=Ax, x(0)=x₀ explicitly and verify by substitution into the ODE.

---

### Jordan Normal Form

*Concept ID: `math.linalg.jordan-form` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.75 · Estimated study time: 7h*

**Learning objective.** Describe the structure of Jordan normal form, identify Jordan blocks, find generalized eigenvectors, and understand how Jordan form generalizes diagonalization.

Every matrix over ℂ is similar to a block-diagonal matrix with Jordan blocks Jₖ(λ) on the diagonal. Generalizes diagonalization to non-diagonalizable matrices. Jordan blocks have λ on the diagonal and 1s on the superdiagonal.

Every square matrix over ℂ is similar to a block-diagonal Jordan matrix J=diag(J_{k₁}(λ₁),…,J_{kᵣ}(λᵣ)), where each Jordan block J_k(λ) is a k×k matrix with λ on the diagonal and 1s on the superdiagonal. Jordan form exists even for non-diagonalizable matrices; diagonalization is the special case where all blocks have size 1. The number of Jordan blocks for eigenvalue λ equals the geometric multiplicity; the sizes of the blocks are governed by the minimal polynomial.

**Key ideas**

- Jordan block J_k(λ): k×k matrix with λ on diagonal and 1s on first superdiagonal
- A∼J (similar to Jordan form J) over ℂ; existence is unique up to block reordering
- Number of Jordan blocks for λ = geometric multiplicity of λ
- Sum of block sizes for λ = algebraic multiplicity of λ
- Generalized eigenvectors: (A−λI)ᵏv=0 for some k≥1; span of all = generalized eigenspace

**Vocabulary**

- **Jordan block J_k(λ)** — k×k matrix with λ on diagonal and 1s on superdiagonal; represents a defective eigenvalue with k-dimensional generalised eigenspace
- **Jordan normal form** — Block-diagonal matrix with Jordan blocks; every square matrix over ℂ is similar to one
- **generalized eigenvector** — Nonzero v such that (A−λI)ᵏv=0 for some k≥1; includes eigenvectors (k=1) as a special case
- **Jordan chain** — A sequence v₁,…,vₖ with Av₁=λv₁ and Avⱼ=λvⱼ+vⱼ₋₁ for j≥2

**Common misconceptions**

- *Misconception:* Every matrix has a Jordan form over ℝ.
  *Correction:* Jordan form requires the characteristic polynomial to split into linear factors. Over ℝ, complex eigenvalues (like those of rotation matrices) require ℂ. The real Jordan form uses 2×2 rotation blocks for complex conjugate pairs.
- *Misconception:* Jordan form is the same as diagonal form.
  *Correction:* Diagonal form is a special case of Jordan form where all Jordan blocks have size 1. Jordan form generalises this to handle defective eigenvalues via superdiagonal 1s.
- *Misconception:* Finding the Jordan form is always straightforward.
  *Correction:* Determining the exact block structure for repeated eigenvalues can be subtle — it requires computing ranks of (A−λI)ᵏ for successive powers k.

**Common mistakes in practice**

- Confusing algebraic multiplicity (determines total block size for λ) with geometric multiplicity (determines number of blocks)
- Trying to diagonalise a matrix with a defective eigenvalue
- Forgetting that Jordan form requires ℂ when eigenvalues are complex

**Visual teaching opportunities**

- Write out Jordan blocks explicitly: J₁(λ)=[λ], J₂(λ)=[[λ,1],[0,λ]], J₃(λ)=[[λ,1,0],[0,λ,1],[0,0,λ]]
- Compare: diagonal matrix (all 1×1 blocks) vs. single 2×2 Jordan block for repeated eigenvalue
- Show the Jordan chain: Av₁=λv₁ (eigenvector), Av₂=λv₂+v₁ (generalized eigenvector)

**Worked example**

*Setup:* For A = [[2,1,0],[0,2,1],[0,0,2]], find the Jordan normal form, identify the block structure, and find the Jordan chain.

1. Step 1: Characteristic polynomial: A is upper triangular, so p(λ)=(2−λ)³. Only eigenvalue λ=2 with algebraic multiplicity 3.
2. Step 2: Compute A−2I=[[0,1,0],[0,0,1],[0,0,0]]. rank(A−2I)=2; nullity=1. Geometric multiplicity=1.
3. Step 3: Since geo. mult=1 < alg. mult=3, A is not diagonalizable. There is one Jordan block for λ=2 of size 3: J=J₃(2)=[[2,1,0],[0,2,1],[0,0,2]]=A.
4. Step 4: A IS already in Jordan form! The Jordan chain starts with eigenvector v₁: (A−2I)v₁=0 → v₁=(1,0,0).
5. Step 5: Generalized eigenvector v₂: (A−2I)v₂=v₁ → [[0,1,0],[0,0,1],[0,0,0]]v₂=(1,0,0). Row 1: v₂₂=1; Row 2: v₂₃=0; Row 3: 0=0 ✓. Take v₂=(0,1,0).
6. Step 6: Generalized eigenvector v₃: (A−2I)v₃=v₂ → [[0,1,0],[0,0,1],[0,0,0]]v₃=(0,1,0). Row 1: v₃₂=0; Row 2: v₃₃=1. Take v₃=(0,0,1). Jordan chain: v₁=(1,0,0)→v₂=(0,1,0)→v₃=(0,0,1).

*Outcome:* J=J₃(2) (a single 3×3 Jordan block); A is already in Jordan form. The Jordan chain {v₁,v₂,v₃}=standard basis confirms the block structure.

**Real-world intuition**

- Differential equations: x'=Ax with defective A — solution involves te^{λt} terms from Jordan blocks
- Control theory: Jordan form reveals hidden dynamics; repeated eigenvalues at stability boundary require Jordan analysis
- Systems theory: nilpotent Jordan blocks (λ=0) describe transient behaviour that decays algebraically, not exponentially

**Practice progression**

Item types: Write the Jordan form for a 2×2 defective matrix, Find the Jordan block structure from eigenvalue multiplicities, Compute generalized eigenvectors for a 2×2 defective matrix, Distinguish: one 3×3 block vs. three 1×1 blocks for same eigenvalue, Compute Aᵏ using Jordan form (via binomial expansion of (λI+N)ᵏ), Determine the Jordan form from the ranks of (A−λI)ᵏ. Suggested item count: 6.

2×2 defective → 3×3 with one defective eigenvalue → determining block sizes → matrix powers via Jordan form

**Assessment objectives**

Formats: Identify Jordan block structure from eigenvalue data, Find eigenvector and generalized eigenvectors, Write the Jordan form and transformation matrix. Bloom alignment: analyze.

Mastery signal: Correctly identifies the number and sizes of Jordan blocks from geometric/algebraic multiplicities, finds at least one Jordan chain, and writes the Jordan form.

**Teacher notes**

Jordan form is conceptually important but computationally intricate for large matrices. Focus on understanding the 2×2 defective case first — students should master why geo. mult < alg. mult prevents diagonalisation before tackling the general structure.

**Student notes**

For a defective eigenvalue λ: count Jordan blocks = geo. mult; sum of block sizes = alg. mult. A single k×k Jordan block corresponds to one eigenvector and k−1 generalised eigenvectors in a chain.

**Prerequisite graph**

- Requires: math.linalg.eigenvalues, math.linalg.diagonalization
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Jordan form generalises diagonalisation (all blocks 1×1 ↔ diagonalizable). It connects to the minimal polynomial (largest Jordan block size for λᵢ = power of (x−λᵢ) in minimal polynomial), to ODE solutions with repeated characteristic roots, and to the Cayley-Hamilton theorem.

**Teaching hints — review triggers**

- Cannot determine algebraic vs. geometric multiplicity → review eigenspace computation
- Generalized eigenvector computation errors → review solving (A−λI)v=w
- Confusion about block structure → review the relationship between block sizes and multiplicities

**Spaced repetition / revision guidance**

Master the 2×2 defective case (J₂(λ)) completely: find the eigenvector, solve for the generalised eigenvector, write J and P, verify PJP⁻¹=A. Then extend to 3×3 examples.

---

### Spectral Theorem

*Concept ID: `math.linalg.spectral-theorem` · Difficulty: expert · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 6h*

**Learning objective.** State the real spectral theorem, diagonalize a real symmetric matrix using an orthonormal eigenvector basis, and apply the decomposition A=QΛQᵀ.

Every real symmetric (or complex Hermitian) matrix is orthogonally (unitarily) diagonalizable: A=QΛQᵀ with Q orthogonal and Λ real diagonal. Eigenvalues are real; eigenvectors from different eigenspaces are orthogonal.

The real spectral theorem: every real symmetric matrix (Aᵀ=A) is orthogonally diagonalizable. That is, A=QΛQᵀ where Q is an orthogonal matrix (QQᵀ=I, columns are orthonormal eigenvectors) and Λ=diag(λ₁,…,λₙ) with all λᵢ∈ℝ. Two key facts: (1) all eigenvalues of a real symmetric matrix are real; (2) eigenvectors from distinct eigenvalues are orthogonal. The complex analogue holds for Hermitian matrices (A=A*).

**Key ideas**

- Real symmetric ⟹ all eigenvalues real and eigenvectors from distinct eigenvalues are orthogonal
- A=QΛQᵀ: Q orthogonal (QᵀQ=I), Λ real diagonal
- For repeated eigenvalues: the eigenspace is orthogonally spanned (Gram-Schmidt within each eigenspace)
- Qᵀ=Q⁻¹: the inverse is free (just transpose); this makes computation very efficient
- Spectral decomposition: A=Σ λᵢ qᵢqᵢᵀ (sum of rank-1 projections weighted by eigenvalues)

**Vocabulary**

- **orthogonal matrix Q** — Square matrix with QᵀQ=QQᵀ=I; columns form an orthonormal basis
- **orthogonal diagonalisation** — A=QΛQᵀ with Q orthogonal and Λ diagonal; possible iff A is real symmetric
- **spectral decomposition** — A=Σᵢ λᵢ qᵢqᵢᵀ; A is expressed as sum of rank-1 projections onto orthonormal eigenvectors
- **Hermitian matrix** — Complex matrix with A=A* (conjugate transpose); complex analogue of real symmetric; spectral theorem applies

**Common misconceptions**

- *Misconception:* Any diagonalizable matrix has an orthogonal diagonalisation.
  *Correction:* Orthogonal diagonalisation (QᵀAQ=Λ) requires symmetry (Aᵀ=A). A non-symmetric diagonalizable matrix has A=PDP⁻¹ but P is generally not orthogonal.
- *Misconception:* The spectral theorem says all matrices have real eigenvalues.
  *Correction:* Only symmetric (Hermitian) matrices are guaranteed real eigenvalues. A rotation matrix has complex eigenvalues e^{±iθ}.
- *Misconception:* Eigenvectors from a repeated eigenvalue are automatically orthogonal.
  *Correction:* They are orthogonal to eigenvectors from other eigenvalues, but within the same eigenspace they may not be orthogonal. Gram-Schmidt must be applied within repeated eigenspaces.

**Common mistakes in practice**

- Forgetting to normalise eigenvectors before assembling Q
- Applying spectral theorem to a non-symmetric matrix
- In repeated eigenspace: not applying Gram-Schmidt, leaving non-orthogonal columns in Q

**Visual teaching opportunities**

- Geometric: A=QΛQᵀ = rotate to eigenvector axes (Qᵀ), scale along each axis (Λ), rotate back (Q)
- Show A=[[2,1],[1,2]] with eigenvector axes (1,1)/√2 and (1,−1)/√2 — the transformation scales each direction independently
- Spectral decomposition as sum of rank-1 matrices: A=λ₁q₁q₁ᵀ+λ₂q₂q₂ᵀ

**Worked example**

*Setup:* Orthogonally diagonalize A = [[2,1],[1,2]] (symmetric), and verify A=QΛQᵀ.

1. Step 1: Eigenvalues: p(λ)=(2−λ)²−1=(λ−1)(λ−3); λ₁=1, λ₂=3 (both real ✓).
2. Step 2: Eigenvectors: E₁=span{(1,−1)} and E₃=span{(1,1)}. Check orthogonality: (1,−1)·(1,1)=1−1=0 ✓ (eigenvectors from different eigenvalues are orthogonal).
3. Step 3: Normalize: q₁=(1,−1)/√2 and q₂=(1,1)/√2.
4. Step 4: Q=[q₁|q₂]=(1/√2)[[1,1],[−1,1]]. Λ=[[1,0],[0,3]].
5. Step 5: Verify QQᵀ=I: Qᵀ=(1/√2)[[1,−1],[1,1]]. QQᵀ=(1/2)[[1,1],[−1,1]]·[[1,−1],[1,1]]=(1/2)[[2,0],[0,2]]=I ✓.
6. Step 6: Verify QΛQᵀ=A: QΛ=(1/√2)[[1,3],[−1,3]]. QΛQᵀ=(1/2)[[1,3],[−1,3]]·[[1,−1],[1,1]]=(1/2)[[1+3,−1+3],[−1+3,1+3]]=(1/2)[[4,2],[2,4]]=[[2,1],[1,2]]=A ✓.

*Outcome:* A=QΛQᵀ with Q=(1/√2)[[1,1],[−1,1]], Λ=[[1,0],[0,3]]. Both QQᵀ=I and QΛQᵀ=A verified. Eigenvectors from different eigenvalues are automatically orthogonal.

**Real-world intuition**

- PCA: covariance matrix is symmetric; spectral theorem gives orthogonal principal components
- Finite element method: mass and stiffness matrices are symmetric; spectral decomposition gives normal modes
- Quadratic forms: A symmetric positive definite iff all eigenvalues > 0; spectral theorem gives the canonical form

**Practice progression**

Item types: Verify a matrix is symmetric and find its eigenvalues, Find orthonormal eigenvectors for a 2×2 symmetric matrix, Compute and verify A=QΛQᵀ, Apply Gram-Schmidt within a repeated eigenspace of a 3×3 symmetric matrix, Write the spectral decomposition A=Σλᵢqᵢqᵢᵀ, Use spectral theorem: compute Aᵏ and A⁻¹ for a symmetric matrix. Suggested item count: 6.

2×2 orthogonal diagonalisation → 3×3 with distinct eigenvalues → repeated eigenspace + Gram-Schmidt → applications

**Assessment objectives**

Formats: Orthogonally diagonalize a 2×2 symmetric matrix with verification, Verify QᵀQ=I and QΛQᵀ=A, Apply spectral theorem to compute Aᵏ. Bloom alignment: understand.

Mastery signal: Finds orthonormal eigenvectors, assembles Q and Λ, and verifies both orthogonality of Q and the product QΛQᵀ=A with no arithmetic errors.

**Teacher notes**

Emphasise that the orthogonality of eigenvectors for DISTINCT eigenvalues is automatic for symmetric matrices — it is a theorem, not a coincidence. Within a repeated eigenspace, Gram-Schmidt is needed. The result Q⁻¹=Qᵀ is the key computational benefit.

**Student notes**

For symmetric matrices: (1) all eigenvalues are real; (2) eigenvectors from different eigenvalues are automatically orthogonal (no dot product check needed); (3) normalise each eigenvector to get orthonormal columns for Q; (4) Q⁻¹=Qᵀ (free inversion).

**Prerequisite graph**

- Requires: math.linalg.symmetric-matrix, math.linalg.eigenvalues, math.linalg.orthogonal-basis
- Unlocks (future prerequisite links): math.linalg.positive-definite
- Cross-topic connections (graph cross-links): math.fnal.spectral-theory
- Narrative: Spectral theorem is the apex of the linear algebra course: it unifies eigenvalues, eigenvectors, orthogonality, and diagonalisation. It is the foundation for PCA (statistics), positive definiteness (optimization), quadratic forms, and the Singular Value Decomposition (which extends it to non-symmetric matrices).

**Teaching hints — review triggers**

- Cannot verify QᵀQ=I → review orthogonal matrix properties
- Eigenvectors not orthogonal for distinct eigenvalues → arithmetic error in dot product; re-check
- Gram-Schmidt errors within repeated eigenspace → review Gram-Schmidt orthogonalisation

**Spaced repetition / revision guidance**

Orthogonally diagonalise at least two symmetric matrices: one 2×2 with distinct eigenvalues and one 3×3. For the 3×3, deliberately choose one with a repeated eigenvalue to practise Gram-Schmidt. Always verify QQᵀ=I and QΛQᵀ=A.

---

### Positive Definite Matrix

*Concept ID: `math.linalg.positive-definite` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** Define positive definite and positive semidefinite matrices, verify positive definiteness using the three equivalent conditions, and interpret the result geometrically.

A symmetric matrix A is positive definite iff vᵀAv>0 for all nonzero v, iff all eigenvalues are positive, iff all leading principal minors are positive (Sylvester's criterion). PSD: ≥0 instead of >0.

A symmetric n×n matrix A is positive definite (PD) iff vᵀAv>0 for all nonzero v∈ℝⁿ. Equivalent conditions: (1) all eigenvalues of A are positive; (2) all leading principal minors are positive (Sylvester's criterion); (3) A=LLᵀ for some invertible lower-triangular L (Cholesky). Positive semidefinite (PSD): ≥0 instead of >0 (some eigenvalues may be zero). PD matrices arise naturally as covariance matrices, Hessians at local minima, and Gram matrices.

**Key ideas**

- Three equivalent conditions: vᵀAv>0 ∀v≠0 ⟺ all eigenvalues>0 ⟺ all leading principal minors>0
- PSD: vᵀAv≥0 ∀v (zero allowed); eigenvalues ≥0; some could be zero
- Any matrix of the form AᵀA is PSD; AᵀA is PD iff A has full column rank
- Positive definiteness implies invertibility (all eigenvalues ≠ 0, so det > 0)
- Quadratic form vᵀAv>0: the energy is always positive — A is like a 'bowl'

**Vocabulary**

- **positive definite (PD)** — Symmetric A with vᵀAv>0 for all v≠0; equivalently all eigenvalues>0
- **positive semidefinite (PSD)** — Symmetric A with vᵀAv≥0 for all v; eigenvalues ≥0
- **Sylvester's criterion** — A symmetric is PD iff all n leading principal minors are positive
- **leading principal minor** — Determinant of the top-left k×k submatrix of A, for k=1,…,n

**Common misconceptions**

- *Misconception:* Any matrix with positive diagonal entries is positive definite.
  *Correction:* Positive diagonal alone is not sufficient. A=[[1,2],[2,1]] has positive diagonal but vᵀAv=x²+4xy+y² — take v=(1,−1): 1−4+1=−2<0. Not PD.
- *Misconception:* Positive semidefinite matrices are invertible.
  *Correction:* A PSD matrix can be singular (zero eigenvalue means det=0, so A is not invertible). Only strictly positive definite matrices are guaranteed invertible.
- *Misconception:* To check PD, compute all eigenvalues (or all n×n minors).
  *Correction:* Sylvester's criterion requires only the n LEADING principal minors (not all 2ⁿ−1 minors). For a 3×3 matrix: check a₁₁>0, det([[a₁₁,a₁₂],[a₂₁,a₂₂]])>0, and det(A)>0.

**Common mistakes in practice**

- Checking only diagonal entries or only det(A)>0 (insufficient for PD)
- Applying Sylvester to non-symmetric matrices
- Confusing PD (strict) and PSD (non-strict)

**Visual teaching opportunities**

- Graph the quadratic form vᵀAv as a surface in ℝ³ — PD ↔ paraboloid opening upward
- Eigenvalue picture: PD ↔ all axes of the corresponding ellipse have positive semi-axes
- Sylvester criterion: only n leading principal minors needed — draw the top-left corner pattern

**Worked example**

*Setup:* Test whether A = [[2,1],[1,2]] is positive definite using all three criteria.

1. Step 1: Criterion 1 — eigenvalues. p(λ)=(2−λ)²−1=(λ−1)(λ−3). Eigenvalues λ₁=1>0, λ₂=3>0. PD by eigenvalue criterion ✓.
2. Step 2: Criterion 2 — Sylvester's criterion. Leading principal minors: Δ₁=2>0; Δ₂=det([[2,1],[1,2]])=4−1=3>0. Both positive ✓.
3. Step 3: Criterion 3 — direct quadratic form. vᵀAv = 2x²+2xy+2y². Complete the square: 2x²+2xy+2y² = (x+y)²+x²+y² ≥ 2y²+x²>0 for (x,y)≠(0,0). Alternatively: 2x²+2xy+2y²=(√2 x)²+(x+y)²/... let's verify with v=(1,−1): 2−2+2=2>0; v=(1,1): 2+2+2=6>0; general case (x+y)²+x²+y²>0 ✓.
4. Step 4: All three criteria agree: A is positive definite.
5. Step 5: Contrast with semidefinite: if A=[[1,1],[1,1]], eigenvalues are 0 and 2. vᵀAv=(x+y)²≥0, with =0 when v=(1,−1). So this A is PSD but not PD.

*Outcome:* A=[[2,1],[1,2]] is positive definite, confirmed by all three equivalent criteria. The quadratic form 2x²+2xy+2y² is a bowl with minimum 0 only at the origin.

**Real-world intuition**

- Covariance matrices in statistics are PSD; strictly positive eigenvalues mean full-rank data (no perfectly correlated variables)
- Hessian PD at a critical point ↔ strict local minimum (second derivative test in higher dimensions)
- Optimization: quadratic programs with PD objective matrix have a unique global minimum

**Practice progression**

Item types: Test 2×2 matrix for PD via Sylvester's criterion, Test via eigenvalues, Complete the square to verify vᵀAv>0 directly, Show AᵀA is PSD; determine when it is PD, Identify: is the Hessian matrix of a function PD at a critical point?, Classify as PD, PSD, or neither for various symmetric matrices. Suggested item count: 6.

2×2 Sylvester → eigenvalue criterion → quadratic form direct → AᵀA analysis → 3×3

**Assessment objectives**

Formats: Test PD via Sylvester's criterion with all steps, Eigenvalue-based verification, Complete the square in a quadratic form. Bloom alignment: analyze.

Mastery signal: Correctly applies at least two of the three criteria, identifies PD vs. PSD, and explains the geometric meaning (bowl vs. flat directions).

**Teacher notes**

The three criteria are truly equivalent — prove equivalence at least partially (eigenvalues↔quadratic form via spectral theorem). Emphasise that Sylvester only requires n specific minors, not all 2ⁿ−1.

**Student notes**

Quick check for 2×2 [[a,b],[b,d]]: PD iff a>0 AND ad−b²>0. For 3×3: check a₁₁>0, then det([[a,b],[b,d]])>0, then det(A)>0. Always verify with eigenvalues or vᵀAv for confirmation.

**Prerequisite graph**

- Requires: math.linalg.spectral-theorem
- Unlocks (future prerequisite links): math.linalg.cholesky
- Cross-topic connections (graph cross-links): math.opt.convex-function
- Narrative: PD connects to Cholesky (PD ↔ has Cholesky decomposition), spectral theorem (PD iff all eigenvalues>0), and optimisation (convex quadratic forms, cross-link math.opt.convex-function). PSD matrices form a convex cone — fundamental in semidefinite programming.

**Teaching hints — review triggers**

- Cannot compute leading principal minors → review 2×2 and 3×3 determinants
- Eigenvalue sign errors → review characteristic polynomial computation
- Quadratic form manipulation errors → review completing the square

**Spaced repetition / revision guidance**

For each symmetric matrix you encounter, determine if it is PD, PSD, or neither using Sylvester's criterion (fastest). Then verify with eigenvalues. Build intuition by relating to whether the corresponding quadratic form is a bowl, a trough, or saddle-shaped.

---

### Cholesky Decomposition

*Concept ID: `math.linalg.cholesky` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.75 · Estimated study time: 4h*

**Learning objective.** Compute the Cholesky decomposition A=LLᵀ for a positive definite matrix, and use it to solve symmetric positive definite linear systems efficiently.

A positive definite matrix A = LLᵀ where L is lower triangular with positive diagonal. More efficient than LU for symmetric positive definite systems (half the work). Widely used in numerical linear algebra.

Every positive definite matrix A has a unique Cholesky decomposition A=LLᵀ where L is lower-triangular with positive diagonal entries. This is the symmetric analogue of LU factorisation; it is twice as efficient (exploits symmetry, roughly n³/6 vs. n³/3 operations). To solve Ax=b: forward-solve Ly=b, then back-solve Lᵀx=y. The diagonal entries of L are given by lₖₖ=√(aₖₖ−Σⱼ<ₖ lₖⱼ²) and off-diagonal entries by lᵢₖ=(aᵢₖ−Σⱼ<ₖ lᵢⱼlₖⱼ)/lₖₖ.

**Key ideas**

- A=LLᵀ: L lower-triangular with positive diagonal; unique for PD A
- Cholesky succeeds (diagonal elements stay real and positive) iff A is PD
- Half the cost of LU: about n³/6 operations (vs. n³/3 for LU)
- Solve Ax=b: forward-solve Ly=b, back-solve Lᵀx=y
- Cholesky is numerically stable for PD matrices — no pivoting required

**Vocabulary**

- **Cholesky decomposition** — A=LLᵀ where L is lower triangular with positive diagonal; exists uniquely for every PD matrix A
- **LDLᵀ decomposition** — Variant: A=LDLᵀ with unit lower-triangular L and diagonal D; avoids square roots, numerically equivalent
- **numerical stability** — Cholesky requires no pivoting for PD matrices — small rounding errors do not amplify, unlike standard LU

**Common misconceptions**

- *Misconception:* Cholesky can be computed for any symmetric matrix.
  *Correction:* Cholesky requires positive definiteness. If a diagonal entry lₖₖ=√(negative) occurs, the matrix is not PD. This provides a practical PD test.
- *Misconception:* Cholesky gives A=LLᵀ where L is not necessarily lower triangular.
  *Correction:* L is always lower triangular with positive diagonal. Some sources use A=LDLᵀ (L unit lower-triangular, D diagonal); that is a related but distinct decomposition.
- *Misconception:* Cholesky and LU factorisation give the same L.
  *Correction:* In LU, the lower factor has 1s on the diagonal (unit lower-triangular). In Cholesky, the diagonal entries are √(pivot values), not 1. The two L matrices differ.

**Common mistakes in practice**

- Using LU (with 1s on diagonal) instead of Cholesky (with √pivot on diagonal)
- Forgetting to square the previous L entries when computing the diagonal
- Not verifying LLᵀ=A at the end

**Visual teaching opportunities**

- Side-by-side: LU decomposition A=LU vs. Cholesky A=LLᵀ — show that Cholesky uses symmetry to halve the work
- Algorithm: step-by-step construction of L column by column
- Forward/back substitution tree for Ax=b via Cholesky

**Worked example**

*Setup:* Find the Cholesky decomposition of A = [[4,2],[2,3]].

1. Step 1: Verify A is PD. Sylvester: 4>0, det=12−4=8>0 ✓. Cholesky will exist.
2. Step 2: Set up L=[[l₁₁,0],[l₂₁,l₂₂]] so that LLᵀ=A.
3. Step 3: (LLᵀ)₁₁=l₁₁²=4 → l₁₁=√4=2 (positive).
4. Step 4: (LLᵀ)₂₁=l₂₁·l₁₁=2 → l₂₁=2/2=1.
5. Step 5: (LLᵀ)₂₂=l₂₁²+l₂₂²=3 → 1+l₂₂²=3 → l₂₂=√2.
6. Step 6: L=[[2,0],[1,√2]]. Verify: LLᵀ=[[2,0],[1,√2]]·[[2,1],[0,√2]]=[[4,2],[2,1+2]]=[[4,2],[2,3]]=A ✓.

*Outcome:* L=[[2,0],[1,√2]] with LLᵀ=A verified. The Cholesky algorithm runs in 3 scalar operations (compared to more for LU, since symmetry is exploited).

**Real-world intuition**

- Gaussian processes in machine learning: Cholesky of the kernel matrix is used for stable sampling and prediction
- Monte Carlo simulation: sampling from N(0,Σ) uses x=Lz with z∼N(0,I) and Cholesky factor L
- Finite element method: symmetric PD stiffness matrices are solved via Cholesky in engineering simulations

**Practice progression**

Item types: 2×2 Cholesky decomposition, 3×3 Cholesky decomposition step by step, Solve Ax=b via Cholesky (forward + back substitution), Use Cholesky failure to detect a non-PD matrix, Compare operation count: Cholesky vs. LU for 3×3, Compute the LDLᵀ decomposition and relate to Cholesky. Suggested item count: 6.

2×2 factorisation → 3×3 factorisation → solve system → non-PD detection → comparison with LU

**Assessment objectives**

Formats: Step-by-step Cholesky for a 2×2 or 3×3 matrix, Use Cholesky to solve Ax=b, Identify when Cholesky fails and explain why. Bloom alignment: apply.

Mastery signal: Correctly computes L with positive diagonal, verifies LLᵀ=A, and solves a system by forward/back substitution.

**Teacher notes**

Emphasise the formula for each L entry in order: first lₖₖ (diagonal, requires square root), then lᵢₖ for i>k (off-diagonal, simple division). The symmetry of A means we only compute the lower triangle of LLᵀ.

**Student notes**

Recipe: process columns left to right. For column k: (1) lₖₖ=√(aₖₖ−Σⱼ<ₖ lₖⱼ²); (2) for i>k: lᵢₖ=(aᵢₖ−Σⱼ<ₖ lᵢⱼlₖⱼ)/lₖₖ. If any lₖₖ would be imaginary, A is not PD.

**Prerequisite graph**

- Requires: math.linalg.positive-definite, math.linalg.lu-factorization
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.num.cholesky
- Narrative: Cholesky is LU factorisation restricted to the PD symmetric case; it halves the work by exploiting symmetry. It connects to positive definiteness (PD ↔ Cholesky exists), to the LDLᵀ decomposition (avoiding square roots), and numerically to Gaussian process computations.

**Teaching hints — review triggers**

- Negative under square root → matrix is not PD; review positive definiteness conditions
- LLᵀ≠A in verification → arithmetic error in L entries; recompute systematically
- Forward/back substitution errors → review triangular system solving

**Spaced repetition / revision guidance**

Practise the 2×2 Cholesky until the four-step recipe is automatic. Then do a 3×3 example. For each, verify LLᵀ=A. Solve one 3×3 system Ax=b via Cholesky to feel the full workflow.

---

### Inner Product

*Concept ID: `math.linalg.inner-product` · Difficulty: expert · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 4h*

**Learning objective.** Define an inner product via its three axioms, verify that a given form is an inner product, and compute the induced norm and angle.

A generalization of the dot product: a positive-definite symmetric bilinear form (real) or sesquilinear form (complex) ⟨·,·⟩:V×V→F. Induces a norm |v|=√⟨v,v⟩.

An inner product on a real vector space V is a function ⟨·,·⟩: V×V→ℝ satisfying: (1) symmetry ⟨u,v⟩=⟨v,u⟩; (2) linearity in first argument ⟨αu+v,w⟩=α⟨u,w⟩+⟨v,w⟩; (3) positive definiteness ⟨v,v⟩≥0 with equality iff v=0. The induced norm is ‖v‖=√⟨v,v⟩. The standard dot product on ℝⁿ is the canonical example, but infinitely many inner products exist on the same vector space.

**Key ideas**

- Three axioms: symmetry, bilinearity, positive definiteness
- Induced norm: ‖v‖=√⟨v,v⟩; induced angle: cos θ=⟨u,v⟩/(‖u‖‖v‖)
- Standard dot product on ℝⁿ: ⟨u,v⟩=uᵀv
- Function space inner product: ⟨f,g⟩=∫f(x)g(x)dx on C[a,b]
- Positive definite bilinear form ⟨u,v⟩_A=uᵀAv for PD matrix A is an inner product

**Vocabulary**

- **inner product ⟨u,v⟩** — Symmetric positive-definite bilinear form; generalises dot product to abstract vector spaces
- **induced norm ‖v‖** — √⟨v,v⟩; every inner product induces a norm
- **Cauchy-Schwarz inequality** — |⟨u,v⟩|≤‖u‖·‖v‖; equality iff u,v are proportional
- **bilinear form** — A function B(u,v) linear in each argument separately; inner product adds symmetry and positive-definiteness

**Common misconceptions**

- *Misconception:* An inner product must be the dot product uᵀv.
  *Correction:* The dot product is one inner product. For example, ⟨u,v⟩=u₁v₁+2u₂v₂ also satisfies all three axioms and defines a valid (different) inner product on ℝ².
- *Misconception:* Any bilinear form is an inner product.
  *Correction:* A bilinear form also needs symmetry and positive definiteness. The form ⟨u,v⟩=u₁v₂−u₂v₁ is bilinear but anti-symmetric (⟨u,v⟩=−⟨v,u⟩) — not an inner product.
- *Misconception:* The induced norm always equals the Euclidean norm.
  *Correction:* The induced norm ‖v‖=√⟨v,v⟩ depends on the choice of inner product. For ⟨u,v⟩=u₁v₁+2u₂v₂, ‖(1,1)‖=√3≠√2.

**Common mistakes in practice**

- Forgetting to check positive definiteness (only checking ⟨v,v⟩≥0 without the =0 iff v=0 condition)
- Assuming the induced norm equals the Euclidean norm
- Confusing the inner product space structure with the metric space structure

**Visual teaching opportunities**

- Table: the three axioms listed with an example from dot product and from the integral inner product on C[0,1]
- Show: the function ⟨f,g⟩=∫₀¹f(x)g(x)dx satisfies all three axioms for continuous functions
- Geometric: induced norm gives distance; inner product gives cosine of angle (both depend on the choice of ⟨·,·⟩)

**Worked example**

*Setup:* Verify that ⟨f,g⟩=∫₀¹f(x)g(x)dx defines an inner product on C[0,1] (continuous functions on [0,1]). Then compute ⟨1,x⟩, ‖1‖, and ‖x‖.

1. Step 1: Symmetry. ⟨f,g⟩=∫₀¹f(x)g(x)dx=∫₀¹g(x)f(x)dx=⟨g,f⟩ ✓ (multiplication is commutative).
2. Step 2: Linearity. ⟨αf+g,h⟩=∫₀¹(αf(x)+g(x))h(x)dx=α∫₀¹f(x)h(x)dx+∫₀¹g(x)h(x)dx=α⟨f,h⟩+⟨g,h⟩ ✓.
3. Step 3: Positive definiteness. ⟨f,f⟩=∫₀¹f(x)²dx≥0 since f(x)²≥0 ✓. If ⟨f,f⟩=0, then f(x)²=0 for all x (continuous function), so f=0 ✓.
4. Step 4: All three axioms hold: ⟨·,·⟩ is an inner product on C[0,1].
5. Step 5: Compute ⟨1,x⟩=∫₀¹1·x dx=[x²/2]₀¹=1/2.
6. Step 6: ‖1‖=√⟨1,1⟩=√(∫₀¹1²dx)=√1=1; ‖x‖=√(∫₀¹x²dx)=√(1/3)=1/√3≈0.577.

*Outcome:* ⟨f,g⟩=∫₀¹fg is a valid inner product on C[0,1]. ⟨1,x⟩=1/2; ‖1‖=1; ‖x‖=1/√3. These are the first Fourier-style computation steps.

**Real-world intuition**

- Fourier series: ⟨f,g⟩=∫₋π^π fg — orthogonality of sin and cos in this inner product gives Fourier decomposition
- Statistics: the weighted inner product ⟨x,y⟩_W=xᵀWy with weight matrix W arises in weighted least squares
- Machine learning: kernel functions k(x,y) are inner products in an induced feature space (Reproducing Kernel Hilbert Space)

**Practice progression**

Item types: Verify the dot product satisfies all three axioms, Verify ⟨u,v⟩=u₁v₁+3u₂v₂ is an inner product on ℝ², Show ⟨u,v⟩=u₁v₂ is NOT an inner product (identify failing axiom), Compute inner product and norms for functions in C[0,1], Find the angle between two functions using the integral inner product, Verify ⟨u,v⟩_A=uᵀAv is an inner product for PD matrix A. Suggested item count: 6.

Dot product axiom verification → weighted inner product on ℝⁿ → counterexample → function inner product → general A

**Assessment objectives**

Formats: Verify all three axioms for a given form, Identify which axiom fails for a non-inner-product, Compute norm and inner product in a non-standard inner product space. Bloom alignment: understand.

Mastery signal: Correctly verifies all three axioms for a non-standard inner product, computes the induced norm, and identifies the failing axiom in a non-example.

**Teacher notes**

The function inner product ⟨f,g⟩=∫fg is the most important non-standard example — it is the foundation of Fourier analysis and Hilbert space theory. Students who understand this can read analysis and PDE literature fluently.

**Student notes**

To check if ⟨u,v⟩ is an inner product, verify: (1) ⟨u,v⟩=⟨v,u⟩; (2) ⟨αu+w,v⟩=α⟨u,v⟩+⟨w,v⟩; (3) ⟨v,v⟩>0 for v≠0. If any one fails, it is not an inner product.

**Prerequisite graph**

- Requires: math.linalg.vector-space, math.linalg.dot-product
- Unlocks (future prerequisite links): math.linalg.inner-product-space
- Cross-topic connections (graph cross-links): math.fnal.hilbert-space
- Narrative: Inner products generalise the dot product and are the foundation of inner product spaces, orthogonality, projection, and Gram-Schmidt. They connect to Hilbert spaces (complete inner product spaces, cross-link math.fnal.hilbert-space) and to PD matrices (uᵀAv is an inner product iff A is PD).

**Teaching hints — review triggers**

- Cannot verify bilinearity → review linearity of integrals or summation
- Positive definiteness check errors → review why integral of non-negative continuous function is zero only if function is zero
- Confusion between inner product axioms and norm axioms → review both separately

**Spaced repetition / revision guidance**

Verify the three axioms for at least three different inner products: standard dot product, weighted dot product on ℝⁿ, and the integral inner product on C[0,1]. For each, compute a few norms and angles.

---

### Inner Product Space

*Concept ID: `math.linalg.inner-product-space` · Difficulty: expert · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 4h*

**Learning objective.** Work with inner product spaces, apply the Cauchy-Schwarz and triangle inequalities, and verify orthogonality in a non-standard inner product.

A vector space equipped with an inner product. Cauchy-Schwarz inequality: |⟨u,v⟩| ≤ |u||v|. The norm makes it a normed space; if complete, it becomes a Hilbert space.

An inner product space is a vector space V equipped with an inner product ⟨·,·⟩. The induced norm ‖v‖=√⟨v,v⟩ makes V a normed space. Key inequalities: Cauchy-Schwarz |⟨u,v⟩|≤‖u‖‖v‖ (equality iff u,v parallel); triangle inequality ‖u+v‖≤‖u‖+‖v‖. Two vectors are orthogonal iff ⟨u,v⟩=0. A complete inner product space is a Hilbert space (L²[a,b] is the canonical infinite-dimensional example).

**Key ideas**

- Inner product induces norm: ‖v‖=√⟨v,v⟩; induces angle: cos θ=⟨u,v⟩/(‖u‖‖v‖)
- Cauchy-Schwarz: |⟨u,v⟩|≤‖u‖‖v‖ — fundamental inequality
- Orthogonality: u⊥v iff ⟨u,v⟩=0; Pythagorean theorem: ‖u+v‖²=‖u‖²+‖v‖² when u⊥v
- Parallelogram law: ‖u+v‖²+‖u−v‖²=2‖u‖²+2‖v‖² (characterises inner product spaces)
- Hilbert space = complete inner product space; ℝⁿ and L²[a,b] are Hilbert spaces

**Vocabulary**

- **inner product space** — Vector space V with inner product ⟨·,·⟩; induces norm ‖v‖=√⟨v,v⟩
- **Cauchy-Schwarz inequality** — |⟨u,v⟩|≤‖u‖·‖v‖ for any inner product; equality iff u and v are linearly dependent
- **Hilbert space** — Complete inner product space; ℝⁿ, ℂⁿ, and L²[a,b] are key examples
- **parallelogram law** — ‖u+v‖²+‖u−v‖²=2(‖u‖²+‖v‖²); characterises norms that come from inner products

**Common misconceptions**

- *Misconception:* The Cauchy-Schwarz inequality is only for the standard dot product.
  *Correction:* Cauchy-Schwarz holds for any inner product: |⟨u,v⟩|≤√⟨u,u⟩·√⟨v,v⟩. For the integral inner product: |∫fg|≤√(∫f²)·√(∫g²).
- *Misconception:* Orthogonality means the vectors are at 90° visually.
  *Correction:* Orthogonality means ⟨u,v⟩=0 in the chosen inner product. In a non-Euclidean inner product, ⟨u,v⟩=0 may not correspond to the visual 90° angle.
- *Misconception:* Every normed space is an inner product space.
  *Correction:* A norm comes from an inner product iff the parallelogram law holds: ‖u+v‖²+‖u−v‖²=2(‖u‖²+‖v‖²). The L¹ norm does not satisfy this, so it is not induced by any inner product.

**Common mistakes in practice**

- Squaring both sides incorrectly when verifying Cauchy-Schwarz
- Confusing ⟨u,v⟩=0 (orthogonality in the inner product) with u·v=0 (standard dot product) — these coincide only for the standard inner product
- Assuming the parallelogram law holds for all norms

**Visual teaching opportunities**

- Geometric illustration: Cauchy-Schwarz as the cosine bound |cos θ|≤1
- Plot: the unit ball in different norms (‖·‖₁, ‖·‖₂, ‖·‖∞) — only ‖·‖₂ comes from an inner product
- Pythagorean theorem generalisation: ‖u+v‖²=‖u‖²+‖v‖² when u⊥v in ANY inner product space

**Worked example**

*Setup:* In C[0,1] with inner product ⟨f,g⟩=∫₀¹fg dx, verify the Cauchy-Schwarz inequality for f(x)=x and g(x)=1.

1. Step 1: Compute ⟨f,g⟩=∫₀¹x·1 dx=1/2.
2. Step 2: Compute ‖f‖=√⟨f,f⟩=√(∫₀¹x²dx)=√(1/3)=1/√3.
3. Step 3: Compute ‖g‖=√⟨g,g⟩=√(∫₀¹1dx)=1.
4. Step 4: Cauchy-Schwarz: |⟨f,g⟩|=1/2; ‖f‖·‖g‖=1/√3≈0.577.
5. Step 5: Check: 1/2=0.5≤0.577 ✓. The inequality holds.
6. Step 6: Compute the angle: cos θ=⟨f,g⟩/(‖f‖‖g‖)=(1/2)/(1/√3)=√3/2, so θ=30°. The functions 1 and x make a 30° angle in this inner product space.

*Outcome:* Cauchy-Schwarz verified: 1/2<1/√3≈0.577. The angle between f(x)=x and g(x)=1 in L²[0,1] is 30°.

**Real-world intuition**

- Signal processing: Cauchy-Schwarz gives a sharp bound on cross-correlation of signals
- Fourier analysis: orthogonality of sin and cos on [0,2π] is expressed via the integral inner product
- Quantum mechanics: state space is a Hilbert space; Cauchy-Schwarz underlies the Heisenberg uncertainty principle

**Practice progression**

Item types: Verify Cauchy-Schwarz for specific vectors in standard dot product, Verify Cauchy-Schwarz for functions in C[0,1], Check orthogonality of functions: are sin(x) and cos(x) orthogonal on [0,2π]?, Prove the Pythagorean theorem using inner product axioms, Verify the parallelogram law for the dot product, Show a norm does NOT come from an inner product (e.g., L¹ norm fails parallelogram law). Suggested item count: 6.

ℝⁿ Cauchy-Schwarz → function Cauchy-Schwarz → orthogonality in function spaces → abstract proofs

**Assessment objectives**

Formats: Verify Cauchy-Schwarz numerically, Compute angle between functions using inner product, Verify/refute orthogonality. Bloom alignment: understand.

Mastery signal: Correctly computes the inner product and norms, applies Cauchy-Schwarz, and determines the angle between two vectors or functions.

**Teacher notes**

Cauchy-Schwarz is one of the most useful inequalities in mathematics. Prove it from the positivity condition: expand ⟨u−tv,u−tv⟩≥0 as a quadratic in t and use the discriminant ≤0.

**Student notes**

Cauchy-Schwarz is equivalent to |cos θ|≤1. When ⟨u,v⟩=‖u‖‖v‖, the vectors are parallel (equality). When ⟨u,v⟩=0, they are orthogonal. Cauchy-Schwarz bridges algebra and geometry.

**Prerequisite graph**

- Requires: math.linalg.inner-product, math.linalg.vector-space
- Unlocks (future prerequisite links): math.linalg.orthogonal-basis, math.linalg.gram-schmidt
- Cross-topic connections (graph cross-links): math.fnal.hilbert-space
- Narrative: Inner product spaces generalise ℝⁿ with dot product to abstract settings. The Hilbert space cross-link (math.fnal.hilbert-space) is where this theory reaches its full expression. Cauchy-Schwarz is used in statistics (correlation ≤1), signal processing, and quantum mechanics.

**Teaching hints — review triggers**

- Cannot compute integral inner product → review integration techniques
- Confusion about orthogonality in non-Euclidean inner products → review inner product definition
- Parallelogram law errors → review algebraic expansion of ‖u±v‖²

**Spaced repetition / revision guidance**

For each inner product space you study, verify Cauchy-Schwarz numerically for two specific vectors. Then prove it algebraically from the inner product axioms by expanding ⟨u−tv,u−tv⟩≥0.

---

### Orthogonal and Orthonormal Basis

*Concept ID: `math.linalg.orthogonal-basis` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 3h*

**Learning objective.** Construct and use orthogonal and orthonormal bases, compute coordinates using the inner product formula, and verify that a basis is orthonormal.

A basis where all vectors are mutually orthogonal (orthogonal basis) or additionally unit vectors (orthonormal basis). In an ONB, coordinates of v are simply ⟨v,eᵢ⟩. Expansion: v=∑⟨v,eᵢ⟩eᵢ.

A set of vectors {e₁,…,eₙ} is orthonormal if ⟨eᵢ,eⱼ⟩=δᵢⱼ (1 if i=j, 0 if i≠j). In an ONB: any vector v has coordinates cᵢ=⟨v,eᵢ⟩ (no linear system to solve), and v=Σ⟨v,eᵢ⟩eᵢ (Fourier expansion). An orthogonal matrix Q has orthonormal columns: QᵀQ=I, so Q⁻¹=Qᵀ. Orthonormal bases are the most computationally convenient — projection, coordinate extraction, and distance calculations all simplify.

**Key ideas**

- Orthonormal: ⟨eᵢ,eⱼ⟩=δᵢⱼ (mutually orthogonal unit vectors)
- Fourier expansion: v=Σᵢ⟨v,eᵢ⟩eᵢ — coordinates are just inner products
- Coordinate extraction: cᵢ=⟨v,eᵢ⟩ (no system to solve, unlike non-ONB)
- Orthogonal matrix: columns form ONB; Qᵀ=Q⁻¹ (inversion is free)
- Parseval's identity: ‖v‖²=Σᵢ|⟨v,eᵢ⟩|² (Pythagorean theorem in full basis)

**Vocabulary**

- **orthogonal basis** — Basis with ⟨bᵢ,bⱼ⟩=0 for i≠j (mutually orthogonal, not necessarily unit norm)
- **orthonormal basis (ONB)** — Basis with ⟨eᵢ,eⱼ⟩=δᵢⱼ (orthogonal AND unit norm)
- **Fourier expansion** — v=Σᵢ⟨v,eᵢ⟩eᵢ in an ONB; each coefficient cᵢ=⟨v,eᵢ⟩ is computed by one inner product
- **Parseval's identity** — ‖v‖²=Σᵢ|⟨v,eᵢ⟩|²; the sum of squared ONB coordinates equals the squared norm

**Common misconceptions**

- *Misconception:* An orthogonal basis consists of unit vectors.
  *Correction:* An orthogonal basis has mutually orthogonal vectors (⟨eᵢ,eⱼ⟩=0 for i≠j) but not necessarily unit norm. An orthonormal basis additionally requires ‖eᵢ‖=1 for all i.
- *Misconception:* Coordinates in an ONB are computed the same way as in any other basis.
  *Correction:* In an ONB, the coordinate of v along eᵢ is simply ⟨v,eᵢ⟩ — no system of equations needed. In a general basis, you must solve Pc=v.
- *Misconception:* An orthogonal matrix has orthogonal (perpendicular) columns but not necessarily unit norm.
  *Correction:* By definition, an 'orthogonal matrix' Q satisfies QᵀQ=I, which requires columns to be orthonormal (unit norm AND mutually orthogonal).

**Common mistakes in practice**

- Confusing 'orthogonal basis' (not necessarily unit norm) with 'orthonormal basis' (both conditions)
- Using the general basis coordinate formula (matrix inversion) instead of cᵢ=⟨v,eᵢ⟩ for ONBs
- Forgetting to normalize when constructing an ONB from an orthogonal basis

**Visual teaching opportunities**

- Show the standard basis {e₁,e₂} is orthonormal; then show an alternative ONB by rotating 45°
- Diagram: projection of v onto e₁ is just ⟨v,e₁⟩·e₁; in ONB all n projections sum to v
- Table: Coordinates in a standard basis vs. an ONB — show why ONB avoids solving a linear system

**Worked example**

*Setup:* Show that B={b₁=(1/√2)(1,1), b₂=(1/√2)(1,−1)} is an orthonormal basis for ℝ², then express v=(3,1) in this basis.

1. Step 1: Check orthogonality: b₁·b₂=(1/2)(1·1+1·(−1))=(1/2)(0)=0 ✓.
2. Step 2: Check unit norms: ‖b₁‖²=(1/2)(1+1)=1 ✓; ‖b₂‖²=(1/2)(1+1)=1 ✓.
3. Step 3: B is orthonormal. Since dim(ℝ²)=2 and B has 2 ONB vectors, B is an orthonormal basis.
4. Step 4: Find coordinates using inner products. c₁=⟨v,b₁⟩=v·b₁=(3+1)/√2=4/√2=2√2.
5. Step 5: c₂=⟨v,b₂⟩=v·b₂=(3−1)/√2=2/√2=√2.
6. Step 6: Verify Fourier expansion: 2√2·b₁+√2·b₂=2√2·(1/√2)(1,1)+√2·(1/√2)(1,−1)=2(1,1)+1(1,−1)=(3,1)=v ✓. Parseval: ‖v‖²=(2√2)²+(√2)²=8+2=10=3²+1² ✓.

*Outcome:* [v]_B=(2√2,√2). The Fourier expansion gives v=2√2·b₁+√2·b₂=v ✓. Parseval's identity holds: 8+2=10=‖v‖².

**Real-world intuition**

- Fourier series: {1, cos(nx), sin(nx)} form an orthonormal basis for L²[−π,π]; coefficients are cₙ=⟨f,eₙ⟩
- Computer graphics: orthonormal camera basis (right, up, forward) defines the view frustum transformation
- Quantum mechanics: orthonormal energy eigenstates form a basis for the Hilbert space of states

**Practice progression**

Item types: Verify a given set is orthonormal, Find ONB coordinates of v via inner products, Construct ONB coordinates and verify Parseval's identity, Verify QᵀQ=I for a given orthogonal matrix, Fourier expansion in C[−π,π] with sin/cos basis functions, Show the standard basis is orthonormal; find coordinates of (a,b) directly. Suggested item count: 6.

Verify ONB conditions → coordinate extraction → Parseval → orthogonal matrix → function space ONB

**Assessment objectives**

Formats: Verify orthonormality conditions, Compute ONB coordinates via inner products, Verify Parseval's identity. Bloom alignment: apply.

Mastery signal: Verifies ⟨eᵢ,eⱼ⟩=δᵢⱼ, correctly computes cᵢ=⟨v,eᵢ⟩ for all i, and confirms the Fourier expansion equals v.

**Teacher notes**

The key pedagogical point: in an ONB, extracting coordinates requires only n inner products (no linear system). This makes ONBs the preferred computational tool. Fourier series is the infinite-dimensional version of this same idea.

**Student notes**

ONB coordinates are easy: cᵢ=v·eᵢ for each basis vector eᵢ. No matrix inversion needed. The Fourier expansion v=Σcᵢeᵢ is always exact when the eᵢ form a complete ONB.

**Prerequisite graph**

- Requires: math.linalg.orthogonality, math.linalg.basis
- Unlocks (future prerequisite links): math.linalg.gram-schmidt, math.linalg.projection
- Cross-topic connections (graph cross-links): none
- Narrative: ONBs are produced by Gram-Schmidt and are the prerequisite for the spectral theorem (orthonormal eigenvector basis of symmetric matrices). Gram-Schmidt orthonormalization is the ONB construction algorithm. QR factorisation encodes the change from a general basis to an ONB.

**Teaching hints — review triggers**

- Cannot compute inner product for orthogonality check → review dot product or inner product definition
- Coordinate extraction errors → review the Fourier expansion formula cᵢ=⟨v,eᵢ⟩
- Parseval identity errors → review ‖v‖²=Σcᵢ² and how to compute norms

**Spaced repetition / revision guidance**

For a given ONB: verify the two conditions, compute ONB coordinates for 3 different vectors, and confirm Parseval. For the standard basis, verify that the familiar formula for coordinates is just the special case of cᵢ=v·eᵢ.

---

### Gram-Schmidt Process

*Concept ID: `math.linalg.gram-schmidt` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Apply the Gram-Schmidt process to convert a linearly independent set into an orthonormal basis, and connect it to QR factorisation.

Iteratively converts a linearly independent set into an orthonormal basis: subtract projections onto previous vectors, then normalize. Foundation of QR factorization.

The Gram-Schmidt process converts any linearly independent set {v₁,…,vₙ} into an orthonormal set {e₁,…,eₙ} spanning the same space. Algorithm: (1) u₁=v₁; e₁=u₁/‖u₁‖. For k≥2: uₖ=vₖ−Σⱼ<ₖ⟨vₖ,eⱼ⟩eⱼ (subtract projections onto previous basis vectors); eₖ=uₖ/‖uₖ‖. The connection to QR: if A=[v₁|…|vₙ], then A=QR where Q=[e₁|…|eₙ] (ONB) and R is upper-triangular.

**Key ideas**

- Gram-Schmidt: subtract projections onto all previous ONB vectors, then normalise
- At each step, uₖ=vₖ−Σⱼ<ₖ⟨vₖ,eⱼ⟩eⱼ is the component of vₖ orthogonal to span{e₁,…,eₖ₋₁}
- The resulting e₁,…,eₙ are orthonormal and span the same space as v₁,…,vₙ
- QR factorisation: A=QR, Q orthogonal, R upper-triangular with positive diagonal
- Key property: span{v₁,…,vₖ}=span{e₁,…,eₖ} for each k=1,…,n

**Vocabulary**

- **Gram-Schmidt process** — Algorithm converting an independent set {v₁,…,vₙ} to an orthonormal set {e₁,…,eₙ} spanning the same space
- **QR factorisation** — A=QR with Q orthogonal and R upper-triangular; produced by Gram-Schmidt applied to the columns of A
- **projection orthogonalisation** — The key step uₖ=vₖ−Σⱼ<ₖ⟨vₖ,eⱼ⟩eⱼ: removes all components in the current ONB span
- **modified Gram-Schmidt** — A numerically stable variant that subtracts projections sequentially; equivalent in exact arithmetic but better in floating point

**Common misconceptions**

- *Misconception:* The Gram-Schmidt process changes the span of the vectors.
  *Correction:* Gram-Schmidt preserves the span at every step: span{v₁,…,vₖ}=span{e₁,…,eₖ}. It only reorients the vectors, not the space they span.
- *Misconception:* Subtract projections onto the original vectors vⱼ, not the orthonormal eⱼ.
  *Correction:* You must project onto the orthonormal vectors eⱼ already computed (not the original vⱼ). The formula uses eⱼ to ensure orthogonality.
- *Misconception:* Gram-Schmidt can be applied to any set of vectors.
  *Correction:* Gram-Schmidt requires the input vectors to be linearly independent. If any uₖ=0 during the process, the corresponding vₖ was in span{v₁,…,vₖ₋₁} — the set was dependent.

**Common mistakes in practice**

- Projecting onto previous v's instead of the orthonormal e's
- Forgetting to normalise each vector after removing projections
- Trying Gram-Schmidt on a dependent set without first checking independence

**Visual teaching opportunities**

- Step-by-step in ℝ²: show v₁,v₂, then u₁=v₁, then the projection of v₂ onto e₁ subtracted to give u₂, then normalisation
- Show the QR factorisation structure: columns of Q are e₁,e₂,…; entries of R are the inner products ⟨vₖ,eⱼ⟩
- Animate: at each step, the new orthonormal vector is perpendicular to all previous ones

**Worked example**

*Setup:* Apply Gram-Schmidt to v₁=(2,1), v₂=(1,2) in ℝ² with standard dot product.

1. Step 1: u₁=v₁=(2,1). e₁=u₁/‖u₁‖=(2,1)/√5=(2/√5, 1/√5).
2. Step 2: Projection of v₂ onto e₁: ⟨v₂,e₁⟩=(1·2+2·1)/√5=4/√5.
3. Step 3: Subtract projection: u₂=v₂−⟨v₂,e₁⟩e₁=(1,2)−(4/√5)·(2/√5,1/√5)=(1,2)−(8/5,4/5)=(−3/5,6/5).
4. Step 4: Normalise: ‖u₂‖²=9/25+36/25=45/25, so ‖u₂‖=3/√5. e₂=(−3/5,6/5)·(√5/3)=(−1/√5,2/√5).
5. Step 5: Verify orthogonality: e₁·e₂=(2/√5)(−1/√5)+(1/√5)(2/√5)=−2/5+2/5=0 ✓.
6. Step 6: Verify unit norms: ‖e₁‖²=4/5+1/5=1 ✓; ‖e₂‖²=1/5+4/5=1 ✓. QR: R=[[‖v₁‖, ⟨v₂,e₁⟩],[0,‖u₂‖]]=[[√5, 4/√5],[0,3/√5]].

*Outcome:* e₁=(2/√5,1/√5), e₂=(−1/√5,2/√5) form an ONB for ℝ². R=[[√5,4/√5],[0,3/√5]] with A=[v₁|v₂]=QR (verifiable by multiplication).

**Real-world intuition**

- QR factorisation (from Gram-Schmidt) is used in least-squares computations and eigenvalue algorithms (QR algorithm)
- Gram-Schmidt orthogonalisation is used in signal processing to create orthogonal signal bases
- Orthonormal polynomial bases (Legendre, Chebyshev) are produced by Gram-Schmidt on the polynomial inner product

**Practice progression**

Item types: 2D Gram-Schmidt from two independent vectors, 3D Gram-Schmidt from three independent vectors, Detect dependent set (uₖ=0 during process), Find QR factorisation of a 3×3 matrix, Gram-Schmidt on polynomials with integral inner product, Apply Gram-Schmidt within a 2D eigenspace (spectral theorem). Suggested item count: 6.

2D → 3D → QR connection → polynomial space → eigenspace application

**Assessment objectives**

Formats: Full Gram-Schmidt with verification of orthogonality and unit norms, Find QR from Gram-Schmidt, Identify dependent set from Gram-Schmidt failure. Bloom alignment: apply.

Mastery signal: Correctly subtracts projections onto previous orthonormal vectors, normalises each step, and verifies orthogonality of all pairs in the resulting ONB.

**Teacher notes**

The most common error is projecting onto the original vectors vⱼ instead of the orthonormal eⱼ. Emphasise: at step k, you subtract projections onto ALL PREVIOUSLY COMPUTED orthonormal vectors e₁,…,eₖ₋₁.

**Student notes**

Recipe: u₁=v₁, e₁=u₁/‖u₁‖. For k≥2: uₖ=vₖ−⟨vₖ,e₁⟩e₁−⟨vₖ,e₂⟩e₂−…−⟨vₖ,eₖ₋₁⟩eₖ₋₁; eₖ=uₖ/‖uₖ‖. If uₖ=0, the input vectors were dependent.

**Prerequisite graph**

- Requires: math.linalg.orthogonal-basis, math.linalg.projection
- Unlocks (future prerequisite links): math.linalg.qr-factorization
- Cross-topic connections (graph cross-links): none
- Narrative: Gram-Schmidt is the constructive proof that every finite-dimensional inner product space has an ONB. It produces QR factorisation (used in least-squares and the QR eigenvalue algorithm). In function spaces, it produces classical orthogonal polynomials (Legendre, Laguerre, Hermite).

**Teaching hints — review triggers**

- Projection computation errors → review proj_e(v)=⟨v,e⟩e
- Normalisation errors → review norm computation
- uₖ=0 (dependent input) → review linear independence test

**Spaced repetition / revision guidance**

Practise Gram-Schmidt on 2D, 3D, and at least one non-standard inner product (polynomial space). For each computation, verify: (1) all pairs are orthogonal; (2) all vectors are unit norm; (3) the span is preserved.

---

### Orthogonal Projection

*Concept ID: `math.linalg.projection` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Compute the orthogonal projection of a vector onto a line or subspace, verify the orthogonality of the error, and use the projection matrix formula.

The projection of v onto subspace W is the closest point in W to v, with v−proj_W(v) ⊥ W. For one vector: proj_u(v) = (v·u/u·u)u. For a subspace with ONB {e₁,…,eₖ}: proj = ∑⟨v,eᵢ⟩eᵢ.

The orthogonal projection of v onto a subspace W is the unique vector p∈W closest to v; the error e=v−p is perpendicular to W. For a single vector u: proj_u(v)=(v·u/u·u)u. For a subspace with ONB {e₁,…,eₖ}: proj_W(v)=Σᵢ⟨v,eᵢ⟩eᵢ. Matrix form: for a full-column-rank A, the projection onto C(A) is P=A(AᵀA)⁻¹Aᵀ. P is symmetric (Pᵀ=P) and idempotent (P²=P).

**Key ideas**

- Orthogonal projection: p=proj_W(v) is the closest point in W to v
- Error vector e=v−p is perpendicular to W: ⟨e,w⟩=0 for all w∈W
- Onto a vector u: proj_u(v)=(v·u/‖u‖²)u
- Projection matrix P=A(AᵀA)⁻¹Aᵀ: symmetric and idempotent (P²=P)
- ONB formula: proj_W(v)=Σᵢ⟨v,eᵢ⟩eᵢ (when {e₁,…,eₖ} is an ONB of W)

**Vocabulary**

- **orthogonal projection** — proj_W(v): the closest point in W to v; error v−proj_W(v) is perpendicular to W
- **projection matrix P** — P=A(AᵀA)⁻¹Aᵀ: projects onto col(A); satisfies Pᵀ=P and P²=P
- **idempotent** — P²=P; projecting twice is the same as once (already in the subspace after first application)
- **error vector** — e=v−proj_W(v): the component of v orthogonal to W; minimised by the orthogonal projection

**Common misconceptions**

- *Misconception:* The projection of v onto W equals v if v is close to W.
  *Correction:* proj_W(v) is the unique element of W with minimum distance to v. It equals v only if v∈W.
- *Misconception:* Projection is invertible — you can recover v from p.
  *Correction:* Projection is not invertible. Infinitely many vectors v have the same projection p onto W; the difference v−p can be anything orthogonal to W.
- *Misconception:* The projection matrix formula P=A(AᵀA)⁻¹Aᵀ requires A to be square.
  *Correction:* A can be m×k with k≤m (full column rank). The projection is onto the k-dimensional column space of A in ℝᵐ.

**Common mistakes in practice**

- Using ‖u‖ instead of ‖u‖² in the denominator: correct formula is (v·u)/(u·u), not (v·u)/‖u‖
- Forgetting to verify e⊥W (orthogonality is the defining property of orthogonal projection)
- Using an oblique projection formula when orthogonal projection is required

**Visual teaching opportunities**

- ℝ³ diagram: v above a plane W; p=proj_W(v) is the foot of the perpendicular from v to W; e=v−p points straight down
- Show the formula for proj_u(v) as the shadow of v cast along the direction of u
- P²=P: applying projection twice gives the same result — already in W after first projection

**Worked example**

*Setup:* Project v=(3,4) onto the line through the origin in the direction of u=(1,2). Find the projection, error, and verify orthogonality.

1. Step 1: Apply the formula proj_u(v)=(v·u/u·u)u. Compute v·u=3·1+4·2=11 and u·u=1+4=5.
2. Step 2: proj_u(v)=(11/5)(1,2)=(11/5,22/5).
3. Step 3: Compute the error: e=v−proj_u(v)=(3−11/5, 4−22/5)=(4/5, −2/5).
4. Step 4: Verify e⊥u: e·u=(4/5)·1+(−2/5)·2=4/5−4/5=0 ✓.
5. Step 5: Compute distance from v to the line: ‖e‖=√(16/25+4/25)=√(20/25)=2√5/5=2/√5.
6. Step 6: Verify Pythagorean theorem: ‖proj‖²+‖e‖²=(11/5)²+(22/5)²+(4/5)²+(2/5)²=121/25+484/25+16/25+4/25=625/25=25=‖v‖² ✓.

*Outcome:* proj_u(v)=(11/5,22/5); error e=(4/5,−2/5)⊥u. Pythagorean identity ‖proj‖²+‖e‖²=‖v‖²=25 verified.

**Real-world intuition**

- Least-squares: the best approximation Ax̂≈b is the projection of b onto the column space of A
- Signal processing: projecting a signal onto a subspace extracts the 'best approximation' in that subspace
- Computer graphics: projecting 3D points onto a 2D screen plane uses the projection matrix

**Practice progression**

Item types: Project a vector onto a line through the origin, Project a vector onto a plane (2D subspace in ℝ³), Compute projection matrix P=A(AᵀA)⁻¹Aᵀ and verify P²=P, Find the distance from a point to a line or plane using projection, Show that Pᵀ=P (symmetric) and P²=P (idempotent), Use ONB formula for projection onto a subspace with known ONB. Suggested item count: 6.

Line projection → plane projection → matrix P → properties → ONB formula

**Assessment objectives**

Formats: Compute projection and verify e⊥W, Find projection matrix P and verify P²=P, Pythagorean identity verification. Bloom alignment: apply.

Mastery signal: Correctly computes proj_u(v), finds the error vector, verifies orthogonality by inner product = 0, and confirms the Pythagorean identity.

**Teacher notes**

Emphasise the two key properties: Pᵀ=P (symmetry) and P²=P (idempotency). These completely characterise orthogonal projection matrices. A matrix satisfying P²=P but Pᵀ≠P is an oblique projection — not the orthogonal one.

**Student notes**

For projection onto a single vector u: use (v·u/u·u)u. For projection onto a subspace with ONB {e₁,…,eₖ}: use Σ⟨v,eᵢ⟩eᵢ. For general column space of A: use P=A(AᵀA)⁻¹Aᵀ. Always verify the error is orthogonal to the subspace.

**Prerequisite graph**

- Requires: math.linalg.orthogonality, math.linalg.inner-product
- Unlocks (future prerequisite links): math.linalg.least-squares
- Cross-topic connections (graph cross-links): none
- Narrative: Orthogonal projection is the geometric foundation for least-squares (projection of b onto col(A)), Gram-Schmidt (each step projects out previous directions), and the spectral theorem (eigenspaces are orthogonal projections). The normal equations AᵀAx̂=Aᵀb say exactly that Ax̂ is the projection of b onto col(A).

**Teaching hints — review triggers**

- Formula errors → review v·u/u·u vs. v·u/‖u‖ (the former is correct; latter needs normalising u first)
- Orthogonality check fails → arithmetic error in error vector; recompute e·u
- P²≠P in verification → matrix multiplication error; recompute

**Spaced repetition / revision guidance**

Practise projection onto a line, then a plane, then compute P=A(AᵀA)⁻¹Aᵀ and verify P²=P and Pᵀ=P. For each, always verify that the error vector is orthogonal to the subspace.

---

### Least Squares

*Concept ID: `math.linalg.least-squares` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Solve an overdetermined or inconsistent linear system in the least-squares sense using the normal equations AᵀAx̂=Aᵀb, and apply it to linear regression.

When Ax=b has no solution, the least squares solution minimizes |Ax−b|². Found by the normal equations AᵀAx̂=Aᵀb. Solution: x̂=(AᵀA)⁻¹Aᵀb when AᵀA is invertible.

When Ax=b has no exact solution (m>n, overdetermined), the least-squares solution x̂ minimises ‖Ax−b‖². Geometrically, Ax̂ is the orthogonal projection of b onto the column space of A. The normal equations AᵀAx̂=Aᵀb are always consistent; when A has full column rank, x̂=(AᵀA)⁻¹Aᵀb is unique. The pseudoinverse A⁺=(AᵀA)⁻¹Aᵀ gives x̂=A⁺b. Residual r=b−Ax̂ is orthogonal to col(A): Aᵀr=0.

**Key ideas**

- Least-squares: minimise ‖Ax−b‖² → normal equations AᵀAx̂=Aᵀb
- Solution x̂=(AᵀA)⁻¹Aᵀb when A has full column rank
- Residual r=b−Ax̂ satisfies Aᵀr=0 (residual ⊥ col(A))
- Geometric interpretation: Ax̂=Pb (projection of b onto col(A))
- Linear regression: A=[1|x_data], b=y_data; x̂=(intercept, slope) minimises sum of squared residuals

**Vocabulary**

- **least-squares solution x̂** — Minimiser of ‖Ax−b‖²; given by normal equations AᵀAx̂=Aᵀb
- **normal equations** — AᵀAx̂=Aᵀb; necessary and sufficient for x̂ to be a least-squares solution
- **pseudoinverse A⁺** — (AᵀA)⁻¹Aᵀ when A has full column rank; x̂=A⁺b
- **residual r** — b−Ax̂; satisfies Aᵀr=0 (residual is orthogonal to all columns of A)

**Common misconceptions**

- *Misconception:* The normal equations AᵀAx̂=Aᵀb solve Ax̂=b.
  *Correction:* The normal equations find x̂ that minimises ‖Ax−b‖². They do NOT solve Ax=b exactly (that may be impossible). The residual r=b−Ax̂≠0 in general.
- *Misconception:* Least-squares gives the exact solution when Ax=b is consistent.
  *Correction:* If Ax=b is consistent, the least-squares solution equals the exact solution (r=0). But least-squares works even when Ax=b has no solution.
- *Misconception:* AᵀA is always invertible.
  *Correction:* AᵀA is invertible iff A has full column rank (nullity(A)=0). If A has dependent columns, AᵀA is singular and x̂ is not unique (use SVD or pseudoinverse).

**Common mistakes in practice**

- Solving Ax̂=b directly instead of the normal equations AᵀAx̂=Aᵀb
- Forgetting to compute Aᵀb (using b directly in the system instead)
- Not verifying Aᵀr=0 as a final check

**Visual teaching opportunities**

- Geometry: b in ℝᵐ; col(A) is a subspace; Ax̂=Pb is the foot of the perpendicular from b onto col(A)
- Linear regression scatter plot: data points above/below the fitted line; residuals are vertical distances
- Show: the normal equation AᵀAx̂=Aᵀb is the condition Aᵀr=0 (residual ⊥ columns of A)

**Worked example**

*Setup:* Fit a line y=a+bx to the data (x,y)=(0,1),(1,2),(2,4) using least-squares.

1. Step 1: Set up A=[1|x_data] and b=y_data. A=[[1,0],[1,1],[1,2]], b=(1,2,4)ᵀ.
2. Step 2: Compute AᵀA=[[1,1,1],[0,1,2]]·[[1,0],[1,1],[1,2]]=[[3,3],[3,5]] and Aᵀb=[[1,1,1],[0,1,2]]·(1,2,4)=(7,10).
3. Step 3: Solve [[3,3],[3,5]]x̂=(7,10). det=15−9=6. (AᵀA)⁻¹=(1/6)[[5,−3],[−3,3]].
4. Step 4: x̂=(1/6)[[5,−3],[−3,3]]·(7,10)=(1/6)(35−30,−21+30)=(1/6)(5,9)=(5/6,3/2).
5. Step 5: Fitted line: ŷ=5/6+(3/2)x. Residuals: r=(1−5/6, 2−7/3, 4−23/6)=(1/6,−1/3,1/6).
6. Step 6: Verify Aᵀr=0: [[1,1,1],[0,1,2]]·(1/6,−2/6,1/6)=(1/6−2/6+1/6, 0−2/6+2/6)=(0,0) ✓. Normal equations: AᵀAx̂=(3·5/6+3·3/2, 3·5/6+5·3/2)=(5/2+9/2,5/2+15/2)=(7,10)=Aᵀb ✓.

*Outcome:* Least-squares line ŷ=5/6+(3/2)x. Residuals (1/6,−2/6,1/6) are orthogonal to both columns of A (Aᵀr=0 verified). Normal equations confirmed.

**Real-world intuition**

- Linear regression: least-squares line of best fit minimises the sum of squared vertical residuals
- GPS positioning: overdetermined system from multiple satellite distances solved by least-squares
- Computer vision: fitting geometric models (planes, ellipses) to point clouds via least-squares

**Practice progression**

Item types: Solve a 3×2 overdetermined system by normal equations, Fit a line y=a+bx to three data points, Verify Aᵀr=0 for the least-squares residual, Fit a quadratic y=a+bx+cx² to data (overdetermined), Derive the normal equations from d/dx̂ ‖Ax−b‖²=0, Compute the projection matrix P=A(AᵀA)⁻¹Aᵀ and verify Pb=Ax̂. Suggested item count: 6.

2-parameter overdetermined system → linear regression → quadratic fit → projection matrix → derivation

**Assessment objectives**

Formats: Solve normal equations to find x̂, Verify residual orthogonality Aᵀr=0, Fit a regression line with normal equations and interpret. Bloom alignment: apply.

Mastery signal: Correctly computes AᵀA and Aᵀb, solves the normal equations, and verifies both the normal equation AᵀAx̂=Aᵀb and the residual orthogonality Aᵀr=0.

**Teacher notes**

The geometric picture is essential: Ax̂ is the projection of b onto col(A). The normal equations say exactly that the residual is orthogonal to col(A) — the defining property of orthogonal projection.

**Student notes**

Recipe: (1) compute AᵀA and Aᵀb; (2) solve AᵀAx̂=Aᵀb; (3) compute residual r=b−Ax̂; (4) verify Aᵀr=0. The verification step is your self-check: if Aᵀr≠0, you made an arithmetic error.

**Prerequisite graph**

- Requires: math.linalg.projection, math.linalg.matrix-transpose
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.stats.linear-regression
- Narrative: Least-squares is the application of orthogonal projection to the column space of A. It connects to the projection matrix P=A(AᵀA)⁻¹Aᵀ, the pseudoinverse A⁺, and linear regression (cross-link math.stats.linear-regression). QR factorisation provides a numerically more stable path to the same solution.

**Teaching hints — review triggers**

- Cannot compute AᵀA or Aᵀb → review matrix transpose and multiplication
- Errors in solving the 2×2 or 3×3 normal equations → review linear system solution
- Residual orthogonality check fails → arithmetic error; recompute r and then Aᵀr

**Spaced repetition / revision guidance**

Practise the full workflow for at least two overdetermined systems: (1) compute AᵀA and Aᵀb; (2) solve normal equations; (3) compute residual; (4) verify Aᵀr=0. Then practise a linear regression problem with real interpretation.

---

### QR Factorization

*Concept ID: `math.linalg.qr-factorization` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** Factor a matrix A = QR where Q has orthonormal columns and R is upper triangular using Gram-Schmidt; apply the decomposition to solve least-squares problems and understand the QR algorithm for eigenvalues.

A = QR where Q is orthogonal (Qᵀ=Q⁻¹) and R is upper triangular. Computed by Gram-Schmidt or Householder reflections. Used for least squares, eigenvalue computation (QR algorithm).

QR factorization writes any m×n matrix with linearly independent columns as A = QR, where Q is an m×n matrix with orthonormal columns (QᵀQ = I) and R is an n×n upper-triangular matrix with positive diagonal entries. The decomposition is computed by applying Gram-Schmidt orthogonalization to the columns of A: the j-th column of Q is the unit vector in the direction of aⱼ after subtracting its projections onto the previous Q-columns, and R records those projection coefficients. Numerically, Householder reflections produce a more stable algorithm than classical Gram-Schmidt. QR factorization is the backbone of the QR algorithm (iterative eigenvalue computation) and provides a stable route to solving least-squares problems via back-substitution.

**Key ideas**

- Q has orthonormal columns: QᵀQ = I (if m = n then QQᵀ = I too, making Q orthogonal)
- R is upper triangular; its diagonal entries rᵢᵢ = ‖vᵢ‖ are the norms of the Gram-Schmidt intermediate vectors
- Each column aⱼ = r₁ⱼq₁ + r₂ⱼq₂ + … + rⱼⱼqⱼ — R captures the triangular change-of-basis
- Least squares: Ax ≈ b → QRx ≈ b → Rx = Qᵀb (solvable by back-substitution, no normal equations needed)
- Existence is guaranteed for any matrix with linearly independent columns; uniqueness holds when R diagonal entries are required positive
- Householder reflections are numerically preferred over classical Gram-Schmidt for large matrices (stable O(mn²) algorithm)

**Vocabulary**

- **QR factorization** — The decomposition A = QR where Q has orthonormal columns and R is upper triangular.
- **Economy QR** — The m×n form of Q (only n columns, not full m×m), paired with an n×n R; sufficient for most applications.
- **Householder reflection** — An orthogonal transformation H = I − 2vvᵀ/‖v‖² that reflects a vector across a hyperplane; used for numerically stable QR computation.
- **Back-substitution** — Solving an upper-triangular system Rx = c by computing xₙ = cₙ/Rₙₙ, then xₙ₋₁, …, x₁ in reverse order.

**Common misconceptions**

- *Misconception:* Q is always a square orthogonal matrix
  *Correction:* For m×n A with m > n, Q is m×n with orthonormal columns (QᵀQ = Iₙ) but QQᵀ ≠ Iₘ; only the economy QR. The full QR appends additional orthonormal vectors to make Q square.
- *Misconception:* QR factorization requires A to be square
  *Correction:* QR works for any m×n matrix with linearly independent columns (n ≤ m); it is especially useful for tall, overdetermined systems (m > n).
- *Misconception:* R's off-diagonal entries are zero
  *Correction:* Only the entries below the diagonal are zero; R is upper triangular, so entries above the diagonal can be nonzero.

**Common mistakes in practice**

- Forgetting to subtract all previous projections (only subtracting the immediately preceding one rather than all prior qᵢ)
- Putting r₁₂ in the wrong position of R (R is upper triangular, so r_{ij} appears in row i, column j with i ≤ j)
- Concluding Q is square when m > n — for tall matrices, the economy Q is m×n, not m×m

**Visual teaching opportunities**

- Draw the column space of A as successive vectors, then show Gram-Schmidt sweeping each column onto the orthonormal frame — the geometry of removing projections
- Show a right-triangle diagram: the column aⱼ is the hypotenuse; its projection onto span{q₁,…,qⱼ₋₁} is the horizontal leg; the residual vⱼ is the vertical leg, which becomes qⱼ
- Matrix diagram: colour Q's columns in gradient shades and R's upper triangle, showing how each original column is a linear combination only of Q-columns up to and including its own index

**Worked example**

*Setup:* Factor A = [[1,1],[1,0]] using Gram-Schmidt QR, then verify QR = A and QᵀQ = I.

1. Step 1: Read off the columns a₁ = (1,1)ᵀ and a₂ = (1,0)ᵀ. Why: Gram-Schmidt processes columns one at a time.
2. Step 2: Normalize a₁. ‖a₁‖ = √(1²+1²) = √2. So q₁ = a₁/‖a₁‖ = (1/√2, 1/√2)ᵀ. First R entry: r₁₁ = √2. Why: q₁ is the first orthonormal basis vector.
3. Step 3: Compute the projection of a₂ onto q₁. r₁₂ = q₁ᵀa₂ = (1/√2)(1)+(1/√2)(0) = 1/√2. Subtract: v₂ = a₂ − r₁₂ q₁ = (1,0)ᵀ − (1/√2)(1/√2,1/√2)ᵀ = (1,0)ᵀ − (1/2,1/2)ᵀ = (1/2,−1/2)ᵀ. Why: Gram-Schmidt removes the q₁-component to produce an orthogonal residual.
4. Step 4: Normalize v₂. ‖v₂‖ = √((1/2)²+(1/2)²) = 1/√2. So q₂ = v₂/‖v₂‖ = (1/√2,−1/√2)ᵀ. R entry: r₂₂ = 1/√2. Why: q₂ is perpendicular to q₁ (check: q₁·q₂ = 1/2−1/2 = 0 ✓).
5. Step 5: Assemble Q and R. Q = [[1/√2, 1/√2],[1/√2, −1/√2]], R = [[√2, 1/√2],[0, 1/√2]]. Why: R is upper triangular with the rᵢⱼ computed above.
6. Step 6: Verify QR = A. Row 0: (1/√2)(√2)+(1/√2)(0)=1 and (1/√2)(1/√2)+(1/√2)(1/√2)=1. Row 1: (1/√2)(√2)+(−1/√2)(0)=1 and (1/√2)(1/√2)+(−1/√2)(1/√2)=0. Result: [[1,1],[1,0]] = A ✓.
7. Step 7: Verify QᵀQ = I. QᵀQ[0,0]=1/2+1/2=1, QᵀQ[0,1]=1/2−1/2=0, QᵀQ[1,1]=1/2+1/2=1. Confirms Q has orthonormal columns ✓.

*Outcome:* Q = [[1/√2, 1/√2],[1/√2, −1/√2]], R = [[√2, 1/√2],[0, 1/√2]]; QR = A ✓, QᵀQ = I ✓.

**Real-world intuition**

- Numerical least squares: QR is the standard algorithm used by statistical software to fit linear regression models — more stable than solving normal equations AᵀAx = Aᵀb directly
- QR algorithm: iterative factorization of A → QR then R·Q converges to a triangular (near-diagonal) matrix whose diagonal reveals eigenvalues — the backbone of LAPACK's dgeev
- Signal processing: QR-based RLS (recursive least squares) for real-time adaptive filtering in noise-cancelling headphones
- Computer graphics: QR decomposition of transformation matrices to extract the rotation component from a combined scale-rotate transform

**Practice progression**

Item types: Apply Gram-Schmidt to find Q and R for a given 3×2 matrix, Use Q and R to solve a least-squares system Ax ≈ b via back-substitution on Rx = Qᵀb, Verify that QᵀQ = I for a computed Q, Identify which Gram-Schmidt step would produce a zero vector (detecting linear dependence), Compare Gram-Schmidt vs. Householder for a 4×3 matrix (conceptual question). Suggested item count: 6.

Start with 2×2 integer-entry matrices → 3×2 matrices → 3×3 full square QR → application to overdetermined least-squares → conceptual questions on numerical stability

**Assessment objectives**

Formats: Compute Q and R for a given matrix and verify the factorization, Short-answer: explain why R's diagonal entries equal the Gram-Schmidt norms, Application: solve Ax ≈ b using QR and compare efficiency to normal equations. Bloom alignment: apply.

Mastery signal: Student correctly executes Gram-Schmidt on a 3×2 matrix, assembles Q and R, verifies QR = A and QᵀQ = I, and uses the factorization to solve a 3×2 least-squares problem by back-substitution without error.

**Teacher notes**

Emphasize that QR and LU both triangularize A but for different purposes: LU for square systems (Gaussian elimination), QR for rectangular/overdetermined systems. Use the geometric picture — each Gram-Schmidt step 'rotates' a new column onto the orthonormal frame — before writing the algebra.

**Student notes**

When computing Gram-Schmidt by hand, maintain full fractions rather than rounding early; rounding intermediate norms causes R's upper triangle to be incorrect. Always check your Q by computing QᵀQ — off-diagonal entries must be 0.

**Prerequisite graph**

- Requires: math.linalg.gram-schmidt
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.num.qr-algorithm
- Narrative: QR factorization connects Gram-Schmidt (the computational recipe), least squares (application via Qᵀb), the QR eigenvalue algorithm (iterative matrix diagonalization), and Householder reflections (orthogonal transformations). It also connects to LU factorization: both triangularize A but Q-orthogonal vs. L-lower-triangular.

**Teaching hints — review triggers**

- Student confuses Q orthogonal vs. orthonormal columns — review dot product and orthogonality definition
- Student cannot compute Gram-Schmidt projection — review vector projection formula proj_u(v) = (v·u/u·u)u
- Student does not know what upper triangular means — review matrix structure from row-echelon form

**Spaced repetition / revision guidance**

Review: Gram-Schmidt orthogonalization, vector projection, orthonormal sets, upper-triangular matrix structure, and back-substitution. Mastery of QR requires fluency with all of these simultaneously.

---

### Singular Value Decomposition

*Concept ID: `math.linalg.svd` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.8 · Estimated study time: 8h*

**Learning objective.** Decompose any m×n matrix as A = UΣVᵀ with orthogonal U and V and diagonal Σ of singular values; interpret the decomposition geometrically and apply it to low-rank approximation and data analysis.

Any m×n matrix A = UΣVᵀ where U (m×m) and V (n×n) are orthogonal and Σ (m×n) is diagonal with non-negative entries (singular values). Most powerful matrix decomposition; foundation of numerical linear algebra and data science.

The Singular Value Decomposition (SVD) of an m×n matrix A is A = UΣVᵀ, where U (m×m) and V (n×n) are orthogonal matrices whose columns are left and right singular vectors, and Σ is an m×n diagonal matrix with non-negative entries σ₁ ≥ σ₂ ≥ … ≥ 0 (the singular values). Every matrix has an SVD, regardless of shape or rank. Geometrically, A decomposes any linear map into three steps: a rotation/reflection Vᵀ, a diagonal scaling Σ, then another rotation/reflection U. The rank of A equals the number of nonzero singular values, and the best rank-k approximation is Aₖ = Σᵢ₌₁ᵏ σᵢ uᵢ vᵢᵀ (Eckart-Young theorem), minimizing ‖A − Aₖ‖ among all rank-k matrices.

**Key ideas**

- A = UΣVᵀ with U, V orthogonal and Σ diagonal non-negative; exists for every matrix
- Left singular vectors uᵢ (columns of U) are orthonormal eigenvectors of AAᵀ; right singular vectors vᵢ (columns of V) are orthonormal eigenvectors of AᵀA
- σᵢ = √(eigenvalue of AᵀA) = √(eigenvalue of AAᵀ); rank(A) = number of nonzero σᵢ
- Geometric interpretation: any linear map is a rotation → anisotropic scaling → rotation
- Eckart-Young: best rank-k approximation is Aₖ = Σᵢ₌₁ᵏ σᵢ uᵢ vᵢᵀ, error ‖A − Aₖ‖₂ = σₖ₊₁
- Condition number κ(A) = σ_max/σ_min quantifies numerical sensitivity of the linear system Ax = b

**Vocabulary**

- **Singular value** — A non-negative scalar σᵢ = √(eigenvalue of AᵀA) appearing on the diagonal of Σ in the SVD A = UΣVᵀ.
- **Left singular vector** — Column uᵢ of U; eigenvector of AAᵀ with eigenvalue σᵢ².
- **Right singular vector** — Column vᵢ of V; eigenvector of AᵀA with eigenvalue σᵢ².
- **Truncated SVD** — Keeping only the top-k singular triplets (σᵢ, uᵢ, vᵢ) to form the best rank-k approximation Aₖ.
- **Condition number** — κ(A) = σ_max/σ_min; measures how much relative error in b is amplified in the solution x of Ax = b.

**Common misconceptions**

- *Misconception:* SVD is just eigendecomposition applied to a non-square matrix
  *Correction:* SVD applies to any matrix and involves two different orthogonal bases (U for ℝᵐ and V for ℝⁿ), while eigendecomposition uses one basis and only applies to square matrices — and only diagonalizes them when they have n independent eigenvectors.
- *Misconception:* The singular values are the eigenvalues of A
  *Correction:* Singular values are the square roots of eigenvalues of AᵀA (or AAᵀ), which are always non-negative. For non-symmetric square A, eigenvalues can be complex, but singular values are always real and non-negative.
- *Misconception:* SVD is too expensive for practical use
  *Correction:* Truncated SVD computing only the top-k singular values is highly efficient (O(mnk) for sparse matrices using Lanczos/Arnoldi methods) and is the standard algorithm used in PCA, recommender systems, and image compression.

**Common mistakes in practice**

- Computing eigenvectors of A instead of AᵀA (only works when A is symmetric positive definite)
- Forgetting to order singular values from largest to smallest (σ₁ ≥ σ₂ ≥ 0) before assembling Σ
- Confusing σᵢ (singular value) with λᵢ (eigenvalue) — singular values are always non-negative; eigenvalues can be complex

**Visual teaching opportunities**

- Draw the unit circle/sphere mapped by A: Vᵀ rotates it, Σ stretches it into an ellipse with semi-axes σ₁, σ₂, then U rotates the ellipse — the SVD is literally drawing how A deforms space
- Low-rank approximation demo: show a grayscale image approximated by rank-1, rank-5, rank-20 truncated SVD, visually demonstrating how quickly quality improves with rank
- Matrix factorization diagram: A (m×n) = U (m×m) × Σ (m×n) × Vᵀ (n×n), with Σ shown as a sparse diagonal, and U, V shown as orthogonal (column-orthonormal frame)

**Worked example**

*Setup:* Find the SVD of A = [[2,2],[1,−1]]. Verify UΣVᵀ = A and that U, V are orthogonal.

1. Step 1: Compute AᵀA. Aᵀ = [[2,1],[2,−1]]. AᵀA = [[4+1,4−1],[4−1,4+1]] = [[5,3],[3,5]]. Why: Right singular vectors are eigenvectors of AᵀA.
2. Step 2: Find eigenvalues of AᵀA. det(AᵀA − λI) = (5−λ)² − 9 = λ² − 10λ + 16 = (λ−8)(λ−2) = 0. So λ₁ = 8, λ₂ = 2. Singular values: σ₁ = √8 = 2√2, σ₂ = √2.
3. Step 3: Find right singular vectors (eigenvectors of AᵀA). For λ₁ = 8: (AᵀA − 8I)v = [[−3,3],[3,−3]]v = 0 → v₁ = (1,1)ᵀ/√2. For λ₂ = 2: (AᵀA − 2I)v = [[3,3],[3,3]]v = 0 → v₂ = (1,−1)ᵀ/√2. So V = [[1/√2, 1/√2],[1/√2, −1/√2]].
4. Step 4: Compute left singular vectors uᵢ = (1/σᵢ)Avᵢ. u₁ = (1/(2√2))·A·(1/√2)(1,1)ᵀ = (1/(2√2·√2))(2+2,1−1)ᵀ = (1/4)(4,0)ᵀ = (1,0)ᵀ. u₂ = (1/√2)·A·(1/√2)(1,−1)ᵀ = (1/2)(2−2,1+1)ᵀ = (1/2)(0,2)ᵀ = (0,1)ᵀ. So U = I₂.
5. Step 5: Write the SVD. A = UΣVᵀ where U = I, Σ = [[2√2,0],[0,√2]], V = [[1/√2, 1/√2],[1/√2, −1/√2]].
6. Step 6: Verify UΣVᵀ = A. ΣVᵀ = [[2√2·1/√2, 2√2·1/√2],[√2·1/√2, √2·(−1/√2)]] = [[2,2],[1,−1]] = A (since U = I) ✓.
7. Step 7: Verify U and V are orthogonal. UUᵀ = I ✓. VVᵀ: row 0 of V times col 0: (1/√2)²+(1/√2)² = 1 ✓; row 0 times col 1: (1/√2)(1/√2)+(1/√2)(−1/√2) = 0 ✓. VVᵀ = I ✓.

*Outcome:* U = I₂, Σ = [[2√2,0],[0,√2]], V = [[1/√2, 1/√2],[1/√2, −1/√2]]; UΣVᵀ = A ✓; U, V orthogonal ✓.

**Real-world intuition**

- Image compression: SVD of a pixel matrix; keeping only the top-k singular values/vectors reduces storage by factor (m+n+1)k/(mn) while preserving visual quality
- Principal Component Analysis (PCA): SVD of the centred data matrix X directly gives principal components (columns of V) and explained variance (σᵢ²/Σσⱼ²)
- Recommender systems: low-rank SVD of the user-item rating matrix discovers latent factors (genres, styles) — the foundation of collaborative filtering (Netflix Prize)
- Pseudoinverse computation: A⁺ = VΣ⁺Uᵀ is defined via SVD and gives minimum-norm least-squares solutions
- Natural Language Processing: Latent Semantic Analysis (LSA) applies SVD to term-document matrices to find semantic clusters

**Practice progression**

Item types: Compute AᵀA and find its eigenvalues/eigenvectors to extract singular values and V, Compute left singular vectors from uᵢ = (1/σᵢ)Avᵢ, Reconstruct A from U, Σ, V as a verification step, Find the best rank-1 approximation A₁ = σ₁u₁v₁ᵀ and compute ‖A − A₁‖₂, Determine rank and null space of A from the SVD (zero singular values), Interpret condition number κ = σ₁/σ₂ for a given SVD. Suggested item count: 6.

Start with 2×2 diagonal matrices (trivial SVD) → 2×2 symmetric → 2×2 general → 3×2 rectangular → conceptual questions on low-rank approximation and condition numbers

**Assessment objectives**

Formats: Compute the SVD of a 2×2 matrix and verify all properties, Identify the rank of a matrix from its SVD and describe its null space, Short-answer: explain the geometric meaning of the three SVD factors. Bloom alignment: analyze.

Mastery signal: Student correctly computes AᵀA, finds its eigenvalues and eigenvectors, derives U from uᵢ = Avᵢ/σᵢ, assembles U, Σ, V, verifies UΣVᵀ = A, and correctly states the relationship between zero singular values and the null space.

**Teacher notes**

The geometric picture (rotation → scale → rotation) is essential before algebra. Use a concrete ellipse diagram. Stress that SVD exists for all matrices (unlike eigendecomposition) and that U and V are not the same matrix (unlike for symmetric A, where they coincide by the spectral theorem).

**Student notes**

To remember which is U and which is V: U's columns are the left singular vectors (they live in the output space ℝᵐ), V's columns are the right singular vectors (they live in the input space ℝⁿ). The mnemonic: 'U goes Up' (output) and 'V goes into the input'.

**Prerequisite graph**

- Requires: math.linalg.spectral-theorem, math.linalg.qr-factorization
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.num.svd, math.opt.pca
- Narrative: SVD generalizes the spectral theorem (A=QΛQᵀ for symmetric A) to arbitrary matrices. It subsumes pseudoinverse, low-rank approximation, PCA, and is the computational backbone of numerical linear algebra. The QR algorithm iteratively drives A toward a form whose singular values are exposed.

**Teaching hints — review triggers**

- Student cannot compute AᵀA — review matrix multiplication and transpose
- Student confuses left and right singular vectors — review the two separate eigenproblems AAᵀ and AᵀA
- Student does not understand eigenvalues — review the characteristic polynomial and eigendecomposition

**Spaced repetition / revision guidance**

Review: eigenvalues and eigenvectors, spectral theorem, orthogonal matrices, matrix multiplication. SVD is the capstone of the linear algebra sequence and relies on every preceding concept.

---

### Singular Values

*Concept ID: `math.linalg.singular-values` · Difficulty: expert · Bloom level: understand · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** Compute singular values as square roots of AᵀA eigenvalues, interpret them as the lengths of the semi-axes of the image ellipsoid, and use them to determine rank, operator norm, and condition number.

The singular values σᵢ = √(eigenvalues of AᵀA) = √(eigenvalues of AAᵀ). They generalize eigenvalues to non-square matrices; σ₁ = |A| (operator 2-norm). Encode the 'strength' of each mode of the transformation.

The singular values σ₁ ≥ σ₂ ≥ … ≥ 0 of an m×n matrix A are the non-negative square roots of the eigenvalues of AᵀA (equivalently AAᵀ). They generalize the absolute values of eigenvalues to non-square matrices and always exist. σ₁ = ‖A‖₂ is the operator (spectral) 2-norm — the maximum factor by which A can stretch a unit vector. The number of nonzero singular values equals rank(A). Singular values govern how 'spread out' the image of the unit ball is: A maps the unit sphere in ℝⁿ to an ellipsoid in ℝᵐ with semi-axes σ₁, σ₂, …

**Key ideas**

- σᵢ = √λᵢ(AᵀA) = √λᵢ(AAᵀ) ≥ 0; the two eigenvalue sets agree on the nonzero values
- Operator 2-norm: ‖A‖₂ = σ₁ (the largest singular value)
- rank(A) = number of nonzero singular values; nullity(A) = n − rank(A)
- Condition number: κ(A) = σ₁/σₙ; large κ signals near-singularity and numerical instability
- For a symmetric positive semidefinite matrix, singular values equal eigenvalues (σᵢ = λᵢ)
- Eckart-Young: σₖ₊₁ = ‖A − Aₖ‖₂ where Aₖ is the best rank-k approximation

**Vocabulary**

- **Operator 2-norm** — ‖A‖₂ = σ₁ = max_{‖x‖=1} ‖Ax‖; the largest factor by which A stretches a unit vector.
- **Condition number** — κ(A) = σ_max/σ_min; measures sensitivity of Ax = b to perturbations in b.
- **Frobenius norm** — ‖A‖_F = √(Σᵢ,ⱼ aᵢⱼ²) = √(Σᵢ σᵢ²); another matrix norm related to singular values.

**Common misconceptions**

- *Misconception:* Singular values are the same as eigenvalues
  *Correction:* Eigenvalues of a general matrix can be complex and negative; singular values are always real and non-negative. For a symmetric positive definite matrix they coincide, but that is a special case.
- *Misconception:* The largest singular value equals the largest absolute eigenvalue
  *Correction:* For a normal matrix, ‖A‖₂ = max|λᵢ|, but for a non-normal matrix, σ₁ can be much larger than max|λᵢ|. The 2-norm is always the largest singular value, not the largest eigenvalue magnitude.

**Common mistakes in practice**

- Failing to take the positive square root of AᵀA eigenvalues (singular values must be ≥ 0)
- Ordering singular values ascending instead of descending (convention is σ₁ ≥ σ₂ ≥ … ≥ 0)

**Visual teaching opportunities**

- Show the unit circle mapped by A to an ellipse: the lengths of the semi-axes are σ₁ and σ₂, and the directions are the left singular vectors u₁, u₂
- Spectrum plot: dot the singular values on a number line in descending order; highlight the gap after rank-k singular values to show the 'best rank-k cutoff' for approximation

**Worked example**

*Setup:* Find the singular values of A = [[2,2],[1,−1]] and interpret them.

1. Step 1: Form AᵀA. Aᵀ = [[2,1],[2,−1]], so AᵀA = [[4+1,4−1],[4−1,4+1]] = [[5,3],[3,5]]. Why: singular values come from the eigenvalues of AᵀA.
2. Step 2: Compute eigenvalues of AᵀA. trace = 10, det = 25−9 = 16. Characteristic polynomial: λ²−10λ+16 = (λ−8)(λ−2) = 0. Eigenvalues: λ₁ = 8, λ₂ = 2.
3. Step 3: Singular values. σ₁ = √8 = 2√2 ≈ 2.83, σ₂ = √2 ≈ 1.41. Why: σᵢ = √λᵢ.
4. Step 4: Verify with trace and determinant. trace(AᵀA) = σ₁²+σ₂² = 8+2 = 10 ✓. det(AᵀA) = σ₁²σ₂² = 16 ✓ (det(AᵀA) = det(A)² = (−2−2)² = 16 ✓).
5. Step 5: Interpret. ‖A‖₂ = σ₁ = 2√2 (A stretches unit vectors by at most factor 2√2). rank(A) = 2 (both σᵢ > 0). Condition number κ = 2√2/√2 = 2 (well-conditioned).
6. Step 6: Image ellipse. A maps the unit circle to an ellipse with semi-major axis 2√2 (direction u₁=(1,0)) and semi-minor axis √2 (direction u₂=(0,1)). Why: the SVD geometry gives semi-axis lengths σᵢ in directions uᵢ.

*Outcome:* σ₁ = 2√2, σ₂ = √2; ‖A‖₂ = 2√2; rank = 2; κ = 2; image of unit ball is an ellipse with semi-axes 2√2 and √2 ✓.

**Real-world intuition**

- Numerical stability: a linear system Ax = b is ill-conditioned when σ_min ≈ 0; condition number κ tells engineers how many significant digits are lost in solving the system
- Image processing: singular values of an image matrix measure how much 'information' each rank-1 layer contributes; small σᵢ are compressed away
- Quantum mechanics: singular values of the density matrix encode entanglement in bipartite quantum states (Schmidt decomposition)

**Practice progression**

Item types: Compute singular values of a 2×2 and a 3×2 matrix from AᵀA eigenvalues, Identify rank from the list of singular values, Compute the condition number and classify the matrix as well/ill-conditioned, Find the operator 2-norm for a given matrix, Compare singular values and eigenvalues for a symmetric positive definite matrix. Suggested item count: 6.

Diagonal matrices (trivial) → 2×2 symmetric → 2×2 general → 3×2 rectangular → compare σᵢ vs. |λᵢ| for non-symmetric matrices

**Assessment objectives**

Formats: Compute singular values and state the rank of a given matrix, Find the operator 2-norm and condition number from the SVD, Short-answer: why are singular values always non-negative even when eigenvalues can be negative?. Bloom alignment: understand.

Mastery signal: Student correctly computes AᵀA, finds its eigenvalues, takes square roots in non-increasing order, identifies rank from zero singular values, and correctly computes operator norm and condition number.

**Teacher notes**

Stress the geometric picture (unit sphere → ellipsoid) repeatedly. Students confuse σᵢ with |λᵢ| — a good counterexample is a nilpotent matrix like [[0,1],[0,0]]: eigenvalues are both 0, but σ₁ = 1.

**Student notes**

Always form AᵀA first (n×n, easier to work with than AAᵀ for m > n). Then eigenvalues → square roots → order descending. The singular values are non-negative by construction.

**Prerequisite graph**

- Requires: math.linalg.svd, math.linalg.eigenvalues
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Singular values tie together eigenvalues (of AᵀA), the SVD (which exposes them as diagonal entries), norms (operator and Frobenius), condition numbers (numerical stability), and low-rank approximation (Eckart-Young theorem).

**Teaching hints — review triggers**

- Student cannot compute eigenvalues of AᵀA — review characteristic polynomial for 2×2 matrices
- Student confuses matrix 2-norm with Frobenius norm — clarify ‖A‖₂ = σ₁ vs. ‖A‖_F = √(Σσᵢ²)

**Spaced repetition / revision guidance**

Review: eigenvalues, square roots of non-negative numbers, matrix norms, operator norm definition. Singular values are a capstone concept requiring mastery of all preceding ideas.

---

### Moore-Penrose Pseudoinverse

*Concept ID: `math.linalg.pseudoinverse` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.75 · Estimated study time: 5h*

**Learning objective.** Compute the Moore-Penrose pseudoinverse A⁺ = VΣ⁺Uᵀ from the SVD and use it to find the minimum-norm least-squares solution to any linear system Ax = b.

A⁺ = VΣ⁺Uᵀ where Σ⁺ inverts each nonzero singular value and leaves zero singular values as zero. Gives the minimum-norm least squares solution x̂=A⁺b for any system Ax=b.

The Moore-Penrose pseudoinverse A⁺ of an m×n matrix A is defined via the SVD: if A = UΣVᵀ then A⁺ = VΣ⁺Uᵀ, where Σ⁺ is obtained from Σ by replacing each nonzero diagonal entry σᵢ with 1/σᵢ and leaving zeros as zero. A⁺ satisfies the four Moore-Penrose conditions (AA⁺A = A, A⁺AA⁺ = A⁺, (AA⁺)ᵀ = AA⁺, (A⁺A)ᵀ = A⁺A). For any right-hand side b, x̂ = A⁺b is the minimum-norm least-squares solution: among all vectors minimizing ‖Ax − b‖₂, it has the smallest ‖x‖₂. When A is square and invertible, A⁺ = A⁻¹.

**Key ideas**

- A⁺ = VΣ⁺Uᵀ where Σ⁺ replaces each nonzero σᵢ with 1/σᵢ; zero singular values stay zero
- x̂ = A⁺b minimizes ‖Ax − b‖₂ (least-squares) and among all minimizers has the smallest norm
- For overdetermined full-column-rank A: A⁺ = (AᵀA)⁻¹Aᵀ (the normal-equation left inverse)
- For underdetermined full-row-rank A: A⁺ = Aᵀ(AAᵀ)⁻¹ (the right inverse giving minimum-norm solution)
- A⁺A is the orthogonal projector onto row space of A; AA⁺ is the projector onto column space
- The four Moore-Penrose conditions uniquely characterize A⁺ for any matrix

**Vocabulary**

- **Pseudoinverse (A⁺)** — The unique matrix satisfying the four Moore-Penrose conditions; computed as A⁺ = VΣ⁺Uᵀ from the SVD.
- **Minimum-norm solution** — Among all vectors minimizing ‖Ax − b‖₂, the one with the smallest Euclidean norm; given by x̂ = A⁺b.
- **Moore-Penrose conditions** — Four matrix equations: AA⁺A = A, A⁺AA⁺ = A⁺, (AA⁺)ᵀ = AA⁺, (A⁺A)ᵀ = A⁺A; any matrix satisfying these is the pseudoinverse.

**Common misconceptions**

- *Misconception:* The pseudoinverse gives an exact solution to Ax = b when the system is inconsistent
  *Correction:* For an inconsistent system (b ∉ col(A)), x̂ = A⁺b is the least-squares solution — it minimizes the residual ‖Ax − b‖₂ but does not make Ax = b exactly. The residual r = b − Ax̂ is orthogonal to col(A).
- *Misconception:* A⁺ = Aᵀ always
  *Correction:* A⁺ = Aᵀ only when A is an orthogonal matrix (columns orthonormal) or when Aᵀ happens to be a left/right inverse. In general A⁺ ≠ Aᵀ.

**Common mistakes in practice**

- Using the wrong formula (left vs. right inverse) for the wrong shape matrix
- Not verifying Ax̂ = b (consistent case) or checking ‖Ax̂ − b‖ ≤ ‖Ax − b‖ for a random x (inconsistent case)
- Forgetting that Σ⁺ leaves zero diagonal entries as zero (not replaced by infinity)

**Visual teaching opportunities**

- Diagram for overdetermined case: show b projected onto col(A) as Ax̂; the residual r = b − Ax̂ is perpendicular to col(A); x̂ = A⁺b is the foot of the perpendicular
- Diagram for underdetermined case: show the solution set (an affine subspace) and x̂ = A⁺b as the unique point in the set closest to the origin

**Worked example**

*Setup:* A = [[1,0,1],[0,1,1]] (2×3, underdetermined). Find A⁺ and compute the minimum-norm solution to Ax = (1,1)ᵀ. Verify that the solution has smaller norm than another solution.

1. Step 1: Note A has full row rank (rank 2 = m = 2). Use A⁺ = Aᵀ(AAᵀ)⁻¹. Why: this formula applies for full row-rank matrices.
2. Step 2: Compute AAᵀ. AAᵀ = [[1,0,1],[0,1,1]] × [[1,0],[0,1],[1,1]] = [[1+0+1,0+0+1],[0+0+1,0+1+1]] = [[2,1],[1,2]]. Why: we need to invert this 2×2 matrix.
3. Step 3: Invert AAᵀ. det = 4−1 = 3. (AAᵀ)⁻¹ = (1/3)[[2,−1],[−1,2]].
4. Step 4: Compute A⁺ = Aᵀ(AAᵀ)⁻¹. Aᵀ = [[1,0],[0,1],[1,1]]. A⁺ = [[1,0],[0,1],[1,1]] × (1/3)[[2,−1],[−1,2]] = (1/3)[[2,−1],[−1,2],[1,1]].
5. Step 5: Find minimum-norm solution x̂ = A⁺b with b = (1,1)ᵀ. x̂ = (1/3)[[2,−1],[−1,2],[1,1]](1,1)ᵀ = (1/3)(1,1,2)ᵀ. So x̂ = (1/3, 1/3, 2/3)ᵀ.
6. Step 6: Verify Ax̂ = b. A x̂ = [[1,0,1],[0,1,1]](1/3)(1,1,2)ᵀ = (1/3)(1+0+2,0+1+2)ᵀ = (1/3)(3,3)ᵀ = (1,1)ᵀ = b ✓.
7. Step 7: Compare with another solution. x' = (1,1,0)ᵀ also satisfies Ax' = (1+0,0+1)ᵀ = (1,1)ᵀ. But ‖x'‖² = 2 > ‖x̂‖² = 1/9+1/9+4/9 = 2/3. So x̂ has strictly smaller norm ✓.

*Outcome:* A⁺ = (1/3)[[2,−1],[−1,2],[1,1]]; x̂ = (1/3,1/3,2/3)ᵀ; Ax̂ = (1,1)ᵀ ✓; ‖x̂‖² = 2/3 < 2 = ‖x'‖² ✓.

**Real-world intuition**

- Robotics inverse kinematics: the pseudoinverse finds the minimum-energy joint motion to reach a target end-effector position when the robot is kinematically redundant
- Control systems: minimum-norm control input u = B⁺r that achieves a desired state transition while minimizing energy consumption
- Signal recovery: compressed sensing uses pseudoinverse-like ideas to recover sparse signals from underdetermined measurements
- Data fitting: when design matrices are rank-deficient (multicollinear predictors), A⁺b gives the minimum-norm least-squares fit without ad hoc regularization

**Practice progression**

Item types: Compute A⁺ for a 2×3 full-row-rank matrix using Aᵀ(AAᵀ)⁻¹, Compute A⁺ for a 3×2 full-column-rank matrix using (AᵀA)⁻¹Aᵀ, Find the minimum-norm solution to an underdetermined consistent system, Find the least-squares solution to an overdetermined inconsistent system, Verify the four Moore-Penrose conditions for a computed A⁺, Compare two solutions and confirm the pseudoinverse gives the minimum-norm one. Suggested item count: 6.

Invertible square (A⁺ = A⁻¹) → full-column-rank overdetermined → full-row-rank underdetermined → rank-deficient (SVD formula required) → all four Moore-Penrose conditions

**Assessment objectives**

Formats: Compute x̂ = A⁺b for an underdetermined system and verify minimum-norm property, Use the pseudoinverse to solve a least-squares problem and compute the residual, Short-answer: what does AA⁺ project onto, and what does A⁺A project onto?. Bloom alignment: apply.

Mastery signal: Student correctly computes A⁺ via the appropriate formula, finds x̂ = A⁺b, verifies Ax̂ = b (consistent case) or minimality of ‖Ax̂ − b‖ (inconsistent case), and confirms minimum norm among all solutions.

**Teacher notes**

Draw the geometry carefully: for overdetermined systems, x̂ is the foot of perpendicular from b to col(A). For underdetermined systems, x̂ is the point in the solution hyperplane closest to the origin. Both pictures are projections, just in different spaces.

**Student notes**

Two key formulas to remember: (1) full-column-rank: A⁺ = (AᵀA)⁻¹Aᵀ (left inverse). (2) full-row-rank: A⁺ = Aᵀ(AAᵀ)⁻¹ (right inverse). For rank-deficient matrices, you must use A⁺ = VΣ⁺Uᵀ from the full SVD.

**Prerequisite graph**

- Requires: math.linalg.svd
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Pseudoinverse connects SVD (the computational definition), least squares (the overdetermined application), minimum-norm solutions (underdetermined), projection matrices (AA⁺ and A⁺A are orthogonal projectors), and regularisation (Tikhonov regularisation (AᵀA + λI)⁻¹Aᵀ reduces to A⁺ as λ→0).

**Teaching hints — review triggers**

- Student cannot compute the SVD — review SVD computation and the formulas for U, Σ, V
- Student confuses least-squares with exact solution — review projection onto column space and the geometric meaning of residuals
- Student does not understand overdetermined vs. underdetermined — review rank, column space, and when Ax = b has no solution

**Spaced repetition / revision guidance**

Review: SVD computation, orthogonal projectors, least-squares problem setup, and matrix multiplication. The pseudoinverse formula A⁺ = VΣ⁺Uᵀ requires solid mastery of SVD.

---

### Tensor

*Concept ID: `math.linalg.tensor` · Difficulty: expert · Bloom level: understand · Mastery threshold: 0.7 · Estimated study time: 8h*

**Learning objective.** Define a tensor as a multilinear map with contravariant and covariant indices; compute tensor components in a given basis; and recognise scalars, vectors, dual vectors, and matrices as special cases of tensors.

A multilinear map T: V×⋯×V×V*×⋯×V*→F of type (r,s), where r contravariant and s covariant indices. Includes scalars (0,0), vectors (1,0), dual vectors (0,1), and matrices (1,1). Tensor product ⊗ constructs higher-rank tensors.

A tensor of type (r, s) is a multilinear map T: V×⋯×V×V*×⋯×V* → F taking r copies of V* and s copies of V as arguments (contravariant rank r, covariant rank s). Its components in a basis {eᵢ} are Tⁱ¹…ⁱʳⱼ₁…ⱼₛ = T(fⁱ¹,…,fⁱʳ,eⱼ₁,…,eⱼₛ). Special cases: scalars are (0,0)-tensors, vectors are (1,0)-tensors, linear functionals (dual vectors) are (0,1)-tensors, and matrices are (1,1)-tensors. The tensor product A⊗B of tensors A and B yields a higher-rank tensor whose components are products of individual components. Tensors transform under a change of basis by the contravariant transformation law for upper indices and the covariant law for lower indices.

**Key ideas**

- A (r,s)-tensor is multilinear: linear in each of its r+s arguments separately
- Components Tⁱʲ…ₖₗ… are the values on basis elements; they transform predictably under basis change
- Scalars: (0,0); vectors: (1,0); covectors/linear functionals: (0,1); linear maps/matrices: (1,1); bilinear forms/metric tensors: (0,2)
- Tensor product: (A⊗B)ⁱ…ᵢₖ…ₖ = Aⁱ…Bₖ… — rank adds
- Index contraction reduces rank by 2: summing over one upper and one lower index generalises matrix-vector multiplication
- In physics: a tensor equation valid in one basis is valid in all bases — this coordinate-independence is the key property

**Vocabulary**

- **Tensor of type (r,s)** — A multilinear map taking r dual vectors and s vectors as arguments; has rank r+s.
- **Contravariant index** — An upper index; the corresponding components transform by the inverse of the basis-change matrix.
- **Covariant index** — A lower index; the corresponding components transform by the basis-change matrix itself.
- **Tensor product (⊗)** — An operation combining two tensors of types (r,s) and (r',s') into one of type (r+r',s+s'); components are products of individual components.
- **Contraction** — Summing over a matched upper-lower index pair, reducing tensor rank by 2; generalises the trace and matrix-vector product.

**Common misconceptions**

- *Misconception:* A tensor is just a multi-dimensional array of numbers
  *Correction:* The numbers (components) depend on the choice of basis. What defines a tensor is how those components transform under a change of basis. A random multi-dimensional array is not a tensor unless it satisfies the correct transformation law.
- *Misconception:* Matrices and tensors are the same thing
  *Correction:* A matrix can represent a (1,1)-tensor, a (0,2)-tensor, or just a linear map depending on context. Tensors can have arbitrary rank; matrices are rank-2 arrays. The distinction matters when coordinates change.

**Common mistakes in practice**

- Treating a multi-dimensional array as a tensor without checking the transformation law
- Confusing covariant (lower) and contravariant (upper) indices, leading to incorrect transformation rules
- Thinking tensor product ⊗ is the same as matrix multiplication (it is not — ⊗ increases rank, while matrix multiplication contracts one index)

**Visual teaching opportunities**

- Draw a hierarchy: scalars (rank 0) → vectors/covectors (rank 1) → matrices (rank 2) → rank-3 tensors (cube of numbers) — each level is a multilinear extension of the previous
- Show a (0,2)-tensor T as a bilinear form: a function that takes two vectors and returns a scalar, visualised as a quadratic surface when restricted to the unit sphere

**Worked example**

*Setup:* Define a (0,2)-tensor T on ℝ² by T(u,v) = u₁v₁ + 2u₂v₂. Find the components Tᵢⱼ in the standard basis, verify multilinearity, and compute T((1,2),(3,4)).

1. Step 1: Components. Tᵢⱼ = T(eᵢ,eⱼ). T(e₁,e₁) = 1·1+2·0·0 = 1. T(e₁,e₂) = 1·0+2·0·1 = 0. T(e₂,e₁) = 0·1+2·1·0 = 0. T(e₂,e₂) = 0·0+2·1·1 = 2. So component matrix [Tᵢⱼ] = [[1,0],[0,2]]. Why: components are the values on basis pairs.
2. Step 2: Verify bilinearity. T(αu+βw,v) = α(u₁v₁+2u₂v₂)+β(w₁v₁+2w₂v₂) = αT(u,v)+βT(w,v) ✓. Why: linearity in each slot is the defining property.
3. Step 3: Matrix representation. T(u,v) = uᵀ[[1,0],[0,2]]v for column vectors u,v. This confirms [Tᵢⱼ] = [[1,0],[0,2]] is the component matrix.
4. Step 4: Evaluate T((1,2),(3,4)). T((1,2),(3,4)) = 1·1·3+2·2·4 = 3+16 = 19. Alternatively: [1,2]·[[1,0],[0,2]]·[3,4]ᵀ = [1,4]·[3,4]ᵀ = 3+16 = 19 ✓.
5. Step 5: Change of basis (conceptual). Under a basis change P, the components transform as T'ᵢⱼ = ΣₖΣₗ (P⁻¹)ₖᵢ (P⁻¹)ₗⱼ Tₖₗ (covariant, two lower indices). Why: this transformation law is what makes T a genuine tensor.

*Outcome:* [Tᵢⱼ] = [[1,0],[0,2]]; T is bilinear ✓; T((1,2),(3,4)) = 19 ✓; components transform covariantly under basis change.

**Real-world intuition**

- General relativity: the stress-energy tensor T^μν (rank-2 contravariant) encodes energy, momentum, and stress — Einstein's field equations equate it to the metric curvature tensor
- Continuum mechanics: the Cauchy stress tensor σᵢⱼ (0,2) maps a surface normal to the traction force acting on that surface
- Machine learning: 'tensors' in deep learning frameworks (PyTorch, TensorFlow) are multi-dimensional arrays; gradients of scalar losses w.r.t. weight matrices are genuine mathematical tensors
- Computer vision: the structure tensor (0,2) of an image encodes local gradient orientation for edge and corner detection

**Practice progression**

Item types: Identify the type (r,s) of: the dot product, a linear functional, matrix-vector multiplication, a bilinear form, Compute components of a given bilinear form T in the standard basis, Verify that a given map is multilinear (or find which slot breaks linearity), Compute a tensor product A⊗B for two (0,1)-tensors (covectors) and identify the resulting (0,2)-tensor, Perform an index contraction on a (1,1)-tensor (the trace). Suggested item count: 6.

Identify special cases (scalar, vector, matrix) → compute (0,2)-tensor components → verify multilinearity → tensor product → index contraction (trace) → change-of-basis transformation law

**Assessment objectives**

Formats: Given a bilinear map, compute its component matrix in the standard basis, Short-answer: why is a random 3D array not necessarily a tensor?, Classify a list of maps by tensor type (r,s). Bloom alignment: understand.

Mastery signal: Student correctly identifies tensor type from a description, computes components in a given basis, verifies multilinearity, and explains how components transform under a basis change (contravariant vs. covariant).

**Teacher notes**

Most linear algebra courses stop at matrices, so tensors feel abstract. Ground them in familiar examples first: the dot product is a (0,2)-tensor, matrix-vector multiplication is a (1,1)-tensor action. Introduce the transformation law only after students are comfortable with components.

**Student notes**

Think of a tensor's type (r,s) as: r = 'how many dual-vector slots (upper indices)', s = 'how many vector slots (lower indices)'. The rank is r+s. Scalars have no slots, vectors have one upper slot, linear functionals have one lower slot.

**Prerequisite graph**

- Requires: math.linalg.vector-space, math.linalg.linear-map
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.cat.tensor-product
- Narrative: Tensors unify vectors, dual vectors, bilinear forms, and linear maps under one framework. They generalise to differential geometry (tangent/cotangent bundles), physics (relativity, continuum mechanics), and deep learning (computation graphs). Index contraction generalises both the trace and matrix-vector multiplication.

**Teaching hints — review triggers**

- Student does not know what a linear functional is — review dual space before tensors
- Student cannot explain multilinearity — review bilinear forms and contrast with the (non-multilinear) cross product
- Student confuses tensor product ⊗ with matrix multiplication — clarify that ⊗ produces a higher-rank object, not a same-shape result

**Spaced repetition / revision guidance**

Review: vector spaces, linear maps, dual spaces, bilinear forms, and matrix multiplication. Tensors require comfort with abstraction — spend extra time on dual spaces and multilinearity before proceeding.

---

### Dual Space

*Concept ID: `math.linalg.dual-space` · Difficulty: expert · Bloom level: understand · Mastery threshold: 0.75 · Estimated study time: 5h*

**Learning objective.** Define the dual space V* as the space of all linear functionals on V; construct the dual basis; and represent any linear functional as a row vector acting on column vectors.

V* = Hom(V,F), the space of all linear functionals on V. dim(V*)=dim(V). Dual basis {f¹,…,fⁿ} satisfies fⁱ(eⱼ)=δⁱⱼ. Key in differential geometry (1-forms) and functional analysis.

The dual space of a vector space V over field F is V* = Hom(V,F), the set of all linear maps φ: V → F. These maps are called linear functionals or covectors. V* is itself a vector space under pointwise addition and scalar multiplication, and dim(V*) = dim(V). For a finite-dimensional V with basis {e₁,…,eₙ}, the dual basis {f¹,…,fⁿ} is defined by fⁱ(eⱼ) = δⁱⱼ (Kronecker delta). Every φ ∈ V* has a unique expansion φ = φ₁f¹ + … + φₙfⁿ where φᵢ = φ(eᵢ). In coordinates, a linear functional acts as a row vector: φ(x) = [φ₁,…,φₙ][x₁,…,xₙ]ᵀ. Dual spaces appear in differential geometry (1-forms), functional analysis, and as the foundation of tensor algebra.

**Key ideas**

- V* = Hom(V,F): all linear maps from V to the scalar field F
- dim(V*) = dim(V) for any finite-dimensional V
- Dual basis {fⁱ} satisfies fⁱ(eⱼ) = δⁱⱼ; every linear functional is a unique linear combination of dual basis elements
- In coordinates: φ ∈ V* acts as a row vector, v ∈ V acts as a column vector; φ(v) = φᵀv (a scalar)
- Double dual: (V*)* ≅ V naturally (without choosing a basis) — V is canonically isomorphic to its double dual
- In physics/geometry: dual vectors are covectors or 1-forms; they appear as gradients, momenta, and differential forms

**Vocabulary**

- **Linear functional** — A linear map φ: V → F from a vector space to the scalar field; also called a covector or 1-form.
- **Dual space (V*)** — The vector space Hom(V,F) of all linear functionals on V; dim(V*) = dim(V).
- **Dual basis** — The basis {f¹,…,fⁿ} of V* dual to {e₁,…,eₙ} of V, satisfying fⁱ(eⱼ) = δⁱⱼ.
- **Double dual** — (V*)* ≅ V; V is canonically isomorphic to its double dual via the evaluation map v ↦ (φ ↦ φ(v)).
- **Covector** — An element of V*; in physics, the dual of a contravariant vector, written with a lower index.

**Common misconceptions**

- *Misconception:* V* is a different, 'bigger' or 'smaller' space than V
  *Correction:* For finite-dimensional V, dim(V*) = dim(V), so V and V* are isomorphic. However, there is no natural (basis-independent) isomorphism between them — unlike the double dual (V*)* ≅ V which is canonical.
- *Misconception:* The dual basis is just the transpose of the original basis
  *Correction:* The dual basis elements fⁱ are functions, not vectors. They satisfy the selection property fⁱ(eⱼ) = δⁱⱼ. If the original basis is not the standard basis, the dual basis is not simply obtained by transposing.

**Common mistakes in practice**

- Thinking V and V* are the same space with the same elements (they have the same dimension but their elements are different objects: vectors vs. functions)
- Using the wrong pairing (column times column) instead of the correct evaluation (row vector times column vector)
- Confusing the natural isomorphism V ≅ V** (exists without a metric) with the isomorphism V ≅ V* (requires an inner product — not canonical)

**Visual teaching opportunities**

- Draw V as a column of arrows and V* as a row of 'measurement rulers', each fⁱ reading off one coordinate — the dual basis element fⁱ measures the i-th component of any vector
- Show the level sets of a linear functional φ: V → ℝ as parallel hyperplanes in V; the functional assigns a number (the 'height') to each vector, and the dual vector is the gradient direction perpendicular to these hyperplanes

**Worked example**

*Setup:* Let V = ℝ² with standard basis e₁ = (1,0), e₂ = (0,1). Find the dual basis, express φ(x,y) = 2x − 3y in the dual basis, and evaluate φ on v = (4,1).

1. Step 1: Identify the dual basis. f¹ and f² must satisfy f¹(e₁)=1, f¹(e₂)=0, f²(e₁)=0, f²(e₂)=1. The functionals f¹(x,y)=x and f²(x,y)=y satisfy these. Why: the dual basis reads off individual coordinates.
2. Step 2: Express φ in the dual basis. φ(x,y) = 2x−3y = 2f¹(x,y)+(−3)f²(x,y). So φ = 2f¹+(−3)f². Why: the coefficients are φ(e₁)=2 and φ(e₂)=−3.
3. Step 3: Verify the coefficients. φ(e₁) = 2(1)−3(0) = 2 = 2·f¹(e₁)+(−3)·f²(e₁) = 2·1+(−3)·0 = 2 ✓. φ(e₂) = 2(0)−3(1) = −3 = 2·0+(−3)·1 = −3 ✓.
4. Step 4: Row-vector representation. φ corresponds to the row vector [2,−3]. φ(v) = [2,−3][4,1]ᵀ = 8−3 = 5. Why: in coordinates, any linear functional is a row vector.
5. Step 5: Confirm directly. φ(4,1) = 2(4)−3(1) = 8−3 = 5 ✓.
6. Step 6: Confirm dim(V*) = dim(V) = 2. The dual basis {f¹,f²} has exactly 2 elements, the same as {e₁,e₂} ✓.

*Outcome:* Dual basis: f¹(x,y)=x, f²(x,y)=y; φ = 2f¹−3f²; row representation [2,−3]; φ(4,1) = 5 ✓; dim(V*) = 2 = dim(V) ✓.

**Real-world intuition**

- Differential geometry: 1-forms (covector fields) are sections of the cotangent bundle; the gradient df is a 1-form that measures the rate of change of f along any tangent vector
- Classical mechanics: generalised momenta pᵢ = ∂L/∂q̇ᵢ in the Lagrangian formalism are naturally dual to velocities q̇ᵢ — they live in the cotangent space, not the tangent space
- Machine learning: the weight vector w in a linear classifier wᵀx + b acts as a linear functional on the feature space; the dual perspective explains support vectors in SVMs
- Quantum mechanics: 'bra' vectors ⟨φ| in Dirac notation are elements of the dual space to the Hilbert space of 'ket' vectors |ψ⟩

**Practice progression**

Item types: Write out the dual basis for a given non-standard basis of ℝ², Express a linear functional as a linear combination of dual basis elements and find its row-vector representation, Given a row vector, identify the linear functional it represents and evaluate it on several vectors, Verify that a given map is a linear functional (check linearity), Show that the double dual of a finite-dimensional space is naturally isomorphic to V. Suggested item count: 6.

Standard basis dual basis → non-standard basis dual basis → expressing arbitrary functionals → row-vector representation → double dual canonical isomorphism

**Assessment objectives**

Formats: Construct the dual basis for a given basis and verify the δᵢⱼ property, Express a given linear functional in terms of the dual basis and represent it as a row vector, Short-answer: why does dim(V*) = dim(V) for finite-dimensional V?. Bloom alignment: understand.

Mastery signal: Student correctly constructs the dual basis satisfying fⁱ(eⱼ) = δⁱⱼ, expresses any given linear functional as a linear combination of dual basis elements, represents it as a row vector, and evaluates it correctly on a given vector.

**Teacher notes**

The dual space is abstract and often poorly motivated. Start with a concrete application: the gradient in calculus is a covector (it maps a displacement vector to a directional derivative — a scalar). Once students accept that, the algebraic formalism follows naturally.

**Student notes**

A linear functional φ takes in a vector and spits out a scalar. In ℝⁿ with the standard basis, every linear functional is just a dot product φ(v) = aᵀv for some fixed vector a. The 'dual' comes from switching perspective: instead of thinking of a as a column vector, think of it as a row vector (a linear function on column vectors).

**Prerequisite graph**

- Requires: math.linalg.vector-space, math.linalg.linear-map
- Unlocks (future prerequisite links): math.linalg.tensor
- Cross-topic connections (graph cross-links): math.fnal.dual-space-functional
- Narrative: Dual spaces are the foundation of tensors (a (0,s)-tensor is a multilinear map on V×⋯×V, i.e., a multilinear functional). They appear in differential forms (cotangent bundles), linear programming duality, and Dirac notation in quantum mechanics. An inner product identifies V with V* non-canonically.

**Teaching hints — review triggers**

- Student is not comfortable with the definition of a linear map — review Hom(V,W) and linearity conditions
- Student confuses the dual basis with the transpose of the basis matrix — carefully distinguish functions from vectors
- Student asks why we need dual spaces when we have inner products — explain that inner products identify V with V*, but the identification depends on the metric; dual spaces exist independently

**Spaced repetition / revision guidance**

Review: linear maps, vector space axioms, bases and coordinates, matrix-vector multiplication. Understanding the dual space requires comfort with functions-as-vectors, which is the key conceptual leap.

---

### Distance in Vector Spaces

*Concept ID: `math.linalg.distance` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 1h*

**Learning objective.** Compute the Euclidean distance between two vectors as d(u,v) = ‖u−v‖ and verify the three metric axioms: non-negativity, symmetry, and the triangle inequality.

d(u,v) = |u−v|. Euclidean distance in ℝⁿ. The norm induces a metric satisfying non-negativity, symmetry, and triangle inequality.

The Euclidean distance between vectors u and v in ℝⁿ is d(u,v) = ‖u−v‖ = √(Σᵢ(uᵢ−vᵢ)²). This is the length of the displacement vector u−v. It satisfies the three metric axioms: (1) d(u,v) ≥ 0 with d(u,v) = 0 iff u = v; (2) d(u,v) = d(v,u) (symmetry); (3) d(u,w) ≤ d(u,v) + d(v,w) (triangle inequality). These axioms make (ℝⁿ, d) a metric space. The norm induces the metric: d(u,v) = ‖u−v‖. More generally, any norm induces a metric, giving rise to different geometries (taxicab, Chebyshev, Minkowski distances).

**Key ideas**

- d(u,v) = ‖u−v‖ = √(Σᵢ(uᵢ−vᵢ)²); distance is the norm of the difference
- Metric axioms: non-negativity, symmetry d(u,v)=d(v,u), and triangle inequality d(u,w) ≤ d(u,v)+d(v,w)
- The triangle inequality follows from the Cauchy-Schwarz inequality applied to the norm
- Any norm ‖·‖ induces a metric d(u,v) = ‖u−v‖; different norms give different metrics on ℝⁿ
- d(u,v) = 0 iff u = v (non-degeneracy): the distance between two distinct points is always positive
- Parallelogram law: ‖u+v‖² + ‖u−v‖² = 2(‖u‖²+‖v‖²) relates distances and norms

**Vocabulary**

- **Euclidean distance** — d(u,v) = ‖u−v‖ = √(Σᵢ(uᵢ−vᵢ)²); the standard notion of distance in ℝⁿ.
- **Metric** — A function d: V×V → ℝ satisfying non-negativity, symmetry, and the triangle inequality.
- **Metric space** — A set together with a metric; (ℝⁿ, d_Euclidean) is the canonical example.
- **Triangle inequality** — d(u,w) ≤ d(u,v) + d(v,w); the path through an intermediate point is at least as long as the direct path.

**Common misconceptions**

- *Misconception:* Distance is just ‖u‖ − ‖v‖ (difference of norms)
  *Correction:* Distance is ‖u−v‖ (norm of the difference), not the difference of norms. |‖u‖−‖v‖| ≤ ‖u−v‖ (reverse triangle inequality), so the difference of norms underestimates the true distance.
- *Misconception:* The triangle inequality says d(u,w) = d(u,v) + d(v,w)
  *Correction:* The triangle inequality is an upper bound: d(u,w) ≤ d(u,v) + d(v,w). Equality holds only when v lies on the straight-line segment between u and w.

**Common mistakes in practice**

- Computing ‖u‖−‖v‖ instead of ‖u−v‖
- Confusing the triangle inequality (upper bound) with an equality
- Forgetting to take the square root when computing ‖u−v‖ (reporting squared distance instead)

**Visual teaching opportunities**

- Draw the triangle u, v, w in ℝ²: the three sides have lengths d(u,v), d(v,w), d(u,w); the triangle inequality says any side is shorter than the sum of the other two — hence 'triangle inequality'
- Plot the unit 'ball' {v: d(0,v) ≤ 1} for the Euclidean norm (a circle/sphere) and compare with the taxicab norm (a square diamond) and Chebyshev norm (a square) to show different metric geometries

**Worked example**

*Setup:* Compute d(u,v) for u = (1,2,3) and v = (4,6,3). Verify the three metric axioms and check the triangle inequality using the origin w = (0,0,0).

1. Step 1: Compute u−v. u−v = (1−4,2−6,3−3) = (−3,−4,0). Why: distance is the norm of the displacement.
2. Step 2: Compute d(u,v) = ‖u−v‖. ‖(−3,−4,0)‖ = √(9+16+0) = √25 = 5. So d(u,v) = 5.
3. Step 3: Non-negativity. d(u,v) = 5 > 0 since u ≠ v ✓. If u = v then u−v = 0, so d = 0 ✓.
4. Step 4: Symmetry. v−u = (3,4,0), ‖v−u‖ = √(9+16+0) = 5 = d(u,v) ✓. Why: ‖u−v‖ = ‖−(v−u)‖ = ‖v−u‖.
5. Step 5: Triangle inequality. Let w = (0,0,0). d(u,w) = ‖u‖ = √(1+4+9) = √14 ≈ 3.74. d(w,v) = ‖v‖ = √(16+36+9) = √61 ≈ 7.81. d(u,v) = 5 ≤ 3.74 + 7.81 = 11.55 ✓.
6. Step 6: Interpretation. The three points form a triangle with sides 5, ≈3.74, ≈7.81; the triangle inequality is satisfied with strict inequality since u, v, w are not collinear ✓.

*Outcome:* d(u,v) = 5; non-negativity ✓; symmetry ✓; triangle inequality 5 ≤ 11.55 ✓.

**Real-world intuition**

- Machine learning: k-nearest neighbour classification uses Euclidean distance to find the closest training points to a new query
- Computer graphics: distance from a point to a plane determines on which side of a clipping plane a vertex lies
- Robotics: workspace distance metrics guide motion planning algorithms (RRT, A*) to find collision-free paths
- Signal processing: mean squared error ‖signal − approximation‖² is a squared distance in function space

**Practice progression**

Item types: Compute Euclidean distance between two vectors in ℝ² and ℝ³, Verify the triangle inequality for three given points, Find all points at distance 1 from a given centre (describe geometrically), Compare Euclidean distance with taxicab distance ‖u−v‖₁ for the same pair of points, Use the reverse triangle inequality |‖u‖−‖v‖| ≤ ‖u−v‖ to bound a distance. Suggested item count: 6.

Simple ℝ² distance → ℝ³ → verify axioms → compare different norms → use triangle inequality to prove a bound

**Assessment objectives**

Formats: Compute d(u,v) for given vectors and verify all three metric axioms, Short-answer: when does equality hold in the triangle inequality?, Identify which of the three metric axioms a given 'distance' function violates. Bloom alignment: apply.

Mastery signal: Student correctly computes Euclidean distance in ℝⁿ, states all three metric axioms from memory, and verifies the triangle inequality with a specific numerical example and an explanation of when equality holds.

**Teacher notes**

The triangle inequality is the hardest axiom to prove from the norm definition; it follows from the Cauchy-Schwarz inequality. Proving it rigorously is a good exercise that ties together inner products, norms, and metrics in one argument.

**Student notes**

Remember: distance = norm of difference. Compute u−v first, then take its norm. Do not subtract the norms: ‖u‖−‖v‖ ≠ d(u,v) in general.

**Prerequisite graph**

- Requires: math.linalg.norm
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.real.metric-space
- Narrative: Distance connects the norm (source of the metric), inner products (Cauchy-Schwarz proves the triangle inequality), orthogonality (d achieves its minimum when u−v ⊥ some subspace), and metric spaces (the abstract generalisation studied in real analysis and topology).

**Teaching hints — review triggers**

- Student confuses ‖u−v‖ with ‖u‖−‖v‖ — review norm definition and the reverse triangle inequality
- Student cannot square-root a sum of squares correctly — review the Pythagorean theorem in n dimensions

**Spaced repetition / revision guidance**

Review: vector subtraction, norm computation (square root of sum of squares), and the Cauchy-Schwarz inequality. Distance is an immediate application of the norm, requiring no new machinery.

---

### Angle Between Vectors

*Concept ID: `math.linalg.angle-vectors` · Difficulty: proficient · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 1h*

**Learning objective.** Compute the angle between two vectors using cos θ = (a·b)/(‖a‖‖b‖) and apply the result to test orthogonality (θ = π/2 iff a·b = 0).

cos θ = (a·b)/(|a||b|). θ=π/2 iff a⊥b. Cauchy-Schwarz inequality guarantees this value is in [−1,1], ensuring θ is well-defined.

The angle θ ∈ [0, π] between nonzero vectors a and b in ℝⁿ is defined by cos θ = (a·b)/(‖a‖‖b‖). The Cauchy-Schwarz inequality |a·b| ≤ ‖a‖‖b‖ guarantees that this ratio lies in [−1, 1], so θ is well-defined. θ = 0 iff a and b point in the same direction; θ = π iff they are antiparallel; θ = π/2 iff a·b = 0 (orthogonality). The formula generalises the geometric dot product a·b = ‖a‖‖b‖ cos θ from ℝ² and ℝ³ to any inner-product space. For complex vectors, use the conjugate: cos θ = Re(⟨a,b⟩)/(‖a‖‖b‖).

**Key ideas**

- cos θ = (a·b)/(‖a‖‖b‖) for θ ∈ [0,π]; well-defined by Cauchy-Schwarz
- θ = π/2 (right angle) iff a·b = 0; this is the definition of orthogonality
- θ = 0 iff a = λb with λ > 0 (parallel); θ = π iff a = λb with λ < 0 (antiparallel)
- Cauchy-Schwarz: |a·b| ≤ ‖a‖‖b‖ with equality iff a and b are linearly dependent
- The formula works in any inner-product space, not just ℝⁿ — e.g., angle between functions in L²
- Cosine similarity = cos θ = (a·b)/(‖a‖‖b‖) is used in information retrieval as a normalised similarity measure

**Vocabulary**

- **Angle between vectors** — The unique θ ∈ [0,π] satisfying cos θ = (a·b)/(‖a‖‖b‖) for nonzero a, b.
- **Cosine similarity** — The value cos θ = (a·b)/(‖a‖‖b‖) used as a normalised measure of similarity between two vectors; ranges from −1 (opposite) to 1 (identical direction).
- **Cauchy-Schwarz inequality** — |a·b| ≤ ‖a‖‖b‖ with equality iff a and b are linearly dependent; guarantees the angle formula gives a value in [−1,1].
- **Acute / right / obtuse** — θ < π/2 (cos θ > 0), θ = π/2 (cos θ = 0, orthogonal), or θ > π/2 (cos θ < 0), respectively.

**Common misconceptions**

- *Misconception:* The angle formula gives a value outside [0, π] for some vectors
  *Correction:* Cauchy-Schwarz guarantees |(a·b)/(‖a‖‖b‖)| ≤ 1, so the argument to arccos always lies in [−1,1], giving a unique θ ∈ [0,π]. Values outside this range are impossible for real vectors.
- *Misconception:* Vectors can form an angle greater than 180°
  *Correction:* By convention, the angle between two vectors is the smaller of the two angles formed, so θ ∈ [0,π]. If the dot product is negative, θ ∈ (π/2, π] — the vectors point in roughly opposite directions, but the angle is still at most π.

**Common mistakes in practice**

- Using degrees instead of radians when applying arccos (many calculators give degrees; ensure correct units for further calculations)
- Forgetting to divide by both norms (computing a·b/‖a‖ instead of a·b/(‖a‖‖b‖))
- Concluding that a negative dot product means the vectors are orthogonal (negative dot product means obtuse angle, not right angle)

**Visual teaching opportunities**

- Draw a, b in ℝ², mark the angle θ between them, and show the geometric interpretation of the dot product as ‖a‖‖b‖ cos θ — the product of lengths times the cosine of the angle
- Number line for cos θ: −1 (antiparallel) → 0 (orthogonal) → 1 (parallel); plot several example pairs and their cosines to build intuition

**Worked example**

*Setup:* Find the angle between u = (1,2,2) and v = (3,4,0). Then check that p = (2,−1,0) and q = (1,2,0) are orthogonal.

1. Step 1: Compute the dot product. u·v = 1·3+2·4+2·0 = 3+8+0 = 11. Why: the numerator of the angle formula.
2. Step 2: Compute the norms. ‖u‖ = √(1+4+4) = √9 = 3. ‖v‖ = √(9+16+0) = √25 = 5. Why: the denominator of the angle formula.
3. Step 3: Compute cos θ. cos θ = 11/(3·5) = 11/15 ≈ 0.7333. Why: angle formula.
4. Step 4: Find θ. θ = arccos(11/15) ≈ 42.8°. The vectors are acute (cos θ > 0, so θ < 90°).
5. Step 5: Check Cauchy-Schwarz. |u·v| = 11 ≤ ‖u‖‖v‖ = 15 ✓. Equality does not hold (u and v are not parallel) ✓.
6. Step 6: Orthogonality of p and q. p·q = 2·1+(−1)·2+0·0 = 2−2+0 = 0. So p⊥q and θ = π/2 ✓.

*Outcome:* cos θ = 11/15, θ ≈ 42.8° for u and v ✓; Cauchy-Schwarz satisfied ✓; p·q = 0 confirms orthogonality ✓.

**Real-world intuition**

- Information retrieval: cosine similarity between a query vector and document vectors measures relevance regardless of document length — the standard similarity measure in TF-IDF and word2vec
- Computer graphics: the dot product n̂·l̂ (surface normal with light direction) gives cos θ, which drives the Lambertian diffuse lighting model (brightness = max(0, n̂·l̂))
- Navigation: the angle between the velocity vector and the wind vector determines the component of wind resistance opposing motion
- Quantum mechanics: the probability amplitude ⟨ψ|φ⟩ is related to the cosine of the 'angle' between quantum states in Hilbert space

**Practice progression**

Item types: Compute the angle between two vectors in ℝ² and ℝ³, Determine whether two given vectors are acute (θ < 90°), right (θ = 90°), or obtuse (θ > 90°), Find a vector orthogonal to a given vector in ℝ², Use cosine similarity to rank three candidate vectors by similarity to a query vector, Verify Cauchy-Schwarz: compute |a·b| and ‖a‖‖b‖ and confirm the inequality. Suggested item count: 6.

Simple ℝ² angle → ℝ³ → classify acute/right/obtuse → find orthogonal vector → cosine similarity application → Cauchy-Schwarz verification with equality case

**Assessment objectives**

Formats: Compute the angle between two given vectors and classify as acute, right, or obtuse, Determine whether two vectors are orthogonal and justify using the dot product, Short-answer: why does the Cauchy-Schwarz inequality guarantee the angle formula is well-defined?. Bloom alignment: apply.

Mastery signal: Student correctly computes a·b, ‖a‖, ‖b‖, evaluates the angle formula, interprets the result as acute/right/obtuse, and correctly identifies orthogonality from a zero dot product.

**Teacher notes**

Emphasise that the angle formula is the definition in ℝⁿ for n > 3 (where geometric angles are not directly observable), not a theorem derived from geometry. The Cauchy-Schwarz inequality is what makes this a definition rather than a circular statement.

**Student notes**

The dot product formula a·b = ‖a‖‖b‖ cos θ can be read two ways: (1) given coordinates, compute the dot product and then find the angle; or (2) if you already know the angle geometrically, the formula gives the dot product. In practice you almost always go direction (1).

**Prerequisite graph**

- Requires: math.linalg.dot-product, math.linalg.norm
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The angle formula ties together the dot product (the inner product defining the angle), norms (the denominators), orthogonality (the special case θ=π/2), the Cauchy-Schwarz inequality (the proof of well-definedness), and cosine similarity (the machine learning application). It generalises to any inner-product space via cos θ = Re⟨a,b⟩/(‖a‖‖b‖).

**Teaching hints — review triggers**

- Student cannot compute the dot product correctly — review a·b = Σᵢaᵢbᵢ
- Student does not know the norm formula — review ‖a‖ = √(a·a)
- Student confuses cos θ and the angle θ — review the inverse cosine function and its range [0,π]

**Spaced repetition / revision guidance**

Review: dot product computation, norm computation, the Cauchy-Schwarz inequality, and the inverse cosine function. The angle formula is the geometric capstone that unifies the dot product and norm.

---

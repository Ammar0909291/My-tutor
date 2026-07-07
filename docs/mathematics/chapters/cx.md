# Complex Numbers & Complex Analysis (math.cx)

**Domain:** `math.cx` | **Concepts:** 31 | **Status:** draft | **KG Version:** 1.0.1

---

## Table of Contents

1. [Complex Numbers & Analysis Foundations](#1-complex-numbers--analysis-foundations)
   - [Complex Numbers Analysis](#11-complex-numbers-analysis-mathcxcomplex-numbers-analysis)
   - [Complex Functions](#12-complex-functions-mathcxcomplex-function)
   - [Cauchy-Riemann Equations](#13-cauchy-riemann-equations-mathcxcauchy-riemann)
   - [Analytic Functions](#14-analytic-functions-mathcxanalytic-functions)
   - [Harmonic Functions](#15-harmonic-functions-mathcxharmonic-functions)
2. [Series and Integration](#2-series-and-integration)
   - [Power Series in ℂ](#21-power-series-in--mathcxpower-series-cx)
   - [Complex Integration](#22-complex-integration-mathcxcomplex-integration)
   - [Cauchy's Theorem](#23-cauchys-theorem-mathcxcauchy-theorem)
   - [Cauchy-Goursat Theorem](#24-cauchy-goursat-theorem-mathcxcauchy-goursat)
3. [Cauchy's Integral Formula and Consequences](#3-cauchys-integral-formula-and-consequences)
   - [Cauchy's Integral Formula](#31-cauchys-integral-formula-mathcxcauchy-integral-formula)
   - [Higher-Order Derivatives](#32-higher-order-derivatives-mathcxhigher-derivatives)
   - [Morera's Theorem](#33-moreras-theorem-mathcxmorera-theorem)
   - [Liouville's Theorem](#34-liouvilles-theorem-mathcxliouville-theorem)
   - [Fundamental Theorem of Algebra (Complex)](#35-fundamental-theorem-of-algebra-complex-mathcxfundamental-theorem-algebra)
4. [Identity and Continuation](#4-identity-and-continuation)
   - [Identity Theorem](#41-identity-theorem-mathcxidentity-theorem)
   - [Analytic Continuation](#42-analytic-continuation-mathcxanalytic-continuation)
5. [Singularity Theory](#5-singularity-theory)
   - [Singularities](#51-singularities-mathcxsingularities)
   - [Poles](#52-poles-mathcxpoles)
   - [Essential Singularities](#53-essential-singularities-mathcxessential-singularity)
   - [Laurent Series](#54-laurent-series-mathcxlaurent-series)
6. [Residue Theory and Applications](#6-residue-theory-and-applications)
   - [Residues](#61-residues-mathcxresidue)
   - [Residue Theorem](#62-residue-theorem-mathcxresidue-theorem)
   - [Real Integrals via Residues](#63-real-integrals-via-residues-mathcxreal-integral-residues)
   - [Maximum Modulus Principle](#64-maximum-modulus-principle-mathcxmaximum-modulus)
7. [Geometric Theory](#7-geometric-theory)
   - [Conformal Mappings](#71-conformal-mappings-mathcxconformal-mapping)
   - [Möbius Transformations](#72-möbius-transformations-mathcxmobius-transformation)
   - [Riemann Mapping Theorem](#73-riemann-mapping-theorem-mathcxriemann-mapping)
   - [Argument Principle](#74-argument-principle-mathcxargument-principle)
   - [Rouché's Theorem](#75-rouchés-theorem-mathcxrouche-theorem)
8. [Advanced Topics](#8-advanced-topics)
   - [Riemann Surfaces](#81-riemann-surfaces-mathcxriemann-surface)
   - [Riemann Zeta Function](#82-riemann-zeta-function-mathcxriemann-zeta)

---

## 1. Complex Numbers & Analysis Foundations

### 1.1 Complex Numbers Analysis (`math.cx.complex-numbers-analysis`)

| Field | Value |
|-------|-------|
| **Difficulty** | advanced |
| **Prerequisites** | math.found.complex-numbers, math.trig.polar-form-complex |
| **Cross-links** | — |

**Learning Objective:** Represent complex numbers in Cartesian and polar forms, perform arithmetic, and interpret them geometrically on the complex plane.

**Concept Summary:**  
The complex number z = a + bi has real part Re(z)=a and imaginary part Im(z)=b. Polar form z = r·e^{iθ} (r = |z|, θ = arg(z)) connects algebra to geometry via Euler's formula e^{iθ} = cos θ + i sin θ. Complex arithmetic extends real arithmetic: addition is component-wise; multiplication rotates and scales; the conjugate z̄ = a − bi gives |z|² = zz̄.

**Key Ideas:**
1. Polar form encodes both magnitude and direction: multiplication corresponds to rotation and scaling — a geometric interpretation that is invisible in Cartesian form.
2. The complex plane (Argand diagram) makes complex arithmetic visible: addition is vector addition, multiplication is rotation + scaling.
3. The modulus satisfies |z₁z₂| = |z₁||z₂| and the triangle inequality |z₁+z₂| ≤ |z₁|+|z₂|.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| i is "imaginary" and has no real meaning | i is a rotation operator: multiplying by i rotates a vector by 90°. It is as geometrically concrete as multiplying by −1 (180° rotation). |
| arg(z) is unique | arg(z) is multi-valued (defined up to multiples of 2π). The principal argument Arg(z) is chosen in (−π, π] as a convention. |

**Worked Example:**  
*Find the polar form of z = 1 + i√3 and compute z³.*  
1. |z| = √(1² + (√3)²) = 2, arg(z) = arctan(√3/1) = π/3.  
2. Polar form: z = 2e^{iπ/3}.  
3. z³ = 2³ e^{i·3π/3} = 8e^{iπ} = 8(cos π + i sin π) = −8.

**Real-World Applications:**
- Electrical engineering: AC circuits use complex impedance Z = R + iX; magnitude |Z| gives impedance modulus and arg(Z) gives phase shift.
- Signal processing: the Fourier transform of real signals produces complex coefficients representing amplitude and phase of each frequency component.

---

### 1.2 Complex Functions (`math.cx.complex-function`)

| Field | Value |
|-------|-------|
| **Difficulty** | advanced |
| **Prerequisites** | math.cx.complex-numbers-analysis, math.func.function-concept |
| **Cross-links** | — |

**Learning Objective:** Define complex-valued functions of a complex variable, understand limits and continuity in ℂ, and visualize functions using domain coloring.

**Concept Summary:**  
A complex function f: U ⊆ ℂ → ℂ maps complex numbers to complex numbers. Writing f(z) = u(x,y) + iv(x,y) (z=x+iy) separates real and imaginary parts. Limits and continuity carry over from ℝ² since ℂ ≅ ℝ² as a metric space, but the requirement that limits are the same from any direction will turn out to be the key constraint for complex differentiability.

**Key Ideas:**
1. The limit lim_{z→z₀} f(z) must be the same regardless of the direction of approach — a much stronger requirement than in ℝ (where only left/right limits matter).
2. Domain coloring maps f: ℂ → ℂ to colors (hue = arg(f), brightness = |f|), giving a visual 2D portrait of a 4D function.
3. Polynomials, rational functions, exponential e^z, trigonometric sin(z), cos(z), and log(z) (multi-valued) are fundamental examples.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Complex functions can be graphed like real functions | f: ℂ → ℂ needs 4 real dimensions to graph. Domain coloring encodes the output in color instead, giving a 2D visual representation. |
| lim_{z→z₀} f(z) exists if limits along horizontal and vertical paths agree | The limit must agree along ALL paths — infinitely many. Two matching directions are insufficient. |

**Worked Example:**  
*Show lim_{z→0} (z̄/z) does not exist.*  
1. Along the real axis (z=x→0): z̄/z = x/x = 1.  
2. Along the imaginary axis (z=iy→0): z̄/z = −iy/(iy) = −1.  
3. Two different limits → the overall limit does not exist.

**Real-World Applications:**
- Fluid dynamics: complex velocity potential Φ(z) = φ + iψ encodes both velocity potential and streamfunction in one complex function.
- Quantum mechanics: wave functions in 2D take complex values; complex function theory governs their behavior.

---

### 1.3 Cauchy-Riemann Equations (`math.cx.cauchy-riemann`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.complex-function, math.calc.partial-derivatives |
| **Cross-links** | — |

**Learning Objective:** Derive and apply the Cauchy-Riemann equations as the necessary and sufficient conditions for complex differentiability.

**Concept Summary:**  
A function f(z) = u(x,y) + iv(x,y) is complex-differentiable at z₀ = x₀ + iy₀ if and only if (a) the partial derivatives u_x, u_y, v_x, v_y exist and are continuous near z₀, and (b) the Cauchy-Riemann equations hold: u_x = v_y and u_y = −v_x. When they hold, f'(z₀) = u_x + iv_x = v_y − iu_y.

**Key Ideas:**
1. The CR equations arise from requiring the limit f'(z₀) = lim (f(z)−f(z₀))/(z−z₀) to be the same whether we approach z₀ along the real axis (giving u_x + iv_x) or imaginary axis (giving v_y − iu_y) — equating these gives u_x = v_y and u_y = −v_x.
2. CR equations mean the Jacobian of (u,v) as a function of (x,y) is a conformal matrix (rotation + scaling) — this is why analytic functions are angle-preserving.
3. Polar form of CR equations: (∂u/∂r) = (1/r)(∂v/∂θ) and (1/r)(∂u/∂θ) = −(∂v/∂r).

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| If CR equations hold, f is automatically analytic | CR equations are necessary and, combined with continuity of partial derivatives, sufficient. The continuity condition cannot be dropped (there exist pathological counterexamples). |
| f̄(z) = ū(x,y) − iv(x,y) satisfies CR equations | Compute: ∂ū/∂x = u_x but ∂(−v)/∂y = −v_y = −u_x. So ∂ū/∂x ≠ ∂(−v̄)/∂y unless both are 0. z̄ is NOT complex-differentiable anywhere. |

**Worked Example:**  
*Verify that f(z) = e^z satisfies the CR equations.*  
1. Write e^z = e^{x+iy} = e^x cos y + ie^x sin y. So u = e^x cos y, v = e^x sin y.  
2. u_x = e^x cos y, v_y = e^x cos y. ✓ (u_x = v_y)  
3. u_y = −e^x sin y, v_x = e^x sin y. Then u_y = −v_x. ✓  
4. f'(z) = u_x + iv_x = e^x cos y + ie^x sin y = e^z. ✓

**Real-World Applications:**
- Electrostatics: if u is the electric potential, the CR equations force v to be the stream function; equipotentials and field lines are orthogonal families.
- Heat flow: steady-state temperature distributions in 2D satisfy Laplace's equation if and only if u+iv satisfies CR — enabling complex-variable heat flow analysis.

---

### 1.4 Analytic Functions (`math.cx.analytic-functions`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.cauchy-riemann |
| **Cross-links** | — |

**Learning Objective:** Define analytic (holomorphic) functions, identify standard examples, and state the equivalence between analyticity and possessing a convergent power series locally.

**Concept Summary:**  
A function f is analytic (holomorphic) at z₀ if it is complex-differentiable in some neighborhood of z₀. Analyticity is far stronger than real differentiability: analytic functions are infinitely differentiable, equal their Taylor series locally, and satisfy the maximum modulus principle, the identity theorem, and many other rigidity properties completely absent in real analysis.

**Key Ideas:**
1. Analytic ⟺ has a convergent power series locally: f(z) = Σ aₙ(z−z₀)^n in some disk |z−z₀| < r. This makes analytic functions extremely rigid.
2. Standard analytic functions: polynomials, e^z (entire), sin z, cos z (entire), log z (analytic on ℂ minus a branch cut), 1/z (analytic except at 0).
3. Non-analytic examples: |z|, Re(z), Im(z), z̄ — none are complex-differentiable even at a single point (except at isolated points for |z|²=zz̄).

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| A function real-differentiable on ℂ≅ℝ² is complex-differentiable | Real differentiability (as a map ℝ²→ℝ²) requires only 4 real partial derivatives. Complex differentiability additionally requires the CR equations — a strong constraint on those 4 partials. |
| Re(f) and Im(f) can be chosen independently | For an analytic f, Re(f) determines Im(f) up to a constant (and vice versa) via the CR equations. They are not independent. |

**Worked Example:**  
*Determine where f(z) = |z|² is analytic.*  
1. f(z) = x²+y², so u = x²+y², v = 0.  
2. CR: u_x = 2x = v_y = 0 ⟹ x = 0; u_y = 2y = −v_x = 0 ⟹ y = 0.  
3. CR holds only at z = 0. So f is complex-differentiable only at z=0 and is not analytic anywhere (not differentiable in any neighborhood of any point).

**Real-World Applications:**
- Conformal mapping in engineering: analytic functions are precisely the conformal maps, used to transform boundary value problems to standard forms.
- Control theory: transfer functions of stable LTI systems are analytic in the right half-plane — a key structural constraint.

---

### 1.5 Harmonic Functions (`math.cx.harmonic-functions`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.cauchy-riemann, math.de.laplace-equation |
| **Cross-links** | — |

**Learning Objective:** Prove that the real and imaginary parts of an analytic function are harmonic, and construct harmonic conjugates.

**Concept Summary:**  
A function u: ℝ² → ℝ is harmonic if Δu = u_{xx} + u_{yy} = 0. If f = u+iv is analytic, then both u and v are harmonic (proved by differentiating CR equations and using equality of mixed partials). Conversely, any harmonic u on a simply connected domain has a harmonic conjugate v such that u+iv is analytic.

**Key Ideas:**
1. Proof that u is harmonic: differentiate u_x = v_y w.r.t. x and u_y = −v_x w.r.t. y; adding gives u_{xx} + u_{yy} = v_{yx} − v_{xy} = 0 (equality of mixed partials).
2. Finding harmonic conjugate v from u: integrate v_x = −u_y and v_y = u_x — consistency is guaranteed on simply connected domains.
3. Maximum principle for harmonic functions: a non-constant harmonic function on a bounded domain attains its maximum on the boundary (follows from the maximum modulus principle for analytic functions).

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Every harmonic function is the real part of an analytic function | On simply connected domains, yes. On multiply connected domains (like an annulus), a harmonic function may not have a global harmonic conjugate (e.g., u=log|z|). |
| Harmonic means zero derivative | Harmonic means Δu = 0, not ∇u = 0. A harmonic function can be non-constant and have nonzero gradient. |

**Worked Example:**  
*Verify u = x³ − 3xy² is harmonic and find its harmonic conjugate.*  
1. u_x = 3x²−3y², u_{xx} = 6x. u_y = −6xy, u_{yy} = −6x. Sum: 6x−6x = 0. ✓  
2. v_y = u_x = 3x²−3y² ⟹ v = 3x²y − y³ + g(x). v_x = 6xy + g'(x) = −u_y = 6xy ⟹ g'(x)=0, g = C.  
3. Conjugate: v = 3x²y − y³ + C. Check: f = u+iv = (x³−3xy²) + i(3x²y−y³) = (x+iy)³ = z³. ✓

**Real-World Applications:**
- Steady-state heat conduction: temperature distributions in 2D satisfy Laplace's equation — harmonic function theory gives exact solutions via conformal mapping.
- Groundwater flow: hydraulic head satisfies Laplace's equation; complex potential (harmonic u + conjugate v) describes streamlines and equipotentials simultaneously.

---

## 2. Series and Integration

### 2.1 Power Series in ℂ (`math.cx.power-series-cx`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.analytic-functions, math.calc.power-series |
| **Cross-links** | — |

**Learning Objective:** Define power series in the complex plane, determine their radius of convergence, and state the equivalence of analyticity and local power series representation.

**Concept Summary:**  
A complex power series Σ aₙ(z−z₀)^n converges absolutely in a disk |z−z₀| < R (the radius of convergence, given by 1/R = lim sup |aₙ|^{1/n}) and diverges for |z−z₀| > R. Inside the disk, the series represents an analytic function; the disk is the largest one centered at z₀ in which f is analytic.

**Key Ideas:**
1. The Cauchy-Hadamard formula 1/R = lim sup |aₙ|^{1/n} gives the exact radius of convergence. On the boundary circle |z−z₀| = R, convergence depends on the specific series.
2. Term-by-term differentiation and integration are valid inside the disk: (Σ aₙ(z−z₀)^n)' = Σ n·aₙ(z−z₀)^{n-1}.
3. Key Taylor series: e^z = Σ z^n/n!, sin z = Σ (−1)^n z^{2n+1}/(2n+1)!, cos z = Σ (−1)^n z^{2n}/(2n)!, log(1+z) = Σ (−1)^{n+1} z^n/n (for |z|<1) — all with infinite radius except log(1+z).

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| The radius of convergence equals the distance to the nearest zero of the function | It equals the distance to the nearest singularity (pole, essential singularity, or branch point), not zero. A function without zeros can still have a finite radius of convergence. |
| A series diverging at |z|=R means it diverges at every point on the circle | Behavior on the boundary circle |z−z₀|=R must be checked point by point — some series converge at some boundary points, diverge at others. |

**Worked Example:**  
*Find the Taylor series of f(z) = 1/(1−z) centered at z=0 and its radius of convergence.*  
1. f(z) = Σ_{n=0}^∞ z^n (geometric series), valid for |z| < 1.  
2. The singularity of 1/(1−z) is at z=1, distance 1 from z=0, so R=1.  
3. Verify by Cauchy-Hadamard: aₙ = 1 for all n, lim sup|aₙ|^{1/n} = 1, so R = 1/1 = 1. ✓

**Real-World Applications:**
- Numerical analysis: truncated power series give polynomial approximations to analytic functions with guaranteed accuracy inside the disk of convergence.
- Control systems: z-transform (discrete-time analogue) uses power series in the complex z-variable to analyze stability and frequency response.

---

### 2.2 Complex Integration (`math.cx.complex-integration`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.analytic-functions, math.calc.line-integrals |
| **Cross-links** | — |

**Learning Objective:** Define and compute contour integrals of complex functions, estimate their magnitude using the ML inequality, and interpret them geometrically.

**Concept Summary:**  
For a piecewise smooth path γ: [a,b] → ℂ and continuous f on γ, the contour integral ∫_γ f(z) dz = ∫_a^b f(γ(t)) γ'(t) dt. The ML inequality bounds |∫_γ f dz| ≤ M·L where M = max|f| on γ and L = length(γ). This integral is the foundation of all of complex analysis.

**Key Ideas:**
1. The contour integral reduces to a real line integral via parametrization; the orientation matters (reversing γ negates the integral).
2. ML inequality: the absolute value of a contour integral is at most (max of |f|) × (length of path). Essential for estimating contributions of arcs in residue computations.
3. For an analytic function with antiderivative F on a domain, ∫_γ f dz = F(γ(b)) − F(γ(a)) — path independence, analogous to the Fundamental Theorem of Calculus.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| ∫_γ f(z) dz = ∫|γ| f(x)dx (real integral) | The contour integral involves both the function values and the direction of traversal: ∫_γ f dz = ∫ f(γ(t))γ'(t) dt includes the derivative γ'(t) encoding both speed and direction. |
| Path independence always holds for complex integrals | Path independence holds only when f is analytic (no singularities in the enclosed region) — a special property of analytic functions, not all complex functions. |

**Worked Example:**  
*Compute ∫_γ z̄ dz where γ is the line segment from 0 to 1+i.*  
1. Parametrize: γ(t) = t(1+i) for t ∈ [0,1]. γ'(t) = 1+i.  
2. z̄(γ(t)) = t(1−i).  
3. ∫_γ z̄ dz = ∫_0^1 t(1−i)(1+i) dt = ∫_0^1 t·2 dt = [t²]_0^1 = 1.

**Real-World Applications:**
- Electromagnetic theory: work done by a complex electromagnetic field along a path is a contour integral; complex form unifies electric and magnetic contributions.
- Probability theory: characteristic functions (Fourier transforms of probability distributions) are computed as contour integrals in the complex plane.

---

### 2.3 Cauchy's Theorem (`math.cx.cauchy-theorem`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.complex-integration |
| **Cross-links** | — |

**Learning Objective:** State Cauchy's theorem, prove it using Green's theorem, and apply it to show path independence for analytic functions.

**Concept Summary:**  
Cauchy's Theorem (classical form): if f is analytic on and inside a simple closed curve C with f' continuous, then ∮_C f(z) dz = 0. Proof via Green's theorem: ∮_C (u+iv)(dx+idy) = ∮_C (udx−vdy) + i∮_C (vdx+udy); applying Green's theorem to each gives (v_x−u_y) integrated over the interior — which vanishes by the CR equations.

**Key Ideas:**
1. Cauchy's theorem is equivalent to path independence: f analytic on U (simply connected) ⟺ ∫_γ₁ f dz = ∫_γ₂ f dz for all paths γ₁,γ₂ with the same endpoints in U.
2. Antiderivative existence: on a simply connected domain where ∮_C f = 0 for all closed C, the function F(z) = ∫_{z₀}^z f(w) dw is well-defined and F' = f.
3. The theorem fails if the domain has holes: ∮_{|z|=1} 1/z dz = 2πi ≠ 0 because f=1/z is not analytic inside |z|=1 (singularity at 0).

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Cauchy's theorem requires the domain to be convex | The domain must be simply connected (no holes), but convexity is not required. Star-shaped or any simply connected region works. |
| ∮_C f dz = 0 means f has no zeros inside C | Zero integral means f has no singularities (or more precisely, the singularities' contributions cancel). Zeros of f are irrelevant to the integral being zero. |

**Worked Example:**  
*Compute ∮_{|z|=2} sin(z)/z² dz using Cauchy's theorem (if applicable).*  
1. sin(z)/z² has a singularity at z=0 (inside |z|=2), so Cauchy's theorem does NOT apply directly.  
2. Instead, expand sin(z)/z² = (z − z³/6 + ⋯)/z² = z^{-1} − z/6 + ⋯. The function has a simple pole at z=0 with residue 1.  
3. By the Residue Theorem: ∮ sin(z)/z² dz = 2πi · 1 = 2πi.

**Real-World Applications:**
- Complex potential theory: Cauchy's theorem implies that velocity circulation around a closed curve in irrotational flow is zero (when no vortices are inside).
- Waveguide theory: fields in hollow conductors satisfy Maxwell's equations; Cauchy's theorem applied to the field components gives boundary conditions.

---

### 2.4 Cauchy-Goursat Theorem (`math.cx.cauchy-goursat`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.cauchy-theorem |
| **Cross-links** | — |

**Learning Objective:** State and apply the Cauchy-Goursat theorem without assuming derivative continuity, understanding its role as the fundamental path-independence result.

**Concept Summary:**  
The Cauchy-Goursat theorem proves that if f is analytic inside and on a simple closed curve C, then ∮_C f(z)dz = 0, without requiring continuity of f'. It extends Cauchy's theorem to functions whose derivatives need not be continuous.

**Key Ideas:**
1. The theorem removes the additional assumption that f' is continuous, which Cauchy's original proof required, making it more general.
2. The proof uses triangulation: subdivide the region, apply Cauchy's estimate to each triangle, and sum — the interior integrals cancel.
3. Zero circulation is equivalent to path independence: ∫_γ₁ f dz = ∫_γ₂ f dz for any two paths with the same endpoints in a simply connected domain.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Cauchy-Goursat and Cauchy's theorem are the same result | Cauchy's original theorem assumed f' is continuous; Cauchy-Goursat drops this assumption using Goursat's triangle argument, making it strictly stronger. |
| The theorem applies to any closed curve, even ones that wind around holes | The theorem requires f to be analytic on and inside the entire curve — if the domain has holes (missing points), the integral may be nonzero. |

**Worked Example:**  
*Verify that ∮_C z² dz = 0 where C is the unit circle, using Cauchy-Goursat.*  
1. Note that f(z) = z² is analytic everywhere (entire), so it is analytic on and inside the unit circle.  
2. By Cauchy-Goursat, since f is analytic in the simply connected region enclosed by C, ∮_C z² dz = 0.  
3. Verify directly: parameterize z = e^{iθ}, dz = ie^{iθ}dθ, integrate e^{2iθ} · ie^{iθ} over [0,2π] — the integral of e^{3iθ} over a full period is 0. ✓

**Real-World Applications:**
- Circuit analysis: closed-loop integrals of analytic impedance functions are zero, simplifying AC circuit computations.
- Fluid dynamics: path-independent circulation for irrotational flows with no singularities inside the contour.

---

## 3. Cauchy's Integral Formula and Consequences

### 3.1 Cauchy's Integral Formula (`math.cx.cauchy-integral-formula`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.cauchy-theorem |
| **Cross-links** | — |

**Learning Objective:** Use the Cauchy Integral Formula to evaluate contour integrals and recover the value of an analytic function from its boundary values.

**Concept Summary:**  
For f analytic on and inside a simple closed curve C and z₀ inside C: f(z₀) = (1/2πi)∮_C f(z)/(z−z₀) dz. This formula recovers interior values from boundary values — a profound rigidity property unique to analytic functions.

**Key Ideas:**
1. The integrand f(z)/(z−z₀) has a simple pole at z₀; the formula shows the residue at this pole equals f(z₀).
2. The formula implies that an analytic function on a disk is completely determined by its values on the boundary circle.
3. Repeated differentiation gives the generalized CIF: f^(n)(z₀) = (n!/2πi)∮_C f(z)/(z−z₀)^{n+1} dz.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| The formula only gives f(z₀) when z₀ is the center of C | z₀ can be any point inside C, not just the center. The curve C only needs to enclose z₀ once (winding number 1). |
| The formula works even if z₀ is on C | z₀ must be strictly inside C; the formula fails when z₀ is on the curve because the integrand has a non-integrable singularity there. |

**Worked Example:**  
*Evaluate ∮_{|z|=2} e^z/(z−1) dz.*  
1. The integrand has the form f(z)/(z−z₀) with f(z) = e^z analytic everywhere and z₀ = 1 inside |z| = 2.  
2. By the Cauchy Integral Formula: ∮ e^z/(z−1) dz = 2πi · f(1) = 2πi · e.  
3. Result: 2πie.

**Real-World Applications:**
- Signal processing: recovering a bandlimited signal from partial information via integral representations.
- Control theory: computing gain margins via contour integrals of transfer functions around frequency-domain poles.

---

### 3.2 Higher-Order Derivatives (`math.cx.higher-derivatives`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.cauchy-integral-formula |
| **Cross-links** | — |

**Learning Objective:** State the formula for nth derivatives of analytic functions via contour integrals and conclude that analytic functions are infinitely differentiable.

**Concept Summary:**  
From the generalized CIF: f^(n)(z₀) = (n!/2πi)∮_C f(z)/(z−z₀)^{n+1} dz. This shows every analytic function is C^∞ — infinitely differentiable — and each derivative is itself analytic.

**Key Ideas:**
1. Holomorphic ⟺ infinitely differentiable: in complex analysis, one complex derivative implies all higher derivatives exist and are continuous.
2. The formula is derived by differentiating the basic CIF n times under the integral sign.
3. Cauchy's estimate: |f^(n)(z₀)| ≤ n! M / r^n where M = max|f| on |z−z₀|=r.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Real differentiability also implies higher differentiability | In real analysis, once differentiable does not imply twice differentiable. The complex case is fundamentally different. |
| Cauchy's estimate is tight only for polynomials | The estimate is sharp for f(z) = 1/(z−z₀), where derivatives grow exactly as n!/r^n. |

**Worked Example:**  
*Use Cauchy's estimate to bound |f''(0)| for f(z) = e^z on |z|=2.*  
Max|e^z| on |z|=2 is e^2. Cauchy's estimate: |f''(0)| ≤ 2! · e^2 / 2^2 = e^2/2.

**Real-World Applications:**
- Quantum mechanics: analyticity of scattering amplitudes and the consequent infinite differentiability are used in dispersion relations.
- Numerical analysis: analytic functions on a disk have rapidly convergent Taylor series, enabling high-precision polynomial approximations.

---

### 3.3 Morera's Theorem (`math.cx.morera-theorem`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.cauchy-integral-formula |
| **Cross-links** | — |

**Learning Objective:** State and apply Morera's theorem as the converse of Cauchy-Goursat, using it to prove analyticity without computing derivatives directly.

**Concept Summary:**  
Morera's theorem: if f is continuous on an open set U and ∮_C f dz = 0 for every closed triangle C in U, then f is analytic on U. It is the converse to Cauchy-Goursat and gives a practical path to proving analyticity via integration rather than differentiation.

**Key Ideas:**
1. Morera converts integral conditions into analyticity: if all closed-contour integrals vanish, then an antiderivative F exists locally, and F' = f is analytic.
2. The theorem is used in convergence arguments: if a sequence fₙ of analytic functions converges uniformly to f, then ∮_C fₙ → ∮_C f = 0, so f is analytic by Morera.
3. Triangles are sufficient — one does not need to check all closed curves.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Morera requires checking all closed curves, not just triangles | It suffices to verify the integral vanishes on all triangles (or all rectangles) in U. |
| Morera's theorem is a direct strengthening of Cauchy's theorem | Morera is the converse: Cauchy-Goursat says analytic ⟹ integral = 0; Morera says integral = 0 for all triangles ⟹ analytic. |

**Worked Example:**  
*Prove that the uniform limit of analytic functions on an open set is analytic.*  
1. Let fₙ → f uniformly on U, each fₙ analytic. Then f is continuous (uniform limit of continuous functions).  
2. For any triangle T ⊂ U, ∮_T f dz = lim_{n→∞} ∮_T fₙ dz = 0, by uniform convergence and Cauchy-Goursat.  
3. By Morera's theorem, f is analytic on U.

**Real-World Applications:**
- Functional analysis: spaces of analytic functions are closed under uniform limits — Morera underpins this completeness property.
- Approximation theory: uniform polynomial approximations; Morera helps characterize when the limit is analytic.

---

### 3.4 Liouville's Theorem (`math.cx.liouville-theorem`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.higher-derivatives |
| **Cross-links** | — |

**Learning Objective:** State and prove Liouville's theorem and apply it to show entire bounded functions are constant.

**Concept Summary:**  
Liouville's theorem: every bounded entire function is constant. Proof: apply Cauchy's estimate |f'(z₀)| ≤ M/R; since f is entire R can be taken arbitrarily large, forcing |f'(z₀)| = 0 for all z₀. This theorem is the cornerstone for proving the Fundamental Theorem of Algebra.

**Key Ideas:**
1. A bounded entire function cannot oscillate — the global bound on growth forces the derivative to vanish identically via Cauchy's estimate as R → ∞.
2. Liouville distinguishes ℂ from ℝ: sin(z) grows exponentially along the imaginary axis and is not bounded on ℂ.
3. Generalization: if |f(z)| ≤ C|z|^n for large |z|, then f is a polynomial of degree at most n.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| sin(z) as a complex function is bounded | sin(z) = (e^{iz} − e^{-iz})/2i grows exponentially along the imaginary axis: |sin(iy)| = sinh(y) → ∞. Not bounded on ℂ. |
| Liouville only applies to functions bounded by a fixed constant | The theorem generalizes: if |f(z)| ≤ C|z|^n then f is a polynomial of degree ≤ n. |

**Worked Example:**  
*Prove that if f is entire and Im(f(z)) ≥ 0 for all z, then f is constant.*  
Consider g(z) = e^{if(z)}. Then |g| = e^{-Im(f)} ≤ 1, so g is bounded entire, hence constant by Liouville. Then f = −i log g is constant.

**Real-World Applications:**
- Algebraic closure of ℂ: the Fundamental Theorem of Algebra follows directly from Liouville.
- Quantum field theory: growth conditions on scattering amplitudes (Liouville-type bounds) constrain consistent theories.

---

### 3.5 Fundamental Theorem of Algebra (Complex) (`math.cx.fundamental-theorem-algebra`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.liouville-theorem |
| **Cross-links** | math.alg.fundamental-theorem-algebra |

**Learning Objective:** Prove the Fundamental Theorem of Algebra using Liouville's theorem and understand its implications for polynomial factorization over ℂ.

**Concept Summary:**  
Every non-constant polynomial p(z) with complex coefficients has at least one complex root. Proof: if p has no root, 1/p(z) is entire and bounded, hence constant by Liouville — contradiction. Repeated application shows p splits into exactly deg(p) linear factors over ℂ.

**Key Ideas:**
1. Two-step proof: (1) p(z) → ∞ as |z|→∞, (2) inside a large disk |p| is bounded below by a minimum — unless p has a zero.
2. Algebraic consequence: every degree-n polynomial over ℂ factors as c(z−r₁)···(z−rₙ) for n roots (with multiplicity).
3. This fails over ℝ: x²+1 has no real roots. The algebraic closure of ℝ is ℂ.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| FTA guarantees all roots are real | The roots are complex numbers. FTA guarantees complex roots exist, not real ones. |
| A degree-n polynomial has n distinct roots | A degree-n polynomial has n roots counted with multiplicity, but they need not be distinct. |

**Worked Example:**  
*Find all complex roots of z^4 + 4 = 0.*  
z^4 = −4 = 4e^{iπ}. Fourth roots: z = √2·e^{i(π+2kπ)/4} for k=0,1,2,3.  
Roots: 1+i, −1+i, −1−i, 1−i. Factor: (z²−2z+2)(z²+2z+2).

**Real-World Applications:**
- Control systems: every characteristic polynomial has all roots in ℂ, enabling complete stability analysis.
- Signal processing: polynomial spectral factorization relies on FTA for guaranteed factorizability.

---

## 4. Identity and Continuation

### 4.1 Identity Theorem (`math.cx.identity-theorem`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.power-series-cx |
| **Cross-links** | — |

**Learning Objective:** State and apply the Identity Theorem to conclude that two analytic functions agreeing on a set with a limit point are identical everywhere on a connected domain.

**Concept Summary:**  
If f and g are analytic on a connected open set U, and f(zₙ) = g(zₙ) for a sequence zₙ → z₀ ∈ U, then f ≡ g on U. Equivalently, the zero set of a non-trivial analytic function is discrete (no accumulation points in U).

**Key Ideas:**
1. The proof uses power series: vanishing on a sequence accumulating at z₀ forces all Taylor coefficients to be zero, so f = 0 near z₀; connectedness extends this to all of U.
2. A non-zero analytic function can have only isolated zeros.
3. Analytic continuation is well-defined: there is at most one analytic extension of f to a larger domain.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Two analytic functions agreeing at infinitely many points must be identical | They must agree on a sequence with a limit point inside the domain. An unbounded discrete set is insufficient. |
| An analytic function can vanish on an arc without being identically zero | If f vanishes on any arc (a set with accumulation points), the Identity Theorem forces f ≡ 0. |

**Worked Example:**  
*Prove that if f is analytic on ℂ and f(1/n) = 0 for all n ∈ ℕ, then f ≡ 0.*  
{1/n} → 0, with 0 ∈ ℂ. Since f is analytic and vanishes on a sequence accumulating at 0, all Taylor coefficients of f at 0 are zero. Hence f ≡ 0 on ℂ by the Identity Theorem.

**Real-World Applications:**
- Analytic continuation in physics: Green's functions continued from Euclidean to Minkowski space; Identity Theorem guarantees uniqueness.
- Polynomial identity testing: if two polynomials agree at sufficiently many points, they are identical — underlies efficient algorithms.

---

### 4.2 Analytic Continuation (`math.cx.analytic-continuation`)

| Field | Value |
|-------|-------|
| **Difficulty** | research |
| **Prerequisites** | math.cx.identity-theorem |
| **Cross-links** | — |

**Learning Objective:** Define analytic continuation and use the Identity Theorem to establish uniqueness; recognize examples like the Riemann zeta function.

**Concept Summary:**  
Analytic continuation extends an analytic function from a smaller domain to a larger one while preserving analyticity. The Identity Theorem guarantees uniqueness wherever the domains overlap on a connected set. The Riemann zeta function ζ(s) is the most important example — extended from Re(s)>1 to all of ℂ minus s=1.

**Key Ideas:**
1. Continuation via overlapping disks defines a global analytic function — or reveals multi-valuedness (monodromy).
2. ζ(s) = Σ n^{-s} converges for Re(s)>1; its continuation to all ℂ (minus s=1) is defined by different representations (functional equation, integral formula).
3. Monodromy: continuing log(z) around the origin increases the imaginary part by 2πi each loop — requiring a Riemann surface.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Analytic continuation always produces a single-valued function | Continuing log(z) around the origin produces different branches. Single-valuedness requires simply connected domains or branch cuts. |
| ζ(s) = Σ n^{-s} works for all s | The Dirichlet series converges only for Re(s)>1. The continuation to Re(s)≤1 requires a different representation. |

**Worked Example:**  
*Continue f(z) = Σ_{n=0}^∞ z^n (converges on |z|<1) to a larger domain.*  
On |z|<1, f(z) = 1/(1−z). The function g(z) = 1/(1−z) is analytic on ℂ\{1}. By the Identity Theorem, 1/(1−z) is the unique analytic continuation.

**Real-World Applications:**
- Riemann zeta function and prime numbers: ζ(s) continued to all s gives the functional equation and location of non-trivial zeros (Riemann Hypothesis).
- String theory: path integrals computed for real parameters and analytically continued to Minkowski signature.

---

## 5. Singularity Theory

### 5.1 Singularities (`math.cx.singularities`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.analytic-functions |
| **Cross-links** | — |

**Learning Objective:** Classify singularities of analytic functions as removable, poles, or essential, and apply appropriate techniques to each type.

**Concept Summary:**  
A singularity at z₀ is a point where f fails to be analytic. Three types: (1) Removable — limit exists and is finite; (2) Pole of order n — |f(z)| → ∞; (3) Essential — neither (Casorati-Weierstrass: f takes values dense in ℂ near z₀). Classification via Laurent series: removable ⟺ no negative powers; pole of order n ⟺ lowest power z^{-n}; essential ⟺ infinitely many negative powers.

**Key Ideas:**
1. Riemann's theorem on removable singularities: if f is bounded near z₀ and analytic on a punctured neighborhood, then z₀ is removable.
2. Casorati-Weierstrass: near an essential singularity, f(z) comes arbitrarily close to every complex number.
3. Laurent series classification is the definitive test.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| A singularity where f(z) → ∞ is always a pole | Only if |f(z)| → ∞ uniformly in all directions. e^{1/z} near 0 has an essential singularity. |
| sin(z)/z has a singularity at z=0 that cannot be removed | lim_{z→0} sin(z)/z = 1 (finite); z=0 is removable. |

**Worked Example:**  
*Classify the singularity of f(z) = z²/(z²−1) at z=1.*  
z²−1=(z−1)(z+1). As z→1: numerator→1, (z+1)→2, (z−1)→0. So |f|→∞, behavior like 1/(2(z−1)): simple pole at z=1.

**Real-World Applications:**
- Signal processing: transfer functions with poles determine resonance frequencies; classification drives filter design.
- Quantum mechanics: scattering matrix poles correspond to resonances and bound states.

---

### 5.2 Poles (`math.cx.poles`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.singularities |
| **Cross-links** | — |

**Learning Objective:** Determine the order of a pole, compute its principal part in the Laurent expansion, and find the residue.

**Concept Summary:**  
f has a pole of order n at z₀ if (z−z₀)^n f(z) has a removable singularity at z₀. Laurent series: c_{-n}/(z−z₀)^n + ⋯ + c_{-1}/(z−z₀) + c₀ + ⋯. Residue = c_{-1}. Simple pole: Res = lim_{z→z₀}(z−z₀)f(z). Order-n pole: Res = (1/(n−1)!) lim d^{n-1}/dz^{n-1}[(z−z₀)^n f(z)].

**Key Ideas:**
1. Pole order n: smallest positive integer such that (z−z₀)^n f(z) extends analytically to z₀.
2. Quotient formula: if f=p/q with simple zero of q at z₀: Res = p(z₀)/q'(z₀).
3. The principal part (negative-power terms) characterizes singular behavior.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| The residue is c_{-1} only for simple poles | The residue is always the coefficient of (z−z₀)^{-1} in the Laurent series, regardless of pole order. |
| If f(z)→∞ at z₀, it must be a pole | e^{1/z}→∞ along the positive real axis near 0, but has an essential singularity. |

**Worked Example:**  
*Find the order and residue of f(z) = 1/[z²(z−2)] at z=0.*  
Near z=0: z=0 is a pole of order 2. Res = d/dz[z²f(z)]|_{z=0} = d/dz[1/(z−2)]|_{z=0} = −1/(z−2)²|_{z=0} = −1/4.

**Real-World Applications:**
- Electrical engineering: impedance functions with poles model resonant circuits; pole order determines resonance sharpness (Q factor).
- Laplace transform inversion: partial fractions via residues give the form of time-domain responses.

---

### 5.3 Essential Singularities (`math.cx.essential-singularity`)

| Field | Value |
|-------|-------|
| **Difficulty** | research |
| **Prerequisites** | math.cx.singularities |
| **Cross-links** | — |

**Learning Objective:** Characterize essential singularities via the Laurent series and Casorati-Weierstrass theorem; recognize their pathological behavior.

**Concept Summary:**  
Essential singularity at z₀: Laurent series has infinitely many negative-power terms. Near it, f takes values arbitrarily close to every complex number (Casorati-Weierstrass). Picard's Great Theorem: f takes every complex value (except possibly one) infinitely often near an essential singularity.

**Key Ideas:**
1. Casorati-Weierstrass: for any neighborhood of z₀ and any w ∈ ℂ, there exists zₙ → z₀ with f(zₙ) → w.
2. Picard's Great Theorem: f takes each value (with at most one exception) infinitely often near the singularity.
3. e^{1/z} near 0: all nonzero values taken infinitely often; 0 is the one exceptional value.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Casorati-Weierstrass says f is surjective near an essential singularity | CW gives density; surjectivity requires Picard's Great Theorem (much harder to prove). |
| Essential singularities are rare | Any entire non-polynomial function has an essential singularity at infinity. |

**Worked Example:**  
*Verify that e^{1/z} has an essential singularity at z=0.*  
Laurent series: e^{1/z} = Σ_{n=0}^∞ z^{-n}/n! — infinitely many negative-power terms. The exceptional value w=0 is never taken: e^ζ=0 has no solution.

**Real-World Applications:**
- Asymptotic analysis: functions near essential singularities require methods beyond Laurent series (Stokes phenomena) used in physics near turning points.
- Dynamical systems: Julia sets involve functions with essential singularities; chaotic dynamics near these points underlies fractal boundaries.

---

### 5.4 Laurent Series (`math.cx.laurent-series`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.singularities, math.cx.power-series-cx |
| **Cross-links** | — |

**Learning Objective:** Compute Laurent series expansions of functions in annular regions and use them to classify singularities and compute residues.

**Concept Summary:**  
f analytic on annulus r < |z−z₀| < R has Laurent series f(z) = Σ_{n=-∞}^∞ cₙ(z−z₀)^n where cₙ = (1/2πi)∮ f(z)/(z−z₀)^{n+1} dz. It generalizes Taylor series to regions with holes. The principal part (negative-index terms) characterizes singularities.

**Key Ideas:**
1. Converges in the largest annulus where f is analytic — different annuli yield different series.
2. The principal part determines singularity type; the analytic part is the Taylor component.
3. Practical computation: geometric series manipulation, partial fractions, and known Taylor series.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| The Laurent series of a function near a singularity is unique | Unique for a given annulus, but different annuli can give different series. |
| c_{-1} in any Laurent series is the residue | c_{-1} is the residue only in the Laurent series centered at z₀ valid in 0 < |z−z₀| < R. |

**Worked Example:**  
*Find the Laurent series of 1/[z(z−1)] in 0 < |z| < 1.*  
Partial fractions: −1/z + 1/(z−1) = −1/z − 1/(1−z) = −1/z − Σ_{n=0}^∞ zⁿ = −z^{-1} − 1 − z − z² − ⋯

**Real-World Applications:**
- Vibration analysis: near-resonance transfer functions have Laurent expansions around resonant frequencies.
- Complex geometry: Laurent series define meromorphic differentials on Riemann surfaces.

---

## 6. Residue Theory and Applications

### 6.1 Residues (`math.cx.residue`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.laurent-series |
| **Cross-links** | — |

**Learning Objective:** Define the residue of a function at an isolated singularity, compute it using multiple methods, and interpret its role in contour integration.

**Concept Summary:**  
Residue of f at z₀ = coefficient c_{-1} in Laurent series = (1/2πi)∮_C f(z) dz (small circle). Multiple formulas: Laurent coefficient method; simple pole Res = lim(z−z₀)f(z); order-n Res = (1/(n−1)!) lim d^{n-1}[(z−z₀)^n f(z)]; quotient formula Res = p(z₀)/q'(z₀).

**Key Ideas:**
1. The residue has physical meaning: (1/2πi) times the contour integral around z₀.
2. Multiple computation methods for efficiency depending on singularity type.
3. Residues at removable singularities are always 0.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Residue = coefficient of 1/z regardless of expansion center | Residue at z₀ is c_{-1} in the Laurent series centered at z₀. |
| Residue at a removable singularity could be nonzero | Removable singularity means no negative-power terms, so c_{-1} = 0 always. |

**Worked Example:**  
*Compute the residues of z/(z²+1) at its singularities.*  
Singularities at z=±i (simple poles). Quotient formula: Res_{z=i} = i/(2i) = 1/2. Res_{z=−i} = (−i)/(−2i) = 1/2.

**Real-World Applications:**
- Laplace transform inversion: residues give the time-domain response directly from transfer function poles.
- Statistical mechanics: partition function integrals use residues to sum over poles corresponding to quantum energy levels.

---

### 6.2 Residue Theorem (`math.cx.residue-theorem`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.residue, math.cx.cauchy-theorem |
| **Cross-links** | — |

**Learning Objective:** State and apply the Residue Theorem to evaluate complex contour integrals by summing residues of enclosed singularities.

**Concept Summary:**  
For meromorphic f inside positively oriented simple closed C with singularities z₁,…,zₙ inside C: ∮_C f(z) dz = 2πi Σₖ Res_{zₖ} f. Generalizes Cauchy's theorem; unifies contour integration.

**Key Ideas:**
1. Proof: deform C into small circles around each singularity; interior regions contribute zero by Cauchy-Goursat.
2. Winding number generalization: ∮_C f dz = 2πi Σₖ n(C,zₖ) · Res_{zₖ} f.
3. Converts integration to algebraic computation of residues.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| The theorem applies only to poles, not essential singularities | Applies to all isolated singularities (removable, pole, essential). |
| ∮_C f dz = 2πi × sum of ALL residues | Only residues INSIDE C contribute (weighted by winding number). |

**Worked Example:**  
*Evaluate ∮_{|z|=3} (z+1)/[z(z−1)(z−2)] dz.*  
All three poles inside |z|=3. Res_{z=0}=1/2, Res_{z=1}=−2, Res_{z=2}=3/2. Sum=0. Integral=0.

**Real-World Applications:**
- Inverse Laplace transforms: Bromwich integral evaluated by closing the contour and summing residues at poles.
- Number theory: asymptotics of arithmetic functions via Residue Theorem applied to Dirichlet series.

---

### 6.3 Real Integrals via Residues (`math.cx.real-integral-residues`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.residue-theorem |
| **Cross-links** | math.calc.improper-integrals |

**Learning Objective:** Apply the Residue Theorem to evaluate definite real integrals including improper integrals and trigonometric integrals.

**Concept Summary:**  
Many real integrals ∫_{−∞}^∞ f(x)dx or ∫_0^{2π} R(cos θ, sin θ)dθ are evaluated by extending to ℂ, closing the contour, and applying the Residue Theorem. Jordan's Lemma ensures arc contributions vanish for appropriate exponential factors.

**Key Ideas:**
1. Semicircle closure: for ∫_{-∞}^∞ p(x)/q(x)dx with deg q ≥ deg p + 2, close with upper semicircle; Jordan's Lemma ensures arc→0.
2. Jordan's Lemma: ∫_{arc} e^{iaz} g(z) dz → 0 as R→∞ if a>0 and g→0 uniformly on the semicircle.
3. Trigonometric integrals: substitute z=e^{iθ} to convert ∫_0^{2π} R(cos θ, sin θ)dθ to a contour integral on |z|=1.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| You can close the contour in either half-plane | Choice depends on the exponential: e^{iaz}→0 in UHP only when a>0. Wrong choice makes the arc integral blow up. |
| Simple poles on the real axis are ignored | They are handled by indentation — contributing πi·Res (half the full residue contribution). |

**Worked Example:**  
*Evaluate ∫_{-∞}^∞ 1/(1+x²) dx.*  
Close in UHP: pole at z=i inside. Res_{z=i} = 1/(2i). Integral = 2πi·(1/2i) = π.

**Real-World Applications:**
- Fourier transform of rational functions: closed-form results via residues, used in filter design and signal analysis.
- Quantum mechanics: scattering cross-sections as improper integrals evaluated via residues.

---

### 6.4 Maximum Modulus Principle (`math.cx.maximum-modulus`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.analytic-functions, math.cx.cauchy-integral-formula |
| **Cross-links** | math.de.harmonic-functions |

**Learning Objective:** State and prove the Maximum Modulus Principle and apply it to bound analytic functions and prove uniqueness results.

**Concept Summary:**  
If f is analytic and non-constant on connected open U, then |f| cannot attain its maximum inside U. The maximum of |f| on any compact subset is attained only on the boundary. Proof via mean value property: if |f(z₀)| were maximum, equality in the triangle inequality forces f constant.

**Key Ideas:**
1. Mean value property: f(z₀) = (1/2π)∫_0^{2π} f(z₀+re^{iθ})dθ.
2. Minimum Modulus Principle: if f has no zeros in U, |f| cannot attain its minimum inside U.
3. Used to establish uniqueness from boundary data and prove Schwarz's Lemma.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| The maximum modulus of f is attained somewhere in the interior | For a non-constant analytic function, the maximum of |f| on a closed bounded region is attained only on the boundary. |
| The Minimum Modulus Principle holds without conditions | Requires f to be non-vanishing in U. If f has a zero inside, the minimum is 0 and IS attained in the interior. |

**Worked Example:**  
*Show that if f is analytic on |z|≤1 and |f(z)|≤1 on |z|=1, then |f(0)|≤1.*  
By MMP, max of |f| on |z|≤1 is attained on the boundary. On the boundary |f|≤1, so max|f|≤1 on the whole disk, hence |f(0)|≤1.

**Real-World Applications:**
- Potential theory: maximum principle for harmonic functions underlies uniqueness of Laplace equation solutions in bounded domains.
- Numerical analysis: MMP is used to bound interpolation errors for analytic functions.

---

## 7. Geometric Theory

### 7.1 Conformal Mappings (`math.cx.conformal-mapping`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.analytic-functions |
| **Cross-links** | — |

**Learning Objective:** Define conformal maps, prove that analytic functions with nonzero derivative are conformal, and use conformal mappings to transfer boundary value problems.

**Concept Summary:**  
A conformal map is angle-preserving and orientation-preserving. An analytic function f with f'(z₀)≠0 is conformal at z₀: it scales distances by |f'(z₀)| and rotates by arg(f'(z₀)) — the same for every direction, hence angle-preserving.

**Key Ideas:**
1. f'(z₀)≠0 means all infinitesimal directions are scaled by |f'(z₀)| and rotated by arg(f'(z₀)) uniformly.
2. Critical points where f'(z₀)=0 are not conformal: angles are multiplied by (order of zero)+1.
3. Key examples: z^n, e^z, log(z), Möbius transformations, Joukowski transform.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Every analytic function is conformal everywhere | Conformal only where f'(z)≠0. At critical points, angles are multiplied by n+1. |
| Conformal maps preserve distances | They preserve angles, not distances. Distances are scaled by |f'(z)|. |

**Worked Example:**  
*Show that w = e^z maps horizontal strips {a<Im(z)<b} conformally to sectors {a<arg(w)<b}.*  
For z=x+iy: w=e^x·e^{iy}, so |w|=e^x∈(0,∞), arg(w)=y∈(a,b). Since (e^z)'=e^z≠0 everywhere, the map is conformal. Image is the sector a<arg(w)<b.

**Real-World Applications:**
- Aerodynamics: Joukowski transform conformally maps a circle to an airfoil, enabling tractable flow analysis.
- Electrostatics: conformal maps transform complicated electrode geometries to standard shapes.

---

### 7.2 Möbius Transformations (`math.cx.mobius-transformation`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.conformal-mapping |
| **Cross-links** | — |

**Learning Objective:** Classify Möbius transformations by fixed points, apply them to map standard domains, and use their group structure.

**Concept Summary:**  
f(z) = (az+b)/(cz+d), ad−bc≠0. They form a group under composition (isomorphic to PGL(2,ℂ)), preserve the Riemann sphere, and map circles/lines to circles/lines. Uniquely determined by three point images.

**Key Ideas:**
1. Three-point determination via cross-ratio: (z,z₁;z₂,z₃) = (w,w₁;w₂,w₃).
2. Circle-preserving: lines are circles through ∞ on the Riemann sphere.
3. Classification: parabolic (1 fixed point), elliptic (2, rotation-like), hyperbolic (2, dilation-like), loxodromic (2, rotation+dilation).

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Möbius transformations only map circles to circles, not lines | Lines are circles through ∞. Möbius transformations map circles (in the extended sense) to circles — a line can map to a circle or another line. |
| A Möbius transformation is determined by two points | Three points determine it uniquely (3 complex degrees of freedom). |

**Worked Example:**  
*Find the Möbius transformation mapping 0↦1, 1↦∞, ∞↦0.*  
f(∞)=0 ⟹ a=0; f(1)=∞ ⟹ denominator zero at z=1: d=−c. f(0)=b/(−c)=1 ⟹ b=−c. So f(z) = −c/(cz−c) = 1/(1−z).

**Real-World Applications:**
- Hyperbolic geometry: Möbius transformations of the unit disk are isometries of the Poincaré disk model.
- Antenna design: Smith charts are Möbius-transformation plots of complex impedances, used in RF engineering.

---

### 7.3 Riemann Mapping Theorem (`math.cx.riemann-mapping`)

| Field | Value |
|-------|-------|
| **Difficulty** | research |
| **Prerequisites** | math.cx.conformal-mapping |
| **Cross-links** | — |

**Learning Objective:** State the Riemann Mapping Theorem, understand its proof strategy, and apply it to conclude all simply connected proper subsets of ℂ are conformally equivalent.

**Concept Summary:**  
Every simply connected proper open subset U of ℂ is conformally equivalent to the unit disk D. The mapping is unique given f(z₀)=0, f'(z₀)>0 for fixed z₀∈U. The proof uses the Arzelà-Ascoli theorem and extremal principles.

**Key Ideas:**
1. Existence result: guarantees the map exists but gives no explicit formula.
2. Proof: extremal element of {f: U→D analytic, injective, f(z₀)=0} maximizing |f'(z₀)| is the desired bijection.
3. Simply connected is essential: the annulus is not conformally equivalent to the disk.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| The RMT gives an explicit formula for the conformal map | It is a pure existence theorem. Explicit formulas exist only for special domains. |
| All open subsets of ℂ are conformally equivalent to the disk | Requires simply connected AND proper. The annulus and ℂ itself are not. |

**Worked Example:**  
*Use the RMT and known explicit maps to map the upper half-plane to the unit disk.*  
The Cayley map w=(z−i)/(z+i) maps H→D: for Im(z)>0, |z−i|<|z+i|, so |w|<1. Inverse: z=i(1+w)/(1−w).

**Real-World Applications:**
- Fluid mechanics: RMT guarantees flow around any simply connected airfoil can be transformed to flow around a circle.
- Probability theory: conformal invariance of planar Brownian motion is a consequence of Riemann-mapping-type results.

---

### 7.4 Argument Principle (`math.cx.argument-principle`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.residue-theorem |
| **Cross-links** | — |

**Learning Objective:** State and apply the Argument Principle to count zeros and poles of meromorphic functions via contour integrals.

**Concept Summary:**  
For meromorphic f on and inside positively oriented simple closed C (no zeros/poles on C): (1/2πi)∮_C f'(z)/f(z) dz = Z − P, where Z = zeros and P = poles inside C (counted with multiplicity). The integral equals (1/2π) × total change in arg(f(z)) as z traverses C.

**Key Ideas:**
1. f'/f is the logarithmic derivative: integral counts winding number of f(C) around 0.
2. Geometric: Z−P equals winding number of the image curve f(C) around the origin.
3. For polynomials p, (1/2πi)∮ p'/p dz = deg(p) when C encloses all roots.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| The Argument Principle counts only zeros, not poles | Formula gives Z−P. A pole of order n contributes −n. |
| The principle requires f to be analytic | Applies to meromorphic functions; poles contribute negatively. |

**Worked Example:**  
*Count zeros of f(z) = z³+2z+5 inside |z|=2.*  
The winding number of f(C) around 0 as z traverses |z|=2: degree-3 polynomial, image winds 3 times. Z=3. (Confirmed by Rouché: |z³+2z|≤12<|5|? No — actually |5|<|z³+2z| on |z|=2 → Rouché gives 3 zeros matching the dominant term z³.)

**Real-World Applications:**
- Control theory: Nyquist stability criterion counts unstable poles using the argument principle on the open-loop transfer function.
- Root finding: argument principle verifies completeness of root count before numerical methods are applied.

---

### 7.5 Rouché's Theorem (`math.cx.rouche-theorem`)

| Field | Value |
|-------|-------|
| **Difficulty** | expert |
| **Prerequisites** | math.cx.argument-principle |
| **Cross-links** | — |

**Learning Objective:** State and apply Rouché's theorem to count zeros of analytic functions by comparison with simpler functions.

**Concept Summary:**  
If f and g are analytic on and inside C, and |g(z)| < |f(z)| on C, then f and f+g have the same number of zeros inside C. Converts zero-counting of a complicated function to that of a simpler one.

**Key Ideas:**
1. Rouché is a corollary of the Argument Principle: winding number of (f+g)/f = 1+g/f around 0 equals 0 since |g/f|<1 on C.
2. Strategy: choose dominant term f, count its zeros, conclude same count for f+g.
3. Proves FTA: for p(z)=z^n + lower terms, dominant term z^n satisfies |lower|<|z^n| on |z|=R for large R.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| Rouché requires |g|<|f| everywhere inside C, not just on C | The condition is needed only on the boundary C. Inside C, functions can behave arbitrarily. |
| Rouché tells us where zeros are | Rouché counts zeros but gives no location information. |

**Worked Example:**  
*How many roots does z^4+6z+3 have inside |z|=2?*  
f=z^4, g=6z+3. On |z|=2: |f|=16, |g|≤15<16. Same zeros as z^4 inside |z|=2: 4 zeros (order-4 zero at origin). h has 4 zeros.

**Real-World Applications:**
- Robust root location: verifies perturbing a characteristic polynomial within a bound cannot create new unstable poles.
- Certified root-finding: Rouché provides a priori bounds on where polynomial roots lie.

---

## 8. Advanced Topics

### 8.1 Riemann Surfaces (`math.cx.riemann-surface`)

| Field | Value |
|-------|-------|
| **Difficulty** | research |
| **Prerequisites** | math.cx.analytic-continuation, math.top.topological-space |
| **Cross-links** | math.top.covering-space |

**Learning Objective:** Define a Riemann surface, construct the Riemann surface for log(z) and √z, and understand how they resolve multi-valuedness.

**Concept Summary:**  
A Riemann surface is a one-dimensional complex manifold — a topological surface with a compatible complex structure. Multi-valued functions like log(z) or √z become single-valued on their Riemann surfaces. The surface for z^{1/n} has n sheets; for log(z) it is an infinite-sheeted helicoid.

**Key Ideas:**
1. Branch cuts are artificial choices; the Riemann surface makes the function globally single-valued without cuts.
2. The Riemann surface of log(z) is the universal cover of ℂ\{0} — a helicoid; circling the origin once ascends one sheet.
3. Genus: the Riemann surface of y²=p(z) for degree-2g+2 polynomial has genus g.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| A Riemann surface is just a surface in 3D space | It is an abstract complex manifold (charts with holomorphic transition maps), not necessarily embedded in ℝ³. |
| Branch cuts and Riemann surfaces are the same concept | A branch cut forces single-valuedness on one sheet; the Riemann surface is the full object where the function is globally single-valued without any cuts. |

**Worked Example:**  
*Construct the Riemann surface for w=√z.*  
Take two copies of ℂ, cut each along [0,∞). Glue: upper edge of Sheet 1 attached to lower edge of Sheet 2, and vice versa. Circling the origin moves from Sheet 1 to Sheet 2; circling again returns. √z changes sign only between sheets, making it globally single-valued.

**Real-World Applications:**
- String theory: worldsheets of strings are Riemann surfaces; their moduli spaces are central objects in conformal field theory.
- Cryptography: elliptic curve cryptography uses arithmetic on Riemann surfaces of genus 1.

---

### 8.2 Riemann Zeta Function (`math.cx.riemann-zeta`)

| Field | Value |
|-------|-------|
| **Difficulty** | research |
| **Prerequisites** | math.cx.analytic-continuation, math.nt.prime-distribution |
| **Cross-links** | math.nt.riemann-hypothesis |

**Learning Objective:** Define the Riemann zeta function via its Dirichlet series, understand its analytic continuation and functional equation, and state the Riemann Hypothesis.

**Concept Summary:**  
ζ(s) = Σ_{n=1}^∞ n^{-s} converges for Re(s)>1. Via analytic continuation, ζ extends to a meromorphic function on all of ℂ with a simple pole at s=1. Functional equation: ζ(s)=2^s π^{s−1} sin(πs/2) Γ(1−s) ζ(1−s). Riemann Hypothesis: all non-trivial zeros have Re(s)=1/2.

**Key Ideas:**
1. Euler product: ζ(s)=Π_p (1−p^{-s})^{-1} for Re(s)>1 — connecting ζ to prime distribution.
2. Non-trivial zeros lie in the critical strip 0≤Re(s)≤1. RH: all on Re(s)=1/2.
3. Prime Number Theorem: π(x)~x/log x follows from ζ having no zeros on Re(s)=1.

**Common Misconceptions:**

| Misconception | Correction |
|---------------|-----------|
| ζ(−1) = 1+2+3+⋯ = −1/12 means the series sums to −1/12 | ζ(−1)=−1/12 is the value of the analytic continuation at s=−1, not the sum of the divergent series. |
| The Riemann Hypothesis has been proved | As of 2026, RH remains unproved (Millennium Prize Problem). |

**Worked Example:**  
*Use the Euler product to show ζ(s)≠0 for Re(s)>1.*  
For Re(s)>1, each factor (1−p^{-s})^{-1} is nonzero (|p^{-s}|=p^{-Re(s)}<1). The product converges absolutely to a nonzero value.

**Real-World Applications:**
- Cryptography: RSA and elliptic curve cryptography rely on prime distribution; conditional on RH, primality testing has proven complexity bounds.
- Quantum chaos: Montgomery's pair correlation conjecture connects Riemann zero spacing to random matrix eigenvalue spacings.

---

*End of Chapter: Complex Numbers & Complex Analysis (math.cx)*  
*Concepts: 31 | Status: draft | Generated: 2026-07-05*

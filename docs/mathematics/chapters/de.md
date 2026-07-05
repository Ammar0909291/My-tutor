# Differential Equations

*My Tutor — Mathematics Knowledge Graph domain `math.de`*

Level range: 4–7 · Concepts in this chapter: 56

This chapter is generated from the canonical Knowledge Graph (`graph.json`, frozen, read-only) plus authored teaching content validated against the existing `TeachingAssetSchema`. It is intended for students, teachers, and as a canonical AI teaching source.

## Concepts in this chapter

- [Ordinary Differential Equation](#ordinary-differential-equation)
- [Order of a Differential Equation](#order-of-a-differential-equation)
- [Linearity of Differential Equations](#linearity-of-differential-equations)
- [Types of Solutions](#types-of-solutions)
- [Initial Value Problem](#initial-value-problem)
- [Existence and Uniqueness Theorem](#existence-and-uniqueness-theorem)
- [First-Order ODE](#first-order-ode)
- [Separable Differential Equation](#separable-differential-equation)
- [Linear First-Order ODE](#linear-first-order-ode)
- [Exact Differential Equation](#exact-differential-equation)
- [Bernoulli Equation](#bernoulli-equation)
- [Homogeneous First-Order ODE](#homogeneous-first-order-ode)
- [Slope Field](#slope-field)
- [Euler's Method](#euler-s-method)
- [Second-Order ODE](#second-order-ode)
- [Second-Order Linear ODE](#second-order-linear-ode)
- [Homogeneous Second-Order Linear ODE](#homogeneous-second-order-linear-ode)
- [Wronskian](#wronskian)
- [Characteristic Equation](#characteristic-equation)
- [Method of Undetermined Coefficients](#method-of-undetermined-coefficients)
- [Variation of Parameters](#variation-of-parameters)
- [Harmonic Oscillator](#harmonic-oscillator)
- [Resonance](#resonance)
- [Higher-Order Linear ODE](#higher-order-linear-ode)
- [Laplace Transform](#laplace-transform)
- [Laplace Transform Properties](#laplace-transform-properties)
- [Inverse Laplace Transform](#inverse-laplace-transform)
- [Solving ODEs with Laplace Transform](#solving-odes-with-laplace-transform)
- [Convolution Theorem (Laplace)](#convolution-theorem-laplace)
- [Systems of ODEs](#systems-of-odes)
- [Matrix Method for Linear Systems](#matrix-method-for-linear-systems)
- [Phase Plane Analysis](#phase-plane-analysis)
- [Stability Analysis](#stability-analysis)
- [Series Solution of ODEs](#series-solution-of-odes)
- [Frobenius Method](#frobenius-method)
- [Bessel's Equation](#bessel-s-equation)
- [Legendre's Equation](#legendre-s-equation)
- [Sturm-Liouville Theory](#sturm-liouville-theory)
- [Eigenfunction Expansion](#eigenfunction-expansion)
- [Boundary Value Problem](#boundary-value-problem)
- [Fourier Series](#fourier-series)
- [Convergence of Fourier Series](#convergence-of-fourier-series)
- [Fourier Sine and Cosine Series](#fourier-sine-and-cosine-series)
- [Fourier Transform](#fourier-transform)
- [Partial Differential Equation](#partial-differential-equation)
- [Classification of Second-Order PDEs](#classification-of-second-order-pdes)
- [Separation of Variables (PDE)](#separation-of-variables-pde)
- [Heat Equation](#heat-equation)
- [Wave Equation](#wave-equation)
- [Laplace's Equation](#laplace-s-equation)
- [Harmonic Functions](#harmonic-functions)
- [Poisson's Equation](#poisson-s-equation)
- [Green's Function](#green-s-function)
- [Nonlinear ODE](#nonlinear-ode)
- [Bifurcation Theory](#bifurcation-theory)
- [Chaotic Dynamics](#chaotic-dynamics)

---

### Ordinary Differential Equation

*Concept ID: `math.de.ode` · Difficulty: advanced · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 4h*

**Learning objective.** Define an ordinary differential equation (ODE), distinguish it from an algebraic equation, and identify the dependent and independent variables; classify an ODE by its order and explain what a solution means in the ODE context.

An equation involving an unknown function of one variable and its derivatives. The order is the highest derivative present; the degree is the power of that highest derivative.

An ordinary differential equation is an equation relating an unknown function y(x) to one or more of its derivatives y', y'', …, y^(n). Unlike an algebraic equation whose solution is a number, the solution to an ODE is a function — one whose derivatives satisfy the given relationship for all x in some interval. 'Ordinary' distinguishes these from partial differential equations (PDEs), which involve functions of several variables and their partial derivatives. The word 'differential' signals that rates of change are at the heart of the relationship. ODEs arise naturally whenever a quantity changes at a rate that depends on the quantity itself or on related quantities: Newton's second law F = ma relates acceleration (second derivative of position) to force; exponential growth dy/dt = ky says the rate of change of a population equals k times the population; Newton's law of cooling says the temperature's rate of change equals k times the difference from ambient. Understanding what an ODE is — and what counts as a solution — is the conceptual foundation for the entire theory.

**Key ideas**

- An ODE is an equation involving an unknown function and its derivatives; its solution is a function, not a number.
- The order of an ODE is the highest derivative that appears in the equation.
- A function y = φ(x) is a solution if substituting it (and its derivatives) into the ODE produces a true identity on some interval I.
- Most ODEs have infinitely many solutions (a family); additional conditions (initial or boundary) select a unique one.
- ODEs are the mathematical language for modeling anything that evolves continuously: population, temperature, voltage, position.

**Vocabulary**

- **ordinary differential equation (ODE)** — An equation relating an unknown function y of one independent variable x to its derivatives; 'ordinary' distinguishes it from PDEs, which involve partial derivatives
- **order of an ODE** — The order of the highest derivative appearing in the equation; determines how many arbitrary constants appear in the general solution
- **solution of an ODE** — A function y = φ(x) that, when substituted (with its derivatives) into the ODE, satisfies the equation as an identity on some interval I
- **general solution** — The complete family of all solutions, parametrized by one or more arbitrary constants (one per order)
- **particular solution** — A specific solution obtained by assigning numerical values to the arbitrary constants, typically via initial or boundary conditions

**Common misconceptions**

- *Misconception:* Students treat an ODE like an algebraic equation and try to 'solve for y' by algebraic manipulation alone, without recognizing that the solution is a function requiring integration.
  *Correction:* An ODE cannot be solved purely by algebra because differentiation is involved. The solution process requires finding a function y(x) such that, when differentiated and substituted back, the equation becomes a true statement. This almost always requires integration. Algebraic manipulation can simplify an ODE but cannot alone produce the solution function.
- *Misconception:* Students believe a differential equation has exactly one solution, analogous to a single algebraic equation in one unknown.
  *Correction:* A general ODE of order n has a family of infinitely many solutions, parametrized by n arbitrary constants. The general solution of y' = ky is y = Ce^{kx} for any constant C — that's one solution for each real number C. Initial conditions (values of y, y', … at a specific point) pin down the constants and select a unique particular solution.
- *Misconception:* Students confuse the order of an ODE with the degree, thinking an equation with y raised to the second power is a 'second-order' ODE.
  *Correction:* The order is determined by the highest derivative, not by the highest power of y. The equation (y')^3 + 2y = x is a first-order ODE of degree 3 (degree = power of the highest derivative), while y'' + y = 0 is second-order of degree 1. Degree is a separate concept from order.

**Common mistakes in practice**

- Trying to solve ODEs purely by algebra without integrating
- Forgetting the arbitrary constant C when integrating
- Confusing order (highest derivative) with degree (power of that derivative)

**Visual teaching opportunities**

- Draw a curve y = φ(x) and annotate it with tangent lines, showing that the ODE constrains the slope at each point — the solution curve must 'fit' the slope condition everywhere.
- Side-by-side comparison: algebraic equation (solution = a point on a number line) vs. ODE (solution = a curve in the xy-plane).
- Diagram of a family of solutions (parallel curves or concentric circles), with one highlighted curve representing the particular solution picked by an initial condition.

**Worked example**

*Setup:* Verify that y = 3e^{2x} is a solution to the ODE y' − 2y = 0, and find all solutions to this ODE.

1. Step 1: Compute y'. If y = 3e^{2x}, then y' = 6e^{2x}. Why: differentiate using the chain rule; the derivative of e^{2x} is 2e^{2x}.
2. Step 2: Substitute into y' − 2y = 0. LHS = 6e^{2x} − 2(3e^{2x}) = 6e^{2x} − 6e^{2x} = 0 = RHS. ✓ Why: the ODE is satisfied for all x, confirming y = 3e^{2x} is a solution.
3. Step 3: Find all solutions. The ODE y' = 2y says 'the rate of change equals twice the function.' Separate variables: dy/y = 2 dx. Integrate both sides: ln|y| = 2x + C₁. Exponentiate: |y| = e^{C₁}e^{2x}. Absorb the sign: y = Ce^{2x} for any constant C ≠ 0 (and y = 0 works too). Why: integration produces the constant C, representing the entire family of solutions.
4. Step 4: Interpret the family. y = Ce^{2x} is the general solution. Each value of C gives a different solution curve. y = 3e^{2x} corresponds to C = 3. Why: a first-order ODE has one arbitrary constant in its general solution.
5. Step 5: Verify that y = 0 is also a solution. y' = 0 and 2y = 0, so y' − 2y = 0 ✓. This corresponds to C = 0, so y = 0 is included in the family y = Ce^{2x} when C = 0. Why: the constant function y = 0 (the trivial solution) is often easy to miss but is always present in linear homogeneous ODEs.

*Outcome:* y = Ce^{2x} (C any real constant) is the general solution; y = 3e^{2x} is the particular solution with C = 3, verified by substitution.

**Real-world intuition**

- Exponential growth and decay: y' = ky models population growth, radioactive decay, and compound interest
- Newton's law of cooling: dT/dt = k(T − T_ambient) predicts how quickly a hot coffee cools
- Newton's second law: F = m(d²x/dt²) is a second-order ODE governing all mechanical motion
- Electric circuits: Kirchhoff's voltage law for an RC circuit gives a first-order ODE for charge

**Practice progression**

Item types: verification-by-substitution, short-answer-classification, general-solution-by-separation. Suggested item count: 5.

Start with substitution verification for given functions, then classify ODEs by order and linearity, then find general solutions of simple separable equations.

**Assessment objectives**

Formats: verify-solution, classify-ode, short-explanation. Bloom alignment: understand.

Mastery signal: Student can correctly identify a function as a solution (by substitution), state the order of an ODE, and explain the difference between a general and particular solution.

**Teacher notes**

Emphasize from day one that the solution is a function, not a number. The verification step (substitution back into the ODE) is a critical habit — it is the ODE analog of checking an algebraic solution. Use physical examples immediately: Newton's law of cooling or exponential growth make the abstract concept concrete and motivate why someone would want to solve an ODE.

**Student notes**

Think of an ODE as a constraint on how a function must behave — it tells you a relationship between the function and its rate(s) of change, and you find the function that satisfies it. Always verify your answer by substituting back.

**Prerequisite graph**

- Requires: math.calc.derivative-intro, math.calc.antiderivatives, math.func.function-concept
- Unlocks (future prerequisite links): math.de.first-order-ode, math.de.second-order-ode
- Cross-topic connections (graph cross-links): math.phys.classical-mechanics
- Narrative: Foundational for all of differential equations; connects to calculus (integration, derivatives), physics (equations of motion, circuits), and biology/economics (growth models). Every subsequent topic in math.de assumes mastery of what an ODE and its solution are.

**Teaching hints — review triggers**

- Student cannot differentiate standard functions (polynomials, exponentials, trig)
- Student is unfamiliar with the concept of a function y = f(x) as distinct from a value
- Student has not covered integration (antiderivatives) at the single-variable level

**Spaced repetition / revision guidance**

Practice verifying solutions by substitution, and practice classifying ODEs by order. Make sure you can produce the general solution of y' = ky = Ce^{kx} from memory — it recurs throughout the entire subject.

---

### Order of a Differential Equation

*Concept ID: `math.de.ode-order` · Difficulty: advanced · Bloom level: remember · Mastery threshold: 0.9 · Estimated study time: 1h*

**Learning objective.** Identify the order and degree of any ODE by inspection; explain why order determines the number of arbitrary constants in the general solution; classify examples as first-, second-, or higher-order.

The order of an ODE is determined by the highest derivative appearing in it. A first-order ODE involves only y′; second-order involves y″, etc.

The order of an ODE is defined as the order of the highest derivative appearing in the equation. This single number has profound consequences: an nth-order ODE generically has a general solution parametrized by exactly n arbitrary constants, requires n pieces of auxiliary data (initial or boundary conditions) to determine a unique solution, and is qualitatively more complex than an (n−1)th-order ODE. The degree of an ODE is the power to which the highest-order derivative is raised after the equation has been rationalized (cleared of fractions and radicals involving derivatives). Most ODEs encountered in applications are of degree 1 (the highest derivative appears linearly) and any positive integer order. First-order ODEs describe systems with one 'memory' slot — knowing the state now determines the future. Second-order ODEs describe systems with two memory slots (position and velocity in mechanics), which is why Newton's second law F = ma is second-order. Higher-order ODEs arise in beam deflection (fourth-order) and advanced mechanics.

**Key ideas**

- Order = index of the highest derivative in the ODE; determines the 'complexity' of the solution family.
- An nth-order ODE has a general solution with n arbitrary constants.
- Degree = power of the highest-order derivative after rationalization; degree 1 means the highest derivative appears linearly.
- Most physical ODEs are first- or second-order; higher orders arise in structural mechanics and control theory.
- Do not confuse order (which derivative is highest) with degree (to what power that derivative appears).

**Vocabulary**

- **order** — The index of the highest derivative in an ODE; an nth-order ODE has n arbitrary constants in its general solution
- **degree** — The power to which the highest-order derivative is raised, after the ODE has been rationalized (radicals and fractions in derivatives removed)
- **rationalization** — The process of clearing radicals or fractions involving derivatives before determining the degree; e.g., squaring both sides when a derivative appears under a square root

**Common misconceptions**

- *Misconception:* Students say y'' + (y')² = x is 'second order, second degree' because y' is squared, confusing the degree of the highest-order derivative with the degree of a lower-order derivative.
  *Correction:* The degree is the power of the highest-order derivative, not any derivative. Here the highest derivative is y'' (second order), and it appears to the first power. So the equation is second-order, first-degree. The (y')² term is irrelevant to the degree since y' is not the highest-order derivative present.
- *Misconception:* Students assume all second-order ODEs need exactly two initial conditions — one for y and one for y' — without understanding why.
  *Correction:* A second-order ODE has a general solution with two arbitrary constants C₁ and C₂. To pin down both constants uniquely, two equations are needed. An initial condition y(x₀) = y₀ gives one equation; y'(x₀) = y₁ gives a second — together they uniquely determine C₁ and C₂. The number of conditions required equals the number of constants, which equals the order.
- *Misconception:* Students try to verify the order by counting the number of times y appears in the equation rather than looking at derivative notation.
  *Correction:* The order is read from the derivatives, not from the number of times y appears. In y + y' + y² = 0, y appears three times but only one derivative (y') is present — this is first-order. In y'' = y, two distinct quantities (y and y'') appear, but the order is 2 (the index on the highest derivative).

**Common mistakes in practice**

- Reporting the degree of a lower-order derivative instead of the highest
- Forgetting to rationalize before declaring the degree
- Saying order = number of times y appears, not number of derivatives

**Visual teaching opportunities**

- Table of example ODEs with columns: equation, order, degree, number of arbitrary constants in general solution.
- Physical analogy: first-order ODE = system with one memory slot (position only), second-order = two memory slots (position + velocity).
- Show the general solution of y'' = 0 (a straight line y = C₁x + C₂) and contrast with y' = 0 (a constant y = C₁) to make the constant-count concrete.

**Worked example**

*Setup:* For each ODE, state its order and degree: (a) y' + y = x²; (b) y'' − 3y' + 2y = 0; (c) (y'')² + y = sin x; (d) √(1 + (y')²) = y''.

1. Step 1: ODE (a): y' + y = x². Highest derivative: y' (first derivative). Power of y': 1. Order = 1, Degree = 1. Why: only y' appears; it is linear (power 1).
2. Step 2: ODE (b): y'' − 3y' + 2y = 0. Highest derivative: y''. Power of y'': 1. Order = 2, Degree = 1. Why: both y' and y'' appear; the highest is y'', raised to the first power.
3. Step 3: ODE (c): (y'')² + y = sin x. Highest derivative: y''. Power of y'': 2. Order = 2, Degree = 2. Why: y'' is the highest derivative, and it appears squared.
4. Step 4: ODE (d): √(1 + (y')²) = y''. Rationalize by squaring both sides: 1 + (y')² = (y'')². Now highest derivative is y'', power 2. Order = 2, Degree = 2. Why: before rationalization the equation contains a radical in the derivative, so the degree is undefined or requires clearing — always rationalize first.
5. Step 5: Summarize. Order tells you how many constants the general solution has; degree tells you the nonlinearity of the highest derivative. For physical problems, degree 1 (linear in the highest derivative) is the most common and tractable case. Why: degree > 1 introduces severe nonlinearity that generally prevents closed-form solutions.

*Outcome:* (a) order 1, degree 1; (b) order 2, degree 1; (c) order 2, degree 2; (d) order 2, degree 2 after rationalization.

**Real-world intuition**

- First-order: RC circuit charge decay, population growth, Newton's cooling law
- Second-order: spring-mass oscillator, pendulum, beam deflection under point loads
- Fourth-order: Euler-Bernoulli beam equation for structural engineering
- Nth-order: transfer functions in control engineering are often expressed as nth-order ODEs

**Practice progression**

Item types: order-and-degree-classification, count-arbitrary-constants, identify-initial-conditions-needed. Suggested item count: 5.

Classify standard ODEs, then mixed cases with radicals, then relate order to number of auxiliary conditions required.

**Assessment objectives**

Formats: classification-table, short-explanation, true-false-with-justification. Bloom alignment: remember.

Mastery signal: Student correctly states order and degree for any ODE and explains why order determines the number of arbitrary constants.

**Teacher notes**

The order/degree distinction trips students up repeatedly. Use a table of examples as a quick reference. Emphasize that physical problems are almost always degree 1 (linear in the highest derivative), so the degree concept is mostly needed for completeness and classification.

**Student notes**

To find the order: look for the highest derivative (count the primes or the number in y^(n)). To find the degree: after clearing any radicals, look at the power of that highest derivative.

**Prerequisite graph**

- Requires: math.de.ode
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Order directly determines solution complexity: first-order ODEs have one-parameter solution families; second-order have two-parameter families. This is why Newton's law (second-order) requires both initial position and velocity.

**Teaching hints — review triggers**

- Student does not understand what a derivative y' or y'' represents
- Student cannot identify which terms in an equation involve derivatives

**Spaced repetition / revision guidance**

Practice classifying 10–15 varied ODEs by order and degree until it is automatic. Then practice stating how many initial conditions are needed to determine a unique solution.

---

### Linearity of Differential Equations

*Concept ID: `math.de.ode-linearity` · Difficulty: advanced · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 2h*

**Learning objective.** Define linearity for ODEs in terms of the superposition principle; distinguish linear from nonlinear ODEs; state the form of a general nth-order linear ODE and explain what the coefficient functions and forcing function represent.

An ODE is linear if it can be written as a linear combination of y and its derivatives with coefficients depending only on the independent variable. Nonlinear ODEs include products of y and its derivatives.

A linear ODE is one in which the unknown function y and all its derivatives appear only linearly — that is, to the first power, not multiplied together, and not inside nonlinear functions like sin(y) or e^y. The general form of a linear nth-order ODE is: a_n(x)y^(n) + a_{n-1}(x)y^{(n-1)} + ⋯ + a_1(x)y' + a_0(x)y = g(x). Here the coefficients a_k(x) and the forcing function g(x) may themselves be arbitrary functions of x — linearity refers to the relationship between the ODE and y, not between y and x. If g(x) = 0 the equation is homogeneous; if g(x) ≠ 0 it is nonhomogeneous (or inhomogeneous). The critical consequence of linearity is the superposition principle: any linear combination of solutions to a homogeneous linear ODE is again a solution. This transforms the problem of finding all solutions into a linear algebra problem (finding a basis for the solution space), and it underlies all the major solution techniques for linear ODEs. Nonlinear ODEs — where y appears as y², sin(y), yy', etc. — generally lack closed-form solutions and must be approached numerically or qualitatively.

**Key ideas**

- A linear ODE has y and its derivatives appearing only to the first power, not multiplied together or inside nonlinear functions.
- General form: a_n(x)y^(n) + ⋯ + a_0(x)y = g(x); the coefficients a_k(x) may be non-constant.
- Homogeneous: g(x) = 0; nonhomogeneous: g(x) ≠ 0.
- Superposition principle: if y₁ and y₂ solve the homogeneous equation, so does c₁y₁ + c₂y₂ for any constants c₁, c₂.
- Nonlinear ODEs (y² terms, yy', sin y, etc.) do not obey superposition and are generally much harder.

**Vocabulary**

- **linear ODE** — An ODE in which y and all its derivatives appear only to the first power, not multiplied together or inside nonlinear functions of y; has the form a_n(x)y^(n)+⋯+a_0(x)y = g(x)
- **nonlinear ODE** — An ODE containing terms such as y², (y')², y·y', sin(y), e^y, or any expression that is not linear in y and its derivatives
- **homogeneous linear ODE** — A linear ODE with g(x) = 0 on the right-hand side; its solutions form a vector space closed under addition and scalar multiplication (superposition)
- **superposition principle** — If y₁ and y₂ solve a homogeneous linear ODE, then c₁y₁ + c₂y₂ also solves it for any constants c₁, c₂; does NOT apply to nonlinear or nonhomogeneous equations
- **variable-coefficient ODE** — A linear ODE in which at least one coefficient a_k(x) is a non-constant function of x; still linear in y, but generally harder to solve than constant-coefficient ODEs

**Common misconceptions**

- *Misconception:* Students classify y'' + x²y = 0 as nonlinear because x² is a nonlinear function of x.
  *Correction:* Linearity refers to the relationship between the ODE and the unknown function y, not between y and the independent variable x. The coefficient x² is a function of x — a non-constant coefficient — but y still appears only linearly (to the first power). This is a linear ODE with variable (non-constant) coefficients.
- *Misconception:* Students think 'homogeneous' means the coefficients are all constant, confusing the terms 'homogeneous' and 'constant-coefficient'.
  *Correction:* Homogeneous means g(x) = 0 (the right-hand side is zero). Constant-coefficient means all a_k are constants (not functions of x). These are independent properties: y'' + y = 0 is constant-coefficient homogeneous; y'' + x·y' = 0 is variable-coefficient homogeneous; y'' + y = sin x is constant-coefficient nonhomogeneous.
- *Misconception:* Students apply the superposition principle to nonhomogeneous equations, claiming that if y₁ and y₂ are solutions to Ly = g, then y₁ + y₂ is also a solution.
  *Correction:* Superposition applies to the homogeneous equation (g = 0). For the nonhomogeneous equation Ly = g: if y₁ and y₂ are both solutions, then y₁ − y₂ solves the homogeneous equation, but y₁ + y₂ solves Ly = 2g, not Ly = g. The correct statement: the general solution of Ly = g is y_h + y_p, where y_h is the general homogeneous solution and y_p is any particular nonhomogeneous solution.

**Common mistakes in practice**

- Confusing variable coefficients (function of x — still linear) with nonlinear terms (function of y — nonlinear)
- Applying superposition to nonhomogeneous equations
- Confusing 'homogeneous' with 'constant-coefficient'

**Visual teaching opportunities**

- Two-column table: linear ODEs vs. nonlinear ODEs with examples and the specific feature that makes each nonlinear.
- Diagram showing the solution space of a homogeneous linear ODE as a vector space (a plane through the origin for second-order), with superposition represented as vector addition.
- Side-by-side solutions of a linear ODE (superposition works) and a nonlinear ODE (superposition fails with explicit counterexample).

**Worked example**

*Setup:* Classify each ODE as linear or nonlinear. For linear ones, state whether it is homogeneous or nonhomogeneous, and whether the coefficients are constant: (a) y'' + 3y' − 4y = e^x; (b) yy' = x; (c) y'' + sin(x)y = 0; (d) y' + y² = 1.

1. Step 1: (a) y'' + 3y' − 4y = e^x. Check: y, y', y'' each appear to the first power; no products of y or its derivatives; no nonlinear functions of y. Linear. g(x) = e^x ≠ 0: nonhomogeneous. Coefficients 1, 3, −4 are constants: constant-coefficient nonhomogeneous linear ODE. Why: all three linearity tests pass.
2. Step 2: (b) yy' = x. Check: the term yy' is a product of the function y and its derivative y'. This is nonlinear. Why: linearity requires y and y' to appear separately, not multiplied together.
3. Step 3: (c) y'' + sin(x)y = 0. Check: y'' appears linearly; sin(x)·y appears linearly in y (sin(x) is the coefficient of y, not a function of y). Linear. g(x) = 0: homogeneous. Coefficient sin(x) is variable (not constant): variable-coefficient homogeneous linear ODE. Why: sin(x) is a nonlinear function of x, but that is the coefficient of y, not y itself.
4. Step 4: (d) y' + y² = 1. Check: y² is y raised to the second power — nonlinear. Why: even a single power of y beyond the first renders the ODE nonlinear. This is a Bernoulli equation (nonlinear first-order).
5. Step 5: Summary. Linearity is read from how y (and its derivatives) appear in the equation, not from the appearance of x. Variable coefficients are still linear; powers or products of y are not. Why: this classification is crucial because linear ODEs admit systematic solution methods based on superposition, while nonlinear ones generally do not.

*Outcome:* (a) linear, constant-coefficient, nonhomogeneous; (b) nonlinear; (c) linear, variable-coefficient, homogeneous; (d) nonlinear.

**Real-world intuition**

- Linear ODEs model small oscillations (pendulum, springs), electric circuits, heat conduction — wherever superposition holds
- Nonlinear ODEs model large oscillations, turbulence, population interactions (predator-prey) — requiring numerical methods
- The linearity distinction determines which solution toolbox applies: constant-coefficient methods, variation of parameters, Laplace transforms (all for linear only)

**Practice progression**

Item types: linearity-classification, superposition-verification, homogeneous-vs-nonhomogeneous. Suggested item count: 6.

Classify from easy cases (obvious nonlinearity) to subtle cases (variable coefficients that look nonlinear), then apply superposition principle explicitly.

**Assessment objectives**

Formats: classification-with-justification, short-proof-of-superposition. Bloom alignment: understand.

Mastery signal: Student correctly classifies any ODE as linear or nonlinear with full justification, and can state and apply the superposition principle.

**Teacher notes**

The linearity/nonlinearity distinction is the most important classification in ODEs because it determines which solution methods are available. Make the superposition principle very concrete with an explicit example before stating it abstractly. Warn students about the 'variable coefficient' trap — sin(x) as a coefficient is fine; sin(y) as a coefficient (i.e., a function of y) is what causes nonlinearity.

**Student notes**

To check linearity: look at each term. Does it contain y, y', or y'' multiplied by itself or by each other? Does it contain y inside sin, exp, or log? If yes to any, it's nonlinear. If no, it's linear.

**Prerequisite graph**

- Requires: math.de.ode
- Unlocks (future prerequisite links): math.de.linear-first-order, math.de.second-order-linear
- Cross-topic connections (graph cross-links): math.linalg.linear-map
- Narrative: Superposition principle underlies all linear ODE solution methods: characteristic equations, undetermined coefficients, variation of parameters. Nonlinear ODEs connect to phase plane analysis, stability, and chaos theory.

**Teaching hints — review triggers**

- Student does not know what 'linear' means in the context of a function or equation
- Student is unfamiliar with the idea of superposition from linear algebra or physics

**Spaced repetition / revision guidance**

Practice classifying 20 mixed ODEs until automatic. Then verify the superposition principle concretely for y'' + y = 0 (solutions sin x and cos x, check that 3 sin x − 2 cos x is also a solution).

---

### Types of Solutions

*Concept ID: `math.de.solution-types` · Difficulty: advanced · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 2h*

**Learning objective.** Distinguish between general solutions, particular solutions, singular solutions, and trivial solutions; explain what an explicit vs. implicit solution is; verify that a given function (explicit or implicit) is a solution to an ODE.

A general solution contains arbitrary constants equal in number to the ODE order. A particular solution fixes those constants from initial/boundary conditions. Singular solutions are not obtainable from the general solution.

A solution to an ODE y^(n) = F(x, y, y', …, y^{(n-1)}) is any function y = φ(x) (or relation F(x,y) = 0) that satisfies the equation on some interval. Several types arise in practice. The general solution is the complete family of solutions, parametrized by n constants C₁, …, Cₙ (for an nth-order ODE); it captures all solutions obtainable by the standard integration procedure. A particular solution is obtained from the general solution by assigning specific values to the constants — typically via initial or boundary conditions. A singular solution is a solution not obtainable from the general solution by any choice of the constants; it often arises in nonlinear ODEs and typically represents an envelope of the family of curves. An explicit solution is one written as y = φ(x); an implicit solution satisfies a relation G(x, y) = 0 without y isolated. The trivial solution y = 0 always satisfies any homogeneous linear ODE. These distinctions matter because solution methods often produce general families, and the practitioner must decide which type is needed for the problem at hand.

**Key ideas**

- General solution: complete n-parameter family; captures all non-singular solutions.
- Particular solution: one curve from the family, determined by auxiliary conditions.
- Singular solution: satisfies the ODE but lies outside the general solution family; common in nonlinear equations.
- Explicit solution: y = φ(x); implicit solution: G(x,y) = 0 with y not isolated.
- Trivial solution: y ≡ 0 (always a solution to any homogeneous linear ODE).

**Vocabulary**

- **general solution** — The n-parameter family of all solutions to an nth-order ODE produced by the integration process; every particular solution is a member
- **particular solution** — A specific member of the general solution family, obtained by choosing values for the arbitrary constants via initial or boundary conditions
- **singular solution** — A solution not obtainable from the general solution for any choice of constants; typically the envelope of the family of solution curves; arises only in nonlinear ODEs
- **trivial solution** — The solution y ≡ 0; satisfies any homogeneous linear ODE and some nonlinear ones
- **implicit solution** — A relation G(x,y) = 0 that defines y implicitly as a function of x and satisfies the ODE; verified by implicit differentiation

**Common misconceptions**

- *Misconception:* Students believe all solutions to an ODE come from the general solution by choosing constants, and are surprised when singular solutions exist.
  *Correction:* The general solution captures all solutions obtainable by the primary integration process, but some nonlinear ODEs have additional singular solutions that no choice of constants produces. The classic example is y' = y^{2/3}: the general solution is y = (x/3 + C)³, but y ≡ 0 is also a solution (the trivial one is singular here because it is not obtained from the family for any C). Checking whether singular solutions exist requires additional analysis beyond finding the general solution.
- *Misconception:* Students dismiss implicit solutions as incomplete or incorrect, preferring only explicit forms y = φ(x).
  *Correction:* Implicit solutions G(x,y) = 0 are perfectly valid and often unavoidable. For the ODE 2xy dx + (x² − 1) dy = 0, the implicit solution x²y − y = C cannot be solved explicitly for y in general. Verifying an implicit solution requires implicit differentiation — you differentiate G(x,y) = 0 implicitly and check that the resulting expression matches the ODE.
- *Misconception:* Students think the 'trivial solution' y = 0 is unimportant or degenerate and skip checking it.
  *Correction:* The trivial solution y = 0 is a genuine solution to any homogeneous linear ODE and plays an important role in the theory of linear systems. It is the unique solution satisfying zero initial conditions y(x₀) = y'(x₀) = 0 when the ODE is linear and the coefficient of the highest derivative is nonzero (by the existence-uniqueness theorem). In nonlinear ODEs it may coexist with non-trivial solutions from the same initial condition.

**Common mistakes in practice**

- Forgetting the arbitrary constant C is what makes a solution 'general'
- Assuming every ODE has an explicit solution
- Missing singular solutions because only the general family was examined

**Visual teaching opportunities**

- Plot the general solution family of y' = 2x (y = x² + C) as a set of parallel parabolas, then mark a specific curve (particular solution) picked by an initial condition.
- Show the singular solution of y' = y^{2/3} as the x-axis (y = 0), with the general solution curves tangent to it — illustrating the envelope interpretation of singular solutions.
- Side-by-side: explicit solution y = sin x vs. implicit solution sin(x)y + cos(y)x = C (differentiated implicitly to verify).

**Worked example**

*Setup:* The ODE y' = 2√y has general solution y = (x + C)² (for x > −C) and also y = 0. (a) Verify y = (x + C)² is a solution. (b) Verify y = 0 is a solution. (c) Is y = 0 a particular solution (for some C) or a singular solution?

1. Step 1: Verify y = (x+C)². Compute y' = 2(x+C). Compute 2√y = 2√{(x+C)²} = 2|x+C| = 2(x+C) for x > −C. So y' = 2(x+C) = 2√y ✓. Why: substitution confirms the general solution for the appropriate domain.
2. Step 2: Verify y = 0. y' = 0. 2√y = 2√0 = 0. So y' = 0 = 2√y ✓. Why: y = 0 satisfies the ODE identically — it is a valid solution.
3. Step 3: Check whether y = 0 comes from the general solution. Set (x+C)² = 0 for all x. This requires x+C = 0 for all x, which is impossible unless… (x+C)² = 0 only at one point x = −C, not on an interval. So y = 0 is NOT a particular solution obtained from the family for any single value of C. Why: for y = 0 to equal (x+C)² on an interval, we would need a constant C producing the zero function, which no real C does.
4. Step 4: Conclusion: y = 0 is a singular solution. It satisfies the ODE but does not appear in the general solution family y = (x+C)² for any choice of C. Why: the ODE is nonlinear (y^{1/2} is nonlinear), which allows singular solutions that linear ODEs cannot have.
5. Step 5: Geometric interpretation. The general solution family consists of parabolas (x+C)² all tangent to the x-axis. The x-axis itself (y = 0) is the envelope of this family — touching each parabola at exactly one point. Singular solutions are envelopes of families of solution curves. Why: this geometric picture is the defining property of singular solutions.

*Outcome:* y = (x+C)² is the general solution (verified); y = 0 is a singular solution (satisfies ODE but not obtainable from the family for any C).

**Real-world intuition**

- Implicit solutions appear naturally in thermodynamics (equations of state) and geometry (level curves)
- Singular solutions arise in envelope problems: the caustic of a light reflection system
- In control theory, trivial (equilibrium) solutions represent steady states of dynamical systems

**Practice progression**

Item types: solution-verification, general-vs-particular-identification, implicit-differentiation-verification. Suggested item count: 5.

Verify explicit solutions, then implicit solutions, then identify singular solutions from given general solution families.

**Assessment objectives**

Formats: verification-problem, true-false-with-justification. Bloom alignment: understand.

Mastery signal: Student can verify any explicit or implicit solution by substitution/implicit differentiation, and can distinguish general, particular, and singular solutions.

**Teacher notes**

Students often expect every ODE to have a single 'the answer' — spend time emphasizing families of solutions and the role of initial conditions in selecting one curve. The singular solution concept is best introduced with a concrete visual (envelope of parabolas = the x-axis). Implicit solutions require comfort with implicit differentiation, so review that first.

**Student notes**

Always check: does a given function satisfy the ODE identically for all x in some interval? Substitute back and verify. For implicit solutions, differentiate implicitly and check.

**Prerequisite graph**

- Requires: math.de.ode
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Solution types connect to existence-uniqueness theory (the theorem guarantees existence of particular solutions under mild conditions), to phase plane analysis (singular points are equilibria), and to the geometry of ODE solution fields.

**Teaching hints — review triggers**

- Student cannot perform implicit differentiation
- Student is confused about what makes a function a 'solution' to an ODE
- Student does not know the difference between a family of curves and a single curve

**Spaced repetition / revision guidance**

Practice verifying both explicit and implicit solutions by substitution and implicit differentiation. Given a general solution, identify what initial condition selects a specific particular solution.

---

### Initial Value Problem

*Concept ID: `math.de.ivp` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 3h*

**Learning objective.** Set up and solve an initial value problem (IVP) for a first- or second-order ODE; interpret the initial conditions geometrically; apply the IVP framework to applied problems.

An ODE together with conditions specifying the value of the solution and its derivatives at a single point (the initial point). Determines a unique solution under appropriate smoothness conditions.

An initial value problem (IVP) consists of an ODE together with initial conditions that specify the values of the solution and its first n−1 derivatives at a single point x₀: y(x₀) = y₀, y'(x₀) = y₁, …, y^{(n-1)}(x₀) = y_{n-1}. The point x₀ is the initial point; the values y₀, y₁, … are the initial data. Geometrically, the initial conditions pick a unique solution curve from the general solution family — the one that passes through the point (x₀, y₀) with slope y₁, etc. IVPs arise naturally in physics and engineering: to determine the motion of a particle, you need not only Newton's second law (the ODE) but also where the particle starts and how fast it is moving (the initial conditions). For a first-order ODE, one initial condition y(x₀) = y₀ is needed. For a second-order ODE, two are needed: y(x₀) = y₀ and y'(x₀) = y₁. The existence-uniqueness theorem (under regularity conditions) guarantees that an IVP has exactly one solution — which is why IVPs are the primary framework for applied problems.

**Key ideas**

- IVP = ODE + initial conditions specifying y and its derivatives up to order n−1 at a single point x₀.
- One initial condition per order: an nth-order IVP needs exactly n conditions.
- Geometrically, the initial conditions select a unique solution curve from the general family.
- To solve an IVP: find the general solution, then substitute the initial conditions to determine the constants.
- IVPs model time-evolution problems: given the state now, the ODE predicts the state at any future time.

**Vocabulary**

- **initial value problem (IVP)** — An ODE together with n initial conditions specifying y(x₀), y'(x₀), …, y^{(n-1)}(x₀) at a single initial point x₀; has a unique solution under mild regularity conditions
- **initial conditions** — The data y(x₀) = y₀, y'(x₀) = y₁, …, specifying the function and its derivatives at the initial point x₀
- **interval of existence** — The largest interval I containing x₀ on which the unique IVP solution exists; may be all of ℝ or only a subinterval if the solution blows up
- **initial point x₀** — The point at which initial conditions are prescribed; typically x₀ = 0 (or t = 0 in time-evolution problems)

**Common misconceptions**

- *Misconception:* Students try to apply the initial condition before finding the general solution, substituting x₀ into the ODE rather than into the solution.
  *Correction:* Initial conditions are applied to the general solution, not to the ODE itself. The correct procedure: (1) solve the ODE to get the general solution with constants C₁, …, Cₙ; (2) substitute x = x₀ into the general solution and set equal to the initial values; (3) solve for C₁, …, Cₙ. Plugging initial data into the ODE equation produces a relationship among derivatives at one point, not a usable equation for the constants.
- *Misconception:* Students provide only one initial condition for a second-order IVP, not realizing that both y(x₀) and y'(x₀) are needed.
  *Correction:* A second-order ODE has two arbitrary constants in its general solution. To determine both uniquely, two equations are needed. y(x₀) = y₀ gives one equation; y'(x₀) = y₁ gives a second. Without both, the problem is underdetermined and infinitely many solutions satisfy the given data.
- *Misconception:* Students assume the solution to an IVP is always defined for all x ∈ ℝ.
  *Correction:* The solution to an IVP is guaranteed to exist only in some interval I containing x₀ — potentially a small one, depending on the ODE and initial data. For example, the IVP y' = y², y(0) = 1 has solution y = 1/(1−x), which blows up at x = 1 — the solution only exists on (−∞, 1), not on all of ℝ. The interval of existence is a key part of the solution.

**Common mistakes in practice**

- Applying initial conditions to the ODE rather than to the general solution
- Supplying only one initial condition for a second-order ODE
- Assuming the solution exists on all of ℝ without checking for blow-up

**Visual teaching opportunities**

- Draw a family of solution curves (parallel parabolas, concentric spirals) with one highlighted curve selected by an initial condition point.
- Diagram: solution of y' = y², y(0) = 1 showing the blow-up at x = 1 — the solution does not extend to all of ℝ.
- Physical analogy: initial conditions as specifying the state of a ball (position and velocity) at t = 0; the ODE (Newton's law) then determines all future states.

**Worked example**

*Setup:* Solve the IVP: y'' − 5y' + 6y = 0, y(0) = 1, y'(0) = 2.

1. Step 1: Find the general solution of y'' − 5y' + 6y = 0. This is a constant-coefficient homogeneous linear ODE. Try y = e^{rx}: r²e^{rx} − 5re^{rx} + 6e^{rx} = 0 → r² − 5r + 6 = 0. Roots: r = 2 and r = 3. General solution: y = C₁e^{2x} + C₂e^{3x}. Why: for a constant-coefficient linear ODE, exponential trial solutions reduce the problem to a characteristic polynomial.
2. Step 2: Apply initial condition y(0) = 1. Substitute x = 0: C₁e^0 + C₂e^0 = C₁ + C₂ = 1. Why: this gives one linear equation in the two unknowns C₁ and C₂.
3. Step 3: Compute y'. y' = 2C₁e^{2x} + 3C₂e^{3x}. Apply y'(0) = 2: 2C₁ + 3C₂ = 2. Why: differentiating the general solution and evaluating at x = 0 gives the second equation needed to determine C₁ and C₂.
4. Step 4: Solve the system. C₁ + C₂ = 1 and 2C₁ + 3C₂ = 2. From the first: C₁ = 1 − C₂. Substitute: 2(1−C₂) + 3C₂ = 2 → 2 + C₂ = 2 → C₂ = 0. Then C₁ = 1. Why: solving the 2×2 linear system gives unique constants.
5. Step 5: Write the particular solution. y = e^{2x}. Verify: y(0) = 1 ✓; y'(0) = 2e^0 = 2 ✓; y'' − 5y' + 6y = 4e^{2x} − 10e^{2x} + 6e^{2x} = 0 ✓. Why: the particular solution picks exactly the curve from the general family that passes through (0,1) with slope 2.

*Outcome:* y = e^{2x}, valid for all x ∈ ℝ. Verified by substitution into the ODE and checking both initial conditions.

**Real-world intuition**

- Projectile motion: position and velocity at t = 0 determine the trajectory for all t
- RC circuits: initial charge on capacitor determines all future charge levels
- Heat distribution: temperature at t = 0 determines temperature for all later times
- Drug pharmacokinetics: initial dose and elimination rate determine drug concentration over time

**Practice progression**

Item types: first-order-ivp, second-order-ivp, interval-of-existence-determination. Suggested item count: 6.

Solve first-order IVPs with explicit general solutions, then second-order, then determine the interval of existence for solutions that blow up.

**Assessment objectives**

Formats: solve-and-verify, explain-interval-of-existence. Bloom alignment: apply.

Mastery signal: Student correctly sets up and solves first- and second-order IVPs, applies the constants from initial conditions, and can state the interval of existence.

**Teacher notes**

Always emphasize the two-step process: (1) find the general solution, then (2) use initial conditions to find the constants. Students frequently confuse the two steps. The blow-up example y' = y², y(0) = 1 → y = 1/(1−x) is essential for combating the misconception that ODE solutions always exist globally.

**Student notes**

Procedure: solve the ODE (get general solution with constants), substitute the initial point into the solution and its derivatives, solve the resulting system for the constants.

**Prerequisite graph**

- Requires: math.de.ode, math.de.solution-types
- Unlocks (future prerequisite links): math.de.existence-uniqueness
- Cross-topic connections (graph cross-links): none
- Narrative: IVPs are the setting for the existence-uniqueness theorem; the solution of every physical ODE problem (mechanics, circuits, heat) is framed as an IVP.

**Teaching hints — review triggers**

- Student cannot solve a 2×2 linear system for two constants
- Student is confused about the difference between an ODE and an IVP
- Student has not solved any ODEs by integration (general solution unknown)

**Spaced repetition / revision guidance**

Solve IVPs in three categories: (1) first-order linear, (2) first-order separable, (3) second-order constant-coefficient. Each time verify the solution and check the initial conditions numerically.

---

### Existence and Uniqueness Theorem

*Concept ID: `math.de.existence-uniqueness` · Difficulty: expert · Bloom level: understand · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** State the Picard-Lindelöf existence and uniqueness theorem for first-order IVPs; identify its hypotheses (continuity and Lipschitz condition); explain why both existence and uniqueness can fail when hypotheses are violated.

If f(x,y) and ∂f/∂y are continuous in a rectangle around (x₀,y₀), then the IVP y′=f(x,y), y(x₀)=y₀ has a unique solution in some interval around x₀. Proved via Picard iteration.

The Picard-Lindelöf theorem (also called the existence and uniqueness theorem for ODEs) guarantees that the IVP y' = f(x, y), y(x₀) = y₀ has a unique solution on some interval containing x₀, provided f and ∂f/∂y are both continuous in a rectangle R containing (x₀, y₀). The condition that ∂f/∂y is continuous (or equivalently, that f satisfies a Lipschitz condition in y) is crucial: it prevents two different solution curves from meeting at (x₀, y₀) and branching in different directions. Without the Lipschitz condition, uniqueness can fail. Without continuity of f, even existence can fail. The theorem is local: it guarantees a solution on some small interval, not necessarily all of ℝ (a solution may blow up after a finite interval). For linear ODEs y' + p(x)y = g(x), the hypotheses are always satisfied wherever p and g are continuous, so existence and uniqueness are guaranteed on the entire interval of continuity — a stronger result. Understanding when the theorem applies (and when it doesn't) prevents the error of assuming every ODE has a unique solution.

**Key ideas**

- Picard-Lindelöf: if f(x,y) and ∂f/∂y are continuous near (x₀,y₀), the IVP y' = f(x,y), y(x₀) = y₀ has a unique local solution.
- Continuity of f ensures existence; Lipschitz condition (∂f/∂y bounded) ensures uniqueness.
- The theorem is local: uniqueness holds in a neighborhood, but the solution may blow up at a finite point.
- Without Lipschitz: non-uniqueness (y' = y^{2/3}, y(0) = 0 has infinitely many solutions).
- For linear ODEs: existence and uniqueness hold globally wherever the coefficients are continuous.

**Vocabulary**

- **Picard-Lindelöf theorem** — If f(x,y) and ∂f/∂y are continuous on a rectangle R containing (x₀,y₀), then the IVP y' = f(x,y), y(x₀) = y₀ has a unique solution on some interval (x₀−h, x₀+h)
- **Lipschitz condition** — f satisfies a Lipschitz condition in y on R if |f(x,y₁)−f(x,y₂)| ≤ L|y₁−y₂| for some constant L; implied by continuity of ∂f/∂y on a closed bounded region
- **local existence** — A solution exists on some (possibly small) interval around x₀; the theorem makes no claim about global existence
- **Picard iteration** — The constructive proof technique: start with y₀(x) = y₀ and define y_{n+1}(x) = y₀ + ∫_{x₀}^x f(t, y_n(t)) dt; these converge to the unique solution

**Common misconceptions**

- *Misconception:* Students believe the existence-uniqueness theorem guarantees a solution exists for all x ∈ ℝ.
  *Correction:* The theorem guarantees a solution exists on some interval (x₀ − h, x₀ + h) for some h > 0 — a local guarantee. The solution might blow up at a finite point. For y' = y², y(0) = 1, the theorem guarantees a solution near x = 0, and indeed y = 1/(1−x) exists — but only until x = 1, where it blows up. Global existence requires additional conditions.
- *Misconception:* Students think that if a solution exists, it must also be unique, confusing the two separate conditions of the theorem.
  *Correction:* Existence and uniqueness are separate conditions guaranteed by different hypotheses. For y' = y^{2/3}, y(0) = 0: here f = y^{2/3} is continuous, so a solution exists. But ∂f/∂y = (2/3)y^{−1/3} is not bounded near y = 0, so the Lipschitz condition fails — and indeed there are multiple solutions (y = 0 and y = (2x/3)^{3/2} for x ≥ 0) through (0, 0).
- *Misconception:* Students apply the theorem to second-order or higher ODEs without reformulating them as first-order systems.
  *Correction:* The standard theorem statement is for first-order IVPs y' = f(x, y). A second-order ODE y'' = F(x, y, y') is converted to a first-order system by setting y₁ = y, y₂ = y': then y₁' = y₂, y₂' = F(x, y₁, y₂). The theorem extends to systems of first-order ODEs, so all higher-order cases are covered by reformulation.

**Common mistakes in practice**

- Confusing local and global existence/uniqueness
- Assuming existence implies uniqueness without checking the Lipschitz condition separately
- Forgetting that the theorem is stated for y' = f(x,y) and must be reformulated for higher-order systems

**Visual teaching opportunities**

- Diagram of the rectangle R containing (x₀, y₀) where f and ∂f/∂y are continuous — the theorem's hypotheses are local to this rectangle.
- Side-by-side: unique solution (hypotheses satisfied, one curve through the point) vs. non-unique case (hypotheses fail, two curves through the same point).
- Picard iteration diagram: show successive approximations y₀, y₁, y₂, … converging to the solution — connecting the theorem's proof strategy to the conclusion.

**Worked example**

*Setup:* For each IVP, determine whether the existence-uniqueness theorem guarantees a unique solution near the given point: (a) y' = x·sin(y), y(0) = 0; (b) y' = √y, y(1) = 0; (c) y' = y^{2/3}, y(0) = 0.

1. Step 1: (a) f(x,y) = x·sin(y). Check continuity: x·sin(y) is continuous everywhere. Check ∂f/∂y = x·cos(y): also continuous everywhere. Both conditions hold at (0,0). Theorem guarantees unique solution. Why: all hypotheses are satisfied at the initial point.
2. Step 2: (b) y' = √y, y(1) = 0. f(x,y) = √y = y^{1/2}. At (1,0): f(1,0) = 0, continuous. ∂f/∂y = (1/2)y^{−1/2} → ∞ as y → 0⁺. Not bounded near y = 0. Lipschitz condition fails. Theorem does NOT guarantee uniqueness. Why: the derivative blows up at the initial point, signaling potential non-uniqueness.
3. Step 3: (b) continued — check for non-uniqueness. y = 0 is one solution (y' = 0 = √0). Also y = (x−1)²/4 for x ≥ 1: y' = (x−1)/2 and √y = (x−1)/2. ✓ Two distinct solutions through (1,0). Confirms non-uniqueness. Why: explicitly finding two solutions proves uniqueness fails.
4. Step 4: (c) f(x,y) = y^{2/3}. At (0,0): ∂f/∂y = (2/3)y^{−1/3} → ∞ as y → 0. Lipschitz fails. Solutions through (0,0): y = 0 and y = (2x/3)^{3/2} for x ≥ 0. Non-unique. Why: same Lipschitz failure as (b), with the same consequence of multiple solutions.
5. Step 5: Summarize. The theorem requires BOTH f continuous AND ∂f/∂y continuous (bounded near the initial point). If only one holds, one conclusion (existence or uniqueness) may fail. Verifying the hypotheses before assuming a unique solution exists is not optional — it is the foundation of rigorous ODE theory. Why: engineering/physics applications implicitly assume uniqueness, but mathematical rigor demands verifying it.

*Outcome:* (a) unique solution guaranteed; (b) no uniqueness guarantee, confirmed by finding two solutions; (c) no uniqueness guarantee, confirmed by two solutions.

**Real-world intuition**

- Guaranteeing predictability: in physical systems, the theorem justifies that initial state uniquely determines future evolution
- Numerical methods (Euler, Runge-Kutta) assume unique solutions exist — understanding when this fails is essential for numerical analysis
- Biochemical kinetics: Michaelis-Menten equations have Lipschitz conditions that guarantee unique concentration trajectories

**Practice progression**

Item types: hypothesis-verification, counterexample-construction, global-vs-local-existence-discussion. Suggested item count: 5.

Verify hypotheses for standard examples, then construct non-uniqueness examples, then discuss linear ODEs where global existence is guaranteed.

**Assessment objectives**

Formats: theorem-application, counterexample-identification, short-proof-sketch. Bloom alignment: understand.

Mastery signal: Student can state the theorem precisely, verify its hypotheses for given IVPs, and construct counterexamples when hypotheses fail.

**Teacher notes**

The existence-uniqueness theorem is the theoretical foundation underlying everything practitioners take for granted. Spend time on the non-uniqueness example (y' = y^{2/3}) to make the theorem's necessity visceral. The Picard iteration construction is optional but beautiful — it shows that the solution is 'built' by repeated approximation.

**Student notes**

To apply the theorem: identify f(x,y), compute ∂f/∂y, check both are continuous near the initial point. If yes: unique solution guaranteed locally. If ∂f/∂y blows up at the initial point: uniqueness may fail.

**Prerequisite graph**

- Requires: math.de.ivp, math.real.lipschitz-continuity
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.real.fixed-point-theorem
- Narrative: Underpins numerical ODE solvers (Euler's method, Runge-Kutta), which require unique solutions. Connects to stability analysis and the theory of autonomous systems.

**Teaching hints — review triggers**

- Student is unfamiliar with the concept of a Lipschitz condition or continuity near a point
- Student does not know what an IVP is (covered in math.de.ivp)
- Student cannot check whether a partial derivative is bounded near a point

**Spaced repetition / revision guidance**

Memorize the theorem statement precisely. Practice applying it to 5 IVPs where you check continuity of f and ∂f/∂y systematically. Construct one non-uniqueness example from scratch.

---

### First-Order ODE

*Concept ID: `math.de.first-order-ode` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 6h*

**Learning objective.** Categorize a first-order ODE by type (separable, linear, exact, Bernoulli, homogeneous); select the appropriate solution method for each type; carry out the solution procedure for standard first-order ODEs.

An ODE involving only the first derivative y′. Solution methods include separation of variables, integrating factors, exact equations, substitution, and Bernoulli's equation technique.

A first-order ODE has the form F(x, y, y') = 0 or y' = f(x, y), where only the first derivative appears. This single form encompasses many qualitatively different equations, each with its own standard solution technique. The major classes are: (1) Separable: f(x,y) = g(x)h(y), solved by separating and integrating both sides. (2) Linear: y' + P(x)y = Q(x), solved by the integrating factor μ = e^{∫P dx}. (3) Exact: M dx + N dy = 0 with M_y = N_x, solved by finding a potential function F(x,y). (4) Bernoulli: y' + P(x)y = Q(x)yⁿ, linearized by v = y^{1−n}. (5) Homogeneous: y' = f(y/x), solved by v = y/x substitution. Identifying the type is the first step; each type has a systematic algorithm. Misidentifying the type leads to applying the wrong method and obtaining no progress. The linear integrating factor method is the most important: it solves all linear first-order ODEs and illustrates the principle of 'multiplying by something clever' to make an equation exact.

**Key ideas**

- First-order ODEs fall into several standard types: separable, linear, exact, Bernoulli, homogeneous — each with its own solution algorithm.
- Type identification before computation is essential: wrong type → wrong method → no solution.
- Linear first-order: y' + P(x)y = Q(x); the integrating factor μ = e^{∫P dx} converts it to an exact derivative.
- Separable: y' = g(x)h(y); separate, integrate both sides, solve implicitly or explicitly.
- Every first-order linear ODE has a unique solution through any point where P and Q are continuous.

**Vocabulary**

- **separable ODE** — A first-order ODE of the form y' = g(x)h(y); solved by dy/h(y) = g(x) dx, then integrating both sides
- **integrating factor** — A function μ(x) = e^{∫P(x)dx} that, when multiplying both sides of y' + P(x)y = Q(x), converts the left side into d/dx(μy)
- **linear first-order ODE** — An ODE of the form y' + P(x)y = Q(x); P and Q are functions of x only; solved by the integrating factor method
- **Bernoulli equation** — A nonlinear ODE y' + P(x)y = Q(x)yⁿ (n ≠ 0, 1); linearized by the substitution v = y^{1−n}

**Common misconceptions**

- *Misconception:* Students try to apply the separation of variables to every first-order ODE, even linear ones that are not separable.
  *Correction:* An ODE y' = f(x,y) is separable only if f(x,y) can be written as a product g(x)·h(y). For example, y' + y = x is linear but NOT separable: f(x,y) = x − y cannot be split as g(x)h(y). Attempting separation on a non-separable equation leads to an impossible step. Always check separability first: can f be factored as a function of x alone times a function of y alone?
- *Misconception:* Students omit the constant of integration when computing the integrating factor μ = e^{∫P dx}.
  *Correction:* When computing μ = e^{∫P dx}, the antiderivative of P(x) is correct without the +C, because the constant would multiply both sides by the same e^C factor and cancel. Formally: any particular antiderivative of P works as the exponent. Including +C produces μ = e^{∫P dx + C} = e^C · e^{∫P dx}, but since e^C is a nonzero constant that will cancel in the final formula, we conventionally choose C = 0.
- *Misconception:* Students apply the integrating factor formula to nonlinear ODEs (e.g., y' + P(x)y = Q(x)yⁿ for n ≠ 0,1) without first linearizing via a substitution.
  *Correction:* The integrating factor method applies only to linear first-order ODEs: y' + P(x)y = Q(x). The Bernoulli equation y' + P(x)y = Q(x)yⁿ is nonlinear for n ≠ 0, 1. The first step is to linearize: divide by yⁿ and substitute v = y^{1−n}, which transforms the Bernoulli equation into a linear ODE in v. Only then apply the integrating factor.

**Common mistakes in practice**

- Attempting separation on a non-separable equation
- Omitting the constant of integration in the integrating factor exponent (harmless) vs. in the final integration (fatal)
- Dividing by zero when separating variables (e.g., h(y) = 0 is a singular solution)

**Visual teaching opportunities**

- Flowchart: given a first-order ODE, run through a decision tree: separable? → linear? → exact? → Bernoulli? → homogeneous substitution?
- Side-by-side comparison of solution steps for a separable vs. a linear ODE with similar-looking forms.
- Slope field visualization: show the general solution family as a collection of curves all obeying the slope constraint y' = f(x,y) at each point.

**Worked example**

*Setup:* Classify and solve: (a) y' = 2xy; (b) y' + 2y = e^x.

1. Step 1: (a) y' = 2xy. Check: f(x,y) = 2xy = (2x)(y) = g(x)·h(y). Separable. Separate: dy/y = 2x dx. Why: move all y to one side, all x to the other.
2. Step 2: (a) Integrate both sides: ∫dy/y = ∫2x dx → ln|y| = x² + C. Exponentiate: |y| = e^{x²+C} = e^C·e^{x²}. Write y = Ae^{x²} (A = ±e^C, any nonzero constant; A = 0 gives y = 0 also works). General solution: y = Ae^{x²}. Why: integration produces the arbitrary constant A.
3. Step 3: (b) y' + 2y = e^x. Check form y' + P(x)y = Q(x): P(x) = 2, Q(x) = e^x. Linear, not separable (because of the +e^x term). Use integrating factor. Why: the equation has P(x)·y plus a right-hand side, making it linear.
4. Step 4: Compute μ = e^{∫2 dx} = e^{2x}. Multiply both sides: e^{2x}y' + 2e^{2x}y = e^{3x}. The left side is d/dx(e^{2x}y). Write: d/dx(e^{2x}y) = e^{3x}. Why: the integrating factor makes the left side a perfect derivative — the product rule in reverse.
5. Step 5: Integrate both sides: e^{2x}y = ∫e^{3x} dx = e^{3x}/3 + C. Divide by e^{2x}: y = e^x/3 + Ce^{−2x}. General solution: y = e^x/3 + Ce^{−2x}. Why: dividing by μ recovers y; the arbitrary constant C parametrizes the family.

*Outcome:* (a) y = Ae^{x²}; (b) y = e^x/3 + Ce^{−2x}. Both verified by substitution into their respective ODEs.

**Real-world intuition**

- Separable: radioactive decay y' = −λy, compound interest y' = ry
- Linear: RC circuit with varying voltage source, drug elimination in the body
- Bernoulli: logistic population growth dP/dt = rP(1 − P/K) (becomes linear in 1/P)
- General: any single-compartment physical or chemical system with one state variable

**Practice progression**

Item types: type-classification, separable-solution, linear-integrating-factor, ivp-with-first-order. Suggested item count: 8.

Classify and solve simple separable and linear ODEs, then apply to IVPs, then handle equations requiring substitution (Bernoulli, homogeneous).

**Assessment objectives**

Formats: classify-and-solve, ivp-solution, short-method-justification. Bloom alignment: apply.

Mastery signal: Student correctly identifies the ODE type and applies the appropriate method to produce the correct general or particular solution.

**Teacher notes**

The flowchart for type identification is the most practical tool you can give students. Drill the integrating factor method until it is automatic — it recurs throughout the course. Emphasize that the integrating factor step converts the left side into a perfect derivative, which is the key insight.

**Student notes**

Step 1 is always: identify the type. Step 2: apply the method for that type. Do NOT start computing before you know which method to use.

**Prerequisite graph**

- Requires: math.de.ode, math.calc.antiderivatives, math.calc.u-substitution
- Unlocks (future prerequisite links): math.de.second-order-ode
- Cross-topic connections (graph cross-links): none
- Narrative: First-order ODE methods are the foundation for all higher-order methods. The integrating factor idea generalizes to matrix exponentials for systems of ODEs.

**Teaching hints — review triggers**

- Student cannot identify whether an ODE is separable (factor f as g(x)h(y))
- Student does not know how to compute e^{∫P dx} (integrating factor)
- Student has not covered the basic ODE types: separable and linear are the minimum

**Spaced repetition / revision guidance**

Create a personal reference sheet: 5 ODE types, their identifying features, and solution steps in one view. Practice until you can identify the type of any first-order ODE in under 30 seconds.

---

### Separable Differential Equation

*Concept ID: `math.de.separable` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** Identify a separable first-order ODE; apply the separation of variables technique to find the general solution (explicit or implicit); handle the case where h(y) = 0 produces singular solutions.

An ODE of the form dy/dx = g(x)h(y); rearranged as dy/h(y) = g(x)dx and integrated on both sides. One of the most elementary solution techniques.

A separable differential equation is one that can be written in the form dy/dx = g(x)h(y), where the right-hand side factors into a function of x alone times a function of y alone. The solution method is direct: rewrite as dy/h(y) = g(x) dx (moving all y-terms to one side and all x-terms to the other), then integrate both sides independently. The left-hand integral ∫ dy/h(y) = H(y) and the right-hand integral ∫ g(x) dx = G(x) combine to give an implicit solution H(y) = G(x) + C. If this can be solved for y, an explicit solution results; if not, the implicit form is the answer. The method is justified formally by the chain rule: if y = y(x) satisfies the ODE, then multiplying both sides of dy/dx = g(x)h(y) by dx/(h(y)) and integrating is equivalent to substituting y = y(x) into ∫dy/h(y) and using the chain rule. A subtlety: the step dy/h(y) requires h(y) ≠ 0. The values y₀ where h(y₀) = 0 are equilibrium solutions (constant solutions y = y₀); they satisfy the ODE and may or may not be obtainable from the general solution for some choice of C.

**Key ideas**

- Separable: dy/dx = g(x)h(y); separation regroups to dy/h(y) = g(x) dx.
- Integrate both sides independently: ∫dy/h(y) = ∫g(x) dx + C.
- The result may be an implicit solution H(y) = G(x) + C; explicit form may or may not be achievable.
- Equilibrium solutions y = y₀ (where h(y₀) = 0) may be singular solutions lost during separation.
- Always check that the separated form is valid: dividing by h(y) requires h(y) ≠ 0.

**Vocabulary**

- **separable ODE** — A first-order ODE dy/dx = g(x)h(y) where the right side factors as a product of functions of x and y separately
- **equilibrium solution** — A constant solution y = y₀ where h(y₀) = 0; satisfies the ODE trivially (dy/dx = 0 = g(x)·0) and may be a singular solution not captured by the general family
- **implicit solution** — A relation H(y) = G(x) + C that defines y implicitly without an explicit formula y = φ(x); arises when H is not easily invertible
- **separation of variables** — The technique of rewriting dy/dx = g(x)h(y) as dy/h(y) = g(x) dx and integrating both sides independently to obtain the general solution

**Common misconceptions**

- *Misconception:* Students separate variables and write ∫dy/h(y) = ∫g(x) dx without any constant of integration, then are surprised when they cannot satisfy an initial condition.
  *Correction:* The constant of integration C is essential and appears after integrating one side. Technically, integrating both sides produces H(y) + C₁ = G(x) + C₂, but the two constants combine into one: H(y) = G(x) + C. Omitting C produces only one particular solution (the one passing through a specific curve), making it impossible to satisfy an arbitrary initial condition.
- *Misconception:* Students separate dy/dx = (x+1)/(y+2) into (y+2)dy = (x+1)dx and then write y²/2 + 2y = x²/2 + x, forgetting the +C.
  *Correction:* After integrating: ∫(y+2) dy = ∫(x+1) dx gives y²/2 + 2y = x²/2 + x + C. The constant C belongs on only one side (by convention the right-hand side). Without C, the equation represents a single curve, not the general solution family.
- *Misconception:* Students lose the equilibrium solution y = y₀ (where h(y₀) = 0) by dividing by h(y) without checking for these special values.
  *Correction:* Before separating, check whether h(y) = 0 for some constant y = y₀. Each such y₀ is a constant (equilibrium) solution y ≡ y₀, obtained by substituting: dy/dx = 0 = g(x)·0 ✓. Determine whether this equilibrium is included in the general solution family or is a singular solution. In either case, it must be reported as a solution.

**Common mistakes in practice**

- Omitting the constant of integration C
- Not checking for equilibrium solutions y₀ where h(y₀) = 0
- Dividing by h(y) when h(y) = 0 for some y values without noting the lost solutions

**Visual teaching opportunities**

- Show the 'separating' step visually: the ODE dy/dx = g(x)h(y) as a product, then the formal multiplication by dx/(h(y)) to 'move the variables apart'.
- Plot the family of implicit solution curves H(y) = G(x) + C for several values of C on the same axes.
- Highlight equilibrium solutions y = y₀ as horizontal lines in the direction field.

**Worked example**

*Setup:* Solve the IVP: dy/dx = (x² + 1) / (y + 1), y(0) = 2.

1. Step 1: Identify as separable. f(x,y) = (x²+1)/(y+1) = (x²+1) · 1/(y+1) = g(x)·h(y) with g(x) = x²+1, h(y) = 1/(y+1). Separable. Why: the right-hand side factors as a product of a function of x and a function of y.
2. Step 2: Check for equilibria. h(y) = 1/(y+1) = 0 has no solution (1/(y+1) is never zero). No equilibrium solutions to check. Separate: (y+1) dy = (x²+1) dx. Why: multiply both sides by (y+1)dx, moving all y-terms left and all x-terms right.
3. Step 3: Integrate both sides. ∫(y+1) dy = ∫(x²+1) dx → y²/2 + y = x³/3 + x + C. Why: standard integration of polynomial terms; one constant of integration on the right.
4. Step 4: Apply initial condition y(0) = 2. Substitute x = 0, y = 2: 4/2 + 2 = 0 + 0 + C → 2 + 2 = C → C = 4. Particular implicit solution: y²/2 + y = x³/3 + x + 4. Why: substituting the initial point determines C.
5. Step 5: Verify. Implicit differentiation: (y + 1)y' = x² + 1 → y' = (x²+1)/(y+1) ✓. At x=0: y'(0) = 1/(y(0)+1) = 1/3 — this is the initial slope consistent with the ODE at the initial point. The implicit solution y²/2 + y = x³/3 + x + 4 cannot be solved explicitly for y in elementary form, so the implicit form is the final answer. Why: many separable ODEs produce implicit solutions that cannot be made explicit.

*Outcome:* Implicit solution y²/2 + y = x³/3 + x + 4, verified by implicit differentiation.

**Real-world intuition**

- Radioactive decay: dN/dt = −λN → N = N₀e^{−λt} (separable, exponential solution)
- Newton's law of cooling: dT/dt = −k(T − T_env) (separable, exponential approach to equilibrium)
- Logistic growth: dP/dt = rP(1 − P/K) (separable, solved by partial fractions)
- Velocity-dependent drag: m dv/dt = mg − bv (separable, describes terminal velocity)

**Practice progression**

Item types: separable-general-solution, ivp-via-separation, equilibrium-solution-identification. Suggested item count: 7.

Straightforward separation with explicit solutions, then implicit solutions, then cases with equilibrium solutions, then IVPs.

**Assessment objectives**

Formats: solve-ivp, verify-implicit-solution, identify-equilibria. Bloom alignment: apply.

Mastery signal: Student correctly identifies a separable ODE, separates variables, integrates both sides with a constant, and applies initial conditions; identifies equilibrium solutions.

**Teacher notes**

Emphasize the formal validity of 'moving dy to one side' — it is justified by the chain rule in the integration step. Students who are bothered by the 'multiply by dx' shorthand can be shown the rigorous version: the step is equivalent to making the substitution u = y(x) in the left integral. Always check for equilibria before separating.

**Student notes**

Three-step recipe: (1) verify separability by factoring f(x,y). (2) Separate: dy/h(y) = g(x) dx. (3) Integrate both sides, add C on one side, apply initial conditions if given.

**Prerequisite graph**

- Requires: math.de.first-order-ode, math.calc.definite-integral
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Separation of variables is the simplest integration-based ODE technique; it generalizes conceptually to PDEs (separation of variables in Cartesian, cylindrical, spherical coordinates). Equilibrium solutions connect to stability analysis and phase plane methods.

**Teaching hints — review triggers**

- Student cannot factor f(x,y) into g(x)·h(y) by inspection
- Student cannot integrate standard functions (polynomials, 1/y, e^y, trig)
- Student does not include the constant of integration

**Spaced repetition / revision guidance**

Solve 10 separable ODEs: 5 with explicit solutions, 5 with implicit solutions. For each, verify by implicit differentiation and check for equilibria.

---

### Linear First-Order ODE

*Concept ID: `math.de.linear-first-order` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 5h*

**Learning objective.** Solve a linear first-order ODE y' + P(x)y = Q(x) by computing the integrating factor μ(x) = e^{∫P dx} and reducing the equation to an exact derivative.

An ODE of the form y′ + P(x)y = Q(x). Solved by multiplying by the integrating factor μ(x)=e^{∫P dx}, making the left side an exact derivative.

A linear first-order ODE has the standard form y' + P(x)y = Q(x), where P and Q are continuous functions of x. The key insight is that multiplying both sides by μ(x) = e^{∫P(x)dx} transforms the left side into d/dx[μ(x)y], enabling direct integration. The integrating factor method is systematic: find μ, multiply through, recognize the left side as (μy)', integrate both sides, and solve for y. This method generalizes separable ODEs and handles the full linear first-order class, including equations describing mixing, cooling, and population growth with harvesting.

**Key ideas**

- Standard form y' + P(x)y = Q(x) must be established before applying the method
- Integrating factor μ(x) = e^{∫P(x)dx} converts the left side to an exact derivative d/dx[μy]
- After multiplying by μ, integrate both sides: μy = ∫μQ dx + C
- The constant of integration C is determined by an initial condition
- The solution is y = (1/μ)[∫μQ dx + C], always defined where P and Q are continuous

**Vocabulary**

- **integrating factor** — A multiplier μ(x) = e^{∫P dx} chosen so that μ(y' + Py) = d/dx[μy], converting the ODE to an exact derivative.
- **standard form** — The presentation y' + P(x)y = Q(x) with coefficient of y' equal to 1; required before computing the integrating factor.
- **exact derivative** — An expression that equals d/dx[something], enabling direct integration without needing to expand.

**Common misconceptions**

- *Misconception:* The integrating factor method applies to any first-order ODE
  *Correction:* It applies only when the ODE can be written in the linear standard form y' + P(x)y = Q(x). Nonlinear terms like y² or sin(y) disqualify the equation from this class.
- *Misconception:* You only need μ(x) = e^{P(x)}, forgetting the integral
  *Correction:* The integrating factor is μ(x) = e^{∫P(x)dx}, the exponential of the antiderivative of P, not of P itself. Forgetting the integral gives the wrong factor and a non-exact derivative on the left.
- *Misconception:* After multiplying by μ, the right side also simplifies automatically
  *Correction:* Only the left side simplifies to d/dx[μy]. The right side μQ must be integrated as written — there is no further simplification unless μQ happens to be a recognizable function.

**Common mistakes in practice**

- Forgetting to rewrite the ODE in standard form before computing P(x)
- Writing μ = e^{P(x)} instead of μ = e^{∫P(x)dx}
- Omitting the constant of integration after integrating the right side
- Not dividing by μ at the final step to isolate y

**Visual teaching opportunities**

- Side-by-side algebra showing left side before and after multiplying by μ, with the exact-derivative structure highlighted
- Flowchart: write in standard form → compute ∫P dx → exponentiate → multiply → recognize d/dx[μy] → integrate → solve for y
- Family of solution curves for y' + y = e^{-x} over different initial conditions, showing how C shifts the curve vertically

**Worked example**

*Setup:* Solve the IVP y' + (2/x)y = x², y(1) = 2.

1. Step 1: Confirm standard form. P(x) = 2/x, Q(x) = x². Why: must identify P and Q before computing the integrating factor.
2. Step 2: Compute integrating factor. ∫P dx = ∫(2/x)dx = 2 ln|x| = ln(x²), so μ(x) = e^{ln(x²)} = x². Why: the exponential and logarithm cancel cleanly, giving the polynomial factor x².
3. Step 3: Multiply both sides by μ = x². Left: x²y' + 2xy = d/dx[x²y]. Right: x² · x² = x⁴. Why: the left side is now an exact derivative by construction of μ.
4. Step 4: Integrate both sides. x²y = ∫x⁴ dx = x⁵/5 + C. Why: the left side integrates trivially as d/dx[x²y] → x²y.
5. Step 5: Solve for y. y = x³/5 + C/x². Why: divide through by x² to isolate y.
6. Step 6: Apply IC y(1) = 2. 2 = 1/5 + C, so C = 9/5. Final solution: y = x³/5 + 9/(5x²). Why: the initial condition pins the unique member of the solution family.

*Outcome:* y = x³/5 + 9/(5x²), which can be verified by differentiation: y' = 3x²/5 − 18/(5x³); y' + (2/x)y = 3x²/5 − 18/(5x³) + 2x²/5 + 18/(5x³) = x². ✓

**Real-world intuition**

- Salt-tank mixing problems: rate of change of salt = rate in − rate out, giving a linear ODE
- Newton's law of cooling with time-varying ambient temperature
- RC circuits: dV/dt + V/RC = V_in(t)/RC is a linear first-order ODE for capacitor voltage
- Population with constant harvesting: dP/dt = rP − H

**Practice progression**

Item types: find integrating factor only, solve linear ODE (no IC), solve IVP (with IC), identify standard form from a non-standard presentation. Suggested item count: 7.

Start with constant P(x) = k (μ = e^{kx}), then polynomial P, then P = 1/x (μ = x^n), then trigonometric P

**Assessment objectives**

Formats: solve IVP showing all steps, identify which ODEs are linear first-order, verify a claimed solution by substitution. Bloom alignment: apply.

Mastery signal: Correctly computes μ, rewrites left side as exact derivative, integrates, applies IC, and verifies by substitution in ≥ 4 of 5 problems

**Teacher notes**

Emphasize the algebraic check: after multiplying by μ, students should verify the left side is literally d/dx[μy] by expanding the derivative via the product rule — this confirmation step prevents errors from a mis-computed μ.

**Student notes**

The integrating factor is a multiplier you engineer so the left side becomes an exact derivative. Once you see d/dx[μy] on the left, the hardest part is done — just integrate both sides and divide by μ.

**Prerequisite graph**

- Requires: math.de.first-order-ode, math.de.ode-linearity, math.calc.u-substitution
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The integrating factor method is the ODE analog of u-substitution (math.calc.u-substitution): both find a clever transformation that converts a hard integral into a tractable one. Exact ODEs (math.de.exact-ode) generalize the same idea to two-variable potential functions.

**Teaching hints — review triggers**

- Student cannot write the ODE in standard form (divide through by leading coefficient)
- Student computes ∫P dx incorrectly (substitution or logarithm rules needed)
- Student fails to recognize d/dx[μy] on the left side after multiplication
- Student drops the constant of integration after integrating both sides

**Spaced repetition / revision guidance**

If solving feels mechanical, revisit what 'exact derivative' means: d/dx[μy] = μy' + μ'y by the product rule, so μ must satisfy μ' = μP — that's exactly where μ = e^{∫P dx} comes from. Understanding the origin of μ eliminates memorization.

---

### Exact Differential Equation

*Concept ID: `math.de.exact-ode` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Identify an exact ODE M dx + N dy = 0 by checking ∂M/∂y = ∂N/∂x, then find the potential function F(x,y) such that F_x = M and F_y = N and write the solution as F(x,y) = C.

An ODE M(x,y)dx + N(x,y)dy = 0 where ∂M/∂y = ∂N/∂x. Solution is found by identifying a potential function F such that dF=0.

A first-order ODE written as M(x,y)dx + N(x,y)dy = 0 is exact if the mixed partial derivatives match: ∂M/∂y = ∂N/∂x. This exactness condition is the integrability condition guaranteeing a potential function F exists with dF = M dx + N dy = 0. The solution is then F(x,y) = C implicitly. To find F: integrate M with respect to x to get F = ∫M dx + g(y), then differentiate with respect to y and set F_y = N to determine g(y). The method is the ODE counterpart of finding a conservative field in vector calculus.

**Key ideas**

- Exactness condition: ∂M/∂y = ∂N/∂x must hold before the method applies
- The potential function F satisfies F_x = M and F_y = N simultaneously
- Finding F: integrate M over x to get a partial antiderivative, then use F_y = N to find the y-integration function g(y)
- The solution is the implicit equation F(x,y) = C
- If the ODE is not exact, an integrating factor μ(x) or μ(y) can sometimes make it exact

**Vocabulary**

- **exact ODE** — An ODE M dx + N dy = 0 satisfying ∂M/∂y = ∂N/∂x, guaranteeing the existence of a potential function F with M dx + N dy = dF.
- **potential function** — A function F(x,y) such that F_x = M and F_y = N; the solution to an exact ODE is F(x,y) = C.
- **exactness condition** — The test ∂M/∂y = ∂N/∂x; it is necessary and sufficient (on a simply connected domain) for exactness.

**Common misconceptions**

- *Misconception:* Any first-order ODE M dx + N dy = 0 is automatically exact
  *Correction:* The exactness test ∂M/∂y = ∂N/∂x must be verified first. If it fails, the equation is not exact and the standard procedure does not apply without first finding an integrating factor.
- *Misconception:* After integrating M over x to get F, the function g(y) is just a constant
  *Correction:* g(y) is an unknown function of y, not a constant. It is determined by differentiating F with respect to y and setting the result equal to N, then integrating. Treating g as a constant yields a wrong F.
- *Misconception:* The solution is F(x,y) = 0, not F(x,y) = C
  *Correction:* The solution is F(x,y) = C for an arbitrary constant C. Setting C = 0 is only valid if the initial condition forces it; in general C is a free parameter representing the solution family.

**Common mistakes in practice**

- Mixing up ∂M/∂y and ∂M/∂x in the exactness test
- Treating g(y) as a constant rather than an unknown function
- Forgetting to check exactness first and applying the potential-function algorithm to a non-exact ODE
- Writing the solution as F(x,y) = 0 instead of F(x,y) = C

**Visual teaching opportunities**

- Level-curve diagram of F(x,y): the solution curves are the level sets F = C, illustrated for a specific F like x²y + y³
- Two-column layout showing the partial derivative test on the left and the g(y) recovery step on the right
- Analogy figure: exact ODE ↔ conservative vector field (M,N) ↔ gradient of F, with the curl = 0 condition corresponding to ∂M/∂y = ∂N/∂x

**Worked example**

*Setup:* Solve (2xy + 3)dx + (x² − 4y)dy = 0.

1. Step 1: Identify M = 2xy + 3 and N = x² − 4y. Why: must name the components before testing exactness.
2. Step 2: Test exactness. ∂M/∂y = 2x; ∂N/∂x = 2x. Equal, so the equation is exact. Why: confirms a potential function F exists.
3. Step 3: Integrate M over x. F = ∫(2xy + 3)dx = x²y + 3x + g(y). Why: partial antiderivative; g(y) plays the role of the integration 'constant' for the x-integration.
4. Step 4: Differentiate F over y and set equal to N. ∂F/∂y = x² + g'(y) = x² − 4y. So g'(y) = −4y. Why: matching the y-derivative of F to N determines g.
5. Step 5: Integrate g'(y) = −4y to get g(y) = −2y². Why: a simple antiderivative; no additional constant needed (it merges into the solution constant C).
6. Step 6: Write the potential function. F(x,y) = x²y + 3x − 2y². Why: complete F from steps 3 and 5.
7. Step 7: State the solution. x²y + 3x − 2y² = C. Why: the ODE is dF = 0, so F is constant along each solution curve.

*Outcome:* x²y + 3x − 2y² = C. Verification: d/dx[x²y + 3x − 2y²] = (2xy + 3) + (x² − 4y)y' = 0 ✓ when rearranged as M + Ny' = 0.

**Real-world intuition**

- Thermodynamics: exact differentials dU = T dS − P dV represent state functions; inexact differentials represent path-dependent quantities
- Conservative force fields: F·dr = 0 along any closed path when ∂M/∂y = ∂N/∂x (2D curl = 0)
- Chemical potential: exact ODEs appear in equilibrium conditions relating pressure, temperature, and concentration

**Practice progression**

Item types: exactness test only (is it exact?), find potential function F given M and N, solve exact ODE to get F = C, apply IC to find specific C. Suggested item count: 6.

Start with polynomial M and N, then include exponentials, then cases requiring an integrating factor

**Assessment objectives**

Formats: solve from scratch showing exactness test, identify error in a worked solution where g(y) was treated as a constant, verify a given F is the correct potential function. Bloom alignment: apply.

Mastery signal: Correctly checks exactness, integrates M over x, recovers g(y) via F_y = N, and writes implicit solution in ≥ 4 of 5 problems without algebraic errors

**Teacher notes**

Many students compute ∂M/∂y and ∂N/∂x but transpose which partial goes with which: ∂M/∂y differentiates M with respect to y (the 'off' variable), and similarly for ∂N/∂x. A mnemonic: cross-partials must match.

**Student notes**

Think of M dx + N dy as the total differential of some hidden function F. Finding F is like finding the antiderivative in two variables: integrate M over x treating y as a parameter, then use the y-derivative condition to nail down g(y).

**Prerequisite graph**

- Requires: math.de.first-order-ode, math.calc.partial-derivatives
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Exact ODEs are the 1D special case of conservative vector fields (math.calc.vector-fields): the condition ∂M/∂y = ∂N/∂x is precisely the 2D curl = 0 condition. Green's theorem (math.calc.greens-theorem) gives the topological reason why curl = 0 implies a potential exists on simply connected domains.

**Teaching hints — review triggers**

- Student cannot compute partial derivatives ∂M/∂y or ∂N/∂x
- Student treats g(y) as a constant during the F-recovery step
- Student confuses integrating over x (holding y fixed) with total differentiation

**Spaced repetition / revision guidance**

If stuck on g(y), remember: you already know F partially from step 3. Differentiate that partial F with respect to y — the result should match N, and the discrepancy tells you g'(y). This is a pure algebra step, not a new integration from scratch.

---

### Bernoulli Equation

*Concept ID: `math.de.bernoulli` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 3h*

**Learning objective.** Solve a Bernoulli equation y' + P(x)y = Q(x)yⁿ by applying the substitution v = y^{1−n} to reduce it to a linear first-order ODE in v, then solve for v and recover y.

An ODE of the form y′ + P(x)y = Q(x)yⁿ. Linearized by the substitution v = y^{1-n}, converting to a linear first-order ODE in v.

The Bernoulli equation y' + P(x)y = Q(x)yⁿ is nonlinear for n ≠ 0,1 because of the yⁿ term on the right. The substitution v = y^{1−n} linearizes it: dividing both sides by yⁿ and substituting transforms the equation into v' + (1−n)P(x)v = (1−n)Q(x), a linear first-order ODE in v. This is then solved by the integrating factor method. After finding v, recover y via y = v^{1/(1−n)}. The technique illustrates a recurring theme in ODEs: a well-chosen substitution converts a nonlinear problem into a solved linear class.

**Key ideas**

- Bernoulli equations are nonlinear (due to yⁿ) but reducible to linear via substitution
- Substitution v = y^{1−n} transforms the equation; n = 0 and n = 1 are already linear
- After substituting, the equation becomes the linear ODE v' + (1−n)P(x)v = (1−n)Q(x)
- Solve the linear ODE for v using the integrating factor, then recover y = v^{1/(1−n)}
- n < 0 is also valid and typically gives similar algebra

**Vocabulary**

- **Bernoulli equation** — The nonlinear first-order ODE y' + P(x)y = Q(x)yⁿ (n ≠ 0,1), reducible to linear form via v = y^{1−n}.
- **linearizing substitution** — A change of variable that converts a nonlinear ODE into a linear one; v = y^{1−n} is the linearizing substitution for Bernoulli equations.

**Common misconceptions**

- *Misconception:* The substitution is v = yⁿ, not v = y^{1−n}
  *Correction:* The correct substitution is v = y^{1−n}. Then v' = (1−n)y^{−n}y', and dividing the original equation by yⁿ produces v'/(1−n) + Pv = Q, which rearranges to a linear ODE. Using v = yⁿ does not linearize the equation.
- *Misconception:* For n = 1, the Bernoulli method is needed
  *Correction:* When n = 1, the equation y' + P(x)y = Q(x)y is already separable (rewrite as y'/(y) = Q − P, separate variables). Similarly n = 0 gives the standard linear form. The Bernoulli substitution is needed only for n ≠ 0,1.
- *Misconception:* After solving for v, the answer is v, not y
  *Correction:* The answer to the original problem is y, not v. Since v = y^{1−n}, recover y = v^{1/(1−n)}. Forgetting to back-substitute leaves the answer in the wrong variable.

**Common mistakes in practice**

- Using the wrong exponent in the substitution (v = yⁿ instead of y^{1−n})
- Not multiplying the right side by (1−n) after substituting
- Forgetting to back-substitute v → y at the end

**Visual teaching opportunities**

- Before/after diagram: original Bernoulli ODE (nonlinear, yⁿ on right) → substitution → linear ODE in v (standard integrating-factor form)
- Step-by-step substitution algebra displayed side-by-side with the linear ODE it produces
- Graph of solution y(x) for a specific Bernoulli equation compared with the v(x) intermediate step, showing the nonlinear shape of y

**Worked example**

*Setup:* Solve y' − (3/x)y = x³y⁴.

1. Step 1: Identify n = 4. P(x) = −3/x, Q(x) = x³. Why: establish the structure before choosing the substitution.
2. Step 2: Divide both sides by y⁴. y'/y⁴ − (3/x)y^{−3} = x³. Why: clears yⁿ from the right and sets up for the v substitution.
3. Step 3: Set v = y^{1−4} = y^{−3}, so v' = −3y^{−4}y'. Thus y'/y⁴ = −v'/3. Substitute: −v'/3 − (3/x)v = x³, giving v' + (9/x)v = −3x³. Why: the substitution converts the nonlinear ODE into a linear ODE in v.
4. Step 4: Compute the integrating factor for v' + (9/x)v = −3x³. ∫(9/x)dx = 9 ln x, so μ = x⁹. Why: same integrating factor method as linear first-order ODEs.
5. Step 5: Multiply by x⁹: x⁹v' + 9x⁸v = −3x¹². The left side is d/dx[x⁹v]. Integrate: x⁹v = −3x¹³/13 + C. So v = −3x⁴/13 + Cx^{−9}. Why: direct integration after recognizing the exact derivative.
6. Step 6: Recover y. Since v = y^{−3}, we have y^{−3} = −3x⁴/13 + Cx^{−9}, so y = (−3x⁴/13 + Cx^{−9})^{−1/3}. Why: back-substitute to express the answer in terms of the original variable y.

*Outcome:* y = (−3x⁴/13 + Cx^{−9})^{−1/3}. This is the general solution; a specific C is found from an initial condition.

**Real-world intuition**

- Logistic growth: dP/dt = rP − sP² is a Bernoulli equation (n = 2) modeling population with carrying capacity
- Epidemiology: SIR model's I-equation has a Bernoulli structure in some simplified forms
- Fluid mechanics: certain viscosity-modified flow equations reduce to Bernoulli form

**Practice progression**

Item types: identify n and write the substitution, carry out the substitution algebra, solve the resulting linear ODE, back-substitute to find y, full Bernoulli IVP. Suggested item count: 6.

Start with n = 2 (simplest nonlinear case), then n = −1, then n = 3 or n = 4, then cases with variable P(x)

**Assessment objectives**

Formats: full solve from Bernoulli form to y(x), identify where a student's solution went wrong (wrong substitution or forgot back-substitution), classify which first-order ODEs are Bernoulli and which are not. Bloom alignment: apply.

Mastery signal: Correctly identifies n, applies v = y^{1−n}, produces the linear ODE, solves it, and back-substitutes in ≥ 4 of 5 problems

**Teacher notes**

The Bernoulli method is a template for the general strategy of 'spot the nonlinearity, choose a substitution that eliminates it, solve the resulting simpler ODE, back-substitute.' Students who internalize this as a problem-solving principle — not just a formula — handle a much broader class of special equations.

**Student notes**

The trick is dividing by yⁿ first, which makes the left side look like (1/(1−n)) d/dx[y^{1−n}]. Once you see that, the substitution v = y^{1−n} writes itself. Everything after that is the linear ODE playbook.

**Prerequisite graph**

- Requires: math.de.linear-first-order
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The Bernoulli equation illustrates the same linearization theme as the logistic ODE in population dynamics and the Riccati equation in control theory. Compare with homogeneous ODEs (math.de.homogeneous-ode): both use a substitution to reduce a hard equation to a solved class.

**Teaching hints — review triggers**

- Student cannot apply the integrating factor to the linear ODE in v that results from the substitution
- Student confuses the substitution v = y^{1−n} with v = yⁿ
- Student forgets to back-substitute at the end and reports v as the answer

**Spaced repetition / revision guidance**

If the linear ODE in v looks unfamiliar, write it explicitly: v' + (1−n)Pv = (1−n)Q. The factor (1−n) must appear on both the P-coefficient and the Q-term — check both before applying the integrating factor.

---

### Homogeneous First-Order ODE

*Concept ID: `math.de.homogeneous-ode` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 3h*

**Learning objective.** Recognize a homogeneous first-order ODE of the form dy/dx = F(y/x) and solve it by substituting v = y/x to produce a separable equation in v and x.

An ODE of the form dy/dx = F(y/x). Solved by the substitution v = y/x, transforming it into a separable equation in v and x.

A first-order ODE is called homogeneous (in the sense of degree, not to be confused with the homogeneous vs. nonhomogeneous distinction for linear ODEs) when the right side can be written purely as a function of the ratio y/x: dy/dx = F(y/x). The substitution v = y/x, equivalently y = vx, gives dy/dx = v + xv', transforming the equation into v + xv' = F(v), which rearranges to a separable ODE in v and x: xv' = F(v) − v, or dv/(F(v)−v) = dx/x. After separating and integrating, back-substitute v = y/x to express the solution in terms of x and y.

**Key ideas**

- The ODE must be writable as dy/dx = F(y/x); verify by factoring out xⁿ from both M and N in M dx + N dy = 0
- Substitution v = y/x, so y = vx and dy/dx = v + xv'
- The equation becomes separable: dv/(F(v)−v) = dx/x
- After integrating, back-substitute v = y/x to restore the original variables
- The term 'homogeneous' here means degree-homogeneous (M and N have the same degree), not linear-equation homogeneous (G = 0)

**Vocabulary**

- **homogeneous ODE (degree sense)** — A first-order ODE dy/dx = F(y/x) whose right side is a function of y/x alone; solved by the substitution v = y/x.
- **degree-homogeneous function** — A function f(x,y) where f(tx,ty) = tⁿf(x,y) for all t; both M and N must share the same degree n for M dx + N dy = 0 to be a homogeneous ODE.

**Common misconceptions**

- *Misconception:* Homogeneous first-order ODE means G(x) = 0 in y' + Py = G
  *Correction:* There are two unrelated uses of 'homogeneous' in ODEs. Here, homogeneous means the right side depends only on y/x (degree-homogeneous). The term also appears in second-order linear ODEs to mean G = 0 — a completely different concept requiring a different approach.
- *Misconception:* After substituting v = y/x, the equation becomes linear in v
  *Correction:* The resulting equation is separable, not necessarily linear. The transformed ODE is xv' = F(v) − v, which separates as dv/(F(v)−v) = dx/x but may have a nonlinear F(v) on the left.
- *Misconception:* The derivative of y = vx is just v'x
  *Correction:* Since both v and x are variables, the product rule gives dy/dx = d(vx)/dx = v'x + v·1 = xv' + v. Forgetting the v term leads to a wrong separable equation.

**Common mistakes in practice**

- Confusing 'homogeneous' in the degree sense with 'homogeneous' in the linear-ODE sense (G = 0)
- Writing dy/dx = xv' instead of xv' + v (forgetting the v from product rule)
- Forgetting to back-substitute v = y/x at the end

**Visual teaching opportunities**

- Slope field of a homogeneous ODE showing that the slope is constant along every ray y = cx through the origin (the defining geometric property)
- Substitution chain diagram: y/x = v → y = vx → dy/dx = xv' + v → separable ODE
- Solution curves for dy/dx = y/x + 1, showing the family of lines y = (C − x)...

**Worked example**

*Setup:* Solve dy/dx = (y² + xy)/x².

1. Step 1: Check for homogeneity. Write (y² + xy)/x² = (y/x)² + (y/x) = v² + v. So F(v) = v² + v. Why: confirms the ODE is homogeneous and identifies F.
2. Step 2: Substitute v = y/x, dy/dx = v + xv'. The ODE becomes v + xv' = v² + v, so xv' = v². Why: the v on both sides cancels, leaving a simple separable equation.
3. Step 3: Separate variables. dv/v² = dx/x. Why: the equation is now separable in v and x.
4. Step 4: Integrate both sides. ∫v^{−2}dv = ∫dx/x gives −1/v = ln|x| + C. Why: standard antiderivatives.
5. Step 5: Back-substitute v = y/x. −x/y = ln|x| + C. Solve for y: y = −x/(ln|x| + C). Why: express the solution in terms of the original variables.
6. Step 6: State the general solution. y = −x/(ln|x| + C). Why: this is the implicit-to-explicit form; a specific C is set by an initial condition.

*Outcome:* y = −x/(ln|x| + C). Verification: compute y' from quotient rule and confirm it equals (y² + xy)/x². ✓

**Real-world intuition**

- Fluid streamlines in potential flow around a wedge satisfy homogeneous ODEs
- Scaling laws in physics: equations invariant under (x,y) → (λx,λy) are exactly the homogeneous class
- Economics: homogeneous production functions (Cobb-Douglas) satisfy this degree-homogeneity property

**Practice progression**

Item types: verify an ODE is homogeneous by factoring, write the substituted separable ODE, separate and integrate, back-substitute to final answer. Suggested item count: 6.

Start with F(v) = v (linear case, easy integral), then F(v) = v + 1, then F(v) = v² + v or F(v) = v + v^{1/2}

**Assessment objectives**

Formats: solve from scratch, determine whether a given ODE is homogeneous, identify the error in a solution that forgot the v term in dy/dx = xv' + v. Bloom alignment: apply.

Mastery signal: Correctly identifies homogeneity, applies the substitution with the full product-rule derivative, separates and integrates, and back-substitutes in ≥ 4 of 5 problems

**Teacher notes**

The geometric insight is the key: homogeneous ODEs have constant slope along each ray y/x = c, so solution curves are 'self-similar' — they look the same at every scale. Drawing the slope field highlights this before any algebra is done.

**Student notes**

When you see (y² + xy)/x² or similar, ask: can I write this as a function of y/x only? If yes, it's homogeneous. Then substitute v = y/x — and remember to use the product rule when differentiating y = vx.

**Prerequisite graph**

- Requires: math.de.first-order-ode, math.de.separable
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Compare with the Bernoulli substitution (math.de.bernoulli): both use a substitution to reduce a nonlinear first-order ODE to a simpler class (separable for homogeneous, linear for Bernoulli). The two techniques complement each other in the first-order ODE toolkit.

**Teaching hints — review triggers**

- Student cannot verify the ODE is homogeneous by checking that F depends only on y/x
- Student writes dy/dx = xv' instead of xv' + v (product rule error)
- Student cannot separate the resulting ODE or integrate 1/(F(v)−v)

**Spaced repetition / revision guidance**

The hard part is recognizing homogeneity: try substituting y = vx directly into F(x,y)/G(x,y) and see whether x cancels. If it does, the ODE is homogeneous. If partial cancellation leaves a mixed x/y term, it is not homogeneous.

---

### Slope Field

*Concept ID: `math.de.slope-field` · Difficulty: advanced · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 2h*

**Learning objective.** Construct and interpret a slope field (direction field) for a first-order ODE y' = f(x,y) by drawing short tangent-line segments at grid points, and use the field to sketch solution curves qualitatively without solving the equation.

A graphical representation of a first-order ODE by drawing short tangent-line segments at a grid of points (x,y), revealing the qualitative behavior of solutions without solving explicitly.

A slope field for the ODE y' = f(x,y) is drawn by evaluating f(x,y) at each point of a grid and drawing a short line segment with that slope at the point. Since every solution y(x) must be tangent to these segments at each point it passes through, the slope field reveals the qualitative behavior of all solutions: equilibria appear where the slope is zero, asymptotic behavior shows as segments flattening or steepening toward infinity, and isoclines (curves where f = constant) reveal structure before any computation. Slope fields are especially powerful for autonomous ODEs y' = f(y), where the slope depends only on y and all segments on a horizontal line have the same slope.

**Key ideas**

- At each grid point (x,y), draw a segment with slope f(x,y); the collection is the slope field
- Solution curves are tangent to every segment they cross — solutions flow along the field
- Isoclines (f(x,y) = c) are curves where all segments have the same slope c; the nullcline (c = 0) shows where solutions have horizontal tangents
- For autonomous ODEs y' = f(y), the slope depends only on y, so segments are horizontal-translates of each other
- Equilibrium solutions y = c where f(c) = 0 appear as horizontal lines in the field; stability follows from the sign of f near c

**Vocabulary**

- **slope field** — A graphical representation of y' = f(x,y): at each grid point (x,y) a short line segment is drawn with slope f(x,y), revealing the direction of solution flow.
- **isocline** — A curve f(x,y) = c along which all segments in the slope field share the same slope c; the nullcline is the isocline for c = 0.
- **nullcline** — The curve f(x,y) = 0 where solution curves have horizontal tangents; it separates regions of increasing and decreasing solutions.
- **equilibrium solution** — A constant solution y = c where f(x,c) = 0 for all x (autonomous: f(c) = 0); appears as a horizontal line in the slope field.

**Common misconceptions**

- *Misconception:* A slope field shows the unique solution through any point
  *Correction:* A slope field shows the direction field for all solutions simultaneously. To sketch the solution through a specific point, you trace a curve tangent to the field starting at that point. Without an initial condition, infinitely many solution curves exist.
- *Misconception:* Isoclines are solution curves
  *Correction:* Isoclines are the curves where f(x,y) = c (constant slope) — they are a computational aid for drawing the field, not solution curves. A solution curve is tangent to the field; it typically crosses isoclines at an angle.
- *Misconception:* Slope fields only work for autonomous ODEs
  *Correction:* Slope fields apply to any first-order ODE y' = f(x,y). Autonomous ODEs just have a special visual property (horizontal translation symmetry), but the method is fully general.

**Common mistakes in practice**

- Drawing segments that cross solution curves at angles (should be tangent)
- Treating isoclines as solution curves
- Forgetting that for y' = f(x,y) the slope depends on both coordinates, not just one

**Visual teaching opportunities**

- Animated construction of a slope field: show each grid point, compute the slope, draw the segment — then watch the solution curve appear as a connected tangent path
- Side-by-side: slope field of y' = y (exponential growth) and y' = −y (exponential decay), emphasizing opposite signs of slope above/below the x-axis
- Nullcline overlay on a slope field for y' = y(1−y): the nullclines y = 0 and y = 1 divide the field into regions of positive and negative slope, predicting equilibria and their stability

**Worked example**

*Setup:* Sketch the slope field for y' = x − y and trace the solution through (0, 2).

1. Step 1: Find the nullcline (slope = 0). x − y = 0, i.e., y = x. Along this line all segments are horizontal. Why: nullclines organize the field by showing where solutions transition from increasing to decreasing.
2. Step 2: Determine sign of slope in each region. For y < x (below y = x): x − y > 0, so segments slope upward. For y > x (above y = x): x − y < 0, segments slope downward. Why: sign analysis predicts the direction of solution flow in each region.
3. Step 3: Compute slopes at representative grid points. At (0,0): slope = 0. At (1,0): slope = 1. At (0,1): slope = −1. At (1,2): slope = −1. At (2,1): slope = 1. Draw segments. Why: enough points to see the overall structure.
4. Step 4: Sketch the solution through (0,2). Start at (0,2) where slope = 0−2 = −2 (steep downward). The curve decreases, crosses the nullcline y = x near (1,1), then begins increasing parallel to y = x. Why: tracing tangent to the field shows the qualitative solution.
5. Step 5: Note that the equilibrium 'solution' is y = x + 1 (the line parallel to the nullcline that the solution asymptotically approaches). Why: for y' = x − y, the particular solution y = x − 1 + Ce^{−x} → y = x − 1 as x → ∞ — the field reveals this without solving the ODE.

*Outcome:* A slope field sketch with horizontal segments on y = x, upward-sloping segments below y = x, downward-sloping segments above it, and the solution through (0,2) curving down from slope −2, approaching the line y = x − 1 asymptotically.

**Real-world intuition**

- Qualitative analysis of mechanical systems before solving (e.g., pendulum phase portrait)
- Population dynamics: slope field of dP/dt = rP(1 − P/K) reveals carrying capacity as an attractor
- Drug dosage modeling: slope field shows whether concentration rises or falls before computing exact formulas

**Practice progression**

Item types: find nullclines, classify slopes in regions, match slope field to ODE, sketch solution through given point, identify equilibria and stability from field. Suggested item count: 5.

Autonomous y' = f(y) first, then y' = f(x), then y' = f(x,y) with both variables

**Assessment objectives**

Formats: sketch slope field for a given ODE, match slope field to one of four ODEs, describe qualitative behavior from a slope field without solving. Bloom alignment: understand.

Mastery signal: Correctly identifies nullclines, sign regions, and equilibria; traces a solution curve that stays tangent to the field at every drawn point

**Teacher notes**

Before computing, ask students: 'Where are the slopes zero? Where positive? Where negative?' This forces qualitative thinking before quantitative. Slope fields are powerful precisely because they give structural insight without integration.

**Student notes**

A slope field is a map of arrows: at every point, it tells you which way the solution is heading. To sketch a solution, start at your initial point and follow the arrows — turn with them, never cross them at an angle.

**Prerequisite graph**

- Requires: math.de.first-order-ode
- Unlocks (future prerequisite links): math.de.phase-plane
- Cross-topic connections (graph cross-links): none
- Narrative: Slope fields generalize to phase planes (math.de.phase-plane) for systems of two ODEs: instead of a scalar slope at each point, a 2D vector (x', y') = (f, g) is drawn. The qualitative methods (nullclines, equilibria, stability) are the same, extended to two dimensions.

**Teaching hints — review triggers**

- Student cannot evaluate f(x,y) at a specific point to get a numerical slope
- Student confuses isoclines with solution curves
- Student draws curves that cross segments at angles rather than tangentially

**Spaced repetition / revision guidance**

If you cannot tell from the slope field where solutions go, compute slopes at four strategically chosen points: near each equilibrium, one point clearly above the nullcline, one clearly below. Four data points usually reveal the whole qualitative picture.

---

### Euler's Method

*Concept ID: `math.de.euler-method` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 3h*

**Learning objective.** Apply Euler's method to generate a numerical approximation to the IVP y' = f(x,y), y(x₀) = y₀ by iterating y_{n+1} = yₙ + h·f(xₙ, yₙ), understand the O(h) global error, and recognize sources of accumulation error.

The simplest numerical method for ODEs: step forward in x by h, updating y by y_{n+1} = y_n + h·f(x_n, y_n). Error per step O(h²); global error O(h).

Euler's method is the simplest numerical ODE solver. Starting at the initial point (x₀, y₀), it steps forward by a fixed step size h: at each node xₙ = x₀ + nh, the next approximation is y_{n+1} = yₙ + h·f(xₙ, yₙ). Geometrically, this follows the tangent line at each point for a horizontal distance h, then re-evaluates the slope at the new point. The local truncation error per step is O(h²) (from the Taylor series), giving a global error O(h): halving h halves the global error. While rarely used in practice (higher-order methods like RK4 are far more efficient), Euler's method is the conceptual foundation for all numerical ODE theory and illustrates the step-size/accuracy tradeoff.

**Key ideas**

- Iteration: y_{n+1} = yₙ + h·f(xₙ, yₙ); xₙ₊₁ = xₙ + h
- Geometrically: follow the tangent line at (xₙ, yₙ) for step h
- Local truncation error per step: O(h²) from the Taylor expansion y(x+h) = y(x) + hy'(x) + O(h²)
- Global error (accumulated over N = (b−a)/h steps): O(h), so halving h halves the error
- Error grows with larger f values, stiff ODEs, or large intervals — Euler may diverge where the exact solution is bounded

**Vocabulary**

- **Euler's method** — The numerical ODE algorithm y_{n+1} = yₙ + h·f(xₙ, yₙ), the simplest explicit one-step method with global error O(h).
- **local truncation error** — The error committed in a single Euler step compared to the exact solution: O(h²) per step, from the neglected higher-order Taylor terms.
- **global truncation error** — The cumulative error over all steps from x₀ to xₙ: O(h), since N ∝ 1/h steps each contribute O(h²).
- **stiff ODE** — An ODE whose solution contains components with widely different rates of decay; requires very small h for Euler stability, making Euler impractical.

**Common misconceptions**

- *Misconception:* A smaller h always gives a better answer in practice
  *Correction:* While theoretically true, in floating-point arithmetic extremely small h causes catastrophic cancellation (yₙ + hf and yₙ nearly equal), so the computed error may increase below a critical h. In exact arithmetic, smaller h is always better; in finite precision, there is an optimal h.
- *Misconception:* Euler's method has zero error at each step since it follows the tangent
  *Correction:* The tangent line matches the solution to first order — it is exact at xₙ but the solution curves away from the tangent at O(h²). Each step commits an O(h²) local error, which accumulates over N ∝ 1/h steps to give O(h) global error.
- *Misconception:* Euler's method can handle any ODE equally well
  *Correction:* Euler's method is unstable for stiff ODEs (those with widely separated time scales). The step size h must satisfy h < 2/|λ| for stability, where λ is the dominant eigenvalue. For stiff systems, the required h is so small that Euler becomes impractical — implicit methods are needed instead.

**Common mistakes in practice**

- Updating x and y incorrectly (e.g., updating x first and using the updated x in the same step)
- Confusing local error O(h²) with global error O(h)
- Expecting Euler to be accurate for large h — it is a low-order method

**Visual teaching opportunities**

- Step-by-step Euler illustration: exact curve, tangent line at each Euler node, and the growing discrepancy between exact and numerical solution as h stays fixed
- Comparison table for three step sizes h = 0.5, 0.25, 0.1 applied to y' = y, y(0) = 1 on [0,1], showing global error O(h)
- Error-vs-h log-log plot: slope = 1 confirming O(h) global error; compare with RK4's slope = 4

**Worked example**

*Setup:* Use Euler's method with h = 0.25 to approximate y(1) for the IVP y' = y, y(0) = 1.

1. Step 1: Set up. x₀ = 0, y₀ = 1, h = 0.25, f(x,y) = y. Apply to [0,1], so N = 4 steps. Why: identify all parameters before iterating.
2. Step 2: Step 1. x₁ = 0.25, y₁ = y₀ + h·f(x₀,y₀) = 1 + 0.25·1 = 1.25. Why: follow tangent at (0,1) which has slope y₀ = 1.
3. Step 3: Step 2. x₂ = 0.50, y₂ = 1.25 + 0.25·1.25 = 1.5625. Why: re-evaluate slope at new position.
4. Step 4: Step 3. x₃ = 0.75, y₃ = 1.5625 + 0.25·1.5625 = 1.953125. Why: same iteration.
5. Step 5: Step 4. x₄ = 1.00, y₄ = 1.953125 + 0.25·1.953125 = 2.44140625. Why: final step reaches x = 1.
6. Step 6: Compare with exact. y(1) = e¹ ≈ 2.71828. Global error = 2.71828 − 2.44141 ≈ 0.277 ≈ 10.2% relative error. Why: quantify accuracy; with h = 0.125 the error would be roughly half (≈ 0.14).

*Outcome:* Euler approximation y(1) ≈ 2.441; exact e ≈ 2.718; global error ≈ 0.277, consistent with O(h) = O(0.25) error bound. Euler underestimates because y' = y is convex (y'' = y > 0) and the tangent line lies below the curve.

**Real-world intuition**

- Epidemiological simulations: SIR model stepped forward with Euler to project infection spread
- Orbital mechanics: early space trajectory calculations used Euler-like integrators
- Financial models: Monte Carlo path simulation for options pricing uses Euler on stochastic ODEs

**Practice progression**

Item types: single Euler step, full table of N steps, compare two step sizes, bound the global error analytically, identify stability concerns for a given ODE. Suggested item count: 5.

Start with constant f, then f(x) only, then f(x,y), then compare with exact solution

**Assessment objectives**

Formats: compute Euler steps by hand (N ≤ 5), fill in Euler table with blank entries, explain why smaller h reduces error and state the global error order. Bloom alignment: apply.

Mastery signal: Correctly iterates the formula, tracks error magnitude, and explains the O(h) convergence rate in ≥ 4 of 5 tasks

**Teacher notes**

Have students run Euler by hand for 4–5 steps, then implement it in a spreadsheet or Python for 100+ steps with multiple h values, plot the error vs. h on a log-log scale, and verify the slope is 1. This numerical experiment makes the O(h) convergence visceral rather than abstract.

**Student notes**

Each Euler step says: 'I know where I am and how fast I'm going right now — I'll walk in a straight line for h seconds.' The error is from ignoring the curve. The smaller h is, the more often you update your direction, and the more faithfully you follow the actual curve.

**Prerequisite graph**

- Requires: math.de.first-order-ode, math.de.ivp
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.num.euler-method
- Narrative: Euler's method is the ODE analog of left-endpoint Riemann sums (math.calc.riemann-sums): both approximate by holding a quantity constant over each subinterval, accumulating O(h) global error. Runge-Kutta (not in this curriculum) uses the midpoint or weighted averages — analogous to the midpoint or Simpson's rules for integration.

**Teaching hints — review triggers**

- Student cannot evaluate f(x,y) numerically at a specific point
- Student adds h·f to x instead of updating y
- Student does not understand why the global error is O(h) when each step error is O(h²)

**Spaced repetition / revision guidance**

To see why global error is O(h), count the steps: N = (b−a)/h steps, each with O(h²) error. Total error ≤ N · O(h²) = (b−a)/h · O(h²) = (b−a)·O(h) = O(h). This step-count argument is the key insight connecting local and global error.

---

### Second-Order ODE

*Concept ID: `math.de.second-order-ode` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 6h*

**Learning objective.** Recognize a second-order ODE y'' + P(x)y' + Q(x)y = G(x), classify it as linear/nonlinear and homogeneous/nonhomogeneous, understand why two linearly independent solutions are needed, and connect the structure to physical models.

An ODE involving the second derivative y″. Of primary physical importance (Newton's second law, harmonic oscillators, beam equations). Standard form: y″ + P(x)y′ + Q(x)y = G(x).

A second-order ODE involves the second derivative y'' and is of primary physical importance: Newton's second law F = ma gives m·x'' = F(t,x,x'), immediately producing a second-order ODE for position x. The standard linear form is y'' + P(x)y' + Q(x)y = G(x). When G ≡ 0, the equation is homogeneous; when G ≢ 0, it is nonhomogeneous. For linear homogeneous equations, the superposition principle holds: if y₁ and y₂ are solutions, so is c₁y₁ + c₂y₂. The general solution is a linear combination of two linearly independent solutions, giving two free constants determined by two initial conditions (y(x₀) = a, y'(x₀) = b) — reflecting the physical intuition that position and velocity together determine future motion.

**Key ideas**

- Standard form: y'' + P(x)y' + Q(x)y = G(x); identify P, Q, G before choosing a solution method
- Homogeneous: G = 0; nonhomogeneous: G ≠ 0
- Superposition principle: for linear homogeneous ODEs, c₁y₁ + c₂y₂ is a solution whenever y₁ and y₂ are solutions
- General solution = c₁y₁ + c₂y₂ (homogeneous) or y_h + y_p (nonhomogeneous)
- Two initial conditions are needed (position and velocity) because the ODE is second order — integrating twice introduces two constants

**Vocabulary**

- **second-order ODE** — A differential equation involving y'' but no higher derivatives; needs two initial conditions (y and y' at a point) for a unique solution.
- **superposition principle** — For a linear homogeneous ODE, any linear combination c₁y₁ + c₂y₂ of solutions is also a solution.
- **general solution** — The family c₁y₁ + c₂y₂ of all solutions to a second-order linear homogeneous ODE, parameterized by two free constants.

**Common misconceptions**

- *Misconception:* Any two solutions to a homogeneous ODE can be combined as the general solution
  *Correction:* The two solutions must be linearly independent (their Wronskian must be nonzero). For example, y₁ = eˣ and y₂ = 2eˣ are both solutions to y'' − y = 0, but they are proportional — their combination is just c·eˣ (only one free constant), not the general solution. A second independent solution e^{−x} is required.
- *Misconception:* The superposition principle applies to nonlinear ODEs
  *Correction:* Superposition applies only to linear equations. For a nonlinear ODE like y'' = y², if y₁ and y₂ are solutions, c₁y₁ + c₂y₂ generally is not a solution. The power of the linear theory depends entirely on linearity.
- *Misconception:* A second-order ODE needs three initial conditions
  *Correction:* A second-order ODE needs exactly two initial conditions — one for y and one for y'. Each integration introduces one constant, so two conditions are needed to determine both. Three conditions would be over-determined and generally inconsistent.

**Common mistakes in practice**

- Using two proportional solutions and missing half the solution space
- Forgetting to check linear independence (Wronskian)
- Applying superposition to nonlinear ODEs

**Visual teaching opportunities**

- Physical motivation diagram: spring-mass system with F = −kx giving mx'' + kx = 0 — the prototype second-order ODE
- Solution space picture: two basis vectors y₁, y₂ spanning a 2D space of solutions; the general solution is any point in that plane (any c₁y₁ + c₂y₂)
- Decision tree: second-order → linear or nonlinear? → if linear: homogeneous or nonhomogeneous? → choose method (characteristic equation, undetermined coefficients, variation of parameters)

**Worked example**

*Setup:* Verify that y₁ = eˣ and y₂ = e^{−x} are both solutions to y'' − y = 0, and write the general solution.

1. Step 1: Check y₁ = eˣ. y₁' = eˣ, y₁'' = eˣ. Then y₁'' − y₁ = eˣ − eˣ = 0. ✓ Why: substitution is the definition of 'solution.'
2. Step 2: Check y₂ = e^{−x}. y₂' = −e^{−x}, y₂'' = e^{−x}. Then y₂'' − y₂ = e^{−x} − e^{−x} = 0. ✓ Why: same verification for the second proposed solution.
3. Step 3: Check linear independence. Wronskian W = |y₁ y₂; y₁' y₂'| = eˣ·(−e^{−x}) − e^{−x}·eˣ = −1 − 1 = −2 ≠ 0. Why: nonzero Wronskian confirms the two solutions are linearly independent and together span the solution space.
4. Step 4: Write the general solution. y = c₁eˣ + c₂e^{−x}, where c₁, c₂ are arbitrary constants. Why: superposition principle guarantees every linear combination is a solution, and linear independence guarantees this captures all solutions.

*Outcome:* General solution y = c₁eˣ + c₂e^{−x}. Equivalently, y = A cosh(x) + B sinh(x), showing the connection to hyperbolic functions. An IVP with y(0) = 3, y'(0) = 1 gives c₁ + c₂ = 3, c₁ − c₂ = 1, so c₁ = 2, c₂ = 1.

**Real-world intuition**

- Spring-mass system: mx'' + bx' + kx = F(t); position and velocity as ICs
- RLC circuit: LQ'' + RQ' + Q/C = V(t) for charge Q
- Beam deflection: EI·y'''' = w(x) (fourth-order, same structural ideas)
- Pendulum small-angle approximation: θ'' + (g/L)θ = 0

**Practice progression**

Item types: verify a proposed solution by substitution, compute Wronskian to test independence, write the general solution form, classify as homogeneous/nonhomogeneous/linear/nonlinear, apply two ICs to pin a specific solution. Suggested item count: 6.

Start with constant-coefficient examples, then move to Euler-Cauchy equations

**Assessment objectives**

Formats: verify solutions and write general form, explain why two ICs are needed (not one, not three), classify a given ODE. Bloom alignment: apply.

Mastery signal: Correctly verifies solutions, computes Wronskians, writes general solution, and applies ICs in ≥ 4 of 5 problems

**Teacher notes**

The physical motivation (spring-mass) should precede the abstract formulation. Students who see why two constants arise physically (position and velocity at t = 0) accept the two-IC requirement as natural rather than arbitrary.

**Student notes**

Think of the solution space as a plane: y₁ and y₂ are two basis directions, and c₁y₁ + c₂y₂ sweeps out the entire plane. An IVP picks a specific point in that plane. Linear independence means y₁ and y₂ actually span a 2D space — if they're proportional, they only span a line, missing infinitely many solutions.

**Prerequisite graph**

- Requires: math.de.first-order-ode
- Unlocks (future prerequisite links): math.de.higher-order-ode, math.de.systems-ode
- Cross-topic connections (graph cross-links): none
- Narrative: The structure of second-order linear ODE solutions mirrors that of linear algebra (math.linalg): the homogeneous solution space is a vector space of dimension 2, spanned by a basis {y₁, y₂}, and the particular solution is an affine offset — exactly the solution-space theorem from linear algebra (null space + particular solution).

**Teaching hints — review triggers**

- Student cannot verify a solution by differentiation and substitution
- Student confuses linear independence with linear dependence
- Student does not understand why two (not one) initial conditions are needed

**Spaced repetition / revision guidance**

The general solution formula y = c₁y₁ + c₂y₂ is fully analogous to the general solution of Ax = 0 being c₁v₁ + c₂v₂ (null space). For Ay = b (nonhomogeneous), add a particular solution: y = y_h + y_p. The linear algebra analogy makes the structure unforgettable.

---

### Second-Order Linear ODE

*Concept ID: `math.de.second-order-linear` · Difficulty: advanced · Bloom level: understand · Mastery threshold: 0.85 · Estimated study time: 4h*

**Learning objective.** State the structure theorem for second-order linear ODEs y'' + P(x)y' + Q(x)y = G(x): the general homogeneous solution is a 2D vector space, the general solution to the nonhomogeneous ODE is y_h + y_p, and superposition holds for homogeneous equations only.

An ODE y″ + P(x)y′ + Q(x)y = G(x). When G=0 it is homogeneous; when G≠0 it is nonhomogeneous. Solutions form a vector space (superposition principle applies for homogeneous case).

A second-order linear ODE y'' + P(x)y' + Q(x)y = G(x) has a rich algebraic structure: when G = 0 (homogeneous), its solutions form a 2-dimensional vector space — any two linearly independent solutions y₁, y₂ form a basis, and every solution is c₁y₁ + c₂y₂. When G ≠ 0 (nonhomogeneous), the general solution is y = y_h + y_p, where y_h is the general homogeneous solution and y_p is any particular solution. Superposition holds for the homogeneous equation: linear combinations of solutions are solutions. This structure — identical to the null space + particular solution picture in linear algebra — determines all subsequent solution methods (characteristic equation, undetermined coefficients, variation of parameters).

**Key ideas**

- Homogeneous equation (G = 0): solutions form a 2D vector space; basis is any two linearly independent solutions
- Nonhomogeneous equation (G ≠ 0): general solution = y_h + y_p; y_p is any single particular solution
- Superposition for homogeneous: c₁y₁ + c₂y₂ is a solution whenever y₁, y₂ are
- Superposition fails for nonhomogeneous: c₁·(y_p) is generally not a particular solution unless c₁ = 1
- The structure theorem guarantees exactly two linearly independent solutions exist (by existence-uniqueness for second-order linear ODEs)

**Vocabulary**

- **homogeneous solution (y_h)** — The general solution c₁y₁ + c₂y₂ to the associated homogeneous ODE (G = 0); represents the 2D null space of the differential operator.
- **particular solution (y_p)** — Any single function satisfying the nonhomogeneous equation; added to y_h to form the complete general solution.
- **structure theorem** — The theorem stating that the general solution to a second-order linear ODE is y_h + y_p, where y_h spans a 2D solution space and y_p is any particular solution.

**Common misconceptions**

- *Misconception:* Superposition applies to y_p: if y_p1 and y_p2 are both particular solutions, then y_p1 + y_p2 is a particular solution
  *Correction:* y_p1 + y_p2 is not a particular solution — it solves y'' + Py' + Qy = 2G, not G. However, y_p1 − y_p2 is always a homogeneous solution (since (y_p1 − y_p2)'' + P(y_p1 − y_p2)' + Q(y_p1 − y_p2) = G − G = 0). This is why any two particular solutions differ by a homogeneous solution.
- *Misconception:* The general solution contains infinitely many free parameters
  *Correction:* A second-order linear ODE has exactly two free constants in its general solution — not more. The two constants are determined by two initial conditions. The '2D vector space' picture means exactly two free parameters (c₁ and c₂), not infinitely many.
- *Misconception:* y_h already contains y_p as a special case
  *Correction:* The homogeneous solution y_h satisfies G = 0; it cannot equal a particular solution to G ≠ 0 unless G = 0 (which would make the equation homogeneous). They are distinct: y_h handles the 'free' oscillation; y_p handles the forcing.

**Common mistakes in practice**

- Adding two particular solutions and calling the sum a particular solution (it satisfies y = 2G, not G)
- Not applying both initial conditions (using only y(0) and solving for one constant)
- Confusing y_h with y_p in the formula

**Visual teaching opportunities**

- Vector space diagram: the homogeneous solution space as a 2D plane in function space, with y₁ and y₂ as basis vectors; y_p as a fixed offset; the full solution set as the affine plane y_p + span{y₁, y₂}
- Linear algebra analogy table: Ax = 0 ↔ y_h; Ax = b ↔ y_h + y_p; null space ↔ 2D solution space
- Sign/behavior classification: plot y_h (oscillatory/exponential) vs. y_p (forced behavior matching G) for the spring-mass with forcing

**Worked example**

*Setup:* Given y'' − 3y' + 2y = 4eˣ, suppose y₁ = eˣ and y₂ = e^{2x} solve the homogeneous equation and y_p = −4xeˣ is a particular solution. Write the general solution and apply y(0) = 0, y'(0) = 1.

1. Step 1: Verify y₁ = eˣ solves y'' − 3y' + 2y = 0. eˣ − 3eˣ + 2eˣ = 0. ✓ Why: confirm the proposed basis function.
2. Step 2: Verify y₂ = e^{2x} solves y'' − 3y' + 2y = 0. 4e^{2x} − 6e^{2x} + 2e^{2x} = 0. ✓ Why: confirm the second basis function.
3. Step 3: Verify y_p = −4xeˣ solves the nonhomogeneous equation. y_p' = −4eˣ − 4xeˣ; y_p'' = −8eˣ − 4xeˣ. Then (−8eˣ − 4xeˣ) − 3(−4eˣ − 4xeˣ) + 2(−4xeˣ) = −8eˣ + 12eˣ = 4eˣ. ✓ Why: confirms y_p solves the forced equation.
4. Step 4: Write the general solution. y = c₁eˣ + c₂e^{2x} − 4xeˣ. Why: structure theorem: y_h + y_p.
5. Step 5: Apply y(0) = 0. c₁ + c₂ = 0, so c₂ = −c₁. Why: IC pins one relation between the constants.
6. Step 6: Apply y'(0) = 1. y' = c₁eˣ + 2c₂e^{2x} − 4eˣ − 4xeˣ. At x = 0: c₁ + 2c₂ − 4 = 1. With c₂ = −c₁: c₁ − 2c₁ − 4 = 1, so c₁ = −5, c₂ = 5. Why: second IC pins c₁ and c₂ uniquely.
7. Step 7: Particular IVP solution: y = −5eˣ + 5e^{2x} − 4xeˣ. Why: substitute the determined constants.

*Outcome:* y = −5eˣ + 5e^{2x} − 4xeˣ. Verify by substitution: all three terms satisfy the full ODE structure, and y(0) = −5+5 = 0 ✓, y'(0) = −5+10−4 = 1 ✓.

**Real-world intuition**

- Spring-mass: homogeneous solution = natural (free) oscillation; particular solution = forced response matching the driving force frequency
- RLC circuits: y_h = transient response (decays to zero); y_p = steady-state response matching the AC driving voltage
- Beam theory: general solution = homogeneous (beam shape without load) + particular (additional deflection due to distributed load)

**Practice progression**

Item types: verify y_h solves homogeneous, verify y_p solves nonhomogeneous, write general solution from y_h and y_p, apply ICs to find c₁ and c₂, explain why difference of two particular solutions is homogeneous. Suggested item count: 6.

Start with verifying given solutions, then write general form, then apply ICs, then full problem

**Assessment objectives**

Formats: write general solution from given homogeneous basis and particular solution, apply two ICs, explain in one sentence why y = y_h + y_p is the complete picture. Bloom alignment: understand.

Mastery signal: Correctly distinguishes y_h from y_p, applies both ICs to find constants, and explains superposition in ≥ 4 of 5 tasks

**Teacher notes**

Draw the parallel with linear algebra (Ax = b: null space + particular solution) explicitly and early. Students who have seen Gaussian elimination recognize the structure immediately and stop asking why two free constants exist — the 2D null space is the answer.

**Student notes**

Think of y_h as the 'freedom' (two free constants from the null space) and y_p as the 'obligation' (the specific response forced by G). The general solution is obligation + freedom: y_p + c₁y₁ + c₂y₂.

**Prerequisite graph**

- Requires: math.de.second-order-ode, math.de.ode-linearity
- Unlocks (future prerequisite links): math.de.second-order-homogeneous
- Cross-topic connections (graph cross-links): none
- Narrative: The 2D solution space of a second-order linear ODE is exactly the null space of the differential operator L[y] = y'' + Py' + Qy (math.linalg). The particular solution y_p is the same as a particular solution to Ax = b: finding one solution to the inhomogeneous problem and adding the full homogeneous freedom.

**Teaching hints — review triggers**

- Student cannot state what it means for a function to solve a linear ODE (substitution test)
- Student confuses the structure theorem with the solution method (knows y = y_h + y_p but cannot explain why)
- Student tries to add particular solutions and treats the sum as a new particular solution

**Spaced repetition / revision guidance**

The key test: can you explain in one sentence why y = y_h + y_p works? Because L[y_h + y_p] = L[y_h] + L[y_p] = 0 + G = G — linearity of L is the only reason. If you can say this confidently, you understand the structure theorem.

---

### Homogeneous Second-Order Linear ODE

*Concept ID: `math.de.second-order-homogeneous` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 4h*

**Learning objective.** State and apply the fundamental theorem for second-order linear homogeneous ODEs: find two linearly independent solutions, verify they form a fundamental set using the Wronskian, and write the general solution as their linear combination.

The equation y″ + P(x)y′ + Q(x)y = 0. Two linearly independent solutions y₁, y₂ form a fundamental set; general solution is c₁y₁ + c₂y₂. Linearity determined by the Wronskian.

The equation y'' + P(x)y' + Q(x)y = 0 is the homogeneous second-order linear ODE. By the existence-uniqueness theorem, there exist exactly two linearly independent solutions y₁ and y₂ on any interval where P and Q are continuous. These form a fundamental set of solutions: any solution is uniquely expressible as c₁y₁ + c₂y₂. Independence is verified by the Wronskian W(y₁,y₂) = y₁y₂' − y₁'y₂, which is either identically zero (dependent) or never zero (independent) on the interval — a consequence of Abel's identity. The structure theorem reduces all subsequent work to finding this fundamental set.

**Key ideas**

- Two linearly independent solutions y₁, y₂ form a fundamental set; every solution is c₁y₁ + c₂y₂
- The Wronskian W(y₁,y₂) = y₁y₂' − y₁'y₂ is either always zero (dependent) or never zero (independent) — Abel's identity
- Existence-uniqueness guarantees exactly two linearly independent solutions exist
- Linear independence can be checked at any single point: if W ≠ 0 at one point, the pair is independent everywhere
- The 2D solution space is closed under linear combination: any c₁y₁ + c₂y₂ is also a solution

**Vocabulary**

- **fundamental set of solutions** — A pair {y₁, y₂} of linearly independent solutions to y'' + Py' + Qy = 0; every solution is c₁y₁ + c₂y₂.
- **Abel's identity** — The formula W(x) = W(x₀) exp(−∫_{x₀}^x P dt) for the Wronskian of two solutions to y'' + Py' + Qy = 0; shows W is either always zero or never zero.

**Common misconceptions**

- *Misconception:* You need to check the Wronskian at every point to verify independence
  *Correction:* Abel's theorem guarantees that for the equation y'' + Py' + Qy = 0, the Wronskian is either identically zero or never zero on an interval where P is continuous. A single nonzero Wronskian value at any point confirms independence throughout the interval.
- *Misconception:* Three solutions to a second-order ODE can all be linearly independent
  *Correction:* The solution space is 2-dimensional — exactly two linearly independent solutions exist. Any third solution is necessarily a linear combination of the first two. 'Three independent solutions' to a second-order ODE is impossible.
- *Misconception:* The general solution c₁y₁ + c₂y₂ only works for certain initial conditions
  *Correction:* By the existence-uniqueness theorem, for any initial conditions y(x₀) = a, y'(x₀) = b, there is exactly one solution in the family c₁y₁ + c₂y₂. The system c₁y₁(x₀) + c₂y₂(x₀) = a, c₁y₁'(x₀) + c₂y₂'(x₀) = b always has a unique solution when W(x₀) ≠ 0.

**Common mistakes in practice**

- Checking Wronskian at one point where it happens to be zero and incorrectly concluding dependence
- Confusing the row order in the Wronskian determinant (y₁ in first row, y₂ in second)
- Claiming a third independent solution exists

**Visual teaching opportunities**

- 2D function-space picture: two basis vectors y₁ and y₂, every point in the plane representing a different c₁y₁ + c₂y₂ solution; a specific IC pins a unique point
- Wronskian computation displayed as a 2×2 determinant, with clear labeling of which entries come from y₁ and which from y₂
- Abel's identity illustrated: graph of W(x) for the equation y'' + Py' = 0 showing W(x) = W(x₀)e^{−∫P dx} — always positive or always negative, never crossing zero

**Worked example**

*Setup:* For y'' − 5y' + 6y = 0, verify that y₁ = e^{2x} and y₂ = e^{3x} form a fundamental set.

1. Step 1: Verify y₁ = e^{2x} is a solution. y₁' = 2e^{2x}, y₁'' = 4e^{2x}. Then 4e^{2x} − 10e^{2x} + 6e^{2x} = 0. ✓
2. Step 2: Verify y₂ = e^{3x} is a solution. y₂' = 3e^{3x}, y₂'' = 9e^{3x}. Then 9e^{3x} − 15e^{3x} + 6e^{3x} = 0. ✓
3. Step 3: Compute the Wronskian. W(y₁,y₂) = y₁y₂' − y₁'y₂ = e^{2x}·3e^{3x} − 2e^{2x}·e^{3x} = 3e^{5x} − 2e^{5x} = e^{5x}. Why: a closed-form expression for W.
4. Step 4: Check if W ≠ 0. W = e^{5x} > 0 for all x — never zero. Why: confirms linear independence everywhere, so {y₁, y₂} is a fundamental set.
5. Step 5: Write the general solution. y = c₁e^{2x} + c₂e^{3x}. Why: linear combination of the fundamental set is the complete solution family.

*Outcome:* General solution y = c₁e^{2x} + c₂e^{3x} with Wronskian W = e^{5x} > 0 confirming fundamental set. An IVP y(0) = 1, y'(0) = 0 gives c₁ + c₂ = 1, 2c₁ + 3c₂ = 0, so c₁ = 3, c₂ = −2.

**Real-world intuition**

- Spring-mass without damping: y'' + ω²y = 0 has fundamental set {cos(ωt), sin(ωt)}, each capturing a different phase of oscillation
- Beam vibration: natural mode shapes are the fundamental set of the spatial ODE
- Quantum mechanics: wavefunctions of energy eigenstates are independent solutions to the Schrödinger equation

**Practice progression**

Item types: verify a proposed solution by substitution, compute the Wronskian, determine if a pair is a fundamental set, write the general solution, apply ICs to find c₁ and c₂. Suggested item count: 6.

Start with exponential solutions, then trigonometric solutions, then one exponential and one polynomial

**Assessment objectives**

Formats: verify fundamental set from scratch, compute Wronskian and state independence conclusion, apply two ICs to get specific solution. Bloom alignment: apply.

Mastery signal: Correctly verifies both solutions, computes Wronskian, concludes independence, and applies ICs in ≥ 4 of 5 problems

**Teacher notes**

Abel's identity is one of the most elegant results in basic ODE theory: it says the Wronskian's entire behavior is determined by just P(x), not by the specific solutions chosen. Students find it surprising that W cannot be sometimes zero — emphasize this as a non-obvious structural theorem.

**Student notes**

Two solutions are 'independent' means neither is a multiple of the other — but for second-order ODEs, Abel's theorem gives you a shortcut: compute W at a single convenient point (like x = 0). If it's nonzero there, it's nonzero everywhere.

**Prerequisite graph**

- Requires: math.de.second-order-linear
- Unlocks (future prerequisite links): math.de.char-equation, math.de.wronskian
- Cross-topic connections (graph cross-links): none
- Narrative: The Wronskian is the ODE version of a linear algebra determinant (math.linalg.determinant): W ≠ 0 ↔ the vectors [y₁(x₀), y₁'(x₀)] and [y₂(x₀), y₂'(x₀)] are linearly independent in ℝ², which is exactly the condition for the 2D initial-condition system to have a unique solution.

**Teaching hints — review triggers**

- Student cannot verify a function is a solution by differentiation and substitution
- Student confuses 2×2 Wronskian determinant computation
- Student believes three independent solutions might exist for a second-order ODE

**Spaced repetition / revision guidance**

If you have two candidate solutions and are unsure they are independent, do not try to simplify them first — just compute the Wronskian directly. The 2×2 determinant is fast and definitive.

---

### Wronskian

*Concept ID: `math.de.wronskian` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 3h*

**Learning objective.** Compute the Wronskian W(y₁,y₂) = y₁y₂' − y₁'y₂ for a pair of functions, use it to test linear independence of solutions to y'' + Py' + Qy = 0, and apply Abel's theorem W(x) = W(x₀)exp(−∫P dx) to predict Wronskian behavior without computing it.

W(y₁,y₂) = y₁y₂′ − y₁′y₂; nonzero at some point iff y₁ and y₂ are linearly independent. Abel's theorem gives W(x) = W(x₀)exp(−∫P dx).

The Wronskian of two functions y₁ and y₂ is the 2×2 determinant W(y₁,y₂) = y₁y₂' − y₁'y₂. For solutions to the homogeneous ODE y'' + Py' + Qy = 0, it serves as the primary test of linear independence: if W is nonzero at any point in an interval where P is continuous, the pair is linearly independent (a fundamental set) on the whole interval. Abel's theorem provides the explicit formula W(x) = W(x₀)e^{−∫_{x₀}^x P(t)dt}, showing the Wronskian is completely determined by P alone — independent of the specific solutions y₁, y₂. The Wronskian also appears in the variation-of-parameters formulas for particular solutions.

**Key ideas**

- W(y₁,y₂) = y₁y₂' − y₁'y₂ (a 2×2 determinant)
- For ODE solutions: W ≡ 0 (dependent) or W never zero (independent) — no in-between
- Abel's theorem: W(x) = W(x₀)e^{−∫P dx}; P(x) alone determines how W evolves
- Test: compute W at a single convenient point; if nonzero, the pair is a fundamental set
- Wronskian appears in variation-of-parameters: u₁' = −y₂G/W and u₂' = y₁G/W

**Vocabulary**

- **Wronskian** — W(y₁,y₂) = y₁y₂' − y₁'y₂; a function of x that tests linear independence of solutions to y'' + Py' + Qy = 0.
- **Abel's theorem** — W(x) = W(x₀)exp(−∫_{x₀}^x P dt); the Wronskian of any two solutions is determined by P alone, without needing the solutions explicitly.

**Common misconceptions**

- *Misconception:* W = 0 at a single point implies the functions are linearly dependent
  *Correction:* This is only true for solutions to a linear ODE (where Abel's theorem applies). For general functions (not ODE solutions), W can be zero at isolated points while the functions are still independent. Example: y₁ = x², y₂ = |x|x are independent functions with W(0) = 0.
- *Misconception:* The Wronskian tests linear independence of any two functions
  *Correction:* The Wronskian reliably tests independence only for solutions to a linear ODE. For arbitrary functions, W = 0 is necessary but not sufficient for dependence. The ODE context — specifically Abel's theorem — is what gives the Wronskian its definitive power.
- *Misconception:* Abel's theorem requires knowing the explicit solutions y₁ and y₂
  *Correction:* Abel's theorem W(x) = W(x₀)e^{−∫P dx} depends only on P(x) and the initial value W(x₀). You do not need to know y₁ or y₂ explicitly — just one Wronskian value and the coefficient P.

**Common mistakes in practice**

- Writing the Wronskian as y₁y₂ − y₁'y₂' (wrong: should be y₁y₂' − y₁'y₂)
- Concluding W = 0 at a point implies dependence for arbitrary functions
- Confusing Abel's formula for ODE solutions with a general linear independence test

**Visual teaching opportunities**

- The 2×2 determinant layout with y₁, y₁' and y₂, y₂' clearly labeled in rows vs columns
- Abel's formula plotted for W(x) with P > 0 (W decaying), P < 0 (W growing), P = 0 (W constant) — three cases from the exponential formula
- Side-by-side: two independent solution curves (W ≠ 0) vs. two proportional curves (W = 0)

**Worked example**

*Setup:* For y'' + 2y' + y = 0, suppose y₁ = e^{−x} is one solution. Use Abel's theorem to find W(x) given W(0) = −1, without finding y₂.

1. Step 1: Identify P(x) = 2 from the standard form y'' + 2y' + y = 0. Why: Abel's formula needs P.
2. Step 2: Apply Abel's theorem. W(x) = W(0)·e^{−∫₀ˣ 2 dt} = −1·e^{−2x} = −e^{−2x}. Why: the integral ∫₀ˣ 2 dt = 2x, so the exponential factor is e^{−2x}.
3. Step 3: Conclude W(x) = −e^{−2x} < 0 for all x — never zero. Why: confirms any second solution paired with y₁ will form a fundamental set.
4. Step 4: Verify by finding y₂ directly. The characteristic equation r² + 2r + 1 = (r+1)² = 0 gives repeated root r = −1, so y₂ = xe^{−x}. Compute W(y₁,y₂) directly: W = e^{−x}·(e^{−x} − xe^{−x}) − (−e^{−x})·xe^{−x} = e^{−2x} − xe^{−2x} + xe^{−2x} = e^{−2x}. Why: direct verification; note sign difference because W(0) = e⁰ = 1 (direct) vs. W(0) = −1 was hypothetical — Abel's formula is consistent with the actual W(0) = 1.

*Outcome:* Abel's theorem: W(x) = W(0)e^{−2x}. Direct computation: W = e^{−2x}, confirming the formula. For y'' + 2y' + y = 0, the Wronskian is always positive, never zero — {e^{−x}, xe^{−x}} is a fundamental set.

**Real-world intuition**

- The Wronskian appears in Green's function construction for boundary value problems — the inverse of W(x) weights the contribution of each fundamental solution
- Control theory: the controllability Gramian (a Wronskian analog) determines whether a system state can be driven to zero

**Practice progression**

Item types: compute Wronskian directly from two functions, apply Abel's theorem given W(x₀) and P, determine if a pair is independent (using Wronskian), find W without knowing y₂ using Abel's formula. Suggested item count: 5.

Direct 2×2 determinant, then Abel with constant P, then Abel with variable P(x)

**Assessment objectives**

Formats: compute W and state independence conclusion, apply Abel's theorem to predict W(x) given one IC, explain why W = 0 at one point doesn't imply dependence for non-ODE functions. Bloom alignment: apply.

Mastery signal: Computes W correctly, applies Abel's theorem, and states the correct independence conclusion in ≥ 4 of 5 problems

**Teacher notes**

Emphasize that Abel's theorem is remarkable: you do not need to know y₁ or y₂ to know W(x) up to a constant. This separates 'knowing the solutions' from 'knowing whether solutions are independent.'

**Student notes**

Abel's theorem is a shortcut: instead of computing W = y₁y₂' − y₁'y₂ (which requires knowing both solutions), you can track how W changes using only P(x). This is especially useful when finding an explicit y₂ is hard.

**Prerequisite graph**

- Requires: math.de.second-order-homogeneous, math.linalg.determinant
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.linalg.linear-independence
- Narrative: The Wronskian is the function-space analog of the determinant of a matrix (math.linalg.determinant): W ≠ 0 ↔ the 2D initial-value vectors [y₁(x₀), y₁'(x₀)] and [y₂(x₀), y₂'(x₀)] are independent in ℝ², meaning the 2×2 system for c₁, c₂ (given ICs) is uniquely solvable.

**Teaching hints — review triggers**

- Student cannot compute a 2×2 determinant
- Student confuses row vs. column layout in the Wronskian matrix
- Student does not recognize that W ≠ 0 at one point is sufficient for global independence when dealing with ODE solutions

**Spaced repetition / revision guidance**

If you get W = 0, double-check your derivatives — the most common error is differentiating one of the functions incorrectly. Recompute y₁' and y₂' from scratch, then rebuild the determinant.

---

### Characteristic Equation

*Concept ID: `math.de.char-equation` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.9 · Estimated study time: 4h*

**Learning objective.** For a constant-coefficient second-order ODE ay'' + by' + cy = 0, substitute y = e^{rx} to derive the characteristic equation ar² + br + c = 0, classify the three root cases (distinct real, repeated, complex conjugate), and write the general solution for each case.

For constant-coefficient ODE ay″+by′+cy=0, substituting y=e^{rx} yields the characteristic equation ar²+br+c=0. The three cases (distinct real, repeated, complex roots) yield distinct solution forms.

For the constant-coefficient ODE ay'' + by' + cy = 0, the trial solution y = e^{rx} leads to the algebraic equation ar² + br + c = 0 (the characteristic equation). The three cases of the discriminant b² − 4ac determine three solution forms: (1) two distinct real roots r₁ ≠ r₂: general solution c₁e^{r₁x} + c₂e^{r₂x}; (2) repeated root r₁ = r₂ = r: general solution (c₁ + c₂x)e^{rx}; (3) complex conjugate roots r = α ± βi: general solution e^{αx}(c₁cos(βx) + c₂sin(βx)). The characteristic equation reduces a differential equation to a quadratic — one of the most practical and widely used techniques in applied mathematics.

**Key ideas**

- Trial solution y = e^{rx} converts the ODE to the algebraic characteristic equation ar² + br + c = 0
- Case 1 (b²−4ac > 0): two distinct real roots → c₁e^{r₁x} + c₂e^{r₂x}
- Case 2 (b²−4ac = 0): repeated root r → (c₁ + c₂x)e^{rx} (the xe^{rx} term is essential)
- Case 3 (b²−4ac < 0): complex roots α ± βi → e^{αx}(c₁cos(βx) + c₂sin(βx)) (using Euler's formula)
- All three cases give two linearly independent solutions — one for each root (or root and reduction-of-order companion)

**Vocabulary**

- **characteristic equation** — The algebraic equation ar² + br + c = 0 derived by substituting y = e^{rx} into the constant-coefficient ODE ay'' + by' + cy = 0.
- **repeated root** — A double root r₁ = r₂ of the characteristic equation (discriminant = 0); requires the second solution y₂ = xe^{rx} by reduction of order.
- **critically damped** — The oscillator case b² = 4ac giving a repeated characteristic root; produces the fastest non-oscillatory return to equilibrium.

**Common misconceptions**

- *Misconception:* For repeated root r, the general solution is just c₁e^{rx} (not c₁e^{rx} + c₂xe^{rx})
  *Correction:* With a repeated root, y₁ = e^{rx} is one solution but another independent solution is needed. Reduction of order shows the second solution is y₂ = xe^{rx}. The general solution is (c₁ + c₂x)e^{rx} — both terms are essential to capture the 2D solution space.
- *Misconception:* For complex roots α ± βi, the solution involves complex exponentials e^{(α±βi)x}
  *Correction:* While complex exponentials e^{(α+βi)x} are valid solutions over ℂ, real-valued solutions are obtained by taking real and imaginary parts via Euler's formula: e^{(α±βi)x} = e^{αx}(cos(βx) ± i sin(βx)). The real-valued general solution is e^{αx}(c₁cos(βx) + c₂sin(βx)).
- *Misconception:* The characteristic equation method works for variable-coefficient ODEs
  *Correction:* The characteristic equation is only valid for constant-coefficient ODEs (where a, b, c are constants). For y'' + P(x)y' + Q(x)y = 0 with variable P or Q, other methods (power series, Frobenius) are needed.

**Common mistakes in practice**

- Writing c₁e^{r₁x} + c₂e^{r₂x} when r₁ = r₂ (missing the xe^{rx} term)
- Writing complex exponentials e^{(α+βi)x} instead of the real-valued form e^{αx}(c₁cos βx + c₂sin βx)
- Applying the characteristic equation to a variable-coefficient ODE

**Visual teaching opportunities**

- Three-case flowchart from discriminant b²−4ac: > 0 → real distinct → exponentials; = 0 → repeated → polynomial×exponential; < 0 → complex → oscillatory×exponential
- Solution behavior plots for each case: Case 1 (two growing/decaying exponentials), Case 2 (xe^{rx} grows then decays), Case 3 (oscillation with exponential envelope)
- Spring-mass diagram: underdamped (complex roots, oscillation), critically damped (repeated root), overdamped (real distinct roots)

**Worked example**

*Setup:* Solve y'' − 4y' + 13y = 0.

1. Step 1: Write the characteristic equation. r² − 4r + 13 = 0. Why: substitute y = e^{rx} and factor out e^{rx}.
2. Step 2: Apply the quadratic formula. r = (4 ± √(16 − 52))/2 = (4 ± √(−36))/2 = (4 ± 6i)/2 = 2 ± 3i. Why: discriminant is negative (b² − 4ac = 16 − 52 = −36 < 0), giving complex roots.
3. Step 3: Identify α = 2 and β = 3. Why: the general form e^{αx}(c₁cos(βx) + c₂sin(βx)) requires these values.
4. Step 4: Write the general solution. y = e^{2x}(c₁cos(3x) + c₂sin(3x)). Why: real-valued form from Euler's formula, replacing complex exponentials with sine and cosine.
5. Step 5: Verify by substitution (spot check). Take y = e^{2x}cos(3x). Then y' = 2e^{2x}cos(3x) − 3e^{2x}sin(3x), y'' = (4−9)e^{2x}cos(3x) − 12e^{2x}sin(3x) = −5e^{2x}cos(3x) − 12e^{2x}sin(3x). Then y'' − 4y' + 13y = (−5 − 4·2 + 13·1)e^{2x}cos(3x) + (−12 − 4·(−3) + 0)e^{2x}sin(3x) = (−5−8+13)e^{2x}cos(3x) + (−12+12)e^{2x}sin(3x) = 0. ✓

*Outcome:* General solution y = e^{2x}(c₁cos(3x) + c₂sin(3x)). The solution oscillates with angular frequency β = 3 and grows with rate α = 2 — it represents an underdamped oscillator with negative damping (growing amplitude).

**Real-world intuition**

- Electrical circuits: RLC circuit's characteristic equation determines whether the circuit response is overdamped, critically damped, or oscillatory
- Mechanical vibration: the three damping cases of a spring-mass-damper are exactly the three characteristic root cases
- Control systems: stability of a linear system is determined by the sign of real parts of characteristic roots

**Practice progression**

Item types: write and solve the characteristic equation, identify the case (distinct/repeated/complex), write the general solution, apply ICs to a specific IVP, classify by physical behavior (underdamped/overdamped/critically damped). Suggested item count: 8.

Distinct real roots first, then complex, then repeated (which requires the most care), then all three in mixed practice

**Assessment objectives**

Formats: full solve from ODE to general solution, given roots, write the general solution form, apply two ICs to get specific solution. Bloom alignment: apply.

Mastery signal: Correctly identifies root case, writes the appropriate solution form, applies ICs in ≥ 5 of 6 problems

**Teacher notes**

Students consistently forget the xe^{rx} term for repeated roots. Explain why: two solutions must be linearly independent, but two copies of e^{rx} are not — so a new linearly independent function xe^{rx} (found by reduction of order) must be introduced.

**Student notes**

Remember: the characteristic equation turns an ODE into a quadratic. Solve the quadratic, check the discriminant, and the sign tells you which of three cookie-cutter solution forms to write. Then add ICs.

**Prerequisite graph**

- Requires: math.de.second-order-homogeneous, math.alg.quadratic-formula
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.linalg.characteristic-polynomial
- Narrative: The characteristic equation is algebraically identical to the characteristic polynomial of a 2×2 matrix (math.linalg.characteristic-polynomial), and the three root cases correspond to the three eigenvalue structures: distinct real eigenvalues, repeated eigenvalue, complex conjugate eigenvalues. This is the deep link between second-order ODEs and matrix eigenvalue theory.

**Teaching hints — review triggers**

- Student cannot apply the quadratic formula or factor a quadratic
- Student does not know Euler's formula e^{iθ} = cos θ + i sin θ to convert complex exponentials
- Student omits the xe^{rx} term for repeated roots

**Spaced repetition / revision guidance**

If you cannot remember which solution form corresponds to which root case, derive them: Case 1 (r₁ ≠ r₂): y = Ae^{r₁x} + Be^{r₂x} — two independent exponentials. Case 2 (r₁ = r₂ = r): reduction of order gives y = (A + Bx)e^{rx}. Case 3 (r = α ± βi): Euler's formula e^{(α±βi)x} → e^{αx}(cos βx ± i sin βx), then take real combinations.

---

### Method of Undetermined Coefficients

*Concept ID: `math.de.undetermined-coefficients` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Find a particular solution to a constant-coefficient ODE ay'' + by' + cy = G(x) by assuming a trial solution of the same form as G when G is a polynomial, exponential, sine, cosine, or product thereof; apply the modification rule when the trial overlaps with the homogeneous solution.

A technique for finding a particular solution to ay″+by′+cy=G(x) when G(x) is a polynomial, exponential, sine, cosine, or product thereof. Assumes a trial solution of the same form as G(x) and solves for unknown coefficients.

The method of undetermined coefficients finds a particular solution y_p by guessing a trial function whose form mirrors G(x): a degree-n polynomial trial for a polynomial G; Ae^{kx} for G = e^{kx}; A cos(mx) + B sin(mx) for G = cos(mx) or sin(mx); and products/combinations for product-type G. The trial is substituted into the ODE and the unknown coefficients are determined by matching. The critical exception is the modification rule: if the natural trial overlaps with a term in the homogeneous solution y_h, the trial must be multiplied by x (or x² for a double overlap). This method is fast and systematic, though limited to the specific G(x) forms listed.

**Key ideas**

- Trial solution form matches G(x): polynomial ↔ polynomial, exponential ↔ exponential, trig ↔ both sin and cos
- Substitute trial into the ODE and equate coefficients to solve for unknowns
- Modification rule: if any term of the trial is a solution of the homogeneous equation, multiply the entire trial by x
- Double modification (multiply by x²) if the overlap corresponds to a repeated characteristic root
- The method works only for constant-coefficient ODEs and the listed G(x) types — for other G, use variation of parameters

**Vocabulary**

- **undetermined coefficients** — The method of assuming a particular solution y_p of the same functional form as G(x) and solving for the unknown coefficients by substitution into the ODE.
- **modification rule** — When the natural trial solution overlaps with a term in y_h, multiply the entire trial by x (or x² for a double overlap) to ensure y_p is not a solution to the homogeneous equation.
- **trial solution** — The assumed form of the particular solution with unknown coefficients; its form is determined by the type of G(x).

**Common misconceptions**

- *Misconception:* If G(x) = sin(3x), the trial is just A sin(3x)
  *Correction:* The trial must be A cos(3x) + B sin(3x) — both sine and cosine together. Differentiation mixes sine and cosine, so both coefficients are needed to match all terms when substituted. Using only A sin(3x) leaves an unmatched cosine after differentiation.
- *Misconception:* The modification rule applies when G has the same form as y_h, regardless of the coefficient
  *Correction:* The modification rule applies when a term in the natural trial is literally a solution of the homogeneous equation. For example, if y_h includes e^{2x} and G = e^{2x}, the trial Ae^{2x} must be replaced by Axe^{2x}. But if y_h includes e^{3x} and G = e^{2x}, no modification is needed.
- *Misconception:* The method works for any forcing function G(x)
  *Correction:* The method is restricted to G(x) that are finite sums of polynomials, exponentials (real or complex), sines, cosines, and their products. For G = ln x, tan x, 1/x, or other forms, use variation of parameters instead.

**Common mistakes in practice**

- Using only A sin(βx) for trigonometric G without including the cosine term
- Forgetting the modification rule when the trial overlaps with y_h
- Applying the method to variable-coefficient ODEs or non-standard G types

**Visual teaching opportunities**

- Table of G(x) → trial solution forms: polynomial, exponential, sine/cosine, exponential×trig, polynomial×exponential
- Modification rule flowchart: natural trial → check overlap with y_h → no overlap: use natural trial; overlap: multiply by x; double overlap: multiply by x²
- Before/after example showing what happens when you forget the modification rule (the undetermined coefficient system becomes inconsistent)

**Worked example**

*Setup:* Find a particular solution to y'' − 3y' + 2y = 4e^{2x}.

1. Step 1: Solve the homogeneous equation. Characteristic equation r² − 3r + 2 = (r−1)(r−2) = 0 gives r = 1, 2. So y_h = c₁eˣ + c₂e^{2x}. Why: must know y_h to check for modification.
2. Step 2: Choose the natural trial for G = 4e^{2x}: y_p = Ae^{2x}. Check: does Ae^{2x} appear in y_h? Yes — e^{2x} is in y_h. Why: modification rule required.
3. Step 3: Apply modification rule. Replace trial by y_p = Axe^{2x}. Why: multiply by x because the natural trial overlaps with a simple (non-repeated) homogeneous solution.
4. Step 4: Compute derivatives. y_p' = Ae^{2x} + 2Axe^{2x}; y_p'' = 4Ae^{2x} + 4Axe^{2x}. Why: product rule.
5. Step 5: Substitute into ODE. (4Ae^{2x} + 4Axe^{2x}) − 3(Ae^{2x} + 2Axe^{2x}) + 2(Axe^{2x}) = 4e^{2x}. Collect terms: Ae^{2x}(4−3) + Axe^{2x}(4−6+2) = Ae^{2x}(1) + Axe^{2x}(0) = Ae^{2x} = 4e^{2x}. Why: the xe^{2x} terms cancel (this is why the modification rule works).
6. Step 6: Solve for A. A = 4. So y_p = 4xe^{2x}. Why: unique coefficient from matching.

*Outcome:* y_p = 4xe^{2x}. General solution: y = c₁eˣ + c₂e^{2x} + 4xe^{2x}. Verify: y_p'' − 3y_p' + 2y_p = 4e^{2x}. ✓

**Real-world intuition**

- Forced oscillation: driving a spring-mass system at a frequency not equal to natural frequency → particular solution gives the steady-state forced response
- AC circuits: driving an RLC circuit with V(t) = V₀ cos(ωt) → particular solution gives the steady-state current waveform
- Heat equation with a steady forcing: polynomial forcing on a beam gives polynomial particular solution

**Practice progression**

Item types: identify trial form without modification, identify trial form with modification, solve for coefficients after substituting trial, solve full nonhomogeneous ODE, identify the error in a trial that violated the modification rule. Suggested item count: 8.

Polynomial G → exponential G → trig G → exponential×trig → cases requiring modification

**Assessment objectives**

Formats: write the correct trial (including modification if needed), find y_p by solving the coefficient system, write the complete general solution. Bloom alignment: apply.

Mastery signal: Correctly identifies and applies (or does not apply) the modification rule, substitutes the trial, and solves for coefficients in ≥ 5 of 6 problems

**Teacher notes**

The reason the modification rule multiplies by x — not by some other function — is best understood via reduction of order: the second independent solution to a homogeneous equation is always obtained by multiplying by x. The modification rule borrows this mechanism.

**Student notes**

Start by writing down the natural trial (matching G's type). Then check: does any part of your trial also appear in y_h? If yes, multiply the whole trial by x. Substitute, collect coefficients, solve. Simple algorithm — the only trap is forgetting to check overlap.

**Prerequisite graph**

- Requires: math.de.second-order-linear, math.de.char-equation
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Undetermined coefficients is the particular-solution complement to the characteristic equation (math.de.char-equation): the characteristic equation finds y_h, undetermined coefficients finds y_p, and together they give the full general solution. The modification rule is forced by the same structure that gives repeated roots the xe^{rx} term.

**Teaching hints — review triggers**

- Student forgets to include both sine and cosine in the trial for trigonometric G
- Student does not check for overlap between trial and y_h (modification rule)
- Student cannot solve a small linear system for the undetermined coefficients

**Spaced repetition / revision guidance**

If your coefficient system has no solution after substituting the trial, the trial is wrong — most likely you forgot the modification rule. Check whether your trial contains any function that solves the homogeneous equation, and if so, multiply by x.

---

### Variation of Parameters

*Concept ID: `math.de.variation-of-parameters` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Apply variation of parameters to find a particular solution to y'' + P(x)y' + Q(x)y = G(x) by setting y_p = u₁y₁ + u₂y₂, solving the Wronskian system for u₁' and u₂', and integrating to get u₁ and u₂.

A general technique for finding particular solutions to y″+P(x)y′+Q(x)y=G(x) using the known fundamental set {y₁,y₂}. Sets y_p = u₁y₁+u₂y₂ and imposes conditions to determine u₁′,u₂′ via the Wronskian.

Variation of parameters is a general method for finding y_p to y'' + Py' + Qy = G given any fundamental set {y₁, y₂}, with no restriction on G(x). The key idea: replace the constants c₁, c₂ in the homogeneous solution by functions u₁(x), u₂(x), so y_p = u₁y₁ + u₂y₂. Imposing the condition u₁'y₁ + u₂'y₂ = 0 (to suppress second-derivative complexity) alongside the ODE constraint leads to the Wronskian system: u₁' = −y₂G/W and u₂' = y₁G/W, where W = W(y₁,y₂). Then u₁ = ∫(−y₂G/W)dx and u₂ = ∫(y₁G/W)dx. The method works for any G(x) where the integrals can be evaluated — making it strictly more general than undetermined coefficients.

**Key ideas**

- Set y_p = u₁(x)y₁ + u₂(x)y₂ with the constraint u₁'y₁ + u₂'y₂ = 0
- The Wronskian system: u₁' = −y₂G/W and u₂' = y₁G/W
- Integrate: u₁ = ∫(−y₂G/W)dx, u₂ = ∫(y₁G/W)dx
- Works for any G(x), including ln x, tan x, and other functions excluded from undetermined coefficients
- Requires knowing y₁, y₂ (the fundamental set) — usually found first by the characteristic equation

**Vocabulary**

- **variation of parameters** — A general method for finding y_p = u₁y₁ + u₂y₂ by treating the constants as functions and solving the Wronskian system u₁' = −y₂G/W, u₂' = y₁G/W.
- **Wronskian system** — The 2×2 linear system [y₁ y₂; y₁' y₂'][u₁'; u₂'] = [0; G] solved by Cramer's rule to give the variation-of-parameters formulas.

**Common misconceptions**

- *Misconception:* Variation of parameters and undetermined coefficients always give the same y_p
  *Correction:* They give the same y_p (up to adding homogeneous solutions, which don't change the final answer). For G types where both methods apply, variation of parameters is more work but always valid; for G types where undetermined coefficients fails (G = ln x, etc.), variation of parameters is the only option.
- *Misconception:* The condition u₁'y₁ + u₂'y₂ = 0 is arbitrary
  *Correction:* This condition is an imposed simplification: it eliminates the term u₁'y₁' + u₂'y₂' that would appear in y_p'' if no constraint is applied. Without it, the system for u₁' and u₂' would be underdetermined (two unknowns, only one equation). The constraint provides the second equation needed for a unique solution.
- *Misconception:* You integrate y₂G/W and y₁G/W with the same sign for both u₁ and u₂
  *Correction:* u₁' = −y₂G/W (negative sign) and u₂' = +y₁G/W (positive sign). The asymmetry comes from Cramer's rule applied to the Wronskian system: the sign difference is essential and must not be omitted.

**Common mistakes in practice**

- Swapping the sign on u₁' and u₂' (both positive or both negative)
- Using the wrong W (computing y₁y₂ − y₁'y₂' instead of y₁y₂' − y₁'y₂)
- Forgetting to add the integration constants (which merge into the homogeneous solution's c₁, c₂)

**Visual teaching opportunities**

- Derivation flowchart: y_p = u₁y₁ + u₂y₂ → differentiate with constraint → substitute into ODE → Wronskian system → integrate
- Cramer's rule diagram applied to the 2×2 Wronskian system [y₁ y₂; y₁' y₂'][u₁'; u₂'] = [0; G], showing the −y₂G/W and +y₁G/W formulas emerge from cofactor expansion
- Side-by-side comparison: undetermined coefficients (fast for simple G) vs. variation of parameters (always works, more computation)

**Worked example**

*Setup:* Find a particular solution to y'' − y = eˣ/x using variation of parameters. (Undetermined coefficients fails because G = eˣ/x is not a standard trial type.)

1. Step 1: Solve the homogeneous equation. r² − 1 = 0 → r = ±1. Fundamental set: y₁ = eˣ, y₂ = e^{−x}. Why: need y₁ and y₂ before applying the formulas.
2. Step 2: Compute the Wronskian. W = y₁y₂' − y₁'y₂ = eˣ·(−e^{−x}) − eˣ·e^{−x} = −1 − 1 = −2. Why: W appears in the denominator of both formulas.
3. Step 3: Set up u₁' and u₂'. u₁' = −y₂G/W = −e^{−x}·(eˣ/x)/(−2) = 1/(2x). u₂' = y₁G/W = eˣ·(eˣ/x)/(−2) = −e^{2x}/(2x). Why: direct application of the Wronskian formulas.
4. Step 4: Integrate u₁'. u₁ = ∫(1/(2x))dx = (1/2)ln|x|. Why: standard logarithmic integral.
5. Step 5: Integrate u₂'. u₂ = ∫(−e^{2x}/(2x))dx = −(1/2)Ei(2x), where Ei is the exponential integral. Why: this integral has no elementary form — the answer involves a special function, which is acceptable for variation of parameters.
6. Step 6: Write y_p. y_p = u₁y₁ + u₂y₂ = (1/2)ln|x|·eˣ − (1/2)Ei(2x)·e^{−x}. Why: combine the integrated functions with their respective fundamental solutions.

*Outcome:* y_p = (eˣ/2)ln|x| − (e^{−x}/2)Ei(2x). The general solution is y = c₁eˣ + c₂e^{−x} + y_p. This illustrates that variation of parameters can produce answers involving special functions — but it always produces an answer, which undetermined coefficients cannot.

**Real-world intuition**

- Forced mechanical systems with non-standard forcing (impacts, non-sinusoidal inputs) — undetermined coefficients fails, variation of parameters succeeds
- Green's function construction for boundary value problems uses the variation-of-parameters integral formula
- Input-output integral formula in linear systems theory: y(t) = ∫₀ᵗ G(t,s)u(s)ds is the continuous analog

**Practice progression**

Item types: set up u₁' and u₂' from given y₁, y₂, G, integrate to find u₁ and u₂, write y_p, full solve with variation of parameters, determine whether undetermined coefficients or variation of parameters is more appropriate. Suggested item count: 6.

Start with G = sec x (standard textbook case), then G = eˣ/x (special function), then G = tan x

**Assessment objectives**

Formats: set up (but not necessarily evaluate) the integrals for u₁ and u₂, solve a specific ODE using variation of parameters, explain why the negative sign appears in u₁' = −y₂G/W. Bloom alignment: apply.

Mastery signal: Correctly sets up the Wronskian system, writes the correct formulas (with signs), and evaluates the integrals in ≥ 4 of 5 problems

**Teacher notes**

Derive the Wronskian system in class rather than just stating the formulas. Students who see Cramer's rule applied to [y₁ y₂; y₁' y₂'][u₁'; u₂'] = [0; G] understand why W appears in the denominator and why the signs are asymmetric — memorization becomes unnecessary.

**Student notes**

Two steps define variation of parameters: (1) write y_p = u₁y₁ + u₂y₂, (2) use the formulas u₁' = −y₂G/W and u₂' = y₁G/W and integrate. The hardest step is usually the integration — and for some G, the integrals require special functions or numerical evaluation.

**Prerequisite graph**

- Requires: math.de.wronskian, math.de.second-order-homogeneous, math.calc.integration-by-parts
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The Wronskian W in variation of parameters is the same Wronskian (math.de.wronskian) used to check linear independence — here it plays a second role as the denominator in Cramer's rule. Integration by parts (math.calc.integration-by-parts) is frequently needed to evaluate the u₁ and u₂ integrals.

**Teaching hints — review triggers**

- Student cannot compute the Wronskian W correctly
- Student confuses the sign on u₁' (should be −y₂G/W, not +y₂G/W)
- Student does not know how to evaluate the integrals ∫y₂G/W dx

**Spaced repetition / revision guidance**

If the integrals for u₁ and u₂ look very hard, double-check that you have y₁ and y₂ correct (try substituting them back into the homogeneous ODE) and that W is correctly computed. Errors in y₁, y₂, or W are the most common source of intractable integrals.

---

### Harmonic Oscillator

*Concept ID: `math.de.harmonic-oscillator` · Difficulty: advanced · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 6h*

**Learning objective.** Classify the spring-mass-damper ODE my'' + by' + ky = F(t) by its damping parameter β = b/(2m), identify the four damping cases (undamped, underdamped, critically damped, overdamped), write the homogeneous solution for each case, and find the particular solution for sinusoidal forcing.

The ODE my″+by′+ky=F(t) models spring-mass-damper systems. Cases: undamped (b=0), underdamped (b²<4mk), critically damped (b²=4mk), overdamped (b²>4mk). Each case determines the transient behavior.

The harmonic oscillator ODE my'' + by' + ky = F(t) models spring-mass-damper systems. The discriminant of the characteristic equation determines the behavior: (1) undamped (b = 0): pure oscillation at natural frequency ω₀ = √(k/m); (2) underdamped (b² < 4mk): oscillation with decaying amplitude e^{−βt}, frequency ω_d = √(ω₀² − β²); (3) critically damped (b² = 4mk): fastest non-oscillatory return to equilibrium, solution (c₁ + c₂t)e^{−βt}; (4) overdamped (b² > 4mk): exponential decay without oscillation, solution c₁e^{r₁t} + c₂e^{r₂t} with r₁, r₂ < 0 distinct. For sinusoidal forcing F = F₀cos(ωt), the steady-state particular solution is found by undetermined coefficients.

**Key ideas**

- Natural frequency ω₀ = √(k/m); damping ratio β = b/(2m)
- Four cases based on b²−4mk: undamped → pure trig; underdamped → damped trig; critically damped → polynomial×exponential; overdamped → two exponentials
- All damped cases (b > 0) have transient homogeneous solution decaying to zero; steady state is the particular solution
- Underdamped oscillation: amplitude decays as e^{−βt}, oscillates at ω_d = √(ω₀² − β²) < ω₀
- For sinusoidal forcing F = F₀cos(ωt), undetermined coefficients gives the steady-state forced response

**Vocabulary**

- **natural frequency** — ω₀ = √(k/m); the oscillation frequency of an undamped spring-mass system.
- **damping ratio** — β = b/(2m); determines whether the system is underdamped (β < ω₀), critically damped (β = ω₀), or overdamped (β > ω₀).
- **damped frequency** — ω_d = √(ω₀² − β²); the actual oscillation frequency in an underdamped system, always less than ω₀.
- **transient response** — The homogeneous solution y_h that decays to zero as t → ∞ in a damped system; represents the initial condition's influence dying out.

**Common misconceptions**

- *Misconception:* Overdamped systems return to equilibrium faster than critically damped
  *Correction:* Critically damped is the borderline case that returns to equilibrium the fastest without oscillating. Overdamped systems return more slowly (the extra damping slows the exponential decay). This is why critically damped is the engineering target for shock absorbers — fastest non-oscillatory return.
- *Misconception:* The damped oscillation frequency ω_d equals the natural frequency ω₀
  *Correction:* In underdamped systems, ω_d = √(ω₀² − β²) < ω₀. Damping reduces the oscillation frequency. Only in the zero-damping limit β → 0 does ω_d → ω₀. Confusing ω₀ and ω_d gives incorrect period predictions.
- *Misconception:* The general solution is always just the homogeneous solution
  *Correction:* For forced oscillators (F ≠ 0), the general solution is y_h + y_p: the transient (y_h, decays to zero for b > 0) plus the steady-state (y_p, which persists). The forced response y_p is the physically observable long-term behavior.

**Common mistakes in practice**

- Confusing ω₀ and ω_d in the underdamped solution
- Using the underdamped solution form for critically damped (forgetting the repeated-root form)
- Ignoring y_p for forced systems and reporting only the transient

**Visual teaching opportunities**

- Side-by-side oscillation plots for the four cases: undamped (constant amplitude), underdamped (decaying envelope), critically damped (fastest non-oscillatory), overdamped (slow exponential decay)
- Phase diagram of b vs. k/m showing the boundary b² = 4mk separating underdamped from overdamped regions, with critical damping on the boundary curve
- Transient + steady state decomposition: plot of y_h (decaying) + y_p (sinusoidal) and their sum, showing the approach to steady-state forced oscillation

**Worked example**

*Setup:* A spring-mass-damper with m = 1, b = 4, k = 4 is released from rest at y(0) = 2, y'(0) = 0 with no forcing (F = 0). Find y(t).

1. Step 1: Write the ODE. y'' + 4y' + 4y = 0. Why: standard form with m = 1, b = 4, k = 4.
2. Step 2: Characteristic equation. r² + 4r + 4 = (r + 2)² = 0. Repeated root r = −2. Why: b² − 4mk = 16 − 16 = 0 → critically damped case.
3. Step 3: Write the general solution. y = (c₁ + c₂t)e^{−2t}. Why: repeated-root form (c₁ + c₂t)e^{rt}.
4. Step 4: Apply y(0) = 2. c₁ = 2. Why: at t = 0, e⁰ = 1.
5. Step 5: Compute y' and apply y'(0) = 0. y' = c₂e^{−2t} − 2(c₁ + c₂t)e^{−2t}. At t = 0: c₂ − 2c₁ = 0, so c₂ = 4. Why: initial velocity condition.
6. Step 6: Specific solution. y = (2 + 4t)e^{−2t}. Why: substitute c₁ = 2, c₂ = 4.

*Outcome:* y = (2 + 4t)e^{−2t}. This is critical damping: y rises initially due to the 4t term, reaches a maximum at t = (c₂−2c₁)/(2c₂) = (4−4)/8... actually peak at dy/dt = 0: y' = (4 − 2(2+4t))e^{−2t} = (4 − 4 − 8t)e^{−2t} = −8te^{−2t} = 0 at t = 0, so the system starts at y = 2 and decays monotonically to zero — no overshoot. This is the defining property of critical damping.

**Real-world intuition**

- Automotive shock absorbers: designed for critical damping (fastest non-oscillatory return after a bump)
- Earthquake engineering: building designs must avoid resonance and choose appropriate damping
- Electronic filter design: RC/RLC circuits implement all four damping cases for signal processing
- Pendulum clocks: near-undamped, carefully maintained to sustain oscillation

**Practice progression**

Item types: classify damping case from m, b, k values, solve undamped IVP, solve underdamped IVP, solve critically damped IVP, solve overdamped IVP, find steady-state for sinusoidal forcing. Suggested item count: 7.

Undamped first, then underdamped, then critically damped, then overdamped, then forced

**Assessment objectives**

Formats: classify and solve an IVP for each damping case, sketch the qualitative behavior (label axes, show envelope), identify the physical meaning of each constant in the solution. Bloom alignment: apply.

Mastery signal: Correctly classifies damping, writes the appropriate solution form, applies ICs, and describes qualitative behavior in ≥ 5 of 6 problems

**Teacher notes**

The harmonic oscillator is where abstract ODE theory becomes physically immediate. Use the spring-mass diagram throughout — students who can point at the spring (k), dashpot (b), and mass (m) in a diagram have an intuitive anchor for which parameter controls which behavior.

**Student notes**

Check b² vs. 4mk first — this single comparison tells you which of four solution types to write. Then substitute into the appropriate formula. For forced systems, add y_p using undetermined coefficients after identifying the steady-state form.

**Prerequisite graph**

- Requires: math.de.char-equation, math.de.undetermined-coefficients
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.trig.trig-functions
- Narrative: Harmonic oscillator directly connects to the characteristic equation (math.de.char-equation) for the three root cases, undetermined coefficients (math.de.undetermined-coefficients) for the forced response, and resonance (math.de.resonance) for the case ω = ω₀. The same ODE structure appears in RLC circuits and quantum harmonic oscillators.

**Teaching hints — review triggers**

- Student cannot compute √(k/m) or √(ω₀² − β²) for given parameters
- Student confuses which case is 'fastest non-oscillatory' (critically damped vs. overdamped)
- Student omits the y_p term for forced oscillators, reporting only y_h

**Spaced repetition / revision guidance**

If you get confused about which physical behavior corresponds to which mathematical case, remember: damping kills oscillation. More damping (larger b) → fewer oscillations before settling. At exactly b² = 4mk, you hit the boundary — critically damped. Beyond: no oscillation at all — overdamped.

---

### Resonance

*Concept ID: `math.de.resonance` · Difficulty: advanced · Bloom level: analyze · Mastery threshold: 0.8 · Estimated study time: 3h*

**Learning objective.** Explain pure resonance in an undamped oscillator driven at its natural frequency (unbounded amplitude growth), and practical resonance in a damped oscillator (finite maximum amplitude at the resonant forcing frequency ω_r slightly below ω₀), and compute the resonant frequency for a given system.

When the forcing frequency matches the natural frequency of an undamped oscillator, the amplitude grows without bound (pure resonance). In damped systems, resonance occurs at a slightly different frequency (practical resonance).

Resonance occurs when a forcing function drives an oscillator near its natural frequency. In an undamped oscillator (b = 0) driven at exactly ω₀: the forcing term matches a homogeneous solution, so the modification rule applies, giving a particular solution with a factor of t (e.g., y_p = (F₀/2mω₀)t sin(ω₀t)) — amplitude grows without bound as t → ∞. This is pure resonance. In a damped oscillator, the amplitude remains bounded for any finite driving frequency, but reaches a maximum (practical resonance) at the resonant frequency ω_r = √(ω₀² − 2β²) (for small β, ω_r ≈ ω₀). At ω_r, the amplitude M(ω) = F₀/m·[1/√((ω₀²−ω²)² + 4β²ω²)] is maximized. Pure resonance is the limiting case ω_r → ω₀ as β → 0.

**Key ideas**

- Pure resonance (undamped, ω = ω₀): modification rule gives t·sin term → amplitude grows linearly with t
- Practical resonance (damped): maximum steady-state amplitude at ω_r = √(ω₀² − 2β²) < ω₀
- Amplitude function M(ω) = F₀/m ÷ √((ω₀²−ω²)² + 4β²ω²) peaks at ω = ω_r for β < ω₀/√2
- For large damping β ≥ ω₀/√2, no peak exists (amplitude decreases monotonically with ω) — no practical resonance
- Phase lag: the forced response lags the forcing by φ = arctan(2βω/(ω₀²−ω²)); at ω = ω₀, φ = π/2 regardless of β

**Vocabulary**

- **pure resonance** — The case of an undamped oscillator driven at exactly its natural frequency ω₀; the particular solution contains a t·sin(ω₀t) term that grows without bound.
- **practical resonance** — The forcing frequency ω_r = √(ω₀² − 2β²) at which a damped oscillator reaches maximum steady-state amplitude; exists only for β < ω₀/√2.
- **amplitude function** — M(ω) = F₀/m ÷ √((ω₀²−ω²)² + 4β²ω²); describes how the steady-state amplitude depends on the forcing frequency ω.
- **phase lag** — φ = arctan(2βω/(ω₀²−ω²)); the angle by which the forced response lags behind the forcing function; equals π/2 at ω = ω₀.

**Common misconceptions**

- *Misconception:* Resonance always causes infinite amplitude
  *Correction:* Only pure resonance (undamped system driven at exactly ω₀) produces unbounded amplitude. In any damped system, amplitude remains bounded at all forcing frequencies — resonance just causes a local maximum in the amplitude-frequency curve, not infinite amplitude.
- *Misconception:* Practical resonance occurs at ω = ω₀
  *Correction:* For a damped system, the resonant frequency ω_r = √(ω₀² − 2β²) is slightly below ω₀ (not equal to it). For very light damping β ≈ 0, ω_r ≈ ω₀, but they are not the same. At ω = ω₀ exactly, the amplitude is F₀/m ÷ 2βω₀, which is finite for β > 0.
- *Misconception:* Any driving frequency causes resonance
  *Correction:* Resonance is a specific phenomenon near ω₀. For frequencies far below or far above ω₀, the amplitude is small. The amplitude function M(ω) has a peak only near ω₀ — this peak is resonance.

**Common mistakes in practice**

- Claiming resonance produces infinite amplitude in all systems (only undamped pure resonance does)
- Confusing ω_r (practical resonance frequency) with ω₀ (natural frequency)
- Forgetting the modification rule for pure resonance and getting A·cos(ω₀t) as the trial (which has no solution)

**Visual teaching opportunities**

- Amplitude-frequency graph M(ω) for several values of β (undamped → peaked curves → flat curve for large β), showing how the resonance peak sharpens as β → 0 and diverges at β = 0
- Time-domain plot of pure resonance: y_p = t·sin(ω₀t), showing linearly growing envelope
- Phase-frequency graph φ(ω) for several β values, showing the π/2 phase lag at ω = ω₀ for all β

**Worked example**

*Setup:* For the undamped oscillator y'' + 4y = 2cos(2t) (ω₀ = 2, forcing at ω = 2), find y_p and describe the behavior.

1. Step 1: Identify pure resonance. ω₀ = √4 = 2 and the forcing frequency ω = 2. ω = ω₀, so this is pure resonance in an undamped system. Why: the forcing frequency matches the natural frequency.
2. Step 2: The homogeneous solution is y_h = c₁cos(2t) + c₂sin(2t). The natural trial for G = 2cos(2t) is A cos(2t) + B sin(2t) — this overlaps with y_h. Why: must apply the modification rule.
3. Step 3: Modified trial: y_p = t(A cos(2t) + B sin(2t)). Compute derivatives: y_p' = (A cos 2t + B sin 2t) + t(−2A sin 2t + 2B cos 2t); y_p'' = (−2A sin 2t + 2B cos 2t) + (−2A sin 2t + 2B cos 2t) + t(−4A cos 2t − 4B sin 2t) = (−4A sin 2t + 4B cos 2t) − 4t(A cos 2t + B sin 2t). Why: product rule applied twice.
4. Step 4: Substitute y_p'' + 4y_p = 2cos(2t). (−4A sin 2t + 4B cos 2t) − 4t(A cos 2t + B sin 2t) + 4t(A cos 2t + B sin 2t) = 2cos 2t. The t-terms cancel: −4A sin 2t + 4B cos 2t = 2cos 2t. Why: the modification rule forces the t-terms to cancel, leaving a clean match.
5. Step 5: Match coefficients. 4B = 2 → B = 1/2; −4A = 0 → A = 0. So y_p = (t/2)sin(2t). Why: B and A uniquely determined.
6. Step 6: General solution: y = c₁cos(2t) + c₂sin(2t) + (t/2)sin(2t). The t/2 factor shows the amplitude grows linearly with t.

*Outcome:* y_p = (t/2)sin(2t). For large t, the term (t/2)sin(2t) dominates and the amplitude grows linearly without bound — this is pure resonance. In practice, the structure eventually fails before infinite amplitude is reached (spring breaks, etc.).

**Real-world intuition**

- Tacoma Narrows Bridge (1940): wind-driven resonance caused catastrophic oscillation and collapse
- MRI scanners: resonance at the Larmor frequency of hydrogen protons is the physical basis of imaging
- Radio tuning: capacitor adjusted to match the LC circuit's resonant frequency to the broadcast frequency
- Microwave ovens: microwave frequency matches water molecule rotational resonance

**Practice progression**

Item types: identify whether resonance occurs given ω₀ and ω, find y_p for pure resonance (modification rule), compute ω_r for a damped system, sketch M(ω) qualitatively, find the maximum amplitude at resonance. Suggested item count: 5.

Pure resonance identification → pure resonance y_p → practical resonance ω_r → full M(ω) analysis

**Assessment objectives**

Formats: identify and solve pure resonance IVP, compute practical resonant frequency ω_r from system parameters, sketch and label the amplitude-frequency curve. Bloom alignment: analyze.

Mastery signal: Correctly identifies resonance type, applies modification rule for pure resonance, computes ω_r for damped case in ≥ 4 of 5 problems

**Teacher notes**

Show a video of the Tacoma Narrows Bridge collapse before the derivation — the visual impact makes resonance real. After the video, ask: 'What mathematical structure causes this?' Then derive the t·sin term that shows unbounded growth.

**Student notes**

Pure resonance is just the modification rule in action: when ω = ω₀ in an undamped system, the 'natural' particular solution A cos(ω₀t) is already a homogeneous solution, so the modified trial t·(A cos + B sin) produces the t·sin term. The linearly growing amplitude is a mathematical consequence of the ODE structure.

**Prerequisite graph**

- Requires: math.de.harmonic-oscillator
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Resonance links directly to the harmonic oscillator (math.de.harmonic-oscillator), the characteristic equation (math.de.char-equation) via the modification rule, and Fourier analysis (math.de.fourier-series): any periodic forcing can be decomposed into sinusoidal components, and the component near ω₀ causes the dominant resonant response.

**Teaching hints — review triggers**

- Student cannot compute ω₀ = √(k/m) from system parameters
- Student forgets the modification rule when ω = ω₀ in the undamped case
- Student cannot differentiate ω_r = √(ω₀² − 2β²) from ω₀

**Spaced repetition / revision guidance**

To check whether resonance applies: (1) solve the homogeneous equation to get ω₀; (2) compare ω₀ to the forcing frequency ω; (3) if b = 0 and ω = ω₀ — pure resonance, apply modification rule; if b > 0 — no pure resonance, compute ω_r = √(ω₀² − 2β²) for the practical resonance frequency.

---

### Higher-Order Linear ODE

*Concept ID: `math.de.higher-order-ode` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** Extend the second-order theory to nth-order linear constant-coefficient ODEs: state the n-dimensional solution space, solve by finding all roots of the degree-n characteristic polynomial (including multiplicities and complex roots), and write the general solution using n free constants.

An nth-order linear ODE has n linearly independent solutions forming an n-dimensional solution space. Constant-coefficient case solved by characteristic polynomial of degree n; methods generalize from second-order case.

An nth-order linear constant-coefficient ODE a_n y^{(n)} + ⋯ + a₁y' + a₀y = G(x) has a solution space that is n-dimensional when G = 0: exactly n linearly independent solutions exist, and the general homogeneous solution has n free constants. The characteristic polynomial a_n r^n + ⋯ + a₁r + a₀ = 0 may have real distinct roots, repeated real roots, or complex conjugate pairs — each contributing solution components just as in the second-order case, but with the polynomial multiplier xe^{rx} extended: a root r of multiplicity m contributes m independent solutions e^{rx}, xe^{rx}, x²e^{rx}, …, x^{m−1}e^{rx}. Complex roots α ± βi of multiplicity m contribute 2m real solutions. The nonhomogeneous case is solved by y_h + y_p with undetermined coefficients or variation of parameters as before.

**Key ideas**

- nth-order linear ODE has n-dimensional homogeneous solution space (n free constants)
- Characteristic polynomial of degree n has n roots (counting multiplicity, over ℂ)
- Root r of multiplicity m → m independent solutions: e^{rx}, xe^{rx}, …, x^{m−1}e^{rx}
- Complex roots α ± βi of multiplicity m → 2m real solutions: x^k e^{αx}cos(βx) and x^k e^{αx}sin(βx) for k = 0,…,m−1
- The general solution is the linear combination of all n basis solutions; n initial conditions determine all n constants

**Vocabulary**

- **nth-order linear ODE** — An ODE a_n y^{(n)} + ⋯ + a₀y = G with n-dimensional homogeneous solution space; n constants determined by n initial conditions.
- **multiplicity (characteristic root)** — The number of times a root r appears as a factor of the characteristic polynomial; a root of multiplicity m contributes m independent solutions e^{rx}, xe^{rx}, …, x^{m−1}e^{rx}.

**Common misconceptions**

- *Misconception:* A fourth-order ODE might have only 2 or 3 independent solutions
  *Correction:* For a linear nth-order ODE with continuous coefficients, the solution space is exactly n-dimensional — always. A fourth-order ODE has exactly 4 linearly independent solutions forming the general solution. This follows from the existence-uniqueness theorem for higher-order linear ODEs.
- *Misconception:* A repeated root r of multiplicity 3 gives only one solution e^{rx}
  *Correction:* Multiplicity 3 gives three linearly independent solutions: e^{rx}, xe^{rx}, and x²e^{rx}. In general, a root of multiplicity m gives m solutions: e^{rx}, xe^{rx}, …, x^{m−1}e^{rx}. Using only e^{rx} misses m−1 independent solutions and gives an incomplete general solution.
- *Misconception:* Complex roots α ± βi contribute only 2 solutions regardless of multiplicity
  *Correction:* Complex conjugate pair α ± βi of multiplicity m contributes 2m real solutions. Each multiplicity level k = 0, 1, …, m−1 produces x^k e^{αx}cos(βx) and x^k e^{αx}sin(βx) — just as real repeated roots produce the polynomial factor xᵏ.

**Common mistakes in practice**

- Using only e^{rx} for a repeated root (missing the x^k factors for k ≥ 1)
- Counting complex conjugate pair α ± βi as one solution instead of two (cos and sin)
- Using n − 1 initial conditions instead of n (underdetermines the constants)

**Visual teaching opportunities**

- Table: root type → solution contribution, for real simple, real repeated (m=2,3), complex simple, complex repeated
- Polynomial factoring diagram: degree-4 characteristic polynomial with roots r₁ (simple real), r₂ = r₃ (repeated real), r₄ = r₅* (complex pair) — showing how each root type maps to solution components
- Solution space vector diagram for a 4th-order ODE: 4D space, 4 basis vectors, each labeled with its corresponding characteristic root

**Worked example**

*Setup:* Find the general solution to y^{(4)} − 5y'' + 4y = 0.

1. Step 1: Write the characteristic equation. r⁴ − 5r² + 4 = 0. Why: substitute y = e^{rx} and factor out e^{rx}.
2. Step 2: Factor. Let u = r². u² − 5u + 4 = (u−1)(u−4) = 0, so u = 1 or u = 4. Thus r² = 1 → r = ±1; r² = 4 → r = ±2. Why: the even-power structure allows factoring as a quadratic in r².
3. Step 3: Four distinct real roots: r = 1, −1, 2, −2. Why: all roots are simple (multiplicity 1), each contributing one basis solution.
4. Step 4: Write four independent solutions. y₁ = eˣ, y₂ = e^{−x}, y₃ = e^{2x}, y₄ = e^{−2x}. Why: one exponential per simple real root.
5. Step 5: General solution. y = c₁eˣ + c₂e^{−x} + c₃e^{2x} + c₄e^{−2x}. Why: linear combination of all four basis solutions; four constants match the four initial conditions needed.

*Outcome:* y = c₁eˣ + c₂e^{−x} + c₃e^{2x} + c₄e^{−2x}. Four ICs y(0), y'(0), y''(0), y'''(0) determine c₁, c₂, c₃, c₄ uniquely. Equivalently: y = A cosh(x) + B sinh(x) + C cosh(2x) + D sinh(2x).

**Real-world intuition**

- Beam bending: EI·y'''' = w(x) is a fourth-order ODE; general solution has four constants matching four boundary conditions (deflection, slope, moment, shear at each end)
- Control systems: higher-order transfer functions correspond to higher-order characteristic polynomials
- Signal processing: higher-order filters (4th-order Butterworth, etc.) are described by higher-order ODEs

**Practice progression**

Item types: factor characteristic polynomial and list roots, write basis solutions for given roots including multiplicities, write general solution, handle repeated roots (multiplicity 2), handle complex roots, apply n ICs to determine all constants. Suggested item count: 6.

Distinct real roots → one repeated root → complex pair → repeated complex → mixed cases

**Assessment objectives**

Formats: write general solution from characteristic polynomial, list all basis solutions given roots and multiplicities, apply n ICs for a specific solution. Bloom alignment: apply.

Mastery signal: Correctly identifies all basis solutions for each root type (including multiplicity), writes general solution, applies ICs in ≥ 4 of 5 problems

**Teacher notes**

The key principle — multiplicity m gives m solutions with polynomial factors xᵏ — is the same for real and complex roots. Students who internalize this one rule handle all root-type combinations without memorizing separate cases.

**Student notes**

The polynomial degree equals the dimension of the solution space: a 4th-order ODE always has exactly 4 basis solutions. List all roots (with multiplicity), then write the corresponding solution component for each root using the multiplicity rule. Finally, sum them with constants c₁ through c_n.

**Prerequisite graph**

- Requires: math.de.second-order-linear, math.alg.polynomial-roots
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.linalg.vector-space
- Narrative: Higher-order ODEs extend the second-order characteristic equation (math.de.char-equation) in a direct pattern. The n-dimensional solution space is the null space of the nth-order differential operator — an extension of the 2D case. For constant-coefficient ODEs, the characteristic polynomial is algebraically identical to the characteristic polynomial of a companion matrix (math.linalg.characteristic-polynomial).

**Teaching hints — review triggers**

- Student cannot factor a polynomial of degree > 2 (even-power substitution, rational root theorem)
- Student does not know the general rule for repeated roots (x^k e^{rx} for k = 0,…,m−1)
- Student does not understand why n ICs are needed for an nth-order ODE

**Spaced repetition / revision guidance**

If your final solution has fewer than n terms (constants), count your roots with multiplicity. The Fundamental Theorem of Algebra guarantees the degree-n polynomial has exactly n roots (over ℂ, counting multiplicity). Each root contributes exactly as many basis solutions as its multiplicity.

---

### Laplace Transform

*Concept ID: `math.de.laplace-transform` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 8h*

**Learning objective.** Define the Laplace transform ℒ{f}(s) = ∫₀^∞ e^{−st}f(t)dt, compute transforms of standard functions (1, tⁿ, eᵃᵗ, cos(bt), sin(bt)), and use the derivative rule ℒ{f'}(s) = sF(s) − f(0) to convert an ODE to an algebraic equation.

The integral transform ℒ{f}(s) = ∫₀^∞ e^{−st}f(t)dt converting differential equations into algebraic equations in s. Transforms derivatives into polynomial multiplication in s.

The Laplace transform converts a function of time t into a function of complex frequency s: ℒ{f}(s) = ∫₀^∞ e^{−st}f(t)dt. It is defined for s > σ₀ (the abscissa of convergence). The transform has two key advantages for ODEs: (1) the derivative rule ℒ{f'}(s) = sF(s) − f(0) converts differentiation into multiplication by s minus an initial-condition term, and (2) linearity allows transforms to be applied term-by-term. Together, these convert a linear ODE with constant coefficients and given ICs into an algebraic equation for Y(s) = ℒ{y}(s), which can be solved by algebra alone and then inverted to recover y(t). Standard transforms form a table that replaces integration: ℒ{1} = 1/s, ℒ{tⁿ} = n!/s^{n+1}, ℒ{eᵃᵗ} = 1/(s−a), ℒ{cos(bt)} = s/(s²+b²), ℒ{sin(bt)} = b/(s²+b²).

**Key ideas**

- Definition: ℒ{f}(s) = ∫₀^∞ e^{−st}f(t)dt; exponential factor e^{−st} ensures convergence for large t
- Derivative rule: ℒ{f'}(s) = sF(s) − f(0); ℒ{f''}(s) = s²F(s) − sf(0) − f'(0); ICs appear automatically
- Linearity: ℒ{af + bg} = aF(s) + bG(s); apply term-by-term
- Standard table: 1→1/s, tⁿ→n!/s^{n+1}, eᵃᵗ→1/(s−a), sin(bt)→b/(s²+b²), cos(bt)→s/(s²+b²)
- ODE workflow: take ℒ of both sides → solve for Y(s) algebraically → take ℒ⁻¹ to get y(t)

**Vocabulary**

- **Laplace transform** — ℒ{f}(s) = ∫₀^∞ e^{−st}f(t)dt; converts time-domain functions to frequency-domain functions of the complex variable s.
- **derivative rule** — ℒ{f^{(n)}}(s) = sⁿF(s) − s^{n−1}f(0) − ⋯ − f^{(n−1)}(0); each differentiation becomes multiplication by s and subtraction of an initial-condition term.
- **first shifting theorem** — ℒ{eᵃᵗf(t)}(s) = F(s−a); multiplying in the t-domain by eᵃᵗ shifts the s-domain transform by a.

**Common misconceptions**

- *Misconception:* The Laplace transform of f(t) is just F(s) = ∫₀^∞ f(t)dt (forgetting e^{−st})
  *Correction:* The defining integrand is e^{−st}f(t), not f(t) alone. The exponential weight e^{−st} is the entire mechanism: it makes the integral converge for large t and converts time-domain derivatives into multiplication by s in the frequency domain. Without it, the integral would diverge for most functions.
- *Misconception:* The derivative rule is ℒ{f'} = sF(s) — no initial condition term
  *Correction:* The correct rule is ℒ{f'}(s) = sF(s) − f(0). The initial condition term f(0) arises from integration by parts: [e^{−st}f(t)]₀^∞ + s∫₀^∞ e^{−st}f dt = −f(0) + sF(s). Dropping f(0) produces a wrong algebraic equation and an incorrect y(t).
- *Misconception:* The Laplace transform is only useful for homogeneous ODEs
  *Correction:* The Laplace transform is especially useful for nonhomogeneous ODEs — the forcing function G(t) transforms to G(s), which simply appears on the right side of the algebraic equation. The method handles nonhomogeneous equations with ICs in one unified algebraic step.

**Common mistakes in practice**

- Forgetting the initial condition terms in the derivative rule
- Using the wrong table entry (confusing sin vs. cos forms)
- Applying the Laplace transform to the wrong variable (must transform over t, treating s as the parameter)

**Visual teaching opportunities**

- Two-column timeline: left (t-domain) shows ODE + ICs → solution y(t); right (s-domain) shows algebraic equation → Y(s) → inverse transform back to y(t); arrows connect the domains
- Derivation of the derivative rule: integration by parts displayed step-by-step with the boundary term [e^{−st}f]₀^∞ = −f(0) highlighted
- Standard Laplace transform table in a framed box: function → transform pair, for the 5 standard functions

**Worked example**

*Setup:* Compute ℒ{e^{3t}sin(2t)} using the first shifting theorem.

1. Step 1: Recall ℒ{sin(2t)} = 2/(s² + 4). Why: standard table entry with b = 2.
2. Step 2: Apply the first shifting theorem: ℒ{eᵃᵗf(t)}(s) = F(s−a) where a = 3. Why: the theorem says multiplying by eᵃᵗ shifts the s-variable by a.
3. Step 3: Replace s by s−3 in ℒ{sin(2t)} = 2/(s² + 4). Result: ℒ{e^{3t}sin(2t)} = 2/((s−3)² + 4). Why: direct application of the substitution.
4. Step 4: Verify by direct integration (spot check at conceptual level). For s > 3, ∫₀^∞ e^{−st}·e^{3t}sin(2t)dt = ∫₀^∞ e^{−(s−3)t}sin(2t)dt = 2/((s−3)² + 4). ✓

*Outcome:* ℒ{e^{3t}sin(2t)} = 2/((s−3)² + 4) for s > 3. This is a standard result used when inverting Laplace transforms that involve shifted quadratic denominators.

**Real-world intuition**

- Control engineering: transfer functions H(s) = Y(s)/U(s) are Laplace-domain representations of system dynamics
- Circuit analysis: the s-domain impedance Z(s) = sL, 1/(sC) converts circuit equations to algebra
- Signal processing: Laplace transforms characterize filters (poles/zeros determine frequency response)

**Practice progression**

Item types: compute ℒ{f} directly from definition for simple f, apply standard table, apply linearity to compute ℒ{af + bg}, apply first shifting theorem, apply derivative rule to convert ODE to algebraic equation. Suggested item count: 7.

ℒ{1}, ℒ{eᵃᵗ} from table → ℒ{3t² + 2sin(t)} by linearity → ℒ{e^{at}cos(bt)} by shifting → ℒ{y''} in terms of Y(s) and ICs

**Assessment objectives**

Formats: compute transform using table and linearity, apply the derivative rule to write the s-domain equation for a given IVP, use the first shifting theorem. Bloom alignment: apply.

Mastery signal: Correctly applies the derivative rule with ICs and uses shifting theorem in ≥ 5 of 6 problems

**Teacher notes**

The power of the Laplace transform is in the derivative rule: ODEs become polynomial algebra. Derive this rule in class by integration by parts — students who see where it comes from understand why ICs appear automatically, which is the main advantage over undetermined coefficients.

**Student notes**

Think of the Laplace transform as a translation dictionary: t-domain operations translate to s-domain operations. Differentiation → multiply by s (minus IC terms). Multiplication by eᵃᵗ → shift s by a. Once you learn the dictionary, the ODE solution is just algebra in s.

**Prerequisite graph**

- Requires: math.de.second-order-ode, math.calc.improper-integrals, math.calc.integration-by-parts
- Unlocks (future prerequisite links): math.de.laplace-ode, math.de.convolution-theorem
- Cross-topic connections (graph cross-links): math.fnal.fourier-transform
- Narrative: The Laplace transform is a special case of the more general Fourier transform (math.de.fourier-transform) evaluated at s = σ + iω on the complex plane. The Fourier transform uses the imaginary axis (s = iω), while the Laplace transform uses the right half-plane (s = σ + iω with σ > 0). The Laplace transform is tailored for causal signals (f(t) = 0 for t < 0), making it natural for ODEs with initial conditions.

**Teaching hints — review triggers**

- Student cannot evaluate ∫₀^∞ e^{−st}dt or ∫₀^∞ te^{−st}dt (improper integrals)
- Student forgets the f(0) term in the derivative rule
- Student cannot apply linearity to split a multi-term transform

**Spaced repetition / revision guidance**

If the derivative rule gives an unexpectedly complex expression, check whether you applied it to ℒ{y''} correctly: ℒ{y''} = s²Y(s) − sy(0) − y'(0). The second derivative contributes three terms (s²Y, −sy(0), −y'(0)). Count the terms: ℒ{y^{(n)}} has n+1 terms total.

---

### Laplace Transform Properties

*Concept ID: `math.de.laplace-properties` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Apply the key Laplace transform properties — linearity, first and second shifting theorems, derivative rule, and periodic function formula — to compute transforms and inverse transforms of composite functions without using the integral definition.

Key properties: linearity (ℒ{af+bg}=aℒ{f}+bℒ{g}), first shifting theorem (ℒ{e^{at}f}(s)=F(s−a)), second shifting theorem (Heaviside step), derivative rule (ℒ{f′}=sF(s)−f(0)), convolution.

Beyond the basic table, the Laplace transform's power comes from its properties. Linearity allows term-by-term computation. The first shifting theorem ℒ{eᵃᵗf(t)} = F(s−a) handles exponentially weighted functions. The second shifting theorem ℒ{u(t−a)f(t−a)} = e^{−as}F(s) handles the unit step function u(t−a) (Heaviside function), essential for piecewise forcing. The derivative rule ℒ{f^{(n)}} = sⁿF − sⁿ⁻¹f(0) − ⋯ − f^{(n−1)}(0) converts ODEs to algebra. Multiplication by t in time corresponds to differentiation in s: ℒ{tf(t)} = −F'(s). These properties together cover virtually all functions arising in ODE applications without computing integrals from scratch.

**Key ideas**

- Linearity: ℒ{af + bg} = aF + bG (most frequently used property)
- First shifting: ℒ{eᵃᵗf(t)}(s) = F(s−a); enables exponentially modulated functions
- Second shifting: ℒ{u(t−a)f(t−a)}(s) = e^{−as}F(s); handles Heaviside step forcing
- t-multiplication: ℒ{tf(t)}(s) = −F'(s); differentiate the transform with respect to s
- Derivative rule (extended): ℒ{f^{(n)}} = sⁿF(s) − sⁿ⁻¹f(0) − ⋯ − f^{(n−1)}(0)

**Vocabulary**

- **Heaviside step function** — u(t−a) = 0 for t < a and 1 for t ≥ a; used to represent piecewise (switched) functions in Laplace transform analysis.
- **second shifting theorem** — ℒ{u(t−a)f(t−a)} = e^{−as}F(s); connects a time delay of a units to multiplication by e^{−as} in the s-domain.
- **t-multiplication rule** — ℒ{tf(t)}(s) = −dF/ds; multiplying by t in the time domain corresponds to differentiating the Laplace transform with respect to s.

**Common misconceptions**

- *Misconception:* The second shifting theorem applies to any f(t) shifted: ℒ{f(t−a)} = e^{−as}F(s)
  *Correction:* The correct statement requires the Heaviside step: ℒ{u(t−a)f(t−a)} = e^{−as}F(s). The factor u(t−a) is necessary to enforce that the shifted function is zero for t < a. Without the Heaviside function, the transform of f(t−a) alone (undefined for t < a) is not e^{−as}F(s).
- *Misconception:* Multiplying f(t) by t in time domain corresponds to multiplying F(s) by s
  *Correction:* Multiplication by t corresponds to differentiating with respect to s (with a sign): ℒ{tf(t)} = −dF/ds. Multiplication by t (polynomial growth in time) maps to differentiation in the s-domain, not multiplication — the latter is the rule for f'(t), not tf(t).
- *Misconception:* The first shifting theorem can be applied with a shift in t instead of s
  *Correction:* The first shifting theorem shifts in the s-variable: ℒ{eᵃᵗf(t)}(s) = F(s−a). The shift is in the argument of F(s), not in t. The second shifting theorem handles shifts in t (via the Heaviside function), but operates differently.

**Common mistakes in practice**

- Applying second shifting to f(t−a) without the Heaviside factor u(t−a)
- Confusing ℒ{tf(t)} = −F'(s) with ℒ{f'(t)} = sF(s) − f(0) (derivative of f vs. multiplication by t)
- Forgetting to replace s by s−a inside all of F(s) when applying first shifting

**Visual teaching opportunities**

- Property table: left column (time domain operation), right column (s-domain operation) — clearly showing which domain the operation acts on
- Heaviside function plot: u(t−a) is 0 for t < a and 1 for t ≥ a; u(t−a)f(t−a) is the function f delayed by a
- Second shifting theorem illustrated: a square-wave forcing (on from t = 1 to t = 3) written as u(t−1) − u(t−3), then transformed term-by-term

**Worked example**

*Setup:* Find ℒ{u(t−2)(t−2)³}.

1. Step 1: Identify f(t) = t³, so f(t−2) = (t−2)³. The function is u(t−2)·f(t−2) in standard second-shifting form. Why: recognize the structural match for the theorem.
2. Step 2: Compute F(s) = ℒ{t³} = 3!/s⁴ = 6/s⁴. Why: standard table, ℒ{tⁿ} = n!/s^{n+1}.
3. Step 3: Apply second shifting theorem with a = 2. ℒ{u(t−2)(t−2)³} = e^{−2s}·F(s) = 6e^{−2s}/s⁴. Why: the theorem gives e^{−as}F(s).
4. Step 4: State the result. ℒ{u(t−2)(t−2)³} = 6e^{−2s}/s⁴. Why: complete and in closed form; no further simplification needed.

*Outcome:* 6e^{−2s}/s⁴. Inversely: if a Laplace table gives 6e^{−2s}/s⁴, the corresponding time function is u(t−2)(t−2)³ — a cubic starting at t = 2.

**Real-world intuition**

- Piecewise forcing: a step input u(t−a) (power switched on at t = a) is handled exactly by the second shifting theorem
- Impulse response: the derivative rule applied to delta functions models instantaneous impacts in mechanical and electrical systems
- Control theory: the s-domain transfer function properties directly mirror these Laplace properties

**Practice progression**

Item types: apply first shifting theorem forward and backward, apply second shifting theorem to a step function, use t-multiplication rule, convert piecewise function to Heaviside form then transform. Suggested item count: 7.

Single theorem application → two theorems combined → piecewise forcing conversion → full inverse Laplace using properties

**Assessment objectives**

Formats: compute ℒ{f} using properties (state which property), identify which property to use for a given f(t), write the Heaviside representation of a piecewise function then transform. Bloom alignment: apply.

Mastery signal: Correctly identifies and applies the appropriate property, including the Heaviside requirement for second shifting, in ≥ 5 of 6 problems

**Teacher notes**

Piecewise forcing problems require converting the piecewise description to Heaviside form before applying the second shifting theorem. Spend time on this conversion: a rectangular pulse active from t = a to t = b is u(t−a) − u(t−b); a different forcing from a to b is u(t−a)·f(t−a) − u(t−b)·g(t−b).

**Student notes**

Keep the two shifting theorems distinct: first shifting (eᵃᵗ in t-domain → shift s by a in s-domain), second shifting (delay by a in t-domain → multiply by e^{−as} in s-domain). One involves exponential multiplication; the other involves time delay via Heaviside.

**Prerequisite graph**

- Requires: math.de.laplace-transform
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The Heaviside step function u(t−a) is the integral of the Dirac delta δ(t−a): du/dt = δ. The Laplace transform of δ(t−a) = e^{−as} is derived from the second shifting theorem applied to δ(t) (which transforms to 1). This connection links the step-function property to impulse modeling in control theory.

**Teaching hints — review triggers**

- Student cannot write a piecewise function using Heaviside notation u(t−a)
- Student confuses the first and second shifting theorems (which shifts s, which shifts t)
- Student does not recall the t-multiplication rule (thinks ℒ{tf(t)} = sF(s))

**Spaced repetition / revision guidance**

If confused about which theorem to use: see eᵃᵗ multiplied by something? → First shifting. See u(t−a) multiplied by a delayed function? → Second shifting. See t multiplied by something? → t-multiplication rule (differentiate F(s)).

---

### Inverse Laplace Transform

*Concept ID: `math.de.inverse-laplace` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 5h*

**Learning objective.** Recover f(t) from a given Laplace transform F(s) by decomposing F into partial fractions whose inverse transforms are recognizable from the standard table, and apply the first shifting theorem for quadratic denominators with complex roots.

The process of recovering f(t) from its Laplace transform F(s). Standard technique: use partial fraction decomposition to match to known transform pairs from tables.

The inverse Laplace transform ℒ⁻¹{F(s)} recovers f(t) from F(s). In practice, direct inversion via the Bromwich integral is rarely used; instead, F(s) is decomposed by partial fractions into a sum of terms whose inverse transforms appear in the standard table. The key table entries for inversion are: 1/s → 1, 1/sⁿ → t^{n−1}/(n−1)!, 1/(s−a) → eᵃᵗ, s/(s²+b²) → cos(bt), b/(s²+b²) → sin(bt). For irreducible quadratics (s−α)² + β², the first shifting theorem gives: A(s−α)/((s−α)²+β²) → Aeᵃᵗcos(βt) and Aβ/((s−α)²+β²) → Aeᵃᵗsin(βt). Partial fractions handle all rational F(s) arising from constant-coefficient linear ODEs.

**Key ideas**

- Partial fractions decompose F(s) = P(s)/Q(s) (deg P < deg Q) into sum of simpler terms
- Each partial-fraction term maps to a table entry: simple poles → exponentials, quadratic factors → sines/cosines
- First shifting theorem for inversion: if F(s) involves (s−a), shift the table entry: F(s−a) ↔ eᵃᵗ·(table entry for F(s))
- Complete the square in quadratic denominators: s²+2s+5 = (s+1)²+4 → eᵃᵗ·trig with a = −1, β = 2
- The inverse Laplace transform is linear: ℒ⁻¹{aF + bG} = af + bg

**Vocabulary**

- **inverse Laplace transform** — ℒ⁻¹{F(s)} = f(t); recovers the time-domain function from its Laplace transform, in practice via partial fractions and a transform table.
- **partial fraction decomposition** — Writing a rational function as a sum of simpler fractions (one per root of the denominator), each matching a table entry for inversion.
- **completing the square** — Rewriting s² + bs + c = (s + b/2)² + (c − b²/4) to convert a quadratic denominator into the standard shifted form (s−α)² + β² for applying the first shifting theorem.

**Common misconceptions**

- *Misconception:* Partial fractions are only needed when the denominator has distinct real roots
  *Correction:* Partial fractions apply to all rational F(s), including repeated roots (A/(s−a) + B/(s−a)²) and complex conjugate pairs (A/(s²+b²) + Bs/(s²+b²)). Different denominator structures require different partial-fraction forms, but the method always applies.
- *Misconception:* The inverse of 1/(s²+4) is cos(2t)
  *Correction:* ℒ⁻¹{1/(s²+4)} = (1/2)sin(2t), not cos(2t). The table entry is ℒ{sin(bt)} = b/(s²+b²), so ℒ⁻¹{b/(s²+b²)} = sin(bt), meaning ℒ⁻¹{1/(s²+4)} = (1/2)sin(2t) since b = 2. The cosine entry has s in the numerator: ℒ{cos(bt)} = s/(s²+b²), so ℒ⁻¹{s/(s²+4)} = cos(2t).
- *Misconception:* If F(s) = P(s)/Q(s) with deg P ≥ deg Q, partial fractions apply directly
  *Correction:* When deg P ≥ deg Q, polynomial long division must be performed first to extract a polynomial quotient: F(s) = polynomial + R(s)/Q(s) where deg R < deg Q. Only R(s)/Q(s) is then decomposed by partial fractions. Skipping this step gives wrong partial-fraction coefficients.

**Common mistakes in practice**

- Using A/(s²+4) instead of (As+B)/(s²+4) for an irreducible quadratic denominator
- Forgetting to write 2/(s²+4) as (1/2)·2/(s²+4) before inverting (missing the 1/b factor)
- Not completing the square before attempting to invert a shifted quadratic

**Visual teaching opportunities**

- Partial fraction flowchart: rational F(s) → factor denominator → identify root types → write PF template → solve for coefficients → invert each term
- Completing the square diagram: s² + bs + c → (s + b/2)² + (c − b²/4), identifying α and β for the shifting theorem
- Two-column inversion table: F(s) → f(t), listing 8 standard pairs with clear labeling

**Worked example**

*Setup:* Find ℒ⁻¹{(2s+5)/((s+1)(s²+4))}.

1. Step 1: Write partial fraction template. (2s+5)/((s+1)(s²+4)) = A/(s+1) + (Bs+C)/(s²+4). Why: simple real root (s+1) → A/(s+1); irreducible quadratic (s²+4) → (Bs+C)/(s²+4).
2. Step 2: Clear denominators. 2s+5 = A(s²+4) + (Bs+C)(s+1). Why: multiply both sides by (s+1)(s²+4).
3. Step 3: Solve for A. Set s = −1: 2(−1)+5 = A(1+4) = 5A, so A = 3/5. Why: cover-up method for simple roots.
4. Step 4: Expand and match coefficients. 2s+5 = A(s²+4) + Bs²+(B+C)s+C. With A = 3/5: coefficient of s²: 0 = A+B → B = −3/5; coefficient of s: 2 = B+C → C = 2+3/5 = 13/5; constant: 5 = 4A+C → 12/5+13/5 = 25/5 = 5. ✓
5. Step 5: Rewrite in invertible form. A/(s+1) = (3/5)·1/(s+1); (Bs+C)/(s²+4) = (−3/5)·s/(s²+4) + (13/5)·1/(s²+4) = (−3/5)·s/(s²+4) + (13/10)·2/(s²+4). Why: write 1/(s²+4) = (1/2)·2/(s²+4) to match the table entry b/(s²+b²) with b = 2.
6. Step 6: Invert each term. ℒ⁻¹{(3/5)/(s+1)} = (3/5)e^{−t}; ℒ⁻¹{(−3/5)s/(s²+4)} = (−3/5)cos(2t); ℒ⁻¹{(13/10)·2/(s²+4)} = (13/10)sin(2t).
7. Step 7: Final answer. f(t) = (3/5)e^{−t} − (3/5)cos(2t) + (13/10)sin(2t).

*Outcome:* f(t) = (3/5)e^{−t} − (3/5)cos(2t) + (13/10)sin(2t). Verify by taking ℒ{f} and confirming it equals (2s+5)/((s+1)(s²+4)). ✓

**Real-world intuition**

- Control engineering: the inverse Laplace of a transfer function H(s) gives the impulse response h(t) of the system
- Circuit analysis: inverting Y(s)/U(s) from a Laplace-domain circuit equation gives the time-domain output y(t)

**Practice progression**

Item types: factor denominator and write PF template, solve for PF coefficients (distinct real roots), solve for PF coefficients (complex roots), invert each PF term, full inverse Laplace from scratch. Suggested item count: 7.

Simple real poles → repeated poles → complex conjugate poles → mixed, including completing the square

**Assessment objectives**

Formats: write PF decomposition and invert for a given F(s), identify the error in an incomplete PF template, complete the square in a quadratic denominator and state the inverse. Bloom alignment: apply.

Mastery signal: Correctly identifies PF template, solves for all coefficients, and inverts each term in ≥ 5 of 6 problems

**Teacher notes**

The most time-consuming part is the partial-fraction coefficient calculation. Teach the cover-up method for simple poles (fastest) and undetermined-coefficient matching for complex roots. Students who internalize both methods can invert any rational F(s) that arises in ODE practice.

**Student notes**

Inversion is pattern matching: look at F(s), decompose by partial fractions, match each term to a table entry (possibly after completing the square or applying first shifting), and write the inverse. There is no integration — just recognition.

**Prerequisite graph**

- Requires: math.de.laplace-properties, math.calc.partial-fractions
- Unlocks (future prerequisite links): math.de.laplace-ode
- Cross-topic connections (graph cross-links): none
- Narrative: Inverse Laplace relies on partial fractions (math.calc.partial-fractions) for the decomposition step and the first shifting theorem (math.de.laplace-properties) for complex poles. The same partial-fraction technique applies to integration by partial fractions in calculus.

**Teaching hints — review triggers**

- Student cannot set up the correct partial-fraction template (wrong number of terms or wrong form for complex roots)
- Student confuses ℒ⁻¹{1/(s²+b²)} = sin(bt)/b with the cosine entry
- Student does not know how to complete the square in a quadratic denominator

**Spaced repetition / revision guidance**

If a coefficient calculation gives an equation like '0 = 5' (contradiction), check whether deg P < deg Q in F(s). If not, perform polynomial long division first. If deg P < deg Q, check that your partial-fraction template has the right form for each denominator factor.

---

### Solving ODEs with Laplace Transform

*Concept ID: `math.de.laplace-ode` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 6h*

**Learning objective.** Solve a second-order linear constant-coefficient IVP using the Laplace transform: apply ℒ to both sides incorporating ICs, solve algebraically for Y(s), and invert using partial fractions and the standard table to get y(t).

Workflow: take Laplace transform of ODE to get algebraic equation in Y(s), solve for Y(s), take inverse Laplace to obtain y(t). Initial conditions are automatically incorporated in the transform step.

Solving an IVP with Laplace transforms follows a three-step workflow: (1) transform — apply ℒ to both sides of the ODE, using the derivative rule ℒ{y''} = s²Y − sy(0) − y'(0) to incorporate ICs automatically; (2) solve — rearrange the resulting algebraic equation to isolate Y(s) = ℒ{y}; (3) invert — apply ℒ⁻¹ to Y(s), typically via partial fractions, to recover y(t). The key advantage over undetermined coefficients/variation of parameters is that ICs are incorporated in step 1 — no separate application of ICs to the general solution is needed. The method also handles discontinuous forcing (step functions, impulses) that other methods cannot.

**Key ideas**

- Step 1: Apply ℒ to the ODE using ℒ{y''} = s²Y − sy(0) − y'(0), ℒ{y'} = sY − y(0)
- Step 2: Collect Y(s) terms and solve: Y(s) = [IC terms + ℒ{G}] / (characteristic polynomial)
- Step 3: Invert Y(s) by partial fractions to get y(t)
- ICs are baked into step 1 — no separate application needed after finding the general solution
- Handles discontinuous G(t) (Heaviside steps, Dirac deltas) that other methods cannot address

**Vocabulary**

- **Laplace ODE workflow** — The three-step method: (1) transform ODE with ICs to get algebraic equation in Y(s); (2) solve for Y(s); (3) invert Y(s) to get y(t).
- **transfer function** — H(s) = Y(s)/U(s) for zero ICs; characterizes the system's response to any input U(s) in the Laplace domain.

**Common misconceptions**

- *Misconception:* After finding Y(s) = something/(s²+bs+c), the solution is y(t) = 1/(t²+bt+c)
  *Correction:* Y(s) is an expression in s — it must be inverted to get y(t). Inversion requires identifying Y(s) as a table entry (possibly after partial fractions or completing the square). Substituting t for s directly is meaningless: s and t are different variables in different domains.
- *Misconception:* The Laplace transform method gives only the particular solution, not the homogeneous solution
  *Correction:* The Laplace method gives the complete solution y(t) satisfying both the ODE and the ICs — it automatically includes both the homogeneous and particular parts. The decomposition into y_h + y_p is a separate conceptual framework; the Laplace output is the specific solution for the given ICs.
- *Misconception:* The Laplace method cannot handle systems with zero initial conditions
  *Correction:* Zero ICs are perfectly valid: if y(0) = 0 and y'(0) = 0, the derivative rule gives ℒ{y''} = s²Y (the IC terms vanish). The method works the same way — zero ICs just simplify the algebraic step.

**Common mistakes in practice**

- Dropping the initial condition terms when applying the derivative rule
- Trying to invert Y(s) directly without partial fractions
- Writing y(t) = Y(t) (substituting t for s — the domains are entirely different)

**Visual teaching opportunities**

- Three-step workflow diagram: ODE with ICs → (transform) → algebraic equation in Y(s) → (solve) → Y(s) = ... → (invert via PF) → y(t)
- Side-by-side comparison: the same IVP solved by undetermined coefficients (two-stage: find y_h, apply ICs) vs. Laplace (one algebraic step incorporating ICs immediately)
- Y(s) structure diagram: numerator contains IC terms and forcing term; denominator is the characteristic polynomial

**Worked example**

*Setup:* Solve y'' + 4y = cos(2t), y(0) = 1, y'(0) = 0 using Laplace transforms.

1. Step 1: Apply ℒ. ℒ{y''} + 4ℒ{y} = ℒ{cos(2t)}. Using the derivative rule and ICs: (s²Y − s·1 − 0) + 4Y = s/(s²+4). Why: derivative rule with y(0) = 1, y'(0) = 0.
2. Step 2: Collect Y terms. (s² + 4)Y = s + s/(s²+4). Solve: Y(s) = s/(s²+4) + s/(s²+4)². Why: factor (s²+4) on the left.
3. Step 3: Invert the first term. ℒ⁻¹{s/(s²+4)} = cos(2t). Why: standard table entry.
4. Step 4: Invert s/(s²+4)². This requires a non-standard table entry. Using the convolution theorem or a table: ℒ⁻¹{s/(s²+4)²} = (t/4)sin(2t). Why: this entry arises from differentiating 1/(s²+4) with respect to s using the t-multiplication rule: ℒ{t·sin(2t)/4} = (1/4)·d/ds[−2/(s²+4)] = (1/4)·4s/(s²+4)² = s/(s²+4)². ✓
5. Step 5: Combine. y(t) = cos(2t) + (t/4)sin(2t). Why: linearity of ℒ⁻¹.
6. Step 6: Note this is pure resonance. The (t/4)sin(2t) term grows without bound — same result as undetermined coefficients with the modification rule. Why: driving frequency ω = 2 matches the natural frequency ω₀ = 2.

*Outcome:* y(t) = cos(2t) + (t/4)sin(2t). This satisfies y(0) = 1 ✓ and y'(0) = 0 ✓ (verified by differentiation). The growing amplitude confirms resonance.

**Real-world intuition**

- RLC circuit transient analysis: Laplace transforms are the standard tool in circuit theory for analyzing step and impulse responses
- Mechanical impact problems: an impulsive force modeled as a delta function is handled naturally by the Laplace method
- Control system design: the Laplace ODE workflow is the foundation of transfer-function-based control design

**Practice progression**

Item types: apply ℒ to ODE and write algebraic equation for Y(s), solve for Y(s) algebraically, invert Y(s) by partial fractions, full IVP solve by Laplace, IVP with step-function forcing. Suggested item count: 7.

Simple forcing (polynomial, exponential) → trigonometric → step function → delta function impulse

**Assessment objectives**

Formats: full three-step solve for a given IVP, set up (step 1 only) — write the algebraic equation for Y(s), invert a given Y(s) expression. Bloom alignment: apply.

Mastery signal: Correctly applies derivative rule with ICs, solves for Y(s), and inverts by partial fractions in ≥ 5 of 6 problems

**Teacher notes**

The Laplace method is often taught as 'the third method after characteristic equations and undetermined coefficients.' Emphasize that for problems with discontinuous forcing (switch-on, impulse), Laplace is not a third option — it is the only systematic option. That is its unique strength.

**Student notes**

The three steps are: transform → solve → invert. The most important step is 1: apply ℒ to both sides, substitute ℒ{y''} = s²Y − sy(0) − y'(0) and ℒ{y'} = sY − y(0). Everything after that is algebra and table lookup.

**Prerequisite graph**

- Requires: math.de.inverse-laplace, math.de.ivp
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The Laplace ODE method is the algebraic counterpart to the variation-of-parameters integral formula: both give the complete solution to y_h + y_p directly without a separate two-stage process. Variation of parameters keeps everything in the t-domain; Laplace transfers to s-domain, solves algebraically, and returns. For discontinuous G(t), only the Laplace approach is practical.

**Teaching hints — review triggers**

- Student cannot write ℒ{y''} = s²Y − sy(0) − y'(0) correctly (drops one of the IC terms)
- Student cannot isolate Y(s) algebraically (factor and solve for Y)
- Student does not recognize Y(s) as requiring partial-fraction decomposition before inversion

**Spaced repetition / revision guidance**

If Y(s) looks too complex to invert, check whether you correctly factored the characteristic polynomial. Y(s) should have the characteristic polynomial (s² + ps + q) as its denominator — if it doesn't, recheck your algebraic rearrangement of the transformed ODE.

---

### Convolution Theorem (Laplace)

*Concept ID: `math.de.convolution-theorem` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** State the convolution theorem ℒ{f*g}(s) = F(s)·G(s), compute the convolution integral (f*g)(t) = ∫₀ᵗ f(τ)g(t−τ)dτ, and use the theorem to invert a product F(s)·G(s) as a convolution rather than partial fractions.

ℒ{f*g}(s) = F(s)·G(s), where (f*g)(t)=∫₀^t f(τ)g(t−τ)dτ is the convolution. Allows recovery of the inverse Laplace of a product without full partial-fraction decomposition.

Convolution is the time-domain operation corresponding to multiplication in the Laplace domain. The convolution of f and g is (f*g)(t) = ∫₀ᵗ f(τ)g(t−τ)dτ. The convolution theorem states: ℒ{f*g}(s) = F(s)·G(s) and, equivalently, ℒ⁻¹{F(s)·G(s)} = (f*g)(t). This is used in two directions: (1) to invert a product F·G when partial fractions are impractical (e.g., F(s) = 1/(s²+1)·G(s) for complicated G); (2) to represent the particular solution to a linear ODE as an integral (Green's function formula). The convolution is commutative (f*g = g*f), associative, and linear, but not equal to ordinary multiplication.

**Key ideas**

- Convolution: (f*g)(t) = ∫₀ᵗ f(τ)g(t−τ)dτ = ∫₀ᵗ f(t−τ)g(τ)dτ (commutative)
- Convolution theorem: ℒ{f*g} = F(s)·G(s); equivalently ℒ⁻¹{F·G} = f*g
- Used to invert products in the s-domain without partial fractions
- Particular solution formula: y_p(t) = ∫₀ᵗ G(t−τ)h(τ)dτ where h is the impulse response
- Convolution is NOT pointwise multiplication: (f*g)(t) ≠ f(t)·g(t)

**Vocabulary**

- **convolution** — (f*g)(t) = ∫₀ᵗ f(τ)g(t−τ)dτ; the time-domain integral operation corresponding to multiplication of Laplace transforms in the s-domain.
- **convolution theorem** — ℒ{f*g}(s) = F(s)·G(s); t-domain convolution ↔ s-domain multiplication.
- **impulse response** — The output h(t) of a linear system when the input is a unit Dirac delta δ(t); the system's output for arbitrary input u(t) is y(t) = (h*u)(t).

**Common misconceptions**

- *Misconception:* Convolution is the same as pointwise multiplication: (f*g)(t) = f(t)·g(t)
  *Correction:* Convolution is an integral over the interval [0,t], not a pointwise product. (f*g)(t) = ∫₀ᵗ f(τ)g(t−τ)dτ involves folding and shifting g before integrating. The Laplace transform converts this integral into a product, but in the t-domain, convolution and pointwise multiplication are entirely different operations.
- *Misconception:* The convolution theorem says ℒ{f(t)·g(t)} = F(s)·G(s)
  *Correction:* The theorem says ℒ{f*g} = F·G (convolution → product), NOT ℒ{f·g} = F·G (pointwise product → product). Pointwise multiplication in the t-domain corresponds to convolution in the s-domain: ℒ{f·g} = F*G (s-domain convolution, a more complex expression). The everyday formula is: t-convolution ↔ s-multiplication.
- *Misconception:* The limits of convolution always go from 0 to ∞
  *Correction:* For causal signals (f and g zero for t < 0), the upper limit is t, not ∞, because g(t−τ) = 0 for τ > t. The integral ∫₀ᵗ f(τ)g(t−τ)dτ is correct for causal functions. The limit t (not ∞) is essential — it makes convolution a finite integral computable for any specific t.

**Common mistakes in practice**

- Writing (f*g)(t) = f(t)·g(t) (pointwise product, not convolution)
- Using ∞ as the upper limit instead of t
- Forgetting to substitute t−τ for t in g(t): writing g(τ) instead of g(t−τ)

**Visual teaching opportunities**

- Animated convolution: show f(τ) fixed, g(t−τ) as a flipped and shifted version, and the integral ∫f(τ)g(t−τ)dτ as the area under their product — sweeping t from 0 to ∞
- Block diagram: input U(s) → [H(s)] → Y(s) = H(s)·U(s); in t-domain: u(t) → [impulse response h(t)] → y(t) = (h*u)(t) — convolution theorem as the linking equation
- Commutative property visualization: (f*g)(t) = (g*f)(t) demonstrated by relabeling the integration variable

**Worked example**

*Setup:* Find ℒ⁻¹{1/((s²+1)(s+2))} using the convolution theorem.

1. Step 1: Identify F(s) = 1/(s²+1) and G(s) = 1/(s+2). Why: decompose the product into two factors with known inverses.
2. Step 2: Invert each factor. f(t) = sin(t) and g(t) = e^{−2t}. Why: ℒ⁻¹{1/(s²+1)} = sin(t); ℒ⁻¹{1/(s+2)} = e^{−2t}.
3. Step 3: Apply convolution theorem. ℒ⁻¹{F·G} = (f*g)(t) = ∫₀ᵗ sin(τ)·e^{−2(t−τ)}dτ. Why: the inverse of the product is the convolution of the individual inverses.
4. Step 4: Evaluate the convolution. = e^{−2t}∫₀ᵗ sin(τ)e^{2τ}dτ. Using integration by parts (or table): ∫e^{2τ}sin(τ)dτ = e^{2τ}(2sin τ − cos τ)/5. Evaluated from 0 to t: e^{2τ}(2sin τ − cos τ)/5|₀ᵗ = [e^{2t}(2sin t − cos t) − (0−1)]/5 = [e^{2t}(2sin t − cos t) + 1]/5.
5. Step 5: Multiply by e^{−2t}. (f*g)(t) = e^{−2t}·[e^{2t}(2sin t − cos t) + 1]/5 = (2sin t − cos t)/5 + e^{−2t}/5. Why: distribute e^{−2t} through.
6. Step 6: State the answer. ℒ⁻¹{1/((s²+1)(s+2))} = (2sin t − cos t + e^{−2t})/5. Why: simplify.

*Outcome:* (2sin t − cos t + e^{−2t})/5. Verify by partial fractions: 1/((s²+1)(s+2)) = A/(s+2) + (Bs+C)/(s²+1) → A = 1/5, B = −1/5, C = 2/5 → ℒ⁻¹ = e^{−2t}/5 − cos(t)/5 + 2sin(t)/5 = (2sin t − cos t + e^{−2t})/5 ✓

**Real-world intuition**

- Signal processing: the output of a linear time-invariant system is the convolution of the input with the impulse response — this is the fundamental I/O relationship
- Probability: the density of a sum X + Y of independent random variables is the convolution of their individual densities
- Image processing: blurring, sharpening, and edge detection all use convolution with a kernel

**Practice progression**

Item types: compute convolution integral for two simple functions, identify f and g from a product F·G and write the convolution integral, evaluate ∫₀ᵗ f(τ)g(t−τ)dτ by hand, invert a product using convolution vs. partial fractions. Suggested item count: 5.

f = g = eᵃᵗ (exponential convolution) → f = tⁿ, g = eᵃᵗ → f = sin, g = eᵃᵗ → products requiring integration by parts

**Assessment objectives**

Formats: state convolution theorem and write the convolution integral for a given product F·G, evaluate a specific convolution (f*g)(t), compare convolution inversion to partial-fraction inversion for the same F(s). Bloom alignment: apply.

Mastery signal: Correctly sets up and evaluates the convolution integral and states the convolution theorem in ≥ 4 of 5 problems

**Teacher notes**

Convolution is arguably the most important concept in applied mathematics — it describes I/O relationships for every linear time-invariant system in engineering and physics. Connecting the mathematical definition to the physical impulse-response interpretation (h*u = output for any input u) helps students see why this operation matters beyond ODE solving.

**Student notes**

Remember the limits: (f*g)(t) = ∫₀ᵗ f(τ)g(t−τ)dτ — upper limit is t, not ∞. The argument t−τ means g is 'flipped and shifted by t.' As t increases, more of g is included in the integral — the convolution accumulates the history of the interaction between f and g.

**Prerequisite graph**

- Requires: math.de.laplace-transform
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.fnal.convolution
- Narrative: The convolution theorem bridges time-domain and frequency-domain analysis — the same principle underlies the Fourier convolution theorem (math.de.fourier-transform). In probability (math.prob.distributions), the density of X+Y is the convolution of their marginals — directly the same integral formula with a different interpretation.

**Teaching hints — review triggers**

- Student computes f(t)·g(t) instead of ∫₀ᵗ f(τ)g(t−τ)dτ
- Student does not recognize that (f*g)(t) requires the upper limit t (not ∞)
- Student cannot evaluate the convolution integral using integration by parts

**Spaced repetition / revision guidance**

If the convolution integral is hard to evaluate, check whether g(t−τ) simplifies nicely: for g(t) = e^{at}, g(t−τ) = e^{a(t−τ)} = eᵃᵗ·e^{−aτ}, so the constant eᵃᵗ pulls out of the integral, leaving ∫₀ᵗ f(τ)e^{−aτ}dτ — often much simpler.

---

### Systems of ODEs

*Concept ID: `math.de.systems-ode` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 8h*

**Learning objective.** Formulate a system of first-order ODEs in matrix form x' = Ax + b, convert an nth-order scalar ODE to a first-order system via state variables, and understand why eigenvalues of A determine the solution character.

A set of ODEs involving multiple dependent variables: x′=Ax+b (linear) or x′=f(x) (nonlinear). First-order systems can represent nth-order scalar ODEs via state-vector reduction.

A system of ODEs involves multiple dependent variables evolving simultaneously. The general linear first-order system is x'(t) = Ax(t) + b(t), where x is a vector of unknowns and A is an n×n matrix. An nth-order scalar ODE ay^{(n)} + ⋯ + a₀y = G can always be written as a first-order system by introducing state variables x₁ = y, x₂ = y', …, xₙ = y^{(n−1)}, giving x' = Ax where A is the companion matrix. For the homogeneous system x' = Ax, solutions are of the form x = e^{λt}v where (λ,v) are eigenvalue-eigenvector pairs of A — directly extending the scalar exponential solution e^{rt} to vector equations. The system is solved by finding all eigenvalue-eigenvector pairs, constructing n independent solution vectors, and forming the general solution as their linear combination.

**Key ideas**

- Matrix form x' = Ax; the constant matrix A drives the solution structure
- State-variable reduction: nth-order scalar ODE → n×n first-order system
- Homogeneous solution: e^{λt}v for each eigenvalue-eigenvector pair (λ,v) of A
- General solution: x = c₁e^{λ₁t}v₁ + ⋯ + cₙe^{λₙt}vₙ (n free constants)
- Solution behavior determined by sign of Re(λ): stable if all Re(λ) < 0, unstable if any Re(λ) > 0

**Vocabulary**

- **companion matrix** — The n×n matrix A encoding a scalar nth-order linear ODE as a first-order system x' = Ax; its eigenvalues are the roots of the characteristic equation.
- **matrix exponential** — e^{At} = I + At + A²t²/2! + ⋯; the formal solution to x' = Ax is x(t) = e^{At}x(0).
- **stable system** — A linear system x' = Ax is asymptotically stable if all eigenvalues of A have negative real parts — all solutions decay to zero as t → ∞.

**Common misconceptions**

- *Misconception:* The solution x = e^{At}x₀ is practical only for diagonal A
  *Correction:* The matrix exponential e^{At} is always the formal solution, even for non-diagonal A. For non-diagonal A, compute it by diagonalization or Jordan form. In practice, solving x' = Ax via eigenvalue decomposition is equivalent to computing e^{At} — both give the same answer.
- *Misconception:* A second-order scalar ODE y'' + py' + qy = 0 cannot be written as a first-order system
  *Correction:* It can always be converted: let x₁ = y, x₂ = y'. Then x₁' = x₂ and x₂' = y'' = −py' − qy = −px₂ − qx₁. The companion matrix is A = [[0, 1],[−q, −p]], and the system is x' = Ax. The eigenvalues of A are exactly the roots of the characteristic equation r² + pr + q = 0.
- *Misconception:* All n eigenvalues of A give n independent solution vectors
  *Correction:* Only distinct eigenvalues guarantee n independent eigenvectors (and thus n independent solutions). For repeated eigenvalues, generalized eigenvectors (Jordan chains) are needed to complete the solution set. This is the systems analog of the xe^{rt} term for repeated characteristic roots.

**Common mistakes in practice**

- Writing the companion matrix with wrong sign on ODE coefficients
- Claiming n independent eigenvectors always exist for any A (fails for repeated eigenvalues without full eigenspace)
- Confusing the stability condition: need Re(λ) < 0 for ALL eigenvalues, not just one

**Visual teaching opportunities**

- State-variable conversion diagram: scalar ODE → state vector x = [y, y', y'']ᵀ → companion matrix A — with arrows showing which entry of A corresponds to which coefficient
- Solution structure diagram: A has eigenvalues λ₁, λ₂ with eigenvectors v₁, v₂ → general solution x = c₁e^{λ₁t}v₁ + c₂e^{λ₂t}v₂
- Stability diagram: real part of λ vs. 0: Re(λ) < 0 → decaying (stable), Re(λ) > 0 → growing (unstable), Re(λ) = 0 → oscillatory/center

**Worked example**

*Setup:* Convert y'' + y' − 6y = 0 to a 2×2 first-order system and identify the eigenvalues.

1. Step 1: Introduce state variables. Let x₁ = y, x₂ = y'. Then x₁' = x₂, x₂' = y'' = 6y − y' = 6x₁ − x₂. Why: state-variable substitution converts the scalar ODE to a system.
2. Step 2: Write in matrix form. x' = [[0, 1],[6, −1]]x. Why: the companion matrix A has entries from the ODE coefficients (with appropriate signs).
3. Step 3: Find eigenvalues of A. det(A − λI) = (−λ)(−1−λ) − 1·6 = λ(1+λ) − 6 = λ² + λ − 6 = (λ+3)(λ−2) = 0. So λ₁ = −3, λ₂ = 2. Why: the characteristic polynomial of A equals the characteristic equation of the original scalar ODE.
4. Step 4: Note correspondence. The eigenvalues λ = −3, 2 match the roots of the scalar characteristic equation r² + r − 6 = 0 (r+3)(r−2) = 0. Why: confirms state-variable reduction is consistent with the scalar theory.
5. Step 5: Find eigenvectors (sketch). For λ₁ = −3: (A − (−3)I)v = 0 → [[3,1],[6,2]]v = 0 → v₁ = [1, −3]ᵀ. For λ₂ = 2: (A − 2I)v = 0 → [[−2,1],[6,−3]]v = 0 → v₂ = [1, 2]ᵀ. Why: eigenvectors form the basis for the solution space.

*Outcome:* System x' = [[0,1],[6,−1]]x; eigenvalues λ₁ = −3, λ₂ = 2; eigenvectors v₁ = [1,−3]ᵀ, v₂ = [1,2]ᵀ. General solution x(t) = c₁e^{−3t}[1,−3]ᵀ + c₂e^{2t}[1,2]ᵀ, equivalently y(t) = c₁e^{−3t} + c₂e^{2t} — matching the scalar solution.

**Real-world intuition**

- Coupled spring-mass systems: two masses on springs produce a 2×2 ODE system whose eigenvalues are the natural frequencies
- Predator-prey dynamics (Lotka-Volterra): linearized near equilibrium, gives a 2×2 system
- Electrical networks: multi-loop circuits produce coupled ODEs in a matrix system for loop currents or node voltages

**Practice progression**

Item types: convert scalar ODE to matrix system, write companion matrix for nth-order ODE, compute eigenvalues and eigenvectors of A, write general solution from eigenvalue-eigenvector pairs, determine stability from eigenvalue signs. Suggested item count: 6.

2×2 real distinct eigenvalues → 2×2 complex eigenvalues → 3×3 system → repeated eigenvalue (generalized eigenvector)

**Assessment objectives**

Formats: convert ODE to system and find eigenvalues, write general solution from given eigenvalues and eigenvectors, determine stability of a given system from its eigenvalue structure. Bloom alignment: apply.

Mastery signal: Correctly converts to matrix form, computes eigenvalues, writes solution in ≥ 4 of 5 problems

**Teacher notes**

The key insight is that for x' = Ax, we try x = e^{λt}v (the vector analog of the scalar trial y = e^{rt}). Substituting gives λe^{λt}v = Ae^{λt}v, so Av = λv — exactly the eigenvalue equation. The trial x = e^{λt}v works if and only if (λ,v) is an eigenvalue-eigenvector pair.

**Student notes**

For x' = Ax, think: 'What vector x(t) satisfies x' = Ax?' The answer is e^{λt}v whenever Av = λv. So finding eigenvalues and eigenvectors of A is the same as solving the system — they give you the building blocks of the general solution.

**Prerequisite graph**

- Requires: math.de.second-order-ode, math.linalg.matrix, math.linalg.eigenvalues
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.linalg.diagonalization
- Narrative: The eigenvalue method for ODE systems is the synthesis of linear algebra (math.linalg.eigenvalues, math.linalg.diagonalization) and ODEs: eigenvalues of A determine the time behavior, and eigenvectors determine the directions. The scalar characteristic equation r² + pr + q = 0 is precisely the characteristic polynomial of the companion matrix A.

**Teaching hints — review triggers**

- Student cannot find eigenvalues of a 2×2 or 3×3 matrix
- Student does not know how to solve (A − λI)v = 0 for the eigenvector v
- Student does not understand why x = e^{λt}v satisfies x' = Ax when λ,v are an eigenvalue-eigenvector pair

**Spaced repetition / revision guidance**

If you convert a scalar ODE to a system and get eigenvalues that don't match the scalar characteristic roots, check your companion matrix — the most common error is transposing the sign of ODE coefficients or misplacing the 1 in the superdiagonal.

---

### Matrix Method for Linear Systems

*Concept ID: `math.de.systems-matrix-method` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 8h*

**Learning objective.** For the linear system x' = Ax, find the general solution by computing eigenvalue-eigenvector pairs of A, handling all three cases (real distinct, complex conjugate, repeated eigenvalues), and construct the fundamental matrix Φ(t).

For x′=Ax, solutions are of the form x=e^{λt}v where (λ,v) are eigenvalue-eigenvector pairs of A. Three cases: distinct real, repeated, complex conjugate eigenvalues — each producing a distinct fundamental matrix.

The matrix method for x' = Ax extends the scalar characteristic equation approach to vector systems. For each eigenvalue λ of A with eigenvector v, e^{λt}v is one solution. The three cases mirror the scalar theory: (1) real distinct eigenvalues λ₁ ≠ λ₂: solutions e^{λ₁t}v₁ and e^{λ₂t}v₂; (2) complex conjugate eigenvalues α ± βi: two real solutions e^{αt}cos(βt)·Re(v) − e^{αt}sin(βt)·Im(v) and e^{αt}sin(βt)·Re(v) + e^{αt}cos(βt)·Im(v); (3) repeated eigenvalue λ with deficient eigenspace: one eigenvector v and one generalized eigenvector w (from (A−λI)w = v), giving solutions e^{λt}v and e^{λt}(tv + w). The fundamental matrix Φ(t) is the n×n matrix whose columns are n independent solutions; the general solution is x = Φ(t)c.

**Key ideas**

- Each simple eigenvalue λ with eigenvector v contributes solution e^{λt}v
- Complex eigenvalues α ± βi: take real and imaginary parts of e^{(α+βi)t}v to get two real solutions
- Repeated eigenvalue (deficient): solve (A−λI)w = v for generalized eigenvector w → solutions e^{λt}v and e^{λt}(tv + w)
- Fundamental matrix Φ(t): columns are n independent solutions; satisfies Φ' = AΦ
- General solution: x = Φ(t)c; IVP solution: x(t) = Φ(t)Φ(0)⁻¹x₀

**Vocabulary**

- **fundamental matrix** — An n×n matrix Φ(t) whose columns are n linearly independent solutions to x' = Ax; the general solution is x = Φ(t)c.
- **generalized eigenvector** — A vector w satisfying (A−λI)w = v (not (A−λI)w = 0); needed when eigenvalue λ is repeated with a deficient eigenspace.
- **Jordan chain** — A sequence v, w where Av = λv (eigenvector) and (A−λI)w = v (generalized eigenvector), forming the building blocks for the repeated-eigenvalue solution e^{λt}v and e^{λt}(tv + w).

**Common misconceptions**

- *Misconception:* For complex eigenvalue α + βi, the solution is e^{(α+βi)t}v (a complex-valued vector)
  *Correction:* While e^{(α+βi)t}v is a valid complex solution, we need real-valued solutions for a real-coefficient system. Take the real and imaginary parts separately: Re(e^{(α+βi)t}v) and Im(e^{(α+βi)t}v). These two real vector functions are independent solutions and span the same 2D subspace as the complex solutions.
- *Misconception:* For a repeated eigenvalue, you can use the same eigenvector twice to get two solutions
  *Correction:* For a repeated eigenvalue with a 1D eigenspace, there is only one eigenvector direction. The second independent solution is e^{λt}(tv + w) where w is the generalized eigenvector satisfying (A−λI)w = v. Using v twice gives two proportional solutions — their linear combination spans only a 1D space, missing half the solution space.
- *Misconception:* The fundamental matrix Φ(t) must have Φ(0) = I
  *Correction:* The fundamental matrix Φ(t) is any matrix whose columns form a fundamental set (n independent solutions). It does not need to satisfy Φ(0) = I. The specific fundamental matrix satisfying Φ(0) = I is the matrix exponential e^{At} — a useful but not always necessary choice.

**Common mistakes in practice**

- Using the same eigenvector twice for a repeated eigenvalue (proportional, not independent)
- Taking Im(v) = 0 when v is a real vector for a complex eigenvalue (need Im(v) from the complex eigenvector computation)
- Not verifying that the computed generalized eigenvector w actually satisfies (A−λI)w = v

**Visual teaching opportunities**

- Three-case classification table: real distinct eigenvalues → exponential columns; complex eigenvalues → trig×exponential columns; repeated eigenvalue → polynomial×exponential columns (with the te^{λt} term from the generalized eigenvector)
- 2D phase plane for each eigenvalue case: saddle (real distinct, opposite signs), node (real same sign), spiral (complex eigenvalues), center (pure imaginary)
- Generalized eigenvector diagram: (A−λI)w = v shown as a chain: A maps v to λv, and w to λw + v — the Jordan chain

**Worked example**

*Setup:* Solve x' = [[3,1],[−1,1]]x.

1. Step 1: Find eigenvalues. det(A−λI) = (3−λ)(1−λ)+1 = λ²−4λ+4 = (λ−2)² = 0. Repeated eigenvalue λ = 2. Why: discriminant = 0 gives a double root.
2. Step 2: Find the eigenvector. (A−2I)v = [[1,1],[−1,−1]]v = 0. → v = [1,−1]ᵀ (or any multiple). Why: solve the null space of A−2I.
3. Step 3: Find the generalized eigenvector. Solve (A−2I)w = v: [[1,1],[−1,−1]]w = [1,−1]ᵀ. From row 1: w₁+w₂ = 1. Choose w₂ = 0 → w₁ = 1, so w = [1,0]ᵀ. Why: the generalized eigenvector extends the solution space for the repeated eigenvalue.
4. Step 4: Write two independent solutions. x₁ = e^{2t}v = e^{2t}[1,−1]ᵀ; x₂ = e^{2t}(tv + w) = e^{2t}[t+1, −t]ᵀ. Why: repeated-eigenvalue solution formula.
5. Step 5: General solution. x = c₁e^{2t}[1,−1]ᵀ + c₂e^{2t}[t+1, −t]ᵀ. Why: linear combination of the two independent solutions.

*Outcome:* x = c₁e^{2t}[1,−1]ᵀ + c₂e^{2t}[t+1,−t]ᵀ. The component x₁(t) = (c₁ + c₂(t+1))e^{2t}; x₂(t) = (−c₁ − c₂t)e^{2t}. Both components grow exponentially since Re(λ) = 2 > 0 — the equilibrium x = 0 is unstable.

**Real-world intuition**

- Normal modes of vibration: eigenvectors of the stiffness-mass matrix give independent vibration modes; eigenvalues give modal frequencies
- Compartmental models in pharmacokinetics: drug distribution between organs modeled as a first-order linear system
- Population dynamics: Leslie matrix model for age-structured populations is a linear ODE system

**Practice progression**

Item types: find eigenvalues and eigenvectors of A, write solution for real distinct eigenvalues, extract real and imaginary parts for complex eigenvalues, find generalized eigenvector for repeated eigenvalue, write full general solution and apply ICs. Suggested item count: 7.

2×2 distinct real → 2×2 complex → 2×2 repeated → 3×3 mixed

**Assessment objectives**

Formats: full solve for 2×2 system in each of the three cases, find generalized eigenvector for a repeated eigenvalue, apply ICs to a 2×2 system with complex eigenvalues. Bloom alignment: apply.

Mastery signal: Correctly handles all three eigenvalue cases and applies ICs in ≥ 5 of 6 problems

**Teacher notes**

The generalized eigenvector equation (A−λI)w = v is the hardest concept in this section. Derive it by requiring that e^{λt}(tv + w) satisfies x' = Ax: d/dt[e^{λt}(tv+w)] = λe^{λt}(tv+w) + e^{λt}v must equal Ae^{λt}(tv+w) = e^{λt}A(tv+w). Matching: Av = λv (eigenvector) and Aw = λw + v — this is exactly (A−λI)w = v.

**Student notes**

For repeated eigenvalues, think of the solution as a power series in t: the first independent solution is e^{λt}v (no t factor), the second is e^{λt}(tv + w). The 't' in 'tv + w' is the signal that we have a generalized eigenvector — just like the scalar repeated-root solution (c₁ + c₂t)e^{λt}.

**Prerequisite graph**

- Requires: math.de.systems-ode, math.linalg.eigenvalues, math.linalg.diagonalization
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.linalg.matrix-exponential
- Narrative: The three eigenvalue cases for ODE systems (math.de.systems-matrix-method) parallel exactly the three characteristic root cases for scalar ODEs (math.de.char-equation): real distinct ↔ distinct exponentials, complex conjugate ↔ trig×exponential, repeated ↔ polynomial×exponential. The matrix method is the general n-dimensional extension of the scalar characteristic equation.

**Teaching hints — review triggers**

- Student cannot find eigenvectors by solving (A−λI)v = 0
- Student does not know how to extract Re and Im parts of a complex vector
- Student cannot set up the generalized eigenvector equation (A−λI)w = v

**Spaced repetition / revision guidance**

If the general solution looks like it has too few terms for the IVP (e.g., two equations but only one free constant), count your independent solutions: you need exactly n. For each repeated eigenvalue of multiplicity m, check that you have m solutions (one eigenvector solution + m−1 generalized eigenvector solutions).

---

### Phase Plane Analysis

*Concept ID: `math.de.phase-plane` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.8 · Estimated study time: 7h*

**Learning objective.** Analyze a 2D autonomous system x' = f(x,y), y' = g(x,y) qualitatively using phase-plane methods: find equilibria, classify each by the eigenvalues of the Jacobian, sketch the phase portrait, and identify global behavior (stable/unstable node, saddle, center, spiral).

For 2D autonomous systems x′=f(x,y), y′=g(x,y), trajectories in the xy-plane (phase plane) reveal global solution behavior. Equilibria classified by eigenvalue structure: nodes, spirals, saddles, centers.

The phase plane is the xy-plane where trajectories of the 2D autonomous system x' = f(x,y), y' = g(x,y) are drawn. Each trajectory is a curve (x(t),y(t)) parameterized by t, with the velocity vector (x',y') tangent to it at each point. Equilibria (x',y') = (0,0) are fixed points — constant solutions. Near each equilibrium (x*,y*), the system is linearized via the Jacobian J = [[∂f/∂x, ∂f/∂y],[∂g/∂x, ∂g/∂y]] at (x*,y*). The eigenvalues of J classify the equilibrium: both real negative → stable node; both real positive → unstable node; opposite signs → saddle point; complex α ± βi with α < 0 → stable spiral; α > 0 → unstable spiral; α = 0 → center (neutrally stable). This classification provides the qualitative picture of all solutions near each equilibrium.

**Key ideas**

- Trajectories in the xy-plane are the geometric picture of solutions — no t-axis needed
- Equilibria: solve f(x*,y*) = 0 and g(x*,y*) = 0 simultaneously
- Linearization: evaluate Jacobian J at each equilibrium; eigenvalues of J determine local behavior
- Five classification cases: stable node (λ₁,λ₂ < 0), unstable node (λ₁,λ₂ > 0), saddle (λ₁ < 0 < λ₂), stable spiral (Re(λ) < 0), unstable spiral (Re(λ) > 0), center (Re(λ) = 0)
- Global behavior requires nullclines (f = 0 and g = 0), whose intersections are equilibria

**Vocabulary**

- **phase plane** — The xy-plane for a 2D autonomous system x' = f(x,y), y' = g(x,y); trajectories (x(t),y(t)) are drawn here, with time as an implicit parameter along each curve.
- **equilibrium (fixed point)** — A point (x*,y*) where f(x*,y*) = 0 and g(x*,y*) = 0 — a constant solution where no motion occurs.
- **saddle point** — An equilibrium with one positive and one negative eigenvalue; trajectories approach along the stable manifold and diverge along the unstable manifold.
- **nullcline** — The curve where f = 0 (x-nullcline, y-motion only) or g = 0 (y-nullcline, x-motion only); their intersections are equilibria.

**Common misconceptions**

- *Misconception:* The phase plane shows how x and y evolve in time
  *Correction:* The phase plane shows trajectories in the xy-space, not in time. Time is a parameter along each trajectory — it is not shown directly. To recover time dependence, you would need to parameterize the trajectory by t, which requires solving the ODE. The phase plane shows which paths solutions follow, not when.
- *Misconception:* If the Jacobian has Re(λ) = 0 at an equilibrium, the nonlinear system has a center there
  *Correction:* Re(λ) = 0 means the linearization has a center — but nonlinear systems can have a spiral or a center at such a point; the linearization is inconclusive. The Poincaré index or a Lyapunov function is needed to determine the true nonlinear behavior when the linearization predicts a center.
- *Misconception:* Trajectories in the phase plane can cross each other
  *Correction:* For an autonomous system, the uniqueness theorem guarantees that through each point in the phase plane passes at most one trajectory. Crossing would mean two different solutions pass through the same point at the same time, contradicting uniqueness. Apparent crossings in hand-drawn phase portraits are an indication of an error.

**Common mistakes in practice**

- Claiming trajectories can cross (they never can for autonomous systems)
- Confusing center in the linearization with center in the nonlinear system (inconclusive case)
- Using eigenvalues of A from the original system, not of J at the specific equilibrium, when classifying each equilibrium separately

**Visual teaching opportunities**

- Six phase portrait sketches: stable node, unstable node, saddle, stable spiral, unstable spiral, center — clearly labeled with typical eigenvalue descriptions
- Nullcline overlay: f = 0 (x-nullcline) and g = 0 (y-nullcline) drawn on the same plane, with equilibria at intersections and flow direction in each region determined by sign of f and g
- Linearization diagram: zoom into a neighborhood of the saddle point, showing straight-line stable/unstable manifolds and hyperbolic trajectories

**Worked example**

*Setup:* Find and classify the equilibria of the system x' = x − xy, y' = −y + xy.

1. Step 1: Find equilibria. Solve x − xy = x(1−y) = 0 and −y + xy = y(x−1) = 0. From first: x = 0 or y = 1. From second: y = 0 or x = 1. Cases: (x=0, y=0) ✓; (x=0, x=1 — contradiction); (y=1, y=0 — contradiction); (y=1, x=1) ✓. Two equilibria: (0,0) and (1,1). Why: systematic case analysis.
2. Step 2: Compute Jacobian. J = [[1−y, −x],[y, x−1]]. Why: partial derivatives of f = x−xy and g = −y+xy.
3. Step 3: Classify (0,0). J(0,0) = [[1,0],[0,−1]]. Eigenvalues: λ₁ = 1, λ₂ = −1 (opposite signs). Classification: saddle point. Why: one positive, one negative eigenvalue → unstable in one direction, stable in another.
4. Step 4: Classify (1,1). J(1,1) = [[0,−1],[1,0]]. Characteristic polynomial: λ² + 1 = 0 → λ = ±i. Pure imaginary eigenvalues: the linearization predicts a center. Why: Re(λ) = 0 → center (for the linearization; nonlinear analysis may differ).
5. Step 5: Sketch qualitative portrait. Near (0,0): saddle — stable manifold along y-axis, unstable along x-axis. Near (1,1): closed orbits (center). This is the Lotka-Volterra predator-prey model — population cycles around (1,1). Why: biological interpretation confirms center behavior.

*Outcome:* (0,0) is a saddle (extinction equilibrium — unstable), (1,1) is a center (coexistence equilibrium, surrounded by closed periodic orbits representing population cycles). The phase portrait shows periodic oscillations around (1,1) and saddle behavior near (0,0).

**Real-world intuition**

- Predator-prey (Lotka-Volterra): phase plane shows population cycles around coexistence equilibrium
- SIR epidemic: phase plane of (S,I) shows all epidemic trajectories, including whether the epidemic peaks
- Mechanical systems: pendulum phase portrait distinguishes oscillation (center) from unstable equilibrium (saddle)

**Practice progression**

Item types: find equilibria by solving f = g = 0, compute Jacobian at equilibrium, find eigenvalues of Jacobian and classify equilibrium, sketch qualitative phase portrait, draw nullclines and identify flow regions. Suggested item count: 6.

One equilibrium with distinct real eigenvalues → one equilibrium with complex eigenvalues → two equilibria → full phase portrait sketch

**Assessment objectives**

Formats: find and classify all equilibria for a given system, sketch the qualitative phase portrait based on eigenvalue classification, interpret phase portrait physically (e.g., predator-prey cycle). Bloom alignment: analyze.

Mastery signal: Correctly finds equilibria, computes Jacobian eigenvalues, classifies all equilibrium types, and sketches qualitatively accurate phase portraits in ≥ 4 of 5 problems

**Teacher notes**

Phase plane analysis is the qualitative complement to the quantitative solution methods. Emphasize that for nonlinear systems, you usually cannot find the exact solution — but the phase plane gives the complete qualitative picture. This is the primary tool used in nonlinear dynamics, ecology, epidemiology, and neuroscience.

**Student notes**

The phase plane procedure: (1) set f = g = 0 and find equilibria; (2) linearize (compute Jacobian at each equilibrium); (3) find eigenvalues and classify; (4) draw nullclines to get the global flow direction; (5) sketch trajectories connecting the local pictures. The nullclines and eigenvalue signs together determine almost everything about the portrait.

**Prerequisite graph**

- Requires: math.de.systems-ode, math.de.slope-field
- Unlocks (future prerequisite links): math.de.stability-analysis
- Cross-topic connections (graph cross-links): none
- Narrative: Phase plane analysis extends slope fields (math.de.slope-field) from scalar to 2D vector systems: the slope field's 1D tangent segments become 2D velocity arrows in the phase plane. Stability analysis (math.de.stability-analysis) formalizes the center/spiral/node classification using Lyapunov functions beyond just linearization.

**Teaching hints — review triggers**

- Student cannot find equilibria (cannot solve f = g = 0 simultaneously)
- Student cannot compute the Jacobian (partial derivatives) at a given point
- Student does not know the eigenvalue-classification rule (confuses saddle with unstable node)

**Spaced repetition / revision guidance**

If your phase portrait looks wrong (trajectories spiraling into a saddle, or no closed orbits around what should be a center), recompute the Jacobian eigenvalues. The most common error is computing J at the origin instead of at the specific equilibrium being classified.

---

### Stability Analysis

*Concept ID: `math.de.stability-analysis` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.75 · Estimated study time: 7h*

**Learning objective.** Define Lyapunov stability and asymptotic stability for equilibria of ODEs, classify equilibria using linearization (Jacobian eigenvalues) for local analysis, and construct Lyapunov functions to prove global stability results.

Classification of equilibria of ODEs: stable (Lyapunov), asymptotically stable, or unstable. Linearization near equilibria using the Jacobian determines local stability; Lyapunov functions give global results.

Stability analysis determines the long-term fate of solutions near an equilibrium. An equilibrium x* is Lyapunov stable if solutions starting nearby stay nearby; asymptotically stable if they additionally converge to x* as t → ∞; unstable if nearby solutions can escape. For smooth autonomous systems, local stability is determined by the Jacobian J at x*: if all eigenvalues have Re(λ) < 0, the equilibrium is asymptotically stable; if any Re(λ) > 0, it is unstable; if the largest Re(λ) = 0, the linearization is inconclusive (center or degenerate case). For global stability, Lyapunov's direct method constructs a scalar energy-like function V(x) satisfying V > 0 away from x* and dV/dt ≤ 0 along trajectories — if dV/dt < 0, the equilibrium is globally asymptotically stable without needing to solve the ODE explicitly.

**Key ideas**

- Lyapunov stable: solutions starting near x* remain near x* for all t ≥ 0
- Asymptotically stable: Lyapunov stable AND x(t) → x* as t → ∞
- Linearization criterion: all Re(λ_i) < 0 → asymptotically stable; any Re(λ_i) > 0 → unstable
- Lyapunov function V(x): V > 0 for x ≠ x*, V(x*) = 0, and dV/dt = ∇V·f ≤ 0 along trajectories → stable; dV/dt < 0 → asymptotically stable
- Inconclusive case Re(λ) = 0: linearization cannot determine stability; need Lyapunov or center manifold theory

**Vocabulary**

- **Lyapunov stable** — An equilibrium x* such that for every ε > 0, solutions starting within δ of x* remain within ε of x* for all t ≥ 0.
- **asymptotically stable** — Lyapunov stable AND x(t) → x* as t → ∞; solutions starting near x* converge to it.
- **Lyapunov function** — A scalar function V(x) > 0 (positive definite) with dV/dt ≤ 0 along system trajectories; its existence proves stability without solving the ODE.
- **basin of attraction** — The set of all initial conditions from which solutions converge to a given asymptotically stable equilibrium; can be determined by a Lyapunov function.

**Common misconceptions**

- *Misconception:* Lyapunov stable and asymptotically stable are the same thing
  *Correction:* Lyapunov stability means solutions stay near x* but do not necessarily approach it. Asymptotic stability requires both: nearness (Lyapunov) AND convergence to x*. A center (pure imaginary eigenvalues) is Lyapunov stable but not asymptotically stable — trajectories orbit at fixed distance and never reach x*.
- *Misconception:* Any function V(x) > 0 can serve as a Lyapunov function
  *Correction:* A Lyapunov function must satisfy three conditions: V(x) > 0 for x ≠ x*, V(x*) = 0, AND dV/dt = ∇V·f(x) ≤ 0 along trajectories of the ODE. A function that is positive but whose time derivative is positive is not a Lyapunov function — it would show solutions moving away from x*, not toward it.
- *Misconception:* If the linearization has all Re(λ) < 0, the equilibrium is globally asymptotically stable
  *Correction:* Linearization gives only local stability. Even if all eigenvalues have Re(λ) < 0, global stability (convergence for all initial conditions) requires additional analysis — typically a Lyapunov function. A nonlinear system can have a locally asymptotically stable equilibrium with a bounded basin of attraction outside which solutions diverge.

**Common mistakes in practice**

- Applying the linearization stability criterion globally (it is only local)
- Claiming Re(λ) = 0 means unstable (it means inconclusive — could be stable or unstable)
- Computing dV/dt = V'(t) as just the t-derivative of V without using the chain rule with the ODE

**Visual teaching opportunities**

- Stability classification diagram: 2D eigenvalue plane (Re(λ) vs. Im(λ)); color regions by stability: all left half-plane → asymptotically stable; any right half-plane → unstable; imaginary axis → inconclusive
- Lyapunov function visualization: V(x,y) = x²+y² as a bowl (level sets are circles); dV/dt < 0 means V decreases along trajectories — solutions spiral inward along the bowl
- Phase portraits illustrating Lyapunov vs. asymptotic stability: center (orbits at fixed radius, Lyapunov stable) vs. stable spiral (orbits spiraling in, asymptotically stable)

**Worked example**

*Setup:* Show that the equilibrium x = 0 of the system x' = −x − y², y' = −y + x² is asymptotically stable using a Lyapunov function.

1. Step 1: Propose V(x,y) = x² + y². Why: the simplest positive definite function for a 2D system with equilibrium at origin.
2. Step 2: Check V > 0 for (x,y) ≠ (0,0) and V(0,0) = 0. ✓ for x² + y² > 0 when (x,y) ≠ 0. Why: confirms V is a valid candidate.
3. Step 3: Compute dV/dt along trajectories. dV/dt = 2x·x' + 2y·y' = 2x(−x−y²) + 2y(−y+x²) = −2x² − 2xy² − 2y² + 2x²y = −2(x²+y²) + 2xy(x−y). Why: chain rule with x' = f, y' = g.
4. Step 4: Bound the cross term. |2xy(x−y)| ≤ 2|xy|(|x|+|y|) ≤ (x²+y²)(|x|+|y|) using AM-GM |xy| ≤ (x²+y²)/2. For small r = √(x²+y²): |cross term| ≤ 2r³ → 0 as r → 0. Why: shows that near the origin, −2(x²+y²) dominates.
5. Step 5: Conclude local asymptotic stability. For sufficiently small r, dV/dt = −2r² + O(r³) < 0. Thus dV/dt < 0 in a neighborhood of the origin. By Lyapunov's theorem, the origin is asymptotically stable. Why: strict negativity of dV/dt in a neighborhood satisfies the Lyapunov theorem hypothesis.

*Outcome:* V = x² + y² is a Lyapunov function proving the origin is locally asymptotically stable. The linearization check: J(0,0) = [[−1,0],[0,−1]], eigenvalues both −1 (< 0), consistent with asymptotic stability.

**Real-world intuition**

- Control engineering: stability analysis of a closed-loop control system — all eigenvalues of the closed-loop system matrix must have Re < 0 for stable tracking
- Ecology: asymptotic stability of a predator-prey equilibrium means populations return to coexistence after perturbation
- Structural engineering: stability of a structure under load — Lyapunov's method applied to the potential energy

**Practice progression**

Item types: classify equilibrium from Jacobian eigenvalues, determine local stability from linearization, verify a proposed Lyapunov function, construct a Lyapunov function for a simple system, distinguish Lyapunov stable from asymptotically stable in a given example. Suggested item count: 6.

Linear systems (eigenvalue classification) → nonlinear with quadratic V → nonlinear with non-obvious Lyapunov function → inconclusive linearization case

**Assessment objectives**

Formats: classify equilibrium using Jacobian, verify or invalidate a proposed Lyapunov function, explain in one sentence why a center is Lyapunov stable but not asymptotically stable. Bloom alignment: analyze.

Mastery signal: Correctly applies linearization stability criterion, verifies Lyapunov function conditions, and distinguishes stability types in ≥ 4 of 5 problems

**Teacher notes**

The conceptual key is separating 'nearby solutions stay nearby' (Lyapunov) from 'solutions converge' (asymptotic). A pendulum without friction is a classic example of Lyapunov stable but not asymptotically stable — it oscillates forever at constant energy. Adding friction makes it asymptotically stable.

**Student notes**

A Lyapunov function is an 'energy-like' function that decreases along trajectories. If you can find such a function, you've proved stability without integrating the ODE. Think of it as a potential hill: if the system always rolls downhill (dV/dt < 0), it must converge to the bottom (the equilibrium).

**Prerequisite graph**

- Requires: math.de.phase-plane
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Stability analysis extends phase-plane analysis (math.de.phase-plane) from local eigenvalue classification to global Lyapunov theory. The Lyapunov function concept reappears in LaSalle's invariance principle, Hamiltonian mechanics (energy as a Lyapunov function for conservative systems), and control theory (control Lyapunov functions for stabilization).

**Teaching hints — review triggers**

- Student confuses Lyapunov stability with asymptotic stability (cannot state the difference)
- Student cannot compute dV/dt = ∇V·f(x) (chain rule along trajectories)
- Student cannot find eigenvalues of the Jacobian or classify their sign structure

**Spaced repetition / revision guidance**

If you cannot find a Lyapunov function, try V = xᵀPx (a quadratic form) where P is a positive definite matrix. For stable linear systems x' = Ax, the Lyapunov equation Aᵀ P + PA = −Q (for any positive definite Q) always has a solution P — this is the standard automated Lyapunov function construction for linear systems.

---

### Series Solution of ODEs

*Concept ID: `math.de.series-solution` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 6h*

**Learning objective.** Find a power series solution y = Σaₙxⁿ to a second-order linear ODE at an ordinary point by substituting the series, deriving the recurrence relation for the coefficients aₙ, and determining the radius of convergence.

Assumes y=∑aₙxⁿ and substitutes into the ODE to determine the recurrence relation for coefficients aₙ. Valid when x=0 is an ordinary point of the ODE.

When exact closed-form solutions are unavailable, a power series y = Σₙ₌₀^∞ aₙxⁿ can be assumed and substituted into the ODE. Differentiating term-by-term and equating coefficients of each power of x yields a recurrence relation expressing aₙ₊₂ (or aₙ₊ₖ) in terms of earlier coefficients a₀, a₁, …, aₙ. The initial conditions set a₀ = y(0) and a₁ = y'(0), and the recurrence generates all higher coefficients. The method applies at ordinary points — values of x where the ODE has no singularity (the coefficient of the highest derivative is nonzero and the other coefficients are analytic). The radius of convergence of the resulting series is at least as large as the distance from the expansion point to the nearest singular point of the ODE.

**Key ideas**

- Substitute y = Σaₙxⁿ, y' = Σnaₙx^{n−1}, y'' = Σn(n−1)aₙx^{n−2} term-by-term
- Shift index to align all powers of x, then equate coefficients of each xⁿ to zero
- Recurrence relation: aₙ₊₂ (or aₙ₊ₖ) expressed as a linear combination of a₀, a₁, …, aₙ
- Two free parameters (a₀ and a₁) generate two linearly independent series solutions
- Radius of convergence ≥ distance from expansion point to nearest singular point

**Vocabulary**

- **ordinary point** — A point x₀ where the ODE's coefficients p(x) and q(x) (in standard form y'' + py' + qy = 0) are both analytic; power series solutions converge in a neighborhood of ordinary points.
- **recurrence relation** — A formula expressing aₙ₊ₖ as a linear combination of earlier coefficients; derived by substituting the power series into the ODE and equating coefficients of xⁿ.
- **radius of convergence** — The radius ρ of the largest disk centered at the expansion point within which the power series solution converges; ρ ≥ distance to the nearest singular point.

**Common misconceptions**

- *Misconception:* Series solution gives approximate answers, not exact solutions
  *Correction:* The power series solution IS an exact solution — a convergent infinite series that equals y(x) exactly within its radius of convergence. Truncating the series gives an approximation, but the full series is the exact solution, just expressed as an infinite sum rather than a closed form.
- *Misconception:* The recurrence relation determines all coefficients from a₀ alone
  *Correction:* Second-order ODEs give recurrences that couple aₙ₊₂ to aₙ (and possibly aₙ₋₁, aₙ₋₂, etc.), with a₀ and a₁ both appearing as free parameters. These two free parameters generate two linearly independent solutions, reflecting the 2D solution space. Both a₀ and a₁ are needed — setting one to 0 while the other is nonzero gives one basis solution.
- *Misconception:* The series converges everywhere if the ODE has continuous coefficients
  *Correction:* The series converges in a disk of radius ρ ≥ distance to the nearest singular point. Even if the ODE's coefficients are continuous on ℝ, the series may converge only on a finite interval. The radius of convergence is determined by the ODE's singular points in the complex plane, not by continuity on the real line.

**Common mistakes in practice**

- Differentiating Σaₙxⁿ to get Σaₙnx^n (wrong: should be Σnaₙx^{n−1})
- Forgetting to shift the summation index before collecting terms
- Treating the recurrence as giving all coefficients from a₀ alone (missing the a₁ family of odd terms)

**Visual teaching opportunities**

- Index-shift alignment: show three series (for y'', P(x)y', Q(x)y) rewritten to match xⁿ terms, then collect all coefficients of xⁿ in one equation
- Recurrence tree: a₀ → a₂ → a₄ → … and a₁ → a₃ → a₅ → … showing the two independent coefficient sequences generated by the two free parameters
- Radius of convergence diagram: ODE with singular points at x = ±2 in the complex plane; power series around x = 0 converges in the disk |x| < 2

**Worked example**

*Setup:* Find a power series solution to y'' + xy' + y = 0 about x = 0.

1. Step 1: Verify x = 0 is an ordinary point. The ODE in standard form is y'' + xy' + y = 0 with P = x, Q = 1 — both analytic at x = 0. ✓
2. Step 2: Substitute y = Σₙ₌₀^∞ aₙxⁿ. Then y' = Σₙ₌₁^∞ naₙx^{n−1}, y'' = Σₙ₌₂^∞ n(n−1)aₙx^{n−2}. Why: assume series form and differentiate term-by-term.
3. Step 3: Write the ODE in terms of series. Σₙ₌₂ n(n−1)aₙx^{n−2} + x·Σₙ₌₁ naₙx^{n−1} + Σₙ₌₀ aₙxⁿ = 0. Simplify x-products: x·Σnaₙx^{n−1} = Σnaₙxⁿ. Why: multiply through.
4. Step 4: Shift index in the first sum. Let m = n−2 in Σn(n−1)aₙx^{n−2}: Σₘ₌₀^∞ (m+2)(m+1)a_{m+2}x^m. Why: align all sums to have the same power xⁿ.
5. Step 5: Collect coefficients of xⁿ. [(n+2)(n+1)a_{n+2} + naₙ + aₙ] = 0 → (n+2)(n+1)a_{n+2} + (n+1)aₙ = 0 → a_{n+2} = −aₙ/(n+2). Why: recurrence from matching coefficients.
6. Step 6: Generate the two series. Even coefficients (from a₀): a₂ = −a₀/2, a₄ = −a₂/4 = a₀/8, a₆ = −a₄/6 = −a₀/48, … Odd coefficients (from a₁): a₃ = −a₁/3, a₅ = −a₃/5 = a₁/15, … The general solution is y = a₀y₁ + a₁y₂ where y₁ and y₂ are the two series.

*Outcome:* y₁ = 1 − x²/2 + x⁴/8 − x⁶/48 + … and y₂ = x − x³/3 + x⁵/15 − …. Both series converge for all x (no singular points in the ODE), giving the complete solution. Note: y₁ = e^{−x²/2} in closed form (can be verified by Taylor expansion), and y₂ is related to the error function.

**Real-world intuition**

- Airy equation y'' − xy = 0: no closed-form solution; the Airy functions Ai(x) and Bi(x) are defined by their power series, fundamental in quantum mechanics (WKB approximation)
- Quantum harmonic oscillator: Hermite polynomials arise as the terminating power series solutions to the ODE from Schrödinger's equation
- Special functions in general: Legendre polynomials, Bessel functions, hypergeometric functions are all defined by their power series solutions to specific ODEs

**Practice progression**

Item types: verify ordinary point, write the recurrence relation, generate first 4 terms of each series solution, identify radius of convergence from singular points, sum the series in closed form when possible. Suggested item count: 6.

ODE with constant coefficients (verify against characteristic equation answer) → ODE with linear P(x) → ODE with polynomial Q(x) → ODE whose series is a known function (e.g., sin or eˣ)

**Assessment objectives**

Formats: derive recurrence relation and generate first 5 terms, state the radius of convergence from singular point analysis, write the general solution in series form. Bloom alignment: apply.

Mastery signal: Correctly derives recurrence, generates two independent series, and identifies radius of convergence in ≥ 4 of 5 problems

**Teacher notes**

The index-shift step is where most students lose the thread. Practice it as a separate drill: given Σₙ₌₂ n(n−1)aₙx^{n−2}, rewrite as Σₘ₌₀ (m+2)(m+1)a_{m+2}xᵐ by setting m = n−2. Do this three times until it is automatic.

**Student notes**

The series method is algorithmic: assume y = Σaₙxⁿ, differentiate, shift indices so all series go from n = 0, collect xⁿ terms, set the coefficient to zero for each n — this gives the recurrence. Then start from a₀ and a₁ and generate as many terms as needed.

**Prerequisite graph**

- Requires: math.de.second-order-linear, math.calc.power-series
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.calc.taylor-series
- Narrative: Series solutions are the ODE analog of Taylor series (math.calc.taylor-series): the coefficients aₙ = y^{(n)}(0)/n! for an ordinary point, and the ODE generates these derivatives recursively via the recurrence. The Frobenius method (math.de.frobenius-method) extends this to singular points using xʳ·Σaₙxⁿ.

**Teaching hints — review triggers**

- Student cannot differentiate a power series term-by-term or does not know that (Σaₙxⁿ)' = Σnaₙx^{n−1}
- Student cannot shift the summation index to align powers
- Student does not understand that a₀ and a₁ are free parameters and the others are determined by the recurrence

**Spaced repetition / revision guidance**

If your recurrence seems wrong, test it against a known ODE: try y'' − y = 0. The series substitution should give the recurrence a_{n+2} = aₙ/((n+2)(n+1)), generating y₁ = cosh(x) and y₂ = sinh(x). If your procedure gives different series, find the error in the index-shift step.

---

### Frobenius Method

*Concept ID: `math.de.frobenius-method` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.75 · Estimated study time: 7h*

**Learning objective.** Apply the Frobenius method to find series solutions of the form y = xʳΣaₙxⁿ near a regular singular point x = 0 by solving the indicial equation for r and using the appropriate solution form for each of the three root cases.

For ODEs with a regular singular point at x=0, seeks solutions of the form y=xʳ∑aₙxⁿ. The indicial equation determines r. Three subcases based on root difference: distinct non-integer, integer, or equal roots.

When x = 0 is a regular singular point (the ODE has the form x²y'' + xP₀(x)y' + Q₀(x)y = 0 where P₀ and Q₀ are analytic), the Frobenius method seeks solutions y = xʳΣₙ₌₀^∞ aₙxⁿ = xʳ(a₀ + a₁x + …). Substituting and collecting the lowest-power term (xʳ) gives the indicial equation: r(r−1) + P₀(0)r + Q₀(0) = 0, a quadratic in r. The two roots r₁ ≥ r₂ give three cases: (1) r₁ − r₂ ∉ ℤ: two independent Frobenius series; (2) r₁ = r₂: one Frobenius series, second solution involves ln(x); (3) r₁ − r₂ = positive integer: first Frobenius series from r₁, second may involve ln(x). Bessel's and Legendre's equations are classical examples.

**Key ideas**

- Regular singular point: x = 0 where x·P(x) and x²·Q(x) are analytic (P, Q are coefficients in standard form)
- Trial solution: y = xʳΣaₙxⁿ; substituting gives indicial equation r(r−1) + p₀r + q₀ = 0
- Indicial roots r₁ ≥ r₂ determine the three cases based on r₁ − r₂
- Case 1 (r₁ − r₂ ∉ ℤ): y₁ = xʳ¹Σaₙxⁿ, y₂ = xʳ²Σbₙxⁿ independently
- Case 2 (r₁ = r₂): y₂ = y₁ ln(x) + xʳ¹Σcₙxⁿ (reduction of order)

**Vocabulary**

- **regular singular point** — A point x₀ of the ODE y'' + P(x)y' + Q(x)y = 0 where (x−x₀)P and (x−x₀)²Q are analytic; Frobenius series solutions exist near regular singular points.
- **indicial equation** — r(r−1) + p₀r + q₀ = 0; the quadratic in r determining the exponents of the Frobenius series; its roots are the indicial roots.
- **indicial roots** — The roots r₁ and r₂ of the indicial equation; their difference r₁ − r₂ determines which of three cases applies for the form of the second solution.

**Common misconceptions**

- *Misconception:* The Frobenius method is the same as the power series method
  *Correction:* The power series method y = Σaₙxⁿ applies at ordinary points; Frobenius extends it to regular singular points by including a factor xʳ where r need not be a non-negative integer. The key difference is the xʳ prefactor and the indicial equation that determines r.
- *Misconception:* Both Frobenius solutions always have the same form xʳΣaₙxⁿ
  *Correction:* Only in Case 1 (non-integer difference of roots) do both solutions have the simple Frobenius form. For Cases 2 and 3 (repeated or integer-difference roots), the second solution must include a logarithmic term xʳ ln(x) — forcing a purely series form fails because the series for the second solution does not converge to a solution.
- *Misconception:* The indicial equation is the same as the characteristic equation
  *Correction:* The indicial equation r(r−1) + p₀r + q₀ = 0 is a quadratic in r determined by the ODE's behavior at the singular point (p₀ = P₀(0), q₀ = Q₀(0)). It is related to but different from the scalar characteristic equation — the characteristic equation comes from the ODE structure for ordinary points, not from behavior at singular points.

**Common mistakes in practice**

- Forgetting xʳ in the trial solution and using Σaₙxⁿ instead of xʳΣaₙxⁿ
- Computing p₀ and q₀ incorrectly (should be the value of xP and x²Q at x = 0, not P and Q themselves)
- Claiming both solutions are simple Frobenius series in Cases 2 and 3 (missing the log term)

**Visual teaching opportunities**

- Regular vs. irregular singular point classification: x = 0 is regular if xP and x²Q are analytic; illustrated with examples (Bessel: regular) and (essential singularity: irregular)
- Three-case decision tree from the indicial roots r₁ and r₂: compute r₁ − r₂ → non-integer → Case 1; zero → Case 2; positive integer → Case 3
- Solution structure for each case: Case 1 (two Frobenius series), Case 2 (one series + ln-term series), Case 3 (r₁ series + r₂ series with possible ln term)

**Worked example**

*Setup:* Find the indicial equation and the leading solution for 2xy'' + y' + xy = 0 about x = 0.

1. Step 1: Classify x = 0. Standard form: y'' + (1/(2x))y' + (1/2)y = 0. P = 1/(2x), Q = 1/2. Then xP = 1/2 (analytic) and x²Q = x²/2 (analytic). So x = 0 is a regular singular point. Why: confirms Frobenius applies.
2. Step 2: Identify p₀ and q₀. p₀ = lim_{x→0} xP(x) = 1/2; q₀ = lim_{x→0} x²Q(x) = 0. Why: leading coefficients for the indicial equation.
3. Step 3: Write the indicial equation. r(r−1) + (1/2)r + 0 = 0 → r² − (1/2)r = 0 → r(r − 1/2) = 0. Roots: r₁ = 1/2, r₂ = 0. Why: quadratic in r from the regular-singular-point structure.
4. Step 4: Check root difference. r₁ − r₂ = 1/2, which is not an integer. → Case 1: two independent Frobenius series. Why: non-integer difference guarantees two simple series solutions.
5. Step 5: Leading terms for r₁ = 1/2. y = x^{1/2}(a₀ + a₁x + a₂x² + …). The leading behavior is y ≈ a₀x^{1/2} near x = 0. The full recurrence follows from substituting the series and collecting terms. Why: states the solution form; full coefficient recurrence requires more algebra.

*Outcome:* Indicial equation r(r−1/2) = 0 with roots r₁ = 1/2 and r₂ = 0. Case 1 applies, giving two independent Frobenius series: y₁ = x^{1/2}Σaₙxⁿ (the J_{1/2}(x) Bessel function up to normalization) and y₂ = x⁰Σbₙxⁿ = Σbₙxⁿ (J_{−1/2}(x)).

**Real-world intuition**

- Bessel equation (cylindrical geometry): Frobenius method gives Bessel functions Jᵥ and Yᵥ, fundamental in heat conduction in cylinders and wave propagation
- Legendre equation (spherical geometry): Frobenius at ordinary point (x = 0) gives Legendre polynomials; at singular point (x = ±1) requires Frobenius
- Hypergeometric equation: the Gauss hypergeometric ODE is solved by the Frobenius method and unifies most special functions of mathematical physics

**Practice progression**

Item types: classify the singular point (regular vs. irregular), compute p₀, q₀ and write the indicial equation, solve the indicial equation and identify the case, generate the first 3 terms of the r₁ Frobenius series, state whether a logarithmic term appears in y₂. Suggested item count: 6.

Non-integer roots (Case 1) → repeated root (Case 2) → integer-difference roots (Case 3) → Bessel equation indicial equation

**Assessment objectives**

Formats: classify singular point and derive indicial equation, identify the case from the roots and state the form of y₂, generate the leading Frobenius series terms. Bloom alignment: apply.

Mastery signal: Correctly classifies singular point, solves indicial equation, identifies case, and states solution form in ≥ 4 of 5 problems

**Teacher notes**

Focus on the indicial equation as the key diagnostic: once you have r₁ and r₂, the rest of the method is determined. Students who can always find the indicial equation correctly are halfway done — the subsequent recurrence is the same as in the ordinary power series method, just with index r instead of 0.

**Student notes**

Frobenius = power series with a fractional or negative starting power. The indicial equation finds that starting power r. Once you know r₁ and r₂, check r₁ − r₂: not an integer → both solutions are clean series; integer or zero → one (or both) solutions has a log term.

**Prerequisite graph**

- Requires: math.de.series-solution
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The Frobenius method is the gateway to special functions (math.de.bessel-equation, math.de.legendre-equation): Bessel's equation has a regular singular point at x = 0 with indicial roots r = ±ν, and Frobenius with non-integer difference gives the two Bessel functions Jᵥ and J_{−ν}. The log term in Case 2 corresponds to the Bessel function Yᵥ for integer ν.

**Teaching hints — review triggers**

- Student cannot perform the index-shift from the regular power series method (prerequisite step)
- Student cannot classify the singular point (requires checking analyticity of xP and x²Q)
- Student does not know what 'regular singular point' means and applies the standard series method incorrectly

**Spaced repetition / revision guidance**

If your indicial equation gives complex roots, double-check your computation of p₀ and q₀. Indicial roots are always real for standard ODE textbook problems because the ODE coefficients are real. Complex p₀ or q₀ indicates an error in the limiting computation.

---

### Bessel's Equation

*Concept ID: `math.de.bessel-equation` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.7 · Estimated study time: 6h*

**Learning objective.** Identify Bessel's equation x²y'' + xy' + (x²−ν²)y = 0, state the two independent solutions Jᵥ(x) and Yᵥ(x) (or J_{−ν} for non-integer ν), recall the first few terms of the Bessel function series Jᵥ(x), and interpret Bessel functions physically as the radial factor in cylindrical wave problems.

x²y″+xy′+(x²−ν²)y=0; solutions are Bessel functions Jᵥ(x) and Yᵥ(x). Arise in problems with cylindrical symmetry; Jᵥ regular at origin, Yᵥ singular.

Bessel's equation x²y'' + xy' + (x²−ν²)y = 0 arises when separating variables for the Laplace or Helmholtz equation in cylindrical coordinates. The parameter ν ≥ 0 is the order. The general solution is y = c₁Jᵥ(x) + c₂Yᵥ(x), where Jᵥ(x) (Bessel function of the first kind) is regular (bounded) at x = 0 and Yᵥ(x) (second kind, Neumann function) is singular at x = 0. For integer ν = n, the Frobenius method produces Jₙ(x) = Σₖ₌₀^∞ (−1)ᵏ/(k!(k+n)!) (x/2)^{n+2k}; Yₙ involves a logarithmic term. For non-integer ν, J_{−ν} is the independent second solution. Bessel functions oscillate like damped sine/cosine waves for large x and satisfy orthogonality relations on [0,1].

**Key ideas**

- Bessel equation: x²y'' + xy' + (x²−ν²)y = 0; x = 0 is a regular singular point
- General solution: y = c₁Jᵥ(x) + c₂Yᵥ(x); Jᵥ regular at origin, Yᵥ singular
- Jᵥ series: Jᵥ(x) = Σₖ₌₀^∞ (−1)ᵏ/[k!Γ(k+ν+1)](x/2)^{ν+2k}
- For integer n: J₀(1) ≈ 0.7652, J₀ has infinitely many real zeros — essential for eigenvalue problems
- Orthogonality: ∫₀^1 xJᵥ(αᵥₘr)Jᵥ(αᵥₙr)dr = 0 for m ≠ n, where αᵥₘ are positive zeros of Jᵥ

**Vocabulary**

- **Bessel function of the first kind** — Jᵥ(x) = Σₖ₌₀^∞ (−1)ᵏ/[k!Γ(k+ν+1)](x/2)^{ν+2k}; the solution to Bessel's equation that is bounded at x = 0.
- **Bessel function of the second kind** — Yᵥ(x) (Neumann function); the second independent solution to Bessel's equation, singular (→ −∞) at x = 0.
- **zeros of Bessel functions** — The positive values αᵥₘ where Jᵥ(αᵥₘ) = 0; used as eigenvalues in boundary value problems on cylindrical domains.

**Common misconceptions**

- *Misconception:* Bessel functions Jᵥ(x) are only relevant in pure mathematics
  *Correction:* Bessel functions are the standard solutions to any problem with cylindrical symmetry: heat conduction in a circular rod, vibrations of a circular drum, electromagnetic modes in a circular waveguide. They are as ubiquitous in engineering as sines and cosines are in rectangular geometry.
- *Misconception:* Jᵥ(x) has only one zero
  *Correction:* Jᵥ(x) has infinitely many real positive zeros αᵥ₁ < αᵥ₂ < αᵥ₃ < … (for ν ≥ 0). These zeros play the role of eigenvalues in boundary value problems with cylindrical geometry — just as nπ are the zeros of sin, αᵥₘ/a are the radial eigenvalues for a cylinder of radius a.
- *Misconception:* Jᵥ and J_{−ν} are independent solutions for all ν
  *Correction:* Jᵥ and J_{−ν} are linearly independent only when ν is not an integer. For integer ν = n, J_{−n}(x) = (−1)ⁿJₙ(x) — they are proportional, so J_{−n} is not a second independent solution. The independent second solution for integer n is the Neumann function Yₙ(x), which involves a logarithm.

**Common mistakes in practice**

- Including Yᵥ in the solution when the domain includes x = 0 (Yᵥ is singular there)
- Confusing the order ν (a parameter of the ODE) with the zeros αᵥₘ (which depend on both ν and the boundary condition)
- Forgetting that J_{−n}(x) = (−1)ⁿJₙ(x) for integer n — they are not independent

**Visual teaching opportunities**

- Plots of J₀, J₁, J₂ on [0,10] showing the damped oscillation character and the spacing of zeros
- Comparison table: sin(x)/cos(x) in rectangular coordinates ↔ Jᵥ(x)/Yᵥ(x) in cylindrical coordinates
- Circular drum vibration modes: the fundamental mode is J₀(α₀₁r/a)cos(ωt), showing Bessel zero as the radial wavelength boundary condition

**Worked example**

*Setup:* Show that J₀(x) = Σₖ₌₀^∞ (−1)ᵏ/(k!)² (x/2)^{2k} satisfies Bessel's equation of order 0: xy'' + y' + xy = 0 (equivalently x²y'' + xy' + x²y = 0 with ν = 0).

1. Step 1: Write the first few terms. J₀ = 1 − x²/4 + x⁴/64 − x⁶/2304 + …. Why: small-x behavior for verification.
2. Step 2: Compute J₀'. J₀' = −x/2 + x³/16 − x⁵/384 + …. Why: term-by-term differentiation.
3. Step 3: Compute J₀''. J₀'' = −1/2 + 3x²/16 − 5x⁴/384 + …. Why: differentiate again.
4. Step 4: Substitute into xy'' + y' + xy = 0. xy'' = x(−1/2 + 3x²/16 − …) = −x/2 + 3x³/16 − …. y' = −x/2 + x³/16 − …. xy = x − x³/4 + x⁵/64 − …. Sum: (−x/2 − x/2 + x) + (3x³/16 + x³/16 − x³/4) + … = 0 + 0 + … = 0. ✓ Why: direct verification that each power of x cancels.
5. Step 5: Note physical interpretation. J₀(0) = 1, J₀'(0) = 0 — the function starts at 1 with zero slope and oscillates with decreasing amplitude, like a damped cosine. The first zero is at x ≈ 2.405 — the fundamental mode boundary condition for a unit-radius circular drum.

*Outcome:* J₀(x) satisfies the Bessel equation of order 0. It is the radial factor in the fundamental mode of circular drum vibration, with the first zero α₀₁ ≈ 2.405 determining the relationship between drum radius and fundamental frequency.

**Real-world intuition**

- Circular drum vibration: eigenfrequencies proportional to zeros of Jₙ determine the overtone structure
- Heat conduction in a cylinder: temperature distribution involves J₀(αₘr/a)e^{−λₘt}
- Fiber optics: modes in a circular waveguide are described by Bessel functions of the radius
- Quantum mechanics: hydrogen atom radial wavefunctions involve Bessel functions (in free-particle limit)

**Practice progression**

Item types: identify the order ν in a given Bessel equation, write the first 3 terms of Jₙ(x) for n = 0, 1, 2, state whether Jᵥ or Yᵥ is used when x = 0 is in the domain, use orthogonality to set up a Bessel-Fourier expansion coefficient, verify a Bessel function satisfies its equation at a specific order. Suggested item count: 5.

Order 0 and 1 (integer) → non-integer order → zeros and orthogonality → Bessel-Fourier expansion

**Assessment objectives**

Formats: state general solution and which terms to include for a given boundary condition, write first 3 terms of J₁(x), explain why Yᵥ(x) is excluded when 0 is in the domain. Bloom alignment: apply.

Mastery signal: Correctly identifies equation order, states general solution, excludes Yᵥ for origin-inclusive domains, and writes series terms in ≥ 4 of 5 problems

**Teacher notes**

Bessel functions are best introduced via the physical problem (circular drum) rather than the ODE in isolation. Students who see why the Bessel equation arises from separating variables in cylindrical coordinates understand the function as a solution to a natural physical problem, not an arbitrary special function.

**Student notes**

Think of Jᵥ(x) as the 'cylindrical cosine' — it plays the same role in circular/cylindrical geometry as cos(nπx/L) plays in rectangular geometry. For physical problems, you almost always use only Jᵥ (not Yᵥ) because Yᵥ is singular at the center, which is unphysical for a solid cylinder or drum.

**Prerequisite graph**

- Requires: math.de.frobenius-method
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.fnal.special-functions
- Narrative: Bessel functions arise from the Frobenius method (math.de.frobenius-method) applied to Bessel's equation. They satisfy an orthogonality relation on [0,a] with weight x, making them the cylindrical analog of the Fourier sine series (math.de.fourier-sine-cosine). The Sturm-Liouville theory (math.de.sturm-liouville) explains this orthogonality systematically.

**Teaching hints — review triggers**

- Student does not know that x = 0 is a regular singular point of Bessel's equation
- Student does not understand why Yᵥ is excluded when x = 0 is in the physical domain (it's singular there)
- Student confuses the order ν of the Bessel function with the number of zeros

**Spaced repetition / revision guidance**

If you need to evaluate Jₙ at a specific x (e.g., to apply a boundary condition), use a calculator or table rather than the series. For analysis and derivation, the series and the differential equation are the primary tools. Remember: Jᵥ(0) = 0 for ν > 0 and J₀(0) = 1.

---

### Legendre's Equation

*Concept ID: `math.de.legendre-equation` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.7 · Estimated study time: 5h*

**Learning objective.** Identify Legendre's equation (1−x²)y'' − 2xy' + n(n+1)y = 0, state that the polynomial solutions are the Legendre polynomials Pₙ(x), write P₀ through P₄ explicitly, and apply the orthogonality relation ∫_{−1}^{1} Pₘ(x)Pₙ(x)dx = 2/(2n+1)δₘₙ.

(1−x²)y″−2xy′+n(n+1)y=0; polynomial solutions are Legendre polynomials Pₙ(x). Arise in problems with spherical symmetry. Form an orthogonal basis on [−1,1].

Legendre's equation (1−x²)y'' − 2xy' + n(n+1)y = 0 arises when separating variables in the Laplace or Helmholtz equation in spherical coordinates. For non-negative integer n, the power series solution truncates to a polynomial — the Legendre polynomial Pₙ(x). These polynomials satisfy Pₙ(1) = 1, are alternately even/odd, and form a complete orthogonal family on [−1,1] with weight 1: ∫_{−1}^{1} Pₘ(x)Pₙ(x)dx = 2/(2n+1)δₘₙ. Any function in L²(−1,1) can be expanded as f(x) = ΣcₙPₙ(x) with cₙ = (2n+1)/2 · ∫_{−1}^{1} f(x)Pₙ(x)dx. The second solution Qₙ(x) is singular at x = ±1 and excluded from physically relevant expansions on [−1,1].

**Key ideas**

- Legendre equation: (1−x²)y'' − 2xy' + n(n+1)y = 0; singular points at x = ±1
- Polynomial solutions (n integer ≥ 0): P₀ = 1, P₁ = x, P₂ = (3x²−1)/2, P₃ = (5x³−3x)/2
- Orthogonality: ∫_{−1}^{1} Pₘ(x)Pₙ(x)dx = 2/(2n+1)·δₘₙ
- Rodrigues formula: Pₙ(x) = 1/(2ⁿn!) dⁿ/dxⁿ[(x²−1)ⁿ] — generates polynomials without series
- Legendre expansion: f(x) = ΣcₙPₙ(x) with cₙ = (2n+1)/2 ∫_{−1}^{1} fPₙ dx

**Vocabulary**

- **Legendre polynomial** — Pₙ(x); the degree-n polynomial solution to Legendre's equation (1−x²)y'' − 2xy' + n(n+1)y = 0, satisfying Pₙ(1) = 1 and orthogonality on [−1,1].
- **Rodrigues formula** — Pₙ(x) = 1/(2ⁿn!) dⁿ/dxⁿ[(x²−1)ⁿ]; generates Legendre polynomials by n successive differentiations.
- **Legendre expansion** — f(x) = ΣcₙPₙ(x) with cₙ = (2n+1)/2 ∫_{−1}^{1} f(x)Pₙ(x)dx; the orthogonal expansion of f in the Legendre polynomial basis.

**Common misconceptions**

- *Misconception:* Legendre polynomials are defined only for integer n
  *Correction:* Legendre's equation has solutions for all n ∈ ℝ, but the power series solution diverges at x = ±1 for non-integer n. Only for integer n ≥ 0 does the series truncate to a polynomial (Pₙ) that remains bounded on [−1,1]. Non-integer n gives Legendre functions (not polynomials) that are singular at the endpoints.
- *Misconception:* The Legendre expansion cₙ = ∫_{−1}^{1} f(x)Pₙ(x)dx (without the (2n+1)/2 factor)
  *Correction:* The correct formula is cₙ = (2n+1)/2 · ∫_{−1}^{1} f(x)Pₙ(x)dx. The factor (2n+1)/2 comes from dividing by the norm squared ||Pₙ||² = 2/(2n+1). Omitting this factor gives coefficients that are off by the normalization — a dimensionally wrong answer.
- *Misconception:* Legendre polynomials are orthogonal with weight function w(x) = x
  *Correction:* Legendre polynomials are orthogonal with weight w(x) = 1 on [−1,1] — no weight function. This distinguishes them from Bessel functions (which have weight r on [0,a]) or Chebyshev polynomials (which have weight (1−x²)^{−1/2}). The orthogonality relation is simply ∫_{−1}^{1} Pₘ Pₙ dx = 0 for m ≠ n.

**Common mistakes in practice**

- Using cₙ = ∫fPₙ dx without the (2n+1)/2 normalization
- Forgetting Pₙ(1) = 1 (and P₂(1) = 1, not 1/2)
- Claiming Legendre polynomials have weight x (that's Bessel) or weight (1−x²) (that's Chebyshev)

**Visual teaching opportunities**

- Plots of P₀, P₁, P₂, P₃, P₄ on [−1,1] showing the even/odd pattern and the n zeros of Pₙ
- Spherical harmonic visualization: Yₙᵐ(θ,φ) in 3D with the associated Legendre functions as the θ-factor — connecting Pₙ to physical spherical geometry
- Legendre expansion example: f(x) = |x| expanded as Σcₙ Pₙ(x), showing convergence as more terms are added

**Worked example**

*Setup:* Expand f(x) = x² on [−1,1] as a Legendre series.

1. Step 1: Write x² in terms of Legendre polynomials. We know P₀ = 1, P₂ = (3x²−1)/2. Express x² = (2P₂ + P₀)/3 = (2/3)P₂ + (1/3)P₀. Why: direct algebraic inversion of the Legendre polynomial definitions.
2. Step 2: State the Legendre expansion. x² = (1/3)P₀(x) + (2/3)P₂(x). Why: this is exact (finite sum) because x² is a degree-2 polynomial.
3. Step 3: Verify using the coefficient formula. c₀ = (1/2)∫_{−1}^{1} x²·1 dx = (1/2)·[x³/3]_{−1}^{1} = (1/2)·(2/3) = 1/3. ✓ c₂ = (5/2)∫_{−1}^{1} x²·(3x²−1)/2 dx = (5/4)∫_{−1}^{1} (3x⁴−x²)dx = (5/4)·[3x⁵/5−x³/3]_{−1}^{1} = (5/4)·(6/5−2/3) = (5/4)·(8/15) = 2/3. ✓ Why: confirms the algebraic inversion.
4. Step 4: c₁ = 0 by symmetry (x² is even, P₁ is odd). c₃, c₄, … = 0 because x² is degree 2. Why: parity and degree bounds eliminate all other terms.

*Outcome:* x² = (1/3)P₀(x) + (2/3)P₂(x). The expansion is exact with only two terms because x² is a degree-2 polynomial that lies in the span of P₀ and P₂. This confirms the Legendre series is an exact representation, not an approximation, for polynomials.

**Real-world intuition**

- Gravitational potential of Earth expanded in Legendre polynomials of cos(θ) (zonal harmonics)
- Quantum mechanics: hydrogen atom angular wavefunctions are spherical harmonics Yₙᵐ(θ,φ) built from associated Legendre functions
- Electrostatics: multipole expansion of electric potential — monopole (P₀), dipole (P₁), quadrupole (P₂) terms

**Practice progression**

Item types: write P₀ through P₄ from memory or Rodrigues formula, compute Legendre expansion coefficients by the integral formula, expand a polynomial in Legendre polynomials algebraically, use orthogonality to evaluate a specific inner product, state which Qₙ to include/exclude for a given domain. Suggested item count: 5.

Polynomial expansions (exact) → piecewise function expansions (approximate) → orthogonality inner products → Rodrigues formula computation

**Assessment objectives**

Formats: expand a given function in the first three Legendre polynomials, compute c₀, c₁, c₂ using the integral formula, state the orthogonality relation and use it to simplify an integral. Bloom alignment: apply.

Mastery signal: Correctly applies orthogonality, uses the correct normalization factor (2n+1)/2, and computes expansion coefficients in ≥ 4 of 5 problems

**Teacher notes**

Rodrigues' formula is the quickest way to generate Legendre polynomials without memorization: differentiate (x²−1)ⁿ exactly n times, then divide by 2ⁿn!. Have students use it to derive P₃ and P₄ from scratch in class.

**Student notes**

The three things to know about Legendre polynomials: (1) they are the polynomial solutions to the Legendre ODE for integer n; (2) they are orthogonal on [−1,1] with weight 1; (3) the expansion formula has a (2n+1)/2 normalization factor. Everything else follows from these.

**Prerequisite graph**

- Requires: math.de.series-solution
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.fnal.special-functions
- Narrative: Legendre polynomials are a special case of Sturm-Liouville theory (math.de.sturm-liouville): the Legendre equation is a Sturm-Liouville problem on [−1,1] with p = 1−x², q = 0, w = 1, eigenvalues λ = n(n+1). The orthogonality follows from the general Sturm-Liouville theorem. Spherical harmonics Yₙᵐ are built from associated Legendre functions Pₙᵐ, extending the real-valued Pₙ to complex-valued angular wavefunctions.

**Teaching hints — review triggers**

- Student does not know P₂ or P₃ (cannot verify orthogonality computations)
- Student omits the (2n+1)/2 normalization factor in cₙ
- Student confuses weight-1 orthogonality (Legendre) with weight-x orthogonality (Bessel)

**Spaced repetition / revision guidance**

If you need to compute Pₙ for large n without memorizing it, use the recurrence (Bonnet's formula): (n+1)P_{n+1}(x) = (2n+1)xPₙ(x) − nP_{n−1}(x). Starting from P₀ = 1 and P₁ = x, this generates all higher Legendre polynomials one step at a time.

---

### Sturm-Liouville Theory

*Concept ID: `math.de.sturm-liouville` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.7 · Estimated study time: 8h*

**Learning objective.** State the Sturm-Liouville problem (p(x)y')' + (q(x) + λw(x))y = 0 with boundary conditions, explain the three main theorems (countable real eigenvalues, orthogonal eigenfunctions, completeness), and connect the theory to Fourier series and Bessel/Legendre expansions as special cases.

The boundary value problem (p(x)y′)′+q(x)y+λw(x)y=0 with boundary conditions. Has countably many eigenvalues λₙ and orthogonal eigenfunctions φₙ forming a complete set in L²([a,b],w).

A Sturm-Liouville (SL) problem is the boundary value problem (p(x)y')' + (q(x) + λw(x))y = 0 on [a,b] with separated boundary conditions α₁y(a) + α₂y'(a) = 0 and β₁y(b) + β₂y'(b) = 0, where p > 0, w > 0, and p, q, w are continuous. The three fundamental theorems: (1) the eigenvalues λₙ are real, countably infinite, and increasing λ₁ < λ₂ < ⋯ → ∞; (2) the eigenfunctions φₙ corresponding to distinct eigenvalues are orthogonal in the weighted inner product ⟨f,g⟩ = ∫ₐᵇ f(x)g(x)w(x)dx; (3) the {φₙ} form a complete orthonormal basis for L²([a,b],w) — any square-integrable function can be expanded as f = Σcₙφₙ. Regular Fourier series (p = w = 1, q = 0), Bessel expansions (p = x, w = x, q = −ν²/x), and Legendre expansions (p = 1−x², w = 1, q = 0) are all special cases.

**Key ideas**

- SL form: (py')' + (q+λw)y = 0; convert an ODE to SL form by computing the integrating factor
- Eigenvalues: real, increasing sequence λ₁ < λ₂ < … with λₙ → ∞
- Eigenfunctions: φₙ and φₘ (m ≠ n) are orthogonal in ⟨f,g⟩_w = ∫fgw dx
- Completeness: f = Σcₙφₙ with cₙ = ⟨f,φₙ⟩_w/⟨φₙ,φₙ⟩_w
- Fourier series, Bessel expansion, Legendre expansion are all SL special cases

**Vocabulary**

- **Sturm-Liouville problem** — The BVP (py')' + (q + λw)y = 0 on [a,b] with separated boundary conditions; p, w > 0; has countably many real eigenvalues with orthogonal eigenfunctions.
- **regular SL problem** — An SL problem where p, q, w are continuous and p, w > 0 on the closed interval [a,b]; guarantees countable eigenvalues and complete orthogonal eigenfunctions.
- **weighted inner product** — ⟨f,g⟩_w = ∫ₐᵇ f(x)g(x)w(x)dx; SL eigenfunctions are orthogonal in this inner product, with weight determined by the SL problem.

**Common misconceptions**

- *Misconception:* Sturm-Liouville theory is a new subject separate from Fourier series
  *Correction:* Fourier series is a special case of Sturm-Liouville theory: y'' + λy = 0 on [0,L] with periodic (or Dirichlet/Neumann) boundary conditions is an SL problem with p = 1, q = 0, w = 1. The eigenfunctions are sin(nπx/L) and cos(nπx/L), and the orthogonality is the standard Fourier orthogonality. SL unifies Fourier series, Bessel expansions, and Legendre expansions in one framework.
- *Misconception:* All eigenvalues of an SL problem are positive
  *Correction:* Eigenvalues can be negative, zero, or positive depending on the specific problem (q, boundary conditions). For the classical Fourier problem y'' + λy = 0 on [0,L] with Dirichlet BCs, all λₙ = (nπ/L)² > 0. But with other boundary conditions or q < 0, negative eigenvalues can occur. What is guaranteed is that eigenvalues are real and form an increasing sequence.
- *Misconception:* Orthogonality means ∫φₘ(x)φₙ(x)dx = 0 (unweighted)
  *Correction:* SL eigenfunctions are orthogonal with respect to the weight function w(x): ∫ₐᵇ φₘ(x)φₙ(x)w(x)dx = 0 for m ≠ n. The weight w(x) is part of the problem definition and cannot be ignored. For Fourier series w = 1, making it look unweighted, but for Bessel (w = x) or other problems, the weight changes the inner product.

**Common mistakes in practice**

- Using unweighted orthogonality ∫φₘφₙ dx = 0 when the weight w ≠ 1
- Claiming SL eigenvalues are always positive (they are real and form an increasing sequence, but can start negative)
- Not converting to SL form before applying the orthogonality theorem

**Visual teaching opportunities**

- SL unification diagram: a tree showing regular Fourier series, Bessel expansion, and Legendre expansion all as branches of the Sturm-Liouville root
- Eigenfunction orthogonality visualization: for the Fourier case, graphs of sin(nπx/L) and sin(mπx/L) for different n, m, with their product integrating to zero
- Eigenvalue spectrum: the sequence λ₁ < λ₂ < … → ∞ shown on a number line for the classical problem

**Worked example**

*Setup:* Put the ODE y'' + (1/x)y' + λy = 0 (with x > 0) into Sturm-Liouville form.

1. Step 1: Multiply through by the integrating factor p(x) to achieve the form (py')'. Multiply by x: xy'' + y' + λxy = 0, i.e., (xy')' + λxy = 0. Why: the integrating factor for y'' + (1/x)y' is x (since p = exp(∫(1/x)dx) = x).
2. Step 2: Identify the SL components. p(x) = x, q(x) = 0, w(x) = x. The equation is (xy')' + λxy = 0. Why: directly read from the SL form (py')' + (q + λw)y = 0.
3. Step 3: Recognize this as Bessel's equation of order 0. The SL problem (xy')' + λxy = 0 on [0,1] with y(1) = 0 has eigenfunctions φₙ(x) = J₀(αₙx) where αₙ are the zeros of J₀. Why: this is the SL basis for Bessel-Fourier expansions.
4. Step 4: State orthogonality. ∫₀^{1} J₀(αₙx)J₀(αₘx)·x dx = 0 for m ≠ n. Why: the weight w = x appears in the weighted inner product.

*Outcome:* The ODE (xy')' + λxy = 0 is in SL form with p = w = x, q = 0. Eigenfunctions are J₀(αₙx) with eigenvalues λₙ = αₙ², orthogonal with weight x on [0,1]. This is the Bessel-Fourier expansion from Sturm-Liouville theory.

**Real-world intuition**

- Quantum mechanics: the time-independent Schrödinger equation −ℏ²/(2m)·ψ'' + V(x)ψ = Eψ is an SL problem; eigenvalues are energy levels and eigenfunctions are wavefunctions
- Heat equation separation: the spatial part of the heat equation u_t = ku_xx is an SL eigenvalue problem; its eigenfunctions form the Fourier basis for the solution
- Vibrating string with variable density: the wave equation density w(x) leads to an SL problem; its eigenfunctions are the mode shapes

**Practice progression**

Item types: put an ODE in SL form by finding p, q, w, identify whether an SL problem is regular, state the three main SL theorems, compute the orthogonality inner product for specific eigenfunctions, connect a specific problem (Fourier/Bessel/Legendre) to the SL framework. Suggested item count: 5.

Identify p, q, w for simple cases → classify as SL → state eigenvalue/eigenfunction properties → apply orthogonality → full expansion

**Assessment objectives**

Formats: convert ODE to SL form (identify p, q, w), state the three SL theorems precisely, explain why Fourier series is an SL special case. Bloom alignment: analyze.

Mastery signal: Correctly identifies SL form, states theorems accurately, and connects SL to Fourier/Bessel/Legendre in ≥ 4 of 5 tasks

**Teacher notes**

The unification message is key: after studying Fourier series, Bessel expansions, and Legendre expansions as separate topics, present the Sturm-Liouville framework and show all three are instances of the same theorem. This retroactively makes earlier material more coherent and demonstrates the elegance of the SL unification.

**Student notes**

Every eigenfunction expansion you've seen — Fourier sine/cosine, Bessel, Legendre — is an SL expansion. The SL theorem guarantees: eigenvalues exist (real, increasing, infinite), eigenfunctions are orthogonal (with the weight w), and the eigenfunctions form a complete basis. Learn this once; apply it to every special function system.

**Prerequisite graph**

- Requires: math.de.second-order-linear, math.de.bvp, math.linalg.inner-product
- Unlocks (future prerequisite links): math.de.eigenfunction-expansion
- Cross-topic connections (graph cross-links): math.fnal.spectral-theory
- Narrative: Sturm-Liouville theory is the finite-dimensional spectral theorem (math.linalg) extended to infinite-dimensional function spaces: eigenvalues are real (symmetric operator), eigenfunctions are orthogonal (self-adjoint operator), and they form a basis (completeness of eigenvectors). The SL operator L[y] = −(py')'/w + q/w is self-adjoint in the ⟨·,·⟩_w inner product — the functional analysis analog of a symmetric matrix.

**Teaching hints — review triggers**

- Student cannot convert an ODE from standard form to SL form (find the integrating factor)
- Student does not understand the inner product with weight w (writes ∫φₘφₙ dx instead of ∫φₘφₙw dx)
- Student cannot state the three SL theorems (confuses properties of eigenvalues with properties of eigenfunctions)

**Spaced repetition / revision guidance**

To convert an ODE to SL form, find the integrating factor μ(x) = exp(∫P(x)dx) where P is the coefficient of y' in standard form. Multiply through by μ — the result is (μy')' + λμy = 0 (if q = 0) or the full SL form. Then read off p = μ, w = μ (for that specific case), and q = μ·(original Q(x)).

---

### Eigenfunction Expansion

*Concept ID: `math.de.eigenfunction-expansion` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.7 · Estimated study time: 6h*

**Learning objective.** Expand a function f(x) in terms of the eigenfunctions {φₙ} of a Sturm-Liouville problem as f(x) = Σcₙφₙ(x) with cₙ = ⟨f,φₙ⟩_w/||φₙ||²_w, and apply this to solve PDEs by expanding the solution in the relevant eigenfunction basis.

Expanding a function f in terms of eigenfunctions φₙ of a Sturm-Liouville problem: f(x)=∑cₙφₙ(x) with cₙ=⟨f,φₙ⟩/⟨φₙ,φₙ⟩. Generalizes Fourier series to arbitrary weighted inner products.

Eigenfunction expansion is the general version of Fourier series for arbitrary Sturm-Liouville problems. Given the eigenfunctions {φₙ} with weight w from an SL problem on [a,b], any f ∈ L²([a,b],w) can be expanded as f = Σcₙφₙ, where cₙ = ⟨f,φₙ⟩_w/||φₙ||²_w = ∫ₐᵇ f·φₙ·w dx / ∫ₐᵇ φₙ²·w dx. The expansion converges in the L²-norm (and pointwise for piecewise-smooth f). When solving PDEs by separation of variables, the spatial part satisfies an SL problem, and the solution is expressed as a superposition of eigenfunctions weighted by time-dependent coefficients that satisfy a simple ODE. The completeness of the eigenfunction basis is what makes this expansion valid.

**Key ideas**

- Expansion: f(x) = Σcₙφₙ(x); coefficients from the weighted inner product cₙ = ⟨f,φₙ⟩_w/||φₙ||²_w
- Completeness (Parseval): Σcₙ² ||φₙ||²_w = ||f||²_w (energy is preserved in the expansion)
- Fourier series is eigenfunction expansion with φₙ = sin(nπx/L) or cos, w = 1
- Bessel-Fourier: φₙ = J₀(αₙx), w = x on [0,1] — expansion for cylindrical geometry
- PDE solution: separate variables → SL eigenvalue problem → eigenfunction expansion → time coefficients

**Vocabulary**

- **eigenfunction expansion** — f(x) = Σcₙφₙ(x) where {φₙ} are eigenfunctions of a Sturm-Liouville problem and cₙ = ⟨f,φₙ⟩_w/||φₙ||²_w; the generalization of Fourier series to arbitrary SL systems.
- **Parseval's identity** — ||f||²_w = Σcₙ²||φₙ||²_w; the energy (L²-norm) of f equals the sum of squared coefficient contributions — confirms the completeness of the eigenfunction basis.
- **completeness** — The property that the eigenfunction set {φₙ} spans the full L²([a,b],w) space; every function in this space can be approximated arbitrarily closely by finite sums Σcₙφₙ.

**Common misconceptions**

- *Misconception:* Eigenfunction expansion is just Fourier series by another name
  *Correction:* Fourier series is one specific eigenfunction expansion (for the SL problem y'' + λy = 0 with w = 1). Eigenfunction expansion is more general: it applies to Bessel expansions (weight w = x), Legendre expansions (weight w = 1 on [−1,1] but with different eigenfunctions), and any other SL problem. The formula structure is the same, but the eigenfunctions, weight, and normalization change.
- *Misconception:* The expansion coefficients cₙ are always cₙ = ∫f·φₙ dx (without the weight or normalization)
  *Correction:* The correct formula is cₙ = ∫fφₙw dx / ∫φₙ²w dx. Both the weight w in the numerator and the normalization ||φₙ||²_w in the denominator must be included. For standard Fourier series (w = 1, ||φₙ||² = L/2), this reduces to cₙ = (2/L)∫f sin dx, but the general formula always involves both.
- *Misconception:* The eigenfunction expansion is only valid for smooth functions
  *Correction:* The SL completeness theorem guarantees expansion in L²([a,b],w) — the space of square-integrable functions, not just smooth functions. For piecewise-smooth f, the expansion converges pointwise at continuity points and to the average (f(x⁺)+f(x⁻))/2 at jump discontinuities — the same Dirichlet/Gibbs behavior as Fourier series.

**Common mistakes in practice**

- Dropping the weight w in the inner product ⟨f,φₙ⟩_w
- Using ||φₙ||² = 1 (assuming normalization) when the eigenfunctions are not normalized
- Confusing the PDE time coefficients Tₙ(t) (from separation) with the spatial expansion coefficients cₙ

**Visual teaching opportunities**

- Gram-Schmidt analogy: eigenfunction expansion is the infinite-dimensional analog of projecting a vector onto an orthonormal basis — cₙ = ⟨f,eₙ⟩ in linear algebra corresponds to cₙ = ⟨f,φₙ⟩_w/||φₙ||²
- PDE solution procedure: heat equation u_t = u_xx on [0,L] → separate variables → SL problem → Fourier eigenfunctions → superposition uₙ → final solution as series
- Convergence diagram: partial sum Σₙ₌₁^N cₙφₙ(x) approaching f(x) as N increases, with Gibbs phenomenon at a jump

**Worked example**

*Setup:* Expand f(x) = 1 in a Bessel-Fourier series in terms of J₀(αₙx) on [0,1], where αₙ are the positive zeros of J₀.

1. Step 1: Identify the eigenfunction system. The SL problem (xy')' + λxy = 0 on [0,1] with y(1) = 0 has eigenfunctions φₙ(x) = J₀(αₙx) and weight w(x) = x. Why: Bessel equation of order 0 in SL form.
2. Step 2: Compute the normalization. ||φₙ||² = ∫₀^1 J₀(αₙx)²·x dx = (1/2)J₁(αₙ)². Why: standard Bessel orthogonality identity.
3. Step 3: Compute cₙ = ⟨f,φₙ⟩_w/||φₙ||². ⟨1,φₙ⟩_w = ∫₀^1 J₀(αₙx)·x dx. Using the identity ∫₀^1 xJ₀(αx)dx = J₁(α)/α: ⟨1,φₙ⟩_w = J₁(αₙ)/αₙ. Why: standard Bessel integral.
4. Step 4: Compute cₙ. cₙ = [J₁(αₙ)/αₙ] / [(1/2)J₁(αₙ)²] = 2/(αₙJ₁(αₙ)). Why: divide numerator and denominator.
5. Step 5: Write the expansion. 1 = Σₙ₌₁^∞ [2/(αₙJ₁(αₙ))] J₀(αₙx), for x ∈ [0,1). Why: eigenfunction expansion with the computed coefficients.

*Outcome:* 1 = Σₙ₌₁^∞ [2/(αₙJ₁(αₙ))] J₀(αₙx). The coefficients involve the Bessel zeros and J₁ values — analogous to the Fourier sine series of 1 = Σ[4/(nπ)] sin(nπx/L) but for the cylindrical geometry.

**Real-world intuition**

- Heat equation in a cylinder: solution expressed as Bessel-Fourier series; coefficients from initial temperature profile
- Vibrating membrane: mode superposition using Bessel eigenfunction expansion gives the full transient solution
- Quantum mechanics: energy eigenstates as eigenfunction basis; wavefunction expansion in energy eigenstates is the standard quantum mechanical calculation

**Practice progression**

Item types: compute cₙ for a Fourier eigenfunction expansion, compute cₙ for a Legendre eigenfunction expansion, set up (but not fully evaluate) a Bessel-Fourier expansion, apply PDE separation → SL → eigenfunction expansion to solve a heat equation, use Parseval's identity to compute ∫f²dx from known cₙ. Suggested item count: 5.

Fourier (w = 1) → Legendre → Bessel → PDE with non-trivial BCs

**Assessment objectives**

Formats: compute first three eigenfunction coefficients for a given f and SL problem, apply eigenfunction expansion to solve a PDE with given BCs, explain why the expansion is valid for piecewise-smooth f. Bloom alignment: apply.

Mastery signal: Correctly sets up the expansion with weight, computes coefficients, and applies expansion to a PDE in ≥ 4 of 5 problems

**Teacher notes**

After presenting the eigenfunction expansion formula, always ask: 'What is the SL problem? What are the eigenfunctions and the weight?' These three inputs fully determine the expansion — once students can answer all three, they can compute any expansion mechanically.

**Student notes**

Eigenfunction expansion = projection onto a complete orthogonal basis. The formula cₙ = ⟨f,φₙ⟩_w/||φₙ||²_w is the inner-product projection formula, exactly as in linear algebra (⟨v,eₙ⟩/||eₙ||²). The difference is an infinite-dimensional function space instead of a finite-dimensional vector space.

**Prerequisite graph**

- Requires: math.de.sturm-liouville
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.fnal.hilbert-space
- Narrative: Eigenfunction expansion is the infinite-dimensional version of representing a vector as a linear combination of basis vectors (math.linalg.vector-space). The weight w defines the inner product; orthogonality is the analog of basis orthogonality; and completeness is the analog of the basis spanning the full space. Fourier series (math.de.fourier-series) is the most familiar special case.

**Teaching hints — review triggers**

- Student does not include the weight w in the inner product for cₙ
- Student cannot compute the normalization ||φₙ||² for Bessel or Legendre systems
- Student does not know how eigenfunction expansion connects to PDE solving (separation of variables → SL problem → expansion)

**Spaced repetition / revision guidance**

If the expansion does not converge as expected (e.g., the series of cₙ coefficients does not go to zero), check whether f is in L²([a,b],w). If ∫|f|²w dx is infinite, the eigenfunction expansion in the usual sense does not apply. Also check whether you identified the correct weight w for the SL problem.

---

### Boundary Value Problem

*Concept ID: `math.de.bvp` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 5h*

**Learning objective.** Distinguish boundary value problems (BVPs) from initial value problems (IVPs), explain why BVPs may have no solution, a unique solution, or infinitely many solutions (unlike IVPs), solve a two-point BVP for a second-order ODE, and connect BVPs to the eigenvalue problems of Sturm-Liouville theory.

An ODE with conditions specified at two or more distinct points. Unlike IVPs, existence and uniqueness are not guaranteed; a BVP may have no solution, a unique solution, or infinitely many solutions.

A boundary value problem (BVP) specifies conditions on y at two or more distinct points, unlike an IVP where all conditions are at a single point. For a second-order linear BVP y'' + Py' + Qy = G on [a,b] with conditions at both x = a and x = b, the existence-uniqueness theorem for IVPs no longer applies: the BVP may have no solution (when the forcing and BCs are inconsistent), a unique solution, or infinitely many solutions (when a nontrivial homogeneous solution satisfies the homogeneous BCs). The key tool is the general homogeneous solution y_h = c₁y₁ + c₂y₂ + y_p: applying the two boundary conditions gives a 2×2 linear system for c₁ and c₂. If the system matrix is invertible, there is a unique solution; if singular, there may be no solution or infinitely many.

**Key ideas**

- BVP: conditions specified at two separate points (e.g., y(a) = A, y(b) = B) — not both at the same point
- Unlike IVPs, BVPs do not always have a unique solution — may have 0, 1, or ∞ solutions
- Solution method: find y_h = c₁y₁ + c₂y₂ + y_p, then solve the 2-equation 2-unknown system from BCs
- The homogeneous BVP (G = 0, homogeneous BCs) may have nontrivial solutions → eigenvalue problem
- Connection to SL theory: eigenvalue BVPs arise naturally in PDE separation of variables

**Vocabulary**

- **boundary value problem (BVP)** — An ODE with conditions specified at two or more distinct points; unlike IVPs, may have 0, 1, or infinitely many solutions.
- **eigenvalue BVP** — The homogeneous BVP L[y] + λw(x)y = 0 with homogeneous BCs; values of λ for which nontrivial solutions exist are eigenvalues, and the solutions are eigenfunctions.
- **shooting method** — A numerical technique for solving BVPs by posing them as IVPs: guess the missing initial condition at x = a, integrate to x = b, and adjust the guess until the BC at b is satisfied.

**Common misconceptions**

- *Misconception:* A second-order BVP always has a unique solution like a second-order IVP
  *Correction:* The IVP existence-uniqueness theorem does not apply to BVPs. A BVP can fail to have a solution if the boundary conditions are incompatible with the ODE structure, or can have infinitely many solutions if the homogeneous BVP has a nontrivial solution. Example: y'' + y = 0, y(0) = 0, y(π) = 1 has no solution; y'' + y = 0, y(0) = 0, y(π) = 0 has infinitely many solutions (sin(x) and all multiples).
- *Misconception:* All BVPs have separated boundary conditions
  *Correction:* Separated BCs (one at each endpoint) are the most common form: α₁y(a) + α₂y'(a) = A, β₁y(b) + β₂y'(b) = B. But periodic BCs (y(a) = y(b), y'(a) = y'(b)) and mixed BCs (involving y at both endpoints in one condition) also arise, particularly in Sturm-Liouville problems and PDEs.
- *Misconception:* IVP and BVP methods are the same after converting BCs to ICs
  *Correction:* There is no simple conversion from a BVP to an IVP without shooting methods (a numerical technique). In the BVP, the condition at x = b constrains the problem retroactively — you must solve the full system for c₁ and c₂ simultaneously, not propagate forward from x = a with fixed initial data.

**Common mistakes in practice**

- Assuming the BVP always has a unique solution (failing to check the 2×2 determinant)
- Confusing BVP with IVP: applying the BC at x = b as if it were an IC at x = a
- Omitting the particular solution y_p when the ODE is nonhomogeneous

**Visual teaching opportunities**

- Comparison table: IVP (two conditions at x₀, always unique solution when ODE is linear) vs. BVP (one condition at each endpoint, may have 0/1/∞ solutions)
- Solvability diagram for BVP: 2×2 system for c₁, c₂ — determinant nonzero (unique) vs. zero (infinitely many or none)
- Eigenvalue BVP picture: y'' + λy = 0, y(0) = y(L) = 0 — for most λ only the trivial solution exists; at the eigenvalues λₙ = (nπ/L)², the nontrivial solutions sin(nπx/L) arise

**Worked example**

*Setup:* Solve y'' + y = 0 with BCs y(0) = 0, y(π/2) = 1.

1. Step 1: Find the general homogeneous solution. Characteristic equation r² + 1 = 0 → r = ±i → y = c₁cos(x) + c₂sin(x). Why: constant-coefficient ODE with complex roots.
2. Step 2: Apply BC y(0) = 0. c₁·1 + c₂·0 = 0 → c₁ = 0. Why: direct substitution at x = 0.
3. Step 3: Apply BC y(π/2) = 1. c₁cos(π/2) + c₂sin(π/2) = 0·0 + c₂·1 = c₂ = 1. Why: substitution at x = π/2 with c₁ = 0.
4. Step 4: Unique solution. y = sin(x). Why: both BCs determine c₁ and c₂ uniquely — the system is nonsingular.
5. Step 5: Contrast with the problematic BVP. For y(0) = 0, y(π) = 1: c₁ = 0 and c₂sin(π) = 0·1 = 0 ≠ 1. No solution. For y(0) = 0, y(π) = 0: c₁ = 0 and c₂sin(π) = 0 — satisfied for any c₂. Infinitely many solutions y = c₂sin(x). Why: the three cases (0/1/∞ solutions) depend on the boundary values chosen.

*Outcome:* y = sin(x) for y(0) = 0, y(π/2) = 1 (unique solution). This contrasts with y(0) = 0, y(π) = 1 (no solution) and y(0) = 0, y(π) = 0 (infinitely many: y = c·sin(x)). The three cases arise from the determinant of the 2×2 BC system.

**Real-world intuition**

- Beam deflection: y'' = M(x)/(EI) with y = 0 at both ends (simply supported) is a BVP for beam shape
- Heat steady-state: T'' = 0 with T(0) = T₀, T(L) = T₁ is the simplest BVP — the solution is linear interpolation
- Quantum mechanics: the Schrödinger equation −ℏ²/(2m)ψ'' + V(x)ψ = Eψ on a bounded domain with ψ = 0 at walls is a BVP; the eigenvalues are energy levels

**Practice progression**

Item types: solve a BVP with unique solution, identify a BVP with no solution, identify a BVP with infinitely many solutions, find the eigenvalues of a homogeneous BVP (eigenvalue problem), connect BVP to the SL problem structure. Suggested item count: 6.

Unique solution (non-degenerate) → no solution → infinitely many solutions → eigenvalue BVP → SL connection

**Assessment objectives**

Formats: solve a given BVP (show work), predict the number of solutions from the structure (without solving), write the eigenvalue BVP for a given Fourier sine series. Bloom alignment: apply.

Mastery signal: Correctly solves BVPs (when solution exists), identifies degenerate cases, and sets up eigenvalue BVPs in ≥ 4 of 5 problems

**Teacher notes**

The central lesson of BVPs is that the problem structure determines existence and uniqueness, not just the ODE. The 2×2 system for c₁, c₂ from the BCs is the diagnostic: if its determinant (the boundary Wronskian) is nonzero, unique solution; if zero, check consistency to determine 0 or ∞ solutions.

**Student notes**

The three cases for a linear second-order BVP exactly parallel the three cases for a 2×2 linear system Ax = b in linear algebra: det(A) ≠ 0 → unique solution; det(A) = 0 and b is in the column space → infinitely many; det(A) = 0 and b is not in the column space → no solution. The connection is not a coincidence — applying BCs to y_h produces exactly this system.

**Prerequisite graph**

- Requires: math.de.second-order-ode
- Unlocks (future prerequisite links): math.de.sturm-liouville
- Cross-topic connections (graph cross-links): none
- Narrative: BVPs are the gateway to Sturm-Liouville theory (math.de.sturm-liouville) — every SL problem is an eigenvalue BVP. They also connect to Green's function methods: the solution of a BVP with general forcing can be written as y(x) = ∫G(x,ξ)f(ξ)dξ, where G is the Green's function — the BVP analog of the particular solution via convolution.

**Teaching hints — review triggers**

- Student applies IVP uniqueness directly to a BVP and expects a unique answer
- Student cannot set up the 2×2 linear system for c₁ and c₂ from the two boundary conditions
- Student does not understand what 'eigenvalue BVP' means or how it differs from a forcing BVP

**Spaced repetition / revision guidance**

If you get 'no solution' or 'infinitely many solutions,' recheck whether you applied the BCs to the correct general solution (including y_p if the ODE is nonhomogeneous). Then check the 2×2 system determinant. If both rows are proportional and the right-hand sides are also proportional, there are infinitely many solutions; if proportional rows but inconsistent RHS, there are none.

---

### Fourier Series

*Concept ID: `math.de.fourier-series` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.85 · Estimated study time: 8h*

**Learning objective.** Expand a piecewise-smooth 2L-periodic function as a Fourier series f(x) = a₀/2 + Σ[aₙcos(nπx/L) + bₙsin(nπx/L)], compute Fourier coefficients using the orthogonality integrals, and apply Parseval's theorem.

Represents a periodic function as f(x)=a₀/2+∑(aₙcos(nπx/L)+bₙsin(nπx/L)), with coefficients computed by orthogonality integrals. Cornerstone of classical and modern analysis.

A Fourier series represents a periodic function (period 2L) as a superposition of sinusoids: f(x) = a₀/2 + Σₙ₌₁^∞[aₙcos(nπx/L) + bₙsin(nπx/L)]. The coefficients are determined by orthogonality of the trigonometric functions on [−L,L]: aₙ = (1/L)∫_{−L}^{L} f(x)cos(nπx/L)dx and bₙ = (1/L)∫_{−L}^{L} f(x)sin(nπx/L)dx. The key insight is that {1, cos(nπx/L), sin(nπx/L)} form an orthogonal (not orthonormal) basis for L²([−L,L]): any two distinct basis elements integrate to zero over [−L,L], and the coefficients are projections of f onto each basis element. Parseval's identity ||f||² = L(a₀²/2 + Σ(aₙ² + bₙ²)) links the sum of squared coefficients to the L² norm of f. Fourier series are the SL eigenfunction expansion for the BVP y'' + λy = 0 with periodic BCs.

**Key ideas**

- Formula: f(x) = a₀/2 + Σₙ₌₁^∞[aₙcos(nπx/L) + bₙsin(nπx/L)] for period 2L
- Coefficients: aₙ = (1/L)∫_{−L}^{L} f cos(nπx/L)dx; bₙ = (1/L)∫_{−L}^{L} f sin(nπx/L)dx
- Orthogonality: ∫_{−L}^{L} cos(mπx/L)cos(nπx/L)dx = Lδₘₙ (m,n ≥ 1); similarly for sine
- Even function → only cosine terms (bₙ = 0); odd function → only sine terms (aₙ = 0)
- Parseval's: (1/L)∫f²dx = a₀²/2 + Σ(aₙ² + bₙ²)

**Vocabulary**

- **Fourier series** — f(x) = a₀/2 + Σ[aₙcos(nπx/L) + bₙsin(nπx/L)]; the representation of a 2L-periodic function as a trigonometric series.
- **Fourier coefficients** — aₙ = (1/L)∫_{−L}^{L} f cos(nπx/L)dx and bₙ = (1/L)∫_{−L}^{L} f sin(nπx/L)dx; determined by orthogonality of the trigonometric basis.
- **Parseval's theorem** — (1/L)∫_{−L}^{L} f²dx = a₀²/2 + Σ(aₙ² + bₙ²); the L²-norm of f equals the sum of squares of its Fourier coefficients.

**Common misconceptions**

- *Misconception:* The Fourier coefficient formula is aₙ = ∫_{−L}^{L} f cos(nπx/L)dx (missing the 1/L)
  *Correction:* The correct formula is aₙ = (1/L)∫_{−L}^{L} f cos(nπx/L)dx. The factor 1/L appears because ||cos(nπx/L)||² = L (not 1) on [−L,L]. Omitting 1/L gives coefficients that are L times too large.
- *Misconception:* The Fourier series converges pointwise to f(x) at every point
  *Correction:* The Fourier series converges to f(x) at continuity points, but at a jump discontinuity it converges to (f(x⁺)+f(x⁻))/2 — the average of the left and right limits. Near jump discontinuities, overshoot of about 9% (Gibbs phenomenon) appears in partial sums, even as the number of terms → ∞.
- *Misconception:* A₀ in the formula is the average value of f
  *Correction:* The average value of f over [−L,L] is (1/(2L))∫f dx = a₀/2. The coefficient a₀ = (1/L)∫f dx is twice the average. This is why the formula uses a₀/2 (not a₀) for the constant term — the factor 1/2 makes the formula uniform: with a₀/2, the constant term fits the same cosine-orthogonality structure as the n ≥ 1 terms.

**Common mistakes in practice**

- Omitting the (1/L) factor in the coefficient formula
- Not checking parity first (computing both aₙ and bₙ when the function is odd or even)
- Forgetting that the Fourier series converges to the average (f(x⁺)+f(x⁻))/2 at jump discontinuities, not to f(x)

**Visual teaching opportunities**

- Partial sum animation: Fourier series for a square wave with N = 1, 3, 5, 10, 50 terms, showing convergence to the square wave with Gibbs overshoot near the jump
- Orthogonality visualization: plot sin(x)·sin(2x) on [0,2π] — the area under the product is zero, demonstrating the orthogonality that makes the coefficient formula work
- Even/odd decomposition: any function f = f_even + f_odd; f_even = (f(x)+f(−x))/2 has only cosine terms; f_odd = (f(x)−f(−x))/2 has only sine terms

**Worked example**

*Setup:* Find the Fourier series for f(x) = x on [−π, π] (period 2π, so L = π).

1. Step 1: Check parity. f(x) = x is odd (f(−x) = −x = −f(x)). Therefore aₙ = 0 for all n ≥ 0 (cosine coefficients vanish for odd functions). Why: odd × even (cosine) integrates to zero over [−π,π].
2. Step 2: Compute bₙ. bₙ = (1/π)∫_{−π}^{π} x sin(nx)dx. Since x sin(nx) is even (odd × odd = even), = (2/π)∫₀^π x sin(nx)dx. Why: exploit symmetry to halve the integration interval.
3. Step 3: Integrate by parts. ∫₀^π x sin(nx)dx = [−x cos(nx)/n]₀^π + (1/n)∫₀^π cos(nx)dx = −π cos(nπ)/n + [sin(nx)/n²]₀^π = −π(−1)ⁿ/n + 0 = π(−1)^{n+1}/n. Why: integration by parts with u = x, dv = sin(nx)dx.
4. Step 4: Compute bₙ. bₙ = (2/π)·π(−1)^{n+1}/n = 2(−1)^{n+1}/n. Why: substitute the integral result.
5. Step 5: Write the Fourier series. x = Σₙ₌₁^∞ 2(−1)^{n+1}/n · sin(nx) = 2sin(x) − sin(2x) + (2/3)sin(3x) − (1/2)sin(4x) + …. Why: sum over all n with the computed bₙ.

*Outcome:* f(x) = Σₙ₌₁^∞ [2(−1)^{n+1}/n] sin(nx). At x = π/2: 1 = 2(1 − 1/3 + 1/5 − …) → Leibniz formula π/4 = 1 − 1/3 + 1/5 − … ✓. The series converges to 0 at x = ±π (average of left and right limits: (π + (−π))/2 = 0) — correct for the jump discontinuity when periodically extended.

**Real-world intuition**

- Signal analysis: any periodic electrical signal decomposed into harmonic components (fundamental + overtones)
- Music: the timbre of an instrument is determined by the amplitude ratios of its Fourier harmonics
- Heat conduction on a circular ring: temperature distribution expressed as a Fourier series in the angular variable
- Image compression (JPEG): two-dimensional Fourier (DCT) coefficients encode image blocks

**Practice progression**

Item types: identify parity and zero out half the coefficients, compute aₙ for an even function, compute bₙ for an odd function, compute both aₙ and bₙ for a function with no parity, apply Parseval's theorem to sum a series. Suggested item count: 7.

Constant function → odd linear function → even quadratic → piecewise function → Parseval application

**Assessment objectives**

Formats: compute Fourier series for a given function (show coefficient calculation), predict which coefficients vanish from parity alone, apply Parseval to evaluate a specific series sum. Bloom alignment: apply.

Mastery signal: Correctly computes both sine and cosine coefficients using integration by parts, identifies parity shortcuts, and applies Parseval in ≥ 5 of 6 problems

**Teacher notes**

Derive the coefficient formula in class using the orthogonality relations, not as a rule to memorize. If aₙ = A (some answer), multiply both sides of f(x) = Σ by cos(mπx/L) and integrate — the orthogonality kills all but one term, isolating aₘ. Students who see this derivation once understand why the formula works.

**Student notes**

The Fourier coefficient formula is projection: aₙ = ⟨f, cos(nπx/L)⟩ / ||cos(nπx/L)||². The orthogonality of the cosines and sines is what separates the 'channels' of the frequency decomposition. Check parity first — it halves the work.

**Prerequisite graph**

- Requires: math.de.bvp, math.calc.definite-integral, math.trig.trig-functions
- Unlocks (future prerequisite links): math.de.heat-equation, math.de.wave-equation, math.de.fourier-transform
- Cross-topic connections (graph cross-links): math.fnal.fourier-transform
- Narrative: Fourier series is the L = π special case of the Sturm-Liouville eigenfunction expansion (math.de.eigenfunction-expansion) for y'' + λy = 0. Convergence of Fourier series (math.de.fourier-convergence) requires understanding series convergence (math.seq.series-convergence). The Fourier transform (math.de.fourier-transform) extends Fourier series to non-periodic functions by taking L → ∞.

**Teaching hints — review triggers**

- Student cannot integrate ∫f(x)cos(nπx/L)dx by parts (trigonometric integration)
- Student uses the coefficient formula without the (1/L) factor
- Student does not exploit parity to simplify the computation (computes both aₙ and bₙ when one set is zero by symmetry)

**Spaced repetition / revision guidance**

If a coefficient calculation gives zero unexpectedly, check parity: if f is even, all bₙ = 0; if odd, all aₙ = 0 including a₀. If a coefficient is nonzero but the magnitude seems too large or small, check whether you included the (1/L) factor and whether the limits of integration are [−L,L] (not [0,L]).

---

### Convergence of Fourier Series

*Concept ID: `math.de.fourier-convergence` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.75 · Estimated study time: 5h*

**Learning objective.** State Dirichlet's theorem on pointwise convergence of Fourier series for piecewise-smooth functions, identify the Gibbs phenomenon at jump discontinuities, and distinguish pointwise convergence from L²-convergence.

Dirichlet's theorem: if f is piecewise smooth, the Fourier series converges to f(x) at continuity points and to [f(x⁺)+f(x⁻)]/2 at jumps. Near jump discontinuities, overshoot is ~9% (Gibbs phenomenon).

Dirichlet's theorem: if f is piecewise smooth and 2L-periodic, then its Fourier series converges at every x: to f(x) at continuity points, and to (f(x⁺)+f(x⁻))/2 at jump discontinuities. The Gibbs phenomenon describes the non-uniform convergence near jumps: no matter how many terms are included, the partial sum overshoots by approximately 8.9% of the jump size. This overshoot does not disappear as N → ∞ — it merely concentrates into a sharper spike. In contrast, L²-convergence (norm convergence) is guaranteed for all f ∈ L²([−L,L]): ∫|f − Sₙ|²dx → 0, meaning the partial sums converge in energy even at points of discontinuity. These two modes of convergence are different: a sequence can converge in L² without converging pointwise at every point.

**Key ideas**

- Dirichlet: piecewise smooth → convergence to f at continuity, to average at jumps
- Gibbs phenomenon: ~8.9% overshoot near jump discontinuities that does not vanish as N → ∞
- L²-convergence: ∫|f − Sₙ|²dx → 0 for all f ∈ L²; weaker than pointwise convergence
- Uniform convergence: requires f to be continuous everywhere (and piecewise smooth); holds away from jumps
- 'Piecewise smooth' requires: finitely many discontinuities in [−L,L], and f' piecewise continuous

**Vocabulary**

- **Dirichlet's theorem** — If f is piecewise smooth and 2L-periodic, the Fourier series converges to f(x) at continuity points and to (f(x⁺)+f(x⁻))/2 at jump discontinuities.
- **Gibbs phenomenon** — The ~8.9% overshoot that appears in partial sums of Fourier series near jump discontinuities; does not decrease as more terms are added, but concentrates into a narrower spike.
- **piecewise smooth** — A function with finitely many jump discontinuities in each period and with a piecewise-continuous derivative; the class for which Dirichlet's theorem guarantees convergence.
- **L²-convergence** — ||f − Sₙ||² = ∫|f − Sₙ|²dx → 0; the Fourier partial sums converge in mean-square energy, valid for all f ∈ L²([−L,L]) regardless of pointwise behavior.

**Common misconceptions**

- *Misconception:* More Fourier terms eliminate the Gibbs overshoot
  *Correction:* The Gibbs phenomenon overshoot does not go to zero as more terms are added — it remains approximately 8.9% of the jump size. More terms make the spike narrower and higher (concentrating to a sharper but persistent peak near the jump). The overshoot goes to zero only if the jump discontinuity itself is removed (i.e., f is made continuous at that point).
- *Misconception:* Fourier series convergence requires f to be smooth everywhere
  *Correction:* Dirichlet's theorem requires only that f be piecewise smooth (a weaker condition: finitely many jump discontinuities, with f' piecewise continuous). Functions with finitely many corners or jumps are covered. Analyticity or infinite differentiability is not required.
- *Misconception:* L²-convergence and pointwise convergence are equivalent
  *Correction:* L²-convergence (∫|f−Sₙ|² → 0) does not imply pointwise convergence (Sₙ(x) → f(x) for each x). A sequence can converge in L² while diverging pointwise on a set of measure zero. Conversely, pointwise convergence does not imply L²-convergence (if the pointwise limit is not integrable). They are distinct modes of convergence.

**Common mistakes in practice**

- Claiming the Gibbs overshoot disappears for large N (it does not — it narrows but stays ~9%)
- Claiming f must be continuous everywhere for Dirichlet's theorem to apply (piecewise smooth is sufficient)
- Confusing L²-convergence with pointwise convergence

**Visual teaching opportunities**

- Gibbs phenomenon plot: partial sums S₁, S₅, S₂₀, S₁₀₀ of the square wave Fourier series near the jump, showing the overshoot stays at ~9% as N increases
- Convergence comparison diagram: L² convergence (energy shrinks to 0) vs. pointwise convergence (value at each point → f(x)) — illustrated with a function that is in L² but not continuous everywhere
- Piecewise smooth classification: examples of functions that are piecewise smooth (step function, triangle wave) and functions that are not (f(x) = x^{−1/2}, infinite oscillation sin(1/x) near 0)

**Worked example**

*Setup:* For f(x) = x on (−π, π) extended periodically, use Dirichlet's theorem to determine what the Fourier series converges to at x = π.

1. Step 1: Identify the periodically extended function. f(x) = x on (−π, π), then f(π) is a jump: the left limit as x → π⁻ is π; as x → (−π)⁺ (the next period) is −π. Why: understand the periodic extension before applying Dirichlet.
2. Step 2: At x = π, the function has a jump discontinuity. f(π⁻) = π and f(π⁺) = −π (start of next period). Why: the periodic extension creates a jump of size 2π at every integer multiple of π.
3. Step 3: Apply Dirichlet's theorem. The Fourier series converges at x = π to (f(π⁻) + f(π⁺))/2 = (π + (−π))/2 = 0. Why: at a jump, convergence is to the arithmetic mean of the one-sided limits.
4. Step 4: Verify from the series. The Fourier series is Σ 2(−1)^{n+1}/n · sin(nx). At x = π: sin(nπ) = 0 for all n. So the series sum at x = π is 0. ✓ Why: direct computation confirms Dirichlet's prediction.

*Outcome:* The Fourier series of x converges to 0 at x = π (the jump point), consistent with Dirichlet's theorem predicting the average (π + (−π))/2 = 0. At x = π/2, the series converges to π/2 (continuity point).

**Real-world intuition**

- Digital audio: the Gibbs phenomenon causes ringing artifacts in audio filters near sharp transients (e.g., note attacks)
- Image processing: the Gibbs/ringing artifact in JPEG compression near sharp edges is the 2D Gibbs phenomenon
- Signal processing: windowing functions (Hann, Hamming) are used to suppress Gibbs ringing in spectral analysis

**Practice progression**

Item types: identify continuity points and jump points, apply Dirichlet theorem to predict series value at a jump, describe Gibbs phenomenon at a specific jump, determine whether convergence is uniform or only pointwise, classify a function as piecewise smooth or not. Suggested item count: 5.

Simple step function → sawtooth → discontinuous periodic function → non-piecewise-smooth case

**Assessment objectives**

Formats: state Dirichlet's theorem and apply to a specific function, predict series values at given points (continuity vs. jump), explain Gibbs phenomenon and why overshoot persists. Bloom alignment: analyze.

Mastery signal: Correctly applies Dirichlet's theorem at continuity and jump points, describes Gibbs phenomenon accurately, and distinguishes L² from pointwise convergence in ≥ 4 of 5 tasks

**Teacher notes**

Show the Gibbs phenomenon numerically (or with computer graphics if available) — the persistent 9% overshoot is surprising and memorable. Then ask: 'How do engineers deal with this in practice?' Answer: windowing. This connects abstract convergence theory to applied signal processing.

**Student notes**

Dirichlet's theorem tells you exactly what the Fourier series converges to: at continuous points, it's f(x); at jumps, it's the midpoint. The Gibbs phenomenon says: no matter how many terms, the sum overshoots near a jump — but only near the jump. Away from the jump, the convergence is fine.

**Prerequisite graph**

- Requires: math.de.fourier-series, math.seq.series-convergence
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.real.pointwise-convergence
- Narrative: Fourier convergence is an instance of series convergence theory (math.seq.series-convergence) in function spaces. The Gibbs phenomenon connects to functional analysis: even though the L² partial sums converge, the L∞-norm (maximum deviation) does not go to zero at discontinuities. Windowing in signal processing addresses this via the convolution theorem.

**Teaching hints — review triggers**

- Student cannot identify whether a function is piecewise smooth
- Student confuses pointwise and L²-convergence
- Student cannot compute one-sided limits to determine what Dirichlet's theorem predicts at a jump

**Spaced repetition / revision guidance**

If asked 'what does the Fourier series converge to at x₀,' follow three steps: (1) Is x₀ a continuity point? → f(x₀). (2) Is x₀ a jump discontinuity? → (f(x₀⁺)+f(x₀⁻))/2. (3) Is f not piecewise smooth (e.g., unbounded near x₀)? → Dirichlet's theorem may not apply; need deeper analysis.

---

### Fourier Sine and Cosine Series

*Concept ID: `math.de.fourier-sine-cosine` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** Expand a function f defined on [0,L] as a Fourier sine series (odd extension, Dirichlet BCs) or Fourier cosine series (even extension, Neumann BCs), compute the half-range coefficients, and select the appropriate half-range expansion based on the PDE boundary conditions.

On [0,L], a function can be extended as an odd function (yielding a pure sine series) or an even function (yielding a pure cosine series), matching different boundary conditions in PDE applications.

On the interval [0,L], a function f can be expanded using only sine terms or only cosine terms by extending it to a periodic function on [−L,L]. Odd extension: define f̃(−x) = −f(x) → the full Fourier series has only sine terms → bₙ = (2/L)∫₀^L f(x)sin(nπx/L)dx (Fourier sine series). Even extension: define f̃(−x) = f(x) → only cosine terms → a₀ = (1/L)∫₀^L f(x)dx, aₙ = (2/L)∫₀^L f(x)cos(nπx/L)dx (Fourier cosine series). The choice of extension is driven by the PDE's boundary conditions: Dirichlet BCs (u = 0 at endpoints) require the sine series; Neumann BCs (u_x = 0 at endpoints) require the cosine series. Both half-range expansions are complete on [0,L] — any piecewise-smooth f can be expanded in either basis.

**Key ideas**

- Sine series (odd extension): bₙ = (2/L)∫₀^L f(x)sin(nπx/L)dx; vanishes at endpoints x = 0 and x = L
- Cosine series (even extension): aₙ = (2/L)∫₀^L f(x)cos(nπx/L)dx; has zero derivative at endpoints
- Boundary condition selection: u(0) = u(L) = 0 → sine series; u_x(0) = u_x(L) = 0 → cosine series
- Both expansions are valid representations of f on (0,L); they differ in how f is extended outside [0,L]
- The factor 2/L (not 1/L) appears because integration is over [0,L] only (half the period)

**Vocabulary**

- **Fourier sine series** — f(x) = Σbₙsin(nπx/L) on [0,L] with bₙ = (2/L)∫₀^L f sin(nπx/L)dx; derived from the odd extension of f; vanishes at x = 0 and x = L.
- **Fourier cosine series** — f(x) = a₀/2 + Σaₙcos(nπx/L) on [0,L] with aₙ = (2/L)∫₀^L f cos(nπx/L)dx; derived from the even extension; has zero derivative at endpoints.
- **half-range expansion** — A Fourier expansion using only sines or only cosines, obtained by extending f to [−L,L] as an odd or even function respectively.

**Common misconceptions**

- *Misconception:* The Fourier sine series is only valid for odd functions
  *Correction:* The Fourier sine series is valid for any piecewise-smooth f on [0,L], regardless of whether f is odd or even. The odd extension is a construction tool for deriving the series — f itself need not be odd on [0,L]. Any function on [0,L] can be represented as a sine series.
- *Misconception:* The coefficient formula for the half-range sine series is (1/L)∫₀^L f sin(nπx/L)dx
  *Correction:* The correct formula is (2/L)∫₀^L f sin(nπx/L)dx. The factor 2 appears because the inner product uses the full period [−L,L], but the odd extension doubles the contribution from [0,L]: ∫_{−L}^{L} f̃ sin = 2∫₀^L f sin. Missing the factor 2 gives coefficients that are half the correct value.
- *Misconception:* The cosine series and sine series for the same function f must have the same coefficients
  *Correction:* They generally have different coefficients because they use different basis functions (cosines vs. sines). Both represent f on (0,L), but they converge to different periodic extensions outside [0,L] — the cosine series converges to the even extension, the sine series to the odd extension.

**Common mistakes in practice**

- Using 1/L instead of 2/L in the half-range formula
- Claiming the sine series requires f to be odd (it doesn't — f only needs to be defined on [0,L])
- Selecting the wrong series type (sine vs. cosine) without checking the boundary conditions

**Visual teaching opportunities**

- Side-by-side: f(x) = x on [0,π], its odd extension (sawtooth wave, sine series), and its even extension (triangle wave, cosine series) — showing the different periodic extensions
- Boundary condition matching diagram: heat equation u_t = ku_xx with u(0,t) = u(L,t) = 0 → sine series; u_x(0,t) = u_x(L,t) = 0 → cosine series
- Convergence comparison: both sine and cosine series converge to x on (0,π); they differ only at the endpoints x = 0 and x = π

**Worked example**

*Setup:* Find the Fourier sine series of f(x) = 1 on [0,π].

1. Step 1: Write the coefficient formula. bₙ = (2/π)∫₀^π 1·sin(nx)dx. Why: Fourier sine series with L = π; factor 2/L = 2/π.
2. Step 2: Integrate. bₙ = (2/π)[−cos(nx)/n]₀^π = (2/π)·(−cos(nπ)/n + 1/n) = (2/nπ)(1 − cos(nπ)) = (2/nπ)(1 − (−1)ⁿ). Why: standard trigonometric antiderivative.
3. Step 3: Evaluate by parity of n. If n is even: cos(nπ) = 1, so bₙ = 0. If n is odd: cos(nπ) = −1, so bₙ = 4/(nπ). Why: the alternating sign collapses to a pattern.
4. Step 4: Write the series. 1 = Σₙ odd 4/(nπ)·sin(nx) = (4/π)[sin(x) + sin(3x)/3 + sin(5x)/5 + …]. Why: only odd harmonics survive.
5. Step 5: Evaluate at x = π/2 to get Leibniz. 1 = (4/π)[1 − 1/3 + 1/5 − …] → π/4 = 1 − 1/3 + 1/5 − …. Why: substitution confirms the series is correct and gives the famous Leibniz formula.

*Outcome:* Fourier sine series: 1 = Σₙ₌₁,₃,₅,… [4/(nπ)] sin(nx) = (4/π)[sin x + sin(3x)/3 + sin(5x)/5 + …]. At x = 0 and x = π, the series converges to 0 (not 1), because the odd extension has jumps at multiples of π.

**Real-world intuition**

- Heat equation with fixed-temperature ends (Dirichlet): temperature expressed as Fourier sine series
- Heat equation with insulated ends (Neumann): temperature expressed as Fourier cosine series
- Vibrating string fixed at both ends: displacement expanded in Fourier sine series

**Practice progression**

Item types: compute Fourier sine series coefficients, compute Fourier cosine series coefficients, select sine vs. cosine expansion based on BCs, compute first 3 nonzero terms, use Parseval to sum a related series. Suggested item count: 6.

Constant function → linear → quadratic → piecewise constant (two pieces)

**Assessment objectives**

Formats: compute half-range sine or cosine series for a given function, select which expansion matches a given PDE boundary condition, evaluate the series at a specific point and explain the convergence. Bloom alignment: apply.

Mastery signal: Correctly applies the 2/L factor, computes series for standard functions, selects appropriate half-range expansion for given BCs in ≥ 4 of 5 problems

**Teacher notes**

The physical connection is essential: Dirichlet BCs (fixed ends, u = 0) are modeled by sines because sin(0) = 0 and sin(nπ) = 0 — the sine series automatically satisfies the zero-endpoint conditions. Neumann BCs (insulated ends, u_x = 0) are modeled by cosines because d/dx[cos(nπx/L)] = 0 at x = 0 and x = L. Students who connect the physical BC to the mathematical series never confuse which to use.

**Student notes**

Two rules: (1) Fixed endpoints (u = 0 at x = 0 and L) → sine series. (2) Insulated endpoints (u_x = 0 at x = 0 and L) → cosine series. Everything else — the coefficient formula, the factor 2/L, the convergence — is the same structure as the full Fourier series.

**Prerequisite graph**

- Requires: math.de.fourier-series
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The Fourier sine series is the eigenfunction expansion for the SL problem y'' + λy = 0, y(0) = y(L) = 0 (Dirichlet BCs). The cosine series corresponds to y(0) = y(L) = 0 with y'(0) = y'(L) = 0 (Neumann). Both are special cases of the general SL framework (math.de.sturm-liouville). The factor 2/L (vs. 1/L for the full Fourier series) reflects that the inner product is over [0,L] (half the period) while the normalization ||sin||² = L/2.

**Teaching hints — review triggers**

- Student uses 1/L instead of 2/L in the half-range coefficient formula
- Student does not know which BCs correspond to sine vs. cosine expansion
- Student confuses 'function is odd' with 'use the sine expansion' — the sine expansion is valid for any f on [0,L]

**Spaced repetition / revision guidance**

To verify which expansion to use for a PDE: write the boundary conditions explicitly. If u(0,t) = u(L,t) = 0, the spatial part X(x) must satisfy X(0) = X(L) = 0 — these are satisfied by sin(nπx/L), not cos. If u_x(0,t) = u_x(L,t) = 0, the derivative condition X'(0) = X'(L) = 0 is satisfied by cos(nπx/L).

---

### Fourier Transform

*Concept ID: `math.de.fourier-transform` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 8h*

**Learning objective.** Define the Fourier transform f̂(ω) = ∫_{−∞}^{∞} f(t)e^{−iωt}dt and its inverse, apply the derivative rule ℱ{f'}(ω) = iωf̂(ω) to convert ODEs/PDEs to algebraic equations, and understand how the Fourier transform extends Fourier series to non-periodic functions.

The integral transform f̂(ω)=∫_{-∞}^∞ f(t)e^{−iωt}dt for non-periodic functions. Converts differentiation to multiplication by iω; used for solving ODEs/PDEs on the whole real line.

The Fourier transform f̂(ω) = ∫_{−∞}^{∞} f(t)e^{−iωt}dt extends Fourier series to non-periodic functions on the whole real line. While Fourier series represent a periodic function by discrete harmonics {nπ/L}, the Fourier transform represents a non-periodic function by a continuous spectrum f̂(ω) over all frequencies ω ∈ ℝ. The fundamental property ℱ{f^{(n)}}(ω) = (iω)ⁿf̂(ω) converts differentiation to multiplication by iω — the same algebraic mechanism as Laplace transforms, but on the imaginary axis. The inverse transform recovers f(t) = (1/2π)∫_{−∞}^{∞} f̂(ω)e^{iωt}dω. Key properties mirror the Laplace transform: linearity, convolution theorem ℱ{f*g} = f̂·ĝ, and Parseval's formula ∫|f|² dt = (1/2π)∫|f̂|² dω.

**Key ideas**

- Definition: f̂(ω) = ∫_{−∞}^{∞} f(t)e^{−iωt}dt; defined for f ∈ L¹(ℝ) ∩ L²(ℝ) (or extended in L²)
- Derivative rule: ℱ{f^{(n)}}(ω) = (iω)ⁿf̂(ω); converts nth-order ODE to polynomial in iω
- Inverse: f(t) = (1/2π)∫_{−∞}^{∞} f̂(ω)e^{iωt}dω
- Convolution theorem: ℱ{f*g} = f̂·ĝ (same as Laplace, but over ℝ)
- Connection to Fourier series: f̂(ω) is the limit of L·aₙ or L·bₙ as L → ∞ and ω = nπ/L becomes continuous

**Vocabulary**

- **Fourier transform** — f̂(ω) = ∫_{−∞}^{∞} f(t)e^{−iωt}dt; converts a non-periodic time-domain function to a continuous frequency-domain representation.
- **heat kernel** — Φ(x,t) = (1/√(4πkt))e^{−x²/(4kt)}; the fundamental solution of the heat equation u_t = ku_xx on ℝ; the solution for general initial data is u = Φ*f (convolution).
- **Parseval's theorem (Fourier)** — ∫_{−∞}^{∞}|f(t)|²dt = (1/2π)∫_{−∞}^{∞}|f̂(ω)|²dω; the total energy in the time domain equals the total energy in the frequency domain (Plancherel theorem).

**Common misconceptions**

- *Misconception:* The Fourier transform and Laplace transform are the same transform
  *Correction:* Both convert differentiation to algebraic multiplication, but they differ in the exponential kernel and domain. The Laplace transform uses e^{−st} with s = σ + iω (complex, right half-plane), suited for causal signals (one-sided) and IVPs. The Fourier transform uses e^{−iωt} with real ω (imaginary axis only), suited for bilateral signals and steady-state analysis. The Fourier transform is the Laplace transform restricted to s = iω.
- *Misconception:* The Fourier transform always exists for any function
  *Correction:* The Fourier transform requires f ∈ L¹(ℝ) (absolutely integrable: ∫|f|dt < ∞) for the classical integral definition to converge. Functions like f(t) = 1 or f(t) = eᵃᵗ (with a > 0) are not in L¹(ℝ) and do not have classical Fourier transforms (though distributional transforms exist for constants, delta functions, etc.).
- *Misconception:* The derivative rule is ℱ{f'}(ω) = ωf̂(ω) (missing the i)
  *Correction:* The correct derivative rule is ℱ{f'} = iω·f̂. The factor i comes from differentiating the exponential kernel: d/dt[e^{−iωt}] = −iω·e^{−iωt}; integration by parts gives ℱ{f'} = iω·f̂ (assuming f → 0 as t → ±∞). Missing i gives a purely real frequency multiplication, which is wrong for complex-valued transforms.

**Common mistakes in practice**

- Writing ℱ{f'} = ωf̂ (missing the i)
- Confusing the inverse transform factor: some conventions use 1/(2π) in the inverse, others use 1/√(2π) in both — state your convention clearly
- Claiming the Fourier transform converges for any f (it requires f ∈ L¹ or L² depending on the context)

**Visual teaching opportunities**

- Fourier series → Fourier transform limit: show Fourier series coefficients Cₙ for increasing period 2L → as L → ∞, the discrete spectrum becomes the continuous transform f̂(ω)
- Gaussian transform pair: f(t) = e^{−at²} ↔ f̂(ω) = √(π/a)·e^{−ω²/(4a)} — frequency broadens as time narrows (uncertainty principle illustration)
- Frequency-domain representation: plot f̂(ω) for a rectangular pulse, showing the sinc function spectrum, contrasting localized vs. spread-out signals

**Worked example**

*Setup:* Solve u_t = ku_xx on −∞ < x < ∞, u(x,0) = f(x) using the Fourier transform in x.

1. Step 1: Take Fourier transform in x. Let û(ω,t) = ℱₓ{u}(ω,t). Then ℱ{u_t} = ∂û/∂t and ℱ{u_xx} = (iω)²û = −ω²û. Why: derivative rule for the x-variable.
2. Step 2: ODE in t for û. ∂û/∂t = −kω²û, with IC û(ω,0) = f̂(ω). Why: the PDE becomes an ODE in t for each fixed ω.
3. Step 3: Solve the ODE. û(ω,t) = f̂(ω)·e^{−kω²t}. Why: linear first-order ODE in t with constant coefficient −kω².
4. Step 4: Invert the Fourier transform. u(x,t) = ℱ⁻¹{f̂(ω)·e^{−kω²t}} = f * g, where g(x,t) = (1/√(4πkt))e^{−x²/(4kt)} is the heat kernel. Why: convolution theorem — product in frequency = convolution in space.
5. Step 5: Write the solution formula. u(x,t) = (1/√(4πkt))∫_{−∞}^{∞} f(y)e^{−(x−y)²/(4kt)}dy. Why: the Gaussian heat kernel spreads the initial data over time.

*Outcome:* u(x,t) = (1/√(4πkt))∫f(y)e^{−(x−y)²/(4kt)}dy — the Gaussian smoothing formula for the heat equation. The Gaussian kernel e^{−x²/(4kt)} has standard deviation √(2kt) that grows as √t — heat spreads diffusively.

**Real-world intuition**

- MRI imaging: Fourier transform of the NMR signal gives the spatial image
- Audio engineering: Fourier spectrum of a sound shows its frequency components; equalizers modify |f̂(ω)|
- Quantum mechanics: the momentum-space wavefunction is the Fourier transform of the position-space wavefunction
- Communication: AM/FM modulation shifts the Fourier spectrum; Fourier transform is the standard analysis tool

**Practice progression**

Item types: compute Fourier transform from definition for simple functions, apply derivative rule to convert ODE to algebraic equation, use convolution theorem to invert products, solve a PDE on the whole line using Fourier transform, identify when Fourier vs. Laplace transform is more appropriate. Suggested item count: 6.

Gaussian → rectangular pulse (sinc transform) → derivative rule application → PDE on whole line

**Assessment objectives**

Formats: apply derivative rule to reduce a PDE to ODE and solve, state Parseval's theorem and compute ∫|f|² from f̂, explain difference between Fourier and Laplace transforms. Bloom alignment: apply.

Mastery signal: Correctly applies derivative rule (with iω), uses convolution theorem, and solves a PDE on the whole line in ≥ 4 of 5 problems

**Teacher notes**

The Fourier transform is best introduced as the L → ∞ limit of Fourier series: as the period 2L → ∞, the discrete harmonics nπ/L → continuous frequency ω, and the Fourier coefficients → f̂(ω). This derivation shows exactly where the 1/(2π) factor in the inverse transform comes from (the spacing of harmonics becomes dω/(2π) as the sum becomes an integral).

**Student notes**

The Fourier transform is the continuous-frequency version of Fourier series: instead of discrete harmonics n, you have a continuous spectrum ω. The derivative rule (iω)ⁿ is the most useful property for ODEs and PDEs: it converts differentiation to multiplication by iω, making the transformed equation algebraic.

**Prerequisite graph**

- Requires: math.de.fourier-series, math.calc.improper-integrals
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.fnal.fourier-transform, math.meas.l2-space
- Narrative: The Fourier transform is the L → ∞ limit of Fourier series (math.de.fourier-series) and the imaginary-axis restriction of the Laplace transform (math.de.laplace-transform). The convolution theorem (math.de.convolution-theorem) holds for both, with Fourier convolution over ℝ replacing Laplace convolution over [0,∞). Parseval's theorem connects L² function spaces (math.meas.l2-space) to the Fourier transform.

**Teaching hints — review triggers**

- Student confuses iω with ω in the derivative rule (misses the complex factor i)
- Student cannot compute ∫_{−∞}^{∞} f(t)e^{−iωt}dt for simple f (complex exponential integration)
- Student does not understand when the Fourier transform applies (bilateral signals, L¹ or L² functions)

**Spaced repetition / revision guidance**

If the derivative rule gives an unexpected factor, remember: ℱ{f'}(ω) = ∫f'(t)e^{−iωt}dt. Integrate by parts: = [f(t)e^{−iωt}]_{−∞}^{∞} − ∫f(t)(−iω)e^{−iωt}dt = 0 + iω·f̂(ω) (assuming f → 0 at ±∞). The iω comes from differentiating the kernel e^{−iωt}.

---

### Partial Differential Equation

*Concept ID: `math.de.pde` · Difficulty: expert · Bloom level: understand · Mastery threshold: 0.8 · Estimated study time: 8h*

**Learning objective.** Define a partial differential equation (PDE), classify linear second-order PDEs (elliptic, parabolic, hyperbolic) using the discriminant B²−4AC, and connect the three classes to their canonical physical models (Laplace, heat, wave equations).

An equation involving partial derivatives of an unknown function of several variables. Classified (for linear second-order) as elliptic, parabolic, or hyperbolic based on the discriminant of the principal part.

A partial differential equation (PDE) is an equation involving partial derivatives of an unknown function of two or more independent variables. The most important class is second-order linear PDEs in two variables: Au_{xx} + Bu_{xy} + Cu_{yy} + Du_x + Eu_y + Fu = G. The discriminant B²−4AC classifies the equation: elliptic (B²−4AC < 0, like Laplace's equation u_xx + u_yy = 0), parabolic (B²−4AC = 0, like the heat equation u_t = ku_xx), and hyperbolic (B²−4AC > 0, like the wave equation u_tt = c²u_xx). Each class has distinct mathematical behavior: elliptic equations describe steady states with smooth solutions; parabolic equations describe diffusion with infinite speed and immediate smoothing; hyperbolic equations describe wave propagation with finite speed and sharp fronts.

**Key ideas**

- PDE involves partial derivatives u_x, u_y, u_xx, u_{xy}, u_yy, etc. of a multi-variable function
- Classification for Au_xx + Bu_{xy} + Cu_yy = 0: discriminant Δ = B²−4AC; Δ < 0 → elliptic, = 0 → parabolic, > 0 → hyperbolic
- Elliptic (Laplace, Poisson): steady-state problems; solutions are smooth (harmonic functions)
- Parabolic (heat equation): diffusion, time-irreversible; solutions smooth immediately for t > 0
- Hyperbolic (wave equation): wave propagation, finite speed, characteristics carry singularities

**Vocabulary**

- **partial differential equation** — An equation involving partial derivatives of an unknown function of two or more independent variables; classified by order (highest derivative) and type (linear/nonlinear).
- **elliptic PDE** — A PDE with B²−4AC < 0; models steady-state phenomena; solutions are smooth harmonic functions; requires boundary conditions on a closed domain.
- **parabolic PDE** — A PDE with B²−4AC = 0; models diffusion; solutions smooth immediately; requires initial condition (t = 0) plus boundary conditions.
- **hyperbolic PDE** — A PDE with B²−4AC > 0; models wave propagation; finite speed, sharp fronts; requires both initial displacement and velocity.
- **characteristics** — Curves in the (x,t) or (x,y)-plane along which information propagates; elliptic: none; parabolic: one family; hyperbolic: two families.

**Common misconceptions**

- *Misconception:* All PDEs can be solved by the same method as ODEs (e.g., characteristic equations)
  *Correction:* PDEs require fundamentally different solution methods depending on their type. Separation of variables works for many linear PDEs but not for general nonlinear ones. The classification (elliptic/parabolic/hyperbolic) determines which methods are appropriate: BVPs for elliptic, initial-BVPs for parabolic/hyperbolic. There is no universal 'ODE-style' PDE solver.
- *Misconception:* The classification elliptic/parabolic/hyperbolic only applies to the three canonical examples
  *Correction:* The classification applies to any linear second-order PDE Au_xx + Bu_{xy} + Cu_yy + lower = 0. For variable-coefficient PDEs (A, B, C functions of x and y), the classification can change from point to point (e.g., the Tricomi equation u_xx + xu_yy = 0 is elliptic for x > 0, parabolic at x = 0, and hyperbolic for x < 0).
- *Misconception:* PDEs need initial conditions everywhere on a surface, not just on a curve
  *Correction:* Well-posedness for PDEs depends on the type: elliptic PDEs need boundary conditions on a closed domain boundary; parabolic and hyperbolic PDEs need initial conditions on an initial curve (or surface) plus boundary conditions on the spatial boundary. The Cauchy-Kowalewski theorem specifies when initial data on a curve determines a unique local solution.

**Common mistakes in practice**

- Computing 4AC − B² instead of B²−4AC (sign error leading to wrong classification)
- Applying the constant-coefficient classification to a variable-coefficient PDE globally (should classify at each point)
- Confusing the number of ICs needed: hyperbolic needs two (displacement + velocity), parabolic needs one (initial state)

**Visual teaching opportunities**

- Classification diagram in (x,y)-plane with example PDEs labeled in each region (elliptic, parabolic, hyperbolic) and physical interpretation of each
- Three physical scenarios: heat spreading in a rod (parabolic, smooth), a drum vibrating (hyperbolic, wave), and steady-state temperature in a plate (elliptic, harmonic)
- Characteristics diagram: hyperbolic PDE has two families of characteristic curves along which information propagates; parabolic has one; elliptic has none (information spreads infinitely fast in all directions)

**Worked example**

*Setup:* Classify the PDE u_tt − 4u_{tx} + 4u_{xx} = 0 and identify its canonical form.

1. Step 1: Identify A, B, C from Au_xx + Bu_{tx} + Cu_tt = 0. Here t and x are the two variables, so: A = 4 (coefficient of u_xx), B = −4 (coefficient of u_{tx}), C = 1 (coefficient of u_tt). Why: match the PDE to the standard form Au₁₁ + Bu₁₂ + Cu₂₂.
2. Step 2: Compute the discriminant. Δ = B² − 4AC = 16 − 4·4·1 = 16 − 16 = 0. Why: parabolic ↔ Δ = 0.
3. Step 3: Classification. Δ = 0 → parabolic. Why: the discriminant test.
4. Step 4: Identify the canonical form. u_tt − 4u_{tx} + 4u_{xx} = (∂_t − 2∂_x)²u = 0. This is a parabolic PDE with a double characteristic direction. Its solutions propagate along the characteristic dx/dt = 2 with no wave behavior — it describes a diffusion-like process along characteristics.
5. Step 5: Physical interpretation. The canonical parabolic form v_τ = v_ξξ (heat equation) is obtained by the change of variables ξ = x, τ = x − t/2 (approximately). Parabolic equations have one family of characteristics.

*Outcome:* Parabolic equation (Δ = 0); factored as (∂_t − 2∂_x)²u = 0. The PDE has solutions of the form u(x,t) = f(2t+x) + tg(2t+x) — general solution along the single characteristic direction.

**Real-world intuition**

- Structural mechanics: the biharmonic equation Δ²u = 0 (elliptic) governs plate bending
- Fluid dynamics: the Euler equation for inviscid flow is hyperbolic; the Navier-Stokes viscous term is parabolic
- Finance: the Black-Scholes option pricing PDE is parabolic — it describes diffusion of option value backward in time

**Practice progression**

Item types: identify A, B, C from a given PDE, compute discriminant and classify, identify the canonical physical model matching each class, verify classification for a variable-coefficient PDE at a specific point, describe the qualitative behavior appropriate to each class. Suggested item count: 5.

Constant-coefficient standard examples → constant-coefficient mixed → variable-coefficient (classify at a point) → physical interpretation

**Assessment objectives**

Formats: classify a given PDE and justify with discriminant, match three PDEs to the three physical descriptions, explain why the heat equation requires an initial condition but not two (unlike the wave equation). Bloom alignment: understand.

Mastery signal: Correctly classifies PDEs using B²−4AC and provides physical interpretation in ≥ 4 of 5 problems

**Teacher notes**

Connect the classification immediately to physical intuition. Elliptic = steady state (no time, information spreads everywhere). Parabolic = diffusion (time, infinite speed, irreversible). Hyperbolic = wave (time, finite speed, reversible, sharp fronts). Students who can answer 'which physical story does this PDE tell?' have the correct conceptual foundation.

**Student notes**

The discriminant test B²−4AC classifies PDEs the same way b²−4ac classifies quadratic equations: negative = complex roots/elliptic, zero = repeated root/parabolic, positive = real roots/hyperbolic. The connection is not a coincidence — the classification comes from the characteristic ODE associated with the PDE.

**Prerequisite graph**

- Requires: math.de.ode, math.calc.partial-derivatives
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: PDE classification connects to ODE characteristics (math.de.ode): the characteristic curves of a PDE are solution curves of an associated ODE (the characteristic ODE). For hyperbolic equations, these are the lines along which signals travel — the wave equation has characteristics x ± ct = const. The classification elliptic/parabolic/hyperbolic mirrors the quadratic formula, with the same discriminant formula B²−4AC.

**Teaching hints — review triggers**

- Student cannot compute partial derivatives u_x, u_xx, u_{xy} for a given u
- Student confuses the discriminant for PDEs (B²−4AC) with the discriminant for quadratics (b²−4ac) — the same formula applies
- Student does not know what 'elliptic/parabolic/hyperbolic' means physically

**Spaced repetition / revision guidance**

If unsure which class, compute B²−4AC and compare to zero. Then check against the three canonical examples: Laplace (elliptic, Δ < 0), heat (parabolic, Δ = 0), wave (hyperbolic, Δ > 0). Any unfamiliar PDE should be compared to these three known templates.

---

### Classification of Second-Order PDEs

*Concept ID: `math.de.pde-classification` · Difficulty: expert · Bloom level: understand · Mastery threshold: 0.8 · Estimated study time: 4h*

**Learning objective.** Classify a general second-order linear PDE Au_{xx} + Bu_{xy} + Cu_{yy} + … = 0 using the discriminant B²−4AC, reduce it to canonical form (elliptic: Laplace type; parabolic: heat type; hyperbolic: wave type), and identify the characteristics for hyperbolic equations.

For Au_{xx}+Bu_{xy}+Cu_{yy}+lower=0, the discriminant B²−4AC determines: elliptic (<0), parabolic (=0), hyperbolic (>0). Each class has distinct mathematical structure and physical interpretation.

The classification of second-order linear PDEs is determined by the principal part Au_{xx} + Bu_{xy} + Cu_{yy}: the discriminant Δ = B²−4AC determines the type. Elliptic (Δ < 0): like the Laplace equation u_xx + u_yy = 0 — no real characteristics, solutions are maximally smooth. Parabolic (Δ = 0): like the heat equation u_t − ku_xx = 0 — one family of real characteristics (the time axis), solutions smooth immediately. Hyperbolic (Δ > 0): like the wave equation u_tt − c²u_xx = 0 — two families of real characteristics (x ± ct = const), information propagates at finite speed c along characteristics. By a change of variables, any PDE in a class can be reduced to its canonical form: elliptic → u_ξξ + u_ηη = 0; parabolic → u_ξ = u_ηη; hyperbolic → u_ξη = 0 (d'Alembert form).

**Key ideas**

- Discriminant Δ = B²−4AC: < 0 elliptic, = 0 parabolic, > 0 hyperbolic
- Characteristics: curves (x(s), y(s)) satisfying A(dy)² − B(dy)(dx) + C(dx)² = 0; real for hyperbolic, none for elliptic
- Hyperbolic canonical form: u_ξη = 0 (after change to characteristic coordinates ξ = x+cy, η = x−cy)
- Parabolic canonical form: u_ξ = u_ηη (one characteristic direction)
- Elliptic canonical form: u_ξξ + u_ηη = 0 (Laplace type, no real characteristics)

**Vocabulary**

- **characteristics (PDE)** — Curves in the (x,y)-plane along which the PDE can be reduced to an ODE; hyperbolic PDEs have two families, parabolic have one, elliptic have none (over ℝ).
- **canonical form** — The simplest form of a PDE of each type: elliptic → u_ξξ + u_ηη = 0; parabolic → u_ξ = u_ηη; hyperbolic → u_ξη = 0 (equivalent to u_ξξ − u_ηη = 0).
- **d'Alembert's solution** — u(x,t) = f(x−ct) + g(x+ct); the general solution to the 1D wave equation u_tt = c²u_xx — superposition of left- and right-traveling waves.

**Common misconceptions**

- *Misconception:* The three PDE types are distinct categories with sharp boundaries
  *Correction:* For variable-coefficient PDEs, A, B, C depend on (x,y), and the discriminant Δ(x,y) can change sign at different points. Such PDEs can be elliptic in one region and hyperbolic in another (e.g., Tricomi equation u_{xx} + xu_{yy} = 0 is elliptic for x > 0, parabolic at x = 0, hyperbolic for x < 0). The classification is local, not global.
- *Misconception:* The characteristic curves are the solution curves u = const
  *Correction:* The characteristics are curves in the (x,y) or (x,t)-plane along which information propagates — they are determined by the principal part of the PDE, not by the solution values. For the wave equation u_tt = c²u_xx, the characteristics are x ± ct = const (not u = const).
- *Misconception:* Canonical form requires a specific coordinate change that is always obvious
  *Correction:* The canonical form requires solving the characteristic ODE dy/dx = (B ± √Δ)/(2A) to find the characteristic coordinates. For non-constant A, B, C this ODE may be difficult to solve. For constant coefficients (most textbook problems), the characteristics are straight lines.

**Common mistakes in practice**

- Computing the discriminant for the full PDE including lower-order terms (only the principal part A, B, C matters)
- Integrating the characteristic ODE wrong and getting the wrong characteristic curves
- Not recognizing that d'Alembert's formula f(x−ct) + g(x+ct) applies only to the wave equation (hyperbolic, constant coefficients)

**Visual teaching opportunities**

- Characteristic diagram for the wave equation: two families of lines x + ct = const and x − ct = const forming a grid; information from a point (x₀, t₀) propagates along both lines
- Tricomi equation classification: plot in the (x,y)-plane with x > 0 (elliptic), x = 0 (parabolic, vertical line), x < 0 (hyperbolic), and typical characteristic curves in each region
- Canonical form reduction: for the wave equation, show the change of variables ξ = x + ct, η = x − ct converting u_tt − c²u_xx = 0 into u_ξη = 0, whose general solution is u = f(ξ) + g(η) = f(x+ct) + g(x−ct)

**Worked example**

*Setup:* Classify u_tt − c²u_xx = 0 and find the characteristics.

1. Step 1: Identify A, B, C. Write as Au_{tt} + Bu_{tx} + Cu_{xx} = 0 with A = 1, B = 0, C = −c². Why: standard form with t and x as the two variables.
2. Step 2: Compute discriminant. Δ = B² − 4AC = 0 − 4·1·(−c²) = 4c² > 0. Why: Δ > 0 → hyperbolic.
3. Step 3: Find characteristic ODEs. dt/dx = [B ± √Δ]/(2A) = [0 ± 2c]/2 = ±c. Why: the characteristic directions satisfy A(dt)² − B(dt)(dx) + C(dx)² = 0, which gives dt/dx = ±c.
4. Step 4: Integrate to get characteristics. dt/dx = c → t = cx/c = const? No: dt = c dx → t − cx/c? Let t-variable, x-variable: dx/dt = 1/c → x − t/c = const and x + t/c = const. Actually: characteristic ODEs dx/dt = ±c give x − ct = const (rightward) and x + ct = const (leftward). Why: two families of straight lines with slopes ±1/c in the (t,x)-plane.
5. Step 5: Canonical form. Let ξ = x − ct, η = x + ct. In these coordinates, u_ξη = 0, giving u = f(ξ) + g(η) = f(x−ct) + g(x+ct) — d'Alembert's solution. Why: product of characteristic coordinates gives the mixed second-order equation u_ξη = 0 whose general solution is sum of right-traveling and left-traveling waves.

*Outcome:* Hyperbolic (Δ = 4c²> 0). Two families of characteristics: x − ct = const (right-traveling) and x + ct = const (left-traveling). Canonical form u_ξη = 0; general solution u = f(x−ct) + g(x+ct) — the superposition of two waves traveling at speed c in opposite directions.

**Real-world intuition**

- Electromagnetic waves: Maxwell's equations reduce to hyperbolic PDEs (wave equations for E and B) — characteristics are light cones
- Transonic flow: the flow equation changes type at Mach 1 (elliptic for subsonic, hyperbolic for supersonic)
- General relativity: the Einstein field equations are hyperbolic; gravitational wave propagation follows null characteristics

**Practice progression**

Item types: classify by discriminant, find characteristic ODEs, integrate to get characteristic curves, change variables to canonical form, identify physical wave speed from characteristics. Suggested item count: 5.

Constant-coefficient standard examples → constant-coefficient general → variable-coefficient at a specific point

**Assessment objectives**

Formats: classify and find characteristics for a given PDE, reduce to canonical form for a constant-coefficient hyperbolic PDE, explain why the elliptic case has no real characteristics. Bloom alignment: understand.

Mastery signal: Correctly classifies, finds characteristics, and reduces to canonical form in ≥ 4 of 5 problems

**Teacher notes**

The characteristic equation is often introduced mechanically (as a formula), but derive it in class: assume a wave-like change of variables ξ(x,y), η(x,y) and require that the mixed derivative u_ξη vanishes for hyperbolic equations. This derivation makes the connection between characteristics and the algebraic classification transparent.

**Student notes**

Classification → characteristics → canonical form: three steps. First classify (discriminant). Then find characteristics (integrate the characteristic ODE). Then change to characteristic coordinates to see the canonical form. For the wave equation, the canonical form u_ξη = 0 integrates immediately to d'Alembert's solution f(ξ) + g(η).

**Prerequisite graph**

- Requires: math.de.pde
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: PDE characteristics are the multi-variable analog of the characteristic polynomial for ODEs (math.de.char-equation): both encode the fundamental structure of the equation. D'Alembert's solution for the wave equation directly connects to the Fourier transform (math.de.fourier-transform): the Fourier transform in x converts the wave equation to (iω)²û_tt = −c²ω²û, giving û = Ae^{iωct} + Be^{−iωct}, whose inverse Fourier transform is f(x+ct) + g(x−ct).

**Teaching hints — review triggers**

- Student cannot identify A, B, C from the PDE (confuses mixed derivative notation u_{xy} vs. u_{xx})
- Student cannot solve the characteristic ODE dy/dx = [B ± √Δ]/(2A)
- Student does not understand what 'information propagates along characteristics' means physically

**Spaced repetition / revision guidance**

If you are confused about which sign gives which family of characteristics, remember for the wave equation: dx/dt = c is the right-traveling characteristic (x − ct = const moves to the right as t increases); dx/dt = −c is the left-traveling characteristic (x + ct = const). The signal at (x₀, 0) affects only points within the light cone |x − x₀| ≤ ct — no signal outside the cone (finite speed of propagation).

---

### Separation of Variables (PDE)

*Concept ID: `math.de.separation-of-variables-pde` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 8h*

**Learning objective.** Apply separation of variables to a linear PDE by assuming u(x,t) = X(x)T(t), derive the resulting ODEs for X and T linked by a separation constant −λ, identify the eigenvalue problem for X from the boundary conditions, and assemble the full solution by superposition.

Assumes u(x,t)=X(x)T(t) (or analogous in other variables), splitting the PDE into ODEs for each factor, linked by a separation constant. Yields eigenvalue problems for X, then Fourier series expansions.

Separation of variables converts a PDE in two variables into two linked ODEs. Assuming u(x,t) = X(x)T(t), substituting into the PDE, and dividing by X(x)T(t) typically isolates all x-dependence on one side and all t-dependence on the other — both sides must equal the same constant (the separation constant, conventionally written as −λ). This produces two ODEs: a spatial eigenvalue problem X'' + λX = 0 with boundary conditions from the PDE, and a time ODE T' + (something involving λ)T = 0. The BVP for X has solutions only for specific values λₙ (eigenvalues) with corresponding eigenfunctions Xₙ(x). The general solution is the superposition u = ΣcₙXₙ(x)Tₙ(t), with the coefficients cₙ determined by the initial condition via the eigenfunction expansion (Fourier series).

**Key ideas**

- Assume u = X(x)T(t); substitute and separate: X''/X = T'/T = −λ (constant)
- Spatial ODE: X'' + λX = 0 with BCs → eigenvalue problem → eigenvalues λₙ, eigenfunctions Xₙ
- Time ODE: T' + λₙ·(coefficient)·T = 0 → Tₙ(t) solved for each λₙ
- Superposition: u = ΣcₙXₙ(x)Tₙ(t); coefficients from Fourier-style expansion of the IC
- The separation constant −λ must be chosen to give non-trivial solutions for both X and T

**Vocabulary**

- **separation of variables (PDE)** — The method of assuming u(x,t) = X(x)T(t) to separate a PDE into two ODEs linked by a separation constant.
- **separation constant** — The constant −λ linking the two ODEs derived by separation; it is not free but determined by the eigenvalue problem for the spatial factor X.
- **mode superposition** — The general solution u = ΣcₙXₙ(x)Tₙ(t) as a sum over all eigenmodes; the initial condition determines the coefficients cₙ via Fourier orthogonality.

**Common misconceptions**

- *Misconception:* Separation of variables always works for any PDE
  *Correction:* Separation of variables works for linear PDEs whose geometry and boundary conditions match a separable coordinate system. It fails for nonlinear PDEs, variable-coefficient PDEs in general, and problems where the boundary conditions mix x and t. The method's success depends on the specific structure of the PDE and domain.
- *Misconception:* The separation constant λ can be any real number
  *Correction:* The separation constant is constrained by the spatial boundary conditions. The BVP X'' + λX = 0 with X(0) = X(L) = 0 (for example) has non-trivial solutions only for λ = λₙ = (nπ/L)². For other values of λ, only X ≡ 0 is possible — not useful. The discrete set of eigenvalues {λₙ} is determined by the BVP, not freely chosen.
- *Misconception:* Each term uₙ = Xₙ(x)Tₙ(t) is the full solution
  *Correction:* Each uₙ = Xₙ(x)Tₙ(t) is one solution — it satisfies the PDE and BCs but generally not the initial condition. The general solution is the superposition u = Σcₙuₙ. The coefficients cₙ are determined by the initial condition using orthogonality of the Xₙ basis.

**Common mistakes in practice**

- Forgetting to apply the boundary conditions to X (not T) — the BCs determine the eigenvalues
- Using the IC before assembling the full superposition
- Choosing the wrong sign for −λ (positive λ needed for Dirichlet BVP to have non-trivial solutions)

**Visual teaching opportunities**

- Four-step flowchart: (1) assume u = XT, (2) substitute and separate, (3) solve eigenvalue BVP for X, (4) solve T ODE, (5) superpose and apply IC
- The separation constant diagram: both sides of the separated equation must equal the same constant −λ; show why each side being a function of a different variable forces them to be constant
- Mode shapes Xₙ(x) plotted for n = 1, 2, 3 alongside the corresponding Tₙ(t) decay for the heat equation — showing the nth mode decaying faster as n increases

**Worked example**

*Setup:* Solve u_t = u_xx, 0 < x < π, t > 0; u(0,t) = u(π,t) = 0; u(x,0) = sin(3x).

1. Step 1: Assume u = X(x)T(t). Substitute: XT' = X''T → T'/T = X''/X = −λ. Why: separation yields a constant on both sides.
2. Step 2: Spatial ODE. X'' + λX = 0, X(0) = X(π) = 0. Why: Dirichlet BCs from the PDE boundary conditions.
3. Step 3: Solve eigenvalue problem. For λ > 0: X = A sin(√λ x) + B cos(√λ x). BCs: X(0) = 0 → B = 0. X(π) = 0 → A sin(√λ π) = 0 → √λ = n → λₙ = n². Eigenfunctions Xₙ = sin(nx), n = 1, 2, …. Why: only n = positive integer gives non-trivial solutions.
4. Step 4: Time ODE. For each λₙ = n²: T' + n²T = 0 → Tₙ = cₙe^{−n²t}. Why: first-order ODE in t.
5. Step 5: General solution. u = Σcₙ sin(nx)e^{−n²t}. Why: superposition.
6. Step 6: Apply IC u(x,0) = sin(3x). Σcₙ sin(nx) = sin(3x) → c₃ = 1, cₙ = 0 for n ≠ 3. Why: orthogonality of sine functions picks out n = 3.
7. Step 7: Specific solution. u(x,t) = sin(3x)e^{−9t}. Why: only the n = 3 term survives.

*Outcome:* u(x,t) = sin(3x)e^{−9t}. This is an exact solution — a single mode that decays at rate 9. The initial temperature profile sin(3x) decays exponentially, with higher modes decaying faster (mode n decays at rate n²).

**Real-world intuition**

- Heat conduction: temperature in a rod with fixed-temperature ends solved by separation of variables
- Vibrating string: guitar string vibration as superposition of standing wave modes
- Quantum mechanics: particle in a box wavefunction — separation of variables in Schrödinger's equation for a rectangular domain

**Practice progression**

Item types: assume separation and derive the two ODEs, solve the spatial eigenvalue BVP, solve the time ODE for each eigenvalue, assemble the superposition, apply the IC using Fourier orthogonality to find coefficients. Suggested item count: 6.

Single-mode IC (as above) → two-mode IC → general IC (Fourier series of IC) → Neumann BCs (cosine eigenfunctions)

**Assessment objectives**

Formats: full solve of a heat or wave equation with given BCs and IC, determine separation constant and eigenvalues for a given BVP, apply IC using Fourier expansion to find all coefficients cₙ. Bloom alignment: apply.

Mastery signal: Correctly separates, solves both ODEs, assembles superposition, and applies IC in ≥ 4 of 5 problems

**Teacher notes**

The four-step structure (separate → solve spatial BVP → solve time ODE → superpose and apply IC) is a complete algorithm that applies to all three canonical PDE types (heat, wave, Laplace). Once students master this algorithm, they can solve most textbook PDE problems mechanically.

**Student notes**

Separation of variables has five moves: (1) assume u = X(x)T(t); (2) substitute and separate — both sides = −λ; (3) solve X'' + λX = 0 with BCs → eigenvalues λₙ and eigenfunctions Xₙ; (4) solve the T-ODE for each λₙ; (5) sum: u = ΣcₙXₙTₙ, and use the IC + Fourier orthogonality to get cₙ. Memorize these five moves.

**Prerequisite graph**

- Requires: math.de.pde, math.de.fourier-series, math.de.bvp
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Separation of variables directly produces the Sturm-Liouville eigenvalue problem (math.de.sturm-liouville) for the spatial factor X. The eigenfunction expansion (math.de.eigenfunction-expansion) gives the formula for the coefficients cₙ. The spatial eigenfunctions are Fourier sine/cosine (math.de.fourier-sine-cosine) for the standard rectangular domain with Dirichlet/Neumann BCs.

**Teaching hints — review triggers**

- Student does not recognize the separation X''/X = T'/T as requiring both sides to be constant
- Student cannot solve the Sturm-Liouville eigenvalue problem X'' + λX = 0 with Dirichlet BCs
- Student applies ICs before superposing (applies IC to a single mode rather than to the full series)

**Spaced repetition / revision guidance**

If separation gives an equation that cannot be separated cleanly (some x and t still appear on the same side), the PDE may not be separable in rectangular coordinates. Try a different coordinate system (polar for circular domains) or verify that the PDE is linear with the assumed form of BCs.

---

### Heat Equation

*Concept ID: `math.de.heat-equation` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 7h*

**Learning objective.** Solve the heat equation u_t = ku_xx on a finite interval with Dirichlet or Neumann BCs by separation of variables and Fourier series, and on the whole line using the Fourier transform giving the Gaussian heat kernel u(x,t) = (1/√(4πkt))∫f(y)e^{−(x−y)²/(4kt)}dy.

u_t = k·u_{xx} (parabolic). Models heat diffusion and Brownian motion. Solved on finite intervals by separation of variables + Fourier series; on the full line by Fourier transform giving Gaussian kernel solution.

The heat equation u_t = ku_xx models temperature diffusion: heat flows from high to low concentration at rate k. On a finite interval [0,L] with BCs (e.g., u(0,t) = u(L,t) = 0), separation of variables gives u(x,t) = Σcₙ sin(nπx/L)e^{−k(nπ/L)²t}, with cₙ from the Fourier sine series of the initial condition u(x,0) = f(x). Higher modes decay faster (rate proportional to n²), so only the low-frequency content survives for large t. On the infinite line, the Fourier transform gives the explicit formula u(x,t) = ∫f(y)·Φ(x−y,t)dy where Φ(x,t) = (1/√(4πkt))e^{−x²/(4kt)} is the heat kernel — a Gaussian that spreads over time. Key physical properties: infinite speed of propagation (unlike the wave equation), time-irreversibility, and immediate smoothing of any initial data.

**Key ideas**

- Finite domain: u = Σcₙ sin(nπx/L)e^{−kn²π²t/L²}; coefficients cₙ from Fourier sine IC expansion
- Mode decay: the nth mode decays as e^{−kn²π²t/L²} — higher modes decay faster
- Infinite line: u(x,t) = (1/√(4πkt))∫f(y)e^{−(x−y)²/(4kt)}dy (Gaussian smoothing)
- Heat kernel Φ(x,t) = (1/√(4πkt))e^{−x²/(4kt)}: Gaussian with standard deviation √(2kt) growing as √t
- Maximum principle: the maximum temperature cannot exceed the initial maximum (no creation of heat without a source)

**Vocabulary**

- **heat equation** — u_t = ku_xx (parabolic PDE); models temperature diffusion with diffusivity k; solved by separation + Fourier series on finite intervals, or by the Fourier transform giving the Gaussian heat kernel on ℝ.
- **heat kernel** — Φ(x,t) = (1/√(4πkt))e^{−x²/(4kt)}; the fundamental solution of the heat equation on ℝ; u(x,t) = ∫f(y)Φ(x−y,t)dy for initial data f.
- **maximum principle** — The maximum value of u(x,t) (for the heat equation) over a closed region [0,L]×[0,T] is attained on the boundary — either at t = 0 (initial data) or at x = 0,L (spatial boundary); no interior maximum is created.

**Common misconceptions**

- *Misconception:* Heat propagates at finite speed (like sound or light)
  *Correction:* The heat equation implies instantaneous propagation: for any t > 0, the solution u(x,t) is nonzero everywhere on ℝ even if the initial data f has compact support. The Gaussian heat kernel is nonzero everywhere for t > 0. However, the effect decays exponentially fast with distance — physically, the propagation speed is 'infinite' but the influence is negligibly small far away.
- *Misconception:* The heat equation is time-reversible (like the wave equation)
  *Correction:* The heat equation is irreversible: if you know u(x,t) for some t > 0 and try to recover u(x,0) by solving backward, the problem is ill-posed (the backward heat equation amplifies high-frequency errors exponentially). The wave equation is time-reversible — reversing time t → −t gives another wave equation. The heat equation is not.
- *Misconception:* The higher Fourier modes persist as long as the lower modes
  *Correction:* The nth mode decays as e^{−kn²π²t/L²}, so higher modes decay faster: mode 2 decays 4× faster than mode 1, mode 10 decays 100× faster. For large t, only the fundamental mode (n = 1) survives — the temperature profile asymptotically approaches a single sinusoidal shape before decaying to zero.

**Common mistakes in practice**

- Using e^{−n²t} instead of e^{−kn²π²t/L²} (forgetting k, π², or L factors)
- Confusing Fourier sine series (Dirichlet BCs) with Fourier cosine series (Neumann BCs) in the mode expansion
- Claiming the solution at large t is cₙ sin(nπx/L) for the largest n (it's the smallest n — smallest eigenvalue survives longest)

**Visual teaching opportunities**

- Heat kernel animation: Φ(x,t) starting as a very narrow spike at t = 0⁺ and spreading into a widening Gaussian as t increases
- Mode decay comparison: plot c₁sin(πx/L)e^{−k₁t} and c₂sin(2πx/L)e^{−4k₁t} on the same axes, showing mode 2 decaying 4× faster
- Finite vs. infinite domain: temperature in a finite rod (Fourier series, all modes decay to zero as t → ∞) vs. infinite rod (Gaussian kernel, temperature spreads but does not decay to zero if total heat is conserved)

**Worked example**

*Setup:* Solve u_t = 2u_xx on 0 < x < π, u(0,t) = u(π,t) = 0, u(x,0) = sin(x) + 3sin(2x).

1. Step 1: Apply separation of variables. General solution u = Σcₙ sin(nx)e^{−2n²t} (with k = 2, L = π, so λₙ = n², and decay factor e^{−2·n²·t}). Why: standard heat equation result with Dirichlet BCs.
2. Step 2: Apply IC. u(x,0) = Σcₙ sin(nx) = sin(x) + 3sin(2x). By Fourier orthogonality: c₁ = 1, c₂ = 3, cₙ = 0 for n ≥ 3. Why: the IC is already a finite Fourier sine series.
3. Step 3: Write the solution. u(x,t) = sin(x)e^{−2t} + 3sin(2x)e^{−8t}. Why: substitute c₁ = 1, c₂ = 3, decay rates e^{−2·1²·t} and e^{−2·2²·t}.
4. Step 4: Analyze large-t behavior. As t → ∞: the e^{−8t} term decays 4× faster than e^{−2t}, so the n = 2 mode becomes negligible first. For large t, u ≈ sin(x)e^{−2t} — the fundamental mode dominates. Why: higher modes decay exponentially faster.

*Outcome:* u(x,t) = sin(x)e^{−2t} + 3sin(2x)e^{−8t}. Verification: u_t = −2sin(x)e^{−2t} − 24sin(2x)e^{−8t}; u_xx = −sin(x)e^{−2t} − 12sin(2x)e^{−8t}; 2u_xx = −2sin(x)e^{−2t} − 24sin(2x)e^{−8t} = u_t. ✓

**Real-world intuition**

- Thermal diffusion in a metal rod: cooling from a non-uniform initial temperature toward thermal equilibrium
- Brownian motion: the probability density of a diffusing particle satisfies the heat equation
- Option pricing: the Black-Scholes equation is a heat equation (parabolic PDE) for the option value
- Image diffusion: the heat equation applied to image intensity smooths noise

**Practice progression**

Item types: compute cₙ from the IC using Fourier sine series, write the full solution u(x,t), analyze the large-t dominant mode, solve with Neumann BCs (cosine eigenfunctions), interpret physically (which modes decay first). Suggested item count: 6.

Single-mode IC → two-mode IC → general IC needing Fourier computation → Neumann BCs → infinite line (heat kernel)

**Assessment objectives**

Formats: full solve for heat equation with given BCs and IC, identify dominant mode for large t, write the heat kernel formula and explain its physical meaning. Bloom alignment: apply.

Mastery signal: Correctly applies separation of variables, computes Fourier coefficients, assembles solution, and interprets mode decay in ≥ 4 of 5 problems

**Teacher notes**

The physical story of mode decay is the key insight: the heat equation is a 'low-pass filter in time.' High-frequency spatial patterns decay fast; low-frequency patterns persist. This explains why hot spots smooth out quickly (high-frequency) while the overall temperature distribution (low-frequency) persists longer.

**Student notes**

The heat equation has one key structure: each mode decays exponentially, with the decay rate proportional to n². This means: (1) the solution is always a decaying sum of sine/cosine waves; (2) as t → ∞, only the lowest mode survives; (3) the solution is always smoother than the initial data for t > 0 (the heat equation smooths everything instantly).

**Prerequisite graph**

- Requires: math.de.separation-of-variables-pde, math.de.fourier-series
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The heat equation is the canonical parabolic PDE (math.de.pde). Its solution by separation of variables (math.de.separation-of-variables-pde) produces the Fourier sine series (math.de.fourier-sine-cosine). On the infinite line, the Fourier transform (math.de.fourier-transform) gives the heat kernel via the convolution theorem (math.de.convolution-theorem).

**Teaching hints — review triggers**

- Student cannot compute the Fourier sine series coefficients of the initial condition
- Student confuses the decay rate (kn²π²/L²) — does not correctly square n or include k
- Student does not know the heat kernel formula for the infinite-line problem

**Spaced repetition / revision guidance**

If the solution decays too fast or too slowly, check whether you correctly squared n in the decay rate (it should be e^{−kn²π²t/L²}). If the initial coefficients seem wrong, verify the Fourier sine series computation: cₙ = (2/L)∫₀^L f(x)sin(nπx/L)dx — note the 2/L factor.

---

### Wave Equation

*Concept ID: `math.de.wave-equation` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 7h*

**Learning objective.** Solve the one-dimensional wave equation u_tt = c²u_xx on finite and infinite domains using D'Alembert's formula and Fourier series, interpreting solutions as superposed travelling or standing waves.

u_{tt} = c²u_{xx} (hyperbolic). Models string vibrations, acoustics, and light. D'Alembert's solution u=f(x+ct)+g(x−ct) on the infinite line; Fourier series on finite intervals.

The wave equation u_tt = c²u_xx is a hyperbolic PDE governing vibrations, acoustics, and electromagnetic propagation. On the infinite line, D'Alembert's formula u = [f(x+ct)+f(x−ct)]/2 + (1/2c)∫g expresses the solution as two counter-propagating waves. On a finite interval with fixed ends, separation of variables produces a Fourier series of standing waves with frequencies nπc/L.

**Key ideas**

- Hyperbolicity and characteristics: the PDE has two real characteristic families x±ct=const along which disturbances travel; information propagates at finite speed c, contrasting with the infinite-speed parabolic heat equation.
- D'Alembert's solution on ℝ: for ICs u(x,0)=f(x) and u_t(x,0)=g(x), the unique solution is u(x,t)=[f(x+ct)+f(x−ct)]/2+(1/2c)∫_{x−ct}^{x+ct}g(s)ds — each part of the initial profile splits into two half-amplitude copies moving in opposite directions.
- Finite domain by Fourier series: fixed-end BCs u(0,t)=u(L,t)=0 force X_n=sin(nπx/L); the temporal factor satisfies T_n''+（nπc/L)²T_n=0, giving standing wave modes sin(nπx/L)[A_n cos(nπct/L)+B_n sin(nπct/L)].
- Normal modes and harmonics: the n-th mode vibrates at frequency n times the fundamental; energy is conserved and distributed across modes — striking a string at a node suppresses that mode while reinforcing others.
- Initial condition matching: A_n are the Fourier sine coefficients of f(x); B_n = (L/nπc)×(Fourier sine coefficients of g(x)); if g≡0 the string oscillates symmetrically around its initial shape.

**Vocabulary**

- **Wave speed c** — The speed at which a disturbance propagates along the medium; determines the slope of characteristics in the x-t plane.
- **D'Alembert's formula** — The explicit solution u=[f(x+ct)+f(x−ct)]/2+(1/2c)∫g for the wave equation on the full line, expressing u as two counter-propagating wave fronts.
- **Standing wave / normal mode** — A solution of the form sin(nπx/L)cos(nπct/L) in which every point oscillates in phase; the spatial shape is fixed and the amplitude oscillates in time.
- **Domain of dependence** — The set of initial data points that influence u(x₀,t₀); for the wave equation it is the interval [x₀−ct₀, x₀+ct₀] on the initial line.

**Common misconceptions**

- *Misconception:* Wave equation solutions behave like heat equation solutions — they smooth out and decay to zero as t→∞.
  *Correction:* The wave equation is energy-conserving (hyperbolic), not dissipative (parabolic). Energy redistributes among modes but is not lost; an undamped string oscillates forever without decay.
- *Misconception:* D'Alembert's formula requires the initial velocity g(x)=0 to apply.
  *Correction:* D'Alembert's formula handles both non-zero initial displacement f and non-zero initial velocity g; the velocity integral (1/2c)∫g provides the correction term that shifts the two wave fronts appropriately.
- *Misconception:* The solution on [0,L] is found by restricting D'Alembert's formula — simply limiting x to [0,L] satisfies the boundary conditions.
  *Correction:* D'Alembert's formula is for the full line ℝ; imposing fixed-end BCs requires the method of images (odd extension of f and g to all of ℝ) or, equivalently, Fourier sine series, which automatically encodes the boundary conditions.

**Common mistakes in practice**

- Using Fourier cosine series instead of Fourier sine series for fixed-end (Dirichlet) BCs — use sine series; cosine series is for insulated-end (Neumann) BCs.
- Forgetting the factor 1/(nπc/L) when computing B_n from the initial velocity: B_n=(L/nπc)×(Fourier sine coefficient of g).
- Applying D'Alembert's formula to a finite interval without the method of images, giving a solution that violates the boundary conditions.

**Visual teaching opportunities**

- Animate D'Alembert's solution: show the initial profile splitting into two identical half-amplitude pulses traveling left and right at speed c, merging and passing through each other.
- Standing wave diagrams: plot the first four normal modes sin(nπx/L)cos(nπct/L) and label nodes (fixed points) and antinodes; relate to guitar string harmonics.
- Characteristic grid: draw the x-t plane with characteristics x±ct=const shown as 45-degree lines; shade the domain of dependence for a point (x₀,t₀) and the domain of influence of an interval.

**Worked example**

*Setup:* Solve u_tt = u_xx (c=1), 0<x<π, t>0 with BCs u(0,t)=u(π,t)=0 and ICs u(x,0)=2sin(x)−sin(2x), u_t(x,0)=0.

1. Step 1: Assume u(x,t)=X(x)T(t). Substituting gives X''/X = T''/T = −λ. BCs X(0)=X(π)=0 force λ=n² with X_n=sin(nx), n=1,2,3,… Why: the separated spatial problem is the Sturm–Liouville eigenvalue problem on [0,π] with Dirichlet ends; these are the only non-trivial solutions.
2. Step 2: The temporal equation T_n''+n²T_n=0 has general solution T_n(t)=A_n cos(nt)+B_n sin(nt). Why: with c=1 and eigenvalue λ=n², the temporal ODE is simple harmonic with frequency n.
3. Step 3: Write u(x,t)=Σ_{n=1}^∞ [A_n cos(nt)+B_n sin(nt)]sin(nx). Apply u_t(x,0)=0: Σ n·B_n sin(nx)=0, so B_n=0 for all n. Why: the initial velocity is zero, so no sine-in-t component is needed.
4. Step 4: Apply u(x,0)=2sin(x)−sin(2x): Σ A_n sin(nx)=2sin(x)−sin(2x). By orthogonality of {sin(nx)}, read off A_1=2, A_2=−1, A_n=0 for n≥3. Why: Fourier sine series on [0,π] with L=π has coefficient formula (2/π)∫₀^π f(x)sin(nx)dx, but here f is already a finite Fourier sine series.
5. Step 5: Write the solution: u(x,t)=2sin(x)cos(t)−sin(2x)cos(2t). Why: two standing-wave modes, first harmonic with amplitude 2, second harmonic with amplitude −1, each oscillating at its natural frequency.
6. Step 6: Verify. u_tt=−2sin(x)cos(t)+4sin(2x)cos(2t). u_xx=−2sin(x)cos(t)+4sin(2x)cos(2t). So u_tt=u_xx=c²u_xx ✓ (c=1). BCs: u(0,t)=0 ✓, u(π,t)=2sin(π)cos(t)−sin(2π)cos(2t)=0 ✓. ICs: u(x,0)=2sin(x)−sin(2x) ✓, u_t(x,0)=−2sin(x)sin(0)+2sin(2x)sin(0)=0 ✓.

*Outcome:* u(x,t)=2sin(x)cos(t)−sin(2x)cos(2t); a superposition of two standing wave modes confirmed to satisfy the PDE, both boundary conditions, and both initial conditions.

**Real-world intuition**

- Vibrating strings: tension T, linear mass density μ give wave speed c=√(T/μ); normal modes correspond to musical harmonics of plucked or bowed instruments.
- Acoustics and sound: pressure waves in air satisfy the wave equation; D'Alembert solutions model how a struck gong's sound propagates outward from the source.
- Seismology: compressional (P-) and shear (S-) seismic waves both satisfy wave equations; wave speed determines travel time to seismograph stations used for earthquake location.

**Practice progression**

Item types: D'Alembert formula on infinite line (Gaussian pulse IC), Fourier series solution on finite interval with non-zero initial velocity, Identify normal modes and natural frequencies for a given domain, Energy conservation verification: show total energy constant, Domain of dependence/influence diagram for given (x₀,t₀), Physical interpretation: relate string length and tension to pitch. Suggested item count: 6.

Begin with zero-velocity ICs and a single Fourier mode; progress to multi-mode ICs and non-zero g(x); culminate in D'Alembert problems on the whole line with piecewise initial data.

**Assessment objectives**

Formats: Solve BVP with multi-mode IC and state solution explicitly, Given D'Alembert initial data, compute u at a specific (x,t) point, Identify domain of dependence and explain causality. Bloom alignment: apply.

Mastery signal: Student correctly identifies modal frequencies, applies Fourier coefficient formulas, and verifies the solution satisfies PDE and all four auxiliary conditions.

**Teacher notes**

Start with a physical demo — pluck a rubber band — to motivate the PDE before any formula. Distinguish D'Alembert (infinite line, propagation picture) from Fourier series (finite interval, standing-wave picture) as two complementary methods matched to different domain geometries. Emphasize energy conservation: total energy E=∫(u_t²+c²u_x²)dx/2 is constant in t for the wave equation, unlike the heat equation where energy decays.

**Student notes**

For finite-domain problems, the key workflow is: separate → solve X eigenvalue problem → solve T ODE → superpose → match ICs by Fourier coefficients. For infinite-domain problems, use D'Alembert and plug in f and g directly. Always check four conditions: the PDE, two BCs, and two ICs.

**Prerequisite graph**

- Requires: math.de.separation-of-variables-pde, math.de.fourier-series
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: The wave equation is the hyperbolic prototype alongside the elliptic Laplace equation and the parabolic heat equation — knowing all three completes the PDE classification picture. The standing-wave Fourier modes are eigenfunctions of the Sturm–Liouville problem on [0,L], connecting to the eigenfunction-expansion theory. The characteristic lines x±ct=const are the 1D analogue of the shock curves in nonlinear hyperbolic conservation laws studied in advanced PDE.

**Teaching hints — review triggers**

- Cannot separate variables or write the Fourier sine series → review separation-of-variables-pde and fourier-series.
- Confusion about D'Alembert vs. Fourier approaches → review pde-classification (hyperbolic vs. parabolic) and what domain/BCs apply to each method.
- Trouble verifying the PDE → review multivariable differentiation and the chain rule for partial derivatives.

**Spaced repetition / revision guidance**

Restate D'Alembert's formula from memory for the case g=0. For a three-mode IC (A₁sin(x)+A₂sin(2x)+A₃sin(3x) with g=0), write the solution immediately. Then verify it satisfies the PDE and BCs — this rehearses the full workflow.

---

### Laplace's Equation

*Concept ID: `math.de.laplace-equation` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.8 · Estimated study time: 7h*

**Learning objective.** Solve Laplace's equation ∇²u=0 on rectangular and circular domains by separation of variables, identify solutions as harmonic functions, and apply the mean-value property and maximum principle.

∇²u = u_{xx}+u_{yy} = 0 (elliptic). Solutions are harmonic functions, satisfying the mean value property and maximum principle. Solved on disks/rectangles by separation; on complex domains by conformal mapping.

Laplace's equation ∇²u=u_xx+u_yy=0 is the canonical elliptic PDE; its solutions are called harmonic functions. Unlike the heat and wave equations, Laplace's equation is a steady-state problem with no time variable — boundary conditions completely determine the interior. On a rectangle, separation of variables produces products of trigonometric and hyperbolic functions; on a disk, it produces Fourier–Poisson series in polar coordinates.

**Key ideas**

- Elliptic character: Laplace's equation has no real characteristics; information from every boundary point influences every interior point simultaneously, making it a pure boundary-value problem.
- Separation on a rectangle: assume u(x,y)=X(x)Y(y); the separated equations are X''+λX=0 and Y''−λY=0 (or vice versa). The homogeneous BC on one pair of sides determines the eigenvalues λ; the remaining factor satisfies a hyperbolic equation whose constants match the fourth BC via Fourier coefficients.
- Superposition and Fourier matching: when three sides are zero and one side carries data f(x), write u=Σ c_n sin(nπx/L)sinh(nπy/L) and match f(x)=Σ c_n sin(nπx/L)sinh(nπb/L) — a Fourier sine problem.
- Polar coordinates on a disk: u(r,θ)=A₀+Σ r^n(A_n cos(nθ)+B_n sin(nθ)) is the bounded-at-origin general solution; for r≤a with u(a,θ)=f(θ), the Poisson integral formula gives an explicit expression.
- Physical meaning: Laplace's equation describes electrostatic potential in charge-free regions, steady-state temperature in a body with no heat sources, and the velocity potential of irrotational incompressible flow.

**Vocabulary**

- **Harmonic function** — A twice-continuously-differentiable function satisfying ∇²u=0; characterised by the mean-value property and the maximum principle.
- **Dirichlet problem** — Find a harmonic function on a domain Ω with prescribed values on the boundary ∂Ω; uniqueness follows from the maximum principle.
- **Poisson integral formula** — Explicit formula u(r,θ)=(a²−r²)/(2π)∫₀^{2π} f(φ)/[a²−2ar cos(θ−φ)+r²]dφ giving the harmonic function on a disk of radius a in terms of boundary data f(φ).
- **Superposition principle (Laplace)** — Because the equation is linear and homogeneous, solutions may be added; used to decompose a problem with multiple non-zero BCs into a sum of simpler sub-problems.

**Common misconceptions**

- *Misconception:* Laplace's equation always has the same separable form X(x)Y(y) regardless of domain.
  *Correction:* The separated ODE pair depends on which direction is chosen homogeneous first. On a rectangle with u=0 on left/right sides, X satisfies the oscillatory equation (eigenvalues λ>0); on a disk in polar coordinates, the angular equation is oscillatory and radial is Euler-type — the split is domain-geometry-dependent.
- *Misconception:* The general solution u=Σ c_n sin(nπx/L)sinh(nπy/L) handles arbitrary BCs on all four sides at once.
  *Correction:* Each series handles exactly one non-homogeneous BC (the other three must be zero). For mixed non-zero BCs on multiple sides, decompose u=u₁+u₂+u₃+u₄ where each u_k has exactly one non-zero BC, solve each, and add.
- *Misconception:* Laplace's equation on an unbounded domain always has a unique solution given BC data.
  *Correction:* Uniqueness requires a growth condition at infinity (e.g., u bounded or u→0); without it, u=xy is harmonic on the whole plane and satisfies u=0 on the x-axis, showing infinitely many solutions exist.

**Common mistakes in practice**

- Choosing Y''−λY=0 but then forgetting the correct relationship: if X''+λX=0 with λ>0, then Y''−λY=0 has sinh/cosh solutions (not sin/cos).
- Writing c_n = (2/L)∫f(x)sin(nπx/L)dx without dividing by sinh(nπb/L) — the factor sinh(nπb/L) arises from Y_n(b) and must appear in the denominator.
- Treating the Laplace equation as if it were time-dependent and trying to propagate an initial condition — Laplace's equation is a boundary-value problem, not an initial-value problem.

**Visual teaching opportunities**

- Colour-map the solution u(x,y) on the unit square with u(x,1)=sin(πx) and all other sides zero — the smooth interior interpolation illustrates that harmonic functions can have no local extrema in the interior.
- Poisson kernel diagram: draw a circle of radius a, shade the contribution of a boundary arc to an interior point P, and show the Poisson kernel weight w(r,θ−φ)=(a²−r²)/(a²−2ar cos(θ−φ)+r²) as a function of angle.
- Superposition decomposition: for a square with all four sides carrying data, show the four sub-problems u₁, u₂, u₃, u₄ with one non-zero side each, and their sum.

**Worked example**

*Setup:* Solve ∇²u=0 on the unit square [0,1]×[0,1] with u(0,y)=0, u(1,y)=0, u(x,0)=0, u(x,1)=sin(πx).

1. Step 1: Assume u(x,y)=X(x)Y(y). Substituting into u_xx+u_yy=0 gives X''/X=−Y''/Y=−λ. Why: the ratio X''/X depends only on x and −Y''/Y only on y, so both must equal the same constant −λ.
2. Step 2: BC u(0,y)=u(1,y)=0 for all y requires X(0)=X(1)=0. The equation X''+λX=0 with these Dirichlet BCs has eigenvalues λ_n=(nπ)² and eigenfunctions X_n=sin(nπx), n=1,2,3,… Why: this is the standard Sturm–Liouville problem on [0,1].
3. Step 3: Y''−n²π²Y=0 with Y(0)=0. General solution: Y(y)=A sinh(nπy)+B cosh(nπy). BC Y(0)=0: B=0. So Y_n=sinh(nπy). Why: the y-equation is hyperbolic (positive λ), and Y(0)=0 eliminates the cosh term.
4. Step 4: General solution u(x,y)=Σ c_n sin(nπx)sinh(nπy). Apply u(x,1)=sin(πx): Σ c_n sin(nπx)sinh(nπ)=sin(πx). By orthogonality on [0,1], c₁ sinh(π)=1 and c_n=0 for n≥2. Thus c₁=1/sinh(π). Why: sin(πx) is already the n=1 Fourier sine mode, so only one term survives.
5. Step 5: Solution: u(x,y)=sin(πx)sinh(πy)/sinh(π). Why: the single-mode structure arises because the boundary data is exactly one eigenfunction of the x-problem.
6. Step 6: Verify. u_xx=−π²sin(πx)sinh(πy)/sinh(π). u_yy=π²sin(πx)sinh(πy)/sinh(π). Sum: u_xx+u_yy=0 ✓. BCs: u(0,y)=0 ✓, u(1,y)=sin(π)sinh(πy)/sinh(π)=0 ✓, u(x,0)=sin(πx)·0=0 ✓, u(x,1)=sin(πx)sinh(π)/sinh(π)=sin(πx) ✓.

*Outcome:* u(x,y)=sin(πx)sinh(πy)/sinh(π); a harmonic function on the unit square satisfying all four boundary conditions, with interior values forming a smooth mountain ridge peaking at (1/2,1).

**Real-world intuition**

- Electrostatics: the electric potential V in a charge-free region satisfies ∇²V=0; solving Laplace's equation on a conducting box with prescribed wall voltages gives the potential everywhere inside.
- Steady-state heat conduction: a thin metal plate in thermal equilibrium (no heat sources) has temperature satisfying ∇²T=0; boundary temperatures are the data.
- Fluid mechanics: the velocity potential φ of steady, irrotational, incompressible flow satisfies ∇²φ=0; streamlines are perpendicular to equipotential lines.

**Practice progression**

Item types: Rectangle with non-zero BC on the bottom side (requires cosh term), Rectangle with two non-zero sides (superposition of two sub-problems), Poisson integral formula on a disk: given f(θ), compute u at a specific interior point, Verify a given function is harmonic by computing u_xx+u_yy=0, Identify the physical quantity modelled by Laplace's equation in a given scenario, Polar-coordinate solution on an annulus. Suggested item count: 6.

Start with single-mode rectangle BCs; advance to multi-mode Fourier coefficient computation; progress to polar-coordinate disk problems.

**Assessment objectives**

Formats: Solve a rectangle BVP with a multi-term BC (requires Fourier coefficient integral), Verify that a given u satisfies ∇²u=0 and the stated BCs, Explain why the maximum of a harmonic function on a closed region occurs on the boundary. Bloom alignment: apply.

Mastery signal: Student sets up and solves the eigenvalue problem correctly, computes Fourier coefficients via the sinh-normalisation, and states the maximum principle without being told to.

**Teacher notes**

Stress that the separation works because one pair of BCs is homogeneous — always make those sides zero first when choosing which variable gets the oscillatory equation. The sinh/cosh choice vs. exp is a matter of algebra convenience; sinh is preferred because sinh(0)=0 directly satisfies one BC. The Poisson formula is worth stating even if not derived, as it proves existence and regularity of the Dirichlet problem.

**Student notes**

Template for rectangle problems: (1) identify which two BCs are zero, (2) write X eigenvalue problem, (3) match BC to get λ_n, (4) solve Y equation with sinh/cosh, (5) apply Y(0)=0 or Y(b)=0, (6) write series, (7) match the one non-zero BC with Fourier coefficients.

**Prerequisite graph**

- Requires: math.de.separation-of-variables-pde
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.cx.harmonic-functions
- Narrative: Laplace's equation is the static limit of both the heat equation (u_t=∇²u → 0 as t→∞) and a wave equation (u_tt=∇²u with no oscillation). Its solutions are analytic, connecting to complex analysis via harmonic functions as the real/imaginary parts of analytic functions (Cauchy–Riemann equations). The Poisson integral formula is the elliptic analogue of the Fourier representation used in the heat kernel.

**Teaching hints — review triggers**

- Difficulty setting up the separated ODEs → review separation-of-variables-pde and the Sturm–Liouville eigenvalue problem.
- Cannot compute Fourier sine coefficients for the boundary data → review fourier-sine-cosine.
- Confusion between sinh and cosh and when to use each → review hyperbolic functions and initial/boundary condition matching.

**Spaced repetition / revision guidance**

Without notes, write out the four BC types for a rectangle and describe which pair should be made homogeneous first. Then write the n=1 term of the solution series for u(x,1)=sin(πx) from memory. Verify u_xx+u_yy=0 for that one term — this rehearses both computation and the verification step.

---

### Harmonic Functions

*Concept ID: `math.de.harmonic-functions` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.75 · Estimated study time: 5h*

**Learning objective.** State and apply the defining properties of harmonic functions — the mean-value property, the maximum/minimum principle, and uniqueness of the Dirichlet problem — and connect harmonic functions to analytic complex functions via the Cauchy–Riemann equations.

Functions satisfying ∇²u=0. Key properties: mean value property (value at a point equals average over any surrounding sphere/circle), maximum/minimum principle (extrema only on boundary), uniqueness of Dirichlet problem.

A harmonic function u is a smooth solution of ∇²u=0. Three structural theorems dominate the theory: the mean-value property (the value at any point equals the average over any ball centred there), the maximum/minimum principle (extrema occur only on the boundary of bounded domains), and the uniqueness theorem (the Dirichlet problem has at most one solution). Together, these properties make harmonic functions among the most rigid and well-behaved objects in analysis.

**Key ideas**

- Mean-value property (MVP): if u is harmonic on a domain Ω then for any ball B_r(x₀)⊂Ω, u(x₀)=(1/|∂B_r|)∫_{∂B_r} u dS; in 2D, u(x₀,y₀)=(1/2π)∫₀^{2π} u(x₀+r cosθ, y₀+r sinθ)dθ. The MVP characterises harmonic functions among continuous functions.
- Maximum/minimum principle: a harmonic function on a closed bounded domain Ω̄ attains its maximum and minimum on the boundary ∂Ω; it cannot have an interior extremum unless it is constant. This is an immediate consequence of the MVP.
- Uniqueness via the maximum principle: if u and v both solve ∇²u=f on Ω with u=v on ∂Ω, then w=u−v is harmonic and zero on ∂Ω; by the maximum principle w≡0 on Ω̄, so u=v — uniqueness proven.
- Connection to complex analysis: if f(z)=u(x,y)+iv(x,y) is analytic, then u and v both satisfy ∇²u=∇²v=0 by the Cauchy–Riemann equations u_x=v_y, u_y=−v_x. This gives a rich supply of harmonic functions from analytic functions and vice versa.
- Regularity: harmonic functions are real analytic — infinitely differentiable, with convergent power series in any ball inside the domain. No singularities can develop inside a region where the function is harmonic.

**Vocabulary**

- **Mean-value property (MVP)** — The value of a harmonic function at any point equals its average over any sphere (or circle in 2D) centred at that point; characterises harmonic functions.
- **Maximum principle** — A harmonic function on a bounded domain cannot attain its maximum or minimum in the interior unless it is identically constant; extrema are always on the boundary.
- **Harmonic conjugate** — Given harmonic u, the function v satisfying u_x=v_y and u_y=−v_x (Cauchy–Riemann); then f=u+iv is analytic and v is also harmonic.
- **Dirichlet problem** — Boundary-value problem: find harmonic u on Ω with u=g prescribed on ∂Ω; the maximum principle guarantees at most one solution.

**Common misconceptions**

- *Misconception:* The mean-value property only holds for circles in 2D, not spheres in 3D.
  *Correction:* The MVP holds in all dimensions: in ℝⁿ, the value at the centre equals the average over any sphere ∂B_r and also the average over the ball B_r. The 2D and 3D versions are the same theorem.
- *Misconception:* A harmonic function can be zero on the boundary and non-zero inside.
  *Correction:* By the maximum principle, if u=0 on ∂Ω then u≡0 on all of Ω̄; a harmonic function cannot 'hide' non-zero values in the interior while vanishing on the boundary.
- *Misconception:* The maximum principle applies to all solutions of u_xx+u_yy=f, even with a non-zero source term f.
  *Correction:* The strong maximum principle is specific to harmonic functions (f=0). For Poisson's equation ∇²u=f≠0, interior extrema are possible — for example, u=−(x²+y²)/4 satisfies ∇²u=−1 and has an interior maximum at the origin.

**Common mistakes in practice**

- Computing only u_xx and forgetting u_yy, or computing ∇²u=(u_x)²+(u_y)² (the squared gradient magnitude) instead of u_xx+u_yy.
- Searching the interior for critical points of a harmonic function to find the max — critical points of harmonic functions are saddle points, never extrema.
- Claiming harmonic conjugate v is unique: v is determined up to an additive constant, and on multiply connected domains (e.g. an annulus) it may not be globally single-valued.

**Visual teaching opportunities**

- Plot u=x²−y² on a square; verify no interior max/min by plotting level curves — all extrema visually at corners; compute u on any circle centred at origin to demonstrate MVP numerically.
- Side-by-side: plot an analytic function f(z)=z² in the complex plane, then separately plot Re(f)=x²−y² and Im(f)=2xy as harmonic conjugates, showing both satisfy ∇²=0.
- Soap-film analogy: a soap film stretched over a wire boundary minimises area and satisfies (approximately) ∇²u=0 — no hills or valleys inside, showing why the maximum is always on the boundary.

**Worked example**

*Setup:* Let u(x,y)=x²−y². (a) Verify u is harmonic. (b) Verify the mean-value property at the origin using circles of radius r. (c) Identify the maximum and minimum of u on the square [0,1]².

1. Step 1 (Verify harmonic): u_x=2x, u_xx=2; u_y=−2y, u_yy=−2. So ∇²u=u_xx+u_yy=2+(−2)=0. ✓ Why: checking ∇²u=0 is the definition of harmonicity; any function of the form u=Re(zⁿ) for analytic zⁿ will be harmonic.
2. Step 2 (MVP check): Average of u on circle of radius r centred at origin: (1/2π)∫₀^{2π} u(r cosθ, r sinθ)dθ = (1/2π)∫₀^{2π}(r²cos²θ−r²sin²θ)dθ = (r²/2π)∫₀^{2π}cos(2θ)dθ = (r²/2π)[sin(2θ)/2]₀^{2π}=0 = u(0,0). ✓ Why: cos(2θ) integrates to zero over a full period; the MVP holds exactly, as required for a harmonic function.
3. Step 3 (Maximum principle on [0,1]²): Since u is harmonic, its max and min are on ∂([0,1]²). Evaluate at corners: u(0,0)=0, u(1,0)=1, u(0,1)=−1, u(1,1)=0. On the boundary edges, e.g. bottom edge y=0: u=x², max=1 at x=1; left edge x=0: u=−y², min=−1 at y=1. Max=1 at (1,0), Min=−1 at (0,1), both on boundary ✓. No interior extremum exists.
4. Step 4 (Cauchy–Riemann connection): u=x²−y²=Re(z²). The harmonic conjugate is v=2xy=Im(z²), since u_x=2x=v_y ✓ and u_y=−2y=−v_x ✓ (Cauchy–Riemann satisfied). So f(z)=z²=u+iv is analytic with harmonic real and imaginary parts. Why: this demonstrates the deep connection between harmonic functions and complex analysis — every harmonic u on a simply connected domain is the real part of some analytic function.

*Outcome:* u=x²−y² is confirmed harmonic via ∇²u=0; the MVP is verified by direct integration; the max=1 and min=−1 are located on the boundary, confirming the maximum principle; the harmonic conjugate v=2xy is identified via Cauchy–Riemann.

**Real-world intuition**

- Temperature distribution: in steady state (no heat sources), temperature satisfies ∇²T=0; the maximum temperature in a region must be at the boundary — the interior cannot be hotter than all boundaries.
- Complex potential in fluid flow: the complex velocity potential Φ=φ+iψ is analytic; φ (velocity potential) and ψ (stream function) are harmonic conjugates, making complex analysis a powerful tool for 2D fluid design.
- Gravitational potential: in empty space (no mass), the gravitational potential satisfies ∇²Φ=0; this constrains the possible shapes of gravitational fields.

**Practice progression**

Item types: Verify a given function is harmonic and find its harmonic conjugate, Apply the maximum principle to locate extrema on a given region, Use the MVP to evaluate a harmonic function at the centre of a circle given boundary values, Prove uniqueness of the Dirichlet problem using the maximum principle, Identify which of several given functions are harmonic, Construct a harmonic function from a given analytic function. Suggested item count: 6.

Start with direct ∇²u=0 verification; advance to identifying harmonic conjugates and analytic functions; culminate in proof-writing using the maximum principle.

**Assessment objectives**

Formats: Prove the uniqueness of the Dirichlet problem using the maximum principle (short proof), Given u on boundary, determine whether it achieves its max in the interior — justify, Find all harmonic polynomials of degree ≤3. Bloom alignment: analyze.

Mastery signal: Student can state the MVP and maximum principle precisely, verify harmonicity via ∇²u=0, and use the maximum principle as a proof tool for uniqueness.

**Teacher notes**

The maximum principle is the key structural result — stress it as a uniqueness tool, an impossibility argument, and a physical intuition ('heat cannot pool in the interior without a source'). Demonstrating MVP numerically for u=x²−y² on a circle with explicit integration is far more convincing than stating it abstractly. The link to complex analysis is worth one full slide: draw z-plane, show f(z)=z², split into real/imaginary parts, verify both harmonic.

**Student notes**

To check harmonicity: compute u_xx and u_yy, add them, check if the sum is zero. To find the max/min of a harmonic function on a closed region: only check boundary values — the interior is irrelevant by the maximum principle. For harmonic conjugates: integrate u_x=v_y and u_y=−v_x simultaneously to find v.

**Prerequisite graph**

- Requires: math.de.laplace-equation
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.cx.analytic-functions, math.cx.cauchy-riemann
- Narrative: Harmonic functions bridge real PDE theory (Laplace's equation, potential theory) and complex analysis (analytic functions, conformal mapping). The proof of the maximum principle uses a clever contradiction argument that reappears in ODE comparison theorems and parabolic PDE analysis. Sturm–Liouville theory describes the eigenfunctions used to build harmonic functions on specific domains via Fourier series.

**Teaching hints — review triggers**

- Cannot verify ∇²u=0 for a given function → review partial derivatives and mixed partial differentiation.
- Unclear on Cauchy–Riemann equations or analytic functions → review math.cx.cauchy-riemann before the complex-analysis applications.
- Trouble stating the maximum principle precisely → review the Laplace equation concept and its boundary-value character.

**Spaced repetition / revision guidance**

From memory: state the MVP precisely (including 'for all r'). Then state the maximum principle. Then explain in one sentence why uniqueness of the Dirichlet problem follows. Finally, give one explicit harmonic function (e.g. u=e^x cos(y)) and verify it.

---

### Poisson's Equation

*Concept ID: `math.de.poisson-equation` · Difficulty: expert · Bloom level: apply · Mastery threshold: 0.75 · Estimated study time: 5h*

**Learning objective.** Solve Poisson's equation ∇²u=f on bounded domains using the Green's function, interpret the solution as a superposition of point-source responses, and contrast with the Laplace problem.

∇²u = f; the nonhomogeneous version of Laplace's equation. Arises in electrostatics (Poisson's equation for potential), Newtonian gravity. Solved by Green's functions when f is a source term.

Poisson's equation ∇²u=f is the nonhomogeneous version of Laplace's equation; the right-hand side f represents a distributed source (charge density, heat source, mass distribution). The fundamental solution G₀(x) captures the response to a unit point source δ; by linearity u(x)=∫G(x,ξ)f(ξ)dξ assembles the response to a distributed f. In 1D, the Green's function is a piecewise linear tent function; in 2D/3D it involves logarithms and inverse powers.

**Key ideas**

- Relationship to Laplace: Poisson's equation reduces to Laplace's when f=0; every technique for Laplace (separation, Fourier series, Green's functions) extends to Poisson by adding a particular solution.
- Fundamental solution in ℝⁿ: the function G₀(x) satisfying ∇²G₀=δ(x) is G₀=(1/2π)ln|x| in 2D and G₀=−1/(4π|x|) in 3D; it is singular at the origin and gives the potential due to a point source.
- 1D Green's function: for −u''=f on [a,b] with u(a)=u(b)=0, the Green's function G(x,ξ)={(x−a)(b−ξ)/(b−a), x≤ξ; (ξ−a)(b−x)/(b−a), x≥ξ} is the tent function, continuous at x=ξ with a kink of slope −1.
- Solution formula: u(x)=∫_a^b G(x,ξ)f(ξ)dξ; the source f is weighted by G — sources far from x contribute less because G is smaller there.
- Physical interpretation: Poisson's equation ∇²V=−ρ/ε₀ in electrostatics gives the electric potential V due to a charge distribution ρ; each infinitesimal charge element dq=ρdV creates a potential 1/(4πε₀r) that superpose to give the total V.

**Vocabulary**

- **Fundamental solution** — The function G₀ satisfying ∇²G₀=δ(0) in all of ℝⁿ with appropriate decay at infinity; it is the building block for Green's functions on bounded domains.
- **Compatibility condition** — For Neumann BCs, ∫_Ω f dV = ∫_{∂Ω} (∂u/∂n) dS must hold (by the divergence theorem); if ∫f≠0 the Neumann Poisson problem has no solution.
- **Jump condition** — At x=ξ in the 1D Green's function, G is continuous but G_x has a jump of −1; this encodes the unit point source δ(x−ξ) in the ODE.
- **Superposition (Green's method)** — The solution u(x)=∫G(x,ξ)f(ξ)dξ expresses the response to distributed source f as an integral of point-source responses, using linearity.

**Common misconceptions**

- *Misconception:* Poisson's equation always requires a Green's function; it cannot be solved by the methods used for Laplace's equation.
  *Correction:* On simple domains (rectangles, disks) with favourable boundary conditions, Poisson's equation is often solved by eigenfunction expansion: write u=Σ u_n φ_n where φ_n are eigenfunctions of ∇², so ∇²u=Σ (−λ_n)u_n φ_n = f, giving u_n = (Fourier coeff. of f)/(−λ_n).
- *Misconception:* The 1D Green's function G(x,ξ) is symmetric: G(x,ξ)=G(ξ,x) only by coincidence.
  *Correction:* The symmetry G(x,ξ)=G(ξ,x) is a general theorem (self-adjointness of the operator with self-adjoint BCs), not a coincidence. It reflects the physical reciprocity principle: the response at x to a source at ξ equals the response at ξ to a source at x.
- *Misconception:* Poisson's equation ∇²u=f on an unbounded domain is automatically solvable for any f.
  *Correction:* On unbounded domains existence may fail or the solution may not be unique without growth/decay conditions. In ℝⁿ the convolution u=G₀*f exists only when f has sufficient decay; the compatibility condition ∫f=0 is required on bounded domains with Neumann BCs.

**Common mistakes in practice**

- Not splitting the integral at ξ=x (using the same formula for G throughout the entire integral), leading to an incorrect result.
- Forgetting the boundary condition contribution when G is derived on intervals other than [0,1].
- Confusing the fundamental solution G₀(x) (singular at origin, defined on all ℝⁿ) with the domain Green's function G(x,ξ) (regular on the domain, depends on BCs).

**Visual teaching opportunities**

- Plot the 1D Green's function G(x,ξ) on [0,1] for several values of ξ — each is a tent with peak at (ξ,ξ(1−ξ)); the solution u(x)=∫G(x,ξ)f(ξ)dξ is a weighted average of these tents.
- 2D point source: draw equipotential circles around a point charge — logarithmic decay in 2D versus 1/r decay in 3D; relate to the 2D and 3D fundamental solutions.
- Comparison: side by side, show the Laplace solution (f=0) and Poisson solution (f=1) on [0,1] with same BCs — the harmonic function is linear, while the Poisson solution bows upward due to the source.

**Worked example**

*Setup:* Solve −u''=1 on [0,1] with u(0)=u(1)=0 using the Green's function G(x,ξ) for the operator L=−d²/dx².

1. Step 1: Identify the Green's function. For L=−d²/dx² on [0,1] with zero Dirichlet BCs, G(x,ξ)=x(1−ξ) for x≤ξ and G(x,ξ)=ξ(1−x) for x≥ξ. Why: G solves −G_xx=δ(x−ξ) with G(0,ξ)=G(1,ξ)=0; it is constructed piecewise (left: Ax+B satisfying G=0 at x=0; right: Cx+D satisfying G=0 at x=1), matched at x=ξ by continuity (G continuous) and the jump condition G_x(ξ⁺)−G_x(ξ⁻)=−1.
2. Step 2: Apply the solution formula with f(ξ)=1: u(x)=∫₀¹G(x,ξ)·1 dξ=∫₀^x ξ(1−x)dξ+∫_x¹ x(1−ξ)dξ. Why: split the integral at x because G has different formulas on [0,x] and [x,1].
3. Step 3: Compute each piece. ∫₀^x ξ(1−x)dξ=(1−x)[ξ²/2]₀^x=(1−x)x²/2. ∫_x¹ x(1−ξ)dξ=x[ξ−ξ²/2]_x¹=x[(1−1/2)−(x−x²/2)]=x[1/2−x+x²/2]. Why: standard power-rule integration.
4. Step 4: Add: u(x)=(1−x)x²/2+x(1/2−x+x²/2)=x²/2−x³/2+x/2−x²+x³/2=x/2−x²/2=x(1−x)/2. Why: collect like powers; x³ terms cancel.
5. Step 5: Verify. u''=d²/dx²[x(1−x)/2]=d²/dx²[(x−x²)/2]=d/dx[(1−2x)/2]=−1. So −u''=1=f ✓. u(0)=0 ✓. u(1)=1(0)/2=0 ✓. Why: verification is essential — the Green's function formula must recover u''=−f and the BCs.

*Outcome:* u(x)=x(1−x)/2; a parabolic solution bowing upward between the two zero boundary values, with maximum u(1/2)=1/8 at the midpoint.

**Real-world intuition**

- Electrostatics: Poisson's equation ∇²V=−ρ/ε₀ gives the electric potential V due to a charge distribution ρ; Gauss's law is the integral form of this equation.
- Gravitational potential: ∇²Φ=4πGρ (Poisson's equation) gives the gravitational potential inside a mass distribution; the exterior (ρ=0) satisfies Laplace's equation.
- Image processing: Poisson's equation is used in seamless image cloning — blending gradients from a source image into a target image while matching boundary conditions.

**Practice progression**

Item types: Solve −u''=f(x) on [0,1] with zero BCs for f=x, Solve Poisson's equation on a rectangle using eigenfunction expansion, Verify the symmetry G(x,ξ)=G(ξ,x) for the 1D Green's function, Physical: find the electric potential inside a parallel-plate capacitor (1D Poisson), Compare harmonic (f=0) and Poisson (f≠0) solutions on the same domain, Identify the compatibility condition for Neumann Poisson BVP and explain its physical meaning. Suggested item count: 6.

Begin with constant f and zero BCs; advance to polynomial f; progress to the 2D eigenfunction expansion approach.

**Assessment objectives**

Formats: Solve a 1D Poisson BVP via Green's function and verify the result, Identify whether a Poisson problem with Neumann BCs is solvable and find u if so, Explain in words what G(x,ξ) represents physically. Bloom alignment: apply.

Mastery signal: Student correctly splits the Green's function integral at x, performs the integration, combines terms, and verifies via substitution back into the ODE.

**Teacher notes**

The most important conceptual step is deriving G from scratch for the 1D problem: left homogeneous solution, right homogeneous solution, two conditions (continuity + jump). Students who understand this derivation can generalise to 2D and 3D. Stress the symmetry G(x,ξ)=G(ξ,x) as a non-trivial theorem (self-adjointness / reciprocity) — it is never obvious from the formula.

**Student notes**

To solve −u''=f using Green's function on [0,1]: (1) write G(x,ξ)=x(1−ξ) for x≤ξ, ξ(1−x) for x≥ξ; (2) write u(x)=∫₀¹G(x,ξ)f(ξ)dξ; (3) split at ξ=x; (4) integrate each piece; (5) verify u''=−f and BCs.

**Prerequisite graph**

- Requires: math.de.laplace-equation
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.de.greens-function
- Narrative: Poisson's equation is the direct stepping stone to Green's function theory (math.de.greens-function), which generalises the integral formula to general linear operators and BCs. The eigenfunction expansion approach for Poisson on a rectangle uses the same Fourier series machinery as the heat and wave equations. In probability, Poisson's equation appears in the theory of Brownian motion and expected hitting times.

**Teaching hints — review triggers**

- Confusion between Laplace and Poisson — review the Laplace equation concept to see what changes when f≠0.
- Cannot split the integral at x → review piecewise function integration and the definition of the Green's function G(x,ξ).
- Trouble with the jump condition at x=ξ → preview math.de.greens-function for the full derivation.

**Spaced repetition / revision guidance**

Without notes, write the 1D Green's function G(x,ξ) for [0,1] from the two conditions (continuity at ξ, jump in G_x of −1). Then apply it to f=x: compute u(x)=∫₀^x ξ(1−x)·ξ dξ+∫_x¹ x(1−ξ)·ξ dξ, simplify, and verify u''=−x.

---

### Green's Function

*Concept ID: `math.de.greens-function` · Difficulty: research · Bloom level: analyze · Mastery threshold: 0.7 · Estimated study time: 9h*

**Learning objective.** Construct and apply the Green's function G(x,ξ) for a linear differential operator L satisfying LG=δ(x−ξ) with prescribed boundary conditions, and use it to express the solution of Lu=f as u(x)=∫G(x,ξ)f(ξ)dξ.

The Green's function G(x,ξ) is the response to a unit point source: LG=δ(x−ξ). Allows expressing solutions to Lu=f as u(x)=∫G(x,ξ)f(ξ)dξ. Encodes both operator and boundary conditions.

A Green's function G(x,ξ) is the impulse response of a linear differential operator L with fixed boundary conditions: it solves LG=δ(x−ξ) for each source location ξ. Because L is linear, the response to a distributed source f is the superposition u(x)=∫G(x,ξ)f(ξ)dξ. Constructing G requires solving the homogeneous equation on each side of ξ, imposing boundary conditions, and matching at x=ξ via the jump conditions (continuity of G and a jump in the highest derivative encoded by the delta function). The resulting G encodes both the operator and its boundary conditions.

**Key ideas**

- Impulse response interpretation: G(x,ξ) is the displacement/potential/temperature at point x caused by a unit point source (force/charge/heat) placed at ξ; integrating over all source locations ξ with weight f(ξ) gives the full response u(x).
- Construction in two steps: (1) solve the homogeneous equation Ly=0 separately on (a,ξ) and (ξ,b), imposing the left and right boundary conditions respectively; (2) match the two pieces at x=ξ using continuity of G and a jump of −1/p(ξ) in G_x (where p is the leading coefficient) — this encodes Lδ.
- Self-adjointness and symmetry: for a self-adjoint operator L with self-adjoint BCs, G(x,ξ)=G(ξ,x) — the response at x to a source at ξ equals the response at ξ to a source at x (reciprocity).
- Relation to eigenvalues: if Lφ_n=λ_n φ_n (the Sturm–Liouville eigenproblem), then G(x,ξ)=Σ φ_n(x)φ_n(ξ)/λ_n — the Green's function is the 'inverse of L' expanded in its own eigenfunctions.
- Extension to PDEs: in higher dimensions, G(x,ξ) solves LG=δ(x−ξ) with BCs; for the Laplacian on a half-space or ball, the method of images provides explicit formulas (image charge placed outside the domain to cancel boundary values).

**Vocabulary**

- **Green's function G(x,ξ)** — The solution of LG=δ(x−ξ) with homogeneous boundary conditions; the impulse response of the operator L.
- **Jump condition** — At x=ξ: G is continuous, but the (n−1)th derivative has a jump of 1/p(ξ) where p is the leading coefficient; encodes the delta-function source.
- **Reciprocity / symmetry G(x,ξ)=G(ξ,x)** — For self-adjoint operators, the response at x to a source at ξ equals the response at ξ to a source at x; a fundamental consequence of self-adjointness.
- **Method of images** — Construction of G for a bounded domain by placing fictitious 'image sources' outside the domain so that the combined free-space fundamental solution satisfies the BCs on the boundary.

**Common misconceptions**

- *Misconception:* The Green's function only works when the boundary conditions are homogeneous (zero).
  *Correction:* The standard derivation assumes homogeneous BCs for G; non-homogeneous BCs in the original problem Lu=f, u=h on ∂Ω are handled by writing u=u₀+w where u₀ satisfies the BCs (Poisson extension) and w=u−u₀ satisfies homogeneous BCs — then Green's function applies to w.
- *Misconception:* If LG=δ(x−ξ) has no closed form, the Green's function approach fails.
  *Correction:* Even when G has no closed form, the eigenfunction series G(x,ξ)=Σ φ_n(x)φ_n(ξ)/λ_n always provides a convergent representation (though slowly for x near ξ); numerically, G is evaluated by finite differences or boundary element methods.
- *Misconception:* The delta function δ(x−ξ) in LG=δ(x−ξ) means G is singular everywhere, so the integral ∫G f dξ diverges.
  *Correction:* G(x,ξ) is singular only as x→ξ (like ln|x−ξ| in 2D or 1/|x−ξ|^{n−2} in ℝⁿ, n≥3), and f is integrable; the resulting singularity is integrable, so the integral ∫G f dξ converges to the smooth solution u(x).

**Common mistakes in practice**

- Applying the jump condition with the wrong sign: for L=−d²/dx², the jump in G_x is −1 (not +1); for L=d²/dx², the jump would be +1 — always derive from LG=δ.
- Forgetting to divide by the leading coefficient p when writing the jump: for p(x)u''+ lower terms, the jump in G_x is −1/p(ξ), not always −1.
- Using the wrong BC for the left or right piece: G_L must satisfy the BC at the left endpoint (x=a), and G_R must satisfy the BC at the right endpoint (x=b).

**Visual teaching opportunities**

- 1D beam analogy: G(x,ξ) is the deflection of a beam at x when a unit load is applied at ξ; plot G(x,0.3) and G(x,0.7) on [0,1] — two tent shapes peaked at 0.3 and 0.7; their weighted average (by f) gives the deflection under distributed load f.
- Symmetry demonstration: plot G(x,ξ) as a surface over the (x,ξ) square — it should be symmetric about the diagonal x=ξ, visualising G(x,ξ)=G(ξ,x).
- Method of images for half-space: draw a charge q at point x₀=(0,h) above the x-axis and its image charge −q at (0,−h); their combined potential satisfies ∇²V=qδ(x−x₀) with V=0 on the x-axis — this is the Green's function for the upper half-plane.

**Worked example**

*Setup:* Construct G(x,ξ) for Lu=−u'' on [0,1] with BCs u(0)=u(1)=0, and use it to solve −u''=2x.

1. Step 1: Left piece (0<x<ξ): solve −G_xx=0 with G(0,ξ)=0. General solution: G=Ax+B; G(0,ξ)=0 gives B=0. So G_L(x,ξ)=Ax. Why: on (0,ξ) the equation is homogeneous; the BC at x=0 eliminates the constant.
2. Step 2: Right piece (ξ<x<1): solve −G_xx=0 with G(1,ξ)=0. General solution G=Cx+D; G(1,ξ)=0 gives D=−C. So G_R(x,ξ)=C(x−1). Why: BC at x=1 eliminates one constant.
3. Step 3: Match at x=ξ. Continuity: Aξ=C(ξ−1) → A=C(ξ−1)/ξ. Jump in G_x: G_x,R(ξ)−G_x,L(ξ)=C−A=−1 (jump of −1 for operator L=−d²/dx² with leading coefficient p=1). Substitute A: C−C(ξ−1)/ξ=−1 → C[1−(ξ−1)/ξ]=−1 → C[1/ξ]=−1 → C=−ξ. Then A=−ξ(ξ−1)/ξ=1−ξ. Why: the jump condition encodes the delta function source; for L=−d²/dx², −[G_x]=δ implies jump in G_x equals −1.
4. Step 4: G(x,ξ)=(1−ξ)x for x≤ξ; G(x,ξ)=ξ(1−x) for x≥ξ. Note: G(x,ξ)=G(ξ,x) ✓ (symmetric). Why: self-adjointness of L=−d²/dx² with zero Dirichlet BCs guarantees symmetry.
5. Step 5: Apply to f(x)=2x: u(x)=∫₀¹G(x,ξ)·2ξ dξ=∫₀^x ξ(1−x)·2ξ dξ+∫_x¹(1−ξ)x·2ξ dξ. Compute: ∫₀^x 2ξ²(1−x)dξ=(1−x)[2ξ³/3]₀^x=2x³(1−x)/3. ∫_x¹ 2ξx(1−ξ)dξ=2x∫_x¹(ξ−ξ²)dξ=2x[ξ²/2−ξ³/3]_x¹=2x[(1/2−1/3)−(x²/2−x³/3)]=2x[1/6−x²/2+x³/3]. So u(x)=2x³(1−x)/3+2x[1/6−x²/2+x³/3]=2x³/3−2x⁴/3+x/3−x³+2x⁴/3=x/3+2x³/3−x³−2x⁴/3+2x⁴/3=x/3−x³/3=x(1−x²)/3.
6. Step 6: Verify. u''=d²/dx²[x(1−x²)/3]=(1/3)d²/dx²[x−x³]=(1/3)d/dx[1−3x²]=(1/3)(−6x)=−2x. So −u''=2x=f(x) ✓. u(0)=0 ✓. u(1)=1(0)/3=0 ✓.

*Outcome:* G(x,ξ)=x(1−ξ) for x≤ξ and ξ(1−x) for x≥ξ. Solution to −u''=2x with zero BCs: u(x)=x(1−x²)/3, verified by differentiation.

**Real-world intuition**

- Structural engineering: the deflection of a beam under a distributed load is u(x)=∫G(x,ξ)f(ξ)dξ where G is the influence function for unit point load; engineers tabulate G for standard beam support conditions.
- Scattering theory in quantum mechanics: the Lippmann–Schwinger equation expresses scattered waves as an integral over the free-particle Green's function weighted by the potential; this underlies all of quantum scattering theory.
- Heat conduction with sources: the steady-state temperature in a rod with distributed heat sources q(x) is T(x)=∫G(x,ξ)q(ξ)dξ/k, where G encodes the rod's boundary conditions.

**Practice progression**

Item types: Construct G for −u''+u=f on [0,1] with zero BCs (involves sinh in homogeneous pieces), Use the eigenfunction series G=Σφ_n φ_n/λ_n to compute u for a given f, Verify G(x,ξ)=G(ξ,x) from the explicit formula, Method of images: construct G for Laplacian on upper half-plane, Apply 1D Green's function to a beam deflection problem under distributed load, Solve −u''=sin(πx) on [0,1] using G and verify. Suggested item count: 6.

Begin with −u''=f (constant coefficient); advance to −u''+cu=f (exponential homogeneous solutions); progress to PDE Green's functions and method of images.

**Assessment objectives**

Formats: Construct G(x,ξ) from scratch for a given operator and BCs, Verify that a given G satisfies LG=δ(x−ξ) with stated BCs, Use G to solve a specific BVP and verify the result. Bloom alignment: analyze.

Mastery signal: Student correctly applies two-step construction (homogeneous pieces + matching), obtains G, checks symmetry, and uses the integral formula to produce the solution with verification.

**Teacher notes**

Build intuition first: a beam deflects at every point when a single nail pushes at one point — G is that response map. The two-step construction (homogeneous pieces + matching) is the core algorithm; once mastered, it extends immediately to higher-order operators. Stress the jump condition as the non-trivial step that encodes the physics of the source. The eigenfunction series is important for proving existence and for numerics but is often secondary to the direct construction.

**Student notes**

Algorithm for 1D G(x,ξ): (1) solve Ly=0 on (a,ξ) with the left BC → G_L with one free constant; (2) solve Ly=0 on (ξ,b) with the right BC → G_R with one free constant; (3) two equations at x=ξ: continuity (G_L=G_R) and jump (G_R'−G_L'=−1/p) → solve for the two constants.

**Prerequisite graph**

- Requires: math.de.poisson-equation, math.de.ivp
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): math.fnal.distributions
- Narrative: Green's functions are the analytic tool that unifies ODE BVPs (1D), Poisson's equation (2D/3D), Sturm–Liouville eigenfunction theory (eigenfunction series for G), and quantum scattering theory (Lippmann–Schwinger). The convolution structure u=G∗f connects to the Fourier transform (convolution theorem) and to operator theory (G is the integral kernel of L^{−1}). In numerical methods, the boundary element method (BEM) discretises the Green's function integral instead of the full domain.

**Teaching hints — review triggers**

- Cannot solve the homogeneous equation Ly=0 for each piece → review the ODE type (second-order linear) and its general solution.
- Confused by the delta function delta(x−ξ) → review generalised functions and how ∫f(x)δ(x−ξ)dx=f(ξ) works.
- Not understanding how the jump condition arises → revisit the Poisson equation Green's function derivation in math.de.poisson-equation.

**Spaced repetition / revision guidance**

Write the 1D Green's function G(x,ξ) for L=−d²/dx² on [0,L] from scratch (no formula lookup). Apply it to f=1 to recover u=x(L−x)/2. Then verify by differentiating twice. This single exercise rehearses the entire method.

---

### Nonlinear ODE

*Concept ID: `math.de.nonlinear-ode` · Difficulty: expert · Bloom level: analyze · Mastery threshold: 0.7 · Estimated study time: 8h*

**Learning objective.** Analyse nonlinear ODEs using qualitative methods — equilibrium analysis, phase-line portraits for 1D systems, and phase-plane portraits for 2D systems — and solve special cases (logistic, Bernoulli, exact) exactly.

An ODE in which the unknown function or its derivatives appear nonlinearly. General analytic solutions rarely exist; qualitative theory (phase plane, Lyapunov, bifurcation) and numerical methods are primary tools.

A nonlinear ODE contains the unknown function or its derivatives raised to powers other than one, or products/functions of them. Unlike linear ODEs, nonlinear equations rarely have closed-form solutions; the primary toolkit is qualitative: find equilibria, classify their stability, sketch phase portraits, and use numerical solvers. A handful of nonlinear ODEs are exactly solvable (separable, Bernoulli, Riccati) — but these are exceptions, not the rule.

**Key ideas**

- Equilibria and stability: for dx/dt=f(x), equilibria x* satisfy f(x*)=0; linearisation gives x*'s stability: if f'(x*)<0 the equilibrium is stable (nearby trajectories approach it), if f'(x*)>0 it is unstable.
- Phase-line portrait (1D): plot f(x) vs x; where f>0 the solution increases, where f<0 it decreases; equilibria are zeros of f; arrows encode the flow and give the global behaviour of all solutions without solving the ODE.
- Superposition fails: nonlinear ODEs violate superposition — if u and v are solutions, αu+βv is generally NOT a solution; this rules out all linear algebra machinery and forces case-by-case analysis.
- Special solvable classes: separable (dx/f(x)=g(t)dt), Bernoulli (y'+p(x)y=q(x)yⁿ, linearise with v=y^{1−n}), exact equations, and Riccati equations; these are the exceptional cases where a closed-form solution exists.
- Numerical necessity: the logistic map, pendulum, van der Pol oscillator, and almost all ecological/economic models are nonlinear with no closed-form solution; Euler, Runge-Kutta, and adaptive step-size methods are the practical tools.

**Vocabulary**

- **Equilibrium (fixed point)** — A constant solution x*=const to x'=f(x); found by setting f(x*)=0; stable if f'(x*)<0, unstable if f'(x*)>0.
- **Phase-line portrait** — A 1D diagram showing arrows (flow direction) and equilibria for an autonomous ODE x'=f(x); encodes global behaviour without solving.
- **Finite-time blowup** — When the solution x(t) becomes infinite at a finite time T < ∞; occurs in equations like x'=x² but not in linear equations.
- **Logistic equation** — x'=rx(1−x/K); models bounded growth with equilibria x*=0 (unstable) and x*=K (stable carrying capacity); exact solution is the sigmoid 1/(1+Ce^{−rt}).

**Common misconceptions**

- *Misconception:* A nonlinear ODE with a unique initial condition always has a global solution for all t≥0.
  *Correction:* Nonlinear equations can have solutions that blow up in finite time (finite-time blowup): for example, x'=x², x(0)=1 has solution x=1/(1−t), which becomes infinite at t=1. The Existence–Uniqueness theorem guarantees only a local solution.
- *Misconception:* Because nonlinear ODEs have no general solution formula, nothing useful can be said about their solutions.
  *Correction:* Qualitative analysis (phase-line/phase-plane portraits, Lyapunov stability, Poincaré–Bendixson theorem) provides global information about solution behaviour — including equilibria, limit cycles, and long-time asymptotics — without needing any formula.
- *Misconception:* Two solutions of a nonlinear ODE with the same IC at t=0 must be identical for all t.
  *Correction:* Uniqueness is local: outside the domain where the Lipschitz condition holds, uniqueness can fail. The classic example: x'=3x^{2/3} has both x≡0 and x=t³ passing through (0,0), because f=3x^{2/3} fails Lipschitz at x=0.

**Common mistakes in practice**

- Forgetting to check f'(x*)=0 (degenerate/semi-stable equilibrium): if f'(x*)=0, the linearisation is inconclusive — examine f more carefully (e.g., x'=x² has x*=0 with f'(0)=0, but x*=0 is unstable because f(x)>0 for all x≠0).
- Treating nonlinear solutions as globally defined without checking for blowup — always verify the solution domain.
- Applying superposition to add two nonlinear solutions.

**Visual teaching opportunities**

- Phase-line portrait for dx/dt=rx(1−x/K): draw a parabola opening downward with zeros at x=0 and x=K; arrows pointing right for 0<x<K, left for x>K; equilibria x*=0 (unstable) and x*=K (stable).
- Slope-field + solution curves for x'=x²: slopes grow rapidly for large x; solutions curve sharply upward and blow up; x=0 is an unstable equilibrium.
- Side-by-side: linear (x'=ax) vs. nonlinear (x'=x(1−x)) phase lines, contrasting the all-or-nothing linear behaviour with the bounded logistic growth.

**Worked example**

*Setup:* Solve dx/dt=x(1−x) (logistic equation with r=1, K=1), x(0)=0.1. Find x(t) explicitly and determine the long-time behaviour.

1. Step 1: Identify the equation as separable: dx/[x(1−x)]=dt. Why: the right-hand side depends only on x, so the equation separates immediately.
2. Step 2: Partial fractions: 1/[x(1−x)]=A/x+B/(1−x). Multiply: 1=A(1−x)+Bx. At x=0: A=1. At x=1: B=1. So 1/[x(1−x)]=1/x+1/(1−x). Why: partial fractions decompose the rational integrand into two simple fractions.
3. Step 3: Integrate: ∫[1/x+1/(1−x)]dx=∫dt → ln|x|−ln|1−x|=t+C → ln|x/(1−x)|=t+C. Why: ∫1/(1−x)dx=−ln|1−x|+const (chain rule with inner derivative −1 offset).
4. Step 4: Exponentiate: x/(1−x)=Ae^t. With x(0)=0.1: 0.1/0.9=A → A=1/9. So x/(1−x)=e^t/9 → 9x=e^t(1−x)=(e^t)−xe^t → x(9+e^t)=e^t → x(t)=e^t/(9+e^t)=1/(1+9e^{−t}). Why: solving the algebraic equation for x after exponentiation; recognise the logistic sigmoid form.
5. Step 5: Long-time behaviour: as t→∞, e^{−t}→0, so x(t)→1/(1+0)=1=K. The population approaches the carrying capacity exponentially fast. As t→−∞, x→0, confirming x*=0 is an unstable equilibrium. Why: this phase-line conclusion is confirmed by the exact formula.
6. Step 6: Verify. x'= d/dt[e^t/(9+e^t)]=e^t(9+e^t)^{−1}−e^t·e^t(9+e^t)^{−2}=e^t/((9+e^t)²)[(9+e^t)−e^t]=9e^t/(9+e^t)². Also x(1−x)=[e^t/(9+e^t)]·[9/(9+e^t)]=9e^t/(9+e^t)². So x'=x(1−x) ✓. x(0)=1/(1+9)=0.1 ✓.

*Outcome:* x(t)=1/(1+9e^{−t}); a sigmoidal solution starting at 0.1, inflecting near x=0.5 at t=ln(9)≈2.197, and asymptotically approaching x=1. The qualitative phase-line analysis (K=1 is stable, x*=0 is unstable) is confirmed.

**Real-world intuition**

- Population biology: logistic growth dx/dt=rx(1−x/K) models species with a carrying capacity K; predator-prey (Lotka-Volterra) systems are 2D nonlinear and exhibit periodic oscillations.
- Epidemiology: the SIR model (dS/dt=−βSI, dI/dt=βSI−γI, dR/dt=γI) is a nonlinear system; the epidemic threshold R₀=β/γ determines whether an outbreak occurs.
- Chemical kinetics: reaction rates follow nonlinear ODEs (e.g., A+B→C has rate r=k[A][B], a product of two concentrations); oscillating reactions (Belousov–Zhabotinsky) arise from coupled nonlinear kinetics.

**Practice progression**

Item types: Phase-line portrait for dx/dt=f(x) — identify and classify all equilibria, Solve a Bernoulli equation by the substitution v=y^{1−n}, Sketch solution curves from a slope field for a nonlinear ODE, Finite-time blowup: find when x'=x² blows up for given IC, Logistic growth: find the inflection time t* and interpret it biologically, Identify whether an ODE is separable, Bernoulli, exact, or requires numerical methods. Suggested item count: 6.

Begin with phase-line classification of equilibria; advance to exact solution of special classes; progress to finite-time blowup analysis and Bernoulli substitution.

**Assessment objectives**

Formats: Given a nonlinear ODE, draw the phase line and classify all equilibria, Solve a separable nonlinear ODE with IC and determine long-time behaviour, Identify a Bernoulli equation and write the linearising substitution. Bloom alignment: analyze.

Mastery signal: Student correctly finds all equilibria, classifies each by sign of f'(x*), draws an accurate phase line with arrows, and explains the long-time behaviour without solving explicitly.

**Teacher notes**

Open with x'=x² and show it blows up at t=1 for x(0)=1 — this destroys the linear intuition that solutions are always global. Then contrast with x'=x(1−x): bounded nonlinearity, global solution. The logistic equation is ideal for the worked example because it is nonlinear yet exactly solvable, allowing students to verify the qualitative (phase-line) and quantitative (formula) analyses agree. Always emphasise that qualitative analysis is the primary tool when no formula exists.

**Student notes**

For any autonomous ODE x'=f(x): first find equilibria (zeros of f), then determine stability (sign of f'(x*) or sign of f(x) near x*), then draw the phase line. This tells you where every solution goes as t→±∞ without solving the ODE. Only attempt a formula if the equation is separable, Bernoulli, or exact.

**Prerequisite graph**

- Requires: math.de.first-order-ode, math.de.stability-analysis
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Nonlinear ODEs are the foundation for bifurcation theory (math.de.bifurcation) and chaos (math.de.chaos); the logistic equation's discrete analogue (logistic map x_{n+1}=rx_n(1−x_n)) exhibits both period-doubling cascades and full chaos as r increases. Stability analysis via Lyapunov functions (math.de.stability-analysis) extends to nonlinear systems. The phase-plane methods here extend to 2D systems (math.de.phase-plane) via the Jacobian linearisation.

**Teaching hints — review triggers**

- Cannot identify equilibria or compute f'(x*) → review first-order ODE and derivatives.
- Unfamiliar with partial fractions for integrating 1/[x(1−x)] → review math.calc.integration-techniques.
- Trouble with the Bernoulli substitution → review the linear first-order ODE as the target form after the substitution.

**Spaced repetition / revision guidance**

Without notes, draw the phase line for x'=x(1−x²) — find equilibria at x=−1,0,1; classify each by sign of f'(x*) = 1−3x²; draw arrows. Then state the long-time behaviour for initial conditions x(0)=0.5, x(0)=−0.5, x(0)=2. This rehearses the entire qualitative analysis workflow.

---

### Bifurcation Theory

*Concept ID: `math.de.bifurcation` · Difficulty: research · Bloom level: analyze · Mastery threshold: 0.65 · Estimated study time: 9h*

**Learning objective.** Identify the four classical bifurcation types (saddle-node, transcritical, pitchfork, Hopf) in nonlinear ODEs by analysing how equilibria are created, destroyed, or change stability as a parameter varies, and sketch bifurcation diagrams.

A bifurcation is a qualitative change in the solution structure of a system as a parameter crosses a critical value. Classic types: saddle-node, pitchfork, transcritical, Hopf. Each has a canonical normal form.

A bifurcation occurs when a qualitative change in the long-time behaviour of a dynamical system takes place as a parameter μ crosses a critical value μ_c. At bifurcation, the number or stability type of equilibria changes discontinuously. The four canonical 1D bifurcations each have a normal form: saddle-node (x'=μ−x²), transcritical (x'=μx−x²), supercritical pitchfork (x'=μx−x³), and subcritical pitchfork (x'=μx+x³). In 2D, the Hopf bifurcation creates or destroys a limit cycle.

**Key ideas**

- Bifurcation diagram: plot equilibria x*(μ) vs. the parameter μ; solid curves denote stable branches, dashed curves unstable; bifurcation points are where branches meet, split, or cross.
- Saddle-node bifurcation: normal form x'=μ−x²; equilibria x*=±√μ exist for μ>0, collide and annihilate at μ=0, none for μ<0; this is the generic mechanism by which equilibria appear/disappear.
- Transcritical bifurcation: normal form x'=μx−x²; equilibria x*=0 and x*=μ always exist but exchange stability at μ=0 — neither is created nor destroyed, only their stability properties swap.
- Pitchfork bifurcation: normal form x'=μx−x³ (supercritical); for μ≤0 only x*=0 (stable); for μ>0 x*=0 becomes unstable and two symmetric equilibria x*=±√μ appear (stable); subcritical pitchfork reverses this (μx+x³): two unstable branches for μ<0 collide with x*=0 at μ=0.
- Hopf bifurcation in 2D: as μ crosses μ_c, a pair of complex conjugate eigenvalues of the Jacobian cross the imaginary axis; a stable limit cycle (periodic orbit) is born (supercritical Hopf) or an unstable cycle disappears (subcritical Hopf); the amplitude of the cycle grows as ~√(μ−μ_c).

**Vocabulary**

- **Bifurcation** — A qualitative change in the number or stability of equilibria of a dynamical system as a parameter crosses a critical value.
- **Saddle-node bifurcation** — The generic bifurcation in which two equilibria (one stable, one unstable) collide and annihilate as μ crosses μ_c; normal form x'=μ−x².
- **Pitchfork bifurcation** — A bifurcation in which x*=0 changes stability and two symmetric branches ±√μ appear; supercritical (soft) if branches are stable, subcritical (hard) if unstable.
- **Hopf bifurcation** — A bifurcation in 2D+ systems in which a fixed point changes stability and a limit cycle (periodic orbit) is born or destroyed as complex eigenvalues cross the imaginary axis.

**Common misconceptions**

- *Misconception:* In a pitchfork bifurcation, equilibria are created or destroyed like in a saddle-node.
  *Correction:* In a pitchfork bifurcation x*=0 always exists; what changes is its stability, and two new equilibria bifurcate off the origin at μ=μ_c. No equilibrium is destroyed — the pitchfork name comes from the Y-shaped bifurcation diagram, not from annihilation.
- *Misconception:* Bifurcations can only occur in 2D or higher-dimensional systems.
  *Correction:* Saddle-node, transcritical, and pitchfork bifurcations all occur in 1D scalar equations x'=f(x,μ); a single equation depending on a single parameter is sufficient. Only Hopf bifurcation requires at least 2D.
- *Misconception:* If a system has a bifurcation at μ=μ_c, then the behaviour for μ slightly past μ_c is always easily predictable.
  *Correction:* Subcritical bifurcations produce hysteresis and hard transitions: the system can jump discontinuously to a distant attractor at μ_c rather than smoothly tracking the new branch — these are far more dangerous in engineering (buckling, cardiac arrhythmia) than supercritical bifurcations.

**Common mistakes in practice**

- Drawing solid curves for unstable branches and dashed for stable — the convention is solid=stable, dashed=unstable; confusing these gives the opposite physical interpretation.
- Claiming the pitchfork has only one equilibrium for μ<0: x*=0 always exists; only the two new branches ±√μ appear for μ>0.
- Not checking the sign of the cubic coefficient to distinguish super from subcritical pitchfork: for μx−x³ the cubic is −1 (supercritical); for μx+x³ it is +1 (subcritical).

**Visual teaching opportunities**

- Bifurcation diagram overlay: for the pitchfork x'=μx−x³, plot all equilibria x*(μ) with arrows showing stability; draw the solid V-shape for μ>0 (stable ±√μ) and dashed x*=0 for μ>0 (unstable), solid for μ<0 (stable).
- Normal-form phase lines at μ=−1,0,1: for saddle-node x'=μ−x², draw three phase lines side by side showing two equilibria (μ>0), one (μ=0), none (μ<0).
- Hopf animation: for van der Pol x'=y, y'=μ(1−x²)y−x near μ=0, animate the spiral inward/outward transition and the appearance of the limit cycle.

**Worked example**

*Setup:* Analyse all bifurcations of the system x'=μx−x³ (supercritical pitchfork normal form). Sketch the bifurcation diagram with stability indicated.

1. Step 1: Find equilibria. Set f(x,μ)=μx−x³=x(μ−x²)=0. Solutions: x*=0 (for all μ) and x*=±√μ (real only when μ>0). Why: factoring reveals that x*=0 always exists and two additional equilibria bifurcate from x*=0 when μ>0.
2. Step 2: Classify x*=0. f_x(x,μ)=μ−3x². At x*=0: f_x=μ. Stable when μ<0 (f_x=μ<0), unstable when μ>0 (f_x=μ>0). Why: the linearisation at an equilibrium determines local stability; negative derivative means perturbations decay.
3. Step 3: Classify x*=±√μ (exists for μ>0). f_x(±√μ,μ)=μ−3(√μ)²=μ−3μ=−2μ<0 for μ>0. So both x*=±√μ are stable for all μ>0. Why: they bifurcate as stable branches — this is the hallmark of the supercritical (soft, stable) pitchfork.
4. Step 4: Identify bifurcation type and point. At μ=0: x*=0 changes stability, and two equilibria emerge simultaneously. This is a supercritical pitchfork bifurcation at μ_c=0. Why: the simultaneous sign change of f_x and appearance of symmetric branches ±√μ with the same cubic structure match the pitchfork normal form exactly.
5. Step 5: Sketch bifurcation diagram. Horizontal axis μ, vertical axis x*. For μ<0: one solid branch x*=0. At μ=0: branching point. For μ>0: dashed x*=0 (unstable), two solid branches x*=±√μ (stable). The shape resembles a pitchfork or tuning fork — the Y-shape that names the bifurcation. Why: solid curves indicate stable equilibria (attractors), dashed indicates unstable (repellers).
6. Step 6: Physical interpretation. For μ<0 all trajectories converge to x*=0 (single stable state). As μ increases through 0, the origin becomes unstable and the system must choose between two equally valid stable states ±√μ — spontaneous symmetry breaking, like a ball balanced on an upended dome that falls to one side.

*Outcome:* Complete bifurcation diagram: x*=0 (stable) for μ<0, x*=0 (unstable) plus x*=±√μ (stable) for μ>0; bifurcation at μ=0 identified as supercritical pitchfork; physical interpretation as symmetry breaking.

**Real-world intuition**

- Structural buckling: the Euler buckling of a slender column under axial load is a supercritical pitchfork — below critical load, straight is stable; above it, the column buckles to one side (symmetry breaking).
- Laser threshold: below the pumping threshold, no laser output (stable zero); above threshold, coherent light oscillation begins — a Hopf or pitchfork bifurcation depending on the model.
- Population dynamics: the Allee effect produces a saddle-node bifurcation — at low population, x*=0 and x*=K coexist with an unstable equilibrium between them; below a critical size the population collapses to extinction.

**Practice progression**

Item types: Identify bifurcation type for x'=μ−x² (saddle-node), Sketch bifurcation diagram for x'=μx−x² (transcritical), Determine whether a pitchfork is super- or subcritical from the sign of the cubic coefficient, Given a 2D system, find where the Jacobian eigenvalues cross the imaginary axis (Hopf condition), Hysteresis: for subcritical pitchfork, describe the jump at μ=0 and the different jump-back value, Normal form identification: given f(x,μ), classify by Taylor expansion near x*=0, μ=0. Suggested item count: 6.

Start with identifying the normal form from f(x,μ) and phase-line analysis; advance to classifying super vs. subcritical; culminate in 2D Hopf bifurcation conditions and hysteresis loops.

**Assessment objectives**

Formats: Given f(x,μ), find all bifurcation points and classify each, Sketch the bifurcation diagram with correct stability markings, Explain why the subcritical pitchfork is more dangerous in engineering than the supercritical. Bloom alignment: analyze.

Mastery signal: Student correctly identifies all equilibria as functions of μ, classifies each by f_x sign, identifies the bifurcation type by matching to a normal form, and draws a diagram with correct solid/dashed stability notation.

**Teacher notes**

Emphasise that bifurcation theory is the bridge between 'find equilibria' (statics) and 'what happens as the system changes' (dynamics). Use engineering examples to make subcritical pitchforks visceral — a bridge that suddenly buckles is far more dangerous than one that gradually bends. The four normal forms should be memorised as archetypes; real-world systems are classified by matching their Taylor expansion near (x*,μ_c) to the relevant normal form.

**Student notes**

Workflow: (1) find equilibria from f(x,μ)=0 as functions of μ; (2) classify stability by sign of f_x at each equilibrium; (3) identify where stability changes or equilibria appear/disappear; (4) classify bifurcation type by comparing to normal forms; (5) sketch the bifurcation diagram.

**Prerequisite graph**

- Requires: math.de.nonlinear-ode, math.de.stability-analysis
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Bifurcation theory is the entry point to chaos theory (math.de.chaos): as a parameter is increased through a sequence of bifurcations (period-doubling cascade), the system transitions to chaotic dynamics. The Hopf bifurcation connects to the study of limit cycles in 2D (Poincaré–Bendixson). Structural stability theory asks which qualitative features of a phase portrait persist under small perturbations — bifurcation points are exactly where structural stability breaks down.

**Teaching hints — review triggers**

- Cannot find equilibria from f(x,μ)=0 → review nonlinear-ode equilibrium analysis.
- Unfamiliar with stability classification via f_x sign → review stability-analysis and linearisation.
- Confused by the bifurcation diagram axes → re-read the pitchfork example at μ=−1,0,1 explicitly before drawing the diagram.

**Spaced repetition / revision guidance**

From memory: write the four normal forms (saddle-node, transcritical, supercritical pitchfork, subcritical pitchfork). For the supercritical pitchfork x'=μx−x³, sketch the bifurcation diagram — include axes, all branches, stability markings, and label the bifurcation point. This is a five-minute exercise that encodes the entire concept.

---

### Chaotic Dynamics

*Concept ID: `math.de.chaos` · Difficulty: research · Bloom level: analyze · Mastery threshold: 0.6 · Estimated study time: 10h*

**Learning objective.** Define chaotic dynamics precisely — determinism, sensitive dependence on initial conditions, and bounded aperiodic behaviour — identify the Lorenz system as a canonical example, and quantify divergence via the Lyapunov exponent.

Deterministic systems exhibiting sensitive dependence on initial conditions: nearby trajectories diverge exponentially (positive Lyapunov exponent). Lorenz attractor is the canonical example. Not the same as randomness.

Chaotic dynamics is the behaviour of a deterministic nonlinear system that exhibits sensitive dependence on initial conditions: two trajectories starting arbitrarily close diverge exponentially fast, making long-term prediction impossible despite the governing equations being fully known. Chaos requires at least 3D autonomous ODEs (by Poincaré–Bendixson). The Lorenz system (σ=10, β=8/3, ρ=28) is the canonical example; its strange attractor has a fractal geometry. The Lyapunov exponent λ₁>0 quantifies the rate of divergence: separation grows as δ(t)≈δ₀e^{λ₁t}.

**Key ideas**

- Three hallmarks of chaos: (1) deterministic — the governing equations are ODEs with no stochastic terms; (2) sensitive dependence — initial separation δ₀ grows as δ₀e^{λ₁t} with λ₁>0 (positive Lyapunov exponent); (3) bounded aperiodic — trajectories stay within a bounded region (attractor) but never repeat exactly.
- Lyapunov exponent λ₁: measures average exponential divergence rate; λ₁=lim_{t→∞}(1/t)ln(δ(t)/δ₀); λ₁>0 defines chaos; for the Lorenz system λ₁≈0.906, giving a doubling time of ln(2)/0.906≈0.77 time units.
- Strange attractor: the Lorenz attractor is a fractal set in ℝ³ with non-integer (Hausdorff) dimension ≈2.06; trajectories are confined to it but never cross (determinism) and never close (aperiodic) — a set of zero volume that fills a 2D-like surface.
- Period-doubling route to chaos: many systems approach chaos through an infinite cascade of period-doubling bifurcations; the ratios of bifurcation-parameter intervals converge to the Feigenbaum constant δ≈4.669 — a universal constant independent of the specific system.
- Chaos ≠ randomness: a chaotic system is fully determined by its initial conditions and governing equations; it only appears random because tiny uncertainties in initial data are amplified exponentially. Given exact IC, the future is uniquely determined.

**Vocabulary**

- **Lyapunov exponent λ₁** — The average exponential rate at which nearby trajectories diverge; λ₁>0 defines chaos; λ₁=lim_{t→∞}(1/t)ln(δ(t)/δ₀).
- **Strange attractor** — A bounded, fractal subset of phase space on which chaotic trajectories live; has non-integer Hausdorff dimension; trajectories are confined but never repeat.
- **Sensitive dependence on initial conditions** — The defining property that infinitesimally close initial conditions lead to exponentially diverging trajectories; the 'butterfly effect'.
- **Predictability horizon** — The time T after which initial uncertainty δ₀ has grown to the scale of the attractor (~1); T=ln(1/δ₀)/λ₁; sets the fundamental forecasting limit.
- **Feigenbaum constant** — The universal ratio δ≈4.669 between consecutive period-doubling bifurcation parameter intervals, independent of the specific system — a mathematical universal in the route to chaos.

**Common misconceptions**

- *Misconception:* Chaos means the system is random or has stochastic (random) inputs.
  *Correction:* Chaos is a property of purely deterministic systems: the Lorenz equations dx/dt=σ(y−x) etc. have no randomness. The apparent randomness arises from exponential amplification of any initial uncertainty — a fundamentally different mechanism from stochastic noise.
- *Misconception:* A 2D autonomous ODE can be chaotic.
  *Correction:* By the Poincaré–Bendixson theorem, in 2D every bounded trajectory either approaches a fixed point or a limit cycle — it cannot be chaotic. Chaos in continuous-time ODEs requires at least 3 dimensions. (Discrete-time maps like the logistic map can be chaotic in 1D.)
- *Misconception:* A positive Lyapunov exponent means the solution grows without bound.
  *Correction:* A positive λ₁ means nearby trajectories diverge — but the attractor is bounded. Both trajectories stay on the attractor; they merely wander far apart on it. The attractor has finite extent; λ₁>0 describes separation rate, not absolute growth.

**Common mistakes in practice**

- Calling any 'complicated-looking' system chaotic — chaos has a precise definition (positive λ₁, bounded, aperiodic); turbulence, stochastic systems, and high-frequency oscillations are not automatically chaotic in this sense.
- Confusing the Lyapunov exponent (divergence rate of nearby trajectories) with the growth rate of a single trajectory (which is bounded on an attractor).
- Believing chaos means long-time averages are useless — in fact, long-time averages of observables on a chaotic attractor are well-defined and computable; it is point predictions, not statistics, that fail.

**Visual teaching opportunities**

- Lorenz attractor 3D plot: render the butterfly-shaped strange attractor with two wings around the two non-trivial fixed points; show two nearby trajectories starting at (x₀,y₀,z₀) and (x₀+ε,y₀,z₀) — initially indistinguishable, eventually on opposite wings.
- Separation vs. time log-plot: plot ln(δ(t)/δ₀) vs. t; the initial linear slope is λ₁≈0.906; after saturation (separation reaches attractor size) the curve flattens, showing how long prediction is possible.
- Logistic map bifurcation diagram: plot the long-time behaviour of x_{n+1}=rx_n(1−x_n) vs. r for r∈[2.5,4]; show period-1, period-2, period-4, … cascade culminating in chaos for r>3.57 — the period-doubling route.

**Worked example**

*Setup:* For the Lorenz system with σ=10, β=8/3, ρ=28, (a) find all fixed points and (b) demonstrate sensitive dependence by computing the Lyapunov doubling time.

1. Step 1: Write the Lorenz system: dx/dt=σ(y−x)=10(y−x), dy/dt=x(ρ−z)−y=x(28−z)−y, dz/dt=xy−βz=xy−(8/3)z. Find fixed points by setting all three derivatives to zero. Why: fixed points are the equilibria; their existence and stability set the stage for the attractor geometry.
2. Step 2: From dx/dt=0: y=x. From dz/dt=0: xy=βz → x²=βz (using y=x). From dy/dt=0: x(ρ−z)−x=0 → x[(ρ−z)−1]=0 → x=0 or z=ρ−1=27. Why: substituting y=x reduces the three equations to two.
3. Step 3: Case x=0: y=0, z=0. Fixed point C₀=(0,0,0). Case z=27: x²=β·27=(8/3)·27=72 → x=±6√2. Then y=x and z=27. Fixed points C±=(±6√2, ±6√2, 27). The three fixed points are confirmed. Why: there are three equilibria — one at the origin (unstable saddle) and two symmetric ones around which the Lorenz butterfly wings are centred.
4. Step 4: Lyapunov exponent and prediction horizon. The largest Lyapunov exponent of the Lorenz system is λ₁≈0.906 bits/time. Two initial conditions separated by δ₀=10^{−10} (measurement precision) will diverge to δ≈1 (attractor scale) in time T satisfying 10^{−10}e^{0.906T}≈1 → 0.906T=10ln(10)≈23.03 → T≈25.4 time units. Why: this quantifies the predictability horizon; the Lyapunov time 1/λ₁≈1.1 time unit is the fundamental scale of chaotic divergence.
5. Step 5: Doubling time. The separation doubles every τ=ln(2)/λ₁=0.693/0.906≈0.765 time units. In 10 doublings (≈7.65 time units) the error grows by factor 2^{10}=1024. In 33 doublings (≈25.3 time units) the initial error of 10^{−10} reaches 10^{−10}·2^{33}≈10^{−10}·8.6×10⁹≈1 (attractor scale), confirming the T≈25 estimate. Why: thinking in doublings provides intuitive leverage on how fast uncertainty accumulates.
6. Step 6: Implication. Despite the Lorenz equations being completely deterministic, a weather-forecasting model with measurement precision 10^{−10} loses all predictive skill after ~25 model time units. This is the mathematical basis of the inherent predictability limit in weather forecasting — not inadequate models, but the butterfly effect.

*Outcome:* Three fixed points: origin C₀=(0,0,0) and C±=(±6√2,±6√2,27). Lyapunov doubling time ≈0.765 time units; predictability horizon for precision 10^{−10} is ≈25 time units. Physical interpretation: inherent forecasting limit from positive λ₁, not model error.

**Real-world intuition**

- Weather prediction: the atmosphere is a high-dimensional chaotic system; the Lyapunov time is ~2 weeks, setting an absolute theoretical limit on weather forecasting regardless of model accuracy or computational power.
- Secure communications: chaotic synchronisation (drive a receiver system with a chaotic transmitter) enables wideband signal masking — the chaotic carrier is the 'noise' that hides the encoded message.
- Cardiac arrhythmia: healthy heartbeats have a degree of variability described by low-dimensional chaos; loss of chaotic variability (transition to periodic rhythms) can paradoxically indicate pathology (ventricular fibrillation).

**Practice progression**

Item types: Verify the three Lorenz fixed points by substituting into the equations, Logistic map: iterate x_{n+1}=4x_n(1−x_n) for two ICs differing by 10^{−6} and find when they diverge, Compute the predictability horizon T given λ₁ and initial error δ₀, Poincaré–Bendixson argument: explain why a 2D autonomous system cannot be chaotic, Distinguish chaos from randomness: given two time series (one chaotic, one stochastic), describe tests, Period-doubling: compute the first three bifurcation values of r in the logistic map. Suggested item count: 6.

Start with fixed point verification and Lyapunov doubling-time computation; advance to logistic map iteration and divergence calculation; progress to applying Poincaré–Bendixson and discussing predictability limits.

**Assessment objectives**

Formats: State the three defining properties of chaos and give a specific example of each for the Lorenz system, Given λ₁ and δ₀, compute the predictability horizon T, Explain why chaos requires at least 3D and why 2D ODEs are insufficient. Bloom alignment: analyze.

Mastery signal: Student correctly states all three chaos properties (deterministic, sensitive dependence, bounded aperiodic), computes a predictability horizon from λ₁, and distinguishes chaos from randomness and from instability.

**Teacher notes**

Chaos is conceptually counterintuitive — determinism and unpredictability seem contradictory. Resolve this early: 'deterministic' means given exact IC the future is known; 'unpredictable' means any finite measurement error grows exponentially, so practical prediction is limited. Numerically demonstrating divergence with the logistic map (easy to code in a spreadsheet) is more convincing than the Lorenz equations. Stress that chaos is a discovery about the nature of determinism, not about randomness.

**Student notes**

Three-point checklist for chaos: (1) does the system have a positive Lyapunov exponent? (2) is the attractor bounded? (3) is the trajectory aperiodic? All three must hold. For continuous ODEs, also check dimension ≥3. The predictability horizon formula T=ln(1/δ₀)/λ₁ is the single most useful quantitative tool from chaos theory.

**Prerequisite graph**

- Requires: math.de.nonlinear-ode, math.de.bifurcation
- Unlocks (future prerequisite links): none yet mapped
- Cross-topic connections (graph cross-links): none
- Narrative: Chaos emerges from nonlinear dynamics and bifurcation theory (math.de.bifurcation) — often via the period-doubling cascade. The strange attractor has fractal geometry, connecting to fractal dimension and self-similar structures in topology. Ergodic theory provides the rigorous foundation for why long-time averages on chaotic attractors are well-defined. In applications, chaos overlaps with control theory (targeting unstable periodic orbits within a chaotic attractor — OGY control) and information theory (the Kolmogorov–Sinai entropy equals the sum of positive Lyapunov exponents).

**Teaching hints — review triggers**

- Unfamiliar with fixed points and stability of nonlinear systems → review nonlinear-ode and stability-analysis.
- Cannot compute limits or exponential functions → review math.calc.exponential-logarithmic-functions.
- Unclear on bifurcation and period-doubling route → review bifurcation theory (math.de.bifurcation) before tackling the period-doubling cascade.

**Spaced repetition / revision guidance**

State all three defining properties of chaos, with one sentence of explanation for each. Then give the formula for the predictability horizon T and compute it for λ₁=0.906 and δ₀=10^{−6}. Finally, state why the Poincaré–Bendixson theorem rules out chaos in 2D continuous systems. This rehearses the definition, quantitative tool, and theoretical constraint simultaneously.

---

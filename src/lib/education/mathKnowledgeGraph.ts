// Master Mathematics Knowledge Graph
// These nodes are board-agnostic. Every board's chapters map INTO this graph.
// Adding a new board never requires adding new node types — only new mappings.

import type { KnowledgeNode } from './educationTypes'

export const MATH_KNOWLEDGE_GRAPH: KnowledgeNode[] = [

  // ── ARITHMETIC ──────────────────────────────────────────────────────────────

  {
    id: 'arithmetic.natural_numbers',
    domain: 'arithmetic',
    title: 'Natural Numbers',
    description: 'Counting numbers, place value up to large numbers, comparison, rounding',
    difficulty: 'foundational',
    prerequisites: [],
  },
  {
    id: 'arithmetic.addition_subtraction',
    domain: 'arithmetic',
    title: 'Addition and Subtraction',
    description: 'Multi-digit addition and subtraction with borrowing and carrying',
    difficulty: 'foundational',
    prerequisites: ['arithmetic.natural_numbers'],
  },
  {
    id: 'arithmetic.multiplication_division',
    domain: 'arithmetic',
    title: 'Multiplication and Division',
    description: 'Multiplication tables, long multiplication, long division, remainders',
    difficulty: 'foundational',
    prerequisites: ['arithmetic.addition_subtraction'],
  },
  {
    id: 'arithmetic.factors_multiples',
    domain: 'arithmetic',
    title: 'Factors and Multiples',
    description: 'Factors, multiples, prime numbers, composite numbers, HCF and LCM',
    difficulty: 'foundational',
    prerequisites: ['arithmetic.multiplication_division'],
  },
  {
    id: 'arithmetic.order_of_operations',
    domain: 'arithmetic',
    title: 'Order of Operations (BODMAS)',
    description: 'Brackets, Orders, Division, Multiplication, Addition, Subtraction',
    difficulty: 'developing',
    prerequisites: ['arithmetic.multiplication_division'],
  },
  {
    id: 'arithmetic.estimation_approximation',
    domain: 'arithmetic',
    title: 'Estimation and Approximation',
    description: 'Rounding numbers, estimating answers, significant figures',
    difficulty: 'foundational',
    prerequisites: ['arithmetic.natural_numbers'],
  },

  // ── NUMBER SYSTEMS ───────────────────────────────────────────────────────────

  {
    id: 'number_systems.whole_numbers',
    domain: 'number_systems',
    title: 'Whole Numbers',
    description: 'Natural numbers plus zero, properties on number line',
    difficulty: 'foundational',
    prerequisites: ['arithmetic.natural_numbers'],
  },
  {
    id: 'number_systems.integers',
    domain: 'number_systems',
    title: 'Integers',
    description: 'Positive and negative whole numbers, number line, absolute value',
    difficulty: 'foundational',
    prerequisites: ['number_systems.whole_numbers'],
  },
  {
    id: 'number_systems.rational_numbers',
    domain: 'number_systems',
    title: 'Rational Numbers',
    description: 'Numbers expressible as p/q, operations on rational numbers, decimal representation',
    difficulty: 'developing',
    prerequisites: ['number_systems.integers', 'fractions.fractions_intro'],
  },
  {
    id: 'number_systems.irrational_numbers',
    domain: 'number_systems',
    title: 'Irrational Numbers',
    description: 'Non-terminating non-repeating decimals, √2, π, surds',
    difficulty: 'developing',
    prerequisites: ['number_systems.rational_numbers'],
  },
  {
    id: 'number_systems.real_numbers',
    domain: 'number_systems',
    title: 'Real Numbers',
    description: 'Euclid\'s division lemma, fundamental theorem of arithmetic, decimal expansions',
    difficulty: 'proficient',
    prerequisites: ['number_systems.irrational_numbers'],
  },
  {
    id: 'number_systems.complex_numbers',
    domain: 'number_systems',
    title: 'Complex Numbers',
    description: 'Imaginary unit i, complex number a+bi, modulus, argument, polar form',
    difficulty: 'advanced',
    prerequisites: ['number_systems.real_numbers', 'algebra.quadratic_equations'],
  },

  // ── FRACTIONS ────────────────────────────────────────────────────────────────

  {
    id: 'fractions.fractions_intro',
    domain: 'fractions',
    title: 'Introduction to Fractions',
    description: 'Concept of a fraction, numerator, denominator, proper and improper fractions, mixed numbers',
    difficulty: 'foundational',
    prerequisites: ['arithmetic.multiplication_division'],
  },
  {
    id: 'fractions.equivalent_comparing',
    domain: 'fractions',
    title: 'Equivalent and Comparing Fractions',
    description: 'Equivalent fractions, simplest form, comparing and ordering fractions',
    difficulty: 'foundational',
    prerequisites: ['fractions.fractions_intro', 'arithmetic.factors_multiples'],
  },
  {
    id: 'fractions.operations_on_fractions',
    domain: 'fractions',
    title: 'Operations on Fractions',
    description: 'Addition, subtraction, multiplication and division of fractions and mixed numbers',
    difficulty: 'developing',
    prerequisites: ['fractions.equivalent_comparing'],
  },

  // ── DECIMALS ─────────────────────────────────────────────────────────────────

  {
    id: 'decimals.decimals_intro',
    domain: 'decimals',
    title: 'Introduction to Decimals',
    description: 'Decimal place values, reading and writing decimals, relationship to fractions',
    difficulty: 'foundational',
    prerequisites: ['fractions.fractions_intro'],
  },
  {
    id: 'decimals.operations_on_decimals',
    domain: 'decimals',
    title: 'Operations on Decimals',
    description: 'Addition, subtraction, multiplication and division of decimals',
    difficulty: 'developing',
    prerequisites: ['decimals.decimals_intro', 'arithmetic.order_of_operations'],
  },

  // ── INTEGERS ─────────────────────────────────────────────────────────────────
  // (Primary concept is in number_systems.integers; this domain covers operations)

  {
    id: 'integers.integer_operations',
    domain: 'integers',
    title: 'Operations on Integers',
    description: 'Adding, subtracting, multiplying and dividing negative and positive integers',
    difficulty: 'developing',
    prerequisites: ['number_systems.integers'],
  },
  {
    id: 'integers.properties_of_integers',
    domain: 'integers',
    title: 'Properties of Integers',
    description: 'Closure, commutativity, associativity, distributivity of integers',
    difficulty: 'developing',
    prerequisites: ['integers.integer_operations'],
  },

  // ── RATIOS & PROPORTIONS ─────────────────────────────────────────────────────

  {
    id: 'ratios_proportions.ratio_intro',
    domain: 'ratios_proportions',
    title: 'Ratio',
    description: 'Concept of ratio, equivalent ratios, ratio in simplest form, comparing ratios',
    difficulty: 'developing',
    prerequisites: ['fractions.equivalent_comparing'],
  },
  {
    id: 'ratios_proportions.proportion_unitary',
    domain: 'ratios_proportions',
    title: 'Proportion and Unitary Method',
    description: 'Proportion, direct and inverse proportion, unitary method, cross-multiplication',
    difficulty: 'developing',
    prerequisites: ['ratios_proportions.ratio_intro'],
  },

  // ── PERCENTAGES ──────────────────────────────────────────────────────────────

  {
    id: 'percentages.percentage_intro',
    domain: 'percentages',
    title: 'Percentages',
    description: 'Meaning of percent, conversion between fractions/decimals/percentages',
    difficulty: 'developing',
    prerequisites: ['fractions.operations_on_fractions', 'decimals.operations_on_decimals'],
  },
  {
    id: 'percentages.profit_loss',
    domain: 'percentages',
    title: 'Profit, Loss and Discount',
    description: 'Cost price, selling price, profit percent, loss percent, marked price, discount',
    difficulty: 'developing',
    prerequisites: ['percentages.percentage_intro'],
  },
  {
    id: 'percentages.simple_interest',
    domain: 'percentages',
    title: 'Simple Interest',
    description: 'Principal, rate, time, formula for simple interest and amount',
    difficulty: 'developing',
    prerequisites: ['percentages.percentage_intro'],
  },
  {
    id: 'percentages.compound_interest',
    domain: 'percentages',
    title: 'Compound Interest',
    description: 'Compound interest formula, growth and depreciation applications',
    difficulty: 'proficient',
    prerequisites: ['percentages.simple_interest', 'exponents_powers.exponents_intro'],
  },

  // ── EXPONENTS & POWERS ────────────────────────────────────────────────────────

  {
    id: 'exponents_powers.exponents_intro',
    domain: 'exponents_powers',
    title: 'Exponents and Powers',
    description: 'Base, exponent, powers of natural numbers, squares, cubes',
    difficulty: 'developing',
    prerequisites: ['arithmetic.multiplication_division'],
  },
  {
    id: 'exponents_powers.laws_of_exponents',
    domain: 'exponents_powers',
    title: 'Laws of Exponents',
    description: 'Product rule, quotient rule, power rule, zero exponent, negative exponent',
    difficulty: 'developing',
    prerequisites: ['exponents_powers.exponents_intro'],
  },
  {
    id: 'exponents_powers.squares_square_roots',
    domain: 'exponents_powers',
    title: 'Squares and Square Roots',
    description: 'Perfect squares, properties of square numbers, methods to find square roots',
    difficulty: 'developing',
    prerequisites: ['exponents_powers.exponents_intro'],
  },
  {
    id: 'exponents_powers.cubes_cube_roots',
    domain: 'exponents_powers',
    title: 'Cubes and Cube Roots',
    description: 'Perfect cubes, properties of cube numbers, cube roots by prime factorization',
    difficulty: 'developing',
    prerequisites: ['exponents_powers.squares_square_roots'],
  },
  {
    id: 'exponents_powers.scientific_notation',
    domain: 'exponents_powers',
    title: 'Scientific Notation',
    description: 'Standard form, very large and very small numbers in scientific notation',
    difficulty: 'proficient',
    prerequisites: ['exponents_powers.laws_of_exponents', 'decimals.decimals_intro'],
  },

  // ── ALGEBRA ──────────────────────────────────────────────────────────────────

  {
    id: 'algebra.intro_variables',
    domain: 'algebra',
    title: 'Introduction to Variables and Expressions',
    description: 'Variables, constants, algebraic expressions, evaluation of expressions',
    difficulty: 'developing',
    prerequisites: ['arithmetic.order_of_operations'],
  },
  {
    id: 'algebra.algebraic_expressions_identities',
    domain: 'algebra',
    title: 'Algebraic Expressions and Identities',
    description: 'Like and unlike terms, addition/subtraction of expressions, algebraic identities: (a+b)², (a-b)², (a+b)(a-b)',
    difficulty: 'developing',
    prerequisites: ['algebra.intro_variables'],
  },
  {
    id: 'algebra.factorisation',
    domain: 'algebra',
    title: 'Factorisation',
    description: 'Common factor method, regrouping, factorisation using identities',
    difficulty: 'proficient',
    prerequisites: ['algebra.algebraic_expressions_identities'],
  },
  {
    id: 'algebra.linear_equations_1var',
    domain: 'algebra',
    title: 'Linear Equations in One Variable',
    description: 'Solving equations of the form ax + b = c, word problems',
    difficulty: 'developing',
    prerequisites: ['algebra.intro_variables'],
  },
  {
    id: 'algebra.linear_equations_2var',
    domain: 'algebra',
    title: 'Linear Equations in Two Variables',
    description: 'Equations ax + by = c, graphical and algebraic solutions, word problems',
    difficulty: 'proficient',
    prerequisites: ['algebra.linear_equations_1var', 'coordinate_geometry.cartesian_system'],
  },
  {
    id: 'algebra.pair_linear_equations',
    domain: 'algebra',
    title: 'Pair of Linear Equations',
    description: 'Simultaneous equations: substitution, elimination, cross-multiplication methods',
    difficulty: 'proficient',
    prerequisites: ['algebra.linear_equations_2var'],
  },
  {
    id: 'algebra.polynomials',
    domain: 'algebra',
    title: 'Polynomials',
    description: 'Types of polynomials, zeroes of polynomial, factor theorem, remainder theorem',
    difficulty: 'proficient',
    prerequisites: ['algebra.algebraic_expressions_identities', 'algebra.factorisation'],
  },
  {
    id: 'algebra.quadratic_equations',
    domain: 'algebra',
    title: 'Quadratic Equations',
    description: 'Standard form ax²+bx+c=0, solving by factorisation, completing the square, quadratic formula, discriminant',
    difficulty: 'proficient',
    prerequisites: ['algebra.polynomials', 'exponents_powers.squares_square_roots'],
  },
  {
    id: 'algebra.arithmetic_progressions',
    domain: 'algebra',
    title: 'Arithmetic Progressions',
    description: 'AP, common difference, nth term, sum of n terms, word problems',
    difficulty: 'proficient',
    prerequisites: ['algebra.linear_equations_1var'],
  },
  {
    id: 'algebra.linear_inequalities',
    domain: 'algebra',
    title: 'Linear Inequalities',
    description: 'Inequalities, graphical solution, solution set in one and two variables',
    difficulty: 'proficient',
    prerequisites: ['algebra.linear_equations_2var'],
  },
  {
    id: 'algebra.sets',
    domain: 'algebra',
    title: 'Sets',
    description: 'Set notation, types of sets, operations: union, intersection, complement, Venn diagrams',
    difficulty: 'proficient',
    prerequisites: ['algebra.intro_variables'],
  },
  {
    id: 'algebra.relations_functions_intro',
    domain: 'algebra',
    title: 'Relations and Functions (Intro)',
    description: 'Ordered pairs, Cartesian product, relations, functions, domain and range',
    difficulty: 'proficient',
    prerequisites: ['algebra.sets', 'coordinate_geometry.cartesian_system'],
  },
  {
    id: 'algebra.sequences_series',
    domain: 'algebra',
    title: 'Sequences and Series (GP)',
    description: 'Geometric progression, common ratio, nth term, sum of n terms, infinite GP',
    difficulty: 'advanced',
    prerequisites: ['algebra.arithmetic_progressions'],
  },

  // ── COMBINATORICS ────────────────────────────────────────────────────────────

  {
    id: 'combinatorics.fundamental_principle',
    domain: 'combinatorics',
    title: 'Fundamental Principle of Counting',
    description: 'Multiplication principle, addition principle, tree diagrams',
    difficulty: 'proficient',
    prerequisites: ['arithmetic.multiplication_division'],
  },
  {
    id: 'combinatorics.permutations',
    domain: 'combinatorics',
    title: 'Permutations',
    description: 'Factorial, permutations nPr, permutations with repetition, circular permutations',
    difficulty: 'proficient',
    prerequisites: ['combinatorics.fundamental_principle'],
  },
  {
    id: 'combinatorics.combinations',
    domain: 'combinatorics',
    title: 'Combinations',
    description: 'Combinations nCr, properties of combinations, practical problems',
    difficulty: 'proficient',
    prerequisites: ['combinatorics.permutations'],
  },
  {
    id: 'combinatorics.binomial_theorem',
    domain: 'combinatorics',
    title: 'Binomial Theorem',
    description: "Binomial theorem for positive integral index, Pascal's triangle, general term, middle term",
    difficulty: 'advanced',
    prerequisites: ['combinatorics.combinations'],
  },

  // ── GEOMETRY ─────────────────────────────────────────────────────────────────

  {
    id: 'geometry.basic_shapes',
    domain: 'geometry',
    title: 'Basic Geometrical Shapes',
    description: 'Points, lines, line segments, rays, angles, plane shapes: triangles, quadrilaterals, circles',
    difficulty: 'foundational',
    prerequisites: [],
  },
  {
    id: 'geometry.lines_angles',
    domain: 'geometry',
    title: 'Lines and Angles',
    description: 'Types of angles, pairs of angles, parallel lines, transversal, angle sum properties',
    difficulty: 'foundational',
    prerequisites: ['geometry.basic_shapes'],
  },
  {
    id: 'geometry.triangles',
    domain: 'geometry',
    title: 'Triangles',
    description: 'Types of triangles, angle sum property, exterior angle, Pythagoras theorem, congruence criteria',
    difficulty: 'developing',
    prerequisites: ['geometry.lines_angles'],
  },
  {
    id: 'geometry.congruence',
    domain: 'geometry',
    title: 'Congruence of Triangles',
    description: 'Congruence criteria: SSS, SAS, ASA, AAS, RHS — proofs and applications',
    difficulty: 'developing',
    prerequisites: ['geometry.triangles'],
  },
  {
    id: 'geometry.similarity',
    domain: 'geometry',
    title: 'Similarity of Triangles',
    description: 'Similar figures, criteria for similarity, areas of similar triangles, Pythagoras theorem proof',
    difficulty: 'proficient',
    prerequisites: ['geometry.congruence', 'ratios_proportions.proportion_unitary'],
  },
  {
    id: 'geometry.quadrilaterals',
    domain: 'geometry',
    title: 'Quadrilaterals',
    description: 'Types of quadrilaterals, properties of parallelogram, rhombus, rectangle, square, trapezium',
    difficulty: 'developing',
    prerequisites: ['geometry.lines_angles'],
  },
  {
    id: 'geometry.circles',
    domain: 'geometry',
    title: 'Circles',
    description: 'Parts of circle, chord, arc, sector, segment; angle subtended by chord; tangent; secant',
    difficulty: 'proficient',
    prerequisites: ['geometry.triangles'],
  },
  {
    id: 'geometry.constructions',
    domain: 'geometry',
    title: 'Geometric Constructions',
    description: 'Bisectors, angle constructions, triangle construction, tangent to circle using compass and ruler',
    difficulty: 'developing',
    prerequisites: ['geometry.triangles', 'geometry.circles'],
  },
  {
    id: 'geometry.euclid',
    domain: 'geometry',
    title: "Euclid's Geometry",
    description: "Euclid's definitions, postulates, axioms, and the fifth postulate",
    difficulty: 'proficient',
    prerequisites: ['geometry.lines_angles'],
  },
  {
    id: 'geometry.3d_shapes',
    domain: 'geometry',
    title: '3D Shapes and Visualisation',
    description: 'Faces, edges, vertices of 3D shapes; nets; cross-sections; Euler\'s formula',
    difficulty: 'developing',
    prerequisites: ['geometry.basic_shapes'],
  },

  // ── MENSURATION ───────────────────────────────────────────────────────────────

  {
    id: 'mensuration.perimeter_area_2d',
    domain: 'mensuration',
    title: 'Perimeter and Area of 2D Shapes',
    description: 'Perimeter and area of triangles, quadrilaterals, composite shapes; Heron\'s formula',
    difficulty: 'developing',
    prerequisites: ['geometry.triangles', 'geometry.quadrilaterals'],
  },
  {
    id: 'mensuration.circles_area',
    domain: 'mensuration',
    title: 'Areas Related to Circles',
    description: 'Circumference and area of circle, area of sector and segment',
    difficulty: 'proficient',
    prerequisites: ['mensuration.perimeter_area_2d', 'geometry.circles'],
  },
  {
    id: 'mensuration.surface_area_volume',
    domain: 'mensuration',
    title: 'Surface Area and Volume of 3D Shapes',
    description: 'Surface area and volume of cube, cuboid, cylinder, cone, sphere, hemisphere; combinations',
    difficulty: 'proficient',
    prerequisites: ['mensuration.perimeter_area_2d', 'geometry.3d_shapes'],
  },

  // ── COORDINATE GEOMETRY ───────────────────────────────────────────────────────

  {
    id: 'coordinate_geometry.cartesian_system',
    domain: 'coordinate_geometry',
    title: 'Cartesian Coordinate System',
    description: 'Cartesian plane, axes, quadrants, plotting points, distance between two points',
    difficulty: 'developing',
    prerequisites: ['number_systems.integers'],
  },
  {
    id: 'coordinate_geometry.section_midpoint',
    domain: 'coordinate_geometry',
    title: 'Section and Midpoint Formula',
    description: 'Midpoint formula, section formula (internal and external division), area of triangle',
    difficulty: 'proficient',
    prerequisites: ['coordinate_geometry.cartesian_system'],
  },
  {
    id: 'coordinate_geometry.straight_lines',
    domain: 'coordinate_geometry',
    title: 'Straight Lines',
    description: 'Slope of a line, equation of a line in various forms, distance from a point to a line',
    difficulty: 'proficient',
    prerequisites: ['coordinate_geometry.section_midpoint', 'algebra.linear_equations_2var'],
  },
  {
    id: 'coordinate_geometry.conic_sections',
    domain: 'coordinate_geometry',
    title: 'Conic Sections',
    description: 'Circles, parabolas, ellipses and hyperbolas — standard equations and properties',
    difficulty: 'advanced',
    prerequisites: ['coordinate_geometry.straight_lines', 'algebra.quadratic_equations'],
  },
  {
    id: 'coordinate_geometry.3d_geometry',
    domain: 'coordinate_geometry',
    title: '3D Coordinate Geometry',
    description: 'Coordinates in 3D, distance formula, direction cosines, equations of lines and planes in 3D',
    difficulty: 'advanced',
    prerequisites: ['coordinate_geometry.straight_lines'],
  },

  // ── TRIGONOMETRY ─────────────────────────────────────────────────────────────

  {
    id: 'trigonometry.intro_ratios',
    domain: 'trigonometry',
    title: 'Introduction to Trigonometric Ratios',
    description: 'Sin, cos, tan and their reciprocals for acute angles; special angles 0°, 30°, 45°, 60°, 90°',
    difficulty: 'proficient',
    prerequisites: ['geometry.triangles', 'ratios_proportions.ratio_intro'],
  },
  {
    id: 'trigonometry.identities',
    domain: 'trigonometry',
    title: 'Trigonometric Identities',
    description: 'Pythagorean identities, sum and difference formulas, double angle formulas',
    difficulty: 'proficient',
    prerequisites: ['trigonometry.intro_ratios'],
  },
  {
    id: 'trigonometry.applications',
    domain: 'trigonometry',
    title: 'Applications of Trigonometry',
    description: 'Heights and distances, angle of elevation and depression, real-world problems',
    difficulty: 'proficient',
    prerequisites: ['trigonometry.intro_ratios'],
  },
  {
    id: 'trigonometry.trig_functions',
    domain: 'trigonometry',
    title: 'Trigonometric Functions (General)',
    description: 'Angles in radians and degrees, unit circle, general angle, graphs of trig functions, period',
    difficulty: 'advanced',
    prerequisites: ['trigonometry.identities'],
  },
  {
    id: 'trigonometry.inverse_trig',
    domain: 'trigonometry',
    title: 'Inverse Trigonometric Functions',
    description: 'Domains and ranges of inverse trig functions, properties and composition',
    difficulty: 'advanced',
    prerequisites: ['trigonometry.trig_functions', 'algebra.relations_functions_intro'],
  },

  // ── STATISTICS ────────────────────────────────────────────────────────────────

  {
    id: 'statistics.data_collection_representation',
    domain: 'statistics',
    title: 'Data Collection and Representation',
    description: 'Types of data, frequency tables, bar graphs, pie charts, histograms, frequency polygons',
    difficulty: 'foundational',
    prerequisites: ['arithmetic.natural_numbers'],
  },
  {
    id: 'statistics.central_tendency',
    domain: 'statistics',
    title: 'Measures of Central Tendency',
    description: 'Mean, median, mode — calculation for raw and grouped data, which to use when',
    difficulty: 'developing',
    prerequisites: ['statistics.data_collection_representation'],
  },
  {
    id: 'statistics.dispersion',
    domain: 'statistics',
    title: 'Measures of Dispersion',
    description: 'Range, quartiles, mean deviation, variance and standard deviation',
    difficulty: 'advanced',
    prerequisites: ['statistics.central_tendency'],
  },

  // ── PROBABILITY ───────────────────────────────────────────────────────────────

  {
    id: 'probability.basic_probability',
    domain: 'probability',
    title: 'Basic Probability',
    description: 'Experiment, sample space, event, probability of an event, equally likely outcomes',
    difficulty: 'developing',
    prerequisites: ['statistics.data_collection_representation'],
  },
  {
    id: 'probability.conditional_probability',
    domain: 'probability',
    title: 'Conditional Probability and Multiplication Theorem',
    description: 'Conditional probability, multiplication theorem, independent events, Bayes\' theorem',
    difficulty: 'advanced',
    prerequisites: ['probability.basic_probability'],
  },

  // ── FUNCTIONS ────────────────────────────────────────────────────────────────

  {
    id: 'functions.functions_types',
    domain: 'functions',
    title: 'Functions and Their Types',
    description: 'One-one, onto, bijection; composition of functions; invertible functions',
    difficulty: 'advanced',
    prerequisites: ['algebra.relations_functions_intro'],
  },
  {
    id: 'functions.binary_operations',
    domain: 'functions',
    title: 'Binary Operations',
    description: 'Binary operation on a set, commutativity, associativity, identity element, invertible',
    difficulty: 'advanced',
    prerequisites: ['functions.functions_types'],
  },

  // ── CALCULUS ─────────────────────────────────────────────────────────────────

  {
    id: 'calculus.limits',
    domain: 'calculus',
    title: 'Limits',
    description: 'Concept of limit, left and right limits, standard limits, limit laws, continuity at a point',
    difficulty: 'advanced',
    prerequisites: ['algebra.relations_functions_intro', 'algebra.sequences_series'],
  },
  {
    id: 'calculus.derivatives',
    domain: 'calculus',
    title: 'Derivatives and Differentiation',
    description: 'Derivative from first principles, differentiation rules: power, product, quotient, chain rule',
    difficulty: 'advanced',
    prerequisites: ['calculus.limits'],
  },
  {
    id: 'calculus.continuity_differentiability',
    domain: 'calculus',
    title: 'Continuity and Differentiability',
    description: 'Continuous and differentiable functions, Rolle\'s and mean value theorems, implicit differentiation',
    difficulty: 'advanced',
    prerequisites: ['calculus.derivatives', 'trigonometry.trig_functions'],
  },
  {
    id: 'calculus.applications_derivatives',
    domain: 'calculus',
    title: 'Applications of Derivatives',
    description: 'Rate of change, increasing/decreasing functions, maxima and minima, tangents and normals',
    difficulty: 'advanced',
    prerequisites: ['calculus.continuity_differentiability'],
  },
  {
    id: 'calculus.integrals',
    domain: 'calculus',
    title: 'Integration (Indefinite and Definite)',
    description: 'Antiderivatives, standard integrals, integration by substitution, by parts, by partial fractions; definite integral, fundamental theorem',
    difficulty: 'advanced',
    prerequisites: ['calculus.applications_derivatives'],
  },
  {
    id: 'calculus.applications_integrals',
    domain: 'calculus',
    title: 'Applications of Integrals',
    description: 'Area under a curve, area between two curves using integration',
    difficulty: 'advanced',
    prerequisites: ['calculus.integrals'],
  },
  {
    id: 'calculus.differential_equations',
    domain: 'calculus',
    title: 'Differential Equations',
    description: 'Order and degree, general and particular solutions, variable separable, homogeneous, linear first-order DEs',
    difficulty: 'advanced',
    prerequisites: ['calculus.integrals'],
  },

  // ── VECTORS ───────────────────────────────────────────────────────────────────

  {
    id: 'vectors.vector_intro',
    domain: 'vectors',
    title: 'Introduction to Vectors',
    description: 'Scalars and vectors, types of vectors, position vector, components, magnitude and direction',
    difficulty: 'advanced',
    prerequisites: ['coordinate_geometry.3d_geometry'],
  },
  {
    id: 'vectors.vector_operations',
    domain: 'vectors',
    title: 'Vector Operations',
    description: 'Addition and subtraction of vectors, scalar multiplication, section formula in vectors',
    difficulty: 'advanced',
    prerequisites: ['vectors.vector_intro'],
  },
  {
    id: 'vectors.dot_cross_product',
    domain: 'vectors',
    title: 'Dot Product and Cross Product',
    description: 'Scalar (dot) product and its properties; vector (cross) product and its applications',
    difficulty: 'advanced',
    prerequisites: ['vectors.vector_operations', 'trigonometry.intro_ratios'],
  },

  // ── MATRICES ─────────────────────────────────────────────────────────────────

  {
    id: 'matrices.matrix_intro_operations',
    domain: 'matrices',
    title: 'Matrices and Matrix Operations',
    description: 'Types of matrices, matrix addition and subtraction, scalar multiplication, matrix multiplication, transpose',
    difficulty: 'advanced',
    prerequisites: ['algebra.intro_variables'],
  },
  {
    id: 'matrices.determinants',
    domain: 'matrices',
    title: 'Determinants',
    description: 'Determinant of 2×2 and 3×3 matrices, properties, cofactors, adjoint, inverse of a matrix',
    difficulty: 'advanced',
    prerequisites: ['matrices.matrix_intro_operations'],
  },
  {
    id: 'matrices.system_of_equations',
    domain: 'matrices',
    title: 'System of Equations via Matrices',
    description: 'Cramer\'s rule, matrix method for solving systems of linear equations',
    difficulty: 'advanced',
    prerequisites: ['matrices.determinants', 'algebra.pair_linear_equations'],
  },
]

/** Look up a KnowledgeNode by id */
export function getKGNode(id: string): KnowledgeNode | undefined {
  return MATH_KNOWLEDGE_GRAPH.find((n) => n.id === id)
}

/** Get all nodes for a given domain */
export function getNodesByDomain(domain: KnowledgeNode['domain']): KnowledgeNode[] {
  return MATH_KNOWLEDGE_GRAPH.filter((n) => n.domain === domain)
}

/** Get all prerequisite nodes (recursively) for a given node id */
export function getAllPrerequisites(id: string, visited = new Set<string>()): KnowledgeNode[] {
  if (visited.has(id)) return []
  visited.add(id)
  const node = getKGNode(id)
  if (!node) return []
  const result: KnowledgeNode[] = []
  for (const prereqId of node.prerequisites) {
    const prereq = getKGNode(prereqId)
    if (prereq && !visited.has(prereqId)) {
      result.push(prereq, ...getAllPrerequisites(prereqId, visited))
    }
  }
  return result
}

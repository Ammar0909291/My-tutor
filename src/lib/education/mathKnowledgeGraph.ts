// Master Mathematics Knowledge Graph

import type { KnowledgeNode } from './educationTypes'

export const MATH_KNOWLEDGE_GRAPH: KnowledgeNode[] = [
  // ─── ARITHMETIC ──────────────────────────────────────────────
  { id: 'arithmetic.counting_numbers', domain: 'arithmetic', title: 'Counting and Natural Numbers', description: 'Number recognition, counting sequences, place value up to millions, comparing and ordering numbers', difficulty: 'foundational', prerequisites: [] },
  { id: 'arithmetic.addition_subtraction', domain: 'arithmetic', title: 'Addition and Subtraction', description: 'Single and multi-digit addition and subtraction, carrying and borrowing, word problems', difficulty: 'foundational', prerequisites: ['arithmetic.counting_numbers'] },
  { id: 'arithmetic.multiplication_division', domain: 'arithmetic', title: 'Multiplication and Division', description: 'Multiplication tables, long multiplication, long division, divisibility rules, word problems', difficulty: 'foundational', prerequisites: ['arithmetic.addition_subtraction'] },
  { id: 'arithmetic.lcm_hcf', domain: 'arithmetic', title: 'Factors, Multiples, HCF and LCM', description: 'Factors and multiples, prime and composite numbers, prime factorisation, highest common factor (HCF) and lowest common multiple (LCM), relationship between HCF and LCM, word problems', difficulty: 'foundational', prerequisites: ['arithmetic.multiplication_division'] },
  // ─── NUMBER SYSTEMS ──────────────────────────────────────────
  { id: 'number_systems.whole_natural', domain: 'number_systems', title: 'Whole Numbers and Number Line', description: 'Natural numbers, whole numbers, integers on a number line, predecessor and successor', difficulty: 'foundational', prerequisites: ['arithmetic.counting_numbers'] },
  { id: 'number_systems.integers', domain: 'integers', title: 'Integers — Introduction', description: 'Negative numbers, absolute value, addition and subtraction of integers', difficulty: 'foundational', prerequisites: ['number_systems.whole_natural'] },
  { id: 'number_systems.rational', domain: 'number_systems', title: 'Rational Numbers', description: 'Definition, representation on number line, operations on rational numbers, properties', difficulty: 'developing', prerequisites: ['number_systems.integers'] },
  { id: 'number_systems.real_irrational', domain: 'number_systems', title: 'Irrational Numbers and Real Number System', description: 'Surds, √2 irrationality proof, real number line, decimal expansions, laws of exponents for real numbers', difficulty: 'proficient', prerequisites: ['number_systems.rational'] },
  // ─── FRACTIONS ───────────────────────────────────────────────
  { id: 'fractions.introduction', domain: 'fractions', title: 'Fractions — Concepts and Types', description: 'Proper, improper and mixed fractions, equivalent fractions, simplest form', difficulty: 'foundational', prerequisites: ['arithmetic.multiplication_division'] },
  { id: 'fractions.operations', domain: 'fractions', title: 'Operations on Fractions', description: 'Addition, subtraction, multiplication and division of fractions and mixed numbers', difficulty: 'developing', prerequisites: ['fractions.introduction'] },
  // ─── DECIMALS ────────────────────────────────────────────────
  { id: 'decimals.introduction', domain: 'decimals', title: 'Decimals — Place Value and Conversion', description: 'Decimal place value, converting between fractions and decimals, comparing decimals', difficulty: 'developing', prerequisites: ['fractions.introduction'] },
  { id: 'decimals.operations', domain: 'decimals', title: 'Operations on Decimals', description: 'Addition, subtraction, multiplication and division of decimals, rounding', difficulty: 'developing', prerequisites: ['decimals.introduction'] },
  // ─── RATIOS & PROPORTIONS ────────────────────────────────────
  { id: 'ratios_proportions.ratio_basics', domain: 'ratios_proportions', title: 'Ratio and Proportion', description: 'Meaning of ratio, equivalent ratios, proportion, unitary method, direct and inverse proportion', difficulty: 'developing', prerequisites: ['fractions.operations'] },
  // ─── PERCENTAGES ─────────────────────────────────────────────
  { id: 'percentages.basics', domain: 'percentages', title: 'Percentages', description: 'Converting fractions/decimals to percent, finding percent of a quantity, percentage increase/decrease', difficulty: 'developing', prerequisites: ['ratios_proportions.ratio_basics'] },
  { id: 'percentages.applications', domain: 'percentages', title: 'Profit, Loss and Discount', description: 'Cost price, selling price, profit and loss percent, discount, marked price, GST basics', difficulty: 'developing', prerequisites: ['percentages.basics'] },
  { id: 'percentages.interest', domain: 'percentages', title: 'Simple and Compound Interest', description: 'Simple interest formula, compound interest formula, half-yearly and quarterly compounding', difficulty: 'proficient', prerequisites: ['percentages.applications'] },
  // ─── EXPONENTS ───────────────────────────────────────────────
  { id: 'exponents_powers.basics', domain: 'exponents_powers', title: 'Exponents and Powers', description: 'Laws of exponents, negative exponents, scientific notation, standard form', difficulty: 'developing', prerequisites: ['arithmetic.multiplication_division'] },
  // ─── ALGEBRA ─────────────────────────────────────────────────
  { id: 'algebra.introduction', domain: 'algebra', title: 'Introduction to Algebra', description: 'Variables, constants, algebraic expressions, like and unlike terms, addition and subtraction of expressions', difficulty: 'foundational', prerequisites: ['arithmetic.multiplication_division'] },
  { id: 'algebra.linear_equations_1var', domain: 'algebra', title: 'Linear Equations in One Variable', description: 'Solving linear equations, transposition, word problems, applications', difficulty: 'developing', prerequisites: ['algebra.introduction'] },
  { id: 'algebra.linear_equations_2var', domain: 'algebra', title: 'Linear Equations in Two Variables and Pairs', description: 'Cartesian plane, graphing lines, simultaneous equations — substitution, elimination and graphical methods', difficulty: 'proficient', prerequisites: ['algebra.linear_equations_1var', 'coordinate_geometry.cartesian_plane'] },
  { id: 'algebra.polynomials', domain: 'algebra', title: 'Polynomials', description: 'Types of polynomials, zeroes/roots, factor theorem, remainder theorem, algebraic identities', difficulty: 'proficient', prerequisites: ['algebra.introduction'] },
  { id: 'algebra.quadratic_equations', domain: 'algebra', title: 'Quadratic Equations', description: 'Standard form, factorisation, completing the square, quadratic formula, nature of roots, discriminant', difficulty: 'proficient', prerequisites: ['algebra.polynomials'] },
  { id: 'algebra.arithmetic_progressions', domain: 'algebra', title: 'Arithmetic Progressions', description: 'AP definition, nth term, sum of n terms, word problems', difficulty: 'proficient', prerequisites: ['algebra.linear_equations_1var'] },
  { id: 'algebra.inequalities', domain: 'algebra', title: 'Linear Inequalities', description: 'Inequalities in one variable, graphical representation, system of linear inequalities', difficulty: 'proficient', prerequisites: ['algebra.linear_equations_1var'] },
  // ─── GEOMETRY ────────────────────────────────────────────────
  { id: 'geometry.basic_shapes', domain: 'geometry', title: 'Basic Geometry — Points, Lines and Angles', description: 'Point, line, ray, line segment; types of angles; complementary, supplementary, vertically opposite angles', difficulty: 'foundational', prerequisites: [] },
  { id: 'geometry.triangles', domain: 'geometry', title: 'Triangles — Properties and Congruence', description: 'Types of triangles, angle sum property, exterior angle theorem, congruence criteria (SSS, SAS, ASA, RHS)', difficulty: 'developing', prerequisites: ['geometry.basic_shapes'] },
  { id: 'geometry.quadrilaterals', domain: 'geometry', title: 'Quadrilaterals and Polygons', description: 'Properties of parallelogram, rectangle, rhombus, square, trapezium; polygon angle sums', difficulty: 'developing', prerequisites: ['geometry.triangles'] },
  { id: 'geometry.circles', domain: 'geometry', title: 'Circles', description: 'Centre, radius, chord, arc, tangent; angle subtended at centre and circumference; cyclic quadrilateral', difficulty: 'proficient', prerequisites: ['geometry.triangles'] },
  { id: 'geometry.similarity', domain: 'geometry', title: 'Similarity of Triangles', description: 'Similar figures, AA/SSS/SAS similarity criteria, Basic Proportionality Theorem, Pythagoras theorem proof', difficulty: 'proficient', prerequisites: ['geometry.triangles'] },
  { id: 'geometry.constructions', domain: 'geometry', title: 'Geometric Constructions', description: 'Bisecting angles and segments, constructing triangles and quadrilaterals with given constraints, tangent construction', difficulty: 'proficient', prerequisites: ['geometry.triangles'] },
  { id: 'geometry.symmetry', domain: 'geometry', title: 'Symmetry', description: 'Line (reflective) symmetry, lines of symmetry of common shapes, rotational symmetry, order of rotational symmetry, symmetry in patterns and the real world', difficulty: 'foundational', prerequisites: ['geometry.basic_shapes'] },
  // ─── MENSURATION ─────────────────────────────────────────────
  { id: 'mensuration.perimeter_area_2d', domain: 'mensuration', title: 'Perimeter and Area of 2D Figures', description: 'Area and perimeter of triangles, quadrilaterals, circles, composite figures; Heron\'s formula', difficulty: 'developing', prerequisites: ['geometry.basic_shapes'] },
  { id: 'mensuration.surface_area_volume', domain: 'mensuration', title: 'Surface Area and Volume of 3D Solids', description: 'Cuboid, cube, cylinder, cone, sphere, hemisphere — surface area and volume; frustum', difficulty: 'proficient', prerequisites: ['mensuration.perimeter_area_2d'] },
  // ─── COORDINATE GEOMETRY ─────────────────────────────────────
  { id: 'coordinate_geometry.cartesian_plane', domain: 'coordinate_geometry', title: 'Cartesian Plane and Plotting', description: 'Quadrants, plotting points, distance between two points, midpoint formula', difficulty: 'developing', prerequisites: ['geometry.basic_shapes'] },
  { id: 'coordinate_geometry.straight_lines', domain: 'coordinate_geometry', title: 'Straight Lines — Equations and Graphs', description: 'Slope of a line, various forms of equation of a line, angle between lines, collinearity', difficulty: 'proficient', prerequisites: ['coordinate_geometry.cartesian_plane'] },
  { id: 'coordinate_geometry.conics', domain: 'coordinate_geometry', title: 'Conic Sections', description: 'Circle, parabola, ellipse, hyperbola — standard equations and properties', difficulty: 'advanced', prerequisites: ['coordinate_geometry.straight_lines'] },
  // ─── TRIGONOMETRY ────────────────────────────────────────────
  { id: 'trigonometry.ratios_basics', domain: 'trigonometry', title: 'Trigonometric Ratios', description: 'Sin, cos, tan and their reciprocals; values at standard angles (0°, 30°, 45°, 60°, 90°); identities', difficulty: 'proficient', prerequisites: ['geometry.similarity'] },
  { id: 'trigonometry.heights_distances', domain: 'trigonometry', title: 'Heights and Distances (Applications)', description: 'Angles of elevation and depression, real-world problems using trigonometric ratios', difficulty: 'proficient', prerequisites: ['trigonometry.ratios_basics'] },
  { id: 'trigonometry.functions_identities', domain: 'trigonometry', title: 'Trigonometric Functions and Identities', description: 'Radian measure, trig functions of any angle, graphs, compound angle and transformation identities', difficulty: 'advanced', prerequisites: ['trigonometry.ratios_basics'] },
  // ─── STATISTICS ──────────────────────────────────────────────
  { id: 'statistics.data_collection', domain: 'statistics', title: 'Data Collection and Representation', description: 'Types of data, tally charts, frequency tables, bar graphs, pictographs, pie charts, histograms', difficulty: 'foundational', prerequisites: ['arithmetic.counting_numbers'] },
  { id: 'statistics.central_tendency', domain: 'statistics', title: 'Measures of Central Tendency', description: 'Mean (ungrouped and grouped), median, mode; choosing the right average', difficulty: 'developing', prerequisites: ['statistics.data_collection'] },
  { id: 'statistics.dispersion', domain: 'statistics', title: 'Measures of Dispersion', description: 'Range, mean deviation, variance, standard deviation for ungrouped and grouped data', difficulty: 'advanced', prerequisites: ['statistics.central_tendency'] },
  // ─── PROBABILITY ─────────────────────────────────────────────
  { id: 'probability.basics', domain: 'probability', title: 'Basic Probability', description: 'Random experiments, events, sample space, classical probability, complementary events', difficulty: 'developing', prerequisites: ['statistics.data_collection'] },
  { id: 'probability.advanced', domain: 'probability', title: 'Advanced Probability', description: 'Addition and multiplication rules, conditional probability, Bayes\' theorem, random variables, Bernoulli trials', difficulty: 'advanced', prerequisites: ['probability.basics'] },
  // ─── FUNCTIONS ───────────────────────────────────────────────
  { id: 'functions.introduction', domain: 'functions', title: 'Relations and Functions', description: 'Cartesian product, relations, functions, domain/range/codomain, types of functions (one-one, onto, bijective)', difficulty: 'advanced', prerequisites: ['algebra.polynomials'] },
  { id: 'functions.inverse_composition', domain: 'functions', title: 'Inverse and Composite Functions', description: 'Composition of functions, invertible functions, binary operations', difficulty: 'advanced', prerequisites: ['functions.introduction'] },
  // ─── CALCULUS ────────────────────────────────────────────────
  { id: 'calculus.limits_continuity', domain: 'calculus', title: 'Limits and Continuity', description: 'Concept of limit, standard limits, algebra of limits, continuity at a point and on an interval', difficulty: 'advanced', prerequisites: ['functions.introduction'] },
  { id: 'calculus.differentiation', domain: 'calculus', title: 'Differentiation', description: 'Derivative definition, rules (product, quotient, chain), derivatives of standard functions, implicit differentiation', difficulty: 'advanced', prerequisites: ['calculus.limits_continuity'] },
  { id: 'calculus.applications_derivatives', domain: 'calculus', title: 'Applications of Derivatives', description: 'Rate of change, tangents/normals, increasing/decreasing functions, maxima and minima, approximations', difficulty: 'advanced', prerequisites: ['calculus.differentiation'] },
  { id: 'calculus.integration', domain: 'calculus', title: 'Integration', description: 'Antiderivatives, indefinite integrals, methods (substitution, parts, partial fractions), definite integrals, area under curves', difficulty: 'advanced', prerequisites: ['calculus.differentiation'] },
  { id: 'calculus.differential_equations', domain: 'calculus', title: 'Differential Equations', description: 'Order and degree, formation, methods of solution (variable separable, homogeneous, linear)', difficulty: 'advanced', prerequisites: ['calculus.integration'] },
  // ─── VECTORS ─────────────────────────────────────────────────
  { id: 'vectors.basics', domain: 'vectors', title: 'Vectors — Introduction and Operations', description: 'Scalars and vectors, position vectors, addition, subtraction, scalar multiplication, unit vectors, dot and cross products', difficulty: 'advanced', prerequisites: ['trigonometry.functions_identities'] },
  // ─── MATRICES ────────────────────────────────────────────────
  { id: 'matrices.basics', domain: 'matrices', title: 'Matrices and Determinants', description: 'Types of matrices, matrix operations, determinants, adjoint, inverse, solving systems using matrices (Cramer\'s rule)', difficulty: 'advanced', prerequisites: ['algebra.linear_equations_2var'] },
  // ─── COMBINATORICS ───────────────────────────────────────────
  { id: 'combinatorics.permutations_combinations', domain: 'combinatorics', title: 'Permutations and Combinations', description: 'Fundamental counting principle, factorial, permutations (with/without repetition), combinations, binomial theorem', difficulty: 'advanced', prerequisites: ['arithmetic.multiplication_division'] },
]

export function getKGNode(id: string): KnowledgeNode | undefined {
  return MATH_KNOWLEDGE_GRAPH.find((n) => n.id === id)
}

export function getNodesByDomain(domain: string): KnowledgeNode[] {
  return MATH_KNOWLEDGE_GRAPH.filter((n) => n.domain === domain)
}

export function getAllPrerequisites(id: string, visited = new Set<string>()): KnowledgeNode[] {
  if (visited.has(id)) return []
  visited.add(id)
  const node = getKGNode(id)
  if (!node) return []
  const prereqs = node.prerequisites.flatMap((pid) => [
    ...getAllPrerequisites(pid, visited),
    getKGNode(pid),
  ].filter(Boolean) as KnowledgeNode[])
  return prereqs
}

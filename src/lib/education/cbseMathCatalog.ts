import type { BoardSubjectCatalog } from './educationTypes'

/**
 * CBSE Mathematics — grades 5-12 (Sprint AT).
 *
 * Authored against the CURRENT CBSE/NCERT syllabus, i.e. the rationalized
 * textbooks in force since 2023-24 — NOT copied verbatim from UP Board.
 * Chapters CBSE deleted in rationalization are intentionally absent:
 *   Class 6:  Symmetry, Practical Geometry
 *   Class 7:  Congruence of Triangles, Practical Geometry
 *   Class 8:  Practical Geometry, Visualising Solid Shapes, Playing with Numbers
 *   Class 9:  Areas of Parallelograms and Triangles, Constructions, Probability
 *   Class 10: Constructions
 *   Class 11: Principle of Mathematical Induction, Mathematical Reasoning
 *   Class 12: (no full-chapter deletions)
 * Class 5 follows NCERT Math-Magic chapter naming (thematic, unlike UP's
 * generic primary list).
 *
 * Maintenance note: NCERT is rolling out new NCF-2023 textbooks
 * ("Ganita Prakash") from the lower grades upward. When CBSE's secondary
 * syllabus documents switch to them, grades 6-8 here need re-verification.
 *
 * Every kgNodeId below references an EXISTING node in mathKnowledgeGraph.ts —
 * verified by coverageAudit.findUnmappedChapters (Sprint AT audit).
 */
export const CBSE_MATH_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'mathematics',
  subjectName: 'Mathematics',
  grades: [
    {
      grade: 5,
      chapters: [
        { id: 'cbse.math.5.ch1', order: 1, title: 'The Fish Tale (Large Numbers)', kgNodeIds: ['arithmetic.counting_numbers', 'arithmetic.addition_subtraction'] },
        { id: 'cbse.math.5.ch2', order: 2, title: 'Shapes and Angles', kgNodeIds: ['geometry.basic_shapes'] },
        { id: 'cbse.math.5.ch3', order: 3, title: 'How Many Squares? (Area)', kgNodeIds: ['mensuration.perimeter_area_2d'] },
        { id: 'cbse.math.5.ch4', order: 4, title: 'Parts and Wholes (Fractions)', kgNodeIds: ['fractions.introduction'] },
        { id: 'cbse.math.5.ch5', order: 5, title: 'Does it Look the Same? (Symmetry)', kgNodeIds: ['geometry.symmetry'] },
        { id: 'cbse.math.5.ch6', order: 6, title: "Be My Multiple, I'll be Your Factor", kgNodeIds: ['arithmetic.lcm_hcf'] },
        { id: 'cbse.math.5.ch7', order: 7, title: 'Can You See the Pattern?', kgNodeIds: ['geometry.symmetry'] },
        { id: 'cbse.math.5.ch8', order: 8, title: 'Mapping Your Way', kgNodeIds: ['geometry.basic_shapes'] },
        { id: 'cbse.math.5.ch9', order: 9, title: 'Boxes and Sketches (3D Shapes)', kgNodeIds: ['mensuration.surface_area_volume'] },
        { id: 'cbse.math.5.ch10', order: 10, title: 'Tenths and Hundredths (Decimals)', kgNodeIds: ['decimals.introduction'] },
        { id: 'cbse.math.5.ch11', order: 11, title: 'Area and its Boundary', kgNodeIds: ['mensuration.perimeter_area_2d'] },
        { id: 'cbse.math.5.ch12', order: 12, title: 'Smart Charts (Data Handling)', kgNodeIds: ['statistics.data_collection'] },
        { id: 'cbse.math.5.ch13', order: 13, title: 'Ways to Multiply and Divide', kgNodeIds: ['arithmetic.multiplication_division'] },
        { id: 'cbse.math.5.ch14', order: 14, title: 'How Big? How Heavy? (Volume and Weight)', kgNodeIds: ['mensuration.surface_area_volume'] },
      ],
    },
    {
      grade: 6,
      chapters: [
        { id: 'cbse.math.6.ch1', order: 1, title: 'Knowing Our Numbers', kgNodeIds: ['number_systems.whole_natural'] },
        { id: 'cbse.math.6.ch2', order: 2, title: 'Whole Numbers', kgNodeIds: ['number_systems.whole_natural'] },
        { id: 'cbse.math.6.ch3', order: 3, title: 'Playing with Numbers', kgNodeIds: ['arithmetic.lcm_hcf'] },
        { id: 'cbse.math.6.ch4', order: 4, title: 'Basic Geometrical Ideas', kgNodeIds: ['geometry.basic_shapes'] },
        { id: 'cbse.math.6.ch5', order: 5, title: 'Understanding Elementary Shapes', kgNodeIds: ['geometry.basic_shapes'] },
        { id: 'cbse.math.6.ch6', order: 6, title: 'Integers', kgNodeIds: ['number_systems.integers'] },
        { id: 'cbse.math.6.ch7', order: 7, title: 'Fractions', kgNodeIds: ['fractions.introduction'] },
        { id: 'cbse.math.6.ch8', order: 8, title: 'Decimals', kgNodeIds: ['decimals.introduction'] },
        { id: 'cbse.math.6.ch9', order: 9, title: 'Data Handling', kgNodeIds: ['statistics.data_collection'] },
        { id: 'cbse.math.6.ch10', order: 10, title: 'Mensuration', kgNodeIds: ['mensuration.perimeter_area_2d'] },
        { id: 'cbse.math.6.ch11', order: 11, title: 'Algebra', kgNodeIds: ['algebra.introduction'] },
        { id: 'cbse.math.6.ch12', order: 12, title: 'Ratio and Proportion', kgNodeIds: ['ratios_proportions.ratio_basics'] },
        // Rationalization: Symmetry and Practical Geometry deleted by CBSE.
      ],
    },
    {
      grade: 7,
      chapters: [
        { id: 'cbse.math.7.ch1', order: 1, title: 'Integers', kgNodeIds: ['number_systems.integers'] },
        { id: 'cbse.math.7.ch2', order: 2, title: 'Fractions and Decimals', kgNodeIds: ['fractions.operations', 'decimals.operations'] },
        { id: 'cbse.math.7.ch3', order: 3, title: 'Data Handling', kgNodeIds: ['statistics.data_collection'] },
        { id: 'cbse.math.7.ch4', order: 4, title: 'Simple Equations', kgNodeIds: ['algebra.linear_equations_1var'] },
        { id: 'cbse.math.7.ch5', order: 5, title: 'Lines and Angles', kgNodeIds: ['geometry.basic_shapes'] },
        { id: 'cbse.math.7.ch6', order: 6, title: 'The Triangle and its Properties', kgNodeIds: ['geometry.triangles'] },
        { id: 'cbse.math.7.ch7', order: 7, title: 'Comparing Quantities', kgNodeIds: ['ratios_proportions.ratio_basics', 'percentages.basics'] },
        { id: 'cbse.math.7.ch8', order: 8, title: 'Rational Numbers', kgNodeIds: ['number_systems.rational'] },
        { id: 'cbse.math.7.ch9', order: 9, title: 'Perimeter and Area', kgNodeIds: ['mensuration.perimeter_area_2d'] },
        { id: 'cbse.math.7.ch10', order: 10, title: 'Algebraic Expressions', kgNodeIds: ['algebra.introduction'] },
        { id: 'cbse.math.7.ch11', order: 11, title: 'Exponents and Powers', kgNodeIds: ['exponents_powers.basics'] },
        { id: 'cbse.math.7.ch12', order: 12, title: 'Symmetry', kgNodeIds: ['geometry.symmetry'] },
        { id: 'cbse.math.7.ch13', order: 13, title: 'Visualising Solid Shapes', kgNodeIds: ['mensuration.surface_area_volume'] },
        // Rationalization: Congruence of Triangles and Practical Geometry deleted by CBSE.
      ],
    },
    {
      grade: 8,
      chapters: [
        { id: 'cbse.math.8.ch1', order: 1, title: 'Rational Numbers', kgNodeIds: ['number_systems.rational'] },
        { id: 'cbse.math.8.ch2', order: 2, title: 'Linear Equations in One Variable', kgNodeIds: ['algebra.linear_equations_1var'] },
        { id: 'cbse.math.8.ch3', order: 3, title: 'Understanding Quadrilaterals', kgNodeIds: ['geometry.quadrilaterals'] },
        { id: 'cbse.math.8.ch4', order: 4, title: 'Data Handling', kgNodeIds: ['statistics.data_collection', 'statistics.central_tendency'] },
        { id: 'cbse.math.8.ch5', order: 5, title: 'Squares and Square Roots', kgNodeIds: ['exponents_powers.basics'] },
        { id: 'cbse.math.8.ch6', order: 6, title: 'Cubes and Cube Roots', kgNodeIds: ['exponents_powers.basics'] },
        { id: 'cbse.math.8.ch7', order: 7, title: 'Comparing Quantities', kgNodeIds: ['percentages.applications', 'percentages.interest'] },
        { id: 'cbse.math.8.ch8', order: 8, title: 'Algebraic Expressions and Identities', kgNodeIds: ['algebra.polynomials'] },
        { id: 'cbse.math.8.ch9', order: 9, title: 'Mensuration', kgNodeIds: ['mensuration.surface_area_volume'] },
        { id: 'cbse.math.8.ch10', order: 10, title: 'Exponents and Powers', kgNodeIds: ['exponents_powers.basics'] },
        { id: 'cbse.math.8.ch11', order: 11, title: 'Direct and Inverse Proportions', kgNodeIds: ['ratios_proportions.ratio_basics'] },
        { id: 'cbse.math.8.ch12', order: 12, title: 'Factorisation', kgNodeIds: ['algebra.polynomials'] },
        { id: 'cbse.math.8.ch13', order: 13, title: 'Introduction to Graphs', kgNodeIds: ['coordinate_geometry.cartesian_plane'] },
        // Rationalization: Practical Geometry, Visualising Solid Shapes and
        // Playing with Numbers deleted by CBSE.
      ],
    },
    {
      grade: 9,
      chapters: [
        { id: 'cbse.math.9.ch1', order: 1, title: 'Number Systems', kgNodeIds: ['number_systems.real_irrational'] },
        { id: 'cbse.math.9.ch2', order: 2, title: 'Polynomials', kgNodeIds: ['algebra.polynomials'] },
        { id: 'cbse.math.9.ch3', order: 3, title: 'Coordinate Geometry', kgNodeIds: ['coordinate_geometry.cartesian_plane'] },
        { id: 'cbse.math.9.ch4', order: 4, title: 'Linear Equations in Two Variables', kgNodeIds: ['algebra.linear_equations_2var'] },
        { id: 'cbse.math.9.ch5', order: 5, title: "Introduction to Euclid's Geometry", kgNodeIds: ['geometry.basic_shapes'] },
        { id: 'cbse.math.9.ch6', order: 6, title: 'Lines and Angles', kgNodeIds: ['geometry.basic_shapes'] },
        { id: 'cbse.math.9.ch7', order: 7, title: 'Triangles', kgNodeIds: ['geometry.triangles'] },
        { id: 'cbse.math.9.ch8', order: 8, title: 'Quadrilaterals', kgNodeIds: ['geometry.quadrilaterals'] },
        { id: 'cbse.math.9.ch9', order: 9, title: 'Circles', kgNodeIds: ['geometry.circles'] },
        { id: 'cbse.math.9.ch10', order: 10, title: "Heron's Formula", kgNodeIds: ['mensuration.perimeter_area_2d'] },
        { id: 'cbse.math.9.ch11', order: 11, title: 'Surface Areas and Volumes', kgNodeIds: ['mensuration.surface_area_volume'] },
        { id: 'cbse.math.9.ch12', order: 12, title: 'Statistics', kgNodeIds: ['statistics.central_tendency'] },
        // Rationalization: Areas of Parallelograms and Triangles, Constructions
        // and Probability deleted by CBSE.
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'cbse.math.10.ch1', order: 1, title: 'Real Numbers', kgNodeIds: ['number_systems.real_irrational'] },
        { id: 'cbse.math.10.ch2', order: 2, title: 'Polynomials', kgNodeIds: ['algebra.polynomials'] },
        { id: 'cbse.math.10.ch3', order: 3, title: 'Pair of Linear Equations in Two Variables', kgNodeIds: ['algebra.linear_equations_2var'] },
        { id: 'cbse.math.10.ch4', order: 4, title: 'Quadratic Equations', kgNodeIds: ['algebra.quadratic_equations'] },
        { id: 'cbse.math.10.ch5', order: 5, title: 'Arithmetic Progressions', kgNodeIds: ['algebra.arithmetic_progressions'] },
        { id: 'cbse.math.10.ch6', order: 6, title: 'Triangles', kgNodeIds: ['geometry.similarity'] },
        { id: 'cbse.math.10.ch7', order: 7, title: 'Coordinate Geometry', kgNodeIds: ['coordinate_geometry.cartesian_plane'] },
        { id: 'cbse.math.10.ch8', order: 8, title: 'Introduction to Trigonometry', kgNodeIds: ['trigonometry.ratios_basics'] },
        { id: 'cbse.math.10.ch9', order: 9, title: 'Some Applications of Trigonometry', kgNodeIds: ['trigonometry.heights_distances'] },
        { id: 'cbse.math.10.ch10', order: 10, title: 'Circles', kgNodeIds: ['geometry.circles'] },
        { id: 'cbse.math.10.ch11', order: 11, title: 'Areas Related to Circles', kgNodeIds: ['mensuration.perimeter_area_2d'] },
        { id: 'cbse.math.10.ch12', order: 12, title: 'Surface Areas and Volumes', kgNodeIds: ['mensuration.surface_area_volume'] },
        { id: 'cbse.math.10.ch13', order: 13, title: 'Statistics', kgNodeIds: ['statistics.central_tendency'] },
        { id: 'cbse.math.10.ch14', order: 14, title: 'Probability', kgNodeIds: ['probability.basics'] },
        // Rationalization: Constructions deleted by CBSE.
      ],
    },
    {
      grade: 11,
      chapters: [
        { id: 'cbse.math.11.ch1', order: 1, title: 'Sets', kgNodeIds: ['algebra.introduction'] },
        { id: 'cbse.math.11.ch2', order: 2, title: 'Relations and Functions', kgNodeIds: ['functions.introduction'] },
        { id: 'cbse.math.11.ch3', order: 3, title: 'Trigonometric Functions', kgNodeIds: ['trigonometry.functions_identities'] },
        { id: 'cbse.math.11.ch4', order: 4, title: 'Complex Numbers and Quadratic Equations', kgNodeIds: ['algebra.quadratic_equations'] },
        { id: 'cbse.math.11.ch5', order: 5, title: 'Linear Inequalities', kgNodeIds: ['algebra.inequalities'] },
        { id: 'cbse.math.11.ch6', order: 6, title: 'Permutations and Combinations', kgNodeIds: ['combinatorics.permutations_combinations'] },
        { id: 'cbse.math.11.ch7', order: 7, title: 'Binomial Theorem', kgNodeIds: ['combinatorics.permutations_combinations'] },
        { id: 'cbse.math.11.ch8', order: 8, title: 'Sequences and Series', kgNodeIds: ['algebra.arithmetic_progressions'] },
        { id: 'cbse.math.11.ch9', order: 9, title: 'Straight Lines', kgNodeIds: ['coordinate_geometry.straight_lines'] },
        { id: 'cbse.math.11.ch10', order: 10, title: 'Conic Sections', kgNodeIds: ['coordinate_geometry.conics'] },
        { id: 'cbse.math.11.ch11', order: 11, title: 'Introduction to Three Dimensional Geometry', kgNodeIds: ['coordinate_geometry.cartesian_plane'] },
        { id: 'cbse.math.11.ch12', order: 12, title: 'Limits and Derivatives', kgNodeIds: ['calculus.limits_continuity'] },
        { id: 'cbse.math.11.ch13', order: 13, title: 'Statistics', kgNodeIds: ['statistics.dispersion'] },
        { id: 'cbse.math.11.ch14', order: 14, title: 'Probability', kgNodeIds: ['probability.advanced'] },
        // Rationalization: Principle of Mathematical Induction and
        // Mathematical Reasoning deleted by CBSE.
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'cbse.math.12.ch1', order: 1, title: 'Relations and Functions', kgNodeIds: ['functions.inverse_composition'] },
        { id: 'cbse.math.12.ch2', order: 2, title: 'Inverse Trigonometric Functions', kgNodeIds: ['trigonometry.functions_identities'] },
        { id: 'cbse.math.12.ch3', order: 3, title: 'Matrices', kgNodeIds: ['matrices.basics'] },
        { id: 'cbse.math.12.ch4', order: 4, title: 'Determinants', kgNodeIds: ['matrices.basics'] },
        { id: 'cbse.math.12.ch5', order: 5, title: 'Continuity and Differentiability', kgNodeIds: ['calculus.differentiation'] },
        { id: 'cbse.math.12.ch6', order: 6, title: 'Application of Derivatives', kgNodeIds: ['calculus.applications_derivatives'] },
        { id: 'cbse.math.12.ch7', order: 7, title: 'Integrals', kgNodeIds: ['calculus.integration'] },
        { id: 'cbse.math.12.ch8', order: 8, title: 'Application of Integrals', kgNodeIds: ['calculus.integration'] },
        { id: 'cbse.math.12.ch9', order: 9, title: 'Differential Equations', kgNodeIds: ['calculus.differential_equations'] },
        { id: 'cbse.math.12.ch10', order: 10, title: 'Vector Algebra', kgNodeIds: ['vectors.basics'] },
        { id: 'cbse.math.12.ch11', order: 11, title: 'Three Dimensional Geometry', kgNodeIds: ['coordinate_geometry.straight_lines', 'vectors.basics'] },
        { id: 'cbse.math.12.ch12', order: 12, title: 'Linear Programming', kgNodeIds: ['algebra.inequalities'] },
        { id: 'cbse.math.12.ch13', order: 13, title: 'Probability', kgNodeIds: ['probability.advanced'] },
      ],
    },
  ],
}

export function getCBSEMathChapters(grade: number) {
  return CBSE_MATH_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSEMathChapter(id: string) {
  for (const grade of CBSE_MATH_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

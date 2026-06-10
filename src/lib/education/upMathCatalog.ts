// UP Board (UPMSP) Mathematics Syllabus — Classes 5 through 12
// Source: Uttar Pradesh Madhyamik Shiksha Parishad (UP Board) official syllabus
// Aligned with NCERT framework (Classes 6–12 follow NCERT structure)
//
// Each chapter lists the KG node ids it develops.
// A chapter may deepen a node introduced in an earlier grade.

import type { BoardSubjectCatalog } from './educationTypes'

export const UP_MATH_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'mathematics',
  subjectName: 'Mathematics (गणित)',
  grades: [

    // ────────────────────────────────────────────────────────────────────────
    // CLASS 5
    // ────────────────────────────────────────────────────────────────────────
    {
      grade: 5,
      chapters: [
        {
          id: 'up.math.5.ch1',
          order: 1,
          title: 'Large Numbers (बड़ी संख्याएँ)',
          kgNodeIds: ['arithmetic.natural_numbers'],
        },
        {
          id: 'up.math.5.ch2',
          order: 2,
          title: 'Addition and Subtraction (जोड़ और घटाव)',
          kgNodeIds: ['arithmetic.addition_subtraction'],
        },
        {
          id: 'up.math.5.ch3',
          order: 3,
          title: 'Multiplication and Division (गुणा और भाग)',
          kgNodeIds: ['arithmetic.multiplication_division'],
        },
        {
          id: 'up.math.5.ch4',
          order: 4,
          title: 'Factors and Multiples (गुणनखण्ड और गुणज)',
          kgNodeIds: ['arithmetic.factors_multiples'],
        },
        {
          id: 'up.math.5.ch5',
          order: 5,
          title: 'Fractions (भिन्न)',
          kgNodeIds: ['fractions.fractions_intro', 'fractions.equivalent_comparing'],
        },
        {
          id: 'up.math.5.ch6',
          order: 6,
          title: 'Decimals (दशमलव)',
          kgNodeIds: ['decimals.decimals_intro'],
        },
        {
          id: 'up.math.5.ch7',
          order: 7,
          title: 'Measurement and Estimation (माप और अनुमान)',
          kgNodeIds: ['arithmetic.estimation_approximation'],
        },
        {
          id: 'up.math.5.ch8',
          order: 8,
          title: 'Geometry — Lines, Angles and Shapes (ज्यामिति)',
          kgNodeIds: ['geometry.basic_shapes', 'geometry.lines_angles'],
        },
        {
          id: 'up.math.5.ch9',
          order: 9,
          title: 'Perimeter and Area (परिमाप और क्षेत्रफल)',
          kgNodeIds: ['mensuration.perimeter_area_2d'],
        },
        {
          id: 'up.math.5.ch10',
          order: 10,
          title: 'Data Handling — Pictographs and Bar Graphs (आँकड़ों का प्रबंधन)',
          kgNodeIds: ['statistics.data_collection_representation'],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // CLASS 6
    // ────────────────────────────────────────────────────────────────────────
    {
      grade: 6,
      chapters: [
        {
          id: 'up.math.6.ch1',
          order: 1,
          title: 'Knowing Our Numbers (संख्याओं की जानकारी)',
          kgNodeIds: ['arithmetic.natural_numbers', 'number_systems.whole_numbers'],
        },
        {
          id: 'up.math.6.ch2',
          order: 2,
          title: 'Whole Numbers (पूर्ण संख्याएँ)',
          kgNodeIds: ['number_systems.whole_numbers'],
        },
        {
          id: 'up.math.6.ch3',
          order: 3,
          title: 'Playing with Numbers — HCF and LCM (संख्याओं के साथ खेलना)',
          kgNodeIds: ['arithmetic.factors_multiples'],
        },
        {
          id: 'up.math.6.ch4',
          order: 4,
          title: 'Basic Geometrical Ideas (मूलभूत ज्यामितीय अवधारणाएँ)',
          kgNodeIds: ['geometry.basic_shapes'],
        },
        {
          id: 'up.math.6.ch5',
          order: 5,
          title: 'Understanding Elementary Shapes (प्रारम्भिक आकारों को समझना)',
          kgNodeIds: ['geometry.basic_shapes', 'geometry.3d_shapes'],
        },
        {
          id: 'up.math.6.ch6',
          order: 6,
          title: 'Integers (पूर्णांक)',
          kgNodeIds: ['number_systems.integers'],
        },
        {
          id: 'up.math.6.ch7',
          order: 7,
          title: 'Fractions (भिन्न)',
          kgNodeIds: ['fractions.fractions_intro', 'fractions.equivalent_comparing', 'fractions.operations_on_fractions'],
        },
        {
          id: 'up.math.6.ch8',
          order: 8,
          title: 'Decimals (दशमलव)',
          kgNodeIds: ['decimals.decimals_intro', 'decimals.operations_on_decimals'],
        },
        {
          id: 'up.math.6.ch9',
          order: 9,
          title: 'Data Handling (आँकड़ों का प्रबंधन)',
          kgNodeIds: ['statistics.data_collection_representation'],
        },
        {
          id: 'up.math.6.ch10',
          order: 10,
          title: 'Mensuration (क्षेत्रमिति)',
          kgNodeIds: ['mensuration.perimeter_area_2d'],
        },
        {
          id: 'up.math.6.ch11',
          order: 11,
          title: 'Algebra — Introduction (बीजगणित)',
          kgNodeIds: ['algebra.intro_variables'],
        },
        {
          id: 'up.math.6.ch12',
          order: 12,
          title: 'Ratio and Proportion (अनुपात और समानुपात)',
          kgNodeIds: ['ratios_proportions.ratio_intro', 'ratios_proportions.proportion_unitary'],
        },
        {
          id: 'up.math.6.ch13',
          order: 13,
          title: 'Symmetry (सममिति)',
          kgNodeIds: ['geometry.basic_shapes'],
        },
        {
          id: 'up.math.6.ch14',
          order: 14,
          title: 'Practical Geometry (व्यावहारिक ज्यामिति)',
          kgNodeIds: ['geometry.constructions'],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // CLASS 7
    // ────────────────────────────────────────────────────────────────────────
    {
      grade: 7,
      chapters: [
        {
          id: 'up.math.7.ch1',
          order: 1,
          title: 'Integers (पूर्णांक)',
          kgNodeIds: ['number_systems.integers', 'integers.integer_operations', 'integers.properties_of_integers'],
        },
        {
          id: 'up.math.7.ch2',
          order: 2,
          title: 'Fractions and Decimals (भिन्न और दशमलव)',
          kgNodeIds: ['fractions.operations_on_fractions', 'decimals.operations_on_decimals'],
        },
        {
          id: 'up.math.7.ch3',
          order: 3,
          title: 'Data Handling (आँकड़ों का प्रबंधन)',
          kgNodeIds: ['statistics.data_collection_representation', 'statistics.central_tendency'],
        },
        {
          id: 'up.math.7.ch4',
          order: 4,
          title: 'Simple Equations (सरल समीकरण)',
          kgNodeIds: ['algebra.linear_equations_1var'],
        },
        {
          id: 'up.math.7.ch5',
          order: 5,
          title: 'Lines and Angles (रेखाएँ और कोण)',
          kgNodeIds: ['geometry.lines_angles'],
        },
        {
          id: 'up.math.7.ch6',
          order: 6,
          title: 'The Triangle and Its Properties (त्रिभुज और उसके गुणधर्म)',
          kgNodeIds: ['geometry.triangles'],
        },
        {
          id: 'up.math.7.ch7',
          order: 7,
          title: 'Congruence of Triangles (त्रिभुजों की सर्वांगसमता)',
          kgNodeIds: ['geometry.congruence'],
        },
        {
          id: 'up.math.7.ch8',
          order: 8,
          title: 'Comparing Quantities — Ratio, Percentage (राशियों की तुलना)',
          kgNodeIds: ['ratios_proportions.ratio_intro', 'percentages.percentage_intro', 'percentages.profit_loss', 'percentages.simple_interest'],
        },
        {
          id: 'up.math.7.ch9',
          order: 9,
          title: 'Rational Numbers (परिमेय संख्याएँ)',
          kgNodeIds: ['number_systems.rational_numbers'],
        },
        {
          id: 'up.math.7.ch10',
          order: 10,
          title: 'Practical Geometry (व्यावहारिक ज्यामिति)',
          kgNodeIds: ['geometry.constructions'],
        },
        {
          id: 'up.math.7.ch11',
          order: 11,
          title: 'Perimeter and Area (परिमाप और क्षेत्रफल)',
          kgNodeIds: ['mensuration.perimeter_area_2d', 'mensuration.circles_area'],
        },
        {
          id: 'up.math.7.ch12',
          order: 12,
          title: 'Algebraic Expressions (बीजीय व्यंजक)',
          kgNodeIds: ['algebra.algebraic_expressions_identities'],
        },
        {
          id: 'up.math.7.ch13',
          order: 13,
          title: 'Exponents and Powers (घातांक और घात)',
          kgNodeIds: ['exponents_powers.exponents_intro', 'exponents_powers.laws_of_exponents'],
        },
        {
          id: 'up.math.7.ch14',
          order: 14,
          title: 'Symmetry (सममिति)',
          kgNodeIds: ['geometry.basic_shapes'],
        },
        {
          id: 'up.math.7.ch15',
          order: 15,
          title: 'Visualising Solid Shapes (ठोस आकारों का दृश्य)',
          kgNodeIds: ['geometry.3d_shapes'],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // CLASS 8
    // ────────────────────────────────────────────────────────────────────────
    {
      grade: 8,
      chapters: [
        {
          id: 'up.math.8.ch1',
          order: 1,
          title: 'Rational Numbers (परिमेय संख्याएँ)',
          kgNodeIds: ['number_systems.rational_numbers', 'integers.properties_of_integers'],
        },
        {
          id: 'up.math.8.ch2',
          order: 2,
          title: 'Linear Equations in One Variable (एक चर वाले रैखिक समीकरण)',
          kgNodeIds: ['algebra.linear_equations_1var'],
        },
        {
          id: 'up.math.8.ch3',
          order: 3,
          title: 'Understanding Quadrilaterals (चतुर्भुजों को समझना)',
          kgNodeIds: ['geometry.quadrilaterals'],
        },
        {
          id: 'up.math.8.ch4',
          order: 4,
          title: 'Data Handling (आँकड़ों का प्रबंधन)',
          kgNodeIds: ['statistics.data_collection_representation', 'probability.basic_probability'],
        },
        {
          id: 'up.math.8.ch5',
          order: 5,
          title: 'Squares and Square Roots (वर्ग और वर्गमूल)',
          kgNodeIds: ['exponents_powers.squares_square_roots'],
        },
        {
          id: 'up.math.8.ch6',
          order: 6,
          title: 'Cubes and Cube Roots (घन और घनमूल)',
          kgNodeIds: ['exponents_powers.cubes_cube_roots'],
        },
        {
          id: 'up.math.8.ch7',
          order: 7,
          title: 'Comparing Quantities — Compound Interest (राशियों की तुलना)',
          kgNodeIds: ['percentages.profit_loss', 'percentages.compound_interest'],
        },
        {
          id: 'up.math.8.ch8',
          order: 8,
          title: 'Algebraic Expressions and Identities (बीजीय व्यंजक और सर्वसमिकाएँ)',
          kgNodeIds: ['algebra.algebraic_expressions_identities'],
        },
        {
          id: 'up.math.8.ch9',
          order: 9,
          title: 'Visualising Solid Shapes (ठोस आकारों का दृश्य)',
          kgNodeIds: ['geometry.3d_shapes'],
        },
        {
          id: 'up.math.8.ch10',
          order: 10,
          title: 'Mensuration (क्षेत्रमिति)',
          kgNodeIds: ['mensuration.perimeter_area_2d', 'mensuration.surface_area_volume'],
        },
        {
          id: 'up.math.8.ch11',
          order: 11,
          title: 'Exponents and Powers (घातांक और घात)',
          kgNodeIds: ['exponents_powers.laws_of_exponents', 'exponents_powers.scientific_notation'],
        },
        {
          id: 'up.math.8.ch12',
          order: 12,
          title: 'Direct and Inverse Proportions (सीधा और प्रतिलोम अनुपात)',
          kgNodeIds: ['ratios_proportions.proportion_unitary'],
        },
        {
          id: 'up.math.8.ch13',
          order: 13,
          title: 'Factorisation (गुणनखण्ड)',
          kgNodeIds: ['algebra.factorisation'],
        },
        {
          id: 'up.math.8.ch14',
          order: 14,
          title: 'Introduction to Graphs (ग्राफों का परिचय)',
          kgNodeIds: ['coordinate_geometry.cartesian_system'],
        },
        {
          id: 'up.math.8.ch15',
          order: 15,
          title: 'Playing with Numbers (संख्याओं के साथ खेलना)',
          kgNodeIds: ['arithmetic.factors_multiples'],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // CLASS 9
    // ────────────────────────────────────────────────────────────────────────
    {
      grade: 9,
      chapters: [
        {
          id: 'up.math.9.ch1',
          order: 1,
          title: 'Number Systems (संख्या पद्धति)',
          kgNodeIds: ['number_systems.rational_numbers', 'number_systems.irrational_numbers', 'number_systems.real_numbers'],
        },
        {
          id: 'up.math.9.ch2',
          order: 2,
          title: 'Polynomials (बहुपद)',
          kgNodeIds: ['algebra.polynomials'],
        },
        {
          id: 'up.math.9.ch3',
          order: 3,
          title: 'Coordinate Geometry (निर्देशांक ज्यामिति)',
          kgNodeIds: ['coordinate_geometry.cartesian_system'],
        },
        {
          id: 'up.math.9.ch4',
          order: 4,
          title: 'Linear Equations in Two Variables (दो चर वाले रैखिक समीकरण)',
          kgNodeIds: ['algebra.linear_equations_2var'],
        },
        {
          id: 'up.math.9.ch5',
          order: 5,
          title: "Introduction to Euclid's Geometry (यूक्लिड की ज्यामिति का परिचय)",
          kgNodeIds: ['geometry.euclid'],
        },
        {
          id: 'up.math.9.ch6',
          order: 6,
          title: 'Lines and Angles (रेखाएँ और कोण)',
          kgNodeIds: ['geometry.lines_angles'],
        },
        {
          id: 'up.math.9.ch7',
          order: 7,
          title: 'Triangles (त्रिभुज)',
          kgNodeIds: ['geometry.triangles', 'geometry.congruence'],
        },
        {
          id: 'up.math.9.ch8',
          order: 8,
          title: 'Quadrilaterals (चतुर्भुज)',
          kgNodeIds: ['geometry.quadrilaterals'],
        },
        {
          id: 'up.math.9.ch9',
          order: 9,
          title: 'Areas of Parallelograms and Triangles (समांतर चतुर्भुज और त्रिभुजों के क्षेत्रफल)',
          kgNodeIds: ['mensuration.perimeter_area_2d'],
        },
        {
          id: 'up.math.9.ch10',
          order: 10,
          title: 'Circles (वृत्त)',
          kgNodeIds: ['geometry.circles'],
        },
        {
          id: 'up.math.9.ch11',
          order: 11,
          title: 'Constructions (रचनाएँ)',
          kgNodeIds: ['geometry.constructions'],
        },
        {
          id: 'up.math.9.ch12',
          order: 12,
          title: "Heron's Formula (हेरोन का सूत्र)",
          kgNodeIds: ['mensuration.perimeter_area_2d'],
        },
        {
          id: 'up.math.9.ch13',
          order: 13,
          title: 'Surface Areas and Volumes (पृष्ठीय क्षेत्रफल और आयतन)',
          kgNodeIds: ['mensuration.surface_area_volume'],
        },
        {
          id: 'up.math.9.ch14',
          order: 14,
          title: 'Statistics (सांख्यिकी)',
          kgNodeIds: ['statistics.data_collection_representation', 'statistics.central_tendency'],
        },
        {
          id: 'up.math.9.ch15',
          order: 15,
          title: 'Probability (प्रायिकता)',
          kgNodeIds: ['probability.basic_probability'],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // CLASS 10
    // ────────────────────────────────────────────────────────────────────────
    {
      grade: 10,
      chapters: [
        {
          id: 'up.math.10.ch1',
          order: 1,
          title: 'Real Numbers (वास्तविक संख्याएँ)',
          kgNodeIds: ['number_systems.real_numbers'],
        },
        {
          id: 'up.math.10.ch2',
          order: 2,
          title: 'Polynomials (बहुपद)',
          kgNodeIds: ['algebra.polynomials'],
        },
        {
          id: 'up.math.10.ch3',
          order: 3,
          title: 'Pair of Linear Equations in Two Variables (दो चर वाले रैखिक समीकरणों का युग्म)',
          kgNodeIds: ['algebra.pair_linear_equations'],
        },
        {
          id: 'up.math.10.ch4',
          order: 4,
          title: 'Quadratic Equations (द्विघात समीकरण)',
          kgNodeIds: ['algebra.quadratic_equations'],
        },
        {
          id: 'up.math.10.ch5',
          order: 5,
          title: 'Arithmetic Progressions (समांतर श्रेढ़ियाँ)',
          kgNodeIds: ['algebra.arithmetic_progressions'],
        },
        {
          id: 'up.math.10.ch6',
          order: 6,
          title: 'Triangles — Similarity (त्रिभुज)',
          kgNodeIds: ['geometry.similarity'],
        },
        {
          id: 'up.math.10.ch7',
          order: 7,
          title: 'Coordinate Geometry (निर्देशांक ज्यामिति)',
          kgNodeIds: ['coordinate_geometry.cartesian_system', 'coordinate_geometry.section_midpoint'],
        },
        {
          id: 'up.math.10.ch8',
          order: 8,
          title: 'Introduction to Trigonometry (त्रिकोणमिति का परिचय)',
          kgNodeIds: ['trigonometry.intro_ratios'],
        },
        {
          id: 'up.math.10.ch9',
          order: 9,
          title: 'Some Applications of Trigonometry (त्रिकोणमिति के कुछ अनुप्रयोग)',
          kgNodeIds: ['trigonometry.applications'],
        },
        {
          id: 'up.math.10.ch10',
          order: 10,
          title: 'Circles (वृत्त)',
          kgNodeIds: ['geometry.circles'],
        },
        {
          id: 'up.math.10.ch11',
          order: 11,
          title: 'Constructions (रचनाएँ)',
          kgNodeIds: ['geometry.constructions'],
        },
        {
          id: 'up.math.10.ch12',
          order: 12,
          title: 'Areas Related to Circles (वृत्तों से संबंधित क्षेत्रफल)',
          kgNodeIds: ['mensuration.circles_area'],
        },
        {
          id: 'up.math.10.ch13',
          order: 13,
          title: 'Surface Areas and Volumes (पृष्ठीय क्षेत्रफल और आयतन)',
          kgNodeIds: ['mensuration.surface_area_volume'],
        },
        {
          id: 'up.math.10.ch14',
          order: 14,
          title: 'Statistics (सांख्यिकी)',
          kgNodeIds: ['statistics.central_tendency'],
        },
        {
          id: 'up.math.10.ch15',
          order: 15,
          title: 'Probability (प्रायिकता)',
          kgNodeIds: ['probability.basic_probability'],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // CLASS 11
    // ────────────────────────────────────────────────────────────────────────
    {
      grade: 11,
      chapters: [
        {
          id: 'up.math.11.ch1',
          order: 1,
          title: 'Sets (समुच्चय)',
          kgNodeIds: ['algebra.sets'],
        },
        {
          id: 'up.math.11.ch2',
          order: 2,
          title: 'Relations and Functions (संबंध एवं फलन)',
          kgNodeIds: ['algebra.relations_functions_intro'],
        },
        {
          id: 'up.math.11.ch3',
          order: 3,
          title: 'Trigonometric Functions (त्रिकोणमितीय फलन)',
          kgNodeIds: ['trigonometry.trig_functions', 'trigonometry.identities'],
        },
        {
          id: 'up.math.11.ch4',
          order: 4,
          title: 'Principle of Mathematical Induction (गणितीय आगमन का सिद्धांत)',
          kgNodeIds: ['algebra.sequences_series'],
        },
        {
          id: 'up.math.11.ch5',
          order: 5,
          title: 'Complex Numbers and Quadratic Equations (सम्मिश्र संख्याएँ और द्विघात समीकरण)',
          kgNodeIds: ['number_systems.complex_numbers', 'algebra.quadratic_equations'],
        },
        {
          id: 'up.math.11.ch6',
          order: 6,
          title: 'Linear Inequalities (रैखिक असमानताएँ)',
          kgNodeIds: ['algebra.linear_inequalities'],
        },
        {
          id: 'up.math.11.ch7',
          order: 7,
          title: 'Permutations and Combinations (क्रमचय और संचय)',
          kgNodeIds: ['combinatorics.fundamental_principle', 'combinatorics.permutations', 'combinatorics.combinations'],
        },
        {
          id: 'up.math.11.ch8',
          order: 8,
          title: 'Binomial Theorem (द्विपद प्रमेय)',
          kgNodeIds: ['combinatorics.binomial_theorem'],
        },
        {
          id: 'up.math.11.ch9',
          order: 9,
          title: 'Sequences and Series (अनुक्रम और श्रेणी)',
          kgNodeIds: ['algebra.arithmetic_progressions', 'algebra.sequences_series'],
        },
        {
          id: 'up.math.11.ch10',
          order: 10,
          title: 'Straight Lines (सरल रेखाएँ)',
          kgNodeIds: ['coordinate_geometry.straight_lines'],
        },
        {
          id: 'up.math.11.ch11',
          order: 11,
          title: 'Conic Sections (शंकु परिच्छेद)',
          kgNodeIds: ['coordinate_geometry.conic_sections'],
        },
        {
          id: 'up.math.11.ch12',
          order: 12,
          title: 'Introduction to Three Dimensional Geometry (त्रिविमीय ज्यामिति)',
          kgNodeIds: ['coordinate_geometry.3d_geometry'],
        },
        {
          id: 'up.math.11.ch13',
          order: 13,
          title: 'Limits and Derivatives (सीमा और अवकलज)',
          kgNodeIds: ['calculus.limits', 'calculus.derivatives'],
        },
        {
          id: 'up.math.11.ch14',
          order: 14,
          title: 'Mathematical Reasoning (गणितीय विवेचन)',
          kgNodeIds: ['algebra.sets'],
        },
        {
          id: 'up.math.11.ch15',
          order: 15,
          title: 'Statistics (सांख्यिकी)',
          kgNodeIds: ['statistics.central_tendency', 'statistics.dispersion'],
        },
        {
          id: 'up.math.11.ch16',
          order: 16,
          title: 'Probability (प्रायिकता)',
          kgNodeIds: ['probability.basic_probability'],
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // CLASS 12
    // ────────────────────────────────────────────────────────────────────────
    {
      grade: 12,
      chapters: [
        {
          id: 'up.math.12.ch1',
          order: 1,
          title: 'Relations and Functions (संबंध एवं फलन)',
          kgNodeIds: ['functions.functions_types', 'functions.binary_operations'],
        },
        {
          id: 'up.math.12.ch2',
          order: 2,
          title: 'Inverse Trigonometric Functions (प्रतिलोम त्रिकोणमितीय फलन)',
          kgNodeIds: ['trigonometry.inverse_trig'],
        },
        {
          id: 'up.math.12.ch3',
          order: 3,
          title: 'Matrices (आव्यूह)',
          kgNodeIds: ['matrices.matrix_intro_operations'],
        },
        {
          id: 'up.math.12.ch4',
          order: 4,
          title: 'Determinants (सारणिक)',
          kgNodeIds: ['matrices.determinants', 'matrices.system_of_equations'],
        },
        {
          id: 'up.math.12.ch5',
          order: 5,
          title: 'Continuity and Differentiability (संततता और अवकलनीयता)',
          kgNodeIds: ['calculus.continuity_differentiability'],
        },
        {
          id: 'up.math.12.ch6',
          order: 6,
          title: 'Applications of Derivatives (अवकलज के अनुप्रयोग)',
          kgNodeIds: ['calculus.applications_derivatives'],
        },
        {
          id: 'up.math.12.ch7',
          order: 7,
          title: 'Integrals (समाकलन)',
          kgNodeIds: ['calculus.integrals'],
        },
        {
          id: 'up.math.12.ch8',
          order: 8,
          title: 'Application of Integrals (समाकलन के अनुप्रयोग)',
          kgNodeIds: ['calculus.applications_integrals'],
        },
        {
          id: 'up.math.12.ch9',
          order: 9,
          title: 'Differential Equations (अवकल समीकरण)',
          kgNodeIds: ['calculus.differential_equations'],
        },
        {
          id: 'up.math.12.ch10',
          order: 10,
          title: 'Vector Algebra (सदिश बीजगणित)',
          kgNodeIds: ['vectors.vector_intro', 'vectors.vector_operations', 'vectors.dot_cross_product'],
        },
        {
          id: 'up.math.12.ch11',
          order: 11,
          title: 'Three Dimensional Geometry (त्रिविमीय ज्यामिति)',
          kgNodeIds: ['coordinate_geometry.3d_geometry'],
        },
        {
          id: 'up.math.12.ch12',
          order: 12,
          title: 'Linear Programming (रैखिक प्रोग्रामन)',
          kgNodeIds: ['algebra.linear_inequalities', 'coordinate_geometry.straight_lines'],
        },
        {
          id: 'up.math.12.ch13',
          order: 13,
          title: 'Probability (प्रायिकता)',
          kgNodeIds: ['probability.conditional_probability'],
        },
      ],
    },
  ],
}

/** Retrieve chapters for a specific grade */
export function getUPMathChapters(grade: number) {
  return UP_MATH_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

/** Get a single chapter by id */
export function getUPMathChapter(chapterId: string) {
  for (const grade of UP_MATH_CATALOG.grades) {
    const found = grade.chapters.find((c) => c.id === chapterId)
    if (found) return found
  }
  return undefined
}

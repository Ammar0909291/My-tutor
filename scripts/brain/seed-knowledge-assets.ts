/**
 * Wave 0 Step 1 — Activate AssetIdentity (Migration Blueprint Phase 0).
 *
 * Seeds the human-authored Educational Brain concept-entry content
 * (src/lib/teaching/assets/brainSeedAssets.ts — every item cites its
 * educational-brain/ source section) into the AssetIdentity catalogue so
 * that assembleLesson() retrieves authored teaching content instead of
 * the LLM generating an equivalent.
 *
 * Status policy:
 *   default        → ACTIVE. ADR 14's DRAFT→review gate exists to keep
 *                    unreviewed AI_AUTHORED output from serving; these
 *                    assets are HUMAN_CURATOR transcriptions of the frozen,
 *                    audited Brain entries (Deliveries 5/14 + the final
 *                    architecture sign-off) — the review happened in the
 *                    Brain's own authoring/audit cycle. Wave 0 Step 1's
 *                    explicit instruction: "make the runtime retrieve them."
 *   --draft        → seed as DRAFT instead, for owners who prefer to run
 *                    the /api/admin/knowledge-assets approval flow anyway.
 *   --dry-run      → print what would be written; touch nothing.
 *
 * Idempotent: an existing row with the same canonicalSlug is never
 * duplicated. ACTIVE/DRAFT/REVIEW rows are skipped (post-seed evolution
 * belongs to the capture pipeline + admin review flow). DEPRECATED or
 * RETIRED rows are revived: status restored to the target, version
 * bumped, content refreshed from the authored source.
 *
 * Run: npx tsx scripts/brain/seed-knowledge-assets.ts [--draft] [--dry-run]
 */
import { PrismaClient, AssetFamily, AssetStatus, AuthorKind, ExplanationStyle } from '@prisma/client'
import {
  SEED_EXPLANATIONS, SEED_PROBES, SEED_LANGUAGE, SEED_AUTHOR_ID, seedCanonicalSlug,
  buildProbeSlugResolver, abandonedLegacyProbeSlugs, SEED_REVIVABLE_STATUSES,
} from '../../src/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } from '../../src/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } from '../../src/lib/teaching/assets/chemistrySeedAssets'
import { BIOLOGY_EXPLANATIONS, BIOLOGY_PROBES } from '../../src/lib/teaching/assets/biologySeedAssets'
import { BIOLOGY_EXTENSION_EXPLANATIONS, BIOLOGY_EXTENSION_PROBES } from '../../src/lib/teaching/assets/biologyExtensionSeedAssets'
import { CS_EXPLANATIONS, CS_PROBES } from '../../src/lib/teaching/assets/csSeedAssets'
import { MATHEMATICS_EXPLANATIONS, MATHEMATICS_PROBES } from '../../src/lib/teaching/assets/mathematicsSeedAssets'
import { MATHEMATICS_FOUNDATION_EXPLANATIONS, MATHEMATICS_FOUNDATION_PROBES } from '../../src/lib/teaching/assets/mathematicsFoundationAssets'
import { MATHEMATICS_ARITHMETIC_EXPLANATIONS, MATHEMATICS_ARITHMETIC_PROBES } from '../../src/lib/teaching/assets/mathematicsArithmeticFoundations'
import { MATHEMATICS_BATCH3_EXPLANATIONS, MATHEMATICS_BATCH3_PROBES } from '../../src/lib/teaching/assets/mathematicsBatch3Assets'
import { MATHEMATICS_GEOMETRY_EXPLANATIONS, MATHEMATICS_GEOMETRY_PROBES } from '../../src/lib/teaching/assets/mathematicsGeometryFoundations'
import { MATHEMATICS_FRACTION_EXPLANATIONS, MATHEMATICS_FRACTION_PROBES } from '../../src/lib/teaching/assets/mathematicsFractionDecimalAssets'
import { MATHEMATICS_PROPORTION_EXPLANATIONS, MATHEMATICS_PROPORTION_PROBES } from '../../src/lib/teaching/assets/mathematicsProportionProofAssets'
import { MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS, MATHEMATICS_ALGEBRA_VOCAB_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraVocabAssets'
import { MATHEMATICS_POWERS_VARIATION_EXPLANATIONS, MATHEMATICS_POWERS_VARIATION_PROBES } from '../../src/lib/teaching/assets/mathematicsPowersVariationAssets'
import { MATHEMATICS_SET_OPERATIONS_EXPLANATIONS, MATHEMATICS_SET_OPERATIONS_PROBES } from '../../src/lib/teaching/assets/mathematicsSetOperationsAssets'
import { MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS, MATHEMATICS_RELATIONS_NUMBERS_PROBES } from '../../src/lib/teaching/assets/mathematicsRelationsNumbersAssets'
import { MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS, MATHEMATICS_ORDERS_PROOFS_PROBES } from '../../src/lib/teaching/assets/mathematicsOrdersProofsAssets'
import { MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS, MATHEMATICS_LANGUAGE_STRATEGY_PROBES } from '../../src/lib/teaching/assets/mathematicsLanguageStrategyAssets'
import { MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS, MATHEMATICS_PROOF_MACHINERY_PROBES } from '../../src/lib/teaching/assets/mathematicsProofMachineryAssets'
import { MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS, MATHEMATICS_QUANTIFIER_CRAFT_PROBES } from '../../src/lib/teaching/assets/mathematicsQuantifierCraftAssets'
import { MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS, MATHEMATICS_FOUNDATIONS_CLOSE_PROBES } from '../../src/lib/teaching/assets/mathematicsFoundationsCloseAssets'
import { MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS, MATHEMATICS_NUMBER_SYSTEMS_PROBES } from '../../src/lib/teaching/assets/mathematicsNumberSystemsCloseAssets'
import { MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS, MATHEMATICS_ALGORITHMS_PRECISION_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgorithmsPrecisionAssets'
import { MATHEMATICS_ARITH_CLOSE_EXPLANATIONS, MATHEMATICS_ARITH_CLOSE_PROBES } from '../../src/lib/teaching/assets/mathematicsArithCloseAssets'
import { MATHEMATICS_MEASUREMENT_EXPLANATIONS, MATHEMATICS_MEASUREMENT_PROBES } from '../../src/lib/teaching/assets/mathematicsMeasurementAssets'
import { MATHEMATICS_COORDINATE_EXPLANATIONS, MATHEMATICS_COORDINATE_PROBES } from '../../src/lib/teaching/assets/mathematicsCoordinateAssets'
import { MATHEMATICS_NUMBER_THEORY_EXPLANATIONS, MATHEMATICS_NUMBER_THEORY_PROBES } from '../../src/lib/teaching/assets/mathematicsNumberTheoryAssets'
import { MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS, MATHEMATICS_TRIANGLE_TRANSFORM_PROBES } from '../../src/lib/teaching/assets/mathematicsTriangleTransformAssets'
import { MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS, MATHEMATICS_DIVISIBILITY_MODULAR_PROBES } from '../../src/lib/teaching/assets/mathematicsDivisibilityModularAssets'
import { MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS, MATHEMATICS_CRYPTO_NUMBER_PROBES } from '../../src/lib/teaching/assets/mathematicsCryptoNumberAssets'
import { MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS, MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES } from '../../src/lib/teaching/assets/mathematicsAnalyticAlgebraicAssets'
import { MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS, MATHEMATICS_SOLIDS_POLYGONS_PROBES } from '../../src/lib/teaching/assets/mathematicsSolidsPolygonsAssets'
import { MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS, MATHEMATICS_CIRCLES_TRANSFORM_PROBES } from '../../src/lib/teaching/assets/mathematicsCirclesTransformAssets'
import { MATHEMATICS_VECTORS_CONICS_EXPLANATIONS, MATHEMATICS_VECTORS_CONICS_PROBES } from '../../src/lib/teaching/assets/mathematicsVectorsConicsAssets'
import { MATHEMATICS_DIFF_GEOM_EXPLANATIONS, MATHEMATICS_DIFF_GEOM_PROBES } from '../../src/lib/teaching/assets/mathematicsDiffGeomAssets'
import { MATHEMATICS_CATEGORY_FOUNDATIONS_EXPLANATIONS, MATHEMATICS_CATEGORY_FOUNDATIONS_PROBES } from '../../src/lib/teaching/assets/mathematicsCategoryFoundationsAssets'
import { MATHEMATICS_CATEGORY_MORPHISM_EXPLANATIONS, MATHEMATICS_CATEGORY_MORPHISM_PROBES } from '../../src/lib/teaching/assets/mathematicsCategoryMorphismAssets'
import { MATHEMATICS_CATEGORY_STRUCTURE_EXPLANATIONS, MATHEMATICS_CATEGORY_STRUCTURE_PROBES } from '../../src/lib/teaching/assets/mathematicsCategoryStructureAssets'
import { MATHEMATICS_CATEGORY_LIMITS_EXPLANATIONS, MATHEMATICS_CATEGORY_LIMITS_PROBES } from '../../src/lib/teaching/assets/mathematicsCategoryLimitsAssets'
import { MATHEMATICS_CATEGORY_ADJUNCTION_EXPLANATIONS, MATHEMATICS_CATEGORY_ADJUNCTION_PROBES } from '../../src/lib/teaching/assets/mathematicsCategoryAdjunctionAssets'
import { MATHEMATICS_CATEGORY_MONAD_EXPLANATIONS, MATHEMATICS_CATEGORY_MONAD_PROBES } from '../../src/lib/teaching/assets/mathematicsCategoryMonadAssets'
import { MATHEMATICS_CATEGORY_CLOSURE_EXPLANATIONS, MATHEMATICS_CATEGORY_CLOSURE_PROBES } from '../../src/lib/teaching/assets/mathematicsCategoryClosureAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_FOUNDATIONS_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_FOUNDATIONS_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraFoundationsAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_GROUP_OPS_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_GROUP_OPS_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraGroupOpsAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_SUBGROUP_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_SUBGROUP_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraSubgroupAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_ORDER_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_ORDER_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraOrderAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_RING_HOM_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_RING_HOM_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraRingHomAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_ACTION_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_ACTION_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraActionAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_QUOTIENT_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_QUOTIENT_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraQuotientAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_IDEAL_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_IDEAL_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraIdealAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_PRIME_EUCLID_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_PRIME_EUCLID_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraPrimeEuclidAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_FIELD_PID_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_FIELD_PID_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraFieldPidAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_UFD_QUOTIENT_RING_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_UFD_QUOTIENT_RING_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraUfdQuotientRingAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_HOM_ISO_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_HOM_ISO_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraHomIsoAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_FIT_LAGRANGE_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_FIT_LAGRANGE_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraFitLagrangeAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_ISO_FINITE_FIELD_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_ISO_FINITE_FIELD_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraIsoFiniteFieldAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_ALT_GROUP_FIELD_EXT_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_ALT_GROUP_FIELD_EXT_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraAltGroupFieldExtAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_BURNSIDE_SYLOW_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_BURNSIDE_SYLOW_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraBurnsideSylowAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_ALG_EXT_GALOIS_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_ALG_EXT_GALOIS_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraAlgExtGaloisAssets'
import { MATHEMATICS_ABSTRACT_ALGEBRA_GALOIS_GROUP_CORRESPONDENCE_EXPLANATIONS, MATHEMATICS_ABSTRACT_ALGEBRA_GALOIS_GROUP_CORRESPONDENCE_PROBES } from '../../src/lib/teaching/assets/mathematicsAbstractAlgebraGaloisGroupCorrespondenceAssets'
import { MATHEMATICS_ALGEBRA_SIMPLIFY_LINEAR_EXPLANATIONS, MATHEMATICS_ALGEBRA_SIMPLIFY_LINEAR_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraSimplifyLinearAssets'
import { MATHEMATICS_ALGEBRA_INEQUALITY_RADICALS_EXPLANATIONS, MATHEMATICS_ALGEBRA_INEQUALITY_RADICALS_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraInequalityRadicalsAssets'
import { MATHEMATICS_ALGEBRA_POLY_OPS_EXP_FUNC_EXPLANATIONS, MATHEMATICS_ALGEBRA_POLY_OPS_EXP_FUNC_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraPolyOpsExpFuncAssets'
import { MATHEMATICS_ALGEBRA_COMPLETE_SQUARE_POLY_DIV_EXPLANATIONS, MATHEMATICS_ALGEBRA_COMPLETE_SQUARE_POLY_DIV_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraCompleteSquarePolyDivAssets'
import { MATHEMATICS_ALGEBRA_SYSTEMS_LOGARITHM_EXPLANATIONS, MATHEMATICS_ALGEBRA_SYSTEMS_LOGARITHM_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraSystemsLogarithmAssets'
import { MATHEMATICS_ALGEBRA_REMAINDER_QUADRATIC_EXPLANATIONS, MATHEMATICS_ALGEBRA_REMAINDER_QUADRATIC_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraRemainderQuadraticAssets'
import { MATHEMATICS_ALGEBRA_FACTOR_DISCRIMINANT_EXPLANATIONS, MATHEMATICS_ALGEBRA_FACTOR_DISCRIMINANT_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraFactorDiscriminantAssets'
import { MATHEMATICS_ALGEBRA_FACTORING_ROOTS_EXPLANATIONS, MATHEMATICS_ALGEBRA_FACTORING_ROOTS_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraFactoringRootsAssets'
import { MATHEMATICS_ALGEBRA_RATIONAL_FTA_EXPLANATIONS, MATHEMATICS_ALGEBRA_RATIONAL_FTA_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraRationalFtaAssets'
import { MATHEMATICS_ALGEBRA_GCF_RATIONAL_EQ_EXPLANATIONS, MATHEMATICS_ALGEBRA_GCF_RATIONAL_EQ_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraGcfRationalEqAssets'
import { MATHEMATICS_ALGEBRA_LOG_PROPS_EXP_EQ_EXPLANATIONS, MATHEMATICS_ALGEBRA_LOG_PROPS_EXP_EQ_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraLogPropsExpEqAssets'
import { MATHEMATICS_ALGEBRA_LOG_EQ_CHANGE_BASE_EXPLANATIONS, MATHEMATICS_ALGEBRA_LOG_EQ_CHANGE_BASE_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraLogEqChangeBaseAssets'
import { MATHEMATICS_ALGEBRA_POLY_INEQ_SIMPLIFY_RADICALS_EXPLANATIONS, MATHEMATICS_ALGEBRA_POLY_INEQ_SIMPLIFY_RADICALS_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraPolyIneqSimplifyRadicalsAssets'
import { MATHEMATICS_ALGEBRA_BINOMIAL_TRINOMIALS_EXPLANATIONS, MATHEMATICS_ALGEBRA_BINOMIAL_TRINOMIALS_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraBinomialTrinomialsAssets'
import { MATHEMATICS_ALGEBRA_PASCALS_RATIONALIZING_EXPLANATIONS, MATHEMATICS_ALGEBRA_PASCALS_RATIONALIZING_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraPascalsRationalizingAssets'
import { MATHEMATICS_ALGEBRA_FACTORING_SPECIAL_ROOT_THEOREM_EXPLANATIONS, MATHEMATICS_ALGEBRA_FACTORING_SPECIAL_ROOT_THEOREM_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraFactoringSpecialRootTheoremAssets'
import { MATHEMATICS_ALGEBRA_VIETAS_COMPLEX_ROOTS_EXPLANATIONS, MATHEMATICS_ALGEBRA_VIETAS_COMPLEX_ROOTS_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraVietasComplexRootsAssets'
import { MATHEMATICS_ALGEBRA_RATIONAL_EXPR_OPS_EXPLANATIONS, MATHEMATICS_ALGEBRA_RATIONAL_EXPR_OPS_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraRationalExprOpsAssets'
import { MATHEMATICS_ALGEBRA_RAT_INEQ_ABS_VAL_EXPLANATIONS, MATHEMATICS_ALGEBRA_RAT_INEQ_ABS_VAL_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraRatIneqAbsValAssets'
import { MATHEMATICS_ALGEBRA_ELIM_SUBST_METHOD_EXPLANATIONS, MATHEMATICS_ALGEBRA_ELIM_SUBST_METHOD_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraElimSubstMethodAssets'
import { MATHEMATICS_ALGEBRA_FRAC_EXP_RADICAL_EQ_EXPLANATIONS, MATHEMATICS_ALGEBRA_FRAC_EXP_RADICAL_EQ_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraFracExpRadicalEqAssets'
import { MATHEMATICS_ALGEBRA_INEQ2VAR_LOG_SYSTEM3VAR_EXPLANATIONS, MATHEMATICS_ALGEBRA_INEQ2VAR_LOG_SYSTEM3VAR_PROBES } from '../../src/lib/teaching/assets/mathematicsAlgebraIneq2varLogSystem3varAssets'
import { MATHEMATICS_CALCULUS_LIMIT_LAWS_CONTINUITY_EXPLANATIONS, MATHEMATICS_CALCULUS_LIMIT_LAWS_CONTINUITY_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusLimitLawsContinuityAssets'
import { MATHEMATICS_CALCULUS_CONTINUITY_TYPES_IVT_DERIV_DEF_EXPLANATIONS, MATHEMATICS_CALCULUS_CONTINUITY_TYPES_IVT_DERIV_DEF_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusContinuityTypesIvtDerivDefAssets'
import { MATHEMATICS_CALCULUS_DERIV_RULES_DIFF_MVT_EXPLANATIONS, MATHEMATICS_CALCULUS_DERIV_RULES_DIFF_MVT_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusDerivRulesDiffMvtAssets'
import { MATHEMATICS_CALCULUS_PRODUCT_RULE_CRITICAL_POINTS_INC_DEC_EXPLANATIONS, MATHEMATICS_CALCULUS_PRODUCT_RULE_CRITICAL_POINTS_INC_DEC_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusProductRuleCriticalPointsIncDecAssets'
import { MATHEMATICS_CALCULUS_LOCAL_EXTREMA_QUOTIENT_HIGHER_ORDER_EXPLANATIONS, MATHEMATICS_CALCULUS_LOCAL_EXTREMA_QUOTIENT_HIGHER_ORDER_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusLocalExtremaQuotientHigherOrderAssets'
import { MATHEMATICS_CALCULUS_CONCAVITY_OPTIMIZATION_LINEARIZATION_EXPLANATIONS, MATHEMATICS_CALCULUS_CONCAVITY_OPTIMIZATION_LINEARIZATION_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusConcavityOptimizationLinearizationAssets'
import { MATHEMATICS_CALCULUS_LHOPITAL_LIMITS_INFINITY_ROLLES_EXPLANATIONS, MATHEMATICS_CALCULUS_LHOPITAL_LIMITS_INFINITY_ROLLES_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusLhopitalLimitsInfinityRollesAssets'
import { MATHEMATICS_CALCULUS_CURVE_SKETCHING_RIEMANN_SQUEEZE_EXPLANATIONS, MATHEMATICS_CALCULUS_CURVE_SKETCHING_RIEMANN_SQUEEZE_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusCurveSketchingRiemannSqueezeAssets'
import { MATHEMATICS_CALCULUS_DEFINITE_INTEGRAL_TRIG_MULTIVAR_EXPLANATIONS, MATHEMATICS_CALCULUS_DEFINITE_INTEGRAL_TRIG_MULTIVAR_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusDefiniteIntegralTrigMultivarAssets'
import { MATHEMATICS_CALCULUS_FTC_PART1_INTEGRAL_AREA_PARTIAL_DERIV_EXPLANATIONS, MATHEMATICS_CALCULUS_FTC_PART1_INTEGRAL_AREA_PARTIAL_DERIV_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusFtcPart1IntegralAreaPartialDerivAssets'
import { MATHEMATICS_CALCULUS_FTC_PART2_GRADIENT_ARC_LENGTH_EXPLANATIONS, MATHEMATICS_CALCULUS_FTC_PART2_GRADIENT_ARC_LENGTH_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusFtcPart2GradientArcLengthAssets'
import { MATHEMATICS_CALCULUS_DIRECTIONAL_DERIV_USUB_VOLUME_REV_EXPLANATIONS, MATHEMATICS_CALCULUS_DIRECTIONAL_DERIV_USUB_VOLUME_REV_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusDirectionalDerivUSubVolumeRevAssets'
import { MATHEMATICS_CALCULUS_INTEG_BY_PARTS_MULTIVAR_EXTREMA_IMPROPER_EXPLANATIONS, MATHEMATICS_CALCULUS_INTEG_BY_PARTS_MULTIVAR_EXTREMA_IMPROPER_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusIntegByPartsMultivarExtremaImproperAssets'
import { MATHEMATICS_CALCULUS_CHAIN_RULE_MULTIVAR_IMPLICIT_DIFF_MULTIPLE_INTEGRALS_EXPLANATIONS, MATHEMATICS_CALCULUS_CHAIN_RULE_MULTIVAR_IMPLICIT_DIFF_MULTIPLE_INTEGRALS_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusChainRuleMultivarImplicitDiffMultipleIntegralsAssets'
import { MATHEMATICS_CALCULUS_RELATED_RATES_REDUCTION_FORMULAS_DOUBLE_INTEGRALS_EXPLANATIONS, MATHEMATICS_CALCULUS_RELATED_RATES_REDUCTION_FORMULAS_DOUBLE_INTEGRALS_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusRelatedRatesReductionFormulasDoubleIntegralsAssets'
import { MATHEMATICS_CALCULUS_TRIPLE_INTEGRALS_PARAMETRIC_CURVES_SURFACE_AREA_EXPLANATIONS, MATHEMATICS_CALCULUS_TRIPLE_INTEGRALS_PARAMETRIC_CURVES_SURFACE_AREA_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusTripleIntegralsParametricCurvesSurfaceAreaAssets'
import { MATHEMATICS_CALCULUS_PARAMETRIC_CALC_LINE_INTEGRALS_VECTOR_FIELDS_EXPLANATIONS, MATHEMATICS_CALCULUS_PARAMETRIC_CALC_LINE_INTEGRALS_VECTOR_FIELDS_PROBES } from '../../src/lib/teaching/assets/mathematicsCalculusParametricCalcLineIntegralsVectorFieldsAssets'
import { MATHEMATICS_BAND_GAP_EXPLANATIONS, MATHEMATICS_BAND_GAP_PROBES } from '../../src/lib/teaching/assets/mathematicsBandGapAssets'
import { PHYSICS_BAND_GAP_PROBES } from '../../src/lib/teaching/assets/physicsBandGapAssets'
import { PHYSICS_DEPTH_PROBES } from '../../src/lib/teaching/assets/physicsDepthSeedAssets'
import { CHEMISTRY_DEPTH_PROBES } from '../../src/lib/teaching/assets/chemistryDepthSeedAssets'
import { BIOLOGY_DEPTH_PROBES } from '../../src/lib/teaching/assets/biologyDepthSeedAssets'
import { ENGLISH_BAND_GAP_PROBES } from '../../src/lib/teaching/assets/englishBandGapAssets'
import { ENGLISH_PROBE_BATCH_1 } from '../../src/lib/teaching/assets/englishProbeBatch1'
import { ENGLISH_BATCH_1_DEPTH_4 } from '../../src/lib/teaching/assets/englishBatch1Depth4'
import { ENGLISH_PROBE_BATCH_2 } from '../../src/lib/teaching/assets/englishProbeBatch2'
import { ENGLISH_PROBE_BATCH_3 } from '../../src/lib/teaching/assets/englishProbeBatch3'
import { ENGLISH_PROBE_BATCH_4 } from '../../src/lib/teaching/assets/englishProbeBatch4'
import { ENGLISH_PROBE_BATCH_5 } from '../../src/lib/teaching/assets/englishProbeBatch5'
import { ENGLISH_PROBE_BATCH_6 } from '../../src/lib/teaching/assets/englishProbeBatch6'
import { ENGLISH_PROBE_BATCH_7 } from '../../src/lib/teaching/assets/englishProbeBatch7'
import { ENGLISH_PROBE_BATCH_8 } from '../../src/lib/teaching/assets/englishProbeBatch8'
import { ENGLISH_PROBE_BATCH_9 } from '../../src/lib/teaching/assets/englishProbeBatch9'
import { ENGLISH_PROBE_BATCH_10 } from '../../src/lib/teaching/assets/englishProbeBatch10'
import { ENGLISH_ADULT_BAND_BATCH_1 } from '../../src/lib/teaching/assets/englishAdultBandBatch1'
import { ENGLISH_ADULT_BAND_BATCH_2 } from '../../src/lib/teaching/assets/englishAdultBandBatch2'
import { ENGLISH_ADULT_BAND_BATCH_3 } from '../../src/lib/teaching/assets/englishAdultBandBatch3'
import { ENGLISH_ADULT_BAND_BATCH_4 } from '../../src/lib/teaching/assets/englishAdultBandBatch4'
import { ENGLISH_ADULT_BAND_BATCH_5 } from '../../src/lib/teaching/assets/englishAdultBandBatch5'
import { ENGLISH_ADULT_BAND_BATCH_6 } from '../../src/lib/teaching/assets/englishAdultBandBatch6'
import { ENGLISH_ADULT_BAND_BATCH_7 } from '../../src/lib/teaching/assets/englishAdultBandBatch7'
import { ENGLISH_ADULT_BAND_BATCH_8 } from '../../src/lib/teaching/assets/englishAdultBandBatch8'
import { ENGLISH_ADULT_BAND_BATCH_9 } from '../../src/lib/teaching/assets/englishAdultBandBatch9'
import { ENGLISH_ADULT_BAND_BATCH_10 } from '../../src/lib/teaching/assets/englishAdultBandBatch10'
import { ENGLISH_ADULT_BAND_BATCH_11 } from '../../src/lib/teaching/assets/englishAdultBandBatch11'
import { ENGLISH_ADULT_BAND_BATCH_12 } from '../../src/lib/teaching/assets/englishAdultBandBatch12'
import { ENGLISH_ADULT_BAND_BATCH_13 } from '../../src/lib/teaching/assets/englishAdultBandBatch13'
import { ENGLISH_ADULT_BAND_BATCH_14 } from '../../src/lib/teaching/assets/englishAdultBandBatch14'
import { ENGLISH_ADULT_BAND_BATCH_15 } from '../../src/lib/teaching/assets/englishAdultBandBatch15'
import { ENGLISH_ADULT_BAND_BATCH_16 } from '../../src/lib/teaching/assets/englishAdultBandBatch16'
import { ENGLISH_ADULT_BAND_BATCH_17 } from '../../src/lib/teaching/assets/englishAdultBandBatch17'
import { ENGLISH_ADULT_BAND_BATCH_18 } from '../../src/lib/teaching/assets/englishAdultBandBatch18'
import { ENGLISH_ADULT_BAND_BATCH_19 } from '../../src/lib/teaching/assets/englishAdultBandBatch19'
import { ENGLISH_ADULT_BAND_BATCH_20 } from '../../src/lib/teaching/assets/englishAdultBandBatch20'
import { ENGLISH_ADULT_BAND_BATCH_21 } from '../../src/lib/teaching/assets/englishAdultBandBatch21'
import { ENGLISH_LETTER_SOUND_ELEMENTARY_GAP } from '../../src/lib/teaching/assets/englishLetterSoundElementaryGap'

// One seed pass covers all collections: the frozen-Brain transcriptions
// (brainSeedAssets), the blueprint-grounded authored batch
// (authoredSeedAssets), and per-subject authored assets (chemistry, biology).
// Same idempotency, KG-validation, and status rules.
const ALL_EXPLANATIONS = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS, ...CHEMISTRY_EXPLANATIONS, ...BIOLOGY_EXPLANATIONS, ...BIOLOGY_EXTENSION_EXPLANATIONS, ...CS_EXPLANATIONS, ...MATHEMATICS_EXPLANATIONS, ...MATHEMATICS_FOUNDATION_EXPLANATIONS, ...MATHEMATICS_ARITHMETIC_EXPLANATIONS, ...MATHEMATICS_BATCH3_EXPLANATIONS, ...MATHEMATICS_GEOMETRY_EXPLANATIONS, ...MATHEMATICS_FRACTION_EXPLANATIONS, ...MATHEMATICS_PROPORTION_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS, ...MATHEMATICS_POWERS_VARIATION_EXPLANATIONS, ...MATHEMATICS_SET_OPERATIONS_EXPLANATIONS, ...MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS, ...MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS, ...MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS, ...MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS, ...MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS, ...MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS, ...MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS, ...MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS, ...MATHEMATICS_ARITH_CLOSE_EXPLANATIONS, ...MATHEMATICS_MEASUREMENT_EXPLANATIONS, ...MATHEMATICS_COORDINATE_EXPLANATIONS, ...MATHEMATICS_NUMBER_THEORY_EXPLANATIONS, ...MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS, ...MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS, ...MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS, ...MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS, ...MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS, ...MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS, ...MATHEMATICS_VECTORS_CONICS_EXPLANATIONS, ...MATHEMATICS_DIFF_GEOM_EXPLANATIONS, ...MATHEMATICS_BAND_GAP_EXPLANATIONS, ...MATHEMATICS_CATEGORY_FOUNDATIONS_EXPLANATIONS, ...MATHEMATICS_CATEGORY_MORPHISM_EXPLANATIONS, ...MATHEMATICS_CATEGORY_STRUCTURE_EXPLANATIONS, ...MATHEMATICS_CATEGORY_LIMITS_EXPLANATIONS, ...MATHEMATICS_CATEGORY_ADJUNCTION_EXPLANATIONS, ...MATHEMATICS_CATEGORY_MONAD_EXPLANATIONS, ...MATHEMATICS_CATEGORY_CLOSURE_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_FOUNDATIONS_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_GROUP_OPS_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_SUBGROUP_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_ORDER_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_RING_HOM_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_ACTION_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_QUOTIENT_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_IDEAL_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_PRIME_EUCLID_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_FIELD_PID_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_UFD_QUOTIENT_RING_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_HOM_ISO_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_FIT_LAGRANGE_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_ISO_FINITE_FIELD_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_ALT_GROUP_FIELD_EXT_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_BURNSIDE_SYLOW_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_ALG_EXT_GALOIS_EXPLANATIONS, ...MATHEMATICS_ABSTRACT_ALGEBRA_GALOIS_GROUP_CORRESPONDENCE_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_SIMPLIFY_LINEAR_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_INEQUALITY_RADICALS_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_POLY_OPS_EXP_FUNC_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_COMPLETE_SQUARE_POLY_DIV_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_SYSTEMS_LOGARITHM_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_REMAINDER_QUADRATIC_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_FACTOR_DISCRIMINANT_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_FACTORING_ROOTS_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_RATIONAL_FTA_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_GCF_RATIONAL_EQ_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_LOG_PROPS_EXP_EQ_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_LOG_EQ_CHANGE_BASE_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_POLY_INEQ_SIMPLIFY_RADICALS_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_BINOMIAL_TRINOMIALS_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_PASCALS_RATIONALIZING_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_FACTORING_SPECIAL_ROOT_THEOREM_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_VIETAS_COMPLEX_ROOTS_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_RATIONAL_EXPR_OPS_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_RAT_INEQ_ABS_VAL_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_ELIM_SUBST_METHOD_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_FRAC_EXP_RADICAL_EQ_EXPLANATIONS, ...MATHEMATICS_ALGEBRA_INEQ2VAR_LOG_SYSTEM3VAR_EXPLANATIONS, ...MATHEMATICS_CALCULUS_LIMIT_LAWS_CONTINUITY_EXPLANATIONS, ...MATHEMATICS_CALCULUS_CONTINUITY_TYPES_IVT_DERIV_DEF_EXPLANATIONS, ...MATHEMATICS_CALCULUS_DERIV_RULES_DIFF_MVT_EXPLANATIONS, ...MATHEMATICS_CALCULUS_PRODUCT_RULE_CRITICAL_POINTS_INC_DEC_EXPLANATIONS, ...MATHEMATICS_CALCULUS_LOCAL_EXTREMA_QUOTIENT_HIGHER_ORDER_EXPLANATIONS, ...MATHEMATICS_CALCULUS_CONCAVITY_OPTIMIZATION_LINEARIZATION_EXPLANATIONS, ...MATHEMATICS_CALCULUS_LHOPITAL_LIMITS_INFINITY_ROLLES_EXPLANATIONS, ...MATHEMATICS_CALCULUS_CURVE_SKETCHING_RIEMANN_SQUEEZE_EXPLANATIONS, ...MATHEMATICS_CALCULUS_DEFINITE_INTEGRAL_TRIG_MULTIVAR_EXPLANATIONS, ...MATHEMATICS_CALCULUS_FTC_PART1_INTEGRAL_AREA_PARTIAL_DERIV_EXPLANATIONS, ...MATHEMATICS_CALCULUS_FTC_PART2_GRADIENT_ARC_LENGTH_EXPLANATIONS, ...MATHEMATICS_CALCULUS_DIRECTIONAL_DERIV_USUB_VOLUME_REV_EXPLANATIONS, ...MATHEMATICS_CALCULUS_INTEG_BY_PARTS_MULTIVAR_EXTREMA_IMPROPER_EXPLANATIONS, ...MATHEMATICS_CALCULUS_CHAIN_RULE_MULTIVAR_IMPLICIT_DIFF_MULTIPLE_INTEGRALS_EXPLANATIONS, ...MATHEMATICS_CALCULUS_RELATED_RATES_REDUCTION_FORMULAS_DOUBLE_INTEGRALS_EXPLANATIONS, ...MATHEMATICS_CALCULUS_TRIPLE_INTEGRALS_PARAMETRIC_CURVES_SURFACE_AREA_EXPLANATIONS, ...MATHEMATICS_CALCULUS_PARAMETRIC_CALC_LINE_INTEGRALS_VECTOR_FIELDS_EXPLANATIONS]
const ALL_PROBES = [...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES, ...BIOLOGY_PROBES, ...BIOLOGY_EXTENSION_PROBES, ...CS_PROBES, ...MATHEMATICS_PROBES, ...MATHEMATICS_FOUNDATION_PROBES, ...MATHEMATICS_ARITHMETIC_PROBES, ...MATHEMATICS_BATCH3_PROBES, ...MATHEMATICS_GEOMETRY_PROBES, ...MATHEMATICS_FRACTION_PROBES, ...MATHEMATICS_PROPORTION_PROBES, ...MATHEMATICS_ALGEBRA_VOCAB_PROBES, ...MATHEMATICS_POWERS_VARIATION_PROBES, ...MATHEMATICS_SET_OPERATIONS_PROBES, ...MATHEMATICS_RELATIONS_NUMBERS_PROBES, ...MATHEMATICS_ORDERS_PROOFS_PROBES, ...MATHEMATICS_LANGUAGE_STRATEGY_PROBES, ...MATHEMATICS_PROOF_MACHINERY_PROBES, ...MATHEMATICS_QUANTIFIER_CRAFT_PROBES, ...MATHEMATICS_FOUNDATIONS_CLOSE_PROBES, ...MATHEMATICS_NUMBER_SYSTEMS_PROBES, ...MATHEMATICS_ALGORITHMS_PRECISION_PROBES, ...MATHEMATICS_ARITH_CLOSE_PROBES, ...MATHEMATICS_MEASUREMENT_PROBES, ...MATHEMATICS_COORDINATE_PROBES, ...MATHEMATICS_NUMBER_THEORY_PROBES, ...MATHEMATICS_TRIANGLE_TRANSFORM_PROBES, ...MATHEMATICS_DIVISIBILITY_MODULAR_PROBES, ...MATHEMATICS_CRYPTO_NUMBER_PROBES, ...MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES, ...MATHEMATICS_SOLIDS_POLYGONS_PROBES, ...MATHEMATICS_CIRCLES_TRANSFORM_PROBES, ...MATHEMATICS_VECTORS_CONICS_PROBES, ...MATHEMATICS_DIFF_GEOM_PROBES, ...MATHEMATICS_BAND_GAP_PROBES, ...MATHEMATICS_CATEGORY_FOUNDATIONS_PROBES, ...MATHEMATICS_CATEGORY_MORPHISM_PROBES, ...MATHEMATICS_CATEGORY_STRUCTURE_PROBES, ...MATHEMATICS_CATEGORY_LIMITS_PROBES, ...MATHEMATICS_CATEGORY_ADJUNCTION_PROBES, ...MATHEMATICS_CATEGORY_MONAD_PROBES, ...MATHEMATICS_CATEGORY_CLOSURE_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_FOUNDATIONS_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_GROUP_OPS_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_SUBGROUP_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_ORDER_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_RING_HOM_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_ACTION_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_QUOTIENT_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_IDEAL_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_PRIME_EUCLID_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_FIELD_PID_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_UFD_QUOTIENT_RING_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_HOM_ISO_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_FIT_LAGRANGE_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_ISO_FINITE_FIELD_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_ALT_GROUP_FIELD_EXT_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_BURNSIDE_SYLOW_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_ALG_EXT_GALOIS_PROBES, ...MATHEMATICS_ABSTRACT_ALGEBRA_GALOIS_GROUP_CORRESPONDENCE_PROBES, ...MATHEMATICS_ALGEBRA_SIMPLIFY_LINEAR_PROBES, ...MATHEMATICS_ALGEBRA_INEQUALITY_RADICALS_PROBES, ...MATHEMATICS_ALGEBRA_POLY_OPS_EXP_FUNC_PROBES, ...MATHEMATICS_ALGEBRA_COMPLETE_SQUARE_POLY_DIV_PROBES, ...MATHEMATICS_ALGEBRA_SYSTEMS_LOGARITHM_PROBES, ...MATHEMATICS_ALGEBRA_REMAINDER_QUADRATIC_PROBES, ...MATHEMATICS_ALGEBRA_FACTOR_DISCRIMINANT_PROBES, ...MATHEMATICS_ALGEBRA_FACTORING_ROOTS_PROBES, ...MATHEMATICS_ALGEBRA_RATIONAL_FTA_PROBES, ...MATHEMATICS_ALGEBRA_GCF_RATIONAL_EQ_PROBES, ...MATHEMATICS_ALGEBRA_LOG_PROPS_EXP_EQ_PROBES, ...MATHEMATICS_ALGEBRA_LOG_EQ_CHANGE_BASE_PROBES, ...MATHEMATICS_ALGEBRA_POLY_INEQ_SIMPLIFY_RADICALS_PROBES, ...MATHEMATICS_ALGEBRA_BINOMIAL_TRINOMIALS_PROBES, ...MATHEMATICS_ALGEBRA_PASCALS_RATIONALIZING_PROBES, ...MATHEMATICS_ALGEBRA_FACTORING_SPECIAL_ROOT_THEOREM_PROBES, ...MATHEMATICS_ALGEBRA_VIETAS_COMPLEX_ROOTS_PROBES, ...MATHEMATICS_ALGEBRA_RATIONAL_EXPR_OPS_PROBES, ...MATHEMATICS_ALGEBRA_RAT_INEQ_ABS_VAL_PROBES, ...MATHEMATICS_ALGEBRA_ELIM_SUBST_METHOD_PROBES, ...MATHEMATICS_ALGEBRA_FRAC_EXP_RADICAL_EQ_PROBES, ...MATHEMATICS_ALGEBRA_INEQ2VAR_LOG_SYSTEM3VAR_PROBES, ...MATHEMATICS_CALCULUS_LIMIT_LAWS_CONTINUITY_PROBES, ...MATHEMATICS_CALCULUS_CONTINUITY_TYPES_IVT_DERIV_DEF_PROBES, ...MATHEMATICS_CALCULUS_DERIV_RULES_DIFF_MVT_PROBES, ...MATHEMATICS_CALCULUS_PRODUCT_RULE_CRITICAL_POINTS_INC_DEC_PROBES, ...MATHEMATICS_CALCULUS_LOCAL_EXTREMA_QUOTIENT_HIGHER_ORDER_PROBES, ...MATHEMATICS_CALCULUS_CONCAVITY_OPTIMIZATION_LINEARIZATION_PROBES, ...MATHEMATICS_CALCULUS_LHOPITAL_LIMITS_INFINITY_ROLLES_PROBES, ...MATHEMATICS_CALCULUS_CURVE_SKETCHING_RIEMANN_SQUEEZE_PROBES, ...MATHEMATICS_CALCULUS_DEFINITE_INTEGRAL_TRIG_MULTIVAR_PROBES, ...MATHEMATICS_CALCULUS_FTC_PART1_INTEGRAL_AREA_PARTIAL_DERIV_PROBES, ...MATHEMATICS_CALCULUS_FTC_PART2_GRADIENT_ARC_LENGTH_PROBES, ...MATHEMATICS_CALCULUS_DIRECTIONAL_DERIV_USUB_VOLUME_REV_PROBES, ...MATHEMATICS_CALCULUS_INTEG_BY_PARTS_MULTIVAR_EXTREMA_IMPROPER_PROBES, ...MATHEMATICS_CALCULUS_CHAIN_RULE_MULTIVAR_IMPLICIT_DIFF_MULTIPLE_INTEGRALS_PROBES, ...MATHEMATICS_CALCULUS_RELATED_RATES_REDUCTION_FORMULAS_DOUBLE_INTEGRALS_PROBES, ...MATHEMATICS_CALCULUS_TRIPLE_INTEGRALS_PARAMETRIC_CURVES_SURFACE_AREA_PROBES, ...MATHEMATICS_CALCULUS_PARAMETRIC_CALC_LINE_INTEGRALS_VECTOR_FIELDS_PROBES, ...PHYSICS_BAND_GAP_PROBES, ...PHYSICS_DEPTH_PROBES, ...CHEMISTRY_DEPTH_PROBES, ...BIOLOGY_DEPTH_PROBES, ...ENGLISH_BAND_GAP_PROBES, ...ENGLISH_PROBE_BATCH_1, ...ENGLISH_BATCH_1_DEPTH_4, ...ENGLISH_PROBE_BATCH_2, ...ENGLISH_PROBE_BATCH_3, ...ENGLISH_PROBE_BATCH_4, ...ENGLISH_PROBE_BATCH_5, ...ENGLISH_PROBE_BATCH_6, ...ENGLISH_PROBE_BATCH_7, ...ENGLISH_PROBE_BATCH_8, ...ENGLISH_PROBE_BATCH_9, ...ENGLISH_PROBE_BATCH_10, ...ENGLISH_ADULT_BAND_BATCH_1, ...ENGLISH_ADULT_BAND_BATCH_2, ...ENGLISH_ADULT_BAND_BATCH_3, ...ENGLISH_ADULT_BAND_BATCH_4, ...ENGLISH_ADULT_BAND_BATCH_5, ...ENGLISH_ADULT_BAND_BATCH_6, ...ENGLISH_ADULT_BAND_BATCH_7, ...ENGLISH_ADULT_BAND_BATCH_8, ...ENGLISH_ADULT_BAND_BATCH_9, ...ENGLISH_ADULT_BAND_BATCH_10, ...ENGLISH_ADULT_BAND_BATCH_11, ...ENGLISH_ADULT_BAND_BATCH_12, ...ENGLISH_ADULT_BAND_BATCH_13, ...ENGLISH_ADULT_BAND_BATCH_14, ...ENGLISH_ADULT_BAND_BATCH_15, ...ENGLISH_ADULT_BAND_BATCH_16, ...ENGLISH_ADULT_BAND_BATCH_17, ...ENGLISH_ADULT_BAND_BATCH_18, ...ENGLISH_ADULT_BAND_BATCH_19, ...ENGLISH_ADULT_BAND_BATCH_20, ...ENGLISH_ADULT_BAND_BATCH_21, ...ENGLISH_LETTER_SOUND_ELEMENTARY_GAP]
import { hashContent } from '../../src/lib/teaching/assets/similarity'
import {
  validateSeedIdentities, formatSeedIdentityReport, previewOf,
} from '../../src/lib/teaching/assets/seedIdentityValidation'

const prisma = new PrismaClient()

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const asDraft = process.argv.includes('--draft')
  const status = asDraft ? AssetStatus.DRAFT : AssetStatus.ACTIVE

  // Guard: every seeded conceptId must resolve against its live canonical KG
  // (concepts/README.md binding rule: no entry exists without a KG node).
  const { createSubjectAdapter } = await import('../../src/lib/curriculum/subjectKgAdapter')
  const allConceptIds = new Set([
    ...ALL_EXPLANATIONS.map((e) => `${e.subjectSlug}:${e.conceptId}`),
    ...ALL_PROBES.map((p) => `${p.subjectSlug}:${p.conceptId}`),
  ])
  for (const key of allConceptIds) {
    const [subjectSlug, conceptId] = [key.slice(0, key.indexOf(':')), key.slice(key.indexOf(':') + 1)]
    const adapterSlug = subjectSlug === 'computer_science' ? 'computer-science' : subjectSlug
    const node = createSubjectAdapter(adapterSlug).getConceptNode(conceptId)
    if (!node) {
      console.error(`ABORT: seeded conceptId "${conceptId}" not found in the ${subjectSlug} canonical KG`)
      process.exit(1)
    }
  }
  console.log(`KG check passed: ${allConceptIds.size} concept ids resolved against live canonical KGs`)

  // Guard 2 (Remediation Item 3): refuse a dataset in which two authored
  // assets claim one canonical identity. The per-item dedup below keys on
  // canonicalSlug alone and `continue`s on a hit, so such a dataset would seed
  // the first item and silently drop the rest. Built in the SAME order the
  // loops below run (explanations, then probes) so the report's "KEPT" row is
  // the item that would actually have won. Runs before the first write —
  // including in --dry-run, where it is the cheapest way to get the full
  // duplicate report without touching the database.
  // ADR 14 13 (Item 6): ladder rungs get a difficulty segment; singletons
  // keep the identity they already have. One resolver, used for BOTH the
  // pre-flight check and the write loop, so they can never disagree.
  const probeSlug = buildProbeSlugResolver(ALL_PROBES)

  const identityCheck = validateSeedIdentities([
    ...ALL_EXPLANATIONS.map((e) => ({
      canonicalSlug: seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand),
      family: 'EXPLANATION' as const,
      conceptId: e.conceptId,
      subjectSlug: e.subjectSlug,
      familyKind: e.familyKind,
      gradeBand: String(e.gradeBand),
      preview: previewOf(e.content),
      source: e.source,
    })),
    ...ALL_PROBES.map((p) => ({
      canonicalSlug: probeSlug(p),
      family: 'PROBE' as const,
      conceptId: p.conceptId,
      subjectSlug: p.subjectSlug,
      familyKind: p.probeKind,
      gradeBand: String(p.gradeBand),
      preview: previewOf(p.stem),
      source: p.source,
    })),
  ])
  if (!identityCheck.ok) {
    console.error(formatSeedIdentityReport(identityCheck, { writer: 'seed-knowledge-assets' }))
    process.exit(1)
  }
  console.log(
    `Identity check passed: ${identityCheck.totalItems} items, ${identityCheck.distinctIdentities} distinct identities, 0 duplicates`,
  )

  // Guard 3 (P-10-FOLLOW-UP): a slot promoted from singleton to ladder
  // abandons its old 4-segment slug — every probe in the slot, including one
  // already seeded, moves to the 5-segment slug (see `abandonedLegacyProbeSlugs`
  // in brainSeedAssets.ts). This writer is create-only, so a live row still
  // carrying an abandoned slug is never revisited by the probe loop below, and
  // a second ACTIVE identity for the same question gets created beside it —
  // exactly the defect P-10 remediated by hand (docs/CLAUDE_HANDOVER.md
  // §9r/§9s). Refuse before the first write rather than repeat it.
  // Skipped in --dry-run, which never touches the database (consistent with
  // the loops below, which also skip their own findFirst in that mode).
  if (!dryRun) {
    const abandonedSlugs = [...abandonedLegacyProbeSlugs(ALL_PROBES)]
    if (abandonedSlugs.length > 0) {
      const liveOrphans = await prisma.assetIdentity.findMany({
        where: {
          authorId: SEED_AUTHOR_ID,
          canonicalSlug: { in: abandonedSlugs },
          // "Live" is the complement of revivable — ONE definition, shared with
          // the cold-start bootstrap's identical guard so the two writers can
          // never disagree about which rows block seeding.
          status: { notIn: [...SEED_REVIVABLE_STATUSES] },
        },
        select: { assetId: true, canonicalSlug: true, status: true },
      })
      if (liveOrphans.length > 0) {
        console.error(
          `ABORT: ${liveOrphans.length} legacy probe identit${liveOrphans.length === 1 ? 'y is' : 'ies are'} ` +
            'still live under a slug this corpus no longer produces, because its slot was ' +
            'promoted to a difficulty ladder. Seeding would create a second ACTIVE identity ' +
            'for the same question (the P-10 defect). No rows written.',
        )
        for (const o of liveOrphans) {
          console.error(`  ${o.status} ${o.canonicalSlug} (assetId ${o.assetId})`)
        }
        console.error(
          'Resolve by deprecating these rows first (see docs/CLAUDE_HANDOVER.md §9r/§9s ' +
            'for the P-10 precedent), then re-run.',
        )
        process.exit(1)
      }
      console.log(`Legacy-slug check passed: ${abandonedSlugs.length} promoted slot(s), 0 still live under the old slug`)
    }
  }

  let created = 0
  let skipped = 0
  let revived = 0
  const REVIVABLE: Set<string> = new Set(SEED_REVIVABLE_STATUSES)

  for (const e of ALL_EXPLANATIONS) {
    const canonicalSlug = seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)
    if (dryRun) { created++; console.log(`would create EXPLANATION: ${canonicalSlug}`); continue }
    const existing = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
    if (existing) {
      if (REVIVABLE.has(existing.status)) {
        await prisma.assetIdentity.update({
          where: { assetId: existing.assetId },
          data: {
            status,
            version: existing.version + 1,
            contentHash: hashContent(e.content),
            tags: [e.subjectSlug, e.familyKind],
            explanationAsset: {
              upsert: {
                create: {
                  content: e.content,
                  style: ExplanationStyle.CONCRETE,
                  readingLevel: 0,
                  lengthChars: e.content.length,
                  targetedMisconceptions: e.targetedMisconceptions,
                },
                update: {
                  content: e.content,
                  style: ExplanationStyle.CONCRETE,
                  readingLevel: 0,
                  lengthChars: e.content.length,
                  targetedMisconceptions: e.targetedMisconceptions,
                },
              },
            },
          },
        })
        revived++
        console.log(`revived EXPLANATION ${existing.status}→${status} (v${existing.version + 1}): ${canonicalSlug}`)
        continue
      }
      skipped++; console.log(`skip (${existing.status}): ${canonicalSlug}`); continue
    }
    await prisma.assetIdentity.create({
      data: {
        family: AssetFamily.EXPLANATION,
        familyKind: e.familyKind,
        conceptId: e.conceptId,
        language: SEED_LANGUAGE,
        gradeBand: e.gradeBand,
        authorId: SEED_AUTHOR_ID,
        authorKind: AuthorKind.HUMAN_CURATOR,
        status,
        version: 1,
        canonicalSlug,
        contentHash: hashContent(e.content),
        tags: [e.subjectSlug, e.familyKind],
        intellectualProperty: 'proprietary',
        curriculumMappings: [],
        incompatibilities: [],
        prerequisites: [],
        explanationAsset: {
          create: {
            content: e.content,
            style: ExplanationStyle.CONCRETE,
            readingLevel: 0,
            lengthChars: e.content.length,
            targetedMisconceptions: e.targetedMisconceptions,
          },
        },
      },
    })
    created++
    console.log(`created EXPLANATION (${status}): ${canonicalSlug}`)
  }

  for (const p of ALL_PROBES) {
    const canonicalSlug = probeSlug(p)
    if (dryRun) { created++; console.log(`would create PROBE: ${canonicalSlug}`); continue }
    const existing = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
    if (existing) {
      if (REVIVABLE.has(existing.status)) {
        await prisma.assetIdentity.update({
          where: { assetId: existing.assetId },
          data: {
            status,
            version: existing.version + 1,
            contentHash: hashContent(p.stem),
            tags: [p.subjectSlug, p.probeKind],
            probeAsset: {
              upsert: {
                create: {
                  stem: p.stem,
                  choices: p.choices ? (p.choices as unknown as object) : undefined,
                  correctValue: p.correctValue,
                  keywords: [],
                  difficulty: p.difficulty,
                  targetedMisconceptions: p.targetedMisconceptions,
                  requiredVisuals: [],
                },
                update: {
                  stem: p.stem,
                  choices: p.choices ? (p.choices as unknown as object) : undefined,
                  correctValue: p.correctValue,
                  difficulty: p.difficulty,
                  targetedMisconceptions: p.targetedMisconceptions,
                },
              },
            },
          },
        })
        revived++
        console.log(`revived PROBE ${existing.status}→${status} (v${existing.version + 1}): ${canonicalSlug}`)
        continue
      }
      skipped++; console.log(`skip (${existing.status}): ${canonicalSlug}`); continue
    }
    await prisma.assetIdentity.create({
      data: {
        family: AssetFamily.PROBE,
        familyKind: p.probeKind,
        conceptId: p.conceptId,
        language: SEED_LANGUAGE,
        gradeBand: p.gradeBand,
        authorId: SEED_AUTHOR_ID,
        authorKind: AuthorKind.HUMAN_CURATOR,
        status,
        version: 1,
        canonicalSlug,
        contentHash: hashContent(p.stem),
        tags: [p.subjectSlug, p.probeKind],
        intellectualProperty: 'proprietary',
        curriculumMappings: [],
        incompatibilities: [],
        prerequisites: [],
        probeAsset: {
          create: {
            stem: p.stem,
            choices: p.choices ? (p.choices as unknown as object) : undefined,
            correctValue: p.correctValue,
            keywords: [],
            difficulty: p.difficulty,
            targetedMisconceptions: p.targetedMisconceptions,
            requiredVisuals: [],
          },
        },
      },
    })
    created++
    console.log(`created PROBE (${status}): ${canonicalSlug}`)
  }

  console.log(`\nDone. created=${created} revived=${revived} skipped=${skipped} status=${dryRun ? 'DRY-RUN' : status}`)
}

main()
  .catch((err) => { console.error(err); process.exit(1) })
  .finally(() => prisma.$disconnect())

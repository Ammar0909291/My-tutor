/**
 * K5 — Output Verifier barrel.
 *
 * See `docs/architecture/EOS_V2_RUNTIME_SPECIFICATION.md` §9 for the
 * frozen spec. Every rule cites its source (K5 v1 embeds MVP English
 * lexicons; pack-supplied lexicons land with C4 follow-on).
 */
export * from './types'
export { verify, buildViolationAppendix } from './verifier'
export {
  RULES, withoutCodeFences, paragraphCount, questionCount,
  stripUnknownTags, vQ1, vQ2, vStage, vVocName, vVocFormula, vVocReg,
  vTerms, vLen, vCap, vRec, vClose, vAssess, vTag, vComplete, vPraise, vReact,
  vDupExact, vDupNear, vDupQuestion, vRecRepeat, vOscillate,
  vObj, vNoProgress,
} from './rules'
export * from './history'
export {
  renderFallback, chooseFallback, templateMove, type FallbackKind, type TemplateContext,
} from './templateFallback'
export {
  runVerifierLoop, type RenderCallback, type OutputEvent, type LoopResult,
} from './loop'
export * from './metrics'
export * as lexicons from './lexicons'

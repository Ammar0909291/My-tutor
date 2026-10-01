/**
 * newtonSecondLaw — public name for the Newton's-second-law simulation (ADR 16).
 *
 * Every other generator's host module pairs its pure half with an LLM
 * parameter extractor. This one deliberately has NONE: the Newton simulation
 * is an authored experiment with learner-set values, never extracted from
 * tutor text, and it has no keyword route. The host exists so the kind keeps
 * the same module shape as the rest of the family (asserted by
 * src/tests/sceneGeneratorPurity.test.ts).
 */
export {
  NEWTON_FIXED_DT,
  NEWTON_FORCE_RANGE,
  NEWTON_MASS_RANGE,
  NEWTON_MAX_TICKS,
  NEWTON_TRACK_M,
  buildNewtonScene,
  newtonBlockRadius,
  newtonReadouts,
  newtonStateAt,
  newtonTerminalTick,
  validateNewtonParams,
} from './newtonSecondLaw.pure'
export type { NewtonParams, NewtonReadout, NewtonState } from './newtonSecondLaw.pure'

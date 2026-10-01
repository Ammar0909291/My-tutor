/**
 * pendulumPeriod — public name for the pendulum-period simulation (ADR 16,
 * second pilot).
 *
 * Like newtonSecondLaw, it deliberately has NO LLM extractor: an authored
 * experiment with learner-set values, never extracted from tutor text, and no
 * keyword route. The host exists so the kind keeps the same module shape as
 * the rest of the family (asserted by src/tests/sceneGeneratorPurity.test.ts).
 */
export {
  PENDULUM_AMPLITUDE_RANGE,
  PENDULUM_FIXED_DT,
  PENDULUM_GRAVITY,
  PENDULUM_LENGTH_RANGE,
  PENDULUM_MASS_RANGE,
  PENDULUM_MAX_TICKS,
  PENDULUM_SCALE,
  PENDULUM_SWINGS_PER_RUN,
  buildPendulumPeriodScene,
  pendulumBobRadius,
  pendulumPhaseAt,
  pendulumReadouts,
  pendulumStateAt,
  pendulumTerminalTick,
  validatePendulumPeriodParams,
} from './pendulumPeriod.pure'
export type { PendulumPeriodParams, PendulumPhase, PendulumReadout, PendulumState } from './pendulumPeriod.pure'

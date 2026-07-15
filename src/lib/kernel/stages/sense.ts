/**
 * Stage 2 — SENSE. Owner: Perception. RS §3.
 *
 * Runs the sensor registry over the raw message and produces candidate
 * evidence events. K3 v1 sensors:
 *  - utterance-state (recoveryGuard.detectFailureState)
 *  - autonomy       (conversationState.detectAutonomyRequest)
 *  - message-shape  (length + question-mark presence — deterministic)
 *
 * Signal-tag sensing happens post-render (stage 11.5 conceptually); it is
 * emitted by the RENDER/POST stages using the parsed SIGNAL tag rather
 * than here. That is faithful to RS §3: sensors emit; they do not decide.
 */
import type { CandidateEvent, KernelState, Stage } from '../types'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import { detectAutonomyRequest } from '@/lib/teaching/conversationState'

export interface SenseInput { message: string }

const V = 1

export function senseFromMessage(message: string): CandidateEvent[] {
  const events: CandidateEvent[] = []
  events.push({
    sensorId: 'message-shape', sensorVersion: V, confidence: 1, kind: 'StudentMessageReceived',
    data: { length: message.length, hasQuestionMark: message.includes('?') },
  })
  // detectFailureState + detectAutonomyRequest are deterministic patterns
  // per foundations/01 §3.
  const key = detectFailureState(message)
  if (key) {
    events.push({
      sensorId: 'utterance-state', sensorVersion: V, confidence: 1,
      kind: 'UtteranceStateDetected', data: { failureStateKey: key, strength: 'unknown' },
    })
  }
  if (detectAutonomyRequest(message)) {
    events.push({
      sensorId: 'autonomy', sensorVersion: V, confidence: 1,
      kind: 'AutonomyRequested', data: { honored: true },
    })
  }
  return events
}

export function senseStage(input: SenseInput): Stage<KernelState, KernelState> {
  return {
    name: 'SENSE',
    async run(state) {
      const candidates = senseFromMessage(input.message)
      return { ...state, candidates }
    },
  }
}

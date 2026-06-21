'use client'
/**
 * useControlMastery — Universal 3D Engine Consolidation Sprint.
 *
 * Extracts the mastery-emission boilerplate that was previously copy-pasted
 * across all 19 `*Interactive3D` components: a stable "touched controls" Set,
 * a `createMasteryEmitter` call (always the same `quantum_interactive` bucket),
 * and the "mark a control as touched, then emit progress once N distinct
 * controls have been touched" logic.
 *
 * Behaviour is byte-for-byte identical to the inline pattern it replaces:
 *  - `touched` keeps the same stable identity as the old
 *    `useMemo(() => new Set(), [])`.
 *  - `emit` is the same `createMasteryEmitter` result (a no-op when
 *    `onMasteryEvent` is absent), recreated each render exactly as before.
 *  - `mark(key)` performs `touched.add(key)` then emits
 *    `{ interacted, challengeAttempted, challengeCompleted: touched.size >= threshold }`.
 *  - `handleChange(key, setter)` is the curried setter wrapper used by the
 *    slider-driven components.
 *
 * No new mastery engine type, no new analytics field — pure de-duplication.
 */
import { useMemo } from 'react'
import {
  createMasteryEmitter,
  type VisualMasteryContext,
  type VisualMasteryEngine,
  type VisualMasterySignal,
} from '@/lib/visuals/visualMastery'

export function useControlMastery(params: {
  /** Concept string for the emitted signal when `context.concept` is absent. */
  defaultConcept: string
  /** challengeCompleted becomes true once this many distinct controls have been touched. */
  threshold: number
  /** Defaults to the shared 'quantum_interactive' 3D-interactive bucket (unchanged from prior behaviour). */
  visualType?: VisualMasteryEngine
  context?: VisualMasteryContext
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  /** Pre-seed the touched set (e.g. a default selection that already counts as "seen"). */
  initialTouched?: readonly string[]
}) {
  const {
    defaultConcept,
    threshold,
    visualType = 'quantum_interactive',
    context,
    onMasteryEvent,
    initialTouched,
  } = params

  // Stable identity across renders — matches the old `useMemo(() => new Set(), [])`.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const touched = useMemo(() => new Set<string>(initialTouched ?? []), [])

  const emit = createMasteryEmitter({ visualType, defaultConcept, context, onMasteryEvent })

  /** Mark one control as touched and emit progress. */
  const mark = (key: string) => {
    touched.add(key)
    emit({ interacted: true, challengeAttempted: true, challengeCompleted: touched.size >= threshold })
  }

  /** Curried setter wrapper for the common "slider changes one numeric state value" case. */
  const handleChange = <V,>(key: string, setter: (v: V) => void) => (v: V) => {
    setter(v)
    mark(key)
  }

  return { touched, emit, mark, handleChange }
}
